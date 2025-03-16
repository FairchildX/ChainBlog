import { useState } from 'react'
import Header from './components/Header'
import PostCard from './components/PostCard'

const mockPosts = [
  {
    id: 1,
    title: "Getting Started with Web3 Development",
    author: "0x1234567890123456789012345678901234567890",
    timestamp: 1678901234,
    tipAmount: "0.5",
    excerpt: "Learn the basics of blockchain development and how to build decentralized applications..."
  },
  {
    id: 2,
    title: "The Future of Decentralized Social Media",
    author: "0x9876543210987654321098765432109876543210",
    timestamp: 1678801234,
    tipAmount: "1.2",
    excerpt: "Exploring how blockchain technology can reshape social media and give users control over their data..."
  }
]

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string>()

  const handleConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setAccount(accounts[0])
        setIsConnected(true)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }

  const handleTip = (postId: number) => {
    console.log('Tipping post:', postId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onConnect={handleConnect}
        isConnected={isConnected}
        account={account}
      />

      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Decentralized Blogging Platform
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Write, share, and monetize your content on the blockchain.
            Tips go directly to authors without intermediaries.
          </p>
        </div>

        <div className="grid gap-6">
          {mockPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onTip={handleTip}
            />
          ))}
        </div>

        {!isConnected && (
          <div className="text-center mt-8 p-6 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              Connect your wallet to start writing and tipping posts!
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App