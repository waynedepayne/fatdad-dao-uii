'use client';

import tokenConfig from '../config/tokenConfig';

// Interface for price data point
export interface PriceDataPoint {
  timestamp: number;
  price: number;
}

// Interface for price history data
export interface PriceHistoryData {
  daily: PriceDataPoint[];
  weekly: PriceDataPoint[];
  monthly: PriceDataPoint[];
  yearly: PriceDataPoint[];
}

// Generate mock historical data (for demonstration)
// In a real application, you would fetch this from an API
const generateMockPriceHistory = (): PriceHistoryData => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;
  
  // Helper function to generate random price movements
  const generatePriceData = (
    startTime: number,
    endTime: number,
    interval: number,
    startPrice: number,
    volatility: number
  ): PriceDataPoint[] => {
    const data: PriceDataPoint[] = [];
    let currentPrice = startPrice;
    
    for (let timestamp = startTime; timestamp <= endTime; timestamp += interval) {
      // Random price movement with trend
      const change = (Math.random() - 0.4) * volatility * currentPrice;
      currentPrice = Math.max(0.001, currentPrice + change);
      
      data.push({
        timestamp,
        price: currentPrice,
      });
    }
    
    return data;
  };
  
  // Generate data for different time periods
  return {
    daily: generatePriceData(now - day, now, day / 24, 0.01, 0.03),
    weekly: generatePriceData(now - week, now, day, 0.008, 0.05),
    monthly: generatePriceData(now - month, now, day * 2, 0.005, 0.08),
    yearly: generatePriceData(now - year, now, week, 0.002, 0.15),
  };
};

// Cache for price history data
let priceHistoryCache: PriceHistoryData | null = null;

/**
 * Fetch price history data
 * In a real application, you would fetch this from an API
 */
export const fetchPriceHistory = async (): Promise<PriceHistoryData> => {
  try {
    // If we have cached data, return it
    if (priceHistoryCache) {
      return priceHistoryCache;
    }
    
    // In a real application, you would fetch data from an API
    // For demonstration, we'll generate mock data
    const mockData = generateMockPriceHistory();
    
    // Cache the data
    priceHistoryCache = mockData;
    
    return mockData;
  } catch (error) {
    console.error('Error fetching price history:', error);
    // Return empty data in case of error
    return {
      daily: [],
      weekly: [],
      monthly: [],
      yearly: [],
    };
  }
};

/**
 * Get price change percentage for a specific time period
 */
export const getPriceChangePercent = (data: PriceDataPoint[]): number => {
  if (data.length < 2) {
    return 0;
  }
  
  const startPrice = data[0].price;
  const endPrice = data[data.length - 1].price;
  
  return ((endPrice - startPrice) / startPrice) * 100;
};

export default {
  fetchPriceHistory,
  getPriceChangePercent,
}; 