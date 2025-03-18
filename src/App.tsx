import { useState } from 'react'
import Header from './components/Header'
import PostCard from './components/PostCard'
import WritePost from './components/WritePost'
import { useWallet } from './hooks/useWallet'
import { web3Service } from './services/web3'

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
  const { isConnected, account, connect } = useWallet()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitPost = async (title: string, content: string) => {
    setIsSubmitting(true)
    try {
      // In a real app, we would upload content to IPFS first
      const mockIpfsHash = `Qm${Math.random().toString(36).substring(2, 15)}`

      // For now, just simulate the transaction
      console.log('Creating post:', { title, content, ipfsHash: mockIpfsHash })

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
    } catch (error) {
      console.error('Failed to create post:', error)
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTip = async (postId: number) => {
    if (!isConnected) {
      alert('Please connect your wallet first!')
      return
    }

    try {
      const amount = prompt('Enter tip amount in ETH (e.g., 0.01):')
      if (!amount) return

      console.log('Tipping post:', postId, 'Amount:', amount)
      // await web3Service.tipPost(postId, amount)
    } catch (error) {
      console.error('Failed to tip post:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onConnect={connect}
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

      {isConnected && (
        <WritePost
          onSubmit={handleSubmitPost}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  )
}

export default App