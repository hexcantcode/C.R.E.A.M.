# Love Fund - Quick Reference Guide

A quick reference guide for frontend developers working on the Love Fund application.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

**Development URL**: `http://localhost:3000`

---

## 📁 File Locations

### Key Files
- **Root Layout**: `app/layout.tsx`
- **Landing Page**: `app/page.tsx`
- **Vault Listing**: `app/app/page.tsx`
- **Create Vault**: `app/app/create/page.tsx`
- **Vault Details**: `app/app/vault/[id]/page.tsx`
- **Global Styles**: `app/globals.css`
- **Tailwind Config**: `tailwind.config.js`

### Component Directories
- **Landing Components**: `components/header.tsx`, `components/hero.tsx`
- **App Components**: `components/app-header.tsx`, `components/vault-card.tsx`
- **UI Primitives**: `components/ui/*`
- **3D Components**: `components/gl/*`

---

## 🎨 Styling Quick Reference

### Fonts

```tsx
// Sentient font (for headings/branding)
<h1 className="font-sentient">Love Fund</h1>

// Monospace font (for data/code)
<p className="font-mono">$12,345</p>

// Default system font (for body text)
<p>Regular text</p>
```

### Colors

```tsx
// Primary accent (yellow)
className="text-yellow-200"      // Yellow text
className="bg-yellow-200"        // Yellow background
className="border-yellow-200"    // Yellow border

// Hover states
className="hover:bg-yellow-300"   // Darker yellow on hover

// Text colors
className="text-white"            // White text
className="text-neutral-400"      // Gray text
className="text-black"             // Black text

// Backgrounds
className="bg-black"               // Black background
className="bg-neutral-900"        // Dark gray background

// Borders
className="border-neutral-800"    // Gray border
className="border-yellow-200/20"   // Semi-transparent yellow border
```

### Common Patterns

```tsx
// Card component
<div className="bg-black border border-yellow-200/20 hover:border-yellow-200/40 p-6">
  {/* Card content */}
</div>

// Primary button
<button className="bg-yellow-200 text-black hover:bg-yellow-300 font-bold py-3 px-6">
  Click Me
</button>

// Secondary button
<button className="bg-black border border-yellow-200 text-yellow-200 hover:border-yellow-300 py-3 px-6">
  Click Me
</button>

// Status badge (open)
<span className="bg-yellow-200 text-black px-3 py-1 text-xs font-bold">
  OPEN
</span>

// Status badge (closed)
<span className="bg-neutral-900 text-neutral-400 px-3 py-1 text-xs font-bold">
  CLOSED
</span>
```

---

## 🧩 Component Templates

### Create a New Page

```tsx
'use client'

export default function NewPage() {
  return (
    <div className="min-h-screen bg-black">
      <header>
        {/* Header content */}
      </header>
      
      <main className="container mx-auto px-4 py-12">
        {/* Page content */}
      </main>
    </div>
  )
}
```

### Create a Vault Card Component

```tsx
interface VaultCardProps {
  vault: {
    id: number
    name: string
    trader: string
    tvl: number
    performance: number
    status: 'open' | 'closed'
  }
}

export default function VaultCard({ vault }: VaultCardProps) {
  return (
    <div className="bg-black border border-yellow-200/20 hover:border-yellow-200/40 transition-colors p-6">
      <h3 className="text-xl font-bold mb-1">{vault.name}</h3>
      <p className="text-yellow-200 text-sm">{vault.trader}</p>
      {/* More content */}
    </div>
  )
}
```

### Create a Filter Component

```tsx
const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all')

const filteredItems = filter === 'all' 
  ? allItems 
  : allItems.filter(item => item.status === filter)

<div className="flex gap-2">
  <button
    onClick={() => setFilter('all')}
    className={filter === 'all' ? 'bg-yellow-200 text-black' : 'bg-black border border-neutral-800'}
  >
    All
  </button>
  {/* More buttons */}
</div>
```

### Create a Tab Component

```tsx
const [activeTab, setActiveTab] = useState<'tab1' | 'tab2'>('tab1')

<div className="flex gap-2 mb-8">
  <button
    onClick={() => setActiveTab('tab1')}
    className={activeTab === 'tab1' 
      ? 'bg-yellow-200 text-black' 
      : 'bg-black border border-neutral-800 text-neutral-400'
    }
  >
    Tab 1
  </button>
  <button onClick={() => setActiveTab('tab2')}>Tab 2</button>
</div>

{activeTab === 'tab1' && <Tab1Content />}
{activeTab === 'tab2' && <Tab2Content />}
```

---

## 🔧 Common Tasks

### Format Currency

```tsx
const formatCurrency = (num: number) => {
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
  if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`
  return `$${num}`
}

// Usage
<span>{formatCurrency(2450000)}</span>  // "$2.45M"
```

### Navigate Between Pages

```tsx
import Link from 'next/link'

// Simple link
<Link href="/app">Go to App</Link>

// Link with styling
<Link href="/app" className="bg-yellow-200 text-black px-6 py-2">
  Go to App
</Link>

// Programmatic navigation
import { useRouter } from 'next/navigation'

const router = useRouter()
router.push('/app')
```

### Use UI Components

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog } from '@/components/ui/dialog'

<Button className="bg-yellow-200">Click Me</Button>

<Card className="p-6">
  <h3>Card Title</h3>
</Card>

<Dialog>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>Modal content</Dialog.Content>
</Dialog>
```

---

## 📱 Responsive Design

### Breakpoints

```tsx
// Mobile first approach
className="text-sm md:text-base lg:text-lg"

// Show/hide on different screens
className="hidden md:block"        // Hidden on mobile, visible on tablet+
className="block md:hidden"        // Visible on mobile, hidden on tablet+
className="max-md:hidden"          // Hidden below md breakpoint

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Responsive spacing
className="p-4 md:p-6 lg:p-8"
```

### Common Responsive Patterns

```tsx
// Responsive text sizes
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">

// Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

// Responsive padding
<div className="px-4 md:px-8 lg:px-12">

// Responsive flex direction
<div className="flex flex-col md:flex-row gap-4">
```

---

## 🎯 State Management

### Local State with useState

```tsx
const [value, setValue] = useState<string>('')
const [isOpen, setIsOpen] = useState<boolean>(false)
const [items, setItems] = useState<Item[]>([])

// Update state
setValue('new value')
setIsOpen(true)
setItems([...items, newItem])
```

### Form Handling

```tsx
const [formData, setFormData] = useState({
  name: '',
  email: ''
})

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  // Handle submission
}
```

---

## 🐛 Debugging Tips

### Check Component State

```tsx
// Add console.log to see state
console.log('Current filter:', filter)
console.log('Filtered vaults:', filteredVaults)

// Use React DevTools
// Install: React Developer Tools browser extension
```

### Check Styling

```tsx
// Use browser DevTools
// Inspect element → Check computed styles
// Verify Tailwind classes are applied

// Check if font is loading
// Network tab → Filter by "woff" → Check Sentient fonts
```

### TypeScript Errors

```bash
# Run TypeScript check
npx tsc --noEmit

# Or in VS Code
# Hover over red underlines for error details
```

---

## 📦 Common Imports

```tsx
// Next.js
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// React
import { useState, useEffect } from 'react'

// Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Utils
import { cn } from '@/lib/utils'

// Icons
import { Menu, X } from 'lucide-react'
```

---

## 🔗 Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Radix UI**: https://www.radix-ui.com/
- **Shadcn/ui**: https://ui.shadcn.com/
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## ⚡ Performance Tips

### Image Optimization

```tsx
import Image from 'next/image'

<Image 
  src="/image.png" 
  alt="Description"
  width={500}
  height={300}
  priority  // For above-the-fold images
/>
```

### Code Splitting

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

### React Optimization

```tsx
// Memoize expensive calculations
import { useMemo } from 'react'

const filteredItems = useMemo(() => {
  return items.filter(item => item.status === filter)
}, [items, filter])
```

---

## 🎓 Best Practices

1. **Always use TypeScript types** for props and state
2. **Use Tailwind classes** instead of custom CSS when possible
3. **Keep components small** and focused on one responsibility
4. **Use semantic HTML** elements
5. **Ensure accessibility** (aria labels, keyboard navigation)
6. **Test responsive design** on multiple screen sizes
7. **Use descriptive variable names**
8. **Comment complex logic**

---

## 🚨 Common Issues & Solutions

### Font not loading
```bash
# Check font files exist
ls public/Sentient-*.woff

# Check @font-face in globals.css
# Verify path is correct
```

### Styles not applying
```bash
# Restart dev server
npm run dev

# Clear .next cache
rm -rf .next
npm run dev
```

### Build errors
```bash
# Clear all caches
rm -rf .next node_modules
npm install
npm run build
```

---

This quick reference should help you work efficiently on the Love Fund frontend. For detailed information, refer to `FRONTEND_DOCUMENTATION.md`.


