'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the SolanaWalletProvider to avoid SSR issues
const SolanaWalletProviderDynamic = dynamic(
  () => import('./SolanaWalletProvider'),
  { ssr: false }
);

interface ClientSolanaProviderProps {
  children: ReactNode;
}

export default function ClientSolanaProvider({ children }: ClientSolanaProviderProps) {
  return (
    <SolanaWalletProviderDynamic>
      {children}
    </SolanaWalletProviderDynamic>
  );
}