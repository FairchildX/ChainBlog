import { useState } from 'react'

interface HeaderProps {
  onConnect: () => void
  isConnected: boolean
  account?: string
}

export default function Header({ onConnect, isConnected, account }: HeaderProps) {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-gray-900">ChainBlog</h1>
            <span className="ml-3 text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded">Beta</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Explore</a>
            <a href="#" className="text-gray-500 hover:text-gray-900">Write</a>
          </nav>

          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-700">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </span>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}