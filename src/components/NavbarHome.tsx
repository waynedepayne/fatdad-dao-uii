import { useState, useEffect } from 'react';
import StyledWalletButton from './StyledWalletButton';

export default function NavbarHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="header"
      className={`fixed w-full backdrop-blur-sm border-b z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 border-neutral-800' : 'bg-black/70 border-neutral-800/50'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">FatDAD DAO</div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors">
            <i className="fa-brands fa-twitter text-xl"></i>
          </span>
          <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors">
            <i className="fa-brands fa-discord text-xl"></i>
          </span>
          <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors">
            <i className="fa-brands fa-telegram text-xl"></i>
          </span>
          <StyledWalletButton className="px-6 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors" />
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-3 flex flex-col gap-4 bg-neutral-900/90 backdrop-blur-sm">
          <div className="flex justify-center gap-8 py-3">
            <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors">
              <i className="fa-brands fa-twitter text-xl"></i>
            </span>
            <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors">
              <i className="fa-brands fa-discord text-xl"></i>
            </span>
            <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors">
              <i className="fa-brands fa-telegram text-xl"></i>
            </span>
          </div>
          <div className="flex justify-center pb-2">
            <StyledWalletButton className="w-full px-6 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
} 