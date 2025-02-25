import { PublicKey } from '@solana/web3.js';

// Token configuration
export const tokenConfig = {
  // Token details
  name: 'FatDAD',
  symbol: '$FatDAD',
  decimals: 9,
  // Replace with the actual token address when deployed
  address: new PublicKey('11111111111111111111111111111111'),
  
  // RPC endpoints
  rpcEndpoints: {
    mainnet: 'https://api.mainnet-beta.solana.com',
    devnet: 'https://api.devnet.solana.com',
    testnet: 'https://api.testnet.solana.com',
  },
  
  // Current network
  network: 'mainnet' as 'mainnet' | 'devnet' | 'testnet',
  
  // Price API endpoints - multiple options for fallback
  priceApis: {
    jupiter: 'https://price.jup.ag/v4/price',
    coingecko: 'https://api.coingecko.com/api/v3/simple/price',
    birdeye: 'https://public-api.birdeye.so/public/price',
  },
  
  // Default API to use for price data
  defaultPriceApi: 'jupiter' as 'jupiter' | 'coingecko' | 'birdeye',
  
  // Jupiter aggregator API for price data (keeping for backward compatibility)
  jupiterApiUrl: 'https://price.jup.ag/v4/price',
  
  // Raydium or other liquidity pool addresses
  liquidityPools: {
    // Replace with actual liquidity pool addresses
    raydium: new PublicKey('11111111111111111111111111111111'),
    orca: new PublicKey('11111111111111111111111111111111'),
  },
  
  // Token distribution
  distribution: {
    community: 45, // 45%
    treasury: 25,  // 25%
    team: 15,      // 15%
    liquidity: 10, // 10%
    marketing: 5,  // 5%
  },
  
  // Total supply
  totalSupply: 1_000_000_000, // 1 billion tokens
  
  // Social links
  socialLinks: {
    website: 'https://fatdad.io',
    twitter: 'https://twitter.com/FatDADToken',
    telegram: 'https://t.me/FatDADToken',
    discord: 'https://discord.gg/fatdad',
  },
  
  // Explorer links
  explorerUrl: 'https://explorer.solana.com/address/',
};

// Helper function to get the current RPC endpoint
export const getRpcEndpoint = (): string => {
  return tokenConfig.rpcEndpoints[tokenConfig.network];
};

// Helper function to format token amounts (considering decimals)
export const formatTokenAmount = (amount: number | string): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return (num / Math.pow(10, tokenConfig.decimals)).toLocaleString('en-US', {
    maximumFractionDigits: 2,
  });
};

// Helper function to get token explorer URL
export const getTokenExplorerUrl = (): string => {
  return `${tokenConfig.explorerUrl}${tokenConfig.address.toString()}`;
};

export default tokenConfig; 