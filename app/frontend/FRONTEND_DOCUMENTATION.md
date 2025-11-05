# Love Fund - Frontend Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Architecture Overview](#architecture-overview)
6. [Component Breakdown](#component-breakdown)
7. [Routing & Page Flow](#routing--page-flow)
8. [Styling System](#styling-system)
9. [User Action Flow](#user-action-flow)
10. [Key Features](#key-features)

---

## Project Overview

**Love Fund** is a Next.js-based decentralized finance (DeFi) platform that enables epoch-based hedge fund vaults. The application allows Twitter-verified traders to create and manage investment vaults, while investors can deposit, withdraw, and track performance on a weekly epoch cycle.

### Key Concepts
- **Funds**: Investment funds managed by Twitter-verified traders
- **Fundraising Phase**: Funds start in raising phase, requiring 25 SOL to go live
- **Epochs**: Once a fund reaches 25 SOL, it goes live and begins weekly 7-day trading epochs. Each epoch is a full trading cycle where the fund manager trades on behalf of investors.
- **Token System**: Investors receive ticker tokens (e.g., "ALPHA" tokens) pro rata to their SOL investments. These tokens represent ownership in the fund.
- **Performance Fees**: Dynamic fee system - 10% fee per 100% (1x) performance increase
  - 1x (100% gain) = 10% fee
  - 2x (200% gain) = 20% fee
  - 3x (300% gain) = 30% fee
- **TVL**: Total Value Locked in a fund
- **Raising Funds**: Funds still collecting SOL to reach 25 SOL cap
- **Active Funds**: Funds that have reached 25 SOL and are live with active trading epochs

---

## Technology Stack

### Core Framework
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Custom Sentient Font** - Primary typography (Extralight & Light Italic variants)
- **CSS Custom Properties** - Theme variables

### UI Components
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Component library built on Radix
- **Lucide React** - Icon library

### 3D Graphics
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Three.js** - 3D graphics library
- Custom WebGL particle system for landing page

### State Management
- **React Hooks** - useState, useEffect for local state
- **Leva** - Debug UI controls

### Form Handling
- **React Hook Form** - Form state management
- **Zod** - Schema validation

---

## Project Structure

```
app/frontend/
├── app/                          # Next.js App Router
│   ├── app/                      # Application pages (behind auth)
│   │   ├── page.tsx             # Main vault listing page
│   │   ├── create/
│   │   │   └── page.tsx         # Create new vault page
│   │   └── vault/
│   │       └── [id]/
│   │           └── page.tsx     # Individual vault details
│   ├── layout.tsx               # Root layout (landing page)
│   ├── page.tsx                 # Landing page (Hero + Active/Raising Funds)
│   ├── fund/
│   │   └── [id]/
│   │       └── page.tsx         # Individual fund details with allocation & charts
│   ├── profile/
│   │   └── [trader]/
│   │       └── page.tsx         # Trader profile with PnL charts
│   └── globals.css              # Global styles & font definitions
│
├── components/                   # Reusable React components
│   ├── header.tsx               # Landing page header
│   ├── app-header.tsx           # App header with navigation
│   ├── hero.tsx                 # Landing page hero section
│   ├── logo.tsx                 # Logo SVG component
│   ├── mobile-menu.tsx          # Mobile navigation menu
│   ├── pill.tsx                 # Badge/pill component
│   ├── vault-card.tsx           # Fund card component (supports active/raising)
│   ├── create-fund-modal.tsx    # Modal for creating new funds
│   ├── theme-provider.tsx       # Theme context provider
│   │
│   ├── gl/                      # 3D WebGL components
│   │   ├── index.tsx           # Main GL component
│   │   ├── particles.tsx       # Particle system
│   │   └── shaders/            # Custom shaders
│   │       ├── pointMaterial.ts
│   │       ├── simulationMaterial.ts
│   │       ├── utils.ts
│   │       └── vignetteShader.ts
│   │
│   └── ui/                      # Shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ... (40+ components)
│
├── lib/
│   └── utils.ts                 # Utility functions (cn, etc.)
│
├── hooks/
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
│
├── public/                      # Static assets
│   ├── Sentient-Extralight.woff
│   ├── Sentient-LightItalic.woff
│   └── ... (images, logos)
│
├── styles/
│   └── globals.css             # Additional global styles
│
├── tailwind.config.js          # Tailwind configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

---

## Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation Steps

1. **Navigate to frontend directory**
```bash
cd app/frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open in browser**
```
http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

---

## Architecture Overview

### Application Structure

The app follows Next.js 13+ App Router pattern with two main sections:

1. **Landing Page** (`/`) - Public marketing page
2. **Application** (`/app/*`) - Protected vault management interface

### Component Hierarchy

```
RootLayout (app/layout.tsx)
├── Header (components/header.tsx)
└── Page Router
    ├── Landing Page (app/page.tsx)
    │   ├── Hero (components/hero.tsx)
    │   └── GL (components/gl/index.tsx) - 3D Background
    │
    └── App Pages (app/app/*)
        ├── AppHeader (components/app-header.tsx)
        ├── Vault Listing (app/app/page.tsx)
        ├── Create Vault (app/app/create/page.tsx)
        └── Vault Details (app/app/vault/[id]/page.tsx)
```

---

## Component Breakdown

### 1. Landing Page Components

#### `components/header.tsx`
- **Purpose**: Navigation bar for landing page
- **Features**:
  - "Love Fund" branding (uses `font-sentient`)
  - "Go to App" button
  - Mobile menu integration
- **Styling**: Fixed position, responsive design

#### `components/hero.tsx`
- **Purpose**: Hero section with call-to-action
- **Features**:
  - Large heading with Sentient font
  - Subtitle text
  - "Create Fund" button that opens modal
  - 3D WebGL background (`<GL />` component)
- **State**: Manages modal open/close state
- **Styling**: Full viewport height, centered content

#### `components/create-fund-modal.tsx`
- **Purpose**: Multi-step modal for creating new funds
- **Steps**:
  1. **Details Step**: Fund name (required) and ticker (optional)
  2. **Login Step**: X/Twitter social login
- **Features**:
  - Form validation for fund name
  - Info text about ticker tokens (pro rata to SOL)
  - Requirements info box (25 SOL, epochs, performance fees)
  - X login integration
  - Final "Initiate {fundName}" button after login
- **Validation**: Fund name is required, ticker is optional

#### `components/gl/index.tsx`
- **Purpose**: 3D particle system background
- **Features**:
  - React Three Fiber canvas
  - Custom particle shaders
  - Vignette effect
  - Leva controls for debugging
- **Implementation**: WebGL with custom shaders

### 2. Application Components

#### `components/app-header.tsx`
- **Purpose**: Navigation for authenticated app pages
- **Features**:
  - Logo with "hedgevault" branding
  - Navigation links (Vaults, Create, Analytics)
  - Wallet connection button
- **State**: Manages wallet connection status

#### `app/page.tsx` - Landing Page with Funds
- **Purpose**: Hero section + Active/Raising Funds tabs
- **Features**:
  - Hero component with "Create Fund" CTA
  - Two-tab system: "Active Funds" and "Raising Funds"
  - Active Funds: Funds that reached 25 SOL and are live trading
  - Raising Funds: Funds still collecting SOL (up to 25 SOL)
  - Card grid displaying fund information
- **State**: Active tab state (`active` | `raising`)

#### `components/vault-card.tsx`
- **Purpose**: Display individual fund information with Twitter integration
- **Props**:
  ```typescript
  {
    fund: {
      id: number
      name: string
      ticker?: string | null
      trader: string
      traderName: string
      pfp: string  // Twitter profile picture
      tvl?: number
      performance?: number
      multiplier?: number
      epoch?: number
      fee: number
      status: 'active' | 'raising'
      targetCap: number  // 25 SOL
      raised: number  // In SOL
      twitterHandle: string
    }
    type: 'active' | 'raising'
  }
  ```
- **Features**:
  - Twitter profile picture (PFP) display
  - Trader nickname from Twitter
  - Link to trader's Twitter profile
  - Different display for Active vs Raising:
    - **Active**: Shows TVL, Performance, Multiplier, Epoch, Fee
    - **Raising**: Shows Raised SOL, Target SOL, Progress bar, Fee
  - Status badge (ACTIVE / RAISING)
  - Hover effects
  - "View Fund" or "Contribute" button based on status

#### `app/app/create/page.tsx` - Create Vault
- **Purpose**: Form to create new investment vault
- **Form Fields**:
  - Vault Name
  - Twitter Handle
  - Twitter Proof (hash)
  - Performance Fee (slider, 0-50%)
- **Features**:
  - Form validation
  - Terms & conditions
  - How it works section

#### `app/fund/[id]/page.tsx` - Fund Details
- **Purpose**: Individual fund page with allocation and charts
- **Features**:
  - Fund header with trader PFP and Twitter link
  - Stats grid: TVL, Performance, Epoch, Performance Fee
  - Epoch progress bar (7-day trading cycle)
  - Three tabs:
    1. **Overview**: Position details, token holdings, invest form
    2. **Allocation**: Asset allocation breakdown with percentages
    3. **Charts**: PnL chart with historical data
  - Token system: Shows ticker token holdings (pro rata to SOL)
  - Invest form: Invest SOL and receive ticker tokens
- **State**: Active tab, deposit amounts
- **Data Display**:
  - Token holdings (e.g., ALPHA tokens)
  - SOL invested
  - Current token value
  - PnL calculations
  - Fund allocation percentages

#### `app/profile/[trader]/page.tsx` - Trader Profile
- **Purpose**: Display trader's social profile and trading history
- **Features**:
  - Trader header with PFP, name, Twitter handle
  - Twitter verification badge
  - Social stats (followers, join date)
  - Trading statistics: Total PnL, Win Rate, Total Trades
  - Two tabs:
    1. **Trading History**: Weekly PnL breakdown
    2. **PnL Chart**: Cumulative PnL visualization
  - Links to active funds managed by trader
- **Data**: Historical trading data with PnL calculations

### 3. Shared Components

#### `components/ui/*`
- **Purpose**: Reusable UI primitives from Shadcn/ui
- **Key Components**:
  - `button.tsx` - Button variants
  - `card.tsx` - Card container
  - `dialog.tsx` - Modal dialogs
  - `input.tsx` - Form inputs
  - `select.tsx` - Dropdown selects
  - 40+ other components

---

## Routing & Page Flow

### Route Structure

```
/                          → Landing page (Hero + Active/Raising Funds tabs)
├── /app                   → Legacy app pages (if needed)
├── /app/create            → Create new vault (legacy)
├── /app/vault/[id]       → Legacy vault details
├── /fund/[id]            → Individual fund details (allocation, charts, invest)
└── /profile/[trader]     → Trader profile (PnL charts, trading history)
```

### Navigation Flow

```
Landing Page (/)
    ├─→ [Click "Create Fund"] → Create Fund Modal
    │       ├─→ Step 1: Enter Fund Name & Ticker
    │       ├─→ Step 2: Login with X (Twitter)
    │       └─→ [Initiate Fund] → Fund Created
    │
    ├─→ [Active Funds Tab] → View Active Funds
    │       └─→ [Click Fund Card] → Fund Details (/fund/[id])
    │               ├─→ Overview Tab (position, invest)
    │               ├─→ Allocation Tab (asset breakdown)
    │               └─→ Charts Tab (PnL history)
    │
    └─→ [Raising Funds Tab] → View Raising Funds
            └─→ [Click Fund Card] → Fund Details (/fund/[id])
                    └─→ Contribute SOL

Fund Details (/fund/[id])
    └─→ [Click Trader] → Trader Profile (/profile/[trader])
            ├─→ Trading History Tab
            └─→ PnL Chart Tab
```

### URL Parameters
- `/app/vault/[id]` - Dynamic route parameter for vault ID

---

## Styling System

### Font System

#### Primary Font: Sentient
The landing page uses **Sentient** font as the main typography:

```css
/* Defined in app/globals.css */
@font-face {
  font-family: 'Sentient';
  src: url('/Sentient-Extralight.woff') format('woff');
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: 'Sentient';
  src: url('/Sentient-LightItalic.woff') format('woff');
  font-weight: 300;
  font-style: italic;
}
```

#### Usage
- **Landing Page**: `font-sentient` class (Hero headings, Header logo)
- **Body Text**: Geist Mono (for monospace text)
- **Application Pages**: System fonts with Sentient for headings

#### Font Classes
- `.font-sentient` - Apply Sentient font
- `.font-mono` - Apply Geist Mono font

### Color System

#### Primary Colors
```css
--background: #000000      /* Black background */
--foreground: #ffffff      /* White text */
--primary: #FFC700         /* Yellow accent */
--border: #424242          /* Gray borders */
```

#### Tailwind Colors
- `yellow-200`: `#FFC700` - Primary accent
- `yellow-300`: `#FFB800` - Hover state
- `neutral-400`: Text secondary
- `neutral-800`: Borders
- `dark-200`, `dark-300`: App-specific dark shades

### Component Styling

#### Card Components
```tsx
className="bg-black border border-yellow-200/20 hover:border-yellow-200/40"
```

#### Buttons
```tsx
// Primary button
className="bg-yellow-200 text-black hover:bg-yellow-300"

// Secondary button
className="bg-black border border-yellow-200 text-yellow-200"
```

#### Status Badges
```tsx
// Open status
className="bg-yellow-200 text-black"

// Closed status
className="bg-neutral-900 text-neutral-400"
```

---

## User Action Flow

### Flow 1: Landing → Vault Listing → View Vault

```
1. User lands on homepage (/)
   - Sees hero section with 3D particle background
   - Reads "Become a fund manager in trenches"
   
2. User clicks "Go to App" button
   → Navigates to /app
   
3. Vault Listing Page displays:
   - Hero: "hedgevault" branding
   - Stats: Total Vaults, TVL, Avg Performance
   - Filter buttons: All/Open/Closed
   - Grid of vault cards
   
4. User clicks filter (e.g., "Open")
   → State updates: filter = 'open'
   → Vaults filtered by status
   
5. User clicks "View Details" on a vault card
   → Navigates to /app/vault/[id]
   
6. Vault Details Page:
   - Header: Vault name and trader
   - Stats Grid: TVL, Performance, Epoch, Investors
   - Epoch Progress Bar: Shows day X/7
   - Tabs: Overview (default), Deposit, Withdraw
   
7. User views Overview tab:
   - Sees "My Position": Shares, Balance, Current Value
   - Sees "Vault Details": Fee, Created date, Status
```

### Flow 5: Performance Fee Calculation

```
1. User on Vault Details page (/app/vault/[id])

2. User clicks "Deposit" tab
   → Tab switches: activeTab = 'deposit'

3. Deposit form displays:
   - Amount input field
   - Quick select buttons: $100, $500, $1000, $5000

4. User enters amount or clicks quick select
   → State updates: depositAmount = '1000'

5. User clicks "Deposit" button
   → Deposit handler triggered
   → (Wallet connection & transaction needed)
```

### Flow 4: Withdraw Funds

```
1. User on Vault Details page (/app/vault/[id])

2. User clicks "Withdraw" tab
   → Tab switches: activeTab = 'withdraw'

3. Withdraw form displays:
   - Amount input field
   - Quick select: $500, $1000, $2500, MAX

4. User clicks "MAX" button
   → State updates: withdrawAmount = vault.myBalance

5. User clicks "Withdraw" button
   → Withdraw handler triggered
   → (Wallet connection & transaction needed)
```

### Flow 5: Wallet Connection

```
1. User on any app page (/app/*)

2. User clicks "Connect Wallet" button
   → State updates: connected = true
   → Button changes to "Disconnect"

3. User clicks "Disconnect"
   → State updates: connected = false
   → Button changes to "Connect Wallet"
```

---

## Key Features

### 1. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Mobile menu with hamburger icon
- Responsive grid layouts

### 2. 3D Visual Effects
- WebGL particle system on landing page
- Custom shaders for visual effects
- Performance optimized with React Three Fiber

### 3. Epoch System Visualization
- Progress bars showing epoch day (1-7)
- Status indicators for deposit/withdrawal windows
- Epoch count display

### 4. Filtering & Search
- Vault status filtering (All/Open/Closed)
- Future: Search by name, trader, etc.

### 5. Form Handling
- React Hook Form for form state
- Input validation
- Quick select buttons for amounts

### 6. Typography
- Custom Sentient font for branding
- Consistent font hierarchy
- Monospace font for code/data

---

## Code Examples

### Creating a New Vault Card

```tsx
<VaultCard 
  vault={{
    id: 1,
    name: 'Alphaverse Fund',
    trader: '@alpha_trader',
    tvl: 2450000,
    performance: 23.5,
    epoch: 12,
    fee: 20,
    status: 'open'
  }}
/>
```

### Using Sentient Font

```tsx
<h1 className="text-6xl font-bold font-sentient">
  <span className="text-white">hedge</span>
  <span className="text-yellow-200">vault</span>
</h1>
```

### Filter Implementation

```tsx
const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all')

const filteredVaults = filter === 'all' 
  ? mockVaults 
  : mockVaults.filter(v => v.status === filter)
```

### Tab Navigation

```tsx
const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw'>('overview')

<Tab active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
  Overview
</Tab>
```

---

## Development Guidelines

### Component Structure
1. Use TypeScript for all components
2. Prefer functional components with hooks
3. Extract reusable logic into custom hooks
4. Use `'use client'` directive for client components

### Styling Conventions
1. Use Tailwind utility classes
2. Extract repeated patterns into component variants
3. Use CSS variables for theme colors
4. Apply `font-sentient` to main headings

### State Management
1. Use `useState` for local component state
2. Consider Context API for global state (wallet, user)
3. Future: Integrate state management library if needed

### File Organization
1. Keep components in `/components` directory
2. Use `/components/ui` for generic UI primitives
3. Page-specific components can live with pages
4. Shared utilities in `/lib`

---

## Future Enhancements

### Planned Features
- [ ] Wallet integration (Solana Wallet Adapter)
- [ ] Real-time vault data from blockchain
- [ ] Chart visualizations for performance
- [ ] Transaction history
- [ ] User authentication
- [ ] Vault analytics dashboard
- [ ] Social features (comments, sharing)
- [ ] Advanced filtering and search
- [ ] Dark/light theme toggle

### Integration Points
- Solana program integration
- Twitter OAuth for verification
- Real-time data fetching
- Transaction signing and submission

---

## Troubleshooting

### Common Issues

1. **Font not loading**
   - Check `/public` directory for font files
   - Verify `@font-face` declarations in `globals.css`

2. **3D particles not rendering**
   - Ensure WebGL is supported in browser
   - Check console for Three.js errors

3. **Styling issues**
   - Run `npm run build` to check Tailwind compilation
   - Verify Tailwind config is correct

4. **Navigation not working**
   - Check Next.js router is properly configured
   - Verify `Link` components from `next/link`

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Radix UI](https://www.radix-ui.com/)
- [Shadcn/ui](https://ui.shadcn.com/)

---

## Contact & Support

For questions or issues with the frontend codebase, refer to:
- Project documentation in `/Users/ege/hedge-vault`
- README files in project root
- Component source code with inline comments

