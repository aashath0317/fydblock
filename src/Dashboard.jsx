// src/Dashboard.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    PieChart, Bell, Plus, ChevronUp, Loader2, X, Zap, CheckCircle2, ChevronDown, FileText, CheckSquare, Square
} from 'lucide-react';
import API_BASE_URL from './config';
import Dash_nav from './Dash_nav';
import CreateBotModal from './CreateBotModal';
import ConfigureBotModal from './ConfigureBotModal';
import { useTrading } from './context/TradingContext';

// --- CONSTANTS ---
const EXCHANGES = [
    { id: 'binance', name: 'Binance', logo: '/logos/BINANCE.png' },
    { id: 'bybit', name: 'Bybit', logo: '/logos/BYBIT.png' },
    { id: 'okx', name: 'OKX', logo: '/logos/OKX.jpg' },
];

// --- COMPONENT: CONNECT EXCHANGE MODAL ---
const ConnectExchangeModal = ({ isOpen, onClose, onSuccess, defaultIsTestnet = false }) => {
    const [activeTab, setActiveTab] = useState('manual');
    const [selectedExchange, setSelectedExchange] = useState(EXCHANGES[0]);
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [passphrase, setPassphrase] = useState('');

    // Auto-check testnet if passed via props
    const [isTestnet, setIsTestnet] = useState(defaultIsTestnet);

    useEffect(() => {
        setIsTestnet(defaultIsTestnet);
    }, [defaultIsTestnet, isOpen]);

    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!apiKey || !apiSecret) return alert("Please enter API Key and Secret");
        if (selectedExchange.id === 'okx' && !passphrase) return alert("Please enter Passphrase");

        setLoading(true);
        try {
            // Append _paper if testnet is selected
            const finalExchangeName = isTestnet ? `${selectedExchange.id}_paper` : selectedExchange.id;

            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/exchange`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    exchange_name: finalExchangeName,
                    api_key: apiKey,
                    api_secret: apiSecret,
                    passphrase: passphrase
                })
            });

            if (res.ok) {
                onSuccess();
                onClose();
            } else {
                alert("Connection failed. Please check your keys.");
            }
        } catch (error) {
            console.error(error);
            alert("Error connecting to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0A1014]/80 backdrop-blur-2xl border border-white/20 w-full max-w-lg rounded-3xl p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">
                    Connect {isTestnet ? 'Paper' : 'Exchange'} API
                </h2>

                {/* Exchange Selector */}
                <div className="mb-6 relative">
                    <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Select Exchange</label>
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-all hover:border-[#00FF9D]/30"
                    >
                        <div className="flex items-center gap-3">
                            <img src={selectedExchange.logo} alt={selectedExchange.name} className="h-6 w-6 object-contain" />
                            <span className="font-bold text-white">{selectedExchange.name}</span>
                        </div>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A2023] border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl backdrop-blur-xl">
                            {EXCHANGES.map(ex => (
                                <div key={ex.id} onClick={() => { setSelectedExchange(ex); setIsDropdownOpen(false); }} className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition-colors">
                                    <img src={ex.logo} alt={ex.name} className="h-6 w-6 object-contain" />
                                    <span className="text-sm font-medium text-gray-200">{ex.name}</span>
                                    {selectedExchange.id === ex.id && <CheckCircle2 size={14} className="text-[#00FF9D] ml-auto" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex bg-black/20 p-1 rounded-xl mb-6 border border-white/5">
                    <button onClick={() => setActiveTab('fast')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'fast' ? 'bg-[#00FF9D] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Fast Connect</button>
                    <button onClick={() => setActiveTab('manual')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'manual' ? 'bg-[#00FF9D] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Manual Entry</button>
                </div>

                {activeTab === 'fast' ? (
                    <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                        <div className="w-12 h-12 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center text-gray-500 mb-4 backdrop-blur-sm"><Zap size={24} fill="currentColor" /></div>
                        <h3 className="text-lg font-bold text-white mb-1">Unavailable right now</h3>
                        <p className="text-sm text-gray-500 mb-6">Fast Connect is currently disabled for {selectedExchange.name}.<br />Please use <b>Manual Entry</b>.</p>
                        <button disabled className="bg-gray-800/50 text-gray-500 px-6 py-2 rounded-lg text-sm font-bold cursor-not-allowed border border-white/5">Unavailable</button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <div><label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">API Key</label><input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] focus:bg-black/60 outline-none transition-all font-mono text-sm placeholder:text-gray-600" placeholder={`Enter your ${selectedExchange.name} ${isTestnet ? 'Testnet' : ''} API Key`} /></div>
                        <div><label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">API Secret</label><input type="password" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] focus:bg-black/60 outline-none transition-all font-mono text-sm placeholder:text-gray-600" placeholder={`Enter your ${selectedExchange.name} ${isTestnet ? 'Testnet' : ''} API Secret`} /></div>
                        {selectedExchange.id === 'okx' && (<div><label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Passphrase</label><input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none" placeholder="Enter OKX Passphrase" /></div>)}

                        {/* --- TESTNET CHECKBOX --- */}
                        <div
                            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${isTestnet ? 'bg-[#E2F708]/10 border-[#E2F708]/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                            onClick={() => setIsTestnet(!isTestnet)}
                        >
                            {isTestnet ? <CheckSquare size={20} className="text-[#E2F708]" /> : <Square size={20} className="text-gray-500" />}
                            <div>
                                <p className={`text-sm font-bold ${isTestnet ? 'text-[#E2F708]' : 'text-gray-400'}`}>Connect to Testnet / Paper Trading</p>
                                <p className="text-[10px] text-gray-500">Enable this if you are using Demo/Sandbox API Keys</p>
                            </div>
                        </div>

                        <button onClick={handleSubmit} disabled={loading} className={`w-full mt-4 font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] ${isTestnet ? 'bg-[#E2F708] hover:bg-[#d4e600] text-black shadow-[#E2F708]/20' : 'bg-[#00FF9D] hover:bg-[#00cc7d] text-black shadow-[#00FF9D]/20'}`}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : `Connect ${isTestnet ? 'Testnet' : 'Exchange'}`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// ... (Keep ConnectApiOverlay, Sparkline, PerformanceChart, StatCard, BotCard as previously defined) ...
const ConnectApiOverlay = ({ onConnect, title = "Connect", isConnected }) => {
    if (isConnected) return null;
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050B0D]/40 backdrop-blur-[4px] transition-all rounded-3xl border border-white/5">
            <div className="text-center animate-in fade-in zoom-in duration-300">
                <button onClick={(e) => { e.stopPropagation(); onConnect(); }} className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-3 px-8 rounded-full text-sm shadow-[0_0_20px_rgba(0,255,157,0.5)] hover:shadow-[0_0_30px_rgba(0,255,157,0.7)] transition-all flex items-center gap-2 mx-auto scale-105 hover:scale-110 active:scale-100">
                    <Plus size={16} strokeWidth={3} /> {title}
                </button>
            </div>
        </div>
    );
};

const isInvalidBot = (type) => { if (!type) return true; const t = type.toString().toUpperCase().trim(); return t === 'SKIPPED' || t === 'EXAMPLE BOT'; };

const Sparkline = ({ color, isConnected }) => (
    <div className="relative h-12 w-full overflow-hidden opacity-80 mt-2">
        {isConnected && (<><div className="absolute right-0 top-[40%] w-2 h-2 rounded-full shadow-[0_0_10px] z-10 animate-pulse" style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}></div><svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none"><defs><linearGradient id={`sparkGradient-${color}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.2" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs><path d="M0,30 L10,20 L20,35 L30,15 L40,25 L50,10 L60,30 L70,20 L80,5 L90,25 L100,20" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_5px_rgba(0,255,157,0.5)]" /><path d="M0,30 L10,20 L20,35 L30,15 L40,25 L50,10 L60,30 L70,20 L80,5 L90,25 L100,20 V40 H0 Z" fill={`url(#sparkGradient-${color})`} stroke="none" /></svg></>)}
    </div>
);

const PerformanceChart = ({ isConnected, themeColor, data = [] }) => {
    // 1. Handle Empty/Loading Data
    if (!isConnected || !data || data.length === 0) {
        return (
            <div className="w-full h-72 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                <p className="text-gray-600 text-xs">Waiting for data...</p>
            </div>
        );
    }

    // 2. Prepare Data Points for SVG
    const width = 800;
    const height = 300;
    const padding = 20;

    // Find range
    const values = data.map(d => d.value);
    const minVal = Math.min(...values) * 0.95; // 5% buffer
    const maxVal = Math.max(...values) * 1.05;
    const range = maxVal - minVal || 1; // Avoid divide by zero

    // Map data to coordinates
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((d.value - minVal) / range) * height;
        return `${x},${y}`;
    });

    const linePath = `M ${points.join(' L ')}`;
    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

    // Generate Y-Axis Labels (5 ticks)
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => {
        const val = minVal + (t * range);
        return { y: height - (t * height), label: val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toFixed(0) };
    });

    // Generate X-Axis Labels (Every 5th point)
    const xTicks = data.filter((_, i) => i % 5 === 0).map((d, i) => ({
        x: (data.indexOf(d) / (data.length - 1)) * width,
        label: d.date
    }));

    return (
        <div className="w-full h-72 relative flex flex-col">
            <div className="flex-1 relative flex">
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-between text-[10px] text-gray-500 font-medium h-full pr-4 w-12 text-right absolute -left-2 top-0 bottom-0 py-2">
                    {yTicks.reverse().map((t, i) => (
                        <span key={i} style={{ position: 'absolute', top: t.y - 10, right: 0 }}>{t.label}</span>
                    ))}
                </div>

                {/* Chart Area */}
                <div className="flex-1 relative border-l border-white/5 ml-12 overflow-hidden">
                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                        <div key={i} className="absolute w-full border-t border-white/5" style={{ top: `${t * 100}%` }}></div>
                    ))}

                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible absolute inset-0" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="mainChartGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor={themeColor} stopOpacity="0.1" />
                                <stop offset="100%" stopColor={themeColor} stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d={areaPath} fill="url(#mainChartGradient)" stroke="none" />
                        <path d={linePath} fill="none" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(0,255,157,0.2)]" />
                    </svg>
                </div>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between text-[10px] text-gray-500 mt-2 pl-12 pt-2 border-t border-white/5">
                {xTicks.map((t, i) => (
                    <span key={i}>{t.label}</span>
                ))}
            </div>
        </div>
    );
};

const StatCard = ({ title, value, percentage, icon, isConnected, onConnect, themeColor }) => (
    <div className={`bg-[#0A1014] rounded-3xl p-6 border border-white/10 relative overflow-hidden group transition-all duration-300 h-32 flex flex-col justify-between hover:border-[${themeColor}]/30`}>
        {!isConnected && <ConnectApiOverlay onConnect={onConnect} title="Connect API" isConnected={isConnected} />}

        <div className={`${!isConnected ? 'filter blur-[3px] opacity-30 pointer-events-none select-none' : ''} transition-all h-full flex flex-col justify-center`}>
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-[#131B1F] flex items-center justify-center text-white border border-white/5`}>
                        {icon}
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
                </div>
                {isConnected && <ChevronUp size={16} color={themeColor} />}
            </div>

            <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded bg-[#131B1F] ${isConnected ? '' : 'text-gray-600'}`} style={isConnected ? { color: themeColor } : {}}>
                    {percentage}
                </span>
            </div>
        </div>
    </div>
);

const BotCard = ({ bot, isConnected, onConnect, themeColor }) => {
    const isPlaceholder = isInvalidBot(bot.bot_type);
    let config = {}; if (typeof bot.config === 'string') { try { config = JSON.parse(bot.config); } catch (e) { } } else { config = bot.config || {}; }
    const mode = config.mode || 'live';
    const isPaper = mode === 'paper';
    const displayProfit = isConnected && !isPlaceholder ? (bot.total_profit ? `$${bot.total_profit}` : '$0.00') : (isPlaceholder ? '$124.50' : "----");
    const displayPercent = isConnected && !isPlaceholder ? "+0.00%" : (isPlaceholder ? '+2.4%' : "--");

    return (
        <div className={`bg-[#0A1014]/20 backdrop-blur-2xl rounded-3xl p-5 border border-white/5 min-w-[260px] relative overflow-hidden group transition-all duration-300 ${isConnected ? `hover:border-[${themeColor}]/30 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)]` : ''}`}>
            {!isConnected && !isPlaceholder && <ConnectApiOverlay onConnect={onConnect} title="Connect" isConnected={isConnected} />}
            <div className={`${!isConnected && !isPlaceholder ? 'filter blur-[2px] opacity-60 pointer-events-none' : ''} transition-all`}>
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:border-[${themeColor}]/30`}><div className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-[10px] font-bold">{bot.quote_currency ? bot.quote_currency.charAt(0) : '$'}</div></div><div><h4 className="text-white font-bold text-sm">{bot.quote_currency || 'Unknown'} Pair</h4><div className="flex items-center gap-2"><span className={`text-[10px] uppercase tracking-wider ${isPlaceholder ? 'text-gray-400' : ''}`} style={!isPlaceholder ? { color: themeColor } : {}}>{bot.bot_type}</span>{isPaper && <span className="text-[9px] bg-[#E2F708]/20 text-[#E2F708] px-1.5 py-0.5 rounded">PAPER</span>}</div></div></div>
                    {isConnected && <ChevronUp size={14} color={themeColor} />}
                </div>
                <div className="flex justify-between items-end"><div><p className="text-2xl font-bold text-white mb-1">{displayProfit}</p><p className={`text-xs font-bold ${isConnected ? '' : 'text-gray-500'}`} style={isConnected ? { color: themeColor } : {}}>{displayPercent}</p></div><div className="w-24 h-10 opacity-70">{isConnected ? (<svg viewBox="0 0 50 20" className="w-full h-full"><path d="M0,20 L10,5 L20,15 L30,5 L40,10 L50,0" fill="none" stroke={isPlaceholder ? "#666" : themeColor} strokeWidth="2" strokeLinecap="round" /><circle cx="50" cy="0" r="2" fill={isPlaceholder ? "#666" : themeColor} className={isPlaceholder ? "" : "shadow-[0_0_5px_currentColor]"} /></svg>) : (<div className="h-[2px] w-full bg-white/5 mt-4 border-t border-dashed border-gray-700"></div>)}</div></div>
            </div>
        </div>
    );
};


// --- MAIN DASHBOARD COMPONENT ---

const Dashboard = () => {
    // ... [Same hooks and state as before] ...
    const navigate = useNavigate();
    const { isPaperTrading } = useTrading();

    const [loading, setLoading] = useState(true);
    const [hasExchange, setHasExchange] = useState(false);
    const [user, setUser] = useState({ name: "Trader", plan: "Pro Plan Active" });

    // Modals
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [selectedBotType, setSelectedBotType] = useState('SPOT GRID');
    const [connectModalTestnetDefault, setConnectModalTestnetDefault] = useState(false);

    // Data State
    const [statsData, setStatsData] = useState({
        daily: { value: "$0.00", percentage: "0.00%" },
        monthly: { value: "$0.00", percentage: "0.00%" },
        assets: { value: "$0.00", percentage: "0.00%" }
    });
    const [activeBots, setActiveBots] = useState([]);
    const [chartData, setChartData] = useState([]); // <--- NEW STATE for Chart

    // Themes
    const themeColor = isPaperTrading ? '#E2F708' : '#00FF9D';
    const themeTextClass = isPaperTrading ? 'text-[#E2F708]' : 'text-[#00FF9D]';
    const themeBgClass = isPaperTrading ? 'bg-[#E2F708]' : 'bg-[#00FF9D]';
    const themeBorderHover = isPaperTrading ? 'hover:border-[#E2F708]' : 'hover:border-[#00FF9D]';

    const fetchData = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) return navigate('/signin');

        try {
            const res = await fetch(`${API_BASE_URL}/user/me`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (res.ok) {
                const data = await res.json();
                setUser({ name: data.user.full_name || "Trader", plan: "Pro Plan Active" });

                const isPaper = isPaperTrading;
                const isConnected = isPaper ? data.hasPaperExchange : data.hasLiveExchange;
                setHasExchange(isConnected);

                if (isPaper && !data.hasPaperExchange) {
                    setConnectModalTestnetDefault(true);
                    setIsConnectModalOpen(true);
                }

                const queryMode = isPaper ? 'paper' : 'live';
                const dashRes = await fetch(`${API_BASE_URL}/user/dashboard?mode=${queryMode}`, {
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
                    setChartData(dashData.chartData || []); // <--- Capture real chart data
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigate, isPaperTrading]);

    // ... [Handlers: handleBotSelect, validBots] ...
    const handleBotSelect = (botType) => {
        setSelectedBotType(botType);
        setIsCreateModalOpen(false);
        setIsConfigModalOpen(true);
    };
    const validBots = activeBots.filter(bot => !isInvalidBot(bot.bot_type));

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className={`absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-20 mix-blend-screen transition-colors duration-700 ${isPaperTrading ? 'bg-[#E2F708]/20' : 'bg-[#00FF9D]/20'}`}></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/20 rounded-full blur-[150px] opacity-20 mix-blend-screen"></div>
                <div className={`absolute bottom-[-30%] left-[20%] w-[60vw] h-[50vh] rounded-full blur-[180px] opacity-20 transition-colors duration-700 ${isPaperTrading ? 'bg-[#E2F708]/10' : 'bg-[#00FF9D]/20'}`}></div>
            </div>

            {/* Modals */}
            <ConnectExchangeModal
                isOpen={isConnectModalOpen}
                onClose={() => setIsConnectModalOpen(false)}
                onSuccess={fetchData}
                defaultIsTestnet={connectModalTestnetDefault}
            />
            <CreateBotModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSelect={handleBotSelect}
            />
            <ConfigureBotModal
                isOpen={isConfigModalOpen}
                onClose={() => setIsConfigModalOpen(false)}
                botType={selectedBotType}
                onSuccess={fetchData}
            />

            <Dash_nav user={user} />

            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
                <header className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-4">
                        <h1 className={`text-3xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-colors duration-300 ${themeTextClass}`}>
                            {isPaperTrading ? "Paper Dashboard" : "Dashboard"}
                        </h1>
                        {isPaperTrading && (
                            <div className="px-3 py-1 rounded-full bg-[#E2F708]/10 border border-[#E2F708]/30 text-[#E2F708] text-xs font-bold flex items-center gap-2 animate-in fade-in">
                                <FileText size={14} /> DEMO ENVIRONMENT
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button className={`w-10 h-10 rounded-xl bg-[#0A1014] border border-white/10 flex items-center justify-center text-white transition-colors relative ${themeBorderHover}`}>
                            <Bell size={20} />
                            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full shadow-[0_0_5px_currentColor] ${themeBgClass}`}></div>
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className={`text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-none hover:brightness-110 ${themeBgClass}`}
                        >
                            <Plus size={18} strokeWidth={3} />
                            New Bot
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center h-full min-h-[60vh]">
                        <Loader2 className={`animate-spin ${themeTextClass}`} size={48} />
                    </div>
                ) : (
                    <>
                        <section className="grid md:grid-cols-3 gap-6 mb-8">
                            <StatCard title="Today's Profit" value={statsData.daily.value} percentage={statsData.daily.percentage} icon={<span className="font-bold text-lg">$</span>} isConnected={hasExchange} onConnect={() => { setConnectModalTestnetDefault(isPaperTrading); setIsConnectModalOpen(true); }} themeColor={themeColor} />
                            <StatCard title="30 Days Profit" value={statsData.monthly.value} percentage={statsData.monthly.percentage} icon={<span className="font-bold text-lg">30</span>} isConnected={hasExchange} onConnect={() => { setConnectModalTestnetDefault(isPaperTrading); setIsConnectModalOpen(true); }} themeColor={themeColor} />
                            <StatCard title="Assets Value" value={statsData.assets.value} percentage={statsData.assets.percentage} icon={<PieChart size={20} />} isConnected={hasExchange} onConnect={() => { setConnectModalTestnetDefault(isPaperTrading); setIsConnectModalOpen(true); }} themeColor={themeColor} />
                        </section>

                        {/* --- UPDATED PERFORMANCE ANALYTICS (Solid BG, Dynamic Chart) --- */}
                        <section className={`bg-[#0A1014] rounded-3xl p-8 border border-white/10 mb-8 relative overflow-hidden min-h-[400px] transition-colors ${themeBorderHover}`}>
                            {!hasExchange && <ConnectApiOverlay onConnect={() => { setConnectModalTestnetDefault(isPaperTrading); setIsConnectModalOpen(true); }} title="Connect Exchange" isConnected={hasExchange} />}

                            <div className={`${!hasExchange ? 'filter blur-md opacity-30 pointer-events-none select-none' : ''} transition-all duration-500 h-full`}>
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-lg font-bold text-white mb-2">Performance Analytics</h2>
                                        <p className="text-2xl font-bold text-white">{hasExchange ? statsData.daily.value : "$0.00"}</p>
                                    </div>
                                    <div className="flex bg-[#131B1F] p-1 rounded-lg border border-white/5">
                                        {['1h', '3h', '1d', '1w', '1m'].map((tf, i) => (
                                            <button key={tf} className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${i === 2 ? `${themeBgClass} text-black` : 'text-gray-500 hover:text-white'}`}>{tf}</button>
                                        ))}
                                    </div>
                                </div>
                                {/* Dynamic Chart with Data */}
                                <PerformanceChart isConnected={hasExchange} themeColor={themeColor} data={chartData} />
                            </div>
                        </section>

                        <section className={`bg-[#0A1014] rounded-3xl p-8 border border-white/10 relative transition-colors ${themeBorderHover}`}>
                            <h2 className="text-lg font-bold text-white mb-6">Active Bots ({validBots.length})</h2>
                            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                                {validBots.length > 0 ? (
                                    validBots.map((bot, i) => (
                                        <BotCard key={bot.id || i} bot={bot} isConnected={hasExchange} onConnect={() => { setConnectModalTestnetDefault(isPaperTrading); setIsConnectModalOpen(true); }} themeColor={themeColor} />
                                    ))
                                ) : (
                                    <div className="text-gray-500 text-sm italic p-4">No active bots found in {isPaperTrading ? 'paper' : 'live'} mode.</div>
                                )}
                                <div onClick={() => setIsCreateModalOpen(true)} className={`min-w-[200px] rounded-2xl border border-dashed border-white/20 flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-white/5 transition-all group ${themeBorderHover}`}>
                                    <div className={`w-12 h-12 bg-[#131B1F] rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-white/5 ${themeBorderHover}`}>
                                        <Plus size={24} className={themeTextClass} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-400 group-hover:text-white">Deploy New Bot</span>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
