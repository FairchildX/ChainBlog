import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">ChainBlog</h1>
          <p className="text-gray-600">Decentralized blogging platform</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to ChainBlog</h2>
          <p className="text-gray-600 mb-8">A blockchain-powered blogging platform</p>

          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Count: {count}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App