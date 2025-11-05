# Love Fund - Frontend

A modern Next.js-based decentralized finance (DeFi) platform for epoch-based hedge fund vaults. Built with React 19, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Fund Creation**: Create funds with X (Twitter) verification
- **Two-Phase System**: 
  - **Raising Funds**: Collect 25 SOL to go live
  - **Active Funds**: Live trading with weekly 7-day epochs
- **Token System**: Investors receive ticker tokens pro rata to SOL investments
- **Dynamic Performance Fees**: 10% fee per 100% (1x) performance increase
- **Twitter Integration**: Profile pictures and social links
- **Fund Analytics**: Allocation breakdown and PnL charts
- **Trader Profiles**: Historical trading data and performance metrics
- **3D Landing Page**: Immersive WebGL particle system

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

```bash
# Navigate to frontend directory
cd app/frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
app/frontend/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page (Hero + Funds)
│   ├── fund/[id]/         # Fund details page
│   ├── profile/[trader]/  # Trader profile page
│   └── layout.tsx         # Root layout
│
├── components/            # React components
│   ├── hero.tsx          # Hero section with "Create Fund" CTA
│   ├── create-fund-modal.tsx  # Fund creation modal
│   ├── vault-card.tsx    # Fund card component
│   ├── header.tsx        # Landing page header
│   └── ui/               # Shadcn/ui components
│
├── utils/                # Utility functions
│   └── performance-fee.ts # Performance fee calculations
│
├── public/               # Static assets
│   ├── Sentient-*.woff  # Custom fonts
│   └── ...
│
└── styles/               # Global styles
    └── globals.css
```

## 🎯 Key Concepts

### Fundraising Phase
- Funds start in "Raising" status
- Target: **25 SOL** to go live
- Investors contribute SOL
- Progress tracked with visual progress bars

### Active Trading Phase
- After reaching 25 SOL, fund goes "Active"
- **Weekly 7-day trading epochs** begin
- Fund manager trades on behalf of investors
- Epoch progress tracked visually

### Token System
- Investors receive **ticker tokens** (e.g., "ALPHA") 
- Tokens distributed **pro rata** to SOL investments
- Tokens represent ownership in the fund
- Token value increases with fund performance

### Performance Fees
Dynamic fee structure based on fund performance:
- **1x** (100% gain) = **10%** fee
- **2x** (200% gain) = **20%** fee  
- **3x** (300% gain) = **30%** fee
- Formula: `Math.floor(multiplier) × 10%`

## 🛠️ Technology Stack

- **Framework**: Next.js 15.2.4 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **Components**: Radix UI + Shadcn/ui
- **3D Graphics**: React Three Fiber + Three.js
- **Font**: Custom Sentient font (Extralight, Light Italic)

## 📱 Routes

- `/` - Landing page with Hero and Active/Raising Funds tabs
- `/fund/[id]` - Individual fund details (allocation, charts, invest)
- `/profile/[trader]` - Trader profile (PnL charts, trading history)

## 🎨 Design System

### Colors
- **Primary**: `#FFC700` (Yellow) - `yellow-200`
- **Background**: `#000000` (Black)
- **Text**: `#FFFFFF` (White) / `#A3A3A3` (Gray)
- **Borders**: `#424242` (Dark Gray)

### Typography
- **Headings**: Sentient font (Extralight, Light Italic)
- **Body**: System fonts
- **Code/Data**: Geist Mono

## 🚦 User Flows

### Create a Fund
1. Click "Create Fund" button on landing page
2. Enter fund name (required) and ticker (optional)
3. Login with X (Twitter)
4. Click "Initiate {fundName}"
5. Fund appears in "Raising Funds" tab

### Invest in a Fund
1. Browse funds in "Raising Funds" or "Active Funds" tab
2. Click on a fund card
3. View fund details
4. Enter SOL amount to invest
5. Receive ticker tokens pro rata

### View Fund Performance
1. Navigate to fund details page
2. View Overview tab for position and stats
3. Check Allocation tab for asset breakdown
4. View Charts tab for PnL visualization

## 📊 Components

### Key Components

- **`CreateFundModal`**: Multi-step modal for fund creation
- **`VaultCard`**: Displays fund information (supports active/raising)
- **`Hero`**: Landing page hero with "Create Fund" CTA
- **Fund Detail Pages**: Allocation, charts, and investment forms
- **Profile Pages**: Trader statistics and PnL charts

See [FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md) for detailed component documentation.

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Add your environment variables here
# Example:
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Tailwind Config

Custom configuration in `tailwind.config.js`:
- Custom colors (yellow, dark shades)
- Font families (Sentient, Geist Mono)
- Container settings

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

### Font not loading
- Verify font files exist in `/public/`
- Check `@font-face` declarations in `globals.css`

### Styles not applying
- Restart dev server
- Clear `.next` cache: `rm -rf .next`

### Build errors
- Clear all caches: `rm -rf .next node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## 📚 Documentation

- **[FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md)** - Complete frontend documentation
- **[ACTION_FLOW_DIAGRAM.md](./ACTION_FLOW_DIAGRAM.md)** - Visual user flow diagrams
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Developer quick reference guide
- **[README_FRONTEND.md](./README_FRONTEND.md)** - Documentation index

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## 📄 License

See project root for license information.

## 👥 Contributing

1. Follow the existing code style
2. Use TypeScript for all components
3. Add proper type definitions
4. Test responsive design
5. Update documentation when adding features

## 🆘 Support

For questions or issues:
- Review documentation files
- Check component source code
- Review Git history for context

---

**Built with ❤️ for Love Fund**
