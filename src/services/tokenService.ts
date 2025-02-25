'use client';

import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import tokenConfig, { getRpcEndpoint, formatTokenAmount } from '../config/tokenConfig';

// Interface for token data
export interface TokenData {
  totalSupply: string;
  circulatingSupply: string;
  circulatingSupplyPercent: number;
  marketCap: string;
  price: string;
  priceChangePercent: number;
  liquidity: string;
  liquidityChangePercent: number;
}

// Default token data (used as fallback)
export const defaultTokenData: TokenData = {
  totalSupply: formatTokenAmount(tokenConfig.totalSupply * Math.pow(10, tokenConfig.decimals)),
  circulatingSupply: formatTokenAmount((tokenConfig.totalSupply * 0.45) * Math.pow(10, tokenConfig.decimals)),
  circulatingSupplyPercent: 45,
  marketCap: '$4.5M',
  price: '$0.01',
  priceChangePercent: 3.2,
  liquidity: '$1.2M',
  liquidityChangePercent: 2.5,
};

/**
 * Fetch token supply data from Solana blockchain
 */
export const fetchTokenSupply = async (): Promise<{ totalSupply: number; circulatingSupply: number }> => {
  try {
    const connection = new Connection(getRpcEndpoint());
    
    // Get token supply
    const tokenSupply = await connection.getTokenSupply(tokenConfig.address);
    
    // Calculate circulating supply (this is a simplified approach)
    // In a real-world scenario, you would need to check token accounts owned by the project
    // and subtract them from the total supply to get the actual circulating supply
    const circulatingSupply = tokenSupply.value.uiAmount || 0;
    
    // For demonstration, we'll assume 45% is circulating
    const adjustedCirculatingSupply = circulatingSupply * 0.45;
    
    return {
      totalSupply: circulatingSupply,
      circulatingSupply: adjustedCirculatingSupply,
    };
  } catch (error) {
    console.error('Error fetching token supply:', error);
    // Return default values if there's an error
    return {
      totalSupply: tokenConfig.totalSupply,
      circulatingSupply: tokenConfig.totalSupply * 0.45,
    };
  }
};

/**
 * Fetch token price data from available price APIs with fallback
 */
export const fetchTokenPrice = async (): Promise<{ price: number; priceChangePercent: number }> => {
  // Try each API in sequence until one works
  const apis = [
    tokenConfig.defaultPriceApi,
    ...Object.keys(tokenConfig.priceApis).filter(api => api !== tokenConfig.defaultPriceApi)
  ] as Array<keyof typeof tokenConfig.priceApis>;
  
  for (const api of apis) {
    try {
      console.log(`Trying to fetch price from ${api} API...`);
      const price = await fetchPriceFromApi(api);
      
      if (price) {
        // Save the successful API as the default for next time
        if (api !== tokenConfig.defaultPriceApi && typeof localStorage !== 'undefined') {
          localStorage.setItem('preferred-price-api', api);
        }
        
        return { 
          price, 
          priceChangePercent: 3.2 // Default value for price change
        };
      }
    } catch (error) {
      console.error(`Error fetching price from ${api} API:`, error);
      // Continue to the next API
    }
  }
  
  // If all APIs fail, return default values
  console.warn('All price APIs failed, using default values');
  return { price: 0.01, priceChangePercent: 3.2 };
};

/**
 * Fetch price from a specific API
 */
const fetchPriceFromApi = async (api: keyof typeof tokenConfig.priceApis): Promise<number | null> => {
  const apiUrl = tokenConfig.priceApis[api];
  const tokenAddress = tokenConfig.address.toString();
  
  try {
    let response;
    let data;
    
    switch (api) {
      case 'jupiter':
        response = await fetch(`${apiUrl}?ids=${tokenAddress}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) {
          throw new Error(`Jupiter API error: ${response.status}`);
        }
        
        data = await response.json();
        return data.data?.[tokenAddress]?.price || null;
        
      case 'coingecko':
        // Note: For a real token, you'd need to use its coingecko ID
        // This is just a placeholder example
        response = await fetch(`${apiUrl}?ids=solana&vs_currencies=usd`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) {
          throw new Error(`Coingecko API error: ${response.status}`);
        }
        
        data = await response.json();
        // Using SOL price as a placeholder
        return data.solana?.usd || null;
        
      case 'birdeye':
        response = await fetch(`${apiUrl}?address=${tokenAddress}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(5000)
        });
        
        if (!response.ok) {
          throw new Error(`Birdeye API error: ${response.status}`);
        }
        
        data = await response.json();
        return data.data?.value || null;
        
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error in ${api} API:`, error);
    return null;
  }
};

/**
 * Fetch liquidity data from DEX pools
 */
export const fetchLiquidityData = async (): Promise<{ liquidity: number; liquidityChangePercent: number }> => {
  try {
    // In a real implementation, you would fetch liquidity data from DEXes like Raydium, Orca, etc.
    // This is a simplified placeholder
    
    // For demonstration purposes, we'll return default values
    return {
      liquidity: 1200000, // $1.2M
      liquidityChangePercent: 2.5,
    };
  } catch (error) {
    console.error('Error fetching liquidity data:', error);
    return {
      liquidity: 1200000,
      liquidityChangePercent: 2.5,
    };
  }
};

/**
 * Calculate market cap based on circulating supply and price
 */
export const calculateMarketCap = (circulatingSupply: number, price: number): number => {
  return circulatingSupply * price;
};

/**
 * Fetch all token data
 */
export const fetchAllTokenData = async (): Promise<TokenData> => {
  try {
    // Fetch supply data
    const supplyData = await fetchTokenSupply();
    
    // Fetch price data
    const priceData = await fetchTokenPrice();
    
    // Fetch liquidity data
    const liquidityData = await fetchLiquidityData();
    
    // Calculate market cap
    const marketCap = calculateMarketCap(supplyData.circulatingSupply, priceData.price);
    
    // Calculate circulating supply percentage
    const circulatingSupplyPercent = (supplyData.circulatingSupply / supplyData.totalSupply) * 100;
    
    return {
      totalSupply: formatTokenAmount(supplyData.totalSupply * Math.pow(10, tokenConfig.decimals)),
      circulatingSupply: formatTokenAmount(supplyData.circulatingSupply * Math.pow(10, tokenConfig.decimals)),
      circulatingSupplyPercent,
      marketCap: `$${(marketCap / 1000000).toFixed(1)}M`,
      price: `$${priceData.price.toFixed(2)}`,
      priceChangePercent: priceData.priceChangePercent,
      liquidity: `$${(liquidityData.liquidity / 1000000).toFixed(1)}M`,
      liquidityChangePercent: liquidityData.liquidityChangePercent,
    };
  } catch (error) {
    console.error('Error fetching all token data:', error);
    return defaultTokenData;
  }
};

export default {
  fetchTokenSupply,
  fetchTokenPrice,
  fetchLiquidityData,
  calculateMarketCap,
  fetchAllTokenData,
}; 