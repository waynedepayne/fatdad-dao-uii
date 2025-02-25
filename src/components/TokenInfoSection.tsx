'use client';

import { FC } from 'react';
import { useTokenData } from '../hooks/useTokenData';
import PriceChart from './PriceChart';
import Button from './Button';
import tokenConfig from '../config/tokenConfig';
import { getPriceChangePercent, fetchPriceHistory } from '../services/priceHistoryService';
import { useEffect, useState } from 'react';

export const TokenInfoSection: FC = () => {
  const { tokenData, loading, error, refreshData } = useTokenData();
  const [priceChangePercent, setPriceChangePercent] = useState<number>(0);
  
  // Fetch price change percentage
  useEffect(() => {
    const fetchPriceChange = async () => {
      try {
        const priceHistory = await fetchPriceHistory();
        const weeklyChange = getPriceChangePercent(priceHistory.weekly);
        setPriceChangePercent(weeklyChange);
      } catch (error) {
        console.error('Error fetching price change:', error);
      }
    };
    
    fetchPriceChange();
  }, []);
  
  return (
    <section id="token-info" className="py-16 bg-black/80 backdrop-blur-md border-b border-neutral-800/50 relative">
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="text-purple-500 font-medium mb-2 block">{tokenConfig.symbol} Token</span>
          <h2 className="text-3xl font-bold text-white mb-4">Token Metrics</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">Real-time statistics and key metrics for the {tokenConfig.symbol} token ecosystem</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">
            <p>{error}</p>
            <Button 
              variant="secondary" 
              size="sm" 
              className="mt-4"
              onClick={refreshData}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Supply */}
              <div className="token-card bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-md rounded-xl p-6 border border-neutral-800/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Total Supply</h3>
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <i className="fa-solid fa-coins"></i>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold text-white">{tokenData.totalSupply}</div>
                  <div className="text-sm text-neutral-500 mb-1">{tokenConfig.symbol}</div>
                </div>
                <div className="mt-2 text-neutral-500 text-sm">Maximum token supply</div>
              </div>
              
              {/* Circulating Supply */}
              <div className="token-card bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-md rounded-xl p-6 border border-neutral-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Circulating Supply</h3>
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <i className="fa-solid fa-circle-nodes"></i>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold text-white">{tokenData.circulatingSupply}</div>
                  <div className="text-sm text-neutral-500 mb-1">{tokenConfig.symbol}</div>
                </div>
                <div className="mt-2 text-neutral-500 text-sm">
                  <span className="text-green-500">{tokenData.circulatingSupplyPercent.toFixed(1)}%</span> of total supply
                </div>
              </div>
              
              {/* Liquidity */}
              <div className="token-card bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-md rounded-xl p-6 border border-neutral-800/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Liquidity</h3>
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <i className="fa-solid fa-water"></i>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold text-white">{tokenData.liquidity}</div>
                  <div className="text-sm text-green-500 mb-1 flex items-center">
                    <i className={`fa-solid fa-arrow-${tokenData.liquidityChangePercent >= 0 ? 'up' : 'down'} mr-1`}></i>
                    {Math.abs(tokenData.liquidityChangePercent).toFixed(1)}%
                  </div>
                </div>
                <div className="mt-2 text-neutral-500 text-sm">Locked for 2 years</div>
              </div>
              
              {/* Market Cap */}
              <div className="token-card bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-md rounded-xl p-6 border border-neutral-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-white">Market Cap</h3>
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <i className="fa-solid fa-chart-pie"></i>
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold text-white">{tokenData.marketCap}</div>
                  <div className="text-sm text-green-500 mb-1 flex items-center">
                    <i className={`fa-solid fa-arrow-${tokenData.priceChangePercent >= 0 ? 'up' : 'down'} mr-1`}></i>
                    {Math.abs(tokenData.priceChangePercent).toFixed(1)}%
                  </div>
                </div>
                <div className="mt-2 text-neutral-500 text-sm">Fully diluted: $10M</div>
              </div>
            </div>
            
            {/* Price Chart */}
            <div className="mt-12 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-md rounded-xl p-6 border border-neutral-800/50 mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Price History</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{tokenData.price}</span>
                    <span className={`text-${priceChangePercent >= 0 ? 'green' : 'red'}-500 text-sm flex items-center`}>
                      <i className={`fa-solid fa-arrow-${priceChangePercent >= 0 ? 'up' : 'down'} mr-1`}></i>
                      {Math.abs(priceChangePercent).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
              <PriceChart />
            </div>
            
            {/* Token Distribution Chart */}
            <div className="mt-12 bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-md rounded-xl p-6 border border-neutral-800/50">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold text-white mb-4">Token Distribution</h3>
                  <ul className="space-y-3">
                    {Object.entries(tokenConfig.distribution).map(([key, value]) => (
                      <li key={key} className="flex items-center gap-3">
                        <span className={`w-3 h-3 rounded-full ${
                          key === 'community' ? 'bg-purple-500' :
                          key === 'treasury' ? 'bg-blue-500' :
                          key === 'team' ? 'bg-green-500' :
                          key === 'liquidity' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}></span>
                        <span className="text-white">
                          {key.charAt(0).toUpperCase() + key.slice(1)}: {value}%
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      size="md" 
                      icon={<i className="fa-solid fa-file-contract"></i>}
                      iconPosition="left"
                      onClick={() => window.open(tokenConfig.explorerUrl + tokenConfig.address.toString(), '_blank')}
                    >
                      View on Explorer
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-64 h-64 rounded-full border-8 border-neutral-800 relative flex items-center justify-center overflow-hidden">
                    {/* Simulated pie chart with CSS */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-purple-500 clip-pie-45"></div>
                      <div className="absolute inset-0 bg-blue-500 clip-pie-25 rotate-45"></div>
                      <div className="absolute inset-0 bg-green-500 clip-pie-15 rotate-70"></div>
                      <div className="absolute inset-0 bg-yellow-500 clip-pie-10 rotate-85"></div>
                      <div className="absolute inset-0 bg-red-500 clip-pie-5 rotate-95"></div>
                    </div>
                    <div className="w-20 h-20 bg-neutral-900 rounded-full z-10 flex items-center justify-center">
                      <span className="text-white font-bold">{tokenConfig.symbol}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TokenInfoSection; 