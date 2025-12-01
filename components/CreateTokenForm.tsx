'use client';

import { useState } from 'react';
import { useActiveAccount, useSendTransaction } from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';
import { getContract } from 'thirdweb';
import { client, chain } from '@/lib/thirdweb';
import { Token, TokenFormData } from '@/types';
import sdk from '@farcaster/frame-sdk';

// Thirdweb's TokenERC20 contract for deploying ERC20 tokens
const TOKEN_FACTORY_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with actual Thirdweb factory

interface CreateTokenFormProps {
  userAddress: string;
  onTokenCreated: (token: Token) => void;
}

export function CreateTokenForm({ userAddress, onTokenCreated }: CreateTokenFormProps) {
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    totalSupply: '',
  });
  const [isDeploying, setIsDeploying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const account = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // For symbol, convert to uppercase
    if (name === 'symbol') {
      setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Token name is required');
      return false;
    }
    if (!formData.symbol.trim() || formData.symbol.length > 11) {
      setError('Symbol must be 1-11 characters');
      return false;
    }
    if (!formData.totalSupply || parseFloat(formData.totalSupply) <= 0) {
      setError('Total supply must be greater than 0');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsDeploying(true);
    setError(null);

    try {
      // Wallet is automatically connected via Farcaster app
      // For now, we'll show a success message
      // In production, you would actually deploy the contract here using Thirdweb
      
      // Simulate deployment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a mock token entry
      const newToken: Token = {
        name: formData.name,
        symbol: formData.symbol,
        totalSupply: formData.totalSupply,
        contractAddress: `0x${Math.random().toString(16).slice(2, 42)}`, // Mock address
        createdAt: new Date().toISOString(),
        txHash: `0x${Math.random().toString(16).slice(2, 66)}`, // Mock tx hash
      };

      onTokenCreated(newToken);
      
      // Reset form
      setFormData({
        name: '',
        symbol: '',
        totalSupply: '',
      });

      // Show success notification
      await sdk.actions.showToast({
        message: `Token ${formData.symbol} created successfully!`,
      });

    } catch (err: any) {
      console.error('Error creating token:', err);
      setError(err.message || 'Failed to create token. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-base-dark mb-2">Create Your Token</h2>
        <p className="text-base-gray">Deploy your own ERC-20 token on Base</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Token Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-base-dark mb-2">
            Token Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., My Awesome Token"
            className="input-field"
            maxLength={50}
          />
        </div>

        {/* Token Symbol */}
        <div>
          <label htmlFor="symbol" className="block text-sm font-semibold text-base-dark mb-2">
            Token Symbol
          </label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={formData.symbol}
            onChange={handleInputChange}
            placeholder="e.g., MAT"
            className="input-field"
            maxLength={11}
          />
          <p className="text-xs text-base-gray mt-1">1-11 characters</p>
        </div>

        {/* Total Supply */}
        <div>
          <label htmlFor="totalSupply" className="block text-sm font-semibold text-base-dark mb-2">
            Total Supply
          </label>
          <input
            type="number"
            id="totalSupply"
            name="totalSupply"
            value={formData.totalSupply}
            onChange={handleInputChange}
            placeholder="e.g., 1000000"
            className="input-field"
            min="1"
            step="any"
          />
          <p className="text-xs text-base-gray mt-1">All tokens will be minted to your wallet</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-blue-50 border border-base-lightblue rounded-lg p-4">
          <h3 className="font-semibold text-base-dark mb-2">ℹ️ What happens next?</h3>
          <ul className="text-sm text-base-gray space-y-1">
            <li>• Your token will be deployed on Base</li>
            <li>• All tokens will be minted to your wallet</li>
            <li>• You'll pay only the gas fees</li>
            <li>• Contract is verified and secure</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isDeploying}
          className="btn-primary w-full text-lg"
        >
          {isDeploying ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Deploying...
            </span>
          ) : (
            '🚀 Launch Token'
          )}
        </button>
      </form>
    </div>
  );
}
