import { useState, useEffect } from 'react'
import { web3Service } from '../services/web3'

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const connect = async () => {
    try {
      setLoading(true)
      setError('')
      const account = await web3Service.connectWallet()
      setAccount(account)
      setIsConnected(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const disconnect = () => {
    setAccount('')
    setIsConnected(false)
  }

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          })
          if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsConnected(true)
          }
        } catch (err) {
          console.error('Failed to check wallet connection:', err)
        }
      }
    }

    checkConnection()

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
        } else {
          disconnect()
        }
      })

      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {})
        window.ethereum.removeListener('chainChanged', () => {})
      }
    }
  }, [])

  return {
    isConnected,
    account,
    loading,
    error,
    connect,
    disconnect
  }
}