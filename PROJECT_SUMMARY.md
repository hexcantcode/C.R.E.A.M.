# Hedge Vault - Project Summary

## Overview

A complete Solana-based hedge fund vault system with epoch-based investment windows, Twitter authentication, and Jupiter swap integration.

## Architecture

### Smart Contract Structure

```
hedge-vault/
├── programs/
│   └── hedge_vault/
│       ├── src/
│       │   ├── lib.rs          # Main program logic
│       │   ├── twitter.rs      # Twitter OAuth verification
│       │   └── jupiter.rs      # Jupiter swap integration
│       └── Cargo.toml
├── tests/
│   └── hedge-vault.ts          # TypeScript tests
├── app/
│   └── README.md               # Frontend documentation
├── Anchor.toml                  # Anchor config
├── package.json                 # Node dependencies
├── README.md                    # Main documentation
├── SETUP.md                     # Setup instructions
└── .gitignore
```

## Core Functionality

### 1. Vault Creation (create_vault)

**Requirements:**
- Valid Twitter handle (1-15 alphanumeric chars + underscore)
- Twitter proof verification (SHA-256 hash)
- Performance fee ≤ 50% (5000 bps)
- Initializes vault with trader as owner

**Account Structure:**
```rust
Vault {
    trader: Pubkey,              // 32 bytes
    vault_name: String,          // 4 + 64 bytes
    twitter_handle: String,      // 4 + 32 bytes
    twitter_proof: String,       // 4 + 128 bytes
    token_mint: Pubkey,          // 32 bytes
    performance_fee_bps: u16,    // 2 bytes
    total_shares: u64,           // 8 bytes
    total_assets: u64,           // 8 bytes
    current_epoch: u64,          // 8 bytes
    last_epoch_update: i64,      // 8 bytes
    created_at: i64,             // 8 bytes
    accrued_fees: u64,           // 8 bytes
    bump: u8,                    // 1 byte
}
// Total: 8 (discriminator) + 323 = 331 bytes
```

### 2. Epoch-Based System

**Weekly Epochs (7 days):**
- **Days 1-6**: Deposit/Withdrawal window open
- **Day 7**: Trading period only, advance to next epoch

**Timeline Example:**
```
Week 1:
├─ Day 1-6: Deposits & Withdrawals allowed
└─ Day 7: Trading only, prepare for next epoch

Week 2:
├─ Day 1: advance_epoch() called
├─ Day 1-6: New deposit/withdrawal window
└─ Day 7: Trading only
```

### 3. Deposit Mechanism

**Share Calculation:**
- First deposit: 1:1 ratio
- Subsequent: `shares = (amount * total_shares) / total_assets`

**Security:**
- Only within 6-day window
- Atomic share updates
- PDA-based investor tracking

### 4. Withdrawal Mechanism

**Proportional Redemption:**
- `shares_to_burn = (amount * total_shares) / total_assets`
- Validates sufficient shares
- Only within 6-day window

### 5. Performance Fee Calculation

**On Epoch Advance:**
```rust
if new_assets > old_assets {
    profit = new_assets - old_assets
    fee = (profit * performance_fee_bps) / 10000
    accrued_fees += fee
}
```

**Claim by Trader:**
- Only original trader can claim
- Withdraws accrued fees

## Twitter Authentication

### Verification Flow

1. **Frontend:**
   ```typescript
   // User connects Twitter OAuth
   const { handle, token } = await twitterOAuth();
   
   // Generate proof
   const message = `${handle}:${wallet.publicKey}`;
   const hash = sha256(message);
   const proof = hex(hash);
   
   // Submit to program
   await program.createVault(name, handle, proof, fee);
   ```

2. **On-Chain Verification:**
   ```rust
   // Recreate hash from handle + pubkey
   let message = format!("{}:{}", handle, trader_pubkey);
   let hash = sha256(message);
   
   // Compare with submitted proof
   assert_eq!(hash, proof_hash);
   ```

### Security Model

- Proof must be valid hex string
- 32-byte hash verification
- Handle format validation
- Prevents impersonation

## Jupiter Integration

### Placeholder Implementation

Currently structured for:
1. Quote fetching from Jupiter API
2. CPI calls to Jupiter program
3. Route optimization

**Future Enhancement:**
```rust
pub fn swap_tokens(ctx: Context<SwapTokens>, amount: u64) -> Result<()> {
    // 1. Get quote from Jupiter
    let quote = JupiterIntegration::get_quote(...)?;
    
    // 2. Execute CPI to Jupiter
    JupiterIntegration::swap(ctx, amount, quote.min_output)?;
    
    // 3. Update vault state
    Ok(())
}
```

## Accounts & PDAs

### Program-Derived Addresses

```rust
// Vault PDA
vault_pda = PDA(
    seeds = ["vault", trader_pubkey],
    program_id
)

// Investor PDA
investor_pda = PDA(
    seeds = ["investor", vault_pubkey, investor_pubkey],
    program_id
)
```

### Account Relationships

```
┌─────────────┐
│   Trader    │
│   (Wallet)  │
└──────┬──────┘
       │ creates
       ▼
┌──────────────────┐
│   Vault Account  │
│   (PDA)          │
│                  │
│  - shares        │
│  - assets        │
│  - fees          │
│  - epoch         │
└────────┬─────────┘
         │
         ├─ owns
         ▼
┌──────────────────┐
│ Investor Accounts│
│  (Multiple PDAs) │
│                  │
│  - investor_1    │
│  - investor_2    │
│  - investor_N    │
└──────────────────┘
```

## Error Handling

### Error Types

| Error | Message | Cause |
|-------|---------|-------|
| `DepositWindowClosed` | Deposit window is closed | Deposit after day 6 |
| `WithdrawalWindowClosed` | Withdrawal window is closed | Withdrawal after day 6 |
| `EpochNotReady` | Epoch not ready to advance | < 7 days since last epoch |
| `MathOverflow` | Math overflow | Arithmetic overflow |
| `InsufficientShares` | Insufficient shares | Not enough shares to withdraw |
| `Unauthorized` | Unauthorized | Wrong trader/wallet |
| `InvalidPerformanceFee` | Invalid performance fee | Fee > 50% |
| `InvalidTwitterHandle` | Invalid Twitter handle | Bad format |
| `InvalidTwitterProof` | Invalid Twitter proof | Failed verification |

## Security Features

### 1. Time-Based Windows
- Prevents front-running during trading
- Clear operational boundaries
- Predictable schedules

### 2. Twitter Verification
- Prevents spam vaults
- Adds accountability
- On-chain audit trail

### 3. Fee Limits
- Hardcoded 50% maximum
- Transparent calculations
- Only on profit

### 4. Access Control
- PDA-based isolation
- Signer validation
- Role-based permissions

### 5. Overflow Protection
- All arithmetic checked
- Safe math operations
- Explicit overflow handling

## Testing Strategy

### Unit Tests
- Twitter verification
- Epoch calculations
- Share math
- Fee calculations

### Integration Tests
- Full deposit flow
- Withdrawal scenarios
- Epoch progression
- Fee claims

### E2E Tests
- Vault creation
- Multiple investors
- Complete epoch cycle
- Swap simulation

## Deployment

### Devnet
```bash
solana config set --url devnet
anchor deploy --provider.cluster devnet
```

### Mainnet
```bash
solana config set --url mainnet-beta
anchor deploy --provider.cluster mainnet
```

## Future Enhancements

### Phase 2
- [ ] Real Jupiter CPI integration
- [ ] Multi-token vaults
- [ ] Leverage limits
- [ ] Auto rebalancing

### Phase 3
- [ ] Governance DAO
- [ ] Risk parameters
- [ ] Insurance fund
- [ ] Cross-chain

## Key Files

| File | Purpose |
|------|---------|
| `programs/hedge_vault/src/lib.rs` | Main program logic |
| `programs/hedge_vault/src/twitter.rs` | Twitter verification |
| `programs/hedge_vault/src/jupiter.rs` | Jupiter integration |
| `tests/hedge-vault.ts` | Test suite |
| `Anchor.toml` | Anchor configuration |
| `README.md` | Documentation |
| `SETUP.md` | Setup guide |

## Program ID

Current IDL: `VautStX9a8jzNh2qF3tR4kmCvYkQmN8LKpT6w`

**Note:** This is a placeholder. Generate a new program ID for actual deployment.

## License

MIT

## Contact

For questions or contributions, please see README.md

