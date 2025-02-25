import Head from "next/head";
import NavbarHome from "../components/NavbarHome";
import "@/styles/landing.css";
import Script from "next/script";
import Link from 'next/link';
import ClientWalletButton from '../components/ClientWalletButton';
import Button from '../components/Button';
import PriceChart from '../components/PriceChart';
import tokenConfig from '../config/tokenConfig';
import { TokenInfoSection } from '../components/TokenInfoSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>FatDAD DAO</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* External Scripts */}
      <Script src="https://cdn.jsdelivr.net/npm/apexcharts" />
      <Script src="https://cdn.tailwindcss.com" />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <div className="h-full text-base-content">
        <div id="root" className="min-h-screen bg-neutral-950">
          <header id="header" className="fixed w-full bg-black/70 backdrop-blur-md border-b border-neutral-800/50 z-50 transition-all duration-300">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
              <div className="text-2xl font-bold text-white flex items-center">
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">FatDAD DAO</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors duration-300">
                  <i className="fa-brands fa-twitter text-xl"></i>
                </span>
                <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors duration-300">
                  <i className="fa-brands fa-discord text-xl"></i>
                </span>
                <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors duration-300">
                  <i className="fa-brands fa-telegram text-xl"></i>
                </span>
                <div className="wallet-adapter-button-container">
                  <ClientWalletButton variant="glass" size="sm" />
                </div>
              </div>
            </div>
          </header>

          <main id="main" className="pt-20">
            <section id="hero" className="min-h-[700px] flex items-center justify-center text-center bg-gradient-to-b from-black to-neutral-950 border-b border-neutral-800/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
              
              <div className="max-w-6xl mx-auto px-4 relative z-10">
                <span className="px-4 py-1 bg-white/10 rounded-full text-sm text-purple-300 font-medium mb-6 inline-block backdrop-blur-sm">Community-Powered Governance</span>
                <h1 className="text-6xl font-bold text-white mb-6 leading-tight">Welcome to the <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">FatDAD DAO</span></h1>
                <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">Empowering Our Community | Shaping Our Future | Building Together</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="wallet-adapter-button-container">
                    <ClientWalletButton variant="primary" size="lg" />
                  </div>
                  <Link href="/admin/dashboard">
                    <Button 
                      variant="secondary" 
                      size="lg" 
                      icon={<i className="fa-solid fa-tachometer-alt"></i>}
                    >
                      Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Token Information Section */}
            <TokenInfoSection />

            <section id="about" className="py-24 bg-neutral-950">
              <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-16">
                  <div className="md:w-1/2">
                    <span className="text-purple-500 font-medium mb-2 block">About Us</span>
                    <h2 className="text-4xl font-bold text-white mb-8">What Is <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">FatDAD DAO</span>?</h2>
                    <p className="text-neutral-300 text-lg leading-relaxed">
                      FatDAD DAO is our community-governed platform where every $FatDAD holder can influence the direction of our project. 
                      Through decentralized proposals, voting, and treasury management, our DAO ensures that decisions are made 
                      collectively—with transparency, fairness, and long-term growth in mind.
                    </p>
                    <div className="mt-8 flex gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                          <i className="fa-solid fa-users"></i>
                        </div>
                        <span className="text-white">5K+ Members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                          <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <span className="text-white">$2M+ TVL</span>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl aspect-video flex items-center justify-center p-1 border border-white/10 shadow-xl shadow-purple-500/5 overflow-hidden group">
                      <div className="bg-neutral-900 rounded-xl w-full h-full flex items-center justify-center relative overflow-hidden">
                        <span className="text-neutral-400 absolute group-hover:scale-110 transition-transform duration-500">
                          <i className="fa-regular fa-image text-6xl"></i>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="features" className="py-24 bg-black">
              <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                  <span className="text-purple-500 font-medium mb-2 block">Our Offerings</span>
                  <h2 className="text-4xl font-bold text-white mb-4">Key Features</h2>
                  <p className="text-neutral-400 max-w-2xl mx-auto">Discover the powerful tools and benefits that make our DAO stand out from the crowd.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl border border-neutral-800/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group">
                    <div className="w-14 h-14 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-500/30 transition-all duration-300">
                      <i className="fa-solid fa-users-gear text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Decentralized Governance</h3>
                    <p className="text-neutral-400">
                      Every proposal, from new merchandise launches to strategic partnerships, is voted on by the community. Your voice matters!
                    </p>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl border border-neutral-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group">
                    <div className="w-14 h-14 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500/30 transition-all duration-300">
                      <i className="fa-solid fa-coins text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Staking & Rewards</h3>
                    <p className="text-neutral-400">
                      Stake your $FatDAD tokens to earn DAO governance tokens. Plus, early supporters who meet the OG criteria enjoy enhanced voting power.
                    </p>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl border border-neutral-800/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group">
                    <div className="w-14 h-14 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:bg-purple-500/30 transition-all duration-300">
                      <i className="fa-solid fa-certificate text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">OG NFT Advantage</h3>
                    <p className="text-neutral-400">
                      Hold 1 SOL worth of $FatDAD continuously for 30 days in a single wallet to qualify for exclusive OG FatDAD NFTs. 
                      These not only serve as a badge of honor but also boost your influence in the DAO.
                    </p>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-xl border border-neutral-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group">
                    <div className="w-14 h-14 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500/30 transition-all duration-300">
                      <i className="fa-solid fa-vault text-2xl"></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Transparent Treasury</h3>
                    <p className="text-neutral-400">
                      Our DAO manages funds from ecosystem revenues—ensuring community-approved reinvestment, dividend distribution, 
                      and funding for new projects.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="cta" className="py-24 bg-gradient-to-b from-neutral-950 to-black text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
              
              <div className="max-w-6xl mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
                  <p className="text-neutral-400 mb-10 text-lg">
                    Explore our governance dashboard, check out ongoing proposals, or dive into community discussions.
                  </p>
                  <div className="p-8 bg-gradient-to-br from-neutral-900/50 to-neutral-950/50 backdrop-blur-md rounded-2xl border border-white/10 mb-10">
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                      <div className="wallet-adapter-button-container">
                        <ClientWalletButton variant="primary" size="lg" />
                      </div>
                      <Button 
                        variant="glass" 
                        size="lg" 
                        icon={<i className="fa-solid fa-file-lines"></i>}
                      >
                        View Documentation
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">5K+</div>
                      <div className="text-neutral-500">Community Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">120+</div>
                      <div className="text-neutral-500">Proposals Passed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">$2M+</div>
                      <div className="text-neutral-500">Treasury Value</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer id="footer" className="bg-black border-t border-neutral-800/50 py-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div>
                  <div className="text-2xl font-bold text-white mb-4">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">FatDAD DAO</span>
                  </div>
                  <p className="text-neutral-500 mb-4">Community-governed platform for decentralized decision making.</p>
                  <div className="flex space-x-4">
                    <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors duration-300">
                      <i className="fa-brands fa-twitter text-lg"></i>
                    </span>
                    <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors duration-300">
                      <i className="fa-brands fa-discord text-lg"></i>
                    </span>
                    <span className="text-neutral-400 hover:text-white cursor-pointer transition-colors duration-300">
                      <i className="fa-brands fa-telegram text-lg"></i>
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-4">Resources</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Documentation</a></li>
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Whitepaper</a></li>
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Governance</a></li>
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-4">Community</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Forum</a></li>
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Discord</a></li>
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Twitter</a></li>
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Telegram</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Terms of Service</a></li>
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                    <li><a href="#" className="text-neutral-500 hover:text-white transition-colors duration-300">Cookie Policy</a></li>
                    <li>
                      <Link 
                        href="/admin/dashboard" 
                        className="text-neutral-500 hover:text-white transition-colors duration-300"
                      >
                        Admin Login <i className="fa-solid fa-lock ml-2"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-neutral-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-neutral-500 mb-4 md:mb-0">&copy; 2025 FatDAD DAO. All rights reserved.</div>
                <div className="text-neutral-500">Built with ❤️ by the FatDAD community</div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
