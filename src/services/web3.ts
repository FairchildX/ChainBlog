import { ethers } from 'ethers'

const CONTRACT_ADDRESS = '0x...' // Will be deployed later
const CONTRACT_ABI = [
  "function createPost(string memory _title, string memory _ipfsHash) external",
  "function tipPost(uint256 _postId) external payable",
  "function getPost(uint256 _postId) external view returns (tuple(uint256 id, address author, string title, string ipfsHash, uint256 timestamp, uint256 tipAmount))",
  "function getAuthorPosts(address _author) external view returns (uint256[])",
  "function postCounter() external view returns (uint256)",
  "event PostCreated(uint256 indexed postId, address indexed author, string title, string ipfsHash)",
  "event PostTipped(uint256 indexed postId, address indexed tipper, uint256 amount)"
]

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null
  private signer: ethers.Signer | null = null
  private contract: ethers.Contract | null = null

  async connectWallet(): Promise<string> {
    if (!window.ethereum) {
      throw new Error('MetaMask not installed')
    }

    this.provider = new ethers.BrowserProvider(window.ethereum)
    const accounts = await this.provider.send('eth_requestAccounts', [])
    this.signer = await this.provider.getSigner()

    if (CONTRACT_ADDRESS !== '0x...') {
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.signer)
    }

    return accounts[0]
  }

  async createPost(title: string, ipfsHash: string): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized')
    }

    const tx = await this.contract.createPost(title, ipfsHash)
    return tx.hash
  }

  async tipPost(postId: number, amount: string): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized')
    }

    const tx = await this.contract.tipPost(postId, {
      value: ethers.parseEther(amount)
    })
    return tx.hash
  }

  async getPost(postId: number) {
    if (!this.contract) {
      throw new Error('Contract not initialized')
    }

    return await this.contract.getPost(postId)
  }

  async getPostCount(): Promise<number> {
    if (!this.contract) {
      throw new Error('Contract not initialized')
    }

    const count = await this.contract.postCounter()
    return Number(count)
  }

  getProvider(): ethers.BrowserProvider | null {
    return this.provider
  }
}

export const web3Service = new Web3Service()