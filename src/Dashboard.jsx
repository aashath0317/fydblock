// src/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, PieChart, Briefcase, Activity, Terminal,
    Users, UserPlus, BookOpen, Radio, CreditCard,
    Bell, Plus, ChevronUp, Wallet, Loader2
} from 'lucide-react';
import API_BASE_URL from './config';

// --- HELPER: CONNECT API OVERLAY ---
// This button appears on top of cards when no API is connected
const ConnectApiOverlay = ({ navigate, title = "Connect" }) => (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050B0D]/80 backdrop-blur-sm transition-all duration-500 rounded-2xl border border-white/5">
        <div className="text-center animate-in fade-in zoom-in duration-300">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    navigate('/bot-builder?step=2');
                }}
                className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2 px-6 rounded-full text-xs shadow-[0_0_15px_rgba(0,255,157,0.4)] transition-all flex items-center gap-2 mx-auto"
            >
                <Plus size={14} strokeWidth={3} />
                {title}
            </button>
        </div>
    </div>
);

// --- VISUAL ASSETS (SVG CHARTS) ---

const Sparkline = ({ color = "#00FF9D", isConnected }) => {
    // FIX 1: If not connected, return NULL (Don't render the green line)
    if (!isConnected) return <div className="h-12 w-full mt-2"></div>;

    return (
        <div className="relative h-12 w-full overflow-hidden opacity-80 mt-2">
            <div className="absolute right-0 top-[40%] w-2 h-2 rounded-full bg-[#00FF9D] shadow-[0_0_10px_#00FF9D] z-10 animate-pulse"></div>
            <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="sparkGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d="M0,30 L10,20 L20,35 L30,15 L40,25 L50,10 L60,30 L70,20 L80,5 L90,25 L100,20"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_5px_rgba(0,255,157,0.5)]"
                />
                <path
                    d="M0,30 L10,20 L20,35 L30,15 L40,25 L50,10 L60,30 L70,20 L80,5 L90,25 L100,20 V40 H0 Z"
                    fill="url(#sparkGradient)"
                    stroke="none"
                />
            </svg>
        </div>
    );
};

const PerformanceChart = ({ isConnected }) => (
    <div className="w-full h-72 relative flex flex-col">
        <div className="flex-1 relative flex">
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between text-[10px] text-gray-500 font-medium h-full pr-4 pb-2 w-12 text-right">
                <span>50k</span>
                <span>40k</span>
                <span>30k</span>
                <span>20k</span>
                <span>10k</span>
            </div>

            {/* Chart Area */}
            <div className="flex-1 relative border-l border-white/5">
                {/* Horizontal Grid Lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="absolute w-full border-t border-white/5" style={{ top: `${i * 25}%` }}></div>
                ))}

                {/* FIX 2: Only render if connected. 
                    FIX 3: Added preserveAspectRatio="none" to force full width stretch */}
                {isConnected && (
                    <svg viewBox="0 0 800 300" className="w-full h-full overflow-visible absolute inset-0" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="mainChartGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#00FF9D" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#00FF9D" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,150 L50,100 L80,120 L120,80 L160,110 L200,90 L250,160 L300,140 L350,80 L400,120 L450,100 L500,150 L550,130 L600,180 L650,160 L700,200 L750,150 L800,120"
                            fill="none"
                            stroke="#00FF9D"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-[0_0_8px_rgba(0,255,157,0.5)]"
                        />
                        <path
                            d="M0,150 L50,100 L80,120 L120,80 L160,110 L200,90 L250,160 L300,140 L350,80 L400,120 L450,100 L500,150 L550,130 L600,180 L650,160 L700,200 L750,150 L800,120 V300 H0 Z"
                            fill="url(#mainChartGradient)"
                            stroke="none"
                        />
                    </svg>
                )}
            </div>
        </div>

        {/* X-Axis Labels (Dates) */}
        <div className="flex justify-between text-[10px] text-gray-500 mt-2 pl-12 pt-2 border-t border-white/5">
            <span>Nov 10</span>
            <span>Nov 11</span>
            <span>Nov 12</span>
            <span>Nov 13</span>
            <span>Nov 14</span>
            <span>Nov 15</span>
            <span>Nov 16</span>
        </div>
    </div>
);

// --- CARD COMPONENTS ---

const StatCard = ({ title, value, percentage, icon, isConnected, navigate }) => {
    const displayValue = isConnected ? value : "$0.00";
    const displayPercent = isConnected ? percentage : "0.00%";

    return (
        <div className="bg-[#0A1014]/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-[#00FF9D]/20 transition-all h-40 flex flex-col justify-between">
            {/* Overlay for Top Cards */}
            {!isConnected && <ConnectApiOverlay navigate={navigate} title="Connect API" />}

            <div>
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/5">
                            {icon}
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
                    </div>
                    {isConnected && <ChevronUp size={16} className="text-[#00FF9D]" />}
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white tracking-tight">{displayValue}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isConnected ? 'text-[#00FF9D] bg-[#00FF9D]/10' : 'text-gray-600 bg-white/5'}`}>
                        {displayPercent}
                    </span>
                </div>
            </div>

            <Sparkline isConnected={isConnected} />
        </div>
    );
};

const BotCard = ({ bot, isConnected, navigate }) => {
    const displayProfit = isConnected ? `$0.00` : "----";
    const displayPercent = isConnected ? "0.00%" : "--";

    return (
        <div className="bg-[#0A1014]/40 backdrop-blur-md rounded-2xl p-5 border border-white/5 min-w-[260px] relative overflow-hidden group hover:border-[#00FF9D]/30 transition-all">
            {/* Overlay for Bots */}
            {!isConnected && <ConnectApiOverlay navigate={navigate} title="Connect" />}

            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-[10px] font-bold">
                            {bot.quote_currency ? bot.quote_currency.charAt(0) : '$'}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm">{bot.quote_currency || 'Unknown'} Pair</h4>
                        <span className="text-[10px] text-[#00FF9D] uppercase tracking-wider">{bot.bot_type}</span>
                    </div>
                </div>
                {isConnected && <ChevronUp size={14} className="text-[#00FF9D]" />}
            </div>

            <div className="flex justify-between items-end">
                <div>
                    <p className="text-2xl font-bold text-white mb-1">{displayProfit}</p>
                    <p className={`text-xs font-bold ${isConnected ? 'text-[#00FF9D]' : 'text-gray-500'}`}>
                        {displayPercent}
                    </p>
                </div>
                <div className="w-24 h-10 opacity-70">
                    {isConnected ? (
                        <svg viewBox="0 0 50 20" className="w-full h-full">
                            <path d="M0,20 L10,5 L20,15 L30,5 L40,10 L50,0" fill="none" stroke="#00FF9D" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="50" cy="0" r="2" fill="#00FF9D" className="shadow-[0_0_5px_#00FF9D]" />
                        </svg>
                    ) : (
                        <div className="h-[2px] w-full bg-white/5 mt-4 border-t border-dashed border-gray-700"></div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- MAIN DASHBOARD COMPONENT ---

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [hasExchange, setHasExchange] = useState(false);
    const [user, setUser] = useState({ name: "Trader", plan: "Pro Plan Active" });

    // Default Empty State
    const [statsData, setStatsData] = useState({
        daily: { value: "$0.00", percentage: "0.00%" },
        monthly: { value: "$0.00", percentage: "0.00%" },
        assets: { value: "$0.00", percentage: "0.00%" }
    });
    const [activeBots, setActiveBots] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/signin');

            try {
                // 1. Fetch User Profile
                const res = await fetch(`${API_BASE_URL}/user/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser({ name: data.user.full_name || "Trader", plan: "Pro Plan Active" });

                    // Connected logic
                    const connected = data.botCreated;
                    setHasExchange(connected);

                    if (connected) {
                        const dashRes = await fetch(`${API_BASE_URL}/user/dashboard`, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (dashRes.ok) {
                            const dashData = await dashRes.json();
                            setStatsData({
                                daily: { value: dashData.stats[0].value, percentage: dashData.stats[0].percentage },
                                monthly: { value: dashData.stats[1].value, percentage: dashData.stats[1].percentage },
                                assets: { value: dashData.stats[2].value, percentage: dashData.stats[2].percentage }
                            });
                            setActiveBots(dashData.bots || []);
                        }
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    if (loading) return (
        <div className="min-h-screen bg-[#050B0D] flex items-center justify-center">
            <Loader2 className="animate-spin text-[#00FF9D]" size={48} />
        </div>
    );

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black">

            {/* --- SIDEBAR --- */}
            <aside className="w-64 bg-[#050B0D] border-r border-white/5 flex flex-col justify-between py-6 z-20 hidden md:flex">
                <div className="px-6">
                    {/* Logo Area */}
                    <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
                        <img src="/logo.png" alt="FydBlock" className="h-8 object-contain" />
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        {[
                            { name: "Dashboard", icon: LayoutDashboard, active: true },
                            { name: "My Portfolio", icon: PieChart },
                            { name: "Bots", icon: Briefcase },
                            { name: "Backtest", icon: Wallet },
                            { name: "My Exchanges", icon: Terminal },
                            { name: "Terminal", icon: Activity },
                        ].map((item) => (
                            <button
                                key={item.name}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                                    ${item.active
                                        ? 'bg-[#00FF9D] text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon size={18} className={item.active ? "text-black" : "group-hover:text-[#00FF9D] transition-colors"} />
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <h4 className="text-xs text-gray-500 font-medium mb-4 uppercase tracking-wider">Other</h4>
                        <nav className="space-y-1">
                            {[
                                { name: "Join our community", icon: Users },
                                { name: "Invite Friends", icon: UserPlus },
                                { name: "Trading Course", icon: BookOpen },
                                { name: "Live Market", icon: Radio },
                                { name: "Subscription", icon: CreditCard },
                            ].map((item) => (
                                <button key={item.name} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all group">
                                    <item.icon size={18} className="group-hover:text-[#00FF9D] transition-colors" />
                                    {item.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* User Profile */}
                <div className="px-6">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0A1014] border border-white/5 hover:border-[#00FF9D]/30 transition-all cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-gray-600 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-gray-600 to-gray-800 flex items-center justify-center text-xs font-bold text-white/50">IMG</div>
                            <img src="/profile1.png" className="absolute inset-0 w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} alt="" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">{user.name}</p>
                            <p className="text-[10px] text-[#00FF9D]">{user.plan}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                {/* Header */}
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-[#00FF9D]">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014] border border-white/10 flex items-center justify-center text-white hover:border-[#00FF9D] transition-colors relative">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-[#00FF9D] rounded-full"></div>
                        </button>
                        <button
                            onClick={() => navigate('/bot-builder')}
                            className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]"
                        >
                            <Plus size={18} strokeWidth={3} />
                            New Bot
                        </button>
                    </div>
                </header>

                {/* 1. TOP STATS CARDS */}
                <section className="grid md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Today's Profit"
                        value={statsData.daily.value}
                        percentage={statsData.daily.percentage}
                        icon={<span className="font-bold text-lg">$</span>}
                        isConnected={hasExchange}
                        navigate={navigate}
                    />
                    <StatCard
                        title="30 Days Profit"
                        value={statsData.monthly.value}
                        percentage={statsData.monthly.percentage}
                        icon={<span className="font-bold text-lg">30</span>}
                        isConnected={hasExchange}
                        navigate={navigate}
                    />
                    <StatCard
                        title="Assets Value"
                        value={statsData.assets.value}
                        percentage={statsData.assets.percentage}
                        icon={<PieChart size={20} />}
                        isConnected={hasExchange}
                        navigate={navigate}
                    />
                </section>

                {/* 2. PERFORMANCE ANALYTICS CHART */}
                <section className="bg-[#0A1014]/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 mb-8 relative overflow-hidden">
                    {/* Overlay for Main Chart */}
                    {!hasExchange && <ConnectApiOverlay navigate={navigate} title="Connect Exchange" />}

                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-lg font-bold text-white mb-2">Performance Analytics</h2>
                            <p className="text-2xl font-bold text-white">
                                {hasExchange ? statsData.daily.value : "$0.00"}
                            </p>
                        </div>
                        {/* Time Filters */}
                        <div className="flex bg-[#050B0D] p-1 rounded-lg border border-white/10">
                            {['1h', '3h', '1d', '1w', '1m'].map((tf, i) => (
                                <button
                                    key={tf}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${i === 0 ? 'bg-[#00FF9D] text-black' : 'text-gray-500 hover:text-white'}`}
                                >
                                    {tf}
                                </button>
                            ))}
                        </div>
                    </div>

                    <PerformanceChart isConnected={hasExchange} />
                </section>

                {/* 3. ACTIVE BOTS SECTION */}
                <section className="bg-[#0A1014]/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 relative">
                    <h2 className="text-lg font-bold text-white mb-6">Active Bots</h2>

                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {/* Map Active Bots */}
                        {hasExchange && activeBots.length > 0 ? (
                            activeBots.map((bot, i) => (
                                <BotCard
                                    key={bot.id || i}
                                    bot={bot}
                                    isConnected={hasExchange}
                                    navigate={navigate}
                                />
                            ))
                        ) : (
                            // Show placeholder if not connected
                            <BotCard
                                bot={{ quote_currency: 'BTC', bot_type: 'Example Bot' }}
                                isConnected={false}
                                navigate={navigate}
                            />
                        )}

                        {/* Deploy New Bot Card */}
                        <div
                            onClick={() => navigate('/bot-builder')}
                            className="min-w-[200px] rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center p-6 cursor-pointer hover:border-[#00FF9D] hover:bg-[#00FF9D]/5 transition-all group bg-[#0A1014]/40"
                        >
                            <div className="w-12 h-12 bg-[#050B0D] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-white/5 group-hover:border-[#00FF9D]">
                                <Plus size={24} className="text-[#00FF9D]" />
                            </div>
                            <span className="text-sm font-bold text-gray-400 group-hover:text-white">Deploy New Bot</span>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Dashboard;
