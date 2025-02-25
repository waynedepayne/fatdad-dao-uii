export default function NavbarHome() {
  return (
    <header
      id="header"
      className="fixed w-full bg-black/80 backdrop-blur-sm border-b border-neutral-800 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">FatDAD DAO</div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-400 hover:text-white cursor-pointer">
            <i className="fa-brands fa-twitter text-xl"></i>
          </span>
          <span className="text-neutral-400 hover:text-white cursor-pointer">
            <i className="fa-brands fa-discord text-xl"></i>
          </span>
          <span className="text-neutral-400 hover:text-white cursor-pointer">
            <i className="fa-brands fa-telegram text-xl"></i>
          </span>
          <button className="px-6 py-2 bg-white text-black rounded-lg hover:bg-neutral-200 transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
} 