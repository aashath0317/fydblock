// src/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, Plus, Search, ArrowUpRight, ArrowDownRight, Wallet, Loader2, X, Zap, CheckCircle2, ChevronDown
} from 'lucide-react';
import API_BASE_URL from './config';
import Dash_nav from './Dash_nav'; // <--- 1. Import Sidebar
import CreateBotModal from './CreateBotModal'; // <--- 2. Import Modal

// --- CONSTANTS ---
const EXCHANGES = [
    { id: 'binance', name: 'Binance', logo: '/logos/BINANCE.png' },
    { id: 'bybit', name: 'Bybit', logo: '/logos/BYBIT.png' },
    { id: 'okx', name: 'OKX', logo: '/logos/OKX.jpg' },
];

// --- HELPER COMPONENT: CRYPTO ICON ---
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

// --- HELPER COMPONENT: ASSET ROW ---
const AssetRow = ({ asset }) => {
    const isPositive = asset.change >= 0;
    const price = asset.price || 0;
    const value = (price * asset.balance).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <div className="grid grid-cols-12 gap-4 items-center p-4 bg-[#0A1014]/20 backdrop-blur-md border border-white/5 rounded-xl hover:border-[#00FF9D]/30 hover:bg-white/5 transition-all group">
            <div className="col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 p-1.5 flex items-center justify-center">
                    <CryptoIcon src={asset.icon} alt={asset.symbol} />
                </div>
                <div>
                    <p className="font-bold text-white text-sm">{asset.name || asset.symbol}</p>
                    <p className="text-xs text-gray-500 md:hidden">{asset.symbol}</p>
                </div>
            </div>
            <div className="col-span-3 text-sm font-medium text-gray-300">{value}</div>
            <div className="col-span-3 text-sm font-medium text-white">{asset.balance?.toFixed(4)} <span className="text-gray-500 text-xs">{asset.symbol}</span></div>
            <div className={`col-span-2 text-sm font-bold flex justify-end ${isPositive ? 'text-[#00FF9D]' : 'text-[#FF4D4D]'}`}>
                {isPositive ? '+' : ''}{asset.change?.toFixed(2)}%
            </div>
        </div>
    );
};

// --- DYNAMIC CHART COMPONENT ---
const PortfolioChart = ({ data, color }) => {
    if (!data || data.length < 2) return null;

    const width = 1000;
    const height = 300;
    const padding = 20;

    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;

    const getCoord = (index, value) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - padding - ((value - minVal) / range) * (height - 2 * padding);
        return `${x},${y}`;
    };

    const linePath = "M " + data.map((val, i) => getCoord(i, val)).join(" L ");
    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="portfolioGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                <path d={areaPath} fill="url(#portfolioGradient)" stroke="none" />

                <path d={linePath} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]" />

                {data.length > 0 && (
                    <circle
                        cx={width}
                        cy={height - padding - ((data[data.length - 1] - minVal) / range) * (height - 2 * padding)}
                        r="6"
                        fill={color}
                        className="animate-pulse shadow-[0_0_15px_currentColor]"
                    />
                )}
            </svg>
        </div>
    );
};

// --- COMPONENT: CONNECT EXCHANGE MODAL ---
const ConnectExchangeModal = ({ isOpen, onClose, onSuccess }) => {
    const [activeTab, setActiveTab] = useState('manual');
    const [selectedExchange, setSelectedExchange] = useState(EXCHANGES[0]);
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!apiKey || !apiSecret) return alert("Please enter API Key and Secret");
        if (selectedExchange.id === 'okx' && !passphrase) return alert("Please enter Passphrase");

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/exchange`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    exchange_name: selectedExchange.id,
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

                <h2 className="text-2xl font-bold text-white mb-6">Connect Exchange</h2>
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
                                <div
                                    key={ex.id}
                                    onClick={() => { setSelectedExchange(ex); setIsDropdownOpen(false); }}
                                    className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer transition-colors"
                                >
                                    <img src={ex.logo} alt={ex.name} className="h-6 w-6 object-contain" />
                                    <span className="text-sm font-medium text-gray-200">{ex.name}</span>
                                    {selectedExchange.id === ex.id && <CheckCircle2 size={14} className="text-[#00FF9D] ml-auto" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex bg-black/20 p-1 rounded-xl mb-6 border border-white/5">
                    <button onClick={() => setActiveTab('fast')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'fast' ? 'bg-[#00FF9D] text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]' : 'text-gray-400 hover:text-white'}`}>Fast Connect</button>
                    <button onClick={() => setActiveTab('manual')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'manual' ? 'bg-[#00FF9D] text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]' : 'text-gray-400 hover:text-white'}`}>Manual Entry</button>
                </div>

                {activeTab === 'fast' ? (
                    <div className="text-center py-8 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                        <div className="w-12 h-12 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center text-gray-500 mb-4 backdrop-blur-sm">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Unavailable right now</h3>
                        <p className="text-sm text-gray-500 mb-6">Fast Connect is currently disabled for {selectedExchange.name}.<br />Please use <b>Manual Entry</b>.</p>
                        <button disabled className="bg-gray-800/50 text-gray-500 px-6 py-2 rounded-lg text-sm font-bold cursor-not-allowed border border-white/5">Unavailable</button>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                            <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">API Key</label>
                            <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none" placeholder={`Enter ${selectedExchange.name} API Key`} />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">API Secret</label>
                            <input type="password" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none" placeholder={`Enter ${selectedExchange.name} API Secret`} />
                        </div>
                        {selectedExchange.id === 'okx' && (
                            <div>
                                <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Passphrase</label>
                                <input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none" placeholder="Enter OKX Passphrase" />
                            </div>
                        )}
                        <button onClick={handleSubmit} disabled={loading} className="w-full mt-4 bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] flex items-center justify-center gap-2 disabled:opacity-50">
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Connect Exchange"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- HELPER COMPONENT: CONNECT API OVERLAY ---
const ConnectApiOverlay = ({ onConnect, title = "Connect" }) => (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050B0D]/40 backdrop-blur-[4px] transition-all rounded-3xl border border-white/5">
        <div className="text-center animate-in fade-in zoom-in duration-300">
            <button
                onClick={(e) => { e.stopPropagation(); onConnect(); }}
                className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-3 px-8 rounded-full text-sm shadow-[0_0_20px_rgba(0,255,157,0.5)] hover:shadow-[0_0_30px_rgba(0,255,157,0.7)] transition-all flex items-center gap-2 mx-auto scale-105 hover:scale-110 active:scale-100"
            >
                <Plus size={16} strokeWidth={3} />
                {title}
            </button>
        </div>
    </div>
);

const Portfolio = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState({ name: "Trader", plan: "Pro Plan Active" });
    const [hasExchange, setHasExchange] = useState(false);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

    // <--- 3. ADD MODAL STATE
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [portfolioData, setPortfolioData] = useState({
        totalValue: 0,
        changePercent: 0,
        assets: [],
        history: []
    });

    const fetchPortfolio = async () => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/signin');

        try {
            const userRes = await fetch(`${API_BASE_URL}/user/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser({ name: userData.user.full_name || "Trader", plan: "Pro Plan Active" });

                const isConnected = userData.hasExchange === true;
                setHasExchange(isConnected);

                if (isConnected) {
                    const res = await fetch(`${API_BASE_URL}/user/portfolio`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setPortfolioData(data);
                    }
                }
            }
        } catch (error) {
            console.error("Network error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPortfolio();
        const intervalId = setInterval(fetchPortfolio, 10 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, [navigate]);

    const filteredAssets = portfolioData.assets.filter(asset =>
        (asset.name && asset.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (asset.symbol && asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const isPositiveChange = portfolioData.changePercent >= 0;
    const chartColor = isPositiveChange ? "#00FF9D" : "#EF4444";

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">

            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00FF9D]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute bottom-[-30%] left-[20%] w-[60vw] h-[50vh] bg-[#00FF9D]/20 rounded-full blur-[180px] opacity-70"></div>
            </div>

            {/* Modals */}
            <ConnectExchangeModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} onSuccess={fetchPortfolio} />
            <CreateBotModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} /> {/* <--- 4. Render Modal */}

            {/* --- REPLACED SIDEBAR WITH DASH_NAV --- */}
            <Dash_nav user={user} />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#00FF9D] drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]">My Portfolio</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014]/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:border-[#00FF9D] transition-colors relative">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-[#00FF9D] rounded-full shadow-[0_0_5px_#00FF9D]"></div>
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)} // <--- 5. Hook up New Bot Button
                            className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                        >
                            <Plus size={18} strokeWidth={3} />
                            New Bot
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center h-full min-h-[400px]">
                        <Loader2 className="animate-spin text-[#00FF9D]" size={48} />
                    </div>
                ) : (
                    <div className="relative">
                        {!hasExchange && <ConnectApiOverlay onConnect={() => setIsConnectModalOpen(true)} title="Connect Exchange" />}

                        <div className={`${!hasExchange ? 'filter blur-md opacity-30 pointer-events-none select-none' : ''} transition-all duration-500`}>
                            <section className="mb-12">
                                <div className="relative w-full h-[300px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group hover:border-[#00FF9D]/20 transition-all duration-500">
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A1014] via-[#0F1C18] to-[#0A1014]"></div>
                                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black font-bold">$</div>
                                                <span className="text-gray-300 font-medium">Estimated total value</span>
                                                {isPositiveChange ? (
                                                    <ArrowUpRight size={16} className="text-[#00FF9D]" />
                                                ) : (
                                                    <ArrowDownRight size={16} className="text-red-500" />
                                                )}
                                            </div>
                                            <div className="flex items-baseline gap-4">
                                                <h2 className="text-5xl font-bold text-white tracking-tight">
                                                    ${portfolioData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </h2>
                                                <span className={`font-bold px-2 py-1 rounded text-sm ${isPositiveChange ? 'text-[#00FF9D] bg-[#00FF9D]/10' : 'text-red-500 bg-red-500/10'}`}>
                                                    {isPositiveChange ? '+' : ''}{portfolioData.changePercent.toFixed(2)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <PortfolioChart data={portfolioData.history} color={chartColor} />
                                </div>
                            </section>

                            <section>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-white">Assets</h3>
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

                                <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">
                                    <div className="col-span-4">Symbol</div>
                                    <div className="col-span-3">Value</div>
                                    <div className="col-span-3">Count</div>
                                    <div className="col-span-2 text-right">Change</div>
                                </div>

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
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Portfolio;
