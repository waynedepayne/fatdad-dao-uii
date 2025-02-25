import { FC, useCallback, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import styles from './StyledWalletButton.module.css';

interface StyledWalletButtonProps {
  className?: string;
}

export const StyledWalletButton: FC<StyledWalletButtonProps> = ({ className }) => {
  const { wallet, connect, connecting, connected, select, wallets } = useWallet();
  const [error, setError] = useState<Error | null>(null);
  
  const handleClick = useCallback(async (e: React.MouseEvent) => {
    if (connected) return; // If already connected, let the default dropdown behavior work
    
    try {
      setError(null);
      
      // If no wallet is selected but wallets are available, select the first one
      if (!wallet && wallets.length > 0) {
        // Try to find Phantom wallet first
        const phantomWallet = wallets.find(w => w.adapter.name.toLowerCase().includes('phantom'));
        if (phantomWallet) {
          select(phantomWallet.adapter.name);
        } else {
          // Otherwise select the first available wallet
          select(wallets[0].adapter.name);
        }
      }
      
      // If wallet is selected but not connected, try to connect
      if (wallet && !connected && !connecting) {
        await connect();
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      setError(error);
    }
  }, [wallet, wallets, select, connect, connecting, connected]);

  return (
    <div className={styles.walletButtonWrapper}>
      {error && (
        <div className="text-red-500 text-xs absolute -bottom-6 left-0 right-0 text-center">
          Connection failed. Please try again.
        </div>
      )}
      <WalletMultiButton 
        className={`${styles.walletButton} ${className}`} 
        onClick={handleClick}
      />
    </div>
  );
};

export default StyledWalletButton; 