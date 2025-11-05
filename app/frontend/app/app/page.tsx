'use client'

import { useState } from 'react'
import AppHeader from '@/components/app-header'
import VaultCard from '@/components/vault-card'

const mockVaults = [
  {
    id: 1,
    name: 'Alphaverse Fund',
    trader: '@alpha_trader',
    tvl: 2450000,
    performance: 23.5,
    epoch: 12,
    fee: 20,
    status: 'open'
  },
  {
    id: 2,
    name: 'Diamond Hands',
    trader: '@diamondhands',
    tvl: 892000,
    performance: 18.2,
    epoch: 8,
    fee: 15,
    status: 'open'
  },
  {
    id: 3,
    name: 'Zero Gravity',
    trader: '@zerogravity',
    tvl: 3450000,
    performance: 31.7,
    epoch: 24,
    fee: 25,
    status: 'closed'
  },
]

export default function Home() {
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all')
  const filteredVaults = filter === 'all' 
    ? mockVaults 
    : mockVaults.filter(v => v.status === filter)

  return (
    <div className="min-h-screen bg-black">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-6xl font-bold font-sentient">
            <span className="text-white">hedge</span>
            <span className="text-yellow-200">vault</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-mono">
            Epoch-based hedge fund vaults. Weekly cycles. 
            <span className="text-yellow-200"> Twitter verified traders.</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            label="Total Vaults" 
            value="24" 
            change="+12%" 
          />
          <StatCard 
            label="TVL" 
            value="$12.8M" 
            change="+45%" 
          />
          <StatCard 
            label="Avg. Performance" 
            value="+18.3%" 
            change="+2.1%" 
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8">
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'open'} 
            onClick={() => setFilter('open')}
          >
            Open
          </FilterButton>
          <FilterButton 
            active={filter === 'closed'} 
            onClick={() => setFilter('closed')}
          >
            Closed
          </FilterButton>
        </div>

        {/* Vaults Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVaults.map(vault => (
            <VaultCard key={vault.id} vault={vault} />
          ))}
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value, change }: { 
  label: string
  value: string
  change: string 
}) {
  return (
    <div className="bg-black border border-neutral-800 p-6">
      <div className="text-neutral-400 text-sm mb-2">{label}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-yellow-200 text-sm">{change}</div>
    </div>
  )
}

function FilterButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 border transition-colors ${
        active
          ? 'bg-yellow-200 border-yellow-200 text-black'
          : 'bg-black border-neutral-800 text-neutral-400 hover:border-yellow-200'
      }`}
    >
      {children}
    </button>
  )
}

