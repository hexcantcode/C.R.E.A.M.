'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AppHeader() {
  const [connected, setConnected] = useState(false)

  return (
    <header className="border-b border-neutral-800 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-200 flex items-center justify-center">
            <span className="text-black font-bold text-xl">H</span>
          </div>
          <span className="text-xl font-bold">
            <span className="text-white">hedge</span>
            <span className="text-yellow-200">vault</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-8">
          <Link href="/app" className="text-neutral-400 hover:text-yellow-200 transition-colors">
            Vaults
          </Link>
          <Link href="/app/create" className="text-neutral-400 hover:text-yellow-200 transition-colors">
            Create
          </Link>
          <a href="#" className="text-neutral-400 hover:text-yellow-200 transition-colors">
            Analytics
          </a>
        </nav>

        {/* Connect Button */}
        <button
          onClick={() => setConnected(!connected)}
          className={`px-6 py-2 font-bold transition-colors ${
            connected
              ? 'bg-black border border-yellow-200 text-yellow-200'
              : 'bg-yellow-200 text-black hover:bg-yellow-300'
          }`}
        >
          {connected ? 'Disconnect' : 'Connect Wallet'}
        </button>
      </div>
    </header>
  )
}

