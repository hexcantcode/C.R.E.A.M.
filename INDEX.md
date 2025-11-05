# Hedge Vault - Complete Solana Smart Contract Suite

## 📖 Documentation Index

Welcome to the Hedge Vault documentation! Choose your starting point:

### 🚀 Getting Started

1. **[QUICK_START.md](./QUICK_START.md)** - Get up and running in 5 minutes
2. **[SETUP.md](./SETUP.md)** - Detailed installation and setup instructions
3. **[README.md](./README.md)** - Comprehensive feature documentation

### 🏗️ Architecture & Design

4. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete architecture overview

### 🎯 What is Hedge Vault?

A decentralized hedge fund system on Solana with:

- ✨ **Epoch-based investment windows** (weekly cycles)
- 🔐 **Twitter authentication** required for vault creation
- 💱 **Jupiter swap integration** for token trading
- 📊 **Performance fee system** for traders
- 🔒 **Secure, auditable on-chain** operations

## 📁 Project Structure

```
hedge-vault/
├── 📄 Documentation
│   ├── INDEX.md (you are here)
│   ├── QUICK_START.md
│   ├── README.md
│   ├── SETUP.md
│   └── PROJECT_SUMMARY.md
│
├── 💻 Smart Contract (Rust)
│   └── programs/hedge_vault/src/
│       ├── lib.rs           # Main program logic
│       ├── twitter.rs       # Twitter verification
│       └── jupiter.rs       # Swap integration
│
├── 🧪 Tests
│   └── tests/
│       └── hedge-vault.ts   # TypeScript test suite
│
├── 🌐 Frontend
│   └── app/                 # React app (prepared)
│       └── README.md
│
├── 🔧 Configuration
│   ├── Anchor.toml          # Anchor framework config
│   ├── Cargo.toml           # Rust workspace
│   ├── package.json         # Node dependencies
│   └── tsconfig.json        # TypeScript config
│
└── 🚀 Scripts
    └── scripts/
        └── deploy.sh        # Deployment automation
```

## 🎯 Core Features

### 1. Vault Creation
```rust
create_vault(
    vault_name: String,
    twitter_handle: String,
    twitter_proof: String,
    performance_fee_bps: u16
)
```
- Requires valid Twitter verification
- Stores social proof on-chain
- Configurable fee structure (max 50%)

### 2. Epoch-Based System
- **Days 1-6**: Deposit & Withdrawal allowed
- **Day 7**: Trading period only
- Automatic fee calculation on epoch advance

### 3. Investment Flow
```
Investor → Deposit → Shares → Withdraw
    ↓
Performance tracked
    ↓
Fees calculated
    ↓
Trader claims fees
```

### 4. Twitter Authentication
```
User → Twitter OAuth → Generate Proof → Create Vault
                              ↓
                    On-chain Verification ✓
```

### 5. Jupiter Integration
```
Trader → Request Swap → Jupiter Quote → Execute CPI
                                          ↓
                                    Swap Complete ✓
```

## 🔑 Key Concepts

### Epoch Cycle
Every 7 days, a new epoch begins:
- Calculate performance vs. previous epoch
- Accrue performance fees
- Reset deposit/withdrawal windows

### Share System
- First deposit: 1 token = 1 share
- Subsequent: Proportional pricing based on NAV
- Withdrawals burn proportional shares

### Access Control
- **Trader**: Create vault, swap tokens, claim fees
- **Investor**: Deposit, withdraw, view position
- **System**: Epoch advancement, fee calculations

### Security
- ✅ Twitter verification prevents spam
- ✅ Time-based windows prevent manipulation
- ✅ Overflow protection on all math
- ✅ PDA-based account isolation
- ✅ Hard fee limits

## 📊 Account Model

```
┌─────────────────────────────────────┐
│         Program Account             │
│     (Deployed to Solana)            │
└────────────────┬────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
┌──────────────┐   ┌──────────────┐
│ Vault PDA    │   │ Investor PDA │
│              │   │              │
│ - Trader     │   │ - Investor   │
│ - Shares     │   │ - Shares     │
│ - Assets     │   │ - Vault ref  │
│ - Fees       │   │              │
│ - Epoch      │   └──────────────┘
│ - Twitter    │
└──────────────┘
```

## 🎓 Learning Path

### Beginner
1. Read [QUICK_START.md](./QUICK_START.md)
2. Follow setup in [SETUP.md](./SETUP.md)
3. Run `anchor test`
4. Create first vault

### Intermediate
1. Study [README.md](./README.md) features
2. Review [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
3. Read Rust code in `programs/hedge_vault/src/`
4. Understand PDAs and accounts

### Advanced
1. Extend Twitter verification
2. Implement real Jupiter CPI
3. Add governance features
4. Build full frontend
5. Deploy to mainnet

## 🛠️ Development Workflow

```bash
# 1. Setup
anchor build

# 2. Test
anchor test

# 3. Deploy
anchor deploy

# 4. Iterate
# Edit code → Build → Test → Deploy
```

## 📦 Dependencies

### Smart Contract
- `anchor-lang` - Anchor framework
- `anchor-spl` - SPL token programs
- `sha2` - Hashing for Twitter proof
- `hex` - Hex encoding

### Tests
- `@coral-xyz/anchor` - Anchor client
- `@solana/web3.js` - Solana client
- `@solana/spl-token` - Token operations

## 🚀 Quick Commands

```bash
# Build
anchor build

# Test
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet
anchor deploy --provider.cluster mainnet

# View program
solana program show <PROGRAM_ID>

# View logs
solana logs
```

## 🎯 Use Cases

### For Traders
- Create managed funds
- Earn performance fees
- Trade via Jupiter
- Build reputation

### For Investors
- Find skilled traders
- Deposit/withdraw weekly
- Track performance
- Diversify portfolio

### For Platforms
- Build fund marketplace
- Integrate DeFi protocols
- Add social features
- Create governance

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Build fails | `anchor clean && anchor build` |
| Program ID mismatch | Update `Anchor.toml` |
| Insufficient funds | `solana airdrop 2` |
| Test timeout | Increase timeout in config |

See [SETUP.md](./SETUP.md) for detailed troubleshooting.

## 📚 External Resources

- [Anchor Documentation](https://anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Jupiter API](https://station.jup.ag/docs)
- [Twitter API](https://developer.twitter.com/)
- [SPL Token Docs](https://spl.solana.com/token)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Write tests
4. Submit PR

## 📄 License

MIT License - See LICENSE file

## 💡 Next Steps

Choose your path:

1. **Quick Start** → [QUICK_START.md](./QUICK_START.md)
2. **Full Setup** → [SETUP.md](./SETUP.md)
3. **Learn Features** → [README.md](./README.md)
4. **Deep Dive** → [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

**Built with ❤️ using Anchor Framework on Solana**

Questions? Open an issue or check the docs!

