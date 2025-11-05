'use client'

import { useState } from 'react'
import { Hero } from "@/components/hero"
import { Leva } from "leva"
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import VaultCard from '@/components/vault-card'

// Mock data for Active Funds (funds that have reached 25 SOL and are live trading)
const activeFunds = [
  {
    id: 1,
    name: 'Alphaverse Fund',
    ticker: 'ALPHA',
    trader: '@alpha_trader',
    traderName: 'Alpha Trader',
    pfp: 'https://via.placeholder.com/64',
    tvl: 2450000,
    performance: 150, // 2.5x = 250% = 20% fee (each 100% = 10%)
    epoch: 12,
    fee: 20, // Dynamic: performance/100 * 10
    status: 'active',
    targetCap: 25, // 25 SOL
    raised: 25, // Reached 25 SOL cap
    twitterHandle: 'alpha_trader',
    multiplier: 2.5, // 2.5x performance
  },
  {
    id: 2,
    name: 'Diamond Hands',
    ticker: 'DIAM',
    trader: '@diamondhands',
    traderName: 'Diamond Hands',
    pfp: 'https://via.placeholder.com/64',
    tvl: 892000,
    performance: 200, // 3x = 300% = 30% fee
    epoch: 8,
    fee: 30, // Dynamic based on performance
    status: 'active',
    targetCap: 25,
    raised: 25,
    twitterHandle: 'diamondhands',
    multiplier: 3.0,
  },
]

// Mock data for Raising Funds (funds still raising to 25 SOL)
const raisingFunds = [
  {
    id: 3,
    name: 'Zero Gravity',
    ticker: 'ZERO',
    trader: '@zerogravity',
    traderName: 'Zero Gravity',
    pfp: 'https://via.placeholder.com/64',
    targetCap: 25, // 25 SOL
    raised: 16.25, // SOL raised
    fee: 0, // No fee during raising
    status: 'raising',
    twitterHandle: 'zerogravity',
  },
  {
    id: 4,
    name: 'Moon Shot',
    ticker: 'MOON',
    trader: '@moonshot',
    traderName: 'Moon Shot',
    pfp: 'https://via.placeholder.com/64',
    targetCap: 25,
    raised: 12.5,
    fee: 0,
    status: 'raising',
    twitterHandle: 'moonshot',
  },
  {
    id: 5,
    name: 'Crypto Kings',
    ticker: null,
    trader: '@cryptokings',
    traderName: 'Crypto Kings',
    pfp: 'https://via.placeholder.com/64',
    targetCap: 25,
    raised: 8.75,
    fee: 0,
    status: 'raising',
    twitterHandle: 'cryptokings',
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<'active' | 'raising'>('active')

  return (
    <>
      <Hero />
      <Leva hidden />
      
      {/* Funds Section with Tabs */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-sentient mb-4">
            Explore Funds
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto font-mono">
            Funds go live after raising 25 SOL. Then weekly 7-day trading epochs begin. Investors receive ticker tokens pro rata to their SOL investments.
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={(v) => setActiveTab(v as 'active' | 'raising')}
          className="w-full"
        >
          <TabsList className="mb-8 bg-black border border-neutral-800 w-fit mx-auto">
            <TabsTrigger 
              value="active"
              className="data-[state=active]:bg-yellow-200 data-[state=active]:text-black"
            >
              Active Funds
            </TabsTrigger>
            <TabsTrigger 
              value="raising"
              className="data-[state=active]:bg-yellow-200 data-[state=active]:text-black"
            >
              Raising Funds
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeFunds.map(fund => (
                <VaultCard key={fund.id} fund={fund} type="active" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="raising" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {raisingFunds.map(fund => (
                <VaultCard key={fund.id} fund={fund} type="raising" />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}
