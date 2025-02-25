'use client';

import { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the wallet components to avoid SSR issues
const StyledWalletButtonDynamic = dynamic(
  () => import('./StyledWalletButton'),
  { ssr: false }
);

interface ClientWalletButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export const ClientWalletButton: FC<ClientWalletButtonProps> = ({ 
  className = '',
  variant = 'primary',
  size = 'md'
}) => {
  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Base classes for all buttons
  const baseClasses = "font-medium rounded-lg transition-all duration-300 flex items-center justify-center";
  
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };
  
  // Variant classes
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 hover:shadow-purple-600/30",
    secondary: "bg-white/10 text-white backdrop-blur-md hover:bg-white/20 border border-white/10",
    outline: "bg-transparent text-white border-2 border-purple-500 hover:bg-purple-500/10",
    glass: "bg-white/5 backdrop-blur-xl text-white border border-white/10 hover:bg-white/10 shadow-lg"
  };
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  // Only render on client-side to avoid hydration issues
  if (!isMounted) {
    return null;
  }
  
  return <StyledWalletButtonDynamic className={buttonClasses} />;
};

export default ClientWalletButton; 