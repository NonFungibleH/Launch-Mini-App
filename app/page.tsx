'use client';
import { useEffect, useState } from 'react';
import sdk from '@farcaster/frame-sdk';
import { CreateTokenForm } from '@/components/CreateTokenForm';
import { TokenHistory } from '@/components/TokenHistory';
import { Token } from '@/types';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'history'>('create');

  useEffect(() => {
    const init = async () => {
      try {
        // Prevent MetaMask injection
        if (typeof window !== 'undefined') {
          delete (window as any).ethereum;
        }

        const ctx = await sdk.context;
        setContext(ctx);
        
        if (ctx?.user?.fid) {
          const savedTokens = localStorage.getItem(`tokens_${ctx.user.fid}`);
          if (savedTokens) {
            setTokens(JSON.parse(savedTokens));
          }
        }

        await sdk.actions.ready();
        setIsReady(true);
      } catch (error) {
        console.error('Error initializing mini app:', error);
        setIsReady(true);
      }
    };

    init();
  }, []);

  const handleTokenCreated = (newToken: Token) => {
    const updatedTokens = [newToken, ...tokens];
    setTokens(updatedTokens);
    
    if (context?.user?.fid) {
      localStorage.setItem(`tokens_${context.user.fid}`, JSON.stringify(updatedTokens));
    }
    
    setActiveTab('history');
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-blue to-base-lightblue">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading Launch...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-light via-white to-base-light">
      <div className="bg-gradient-to-r from-base-blue to-base-lightblue text-white py-6 px-4 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">🚀 Launch</h1>
          <p className="text-base-light opacity-90">Create your own token on Base in seconds</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6">
        <div className="flex gap-2 bg-white rounded-lg p-1 shadow-md">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all duration-200 ${
              activeTab === 'create'
                ? 'bg-base-blue text-white'
                : 'text-base-gray hover:bg-base-light'
            }`}
          >
            Create Token
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 rounded-md font-semibold transition-all duration-200 ${
              activeTab === 'history'
                ? 'bg-base-blue text-white'
                : 'text-base-gray hover:bg-base-light'
            }`}
          >
            My Tokens ({tokens.length})
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'create' ? (
          <CreateTokenForm 
            userAddress={context?.user?.username || ''} 
            onTokenCreated={handleTokenCreated}
          />
        ) : (
          <TokenHistory tokens={tokens} />
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 text-center text-base-gray text-sm">
        <p>Built on Base • Powered by Thirdweb</p>
      </div>
    </main>
  );
}
