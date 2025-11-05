# Frontend Application

This directory contains the frontend application for Hedge Vault.

## Setup

### React + TypeScript + Wallet Adapter

```bash
cd app
npm install
npm run dev
```

## Features

### Vault Dashboard
- View all vaults
- Filter by performance
- Sort by AUM, returns, etc.

### Create Vault
- Twitter OAuth integration
- Set performance fee
- Configure parameters

### Investor Interface
- Deposit/Withdraw
- View portfolio
- Track performance

### Trader Interface
- Manage funds
- Execute swaps via Jupiter
- Claim fees
- Advance epochs

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_PROGRAM_ID=YOUR_PROGRAM_ID
NEXT_PUBLIC_NETWORK=mainnet

TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

JUPITER_API_URL=https://quote-api.jup.ag/v6
```

## Key Components

### Hooks
- `useWallet.ts` - Wallet connection
- `useVault.ts` - Vault data fetching
- `useTwitterAuth.ts` - Twitter OAuth
- `useJupiter.ts` - Jupiter swap integration

### Components
- `VaultCard.tsx` - Vault display card
- `DepositModal.tsx` - Deposit interface
- `TraderPanel.tsx` - Trader controls
- `TwitterVerification.tsx` - Twitter auth flow

## TODO

- [ ] Implement full UI
- [ ] Add charts and analytics
- [ ] Mobile responsive design
- [ ] Dark mode
- [ ] Notifications
- [ ] Export portfolio data

