'use client';

import { Token } from '@/types';
import { useState } from 'react';

interface TokenHistoryProps {
  tokens: Token[];
}

export function TokenHistory({ tokens }: TokenHistoryProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: 'address' | 'tx') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(text);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatSupply = (supply: string) => {
    const num = parseFloat(supply);
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}M`;
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(2)}K`;
    }
    return num.toLocaleString();
  };

  if (tokens.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-xl font-bold text-base-dark mb-2">No Tokens Yet</h3>
        <p className="text-base-gray mb-6">Create your first token to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-base-dark">Your Tokens</h2>
        <span className="text-base-gray text-sm">{tokens.length} total</span>
      </div>

      {tokens.map((token, index) => (
        <div key={index} className="card hover:shadow-xl transition-shadow duration-200">
          {/* Token Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-base-dark mb-1">{token.name}</h3>
              <div className="flex items-center gap-2">
                <span className="inline-block bg-base-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {token.symbol}
                </span>
                <span className="text-base-gray text-sm">
                  {formatDate(token.createdAt)}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-base-dark">{formatSupply(token.totalSupply)}</p>
              <p className="text-xs text-base-gray">Total Supply</p>
            </div>
          </div>

          {/* Token Details */}
          <div className="space-y-3 pt-4 border-t border-gray-200">
            {/* Contract Address */}
            <div>
              <p className="text-xs font-semibold text-base-gray mb-1">Contract Address</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-base-light px-3 py-2 rounded text-sm font-mono text-base-dark">
                  {formatAddress(token.contractAddress)}
                </code>
                <button
                  onClick={() => copyToClipboard(token.contractAddress, 'address')}
                  className="p-2 hover:bg-base-light rounded transition-colors"
                  title="Copy address"
                >
                  {copiedAddress === token.contractAddress ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-base-gray">📋</span>
                  )}
                </button>
              </div>
            </div>

            {/* Transaction Hash */}
            <div>
              <p className="text-xs font-semibold text-base-gray mb-1">Transaction</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-base-light px-3 py-2 rounded text-sm font-mono text-base-dark">
                  {formatAddress(token.txHash)}
                </code>
                <button
                  onClick={() => copyToClipboard(token.txHash, 'tx')}
                  className="p-2 hover:bg-base-light rounded transition-colors"
                  title="Copy transaction hash"
                >
                  {copiedAddress === token.txHash ? (
                    <span className="text-green-600">✓</span>
                  ) : (
                    <span className="text-base-gray">📋</span>
                  )}
                </button>
              </div>
            </div>

            {/* View on Explorer */}
            <a
              href={`https://basescan.org/address/${token.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-center block mt-4"
            >
              View on BaseScan →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
