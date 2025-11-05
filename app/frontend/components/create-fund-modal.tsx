'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface CreateFundModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateFundModal({ open, onOpenChange }: CreateFundModalProps) {
  const [step, setStep] = useState<'details' | 'login'>('details')
  const [fundName, setFundName] = useState('')
  const [ticker, setTicker] = useState('')
  const [isTwitterConnected, setIsTwitterConnected] = useState(false)

  const handleNext = () => {
    if (fundName.trim()) {
      setStep('login')
    }
  }

  const handleTwitterLogin = () => {
    // TODO: Implement X/Twitter OAuth
    setIsTwitterConnected(true)
    // After successful login, keep modal open but show initiate button
  }

  const handleInitiate = () => {
    // TODO: Create fund with name, ticker, and Twitter connection
    console.log('Initiating fund:', { fundName, ticker })
    onOpenChange(false)
    // Reset form
    setStep('details')
    setFundName('')
    setTicker('')
    setIsTwitterConnected(false)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset on close
    setTimeout(() => {
      setStep('details')
      setFundName('')
      setTicker('')
      setIsTwitterConnected(false)
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-black border border-neutral-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-sentient">
            Create Your Fund
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            {step === 'details' 
              ? 'Set up your fund details. Funds require 25 SOL to go live.'
              : 'Connect your X account to proceed'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'details' ? (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="fundName" className="text-white">
                Fund Name *
              </Label>
              <Input
                id="fundName"
                value={fundName}
                onChange={(e) => setFundName(e.target.value)}
                placeholder="e.g., Alpha Strategies"
                className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-white">
                Ticker (Optional)
              </Label>
              <Input
                id="ticker"
                value={ticker}
                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                placeholder="e.g., ALPHA"
                maxLength={10}
                className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500"
              />
              <p className="text-xs text-neutral-500">
                Ticker is optional. Leave blank if you don't have one. Investors will receive ticker tokens pro rata to their SOL investments.
              </p>
              <div className="mt-4 p-3 bg-neutral-900/50 border border-neutral-800 rounded text-xs text-neutral-400">
                <p className="font-semibold text-yellow-200 mb-1">Fund Requirements:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Funds need to raise 25 SOL to go live</li>
                  <li>After reaching 25 SOL, weekly 7-day trading epochs begin</li>
                  <li>Performance fee: 10% per 100% (1x) increase</li>
                </ul>
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!fundName.trim()}
              className="w-full bg-yellow-200 text-black hover:bg-yellow-300 font-bold"
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-md">
                <p className="text-sm text-neutral-400 mb-2">Fund Name:</p>
                <p className="text-lg font-bold text-white">{fundName}</p>
                {ticker && (
                  <>
                    <p className="text-sm text-neutral-400 mt-3 mb-2">Ticker:</p>
                    <p className="text-lg font-bold text-yellow-200">{ticker}</p>
                  </>
                )}
              </div>

              {!isTwitterConnected ? (
                <div className="space-y-3">
                  <p className="text-sm text-neutral-400">
                    Connect your X (Twitter) account to verify your identity and proceed with fund creation.
                  </p>
                  <Button
                    onClick={handleTwitterLogin}
                    className="w-full bg-black border border-neutral-800 text-white hover:bg-neutral-900 hover:border-neutral-700 font-bold"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Login with X
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-yellow-200/10 border border-yellow-200/30 p-4 rounded-md">
                    <p className="text-sm text-yellow-200 font-semibold mb-1">
                      ✓ X Account Connected
                    </p>
                    <p className="text-xs text-neutral-400">
                      You're ready to initiate your fund
                    </p>
                  </div>
                  <Button
                    onClick={handleInitiate}
                    className="w-full bg-yellow-200 text-black hover:bg-yellow-300 font-bold"
                  >
                    Initiate {fundName}
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={() => setStep('details')}
              className="w-full text-neutral-400 hover:text-white"
            >
              ← Back
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

