# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites

Ensure you have installed:
- ✅ Rust (1.70+)
- ✅ Solana CLI (1.16+)
- ✅ Anchor Framework (0.30.0)
- ✅ Node.js (18+)

See [SETUP.md](./SETUP.md) for detailed installation instructions.

### 1. Clone & Setup

```bash
cd hedge-vault
npm install
anchor build
```

### 2. Configure Solana

```bash
# Switch to devnet
solana config set --url https://api.devnet.solana.com

# Get some SOL
solana airdrop 2
```

### 3. Deploy

```bash
anchor deploy
```

Or use the deployment script:
```bash
./scripts/deploy.sh devnet
```

### 4. Run Tests

```bash
anchor test
```

## 📋 Key Concepts

### Epoch Cycle

```
┌─────────────────────────────────────┐
│            Week 1                   │
├─────────────────────────────────────┤
│ Days 1-6: ✓ Deposit ✓ Withdraw     │
│ Day 7:   → Trading Only             │
└─────────────────────────────────────┘
        ↓ advance_epoch()
┌─────────────────────────────────────┐
│            Week 2                   │
├─────────────────────────────────────┤
│ Days 1-6: ✓ Deposit ✓ Withdraw     │
│ Day 7:   → Trading Only             │
└─────────────────────────────────────┘
```

### Twitter Verification Flow

```typescript
1. User connects Twitter OAuth
   ↓
2. Generate proof: sha256(handle + pubkey)
   ↓
3. Submit to create_vault()
   ↓
4. Program verifies proof on-chain
   ↓
5. Vault created ✓
```

### Share Calculation

```typescript
// First deposit: 1:1
shares = amount

// Subsequent deposits
shares = (amount * total_shares) / total_assets
```

### Fee Distribution

```typescript
// On epoch advance
profit = new_assets - old_assets
fee = (profit * fee_bps) / 10000

// Trader claims later
claim_fees() → withdraws accrued fees
```

## 🎯 Common Operations

### Create a Vault

```typescript
import { Program } from "@coral-xyz/anchor";
import { HedgeVault } from "./target/types/hedge_vault";

// Generate Twitter proof
const handle = "your_twitter_handle";
const message = `${handle}:${wallet.publicKey}`;
const proof = sha256(message); // Convert to hex

// Create vault
await program.methods.createVault(
  "My Vault",
  handle,
  proof,
  new BN(2000) // 20% fee
).accounts({
  vault: vaultPDA,
  trader: wallet.publicKey,
  tokenMint: usdcMint,
  systemProgram: SystemProgram.programId,
}).rpc();
```

### Deposit Funds

```typescript
await program.methods.deposit(
  new BN(1000) // amount
).accounts({
  vault: vaultPDA,
  investorInfo: investorPDA,
  investor: investor.publicKey,
  investorVault: investorTokenAccount,
  vaultTokenAccount: vaultTokenAccount,
  tokenProgram: TOKEN_PROGRAM_ID,
  systemProgram: SystemProgram.programId,
}).rpc();
```

### Withdraw Funds

```typescript
await program.methods.withdraw(
  new BN(500) // amount
).accounts({
  vault: vaultPDA,
  investorInfo: investorPDA,
  investor: investor.publicKey,
  investorVault: investorTokenAccount,
  vaultTokenAccount: vaultTokenAccount,
  tokenProgram: TOKEN_PROGRAM_ID,
}).rpc();
```

### Advance Epoch

```typescript
// Call after 7 days
await program.methods.advanceEpoch()
  .accounts({
    vault: vaultPDA,
    vaultTokenAccount: vaultTokenAccount,
  })
  .rpc();
```

### Claim Fees (Trader Only)

```typescript
await program.methods.claimFees()
  .accounts({
    vault: vaultPDA,
    trader: trader.publicKey,
    vaultTokenAccount: vaultTokenAccount,
    traderVault: traderTokenAccount,
    tokenProgram: TOKEN_PROGRAM_ID,
  })
  .rpc();
```

## 📊 Program Architecture

```
┌─────────────────────────────────────────┐
│         Hedge Vault Program             │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐    ┌──────────────┐  │
│  │   create_    │    │   deposit    │  │
│  │   vault      │    │              │  │
│  └──────┬───────┘    └──────┬───────┘  │
│         │                   │          │
│         ▼                   ▼          │
│  ┌────────────────────────────────┐    │
│  │   Vault State (PDA)            │    │
│  │   - shares, assets, fees       │    │
│  │   - epoch, twitter handle      │    │
│  └────────────────────────────────┘    │
│                                         │
│  ┌──────────────┐    ┌──────────────┐  │
│  │  advance_    │    │   claim_     │  │
│  │  epoch       │    │   fees       │  │
│  └──────────────┘    └──────────────┘  │
│                                         │
│  ┌──────────────┐    ┌──────────────┐  │
│  │  Twitter     │    │   Jupiter    │  │
│  │  Auth        │    │   Swap       │  │
│  └──────────────┘    └──────────────┘  │
└─────────────────────────────────────────┘
```

## 🔍 Inspecting Program

### View Vault Details

```bash
# Get vault account
solana account <VAULT_PDA> -o vault.json

# Parse
solana account --output json-compact <VAULT_PDA>
```

### Check Program

```bash
# View deployed program
solana program show <PROGRAM_ID>

# View logs
solana logs | grep <PROGRAM_ID>
```

## 🐛 Troubleshooting

### "Program ID mismatch"

```bash
# Update with correct ID
anchor keys list
# Edit Anchor.toml
```

### "Insufficient funds"

```bash
solana balance
solana airdrop 2
```

### "Epoch not ready"

Wait 7 days or manually adjust `last_epoch_update` in tests.

### "Unauthorized"

Ensure correct wallet/signer is used for trader operations.

## 📚 Additional Resources

- [README.md](./README.md) - Full documentation
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Architecture details
- [SETUP.md](./SETUP.md) - Setup instructions
- [Anchor Docs](https://anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)

## 🎓 Next Steps

1. ✅ Complete setup
2. ✅ Deploy to devnet
3. ✅ Create test vault
4. ✅ Test deposit/withdraw
5. ✅ Integrate frontend
6. ✅ Add Jupiter swaps
7. ✅ Deploy to mainnet

## 📞 Support

For issues or questions:
- Open GitHub issue
- Check documentation
- Review test files
- Examine error codes

---

**Happy coding! 🚀**

