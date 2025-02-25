'use client';

import { FC, useEffect, useRef, useState, useCallback } from 'react';
import { PriceDataPoint, fetchPriceHistory } from '../services/priceHistoryService';

interface PriceChartProps {
  className?: string;
}

type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface HoverInfo {
  visible: boolean;
  x: number;
  y: number;
  price: number;
  date: string;
}

const PriceChart: FC<PriceChartProps> = ({ className = '' }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [priceData, setPriceData] = useState<PriceDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo>({ visible: false, x: 0, y: 0, price: 0, date: '' });
  const [priceChange, setPriceChange] = useState<{ value: number; percent: number }>({ value: 0, percent: 0 });
  const [animationProgress, setAnimationProgress] = useState<number>(0);
  
  // Calculate price change
  useEffect(() => {
    if (priceData.length > 1) {
      const firstPrice = priceData[0].price;
      const lastPrice = priceData[priceData.length - 1].price;
      const change = lastPrice - firstPrice;
      const percentChange = (change / firstPrice) * 100;
      
      setPriceChange({
        value: change,
        percent: percentChange
      });
    }
  }, [priceData]);
  
  // Fetch price history data
  useEffect(() => {
    const loadPriceData = async () => {
      try {
        setLoading(true);
        setAnimationProgress(0);
        const history = await fetchPriceHistory();
        setPriceData(history[timeRange]);
        
        // Start animation
        let progress = 0;
        const animateChart = () => {
          progress += 0.03;
          setAnimationProgress(Math.min(progress, 1));
          
          if (progress < 1) {
            requestAnimationFrame(animateChart);
          }
        };
        
        requestAnimationFrame(animateChart);
      } catch (error) {
        console.error('Error loading price data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPriceData();
  }, [timeRange]);
  
  // Handle mouse movement for hover effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartRef.current || priceData.length === 0 || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = canvasRef.current.width;
    const padding = 30;
    
    // Only process if within the chart area
    if (x < padding || x > width - padding) {
      setHoverInfo(prev => ({ ...prev, visible: false }));
      return;
    }
    
    // Find the closest data point
    const dataWidth = width - 2 * padding;
    const dataIndex = Math.min(
      Math.floor(((x - padding) / dataWidth) * (priceData.length - 1)),
      priceData.length - 1
    );
    
    if (dataIndex >= 0) {
      const dataPoint = priceData[dataIndex];
      const prices = priceData.map(point => point.price);
      const maxValue = Math.max(...prices);
      const minValue = Math.min(...prices);
      const range = maxValue - minValue;
      const height = canvasRef.current.height;
      
      // Calculate y position
      const y = height - padding - (height - 2 * padding) * ((dataPoint.price - minValue) / range);
      
      // Format date based on time range
      let dateStr = '';
      const date = new Date(dataPoint.timestamp);
      
      switch (timeRange) {
        case 'daily':
          dateStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          break;
        case 'weekly':
          dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
          break;
        case 'monthly':
          dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          break;
        case 'yearly':
          dateStr = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          break;
      }
      
      // Calculate x position for the data point
      const pointX = padding + dataWidth * (dataIndex / (priceData.length - 1));
      
      setHoverInfo({
        visible: true,
        x: pointX,
        y,
        price: dataPoint.price,
        date: dateStr
      });
    }
  }, [priceData, timeRange]);
  
  const handleMouseLeave = useCallback(() => {
    setHoverInfo(prev => ({ ...prev, visible: false }));
  }, []);
  
  // Draw chart when price data changes
  useEffect(() => {
    if (!chartRef.current || priceData.length === 0) return;
    
    // Clear previous chart
    chartRef.current.innerHTML = '';
    
    const canvas = document.createElement('canvas');
    canvas.width = chartRef.current.clientWidth;
    canvas.height = chartRef.current.clientHeight;
    chartRef.current.appendChild(canvas);
    canvasRef.current = canvas;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Enable antialiasing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Draw chart
    const width = canvas.width;
    const height = canvas.height;
    
    // Extract price values from data
    const prices = priceData.map(point => point.price);
    
    // Calculate scaling
    const maxValue = Math.max(...prices);
    const minValue = Math.min(...prices);
    // Add some padding to min/max for better visualization
    const valueRange = (maxValue - minValue) * 1.1;
    const adjustedMin = Math.max(0, minValue - valueRange * 0.05);
    const adjustedMax = maxValue + valueRange * 0.05;
    const range = adjustedMax - adjustedMin;
    const padding = 30;
    
    // Create background gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, 'rgba(30, 30, 30, 0.4)');
    bgGradient.addColorStop(1, 'rgba(20, 20, 20, 0)');
    
    // Fill background
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid lines with better styling
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding + (height - 2 * padding) * (i / 4);
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }
    
    // Vertical grid lines
    for (let i = 0; i <= 6; i++) {
      const x = padding + (width - 2 * padding) * (i / 6);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }
    
    // Determine if price is up or down
    const isUp = prices[0] <= prices[prices.length - 1];
    const mainColor = isUp ? 
      { r: 56, g: 178, b: 172 } :  // Teal for up
      { r: 239, g: 68, b: 68 };    // Red for down
    
    // Calculate how many points to draw based on animation progress
    const pointsToDraw = Math.max(2, Math.floor(priceData.length * animationProgress));
    const animatedPrices = prices.slice(0, pointsToDraw);
    
    // Draw the line with gradient based on direction
    const lineGradient = ctx.createLinearGradient(0, 0, width, 0);
    lineGradient.addColorStop(0, `rgba(${mainColor.r}, ${mainColor.g}, ${mainColor.b}, 0.8)`);
    lineGradient.addColorStop(1, `rgba(${mainColor.r + 30}, ${mainColor.g + 30}, ${mainColor.b + 30}, 0.9)`);
    
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    
    animatedPrices.forEach((price, index) => {
      const x = padding + (width - 2 * padding) * (index / (prices.length - 1));
      const y = height - padding - (height - 2 * padding) * ((price - adjustedMin) / range);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        // Use bezier curves for smoother lines
        const prevX = padding + (width - 2 * padding) * ((index - 1) / (prices.length - 1));
        const prevY = height - padding - (height - 2 * padding) * ((animatedPrices[index - 1] - adjustedMin) / range);
        
        const cpX1 = prevX + (x - prevX) / 2;
        const cpX2 = prevX + (x - prevX) / 2;
        
        ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw gradient area under the line
    const areaGradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    areaGradient.addColorStop(0, `rgba(${mainColor.r}, ${mainColor.g}, ${mainColor.b}, 0.2)`);
    areaGradient.addColorStop(0.5, `rgba(${mainColor.r}, ${mainColor.g}, ${mainColor.b}, 0.05)`);
    areaGradient.addColorStop(1, `rgba(${mainColor.r}, ${mainColor.g}, ${mainColor.b}, 0)`);
    
    ctx.fillStyle = areaGradient;
    ctx.beginPath();
    
    // Start from the bottom left
    ctx.moveTo(padding, height - padding);
    
    // Draw the same line as before
    animatedPrices.forEach((price, index) => {
      const x = padding + (width - 2 * padding) * (index / (prices.length - 1));
      const y = height - padding - (height - 2 * padding) * ((price - adjustedMin) / range);
      
      if (index === 0) {
        ctx.lineTo(x, y);
      } else {
        // Use bezier curves for smoother lines
        const prevX = padding + (width - 2 * padding) * ((index - 1) / (prices.length - 1));
        const prevY = height - padding - (height - 2 * padding) * ((animatedPrices[index - 1] - adjustedMin) / range);
        
        const cpX1 = prevX + (x - prevX) / 2;
        const cpX2 = prevX + (x - prevX) / 2;
        
        ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y);
      }
    });
    
    // Complete the path to the bottom right and fill
    ctx.lineTo(padding + (width - 2 * padding) * ((pointsToDraw - 1) / (prices.length - 1)), height - padding);
    ctx.lineTo(padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw axes labels with better styling
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    
    // Y-axis labels (price)
    for (let i = 0; i <= 4; i++) {
      const value = adjustedMin + range * (i / 4);
      const y = height - padding - (height - 2 * padding) * (i / 4);
      ctx.fillText(`$${value.toFixed(4)}`, padding - 8, y + 4);
    }
    
    // X-axis labels (time)
    const getTimeLabels = (): string[] => {
      const timestamps = priceData.map(point => point.timestamp);
      const labels: string[] = [];
      
      // Create appropriate labels based on time range
      switch (timeRange) {
        case 'daily':
          // Hours
          for (let i = 0; i <= 6; i++) {
            const index = Math.floor((i / 6) * (timestamps.length - 1));
            const date = new Date(timestamps[index]);
            labels.push(`${date.getHours()}:00`);
          }
          break;
        case 'weekly':
          // Days
          for (let i = 0; i <= 6; i++) {
            const index = Math.floor((i / 6) * (timestamps.length - 1));
            const date = new Date(timestamps[index]);
            labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
          }
          break;
        case 'monthly':
          // Dates
          for (let i = 0; i <= 6; i++) {
            const index = Math.floor((i / 6) * (timestamps.length - 1));
            const date = new Date(timestamps[index]);
            labels.push(`${date.getDate()}/${date.getMonth() + 1}`);
          }
          break;
        case 'yearly':
          // Months
          for (let i = 0; i <= 6; i++) {
            const index = Math.floor((i / 6) * (timestamps.length - 1));
            const date = new Date(timestamps[index]);
            labels.push(date.toLocaleDateString('en-US', { month: 'short' }));
          }
          break;
      }
      
      return labels;
    };
    
    const timeLabels = getTimeLabels();
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    
    for (let i = 0; i <= 6; i++) {
      const x = padding + (width - 2 * padding) * (i / 6);
      ctx.fillText(timeLabels[i] || '', x, height - padding + 16);
    }
    
  }, [priceData, timeRange, animationProgress]);
  
  // Handle time range change
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
  };
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">
              ${priceData.length > 0 ? priceData[priceData.length - 1].price.toFixed(4) : '0.0000'}
            </span>
            <span className={`text-sm font-medium ${priceChange.percent >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {priceChange.percent >= 0 ? '+' : ''}{priceChange.percent.toFixed(2)}%
            </span>
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            {timeRange === 'daily' ? 'Last 24 hours' : 
             timeRange === 'weekly' ? 'Last 7 days' : 
             timeRange === 'monthly' ? 'Last 30 days' : 'Last 365 days'}
          </div>
        </div>
        <div className="flex gap-1 bg-neutral-800/50 p-1 rounded-lg">
          <button 
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              timeRange === 'daily' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20' 
                : 'hover:bg-white/5 text-neutral-400 hover:text-white'
            }`}
            onClick={() => handleTimeRangeChange('daily')}
          >
            1D
          </button>
          <button 
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              timeRange === 'weekly' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20' 
                : 'hover:bg-white/5 text-neutral-400 hover:text-white'
            }`}
            onClick={() => handleTimeRangeChange('weekly')}
          >
            1W
          </button>
          <button 
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              timeRange === 'monthly' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20' 
                : 'hover:bg-white/5 text-neutral-400 hover:text-white'
            }`}
            onClick={() => handleTimeRangeChange('monthly')}
          >
            1M
          </button>
          <button 
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              timeRange === 'yearly' 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20' 
                : 'hover:bg-white/5 text-neutral-400 hover:text-white'
            }`}
            onClick={() => handleTimeRangeChange('yearly')}
          >
            1Y
          </button>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-md rounded-xl border border-neutral-800/50 overflow-hidden">
        {loading && animationProgress === 0 ? (
          <div className="w-full h-64 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent"></div>
              <span className="text-neutral-400 text-sm mt-3">Loading chart data...</span>
            </div>
          </div>
        ) : (
          <div 
            className="w-full h-64 rounded-xl overflow-hidden relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={chartRef} className="w-full h-full"></div>
            
            {/* Hover tooltip */}
            {hoverInfo.visible && (
              <>
                {/* Vertical line */}
                <div 
                  className="absolute top-0 bottom-0 w-px bg-white/20 pointer-events-none"
                  style={{ left: `${hoverInfo.x}px` }}
                ></div>
                
                {/* Price point */}
                <div 
                  className="absolute w-3 h-3 rounded-full bg-white border-2 border-purple-500 shadow-lg shadow-purple-500/30 transform -translate-x-1.5 -translate-y-1.5 pointer-events-none"
                  style={{ left: `${hoverInfo.x}px`, top: `${hoverInfo.y}px` }}
                ></div>
                
                {/* Tooltip */}
                <div 
                  className="absolute bg-neutral-800/90 backdrop-blur-md border border-neutral-700 rounded-lg px-3 py-2 shadow-xl pointer-events-none"
                  style={{ 
                    left: `${Math.min(Math.max(hoverInfo.x, 70), chartRef.current?.clientWidth || 0 - 70)}px`,
                    top: `${Math.min(hoverInfo.y - 60, (chartRef.current?.clientHeight || 0) - 80)}px`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="text-white font-medium">${hoverInfo.price.toFixed(4)}</div>
                  <div className="text-neutral-400 text-xs">{hoverInfo.date}</div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-neutral-900/50 rounded-lg p-3 border border-neutral-800/30">
          <div className="text-xs text-neutral-500 mb-1">Open</div>
          <div className="text-white font-medium">
            ${priceData.length > 0 ? priceData[0].price.toFixed(4) : '0.0000'}
          </div>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-3 border border-neutral-800/30">
          <div className="text-xs text-neutral-500 mb-1">Close</div>
          <div className="text-white font-medium">
            ${priceData.length > 0 ? priceData[priceData.length - 1].price.toFixed(4) : '0.0000'}
          </div>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-3 border border-neutral-800/30">
          <div className="text-xs text-neutral-500 mb-1">High</div>
          <div className="text-white font-medium">
            ${priceData.length > 0 ? Math.max(...priceData.map(p => p.price)).toFixed(4) : '0.0000'}
          </div>
        </div>
        <div className="bg-neutral-900/50 rounded-lg p-3 border border-neutral-800/30">
          <div className="text-xs text-neutral-500 mb-1">Low</div>
          <div className="text-white font-medium">
            ${priceData.length > 0 ? Math.min(...priceData.map(p => p.price)).toFixed(4) : '0.0000'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceChart; 