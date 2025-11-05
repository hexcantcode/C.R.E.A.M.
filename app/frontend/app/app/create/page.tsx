'use client'

import { useState } from 'react'
import Header from '@/components/Header'

export default function CreateVault() {
  const [formData, setFormData] = useState({
    name: '',
    twitterHandle: '',
    twitterProof: '',
    fee: '20'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">
          <span className="text-gray-100">create</span>
          <span className="text-yellow-200"> vault</span>
        </h1>

        <div className="bg-dark-200 border border-gray-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vault Name */}
            <div>
              <label className="block text-gray-400 mb-2">Vault Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-dark-300 border border-gray-800 px-4 py-3 focus:border-yellow-200 focus:outline-none"
                placeholder="My Awesome Vault"
              />
            </div>

            {/* Twitter Handle */}
            <div>
              <label className="block text-gray-400 mb-2">Twitter Handle</label>
              <input
                type="text"
                value={formData.twitterHandle}
                onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                className="w-full bg-dark-300 border border-gray-800 px-4 py-3 focus:border-yellow-200 focus:outline-none"
                placeholder="@your_handle"
              />
            </div>

            {/* Twitter Proof */}
            <div>
              <label className="block text-gray-400 mb-2">Twitter Proof</label>
              <input
                type="text"
                value={formData.twitterProof}
                onChange={(e) => setFormData({ ...formData, twitterProof: e.target.value })}
                className="w-full bg-dark-300 border border-gray-800 px-4 py-3 focus:border-yellow-200 focus:outline-none"
                placeholder="Generated proof hash"
              />
              <p className="text-xs text-gray-500 mt-2">
                Connect Twitter to generate proof
              </p>
            </div>

            {/* Performance Fee */}
            <div>
              <label className="block text-gray-400 mb-2">
                Performance Fee: {formData.fee}%
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={formData.fee}
                onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                className="w-full h-2 bg-gray-800 appearance-none cursor-pointer accent-yellow-200"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-800 my-6"></div>

            {/* Terms */}
            <div className="bg-dark-300 p-4 space-y-2 text-sm">
              <p className="text-gray-400">
                By creating a vault, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Manage funds responsibly</li>
                <li>Follow epoch-based withdrawal windows</li>
                <li>Maintain transparency with investors</li>
                <li>Comply with platform rules</li>
              </ul>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-200 text-dark-300 font-bold py-4 hover:bg-yellow-300 transition-colors"
            >
              Create Vault
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-dark-200 border border-yellow-200 p-6">
          <h3 className="font-bold mb-3 text-yellow-200">How it works</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>• Vaults run on weekly epochs (7-day cycles)</p>
            <p>• Days 1-6: Investors can deposit or withdraw</p>
            <p>• Day 7: Trading only, no deposits/withdrawals</p>
            <p>• Performance fees are calculated on epoch end</p>
          </div>
        </div>
      </main>
    </div>
  )
}

