'use client';

import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  className = '',
  ...props
}) => {
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
  
  // Width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${className}`;
  
  return (
    <button className={buttonClasses} {...props}>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button; 