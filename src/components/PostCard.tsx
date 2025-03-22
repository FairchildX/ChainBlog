interface Post {
  id: number
  title: string
  author: string
  timestamp: number
  tipAmount: string
  excerpt?: string
}

interface PostCardProps {
  post: Post
  onTip: (postId: number) => void
}

export default function PostCard({ post, onTip }: PostCardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString()
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
          {post.title}
        </h2>
        <span className="text-sm text-gray-500">
          {formatDate(post.timestamp)}
        </span>
      </div>

      {post.excerpt && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            By {formatAddress(post.author)}
          </span>
          <span className="text-sm text-green-600">
            Tips: {post.tipAmount} ETH
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onTip(post.id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
          >
            <span>💰</span>
            <span>Tip</span>
          </button>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            Read more →
          </button>
        </div>
      </div>
    </div>
  )
}