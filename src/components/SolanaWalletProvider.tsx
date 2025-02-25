import { FC, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  CoinbaseWalletAdapter,
  CloverWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import the styles
import '@solana/wallet-adapter-react-ui/styles.css';

// Wrapper component to handle wallet disconnection on page load
const WalletConnectionManager: FC<{ children: ReactNode }> = ({ children }) => {
  const { disconnect } = useWallet();
  
  // Disconnect wallet on page load/reload
  useEffect(() => {
    // Disconnect the wallet when the component mounts (page loads)
    disconnect();
    
    // Also disconnect when the window is about to unload (page refresh/navigation)
    const handleBeforeUnload = () => {
      disconnect();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [disconnect]);
  
  return <>{children}</>;
};

interface SolanaWalletProviderProps {
  children: ReactNode;
}

export const SolanaWalletProvider: FC<SolanaWalletProviderProps> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint
  const endpoint = useMemo(() => {
    // Try multiple reliable RPC endpoints
    const endpoints = [
      "https://api.mainnet-beta.solana.com",
      "https://solana-mainnet.g.alchemy.com/v2/demo",
      "https://rpc.ankr.com/solana",
      "https://solana-api.projectserum.com"
    ];
    
    // Implement a simple fallback mechanism
    // In a production app, you might want to test these endpoints
    // and use the one with the best response time
    const savedEndpoint = localStorage.getItem('preferred-rpc-endpoint');
    
    // If we have a saved endpoint and it's in our list, use it
    if (savedEndpoint && endpoints.includes(savedEndpoint)) {
      return savedEndpoint;
    }
    
    // Otherwise use the first endpoint
    return endpoints[0];
  }, []);

  // Define onError callback
  const onError = useCallback(
    (error: Error) => {
      console.error('Wallet connection error:', error);
      
      // If we get a connection error, try switching to a different endpoint
      if (error.message.includes('failed to fetch') || error.message.includes('connection') || error.message.includes('403')) {
        const endpoints = [
          "https://api.mainnet-beta.solana.com",
          "https://solana-mainnet.g.alchemy.com/v2/demo",
          "https://rpc.ankr.com/solana",
          "https://solana-api.projectserum.com"
        ];
        
        const currentEndpoint = localStorage.getItem('preferred-rpc-endpoint') || endpoints[0];
        const currentIndex = endpoints.indexOf(currentEndpoint);
        const nextIndex = (currentIndex + 1) % endpoints.length;
        const nextEndpoint = endpoints[nextIndex];
        
        console.log(`Switching RPC endpoint to: ${nextEndpoint}`);
        localStorage.setItem('preferred-rpc-endpoint', nextEndpoint);
        
        // Force a page refresh to use the new endpoint
        // In a more sophisticated app, you might want to reconnect without refreshing
        window.location.reload();
      }
    },
    []
  );

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new CoinbaseWalletAdapter(),
      new LedgerWalletAdapter(),
      new CloverWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false} onError={onError}>
        <WalletModalProvider>
          <WalletConnectionManager>
            {children}
          </WalletConnectionManager>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaWalletProvider; 