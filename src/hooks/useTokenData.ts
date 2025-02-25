'use client';

import { useState, useEffect } from 'react';
import { TokenData, defaultTokenData, fetchAllTokenData } from '../services/tokenService';

/**
 * Hook to fetch and manage token data
 */
export const useTokenData = () => {
  const [tokenData, setTokenData] = useState<TokenData>(defaultTokenData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch token data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchAllTokenData();
      setTokenData(data);
    } catch (err) {
      console.error('Error in useTokenData hook:', err);
      setError('Failed to fetch token data');
      // Use default data in case of error
      setTokenData(defaultTokenData);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    
    // Optional: Set up a refresh interval
    const intervalId = setInterval(() => {
      fetchData();
    }, 60000); // Refresh every minute
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to manually refresh data
  const refreshData = () => {
    fetchData();
  };

  return {
    tokenData,
    loading,
    error,
    refreshData,
  };
};

export default useTokenData; 