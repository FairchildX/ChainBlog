# ChainBlog

A decentralized blogging platform built on Ethereum blockchain.

## Features

- 📝 Write and publish blog posts on the blockchain
- 💰 Direct tipping system for content creators
- 🔗 IPFS integration for content storage
- 🦊 MetaMask wallet integration
- ⚡ Built with React, TypeScript, and Vite

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Ethereum testnet account with some ETH for gas fees

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Building

```bash
npm run build
```

## Smart Contract

The ChainBlog smart contract handles:

- Post creation and storage
- Tipping functionality
- Author rewards
- Post metadata management

Contract features:
- `createPost(title, ipfsHash)` - Create a new blog post
- `tipPost(postId)` - Send ETH tips to post authors
- `getPost(postId)` - Retrieve post information
- `getAuthorPosts(author)` - Get all posts by an author

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Blockchain**: Ethereum, Solidity
- **Web3**: ethers.js
- **Storage**: IPFS (planned)
- **Build Tool**: Vite

## Roadmap

- [x] Basic UI components
- [x] Wallet connection
- [x] Smart contract foundation
- [ ] IPFS integration
- [ ] Smart contract deployment
- [ ] Post reading functionality
- [ ] User profiles
- [ ] Advanced editor with markdown support
- [ ] Mobile responsive design
- [ ] Search and filtering
- [ ] Comments system

## Contributing

This is a personal learning project, but feel free to open issues or suggestions!

## License

MIT