export interface Token {
  name: string;
  symbol: string;
  totalSupply: string;
  contractAddress: string;
  createdAt: string;
  txHash: string;
}

export interface TokenFormData {
  name: string;
  symbol: string;
  totalSupply: string;
}
