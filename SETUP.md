# Setup Guide

## Prerequisites Installation

### 1. Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
rustup update
```

### 2. Install Solana CLI

```bash
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
solana --version
```

### 3. Install Anchor Framework

```bash
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked --force
anchor --version
```

### 4. Install Node.js (18+)

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

## Project Setup

### Clone and Install

```bash
cd hedge-vault
npm install
```

### Configure Solana

```bash
# Set to devnet
solana config set --url https://api.devnet.solana.com

# Generate keypair if needed
solana-keygen new

# Airdrop SOL for testing
solana airdrop 2
```

### Build the Program

```bash
# Build Anchor program
anchor build

# This will:
# - Compile Rust code
# - Generate TypeScript types
# - Create IDL files
```

### Deploy

```bash
# Deploy to devnet
anchor deploy

# Or use the deployment script
./scripts/deploy.sh devnet
```

### Test

```bash
# Run all tests
anchor test

# Run with verbose output
anchor test -- --nocapture
```

## Development Workflow

### 1. Make Changes

Edit Rust code in `programs/hedge_vault/src/`

### 2. Build

```bash
anchor build
```

### 3. Test

```bash
anchor test
```

### 4. Deploy

```bash
anchor deploy
```

## Environment Variables

Create `.env` file:

```bash
# Solana Network
ANCHOR_PROVIDER_URL=https://api.devnet.solana.com

# Or for localnet
# ANCHOR_PROVIDER_URL=http://127.0.0.1:8899

# Wallet
ANCHOR_WALLET=~/.config/solana/id.json
```

## Troubleshooting

### Error: "Program ID mismatch"

```bash
anchor keys list
# Update Anchor.toml with correct program ID
```

### Error: "Insufficient funds"

```bash
solana balance
solana airdrop 2
```

### Error: "Build failed"

```bash
# Clean and rebuild
rm -rf target
anchor build
```

### Error: "Anchor version mismatch"

```bash
# Update Anchor
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked --force

# Check versions match in Anchor.toml
```

## Next Steps

1. ✅ Install all prerequisites
2. ✅ Run `anchor build`
3. ✅ Run `anchor test`
4. ✅ Deploy to devnet
5. ✅ Build frontend
6. ✅ Integrate with Twitter OAuth
7. ✅ Integrate with Jupiter

## Useful Commands

```bash
# Check Solana cluster
solana cluster-version

# Check balance
solana balance

# View logs
solana logs

# Inspect program
solana program show <PROGRAM_ID>

# View account
solana account <ACCOUNT_ADDRESS>
```

## Resources

- [Anchor Documentation](https://anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Jupiter API](https://station.jup.ag/docs)
- [Twitter API](https://developer.twitter.com/en/docs)

