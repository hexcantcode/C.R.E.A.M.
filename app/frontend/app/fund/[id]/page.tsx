'use client'

import { useState } from 'react'
import { use } from 'react'
import { Header } from '@/components/header'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { calculatePerformanceFee } from '@/utils/performance-fee'

export default function FundPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  const [activeTab, setActiveTab] = useState<'overview' | 'allocate' | 'charts'>('overview')
  const [depositAmount, setDepositAmount] = useState('')

  // Mock fund data
  const fund = {
    id: parseInt(id),
    name: 'Alphaverse Fund',
    ticker: 'ALPHA',
    trader: '@alpha_trader',
    traderName: 'Alpha Trader',
    pfp: 'https://via.placeholder.com/128',
    twitterHandle: 'alpha_trader',
    tvl: 2450000,
    performance: 150, // 250% = 2.5x
    multiplier: 2.5,
    epoch: 12,
    fee: 20, // Dynamic: 2.5x = 25% but let's show 20% for this example
    status: 'active' as const,
    targetCap: 25, // 25 SOL
    raised: 25,
    investors: 234,
    createdAt: '2024-01-15',
    epochProgress: 4, // Day 4 of 7-day epoch
    myTokens: 1250, // Ticker tokens held
    mySOL: 8.5, // SOL invested
    totalSupply: 25000, // Total ticker tokens
  }

  // Token allocation breakdown
  const allocation = [
    { asset: 'SOL', amount: 15.5, percentage: 62 },
    { asset: 'USDC', amount: 85000, percentage: 25 },
    { asset: 'BTC', amount: 0.15, percentage: 8 },
    { asset: 'ETH', amount: 2.5, percentage: 5 },
  ]

  // PnL history for charts
  const pnlData = [
    { date: '2024-11-01', value: 100000, pnl: 0 },
    { date: '2024-11-08', value: 125000, pnl: 25000 },
    { date: '2024-11-15', value: 118000, pnl: 18000 },
    { date: '2024-11-22', value: 145000, pnl: 45000 },
    { date: '2024-11-29', value: 165000, pnl: 65000 },
    { date: '2024-12-06', value: 190000, pnl: 90000 },
  ]

  const formatCurrency = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatSOL = (sol: number) => {
    return `${sol.toFixed(2)} SOL`
  }

  const tokenValue = (fund.tvl || 0) / fund.totalSupply // Value per token
  const myTokenValue = fund.myTokens * tokenValue

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Fund Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-4">
            <Avatar className="w-16 h-16 border-2 border-yellow-200">
              <AvatarImage src={fund.pfp} alt={fund.traderName} />
              <AvatarFallback className="bg-neutral-900 text-yellow-200 text-xl">
                {fund.traderName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-sentient font-bold">{fund.name}</h1>
                {fund.ticker && (
                  <span className="px-3 py-1 bg-yellow-200 text-black text-sm font-bold font-mono">
                    {fund.ticker}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Link 
                  href={`/profile/${fund.twitterHandle}`}
                  className="text-yellow-200 hover:text-yellow-300 transition-colors"
                >
                  {fund.trader}
                </Link>
                <span className="text-neutral-600">•</span>
                <span className="text-neutral-400">{fund.traderName}</span>
              </div>
              <p className="text-sm text-neutral-500">
                Fund went live on {new Date(fund.createdAt).toLocaleDateString()} after raising 25 SOL
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black border border-neutral-800 p-4">
            <div className="text-neutral-400 text-xs mb-1">TVL</div>
            <div className="text-2xl font-bold">{formatCurrency(fund.tvl)}</div>
          </Card>
          <Card className="bg-black border border-neutral-800 p-4">
            <div className="text-neutral-400 text-xs mb-1">Performance</div>
            <div className="text-2xl font-bold text-yellow-200">+{fund.performance}%</div>
            <div className="text-xs text-neutral-500 mt-1">{fund.multiplier.toFixed(2)}x</div>
          </Card>
          <Card className="bg-black border border-neutral-800 p-4">
            <div className="text-neutral-400 text-xs mb-1">Epoch</div>
            <div className="text-2xl font-bold">#{fund.epoch}</div>
          </Card>
          <Card className="bg-black border border-neutral-800 p-4">
            <div className="text-neutral-400 text-xs mb-1">Performance Fee</div>
            <div className="text-2xl font-bold">{fund.fee}%</div>
            <div className="text-xs text-neutral-500 mt-1">
              {Math.floor(fund.multiplier)}x = {fund.fee}%
            </div>
          </Card>
        </div>

        {/* Epoch Progress */}
        <Card className="bg-black border border-neutral-800 p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-neutral-400">Epoch Progress (7-day trading cycle)</span>
            <span className="text-yellow-200 font-bold">Day {fund.epochProgress} / 7</span>
          </div>
          <div className="w-full bg-neutral-900 h-2 mb-2">
            <div 
              className="bg-yellow-200 h-2 transition-all"
              style={{ width: `${(fund.epochProgress / 7) * 100}%` }}
            />
          </div>
          <p className="text-xs text-neutral-500">
            Currently in trading epoch. After epoch completes, new trading cycle begins.
          </p>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="mb-8 bg-black border border-neutral-800">
            <TabsTrigger 
              value="overview"
              className="data-[state=active]:bg-yellow-200 data-[state=active]:text-black"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="allocate"
              className="data-[state=active]:bg-yellow-200 data-[state=active]:text-black"
            >
              Allocation
            </TabsTrigger>
            <TabsTrigger 
              value="charts"
              className="data-[state=active]:bg-yellow-200 data-[state=active]:text-black"
            >
              PnL Charts
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              {/* My Position */}
              <Card className="bg-black border border-neutral-800 p-6">
                <CardHeader>
                  <CardTitle>My Position</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Tokens ({fund.ticker})</span>
                    <span className="font-bold">{fund.myTokens.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">SOL Invested</span>
                    <span className="font-bold">{formatSOL(fund.mySOL)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Current Value</span>
                    <span className="text-yellow-200 font-bold">
                      {formatCurrency(myTokenValue)}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-neutral-800">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">PnL</span>
                      <span className={`font-bold ${myTokenValue > fund.mySOL * 150 ? 'text-yellow-200' : 'text-red-400'}`}>
                        {myTokenValue > fund.mySOL * 150 ? '+' : ''}
                        {formatCurrency(myTokenValue - fund.mySOL * 150)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fund Info */}
              <Card className="bg-black border border-neutral-800 p-6">
                <CardHeader>
                  <CardTitle>Fund Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Performance Fee</span>
                    <span>{fund.fee}% (Dynamic: {Math.floor(fund.multiplier)}x = {fund.fee}%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Investors</span>
                    <span>{fund.investors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Total Supply</span>
                    <span>{fund.totalSupply.toLocaleString()} {fund.ticker}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Token Value</span>
                    <span>{formatCurrency(tokenValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Status</span>
                    <span className="text-yellow-200">Active (Trading)</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Deposit Section */}
            <Card className="bg-black border border-neutral-800 p-6 mt-6">
              <CardHeader>
                <CardTitle>Invest in Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-neutral-400 mb-2">Amount (SOL)</label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 px-4 py-3 focus:border-yellow-200 focus:outline-none text-white"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="flex gap-2">
                    {[1, 5, 10, 25].map(amount => (
                      <Button
                        key={amount}
                        variant="outline"
                        onClick={() => setDepositAmount(amount.toString())}
                        className="bg-black border-neutral-800 hover:border-yellow-200"
                      >
                        {amount} SOL
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-500">
                    You will receive {fund.ticker} tokens pro rata to your SOL investment
                  </p>
                  <Button className="w-full bg-yellow-200 text-black hover:bg-yellow-300 font-bold">
                    Invest SOL
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Allocation Tab */}
          <TabsContent value="allocate">
            <Card className="bg-black border border-neutral-800 p-6">
              <CardHeader>
                <CardTitle>Fund Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allocation.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold">{item.asset}</span>
                        <span className="text-neutral-400">
                          {item.asset === 'SOL' ? formatSOL(item.amount) : formatCurrency(item.amount)}
                        </span>
                      </div>
                      <div className="w-full bg-neutral-900 h-2">
                        <div 
                          className="bg-yellow-200 h-2 transition-all"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">{item.percentage}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Charts Tab */}
          <TabsContent value="charts">
            <Card className="bg-black border border-neutral-800 p-6">
              <CardHeader>
                <CardTitle>Performance & PnL</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {pnlData.map((data, idx) => {
                    const maxValue = Math.max(...pnlData.map(d => d.value))
                    const height = (data.value / maxValue) * 100
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-yellow-200 rounded-t transition-all"
                          style={{ 
                            height: `${height}%`,
                            minHeight: '4px'
                          }}
                        />
                        <div className="text-xs text-neutral-400 mt-2 text-center">
                          {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-xs text-neutral-500 mt-1">
                          {formatCurrency(data.value)}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-neutral-400 mb-1">Total PnL</div>
                    <div className="text-2xl font-bold text-yellow-200">
                      {formatCurrency(pnlData[pnlData.length - 1].pnl)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-400 mb-1">Current Value</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(pnlData[pnlData.length - 1].value)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


