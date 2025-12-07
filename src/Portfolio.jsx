// src/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, PieChart, Briefcase, Activity, Terminal,
    Users, UserPlus, BookOpen, Radio, CreditCard,
    Bell, Plus, Search, ArrowUpRight, ArrowDownRight, Wallet, Loader2
} from 'lucide-react';
import API_BASE_URL from './config';

const CryptoIcon = ({ src, alt }) => {
    return (
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain"
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png";
            }}
        />
    );
};


const PortfolioChart = () => (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1000 300" className="w-full h-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="portfolioGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00FF9D" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#00FF9D" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M0,250 C100,200 200,280 300,150 C400,50 500,200 600,180 C700,160 800,50 900,120 L1000,120"
                fill="none"
                stroke="#00FF9D"
                strokeWidth="3"
                strokeLinecap="round"
                className="drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]"
            />
            <path
                d="M0,250 C100,200 200,280 300,150 C400,50 500,200 600,180 C700,160 800,50 900,120 L1000,120 V300 H0 Z"
                fill="url(#portfolioGradient)"
                stroke="none"
            />
            <circle cx="1000" cy="120" r="6" fill="#00FF9D" className="animate-pulse shadow-[0_0_15px_#00FF9D]" />
        </svg>
    </div>
);

// 3. Single Asset Row
const AssetRow = ({ asset }) => {
    const isPositive = asset.change >= 0;
    const price = asset.price || 0;
    const value = (price * asset.balance).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <div className="grid grid-cols-12 gap-4 items-center p-4 bg-[#0A1014]/20 backdrop-blur-md border border-white/5 rounded-xl hover:border-[#00FF9D]/30 hover:bg-white/5 transition-all group">
            {/* Asset Name & Icon */}
            <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 p-1.5 flex items-center justify-center">
                    <CryptoIcon src={asset.icon} alt={asset.symbol} />
                </div>
                <div>
                    {/* Fallback to Symbol if Name is missing */}
                    <p className="font-bold text-white text-sm">{asset.name || asset.symbol}</p>
                    <p className="text-xs text-gray-500 md:hidden">{asset.symbol}</p>
                </div>
            </div>

            {/* Total Value */}
            <div className="col-span-3 text-sm font-medium text-gray-300">
                {value}
            </div>

            {/* Balance Count */}
            <div className="col-span-3 text-sm font-medium text-white">
                {asset.balance?.toFixed(4)} <span className="text-gray-500 text-xs">{asset.symbol}</span>
            </div>

            {/* 24h Change */}
            <div className={`col-span-2 text-sm font-bold flex justify-end ${isPositive ? 'text-[#00FF9D]' : 'text-[#FF4D4D]'}`}>
                {isPositive ? '+' : ''}{asset.change?.toFixed(2)}%
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

const Portfolio = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState({ name: "Trader", plan: "Pro Plan Active" });

    // State for API Data
    const [portfolioData, setPortfolioData] = useState({
        totalValue: 0,
        changePercent: 0,
        assets: []
    });

    // --- FETCH DATA ---
    const fetchPortfolio = async () => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/signin');

        try {
            // 1. Get User Info (for Sidebar)
            const userRes = await fetch(`${API_BASE_URL}/user/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser({ name: userData.user.full_name || "Trader", plan: "Pro Plan Active" });
            }

            // 2. Get Portfolio Data (Real Exchange Data)
            const res = await fetch(`${API_BASE_URL}/user/portfolio`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setPortfolioData(data);
            } else {
                console.error("Failed to fetch portfolio data");
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Auto-refresh every 10 minutes
    useEffect(() => {
        fetchPortfolio();
        const intervalId = setInterval(fetchPortfolio, 10 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, [navigate]);

    // --- FILTER ASSETS ---
    const filteredAssets = portfolioData.assets.filter(asset =>
        (asset.name && asset.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (asset.symbol && asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) return (
        <div className="min-h-screen bg-[#050B0D] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#00FF9D]" size={48} />
        </div>
    );

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">

            {/* Background Glows (Matching Dashboard) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00FF9D]/10 rounded-full blur-[150px] opacity-50 mix-blend-screen"></div>
                <div className="absolute bottom-[-30%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/10 rounded-full blur-[150px] opacity-50"></div>
            </div>

            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-[#050B0D]/80 backdrop-blur-md border-r border-white/5 flex flex-col justify-between py-6 z-20 hidden md:flex">
                <div className="px-6">
                    <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
                        <img src="/logo.png" alt="FydBlock" className="h-8 object-contain" />
                    </div>
                    <nav className="space-y-1">
                        {[
                            { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
                            { name: "My Portfolio", icon: PieChart, path: "/portfolio", active: true }, // Active
                            { name: "Bots", icon: Briefcase, path: "/dashboard" },
                            { name: "Backtest", icon: Wallet, path: "#" },
                            { name: "My Exchanges", icon: Terminal, path: "#" },
                            { name: "Terminal", icon: Activity, path: "#" },
                        ].map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group 
                                ${item.active
                                        ? 'bg-[#00FF9D] text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <item.icon size={18} className={item.active ? "text-black" : "group-hover:text-[#00FF9D] transition-colors"} />
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>
                {/* User Profile */}
                <div className="px-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0A1014]/50 border border-white/5 hover:border-[#00FF9D]/30 transition-all cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-gray-600 overflow-hidden relative">
                            <img src="/profile1.png" className="absolute inset-0 w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} alt="Profile" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{user.name}</p>
                            <p className="text-[10px] text-[#00FF9D]">{user.plan}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#00FF9D] drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]">My Portfolio</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014]/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:border-[#00FF9D] transition-colors relative">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-[#00FF9D] rounded-full shadow-[0_0_5px_#00FF9D]"></div>
                        </button>
                        <button onClick={() => navigate('/bot-builder')} className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                            <Plus size={18} strokeWidth={3} />
                            New Bot
                        </button>
                    </div>
                </header>

                {/* 1. ESTIMATED TOTAL VALUE CARD */}
                <section className="mb-12">
                    <div className="relative w-full h-[300px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group hover:border-[#00FF9D]/20 transition-all duration-500">
                        {/* Card Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1014] via-[#0F1C18] to-[#0A1014]"></div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black font-bold">$</div>
                                    <span className="text-gray-300 font-medium">Estimated total value</span>
                                    <ArrowUpRight size={16} className="text-[#00FF9D]" />
                                </div>
                                <div className="flex items-baseline gap-4">
                                    <h2 className="text-5xl font-bold text-white tracking-tight">
                                        ${portfolioData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </h2>
                                    <span className={`font-bold px-2 py-1 rounded text-sm ${portfolioData.changePercent >= 0 ? 'text-[#00FF9D] bg-[#00FF9D]/10' : 'text-red-500 bg-red-500/10'}`}>
                                        {portfolioData.changePercent >= 0 ? '+' : ''}{portfolioData.changePercent.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Chart Background */}
                        <PortfolioChart />
                    </div>
                </section>

                {/* 2. ASSETS SECTION */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-white">Assets</h3>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-[#0A1014]/50 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-[#00FF9D] focus:outline-none transition-all w-64 backdrop-blur-sm"
                            />
                        </div>
                    </div>

                    {/* Table Headers */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">
                        <div className="col-span-4">Symbol</div>
                        <div className="col-span-3">Value</div>
                        <div className="col-span-3">Count</div>
                        <div className="col-span-2 text-right">Change</div>
                    </div>

                    {/* Asset List */}
                    <div className="space-y-3">
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map((asset, i) => (
                                <AssetRow key={asset.id || i} asset={asset} />
                            ))
                        ) : (
                            <div className="text-center py-12 text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                                <Wallet size={48} className="mx-auto mb-4 opacity-50" />
                                <p>No assets found.</p>
                                <p className="text-xs mt-2">Connect an exchange with a positive balance.</p>
                            </div>
                        )}
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Portfolio;
