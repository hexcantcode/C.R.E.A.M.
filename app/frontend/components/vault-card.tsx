'use client'

import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

interface Fund {
  id: number
  name: string
  ticker?: string | null
  trader: string
  traderName: string
  pfp: string
  tvl?: number
  performance?: number
  multiplier?: number // e.g., 2.5x performance
  epoch?: number
  fee: number
  status: 'active' | 'raising'
  targetCap: number // In SOL
  raised: number // In SOL
  twitterHandle: string
}

interface VaultCardProps {
  fund: Fund
  type: 'active' | 'raising'
}

export default function VaultCard({ fund, type }: VaultCardProps) {
  const formatCurrency = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`
    return `$${num.toFixed(2)}`
  }

  const formatSOL = (sol: number) => {
    return `${sol.toFixed(2)} SOL`
  }

  const progressPercentage = (fund.raised / fund.targetCap) * 100

  return (
    <Link href={type === 'active' ? `/app/fund/${fund.id}` : `/app/fund/${fund.id}`}>
      <div className="bg-black border border-yellow-200/20 hover:border-yellow-200/40 transition-colors p-6 cursor-pointer">
        {/* Header with PFP and Trader Info */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-12 h-12 border border-yellow-200/30">
            <AvatarImage src={fund.pfp} alt={fund.traderName} />
            <AvatarFallback className="bg-neutral-900 text-yellow-200">
              {fund.traderName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="text-xl font-bold mb-0.5 truncate">{fund.name}</h3>
                {fund.ticker && (
                  <p className="text-sm text-yellow-200 font-mono mb-1">{fund.ticker}</p>
                )}
              </div>
              <span className={`px-3 py-1 text-xs font-bold shrink-0 ${
                fund.status === 'active'
                  ? 'bg-yellow-200 text-black'
                  : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
              }`}>
                {fund.status === 'active' ? 'ACTIVE' : 'RAISING'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href={`https://twitter.com/${fund.twitterHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-yellow-200 text-sm hover:text-yellow-300 transition-colors"
              >
                {fund.trader}
              </a>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400 text-sm">{fund.traderName}</span>
            </div>
          </div>
        </div>

        {/* Stats - Different for Active vs Raising */}
        {type === 'active' ? (
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">TVL</span>
              <span className="text-xl font-bold">{formatCurrency(fund.tvl || 0)}</span>
            </div>
            {fund.performance !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 text-sm">Performance</span>
                <span className="text-yellow-200 text-xl font-bold">+{fund.performance}%</span>
              </div>
            )}
            {fund.multiplier !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 text-sm">Multiplier</span>
                <span className="text-white font-bold">{fund.multiplier.toFixed(2)}x</span>
              </div>
            )}
            {fund.epoch !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-neutral-400 text-sm">Epoch</span>
                <span className="text-white font-bold">#{fund.epoch}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Fee</span>
              <span className="text-white font-bold">{fund.fee}%</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Raised</span>
              <span className="text-xl font-bold">{formatSOL(fund.raised)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Target</span>
              <span className="text-white font-bold">{formatSOL(fund.targetCap)}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Progress</span>
                <span className="text-yellow-200 font-bold">{progressPercentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-neutral-900 h-2">
                <div 
                  className="bg-yellow-200 h-2 transition-all"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-400 text-sm">Fee</span>
              <span className="text-white font-bold">{fund.fee}%</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          className={`w-full py-3 font-bold transition-colors ${
            fund.status === 'active'
              ? 'bg-yellow-200 text-black hover:bg-yellow-300'
              : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-yellow-200 hover:text-yellow-200'
          }`}
          onClick={(e) => e.preventDefault()}
        >
          {fund.status === 'active' ? 'View Fund' : 'Contribute'}
        </button>
      </div>
    </Link>
  )
}
