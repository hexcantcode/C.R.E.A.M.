# Hedge Vault - Solana Smart Contract

A decentralized hedge fund vault system built on Solana with epoch-based deposits/withdrawals, Twitter authentication, and Jupiter swap integration.

## Core Features

### 🏦 Vault Management
- **Epoch-based System**: Weekly epochs (7 days)
  - First 6 days: Deposit/Withdrawal window open
  - Last day: Trading period only
- **Share-based Ownership**: Investors receive proportional shares
- **Performance Fees**: Configurable fee structure for traders

### 🔐 Twitter Authentication
- Required for vault creation
- Verification proof stored on-chain
- Prevents unauthorized vault creation

### 💱 Jupiter Integration
- Token swaps via Jupiter aggregator
- Optimal routing for best prices
- Permissioned to trader only

### 📊 Key Components

#### 1. Create Vault
```rust
pub fn create_vault(
    ctx: Context<CreateVault>,
    vault_name: String,
    twitter_handle: String,
    twitter_proof: String,
    performance_fee_bps: u16,
) -> Result<()>
```

Requirements:
- Valid Twitter handle and proof
- Performance fee ≤ 50% (5000 bps)
- Initializes vault with trader as owner

#### 2. Deposit
```rust
pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()>
```

Features:
- Shares calculated based on current NAV
- First deposit is 1:1
- Subsequent deposits use proportional pricing
- Only during deposit window

#### 3. Withdraw
```rust
pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()>
```

Features:
- Proportional share burning
- Only during withdrawal window
- Insufficient shares check

#### 4. Advance Epoch
```rust
pub fn advance_epoch(ctx: Context<AdvanceEpoch>) -> Result<()>
```

Features:
- Calculates performance
- Accrues fees for trader
- Updates NAV
- Only after 7 days

#### 5. Claim Fees
```rust
pub fn claim_fees(ctx: Context<ClaimFees>) -> Result<()>
```

Features:
- Trader only
- Withdraws accrued performance fees

## Architecture

### Accounts

#### Vault
```
pub struct Vault {
    pub trader: Pubkey,                    // Trader wallet
    pub vault_name: String,                // Name
    pub twitter_handle: String,            // Twitter handle
    pub twitter_proof: String,             // Verification proof
    pub token_mint: Pubkey,                // Token mint
    pub performance_fee_bps: u16,          // Fee basis points
    pub total_shares: u64,                 // Total shares
    pub total_assets: u64,                 // Total AUM
    pub current_epoch: u64,                // Epoch number
    pub last_epoch_update: i64,            // Last update
    pub created_at: i64,                   // Created timestamp
    pub accrued_fees: u64,                 // Accrued fees
    pub bump: u8,                          // Bump seed
}
```

#### InvestorInfo
```
pub struct InvestorInfo {
    pub investor: Pubkey,                  // Investor wallet
    pub vault: Pubkey,                     // Vault pubkey
    pub shares: u64,                       // Shares owned
    pub deposited_at: i64,                 // First deposit
}
```

### Error Codes

- `DepositWindowClosed`: Attempted deposit outside window
- `WithdrawalWindowClosed`: Attempted withdrawal outside window
- `EpochNotReady`: Tried to advance epoch too early
- `MathOverflow`: Arithmetic overflow
- `InsufficientShares`: Not enough shares for withdrawal
- `Unauthorized`: Unauthorized action
- `InvalidPerformanceFee`: Fee > 50%
- `InvalidTwitterHandle`: Invalid format
- `InvalidTwitterProof`: Failed verification

## Setup

### Prerequisites
- Rust 1.70+
- Solana CLI 1.16+
- Anchor Framework 0.30.0
- Node.js 18+

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd hedge-vault

# Install dependencies
npm install

# Build the program
anchor build

# Run tests
anchor test
```

### Deployment

```bash
# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet
anchor deploy --provider.cluster mainnet
```

## Twitter Authentication Flow

### Frontend Implementation

```typescript
import { Wallet } from "@solana/wallet-adapter-react";
import { useTwitterAuth } from "./hooks/useTwitterAuth";

const TwitterVerification = ({ wallet, vaultName, onSuccess }) => {
  const { verifyTwitter, generateProof } = useTwitterAuth();

  const handleVerify = async () => {
    // 1. Connect Twitter OAuth
    const { handle, oauthToken } = await connectTwitter();

    // 2. Generate proof with wallet signature
    const proof = await generateProof(handle, wallet.publicKey);

    // 3. Call create_vault with proof
    await program.methods.createVault(
      vaultName,
      handle,
      proof,
      new BN(2000) // 20%
    ).accounts({
      vault: vaultPDA,
      trader: wallet.publicKey,
      // ...
    }).rpc();

    onSuccess();
  };

  return <button onClick={handleVerify}>Create Vault</button>;
};
```

### Proof Generation

The proof is a SHA-256 hash of: `{twitter_handle}:{wallet_pubkey}`

```typescript
import { sha256 } from "@noble/hashes/sha256";

function generateProof(handle: string, pubkey: PublicKey): string {
  const message = `${handle}:${pubkey.toString()}`;
  const hash = sha256(new TextEncoder().encode(message));
  return Buffer.from(hash).toString("hex");
}
```

## Jupiter Integration

### Swap Flow

```rust
pub fn swap_tokens(ctx: Context<SwapTokens>, amount: u64) -> Result<()> {
    // 1. Verify trader authorization
    require!(vault.trader == ctx.accounts.trader.key(), VaultError::Unauthorized);
    
    // 2. Call Jupiter CPI
    // In production: Call Jupiter's swap program with optimal route
    
    Ok(())
}
```

### Frontend Swap

```typescript
import { JupiterSwap } from "./jupiter";

const performSwap = async (
  vault: PublicKey,
  trader: Keypair,
  inputMint: PublicKey,
  outputMint: PublicKey,
  amount: number
) => {
  // 1. Get quote from Jupiter API
  const quote = await JupiterSwap.getQuote({
    inputMint,
    outputMint,
    amount,
    slippageBps: 50
  });

  // 2. Execute swap via program
  await program.methods.swapTokens(new BN(amount))
    .accounts({
      vault,
      trader: trader.publicKey,
      jupiterProgram: JUPITER_PROGRAM_ID,
      // ...
    })
    .signers([trader])
    .rpc();
};
```

## Security Considerations

### Epoch-based Windows
- Prevents front-running during active trading
- Clear time boundaries for operations
- Prevents emergency withdrawals during volatility

### Twitter Verification
- Prevents spam vault creation
- Adds accountability layer
- Can be extended with reputation system

### Fee Structure
- Hardcoded 50% max performance fee
- Transparent fee accrual
- Only payable after performance

### Access Control
- Trader-only for swaps and fee claims
- Investor-only for deposits/withdrawals
- PDA-based account structure prevents collisions

## Future Enhancements

### Phase 2
- [ ] Multi-token vaults
- [ ] Leverage limits
- [ ] Rebalancing automation
- [ ] Historical performance tracking

### Phase 3
- [ ] Governance system
- [ ] Risk management parameters
- [ ] Insurance fund
- [ ] Cross-chain support

## License

MIT License - see LICENSE file for details

## Contributing

Contributions welcome! Please open an issue or PR.

## Support

For questions or issues, please open a GitHub issue.

---

**Built with Anchor Framework on Solana**

