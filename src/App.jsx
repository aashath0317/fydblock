import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ChevronRight, ChevronDown,
  BarChart2, Shield, Zap, Globe,
  Play, CheckCircle2, ArrowRight,
  Cpu, Activity, Lock, Layers, Sparkles, Loader2
} from 'lucide-react';

/**
 * FydBlock Landing Page (App.jsx)
 * High-fidelity recreation of the provided design.
 */

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effects for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050B0D] text-white font-sans overflow-x-hidden selection:bg-[#00FF9D] selection:text-black relative">

      {/* --- Global Ambient Background Effects --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#00FF9D]/10 rounded-full blur-[150px]" />
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vh] bg-[#00FF9D]/5 rounded-full blur-[180px]" />
      </div>

      {/* --- Navigation --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
          ? 'bg-[#050B0D]/80 backdrop-blur-xl border-white/10 py-4 shadow-lg'
          : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="FydBlock Logo" className="h-8 md:h-10 object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-[#00FF9D] transition-colors hover:shadow-[0_0_10px_rgba(0,255,157,0.3)]">Features</a>
            <a href="#ai-demo" className="hover:text-[#00FF9D] transition-colors flex items-center gap-1"><Sparkles size={14} /> AI Demo</a>
            <a href="#bots" className="hover:text-[#00FF9D] transition-colors">Bots</a>
            <a href="#pricing" className="hover:text-[#00FF9D] transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-[#00FF9D] transition-colors">FAQ</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-white hover:text-[#00FF9D] font-medium transition-colors">Log In</button>
            <button className="bg-[#00FF9D] text-black px-6 py-2 rounded-full font-bold hover:bg-[#00cc7d] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]">
              Sign Up
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#050B0D]/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
            <a href="#features" className="text-lg text-gray-300" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#ai-demo" className="text-lg text-[#00FF9D] font-bold" onClick={() => setMobileMenuOpen(false)}>AI Demo ✨</a>
            <a href="#bots" className="text-lg text-gray-300" onClick={() => setMobileMenuOpen(false)}>Bots</a>
            <a href="#pricing" className="text-lg text-gray-300" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#faq" className="text-lg text-gray-300" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <div className="h-px bg-white/10 my-2"></div>
            <button className="text-left text-white font-medium">Log In</button>
            <button className="bg-[#00FF9D] text-black py-3 rounded-lg font-bold text-center">Sign Up</button>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden z-10">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00FF9D] text-xs font-bold uppercase tracking-wider backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,157,0.1)]">
              <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse shadow-[0_0_8px_#00FF9D]"></span>
              AI Powered Trading 2.0
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-2xl">
              Smarter Business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] via-[#00FF9D] to-[#00A3FF]">
                Powered by AI
              </span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
              Automate your trading strategies with our advanced AI algorithms.
              Maximize profits, minimize risks, and trade 24/7 across all major exchanges without lifting a finger.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-[#00FF9D] text-black px-8 py-4 rounded-full font-bold hover:bg-[#00cc7d] transition-all hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2">
                Start For Free <ArrowRight size={20} />
              </button>
              <button className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                <Play size={18} fill="currentColor" /> Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/5">
              <div>
                <p className="text-3xl font-bold text-white shadow-[#00FF9D]">10B+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Volume Traded</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-3xl font-bold text-white">24/7</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Uptime</p>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <p className="text-3xl font-bold text-white">15+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Exchanges</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-[500px] animate-float">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00FF9D]/20 blur-[60px] rounded-full"></div>

              <img
                src="/hero.png"
                alt="AI Neural Network"
                className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />

              <div className="absolute top-10 -left-4 md:-left-12 bg-[#0A1014]/90 backdrop-blur-xl border border-[#00FF9D]/20 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-float-delayed z-20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D]">
                    <Activity size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Profit</p>
                    <p className="text-sm font-bold text-white">+$12,450.00</p>
                  </div>
                </div>
                <div className="h-1 w-32 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-[70%] bg-[#00FF9D] shadow-[0_0_10px_#00FF9D]"></div>
                </div>
              </div>

              <div className="absolute bottom-10 -right-4 md:right-0 bg-[#0A1014]/90 backdrop-blur-xl border border-[#00FF9D]/20 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-float z-20">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Cpu size={20} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00FF9D] rounded-full border-2 border-[#0A1014] shadow-[0_0_5px_#00FF9D]"></div>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">DCA Bot #01</p>
                    <p className="text-xs text-[#00FF9D]">Running • 45 Trades</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- GEMINI AI INTEGRATION SECTION --- */}
      <GeminiStrategySection />

      {/* --- How It Works --- */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[#00FF9D] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_10px_rgba(0,255,157,0.1)]">
              Easy Start
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Get Started in 3 Steps</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Start your automated trading journey in minutes. No coding required.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Sign Up"
              description="Create your free account in less than 30 seconds."
              icon={<div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 ring-1 ring-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]"><Lock size={24} /></div>}
            />
            <StepCard
              number="02"
              title="Connect Exchange"
              description="Securely connect your favorite exchanges via API keys."
              icon={<div className="w-12 h-12 rounded-xl bg-[#00FF9D]/10 text-[#00FF9D] flex items-center justify-center mb-6 ring-1 ring-[#00FF9D]/30 shadow-[0_0_15px_rgba(0,255,157,0.2)]"><Zap size={24} /></div>}
            />
            <StepCard
              number="03"
              title="Start Trading"
              description="Select a bot or strategy and start profiting instantly."
              icon={<div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 ring-1 ring-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]"><BarChart2 size={24} /></div>}
            />
          </div>
        </div>
      </section>

      {/* --- One Platform Section --- */}
      <section className="py-24 relative overflow-hidden z-10" id="features">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00A3FF]/5 blur-[120px] rounded-full -z-10"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF9D] to-[#00A3FF] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-2xl bg-[#0A1014] border border-white/10 p-2 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF9D]/5 to-blue-500/5 rounded-2xl"></div>
              <div className="flex items-center justify-between p-4 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
                </div>
                <div className="text-xs text-gray-500">FydBlock Dashboard</div>
              </div>
              <div className="p-6 grid gap-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-gray-400 text-sm">Portfolio Balance</p>
                    <p className="text-3xl font-bold text-white mt-1">$42,593.00</p>
                  </div>
                  <div className="text-[#00FF9D] text-sm font-bold bg-[#00FF9D]/10 px-2 py-1 rounded shadow-[0_0_10px_rgba(0,255,157,0.1)]">+24.5%</div>
                </div>
                <div className="h-48 w-full bg-gradient-to-t from-[#00FF9D]/10 to-transparent rounded-lg border border-white/5 relative flex items-end px-2 pb-2 gap-2">
                  {[40, 60, 45, 70, 50, 80, 65, 85, 75, 95].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-[#00FF9D] opacity-60 rounded-t-sm hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(0,255,157,0.3)]"></div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-xs text-gray-400">Active Bots</p>
                    <p className="text-xl font-bold">12</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl backdrop-blur-sm">
                    <p className="text-xs text-gray-400">24h Profit</p>
                    <p className="text-xl font-bold text-[#00FF9D]">+$430</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[#00FF9D] text-xs font-bold uppercase tracking-wider mb-6">
              All-In-One
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">One Platform,<br />Many Trading Tools</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Why switch between apps? Get everything you need to trade successfully in one unified dashboard. Real-time analytics, multiple exchange support, and smart automation.
            </p>

            <ul className="space-y-4">
              <FeatureItem text="Smart Trade Terminal for Manual Trading" />
              <FeatureItem text="DCA, Grid, and Futures Bots" />
              <FeatureItem text="Trailing Stop-Loss & Take-Profit" />
              <FeatureItem text="Portfolio Tracking & Analytics" />
            </ul>

            <button className="mt-8 bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-colors shadow-[0_0_20px_rgba(0,255,157,0.3)]">
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* --- Bots Section --- */}
      <section className="py-24 relative z-10" id="bots">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FydBlock Bots For Everyone</h2>
            <p className="text-gray-400">Choose the perfect strategy for your risk level and goals.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <BotCard
              title="DCA Bot"
              desc="Dollar Cost Averaging strategy to buy low and sell high automatically over time. Best for accumulating assets."
              icon={<Layers className="text-[#00FF9D]" />}
            />
            <BotCard
              title="Grid Bot"
              desc="Profit from small price fluctuations in sideways markets. Buys when price drops, sells when it rises."
              icon={<div className="grid grid-cols-2 gap-1 w-5 h-5"><div className="bg-[#00FF9D] shadow-[0_0_5px_#00FF9D]"></div><div className="bg-[#00FF9D]/30"></div><div className="bg-[#00FF9D]/30"></div><div className="bg-[#00FF9D] shadow-[0_0_5px_#00FF9D]"></div></div>}
            />
            <BotCard
              title="Futures Bot"
              desc="Advanced bot for trading futures contracts with leverage. Includes long and short strategies."
              icon={<Activity className="text-[#00FF9D]" />}
            />
            <BotCard
              title="Signal Bot"
              desc="Execute trades automatically based on TradingView custom signals or technical indicators."
              icon={<Zap className="text-[#00FF9D]" />}
            />
          </div>
        </div>
      </section>

      {/* --- Exchanges Marquee --- */}
      <section className="py-12 border-y border-white/5 bg-[#080C0F]/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 text-center mb-8">
          <h3 className="text-xl text-gray-400 font-medium">Connect All Your Exchanges In Seconds</h3>
        </div>
        <div className="overflow-hidden relative w-full mask-linear-gradient">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050B0D] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050B0D] to-transparent z-10"></div>

          <div className="flex gap-16 animate-marquee whitespace-nowrap px-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock Logos */}
            {['BINANCE', 'COINBASE', 'KRAKEN', 'KUCOIN', 'OKX', 'BYBIT', 'BITFINEX', 'HUOBI'].map((name, i) => (
              <span key={i} className="text-2xl font-bold font-mono tracking-widest text-white/40 flex items-center gap-2 hover:text-[#00FF9D] hover:shadow-[0_0_10px_rgba(0,255,157,0.2)] transition-all cursor-default">
                <span className="w-8 h-8 rounded bg-white/10"></span> {name}
              </span>
            ))}
            {/* Duplicate for infinite loop illusion */}
            {['BINANCE', 'COINBASE', 'KRAKEN', 'KUCOIN', 'OKX', 'BYBIT', 'BITFINEX', 'HUOBI'].map((name, i) => (
              <span key={`dup-${i}`} className="text-2xl font-bold font-mono tracking-widest text-white/40 flex items-center gap-2 hover:text-[#00FF9D] hover:shadow-[0_0_10px_rgba(0,255,157,0.2)] transition-all cursor-default">
                <span className="w-8 h-8 rounded bg-white/10"></span> {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Security Tree Section --- */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure By Design. Reliable. Transparent.</h2>
            <p className="text-gray-400">Your funds stay on your exchange. We only use API keys for trading.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150px] border-t-2 border-r-2 border-l-2 border-dashed border-[#00FF9D]/20 rounded-t-[50px] -z-10"></div>

            <div className="grid md:grid-cols-3 gap-8 text-center pt-8">
              <SecurityCard
                title="Encrypted Keys"
                desc="API keys are encrypted and stored in secure containers using RSA 2048-bit encryption."
                icon={<Lock size={32} />}
              />
              <div className="relative -mt-12 md:mt-0">
                <div className="w-24 h-24 mx-auto bg-[#00FF9D]/10 rounded-full flex items-center justify-center border border-[#00FF9D] shadow-[0_0_40px_rgba(0,255,157,0.4)] mb-6 z-10 relative backdrop-blur-md">
                  <Shield size={40} className="text-[#00FF9D]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
                <p className="text-sm text-gray-400">Regular security audits and bounty programs.</p>
              </div>
              <SecurityCard
                title="No Withdrawal Rights"
                desc="Our system only requests 'Trade' permission. We can never withdraw your funds."
                icon={<CheckCircle2 size={32} />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="py-24 relative z-10" id="faq">
        <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">FydBlock <br />Frequently Asked Questions</h2>
            <p className="text-gray-400 mb-8">Can't find the answer you're looking for? Reach out to our customer support team.</p>
            <button className="text-[#00FF9D] font-bold flex items-center gap-2 hover:gap-4 transition-all hover:text-white">
              Contact Support <ArrowRight size={20} />
            </button>
          </div>
          <div className="lg:col-span-8 space-y-4">
            <AccordionItem question="Is my money safe with FydBlock?" answer="Absolutely. Your funds always remain on your exchange account (like Binance or Coinbase). FydBlock simply sends trade commands via API keys which you configure to disable withdrawal permissions." />
            <AccordionItem question="Do I need coding skills to use the bots?" answer="No! FydBlock is designed for everyone. We offer pre-configured templates and a visual strategy builder. You can start a bot in 3 clicks." />
            <AccordionItem question="Which exchanges do you support?" answer="We support over 15 major exchanges including Binance, Kraken, Coinbase Pro, KuCoin, OKX, Bybit, and more." />
            <AccordionItem question="Can I try it for free?" answer="Yes, we offer a 7-day free trial on our Pro plan so you can test all features risk-free. No credit card required." />
          </div>
        </div>
      </section>

      {/* --- World Globe & Social Proof --- */}
      <section className="py-32 relative overflow-hidden z-10 min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <WorldGlobe />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,_#050B0D_90%)] pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              Used by 10,000+ <br />
              Traders around the World
            </h2>
            <p className="text-gray-300 font-medium text-lg drop-shadow-md">Join a global community of smart investors trading from over 150 countries.</p>

            <div className="flex -space-x-4 mt-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full bg-[#0A1014] border-2 border-[#050B0D] flex items-center justify-center text-xs font-bold text-gray-400 hover:text-white hover:border-[#00FF9D] transition-colors cursor-default">
                  U{i}
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-[#00FF9D] border-2 border-[#050B0D] flex items-center justify-center text-black font-bold text-xs shadow-[0_0_15px_rgba(0,255,157,0.4)]">
                +10k
              </div>
            </div>
          </div>

          <div className="bg-[#0A1014]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-sm shadow-2xl relative">
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00FF9D] rounded-full shadow-[0_0_10px_#00FF9D] animate-ping"></div>
            <div className="flex gap-4 items-center mb-4">
              <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
              <div>
                <p className="font-bold">Alex M.</p>
                <p className="text-xs text-gray-400">Pro Trader, UK</p>
              </div>
              <div className="ml-auto text-[#00FF9D] drop-shadow-[0_0_5px_rgba(0,255,157,0.5)]">★★★★★</div>
            </div>
            <p className="text-gray-300 italic">"I've tried 3Commas and Cryptohopper, but FydBlock's interface is by far the most intuitive. My DCA bots have been running for 3 months with consistent profits."</p>
          </div>
        </div>
      </section>

      {/* --- Footer CTA --- */}
      <section className="py-12 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-[#00FF9D]/10 to-blue-500/10 border border-[#00FF9D]/30 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FF9D]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-1000"></div>

            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10 text-white">Why Aren't You Trading Yet?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">Don't leave money on the table. Set up your first bot today and let the AI do the heavy lifting.</p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-[#00FF9D] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,157,0.5)] relative z-10">
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-12 border-t border-white/5 bg-[#030607]/80 backdrop-blur-sm text-sm text-gray-400 relative z-10">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.png" alt="Logo" className="h-6" />
              <span className="text-white font-bold text-lg">FydBlock</span>
            </div>
            <p className="mb-4">Automated crypto trading for everyone.</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-[#00FF9D] hover:text-black transition-colors cursor-pointer hover:shadow-[0_0_10px_#00FF9D]">X</div>
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-[#00FF9D] hover:text-black transition-colors cursor-pointer hover:shadow-[0_0_10px_#00FF9D]">in</div>
              <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center hover:bg-[#00FF9D] hover:text-black transition-colors cursor-pointer hover:shadow-[0_0_10px_#00FF9D]">fb</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#00FF9D] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#00FF9D] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#00FF9D] transition-colors">Supported Exchanges</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#00FF9D] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#00FF9D] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#00FF9D] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#00FF9D] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#00FF9D] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 text-center pt-8 border-t border-white/5">
          <p>&copy; 2024 FydBlock. All rights reserved.</p>
        </div>
      </footer>

      {/* CSS for custom animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

/* --- Sub Components --- */

const WorldGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let rotation = 0;

    // Configuration
    const DOT_COUNT = 300;
    const DOT_SIZE = 2;

    // Resize handler
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Generate random points on UNIT sphere (radius 1)
    const points = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
      const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

      points.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi)
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Dynamic Radius: 35% of the smallest screen dimension to ensure it fits
      const globeRadius = Math.min(canvas.width, canvas.height) * 0.35;
      const connectionDist = globeRadius * 0.25; // Dynamic connection distance

      rotation += 0.003;

      // Rotate and project points
      const projectedPoints = points.map(p => {
        // Scale unit sphere to globe radius
        const pX = p.x * globeRadius;
        const pY = p.y * globeRadius;
        const pZ = p.z * globeRadius;

        // Rotate around Y axis
        const x = pX * Math.cos(rotation) - pZ * Math.sin(rotation);
        const z = pX * Math.sin(rotation) + pZ * Math.cos(rotation);
        const y = pY;

        // Perspective scale
        const scale = 800 / (800 - z);
        const alpha = (z + globeRadius) / (2 * globeRadius); // Fade back points

        return {
          x: x * scale + centerX,
          y: y * scale + centerY,
          z: z,
          alpha: Math.max(0.1, alpha)
        };
      });

      // Draw connections
      ctx.strokeStyle = '#00FF9D';
      projectedPoints.forEach((p1, i) => {
        if (p1.z < -100) return; // Don't draw connections on back side too much

        // Find close points to connect
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          if (p2.z < -100) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.globalAlpha = (1 - dist / connectionDist) * 0.3 * p1.alpha;
            ctx.stroke();
          }
        }
      });

      // Draw points
      projectedPoints.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, DOT_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = '#00FF9D';
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Add glow to front points
        if (p.z > 100) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00FF9D';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full opacity-60" />;
};

const GeminiStrategySection = () => {
  const [asset, setAsset] = useState('BTC');
  const [risk, setRisk] = useState('Moderate');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateStrategy = async () => {
    if (!asset) return;
    setLoading(true);
    setError('');
    setOutput('');

    // Use empty string to avoid import.meta issues in some environments.
    // User can uncomment the line below to use .env key locally.
    // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const apiKey = VITE_GEMINI_API_KEY;

    if (!apiKey) {
      setError("API Key missing. Please check your .env file or add key in App.jsx");
      setLoading(false);
      return;
    }

    const prompt = `Act as an expert crypto trading bot architect using FydBlock. The user wants to trade ${asset} with ${risk} risk. Suggest a specific trading strategy configuration (e.g., DCA step scale, take profit percentage, safety order volume, grid lines) for a bot. Keep it concise, professional, and actionable (under 100 words). Use bullet points for key parameters.`;

    try {
      // Exponential Backoff Retry Logic
      const fetchWithRetry = async (retries = 3, delay = 1000) => {
        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
              })
            }
          );
          if (!response.ok) throw new Error(response.statusText);
          return response.json();
        } catch (err) {
          if (retries > 0) {
            await new Promise(r => setTimeout(r, delay));
            return fetchWithRetry(retries - 1, delay * 2);
          }
          throw err;
        }
      };

      const result = await fetchWithRetry();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "Could not generate strategy.";
      setOutput(text);
    } catch (err) {
      console.error(err);
      setError("AI Service currently unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden z-10" id="ai-demo">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
            <Sparkles size={12} className="text-purple-400" />
            Gemini AI Integration
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Architect Your Strategy <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00FF9D]">Powered by Gemini</span></h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Not sure where to start? Tell our AI what you want to trade and your risk tolerance, and it will build a custom bot configuration for you instantly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative group">
          {/* Removed background, border, and glow effect div */}

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Asset to Trade</label>
              <input
                type="text"
                value={asset}
                onChange={(e) => setAsset(e.target.value.toUpperCase())}
                className="w-full bg-[#0A1014] border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF9D] focus:outline-none transition-colors font-mono focus:shadow-[0_0_10px_rgba(0,255,157,0.1)]"
                placeholder="e.g. BTC"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase font-bold mb-2">Risk Level</label>
              <select
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className="w-full bg-[#0A1014] border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF9D] focus:outline-none transition-colors appearance-none cursor-pointer focus:shadow-[0_0_10px_rgba(0,255,157,0.1)]"
              >
                <option value="Conservative">Conservative (Low Risk)</option>
                <option value="Moderate">Moderate (Balanced)</option>
                <option value="Aggressive">Aggressive (High Yield)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={generateStrategy}
                disabled={loading || !asset}
                className="w-full bg-[#00FF9D] hover:bg-[#00cc7d] disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,255,157,0.3)]"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <><Sparkles size={18} /> Generate Strategy ✨</>}
              </button>
            </div>
          </div>

          <div className="p-6 min-h-[160px] relative">
            <h3 className="text-xs text-gray-500 uppercase font-bold mb-3 flex items-center gap-2">
              AI Output Console
              <div className="h-px bg-white/10 flex-grow"></div>
            </h3>

            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                <Loader2 size={32} className="animate-spin text-[#00FF9D] mb-2" />
                <p className="text-xs animate-pulse">Analyzing market data & building strategy...</p>
              </div>
            ) : error ? (
              <p className="text-red-400 text-sm text-center">{error}</p>
            ) : output ? (
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="whitespace-pre-wrap font-mono text-gray-300 leading-relaxed">{output}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-600 py-8">
                <Cpu size={32} className="mb-2 opacity-20" />
                <p className="text-sm">Ready to generate. Enter details above.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureItem = ({ text }) => (
  <li className="flex items-center gap-3">
    <div className="w-5 h-5 rounded-full bg-[#00FF9D] flex items-center justify-center shadow-[0_0_5px_#00FF9D]">
      <CheckCircle2 size={12} className="text-black" />
    </div>
    <span className="text-gray-300">{text}</span>
  </li>
);

const StepCard = ({ number, title, description, icon }) => (
  <div className="bg-[#0A1014]/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-[#00FF9D]/30 transition-all hover:-translate-y-2 group hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
    {icon}
    <div className="text-4xl font-bold text-white/5 mb-4 group-hover:text-[#00FF9D]/10 transition-colors">{number}</div>
    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#00FF9D] transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    <div className="mt-6 flex items-center text-[#00FF9D] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
      Learn More <ChevronRight size={16} />
    </div>
  </div>
);

const BotCard = ({ title, desc, icon }) => (
  <div className="bg-[#080C0F] p-6 rounded-2xl border border-white/5 flex gap-4 hover:bg-white/5 transition-all cursor-pointer group hover:border-[#00FF9D]/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]">
    <div className="w-12 h-12 rounded-full bg-[#00FF9D]/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(0,255,157,0.1)] group-hover:shadow-[0_0_15px_rgba(0,255,157,0.3)]">
      {icon}
    </div>
    <div>
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg mb-1 group-hover:text-[#00FF9D] transition-colors">{title}</h3>
        <div className="w-2 h-2 rounded-full bg-[#00FF9D] mt-2 shadow-[0_0_5px_#00FF9D] opacity-50 group-hover:opacity-100"></div>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const SecurityCard = ({ title, desc, icon }) => (
  <div className="bg-[#0A1014]/80 backdrop-blur-sm p-6 rounded-2xl border border-white/5 relative z-10 hover:border-[#00FF9D]/30 transition-all hover:-translate-y-1">
    <div className="w-16 h-16 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center text-gray-400 mb-4 group-hover:text-[#00FF9D] transition-colors">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{desc}</p>
  </div>
);

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5">
      <button
        className="w-full py-6 flex items-center justify-between text-left hover:text-[#00FF9D] transition-colors group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg text-gray-200 group-hover:text-[#00FF9D]">{question}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00FF9D]' : 'text-gray-500'}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

export default App;
