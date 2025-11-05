use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer, Mint};
use anchor_spl::associated_token::AssociatedToken;

declare_id!("VautStX9a8jzNh2qF3tR4kmCvYkQmN8LKpT6w");

mod twitter;
mod jupiter;
use twitter::TwitterVerification;
use jupiter::JupiterIntegration;

#[program]
pub mod hedge_vault {
    use super::*;

    /// Initialize a new vault with Twitter verification
    pub fn create_vault(
        ctx: Context<CreateVault>,
        vault_name: String,
        twitter_handle: String,
        twitter_proof: String,
        performance_fee_bps: u16,
    ) -> Result<()> {
        // Validate performance fee (max 50%)
        require!(performance_fee_bps <= 5000, VaultError::InvalidPerformanceFee);
        
        // Verify Twitter handle format
        require!(
            TwitterVerification::is_valid_handle(&twitter_handle),
            VaultError::InvalidTwitterHandle
        );

        // Verify Twitter authentication
        let is_verified = TwitterVerification::verify_twitter_auth(
            &twitter_handle,
            &twitter_proof,
            &ctx.accounts.trader.key(),
        )?;
        require!(is_verified, VaultError::InvalidTwitterProof);

        let vault = &mut ctx.accounts.vault;
        let clock = Clock::get()?;

        // Store Twitter verification
        vault.trader = ctx.accounts.trader.key();
        vault.vault_name = vault_name;
        vault.twitter_handle = twitter_handle;
        vault.twitter_proof = twitter_proof;
        vault.token_mint = ctx.accounts.token_mint.key();
        vault.performance_fee_bps = performance_fee_bps;
        vault.total_shares = 0;
        vault.total_assets = 0;
        vault.current_epoch = 0;
        vault.created_at = clock.unix_timestamp;
        vault.last_epoch_update = clock.unix_timestamp;
        vault.bump = ctx.bumps.vault;

        msg!("Vault created for trader: {} | Twitter: {}", 
             ctx.accounts.trader.key(), vault.twitter_handle);

        Ok(())
    }

    /// Deposit funds into the vault (epoch-based)
    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        let vault = &ctx.accounts.vault;
        let clock = Clock::get()?;

        // Check if we're in the deposit window (first 6 days of epoch)
        let days_elapsed = (clock.unix_timestamp - vault.last_epoch_update) / 86400;
        require!(days_elapsed < 6, VaultError::DepositWindowClosed);

        let share_price = if vault.total_shares == 0 {
            amount // First deposit: 1:1
        } else {
            (amount as u128)
                .checked_mul(vault.total_shares as u128)
                .ok_or(VaultError::MathOverflow)?
                .checked_div(vault.total_assets as u128)
                .ok_or(VaultError::MathOverflow)?
        };

        // Transfer tokens to vault
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.investor_vault.to_account_info(),
                    to: ctx.accounts.vault_token_account.to_account_info(),
                    authority: ctx.accounts.investor.to_account_info(),
                },
            ),
            amount,
        )?;

        // Update vault state
        let vault = &mut ctx.accounts.vault;
        vault.total_assets = vault.total_assets
            .checked_add(amount)
            .ok_or(VaultError::MathOverflow)?;
        vault.total_shares = vault.total_shares
            .checked_add(share_price as u64)
            .ok_or(VaultError::MathOverflow)?;

        // Update investor shares
        let investor = &mut ctx.accounts.investor_info;
        investor.shares = investor.shares
            .checked_add(share_price as u64)
            .ok_or(VaultError::MathOverflow)?;

        msg!("Deposit: {} tokens for {} shares", amount, share_price);
        Ok(())
    }

    /// Withdraw funds from the vault (epoch-based)
    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let vault = &ctx.accounts.vault;
        let clock = Clock::get()?;

        // Check if we're in the withdrawal window (first 6 days of epoch)
        let days_elapsed = (clock.unix_timestamp - vault.last_epoch_update) / 86400;
        require!(days_elapsed < 6, VaultError::WithdrawalWindowClosed);

        // Calculate share price
        let shares_to_burn = (amount as u128)
            .checked_mul(vault.total_shares as u128)
            .ok_or(VaultError::MathOverflow)?
            .checked_div(vault.total_assets as u128)
            .ok_or(VaultError::MathOverflow)?;

        let investor = &ctx.accounts.investor_info;
        require!(investor.shares >= shares_to_burn as u64, VaultError::InsufficientShares);

        // Transfer tokens back to investor
        let seeds = &[
            b"vault",
            vault.trader.as_ref(),
            &[ctx.accounts.vault.bump],
        ];
        let signer = &[&seeds[..]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.vault_token_account.to_account_info(),
                    to: ctx.accounts.investor_vault.to_account_info(),
                    authority: ctx.accounts.vault.to_account_info(),
                },
                signer,
            ),
            amount,
        )?;

        // Update vault state
        let vault = &mut ctx.accounts.vault;
        vault.total_assets = vault.total_assets
            .checked_sub(amount)
            .ok_or(VaultError::MathOverflow)?;
        vault.total_shares = vault.total_shares
            .checked_sub(shares_to_burn as u64)
            .ok_or(VaultError::MathOverflow)?;

        // Update investor shares
        let investor = &mut ctx.accounts.investor_info;
        investor.shares = investor.shares
            .checked_sub(shares_to_burn as u64)
            .ok_or(VaultError::MathOverflow)?;

        msg!("Withdrawal: {} tokens for {} shares", amount, shares_to_burn);
        Ok(())
    }

    /// Advance epoch and calculate performance fees
    pub fn advance_epoch(ctx: Context<AdvanceEpoch>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        let clock = Clock::get()?;

        // Ensure at least 7 days have passed
        let days_elapsed = (clock.unix_timestamp - vault.last_epoch_update) / 86400;
        require!(days_elapsed >= 7, VaultError::EpochNotReady);

        // Calculate performance (simplified - in production, fetch from Jupiter)
        let new_total_assets = ctx.accounts.vault_token_account.amount;
        
        if new_total_assets > vault.total_assets {
            let profit = new_total_assets
                .checked_sub(vault.total_assets)
                .ok_or(VaultError::MathOverflow)?;
            
            let fee = (profit as u128)
                .checked_mul(vault.performance_fee_bps as u128)
                .ok_or(VaultError::MathOverflow)?
                .checked_div(10000)
                .ok_or(VaultError::MathOverflow)?;

            // Store fee for trader withdrawal
            vault.accrued_fees = vault.accrued_fees
                .checked_add(fee as u64)
                .ok_or(VaultError::MathOverflow)?;
        }

        // Update epoch
        vault.total_assets = new_total_assets;
        vault.current_epoch = vault.current_epoch.checked_add(1).ok_or(VaultError::MathOverflow)?;
        vault.last_epoch_update = clock.unix_timestamp;

        msg!("Epoch {} advanced. New total assets: {}", vault.current_epoch, new_total_assets);
        Ok(())
    }

    /// Claim accrued performance fees (trader only)
    pub fn claim_fees(ctx: Context<ClaimFees>) -> Result<()> {
        let vault = &ctx.accounts.vault;
        require!(vault.trader == ctx.accounts.trader.key(), VaultError::Unauthorized);

        let fee_amount = vault.accrued_fees;

        if fee_amount > 0 {
            let seeds = &[
                b"vault",
                vault.trader.as_ref(),
                &[ctx.accounts.vault.bump],
            ];
            let signer = &[&seeds[..]];

            token::transfer(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    Transfer {
                        from: ctx.accounts.vault_token_account.to_account_info(),
                        to: ctx.accounts.trader_vault.to_account_info(),
                        authority: ctx.accounts.vault.to_account_info(),
                    },
                    signer,
                ),
                fee_amount,
            )?;

            let vault = &mut ctx.accounts.vault;
            vault.accrued_fees = 0;
        }

        msg!("Claimed {} tokens in fees", fee_amount);
        Ok(())
    }

    /// Swap tokens using Jupiter (simplified CPI)
    pub fn swap_tokens(ctx: Context<SwapTokens>, amount: u64) -> Result<()> {
        let vault = &ctx.accounts.vault;
        require!(vault.trader == ctx.accounts.trader.key(), VaultError::Unauthorized);

        msg!("Swapping {} tokens via Jupiter", amount);
        // In production, this would call Jupiter's swap program
        // For now, this is a placeholder for the Jupiter integration
        
        Ok(())
    }
}

#[account]
pub struct Vault {
    pub trader: Pubkey,                    // Trader wallet
    pub vault_name: String,                // Name of the vault (max 64 chars)
    pub twitter_handle: String,            // Twitter/X handle (max 32 chars)
    pub twitter_proof: String,             // Twitter verification proof (64 hex chars)
    pub token_mint: Pubkey,                // Token mint address
    pub performance_fee_bps: u16,          // Performance fee in basis points
    pub total_shares: u64,                 // Total shares issued
    pub total_assets: u64,                 // Total assets under management
    pub current_epoch: u64,                // Current epoch number
    pub last_epoch_update: i64,           // Last epoch update timestamp
    pub created_at: i64,                   // Creation timestamp
    pub accrued_fees: u64,                 // Accrued performance fees
    pub bump: u8,                          // Bump seed
}

impl Vault {
    pub const LEN: usize = 8           // discriminator
        + 32                            // trader: Pubkey
        + 4 + 64                        // vault_name: String (4 prefix + 64 chars)
        + 4 + 32                        // twitter_handle: String (4 prefix + 32 chars)
        + 4 + 128                       // twitter_proof: String (4 prefix + 128 hex chars)
        + 32                            // token_mint: Pubkey
        + 2                             // performance_fee_bps: u16
        + 8                             // total_shares: u64
        + 8                             // total_assets: u64
        + 8                             // current_epoch: u64
        + 8                             // last_epoch_update: i64
        + 8                             // created_at: i64
        + 8                             // accrued_fees: u64
        + 1;                            // bump: u8
}

#[account]
pub struct InvestorInfo {
    pub investor: Pubkey,                  // Investor wallet
    pub vault: Pubkey,                     // Associated vault
    pub shares: u64,                       // Shares owned
    pub deposited_at: i64,                 // First deposit timestamp
}

impl InvestorInfo {
    pub const LEN: usize = 8           // discriminator
        + 32                            // investor: Pubkey
        + 32                            // vault: Pubkey
        + 8                             // shares: u64
        + 8;                            // deposited_at: i64
}

#[error_code]
pub enum VaultError {
    #[msg("Deposit window is closed")]
    DepositWindowClosed,
    #[msg("Withdrawal window is closed")]
    WithdrawalWindowClosed,
    #[msg("Epoch not ready to advance")]
    EpochNotReady,
    #[msg("Math overflow")]
    MathOverflow,
    #[msg("Insufficient shares")]
    InsufficientShares,
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Invalid performance fee")]
    InvalidPerformanceFee,
    #[msg("Invalid Twitter handle")]
    InvalidTwitterHandle,
    #[msg("Invalid Twitter proof")]
    InvalidTwitterProof,
}

#[derive(Accounts)]
pub struct CreateVault<'info> {
    #[account(
        init,
        payer = trader,
        space = 8 + Vault::LEN,
        seeds = [b"vault", trader.key().as_ref()],
        bump
    )]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub trader: Signer<'info>,

    /// CHECK: Twitter verification oracle
    pub twitter_oracle: AccountInfo<'info>,

    pub token_mint: Account<'info, Mint>,

    #[account(mut)]
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,

    #[account(
        init_if_needed,
        payer = investor,
        space = 8 + InvestorInfo::LEN,
        seeds = [b"investor", vault.key().as_ref(), investor.key().as_ref()],
        bump
    )]
    pub investor_info: Account<'info, InvestorInfo>,

    #[account(mut)]
    pub investor: Signer<'info>,

    #[account(mut)]
    pub investor_vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub investor_info: Account<'info, InvestorInfo>,

    #[account(mut)]
    pub investor: Signer<'info>,

    #[account(mut)]
    pub investor_vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct AdvanceEpoch<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,
}

#[derive(Accounts)]
pub struct ClaimFees<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,

    pub trader: Signer<'info>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub trader_vault: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct SwapTokens<'info> {
    #[account(mut)]
    pub vault: Account<'info, Vault>,

    pub trader: Signer<'info>,

    pub vault_token_account: Account<'info, TokenAccount>,

    /// CHECK: Jupiter program
    pub jupiter_program: AccountInfo<'info>,
}

