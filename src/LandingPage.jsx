import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  BarChart2, Shield, Zap,
  Play, CheckCircle2, ArrowRight,
  Cpu, Activity, Lock, Layers,
  ChevronRight, ChevronDown
} from 'lucide-react';
import WorldGlobe from './WorldGlobe';

/* --- Exchange Data --- */
const EXCHANGES = [
  { name: 'BINANCE', logo: 'BINANCE.png' },
  { name: 'COINBASE', logo: 'COINBASE.png' },
  { name: 'KRAKEN', logo: 'KRAKEN.png' },
  { name: 'BYBIT', logo: 'BYBIT.png' },
  { name: 'OKX', logo: 'OKX.jpg' },
];

const MARQUEE_LOGOS = [...EXCHANGES, ...EXCHANGES, ...EXCHANGES, ...EXCHANGES];

/* =========================================
   HELPER COMPONENTS (Must be at the top)
   ========================================= */

const CountUp = ({ end, duration = 2000, suffix = '', prefix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{prefix}{count.toFixed(decimals)}{suffix}</>;
};

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
    <div className="text-4xl font-bold text-white mb-4 group-hover:text-[#00FF9D] transition-colors">{number}</div>
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

const AnimatedProfitCard = () => {
  const [progress, setProgress] = useState(0);
  const duration = 5000; // 5 seconds (Slow)
  const targetProfit = 12450;
  const targetWidth = 75; // Stops at 75% width

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const p = Math.min((timestamp - startTimestamp) / duration, 1);
      setProgress(p);
      if (p < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, []);

  return (
    <div className="absolute top-10 -left-4 md:-left-12 bg-[#0A1014]/90 backdrop-blur-xl border border-[#00FF9D]/20 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-float-delayed z-20">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D]">
          <Activity size={16} />
        </div>
        <div>
          <p className="text-xs text-gray-400">Total Profit</p>
          <p className="text-sm font-bold text-white">
            {/* The number grows based on progress */}
            ${(targetProfit * progress).toFixed(2)}
          </p>
        </div>
      </div>

      {/* The Bar grows based on the SAME progress */}
      <div className="h-1 w-32 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#00FF9D] shadow-[0_0_10px_#00FF9D]"
          style={{ width: `${targetWidth * progress}%` }}
        ></div>
      </div>
    </div>
  );
};
/* =========================================
   MAIN COMPONENT
   ========================================= */

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
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
            <p className="text-gray-400 text-light leading-relaxed max-w-lg">
              Automate your trading strategies with our advanced AI algorithms.
              Maximize profits, minimize risks, and trade 24/7 across all major exchanges without lifting a finger.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/pricing')}
                className="bg-[#00FF9D] text-black px-8 py-4 rounded-full font-bold hover:bg-[#00cc7d] transition-all hover:shadow-[0_0_30px_rgba(0,255,157,0.4)] hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Start For Free <ArrowRight size={20} />
              </button>
              <button className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                <Play size={18} fill="currentColor" /> Watch Demo
              </button>
            </div>

            {/* --- UPDATED: ANIMATED STATS SECTION --- */}
            <div style={{ fontFamily: "'Poppins', sans-serif" }}>
              {/* 1. Load the Font from Google */}
              <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');`}
              </style>
              <div className="flex items-center gap-8 pt-8 border-t border-white/5">
                <div>
                  <p className="text-3xl font-bold text-white shadow-[#00FF9D]">
                    <CountUp end={10} suffix="B+" duration={2000} />
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Volume Traded</p>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div>
                  <p className="text-3xl font-bold text-white">
                    <CountUp end={24} suffix="/7" duration={2000} />
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Uptime</p>
                </div>
                <div className="w-px h-10 bg-white/10"></div>
                <div>
                  <p className="text-3xl font-bold text-white">
                    <CountUp end={15} suffix="+" duration={2000} />
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Exchanges</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image with Animation */}
          <div className="relative z-10 lg:h-[600px] flex items-center justify-center">
            <div className="relative w-full max-w-[500px] animate-float">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00FF9D]/20 blur-[60px] rounded-full"></div>

              <img
                src="/hero.png"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                alt="AI Neural Network"
                className="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />

              {/* Floating Cards */}
              <AnimatedProfitCard />
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

      {/* --- Steps Section --- */}
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

      {/* --- Features Section --- */}
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
                {/* --- NEW LINE CHART SVG --- */}
                <div className="h-48 w-full bg-[#0A1014] rounded-lg border border-white/5 relative overflow-hidden group-hover:border-[#00FF9D]/30 transition-colors">

                  {/* Grid Lines (Optional background decoration) */}
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                    <div className="border-r border-white/5"></div>
                    <div className="border-r border-white/5"></div>
                    <div className="border-r border-white/5"></div>
                    <div className="border-r border-white/5"></div>
                  </div>
                  <div className="absolute inset-0 grid grid-rows-4">
                    <div className="border-b border-white/5"></div>
                    <div className="border-b border-white/5"></div>
                    <div className="border-b border-white/5"></div>
                  </div>

                  {/* The Chart */}
                  <svg
                    viewBox="0 0 400 200"
                    className="w-full h-full absolute bottom-0 left-0"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00FF9D" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00FF9D" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* The Area Fill (Under the line) */}
                    <path
                      d="M0,200 L0,150 L40,130 L80,160 L120,100 L160,120 L200,80 L240,90 L280,50 L320,70 L360,30 L400,10 L400,200 Z"
                      fill="url(#chartGradient)"
                    />

                    {/* The Stroke Line (The actual graph) */}
                    <path
                      d="M0,150 L40,130 L80,160 L120,100 L160,120 L200,80 L240,90 L280,50 L320,70 L360,30 L400,10"
                      fill="none"
                      stroke="#00FF9D"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]"
                    />

                    {/* Animated Dot at the end */}
                    <circle cx="400" cy="10" r="4" fill="#00FF9D" className="animate-pulse shadow-[0_0_10px_#00FF9D]" />
                  </svg>
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
      <section className="py-20 border-y border-white/5 bg-[#080C0F]/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-6 text-center mb-10">
          <h3 className="text-xl text-gray-400 font-medium">Connect All Your Exchanges In Seconds</h3>
        </div>

        <div className="overflow-hidden relative w-full mask-linear-gradient">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050B0D] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050B0D] to-transparent z-10"></div>

          <div className="flex gap-16 animate-marquee whitespace-nowrap px-6 transition-all duration-500 w-max">
            {MARQUEE_LOGOS.map((ex, i) => (
              <span key={i} className="text-2xl font-bold font-mono tracking-widest text-white/40 flex items-center gap-4 hover:text-[#00FF9D] hover:shadow-[0_0_10px_rgba(0,255,157,0.2)] transition-all cursor-default group">
                <img
                  src={`/logos/${ex.logo}`}
                  alt={ex.name}
                  className="w-14 h-14 object-contain transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="w-14 h-14 rounded bg-white/10 hidden"></span>
                {ex.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Security Section --- */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure By Design. Reliable. Transparent.</h2>
            <p className="text-gray-400">Your funds stay on your exchange. We only use API keys for trading.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-20 left-1/2 -translate-x-1/2 w-[80%] h-[150px] border-t-2 border-r-2 border-l-2 border-dashed border-[#00FF9D]/20 rounded-t-[50px] -z-10"></div> {/* Line Across the shield */}

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

      {/* Globe & Social Proof */}
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

            {/* JOIN BUTTON */}
            <button
              onClick={() => navigate('/signup')}
              className="mt-8 bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold hover:bg-[#00cc7d] transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,255,157,0.3)]"
            >
              Join Now
            </button>
          </div>

          <div className="bg-[#0A1014]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-sm shadow-2xl relative">
            {/* Ping Animation Dot */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00FF9D] rounded-full shadow-[0_0_10px_#00FF9D] animate-ping"></div>

            <div className="flex gap-4 items-center mb-4">
              {/* --- IMAGE ADDED HERE --- */}
              <img
                src="./profile1.png"   /* <--- Make sure to put your image file here */
                alt="Alex M."
                className="w-12 h-12 rounded-full object-cover border border-white/20"
                /* This keeps the gray circle if the image fails to load */
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              {/* Backup Gray Circle */}
              <div className="w-12 h-12 bg-gray-600 rounded-full hidden"></div>
              {/* ------------------------ */}

              <div>
                <p className="font-bold text-white">Alex M.</p>
                <p className="text-xs text-gray-400">Pro Trader, UK</p>
              </div>
              <div className="ml-auto text-[#00FF9D] drop-shadow-[0_0_5px_rgba(0,255,157,0.5)]">★★★★★</div>
            </div>

            <p className="text-gray-300 italic text-sm leading-relaxed">
              "I've tried 3Commas and Cryptohopper, but FydBlock's interface is by far the most intuitive. My DCA bots have been running for 3 months with consistent profits."
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 relative z-10">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-[#00FF9D]/10 to-blue-500/10 border border-[#00FF9D]/30 rounded-3xl p-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00FF9D]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10 text-white">Why Aren't You Trading Yet?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">Don't leave money on the table. Set up your first bot today and let the AI do the heavy lifting.</p>
            <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-[#00FF9D] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,157,0.5)] relative z-10"
              onClick={() => navigate('/pricing')}>
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
