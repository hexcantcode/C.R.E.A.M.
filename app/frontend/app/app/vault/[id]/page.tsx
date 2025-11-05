'use client'

import { useState } from 'react'
import { use } from 'react'
import Header from '@/components/Header'

export default function VaultDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw'>('overview')
  const [depositAmount, setDepositAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  // Mock vault data
  const vault = {
    id: parseInt(id),
    name: 'Alphaverse Fund',
    trader: '@alpha_trader',
    twitterHandle: 'alpha_trader',
    tvl: 2450000,
    performance: 23.5,
    epoch: 12,
    fee: 20,
    myShares: 1250,
    myBalance: 8500,
    epochProgress: 42, // Days into current epoch
    investors: 234,
    createdAt: '2024-01-15',
  }

  const formatCurrency = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`
    return `$${num}`
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{vault.name}</h1>
          <p className="text-yellow-200">{vault.trader}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatBox label="TVL" value={formatCurrency(vault.tvl)} />
          <StatBox label="Performance" value={`+${vault.performance}%`} highlight />
          <StatBox label="Epoch" value={`#${vault.epoch}`} />
          <StatBox label="Investors" value={vault.investors.toString()} />
        </div>

        {/* Epoch Progress */}
        <div className="bg-dark-200 border border-gray-800 p-6 mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-400">Epoch Progress</span>
            <span className="text-yellow-200 font-bold">Day {vault.epochProgress} / 7</span>
          </div>
          <div className="w-full bg-gray-800 h-2">
            <div 
              className="bg-yellow-200 h-2 transition-all"
              style={{ width: `${(vault.epochProgress / 7) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {vault.epochProgress < 6 
              ? 'Deposit/Withdrawal window open' 
              : 'Trading period only'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <Tab active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
            Overview
          </Tab>
          <Tab active={activeTab === 'deposit'} onClick={() => setActiveTab('deposit')}>
            Deposit
          </Tab>
          <Tab active={activeTab === 'withdraw'} onClick={() => setActiveTab('withdraw')}>
            Withdraw
          </Tab>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* My Position */}
            <div className="bg-dark-200 border border-gray-800 p-6">
              <h3 className="font-bold mb-4">My Position</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Shares</span>
                  <span className="font-bold">{vault.myShares.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Balance</span>
                  <span className="font-bold">{formatCurrency(vault.myBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Value</span>
                  <span className="text-yellow-200 font-bold">
                    {formatCurrency(vault.myBalance * 1.235)}
                  </span>
                </div>
              </div>
            </div>

            {/* Vault Info */}
            <div className="bg-dark-200 border border-gray-800 p-6">
              <h3 className="font-bold mb-4">Vault Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Performance Fee</span>
                  <span>{vault.fee}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Created</span>
                  <span>{vault.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-yellow-200">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deposit' && (
          <div className="bg-dark-200 border border-gray-800 p-8">
            <h3 className="font-bold text-xl mb-4">Deposit Funds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Amount (USDC)</label>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full bg-dark-300 border border-gray-800 px-4 py-3 focus:border-yellow-200 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-2">
                {[100, 500, 1000, 5000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setDepositAmount(amount.toString())}
                    className="px-4 py-2 bg-dark-300 border border-gray-800 hover:border-yellow-200 transition-colors"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <button className="w-full bg-yellow-200 text-dark-300 font-bold py-4 hover:bg-yellow-300 transition-colors">
                Deposit
              </button>
            </div>
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className="bg-dark-200 border border-gray-800 p-8">
            <h3 className="font-bold text-xl mb-4">Withdraw Funds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Amount (USDC)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full bg-dark-300 border border-gray-800 px-4 py-3 focus:border-yellow-200 focus:outline-none"
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-2">
                {[500, 1000, 2500, 'MAX'].map(amount => (
                  <button
                    key={amount}
                    onClick={() => setWithdrawAmount(amount === 'MAX' ? vault.myBalance.toString() : amount.toString())}
                    className="px-4 py-2 bg-dark-300 border border-gray-800 hover:border-yellow-200 transition-colors"
                  >
                    {amount === 'MAX' ? 'MAX' : `$${amount}`}
                  </button>
                ))}
              </div>
              <button className="w-full bg-yellow-200 text-dark-300 font-bold py-4 hover:bg-yellow-300 transition-colors">
                Withdraw
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function StatBox({ label, value, highlight }: { 
  label: string
  value: string
  highlight?: boolean 
}) {
  return (
    <div className="bg-dark-200 border border-gray-800 p-4">
      <div className="text-gray-400 text-xs mb-1">{label}</div>
      <div className={`text-2xl font-bold ${highlight ? 'text-yellow-200' : ''}`}>
        {value}
      </div>
    </div>
  )
}

function Tab({ children, active, onClick }: { 
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 font-bold transition-colors ${
        active
          ? 'bg-yellow-200 text-dark-300'
          : 'bg-dark-200 border border-gray-800 text-gray-400 hover:border-yellow-200'
      }`}
    >
      {children}
    </button>
  )
}

