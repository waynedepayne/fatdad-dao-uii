import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import './globals.css'
import ClientSolanaProvider from '../components/ClientSolanaProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FatDAD DAO',
  description: 'Community-governed platform for decentralized decision making',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script 
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <ClientSolanaProvider>
          {children}
        </ClientSolanaProvider>
      </body>
    </html>
  )
}
