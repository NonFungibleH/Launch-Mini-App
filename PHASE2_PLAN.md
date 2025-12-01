# 🦄 Phase 2: Uniswap Pool Creation

Planning document for adding automatic liquidity pool creation to Launch mini app.

## Overview

Phase 2 adds the ability to create a Uniswap V2/V3 liquidity pool immediately after token deployment, enabling instant trading.

## User Flow (V2)

1. User fills in token details (name, symbol, supply)
2. User optionally adds liquidity details:
   - Amount of tokens to add to pool
   - Amount of ETH to pair with tokens
   - Initial price calculation shown
3. Single transaction (or batched):
   - Deploy token
   - Approve token for Uniswap router
   - Create liquidity pool
   - Add initial liquidity
4. User receives:
   - Token contract address
   - Pool address
   - LP token amount
   - Direct link to trade

## Technical Requirements

### Smart Contracts Needed

1. **Uniswap V2 Factory**
   - Base: `0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6`
   - Create pair: `createPair(tokenA, tokenB)`

2. **Uniswap V2 Router**
   - Base: `0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24`
   - Add liquidity: `addLiquidityETH()`

3. **WETH Contract**
   - Base: `0x4200000000000000000000000000000000000006`

### SDK Updates

```typescript
// Additional imports needed
import { 
  getContract, 
  prepareContractCall,
  sendTransaction 
} from "thirdweb";

// Uniswap V2 Router ABI (simplified)
const ROUTER_ABI = [
  {
    name: "addLiquidityETH",
    type: "function",
    inputs: [
      { name: "token", type: "address" },
      { name: "amountTokenDesired", type: "uint256" },
      { name: "amountTokenMin", type: "uint256" },
      { name: "amountETHMin", type: "uint256" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" }
    ],
    outputs: [
      { name: "amountToken", type: "uint256" },
      { name: "amountETH", type: "uint256" },
      { name: "liquidity", type: "uint256" }
    ]
  }
];
```

## UI Updates

### New Form Fields

Add to CreateTokenForm.tsx:

```typescript
interface TokenFormData {
  // Existing
  name: string;
  symbol: string;
  totalSupply: string;
  
  // New for Phase 2
  createPool: boolean;
  tokenAmount: string;  // Tokens to add to pool
  ethAmount: string;    // ETH to pair
}
```

### Price Calculator

```typescript
const calculateInitialPrice = (tokenAmount: string, ethAmount: string) => {
  const tokens = parseFloat(tokenAmount);
  const eth = parseFloat(ethAmount);
  
  if (tokens && eth) {
    return (eth / tokens).toFixed(8);
  }
  return "0";
};
```

### New UI Section

```tsx
{/* Pool Creation Section */}
<div className="border-t border-gray-200 pt-6 mt-6">
  <div className="flex items-center gap-2 mb-4">
    <input
      type="checkbox"
      checked={formData.createPool}
      onChange={(e) => setFormData({...formData, createPool: e.target.checked})}
    />
    <label className="font-semibold">Create Uniswap Pool (Optional)</label>
  </div>
  
  {formData.createPool && (
    <div className="space-y-4">
      <div>
        <label>Tokens for Pool</label>
        <input 
          type="number"
          value={formData.tokenAmount}
          onChange={(e) => setFormData({...formData, tokenAmount: e.target.value})}
        />
      </div>
      
      <div>
        <label>ETH to Pair</label>
        <input 
          type="number"
          value={formData.ethAmount}
          onChange={(e) => setFormData({...formData, ethAmount: e.target.value})}
        />
      </div>
      
      <div className="bg-blue-50 p-4 rounded">
        <p>Initial Price: 1 {formData.symbol} = {calculateInitialPrice(formData.tokenAmount, formData.ethAmount)} ETH</p>
      </div>
    </div>
  )}
</div>
```

## Deployment Flow

### Option A: Sequential Transactions

```typescript
const deployWithPool = async () => {
  // 1. Deploy token
  const tokenContract = await deployContract({...});
  
  // 2. Approve router to spend tokens
  await sendTransaction({
    contract: tokenContract,
    method: "approve",
    params: [ROUTER_ADDRESS, tokenAmount]
  });
  
  // 3. Add liquidity
  const router = getContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    chain
  });
  
  const tx = await sendTransaction({
    contract: router,
    method: "addLiquidityETH",
    params: [
      tokenContract.address,
      tokenAmount,
      tokenAmountMin, // 95% of desired
      ethAmountMin,   // 95% of desired
      userAddress,
      deadline        // Now + 20 minutes
    ],
    value: ethAmount // ETH to add
  });
};
```

### Option B: Multicall (Better UX)

Use Thirdweb's multicall or batch transactions:

```typescript
const transactions = [
  prepareContractCall({
    contract: tokenContract,
    method: "approve",
    params: [ROUTER_ADDRESS, tokenAmount]
  }),
  prepareContractCall({
    contract: router,
    method: "addLiquidityETH",
    params: [...],
    value: ethAmount
  })
];

await sendBatchTransaction(transactions);
```

## TokenHistory Updates

Add pool information to each token:

```typescript
interface Token {
  // Existing
  name: string;
  symbol: string;
  totalSupply: string;
  contractAddress: string;
  createdAt: string;
  txHash: string;
  
  // New
  poolAddress?: string;
  initialPrice?: string;
  liquidityAdded?: {
    tokens: string;
    eth: string;
  };
}
```

Display pool info in TokenHistory.tsx:

```tsx
{token.poolAddress && (
  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
    <h4 className="font-semibold text-green-800 mb-2">🦄 Liquidity Pool</h4>
    <p className="text-sm text-green-700">
      Pool Address: {formatAddress(token.poolAddress)}
    </p>
    <p className="text-sm text-green-700">
      Initial Price: 1 {token.symbol} = {token.initialPrice} ETH
    </p>
    <a 
      href={`https://app.uniswap.org/pools/${token.poolAddress}`}
      className="btn-primary mt-3 text-sm"
    >
      View Pool on Uniswap →
    </a>
  </div>
)}
```

## Error Handling

Common issues to handle:

1. **Insufficient ETH**: Check user has enough ETH for pool + gas
2. **Token Approval Fails**: Retry mechanism
3. **Pool Already Exists**: Check before creating
4. **Price Impact**: Warn if price would be unusual
5. **Slippage**: Add configurable slippage tolerance

## Testing Checklist

- [ ] Deploy token only (no pool)
- [ ] Deploy token + create pool
- [ ] Verify pool on Uniswap interface
- [ ] Test trading in the pool
- [ ] Check LP tokens received
- [ ] Verify pool shows in history
- [ ] Test with different token amounts
- [ ] Test with minimal ETH amounts
- [ ] Error handling for failed transactions
- [ ] Mobile experience

## User Education

Add info sections:

```tsx
<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
  <h4 className="font-semibold mb-2">⚠️ Important Notes</h4>
  <ul className="text-sm space-y-1">
    <li>• You'll provide initial liquidity for your token</li>
    <li>• The ratio you set determines the starting price</li>
    <li>• You'll receive LP tokens representing your liquidity</li>
    <li>• Others can immediately trade your token</li>
    <li>• You can remove liquidity anytime via Uniswap</li>
  </ul>
</div>
```

## Cost Considerations

Estimate gas costs for users:

- Token deployment: ~0.0015 ETH
- Token approval: ~0.0002 ETH
- Create pool + add liquidity: ~0.002 ETH
- **Total**: ~0.0037 ETH + liquidity ETH

Display this clearly:

```tsx
<div className="text-sm text-gray-600">
  <p>Estimated Gas: ~0.004 ETH</p>
  <p>Initial Liquidity: {formData.ethAmount} ETH</p>
  <p className="font-semibold">Total Cost: ~{(0.004 + parseFloat(formData.ethAmount)).toFixed(4)} ETH</p>
</div>
```

## Alternative: Aerodrome Finance

Aerodrome is Base's native DEX and may be a better choice:

**Pros:**
- Optimized for Base
- Better liquidity incentives
- Official Base partnership

**Cons:**
- Different API than Uniswap
- Less familiar to users

Research: Check Aerodrome's contract addresses and integration docs.

## Phase 2 Rollout Plan

1. **Development** (1-2 weeks)
   - Implement pool creation
   - Add UI updates
   - Test on Base testnet

2. **Beta Testing** (1 week)
   - Deploy to staging
   - Test with small amounts
   - Gather user feedback

3. **Launch** (1 day)
   - Deploy to production
   - Update documentation
   - Announce in community

4. **Monitor** (ongoing)
   - Track pool creations
   - Monitor for issues
   - Collect analytics

## Future Enhancements (Phase 3+)

- **Advanced Pool Options**: Fee tiers, concentrated liquidity (V3)
- **Token Analytics**: Price charts, volume, holders
- **Social Features**: Token launch feed, trending tokens
- **Governance**: Add voting/governance features
- **Cross-chain**: Deploy to other chains
- **Token Management**: Burn, mint, pause functions
- **Marketing Tools**: Automatic tweets, Frame embeds

## Resources

- [Uniswap V2 Docs](https://docs.uniswap.org/contracts/v2/overview)
- [Aerodrome Docs](https://docs.aerodrome.finance/)
- [Base DEX Options](https://docs.base.org/building-with-base/guides/defi)
- [Thirdweb Multicall](https://portal.thirdweb.com/typescript/v5/transactions/batching)

---

**Phase 2 Goal**: Make Launch the fastest way to create a tradeable token on Base! 🚀
