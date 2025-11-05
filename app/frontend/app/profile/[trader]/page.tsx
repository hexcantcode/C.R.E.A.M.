'use client'

import { use } from 'react'
import { Header } from '@/components/header'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function ProfilePage({ params }: { params: Promise<{ trader: string }> }) {
  const { trader } = use(params)
  
  // Mock trader data
  const traderData = {
    handle: trader,
    name: 'Alpha Trader',
    pfp: 'https://via.placeholder.com/128',
    bio: 'Crypto trader with 5+ years of experience. Specializing in DeFi and altcoin strategies.',
    joined: '2024-01-15',
    twitterFollowers: 12500,
    verified: true,
  }

  // Mock trading history
  const tradingHistory = [
    { date: '2024-12-01', pnl: 1234.56, trades: 12 },
    { date: '2024-11-24', pnl: -456.78, trades: 8 },
    { date: '2024-11-17', pnl: 2341.23, trades: 15 },
    { date: '2024-11-10', pnl: 987.65, trades: 10 },
    { date: '2024-11-03', pnl: 567.89, trades: 7 },
  ]

  // Mock PnL chart data (for visualization)
  const pnlData = tradingHistory.map(h => ({
    date: h.date,
    pnl: h.pnl,
    cumulative: tradingHistory
      .filter(t => new Date(t.date) <= new Date(h.date))
      .reduce((sum, t) => sum + t.pnl, 0)
  }))

  const totalPnL = tradingHistory.reduce((sum, h) => sum + h.pnl, 0)
  const winRate = (tradingHistory.filter(h => h.pnl > 0).length / tradingHistory.length) * 100

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-start gap-6 mb-6">
            <Avatar className="w-24 h-24 border-2 border-yellow-200">
              <AvatarImage src={traderData.pfp} alt={traderData.name} />
              <AvatarFallback className="bg-neutral-900 text-yellow-200 text-2xl">
                {traderData.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-sentient font-bold">{traderData.name}</h1>
                {traderData.verified && (
                  <svg className="w-6 h-6 text-yellow-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.32.23-.673.23-1.048 0-1.385-1.115-2.5-2.5-2.5-.377 0-.73.077-1.05.228C16.333 3.875 14.96 3 13.5 3c-1.385 0-2.595.75-3.228 1.876-.32-.15-.673-.228-1.048-.228-1.385 0-2.5 1.115-2.5 2.5 0 .377.077.73.228 1.05C5.125 7.55 4.25 8.92 4.25 10.5c0 1.58.875 2.95 2.148 3.6-.153.32-.23.673-.23 1.048 0 1.385 1.115 2.5 2.5 2.5.377 0 .73-.077 1.05-.228C8.667 21.125 10.04 22 11.5 22c1.385 0 2.595-.75 3.228-1.876.32.15.673.228 1.048.228 1.385 0 2.5-1.115 2.5-2.5 0-.377-.077-.73-.228-1.05C18.875 16.45 19.75 15.08 19.75 13.5z"/>
                  </svg>
                )}
              </div>
              <p className="text-yellow-200 text-lg mb-2">@{traderData.handle}</p>
              <p className="text-neutral-400 mb-4 max-w-2xl">{traderData.bio}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="text-neutral-400">Joined: </span>
                  <span className="text-white">{new Date(traderData.joined).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-neutral-400">Twitter Followers: </span>
                  <span className="text-white">{traderData.twitterFollowers.toLocaleString()}</span>
                </div>
                <a 
                  href={`https://twitter.com/${traderData.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-200 hover:text-yellow-300 transition-colors"
                >
                  View Twitter →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-black border border-neutral-800 p-6">
            <div className="text-neutral-400 text-sm mb-2">Total PnL</div>
            <div className={`text-3xl font-bold ${totalPnL >= 0 ? 'text-yellow-200' : 'text-red-400'}`}>
              {totalPnL >= 0 ? '+' : ''}{totalPnL.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </Card>
          
          <Card className="bg-black border border-neutral-800 p-6">
            <div className="text-neutral-400 text-sm mb-2">Win Rate</div>
            <div className="text-3xl font-bold text-white">{winRate.toFixed(1)}%</div>
          </Card>
          
          <Card className="bg-black border border-neutral-800 p-6">
            <div className="text-neutral-400 text-sm mb-2">Total Trades</div>
            <div className="text-3xl font-bold text-white">
              {tradingHistory.reduce((sum, h) => sum + h.trades, 0)}
            </div>
          </Card>
        </div>

        {/* Tabs for Trading Data */}
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="mb-8 bg-black border border-neutral-800">
            <TabsTrigger 
              value="history"
              className="data-[state=active]:bg-yellow-200 data-[state=active]:text-black"
            >
              Trading History
            </TabsTrigger>
            <TabsTrigger 
              value="pnl"
              className="data-[state=active]:bg-yellow-200 data-[state=active]:text-black"
            >
              PnL Chart
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card className="bg-black border border-neutral-800">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6">Weekly Trading History</h3>
                <div className="space-y-4">
                  {tradingHistory.map((entry, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4 border border-neutral-800 hover:border-yellow-200/30 transition-colors"
                    >
                      <div>
                        <div className="font-bold mb-1">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        <div className="text-sm text-neutral-400">{entry.trades} trades</div>
                      </div>
                      <div className={`text-xl font-bold ${entry.pnl >= 0 ? 'text-yellow-200' : 'text-red-400'}`}>
                        {entry.pnl >= 0 ? '+' : ''}{entry.pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pnl">
            <Card className="bg-black border border-neutral-800 p-6">
              <h3 className="text-xl font-bold mb-6">Cumulative PnL Chart</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {pnlData.map((data, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t transition-all ${
                        data.cumulative >= 0 ? 'bg-yellow-200' : 'bg-red-400'
                      }`}
                      style={{ 
                        height: `${Math.abs(data.cumulative) / Math.max(...pnlData.map(d => Math.abs(d.cumulative))) * 100}%`,
                        minHeight: '4px'
                      }}
                    />
                    <div className="text-xs text-neutral-400 mt-2 text-center">
                      {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm text-neutral-400">Cumulative P&L over time</span>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Active Funds Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Active Funds</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-black border border-neutral-800 p-6 hover:border-yellow-200/30 transition-colors cursor-pointer">
              <Link href="/app/fund/1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold mb-1">Alphaverse Fund</h4>
                    <p className="text-sm text-neutral-400">TVL: $2.45M • +23.5%</p>
                  </div>
                  <div className="text-yellow-200">→</div>
                </div>
              </Link>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


