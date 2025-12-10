import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, Plus, Search, ArrowUpRight, Wallet, Loader2, X, Zap, CheckCircle2, ChevronDown, PieChart
} from 'lucide-react';
import API_BASE_URL from './config';
import Dash_nav from './Dash_nav';
import CreateBotModal from './CreateBotModal';

// --- CONSTANTS ---
const EXCHANGES = [
    { id: 'binance', name: 'Binance', logo: '/icons/bnb.svg' }, // Assuming you have exchange logos too, otherwise revert to external
    { id: 'bybit', name: 'Bybit', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Bybit-logo.png/1200px-Bybit-logo.png' },
    { id: 'okx', name: 'OKX', logo: 'https://cryptologos.cc/logos/okb-okb-logo.png' },
];

// --- HELPER COMPONENT: CRYPTO ICON (Local Priority) ---
const CryptoIcon = ({ symbol, className = "w-full h-full" }) => {
    // Points directly to public/icons/btc.svg, public/icons/ada.svg, etc.
    const localPath = `/icons/${symbol?.toLowerCase()}.svg`;

    return (
        <img
            src={localPath}
            alt={symbol}
            className={`object-contain rounded-full ${className}`}
            onError={(e) => {
                // If local icon is missing, show a generic fallback (Bitcoin or a generic coin image)
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png";
            }}
        />
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0A1014] border border-white/10 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-6">Connect Exchange</h2>

                {/* Exchange Select */}
                <div className="mb-6 relative">
                    <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Select Exchange</label>
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="bg-[#131B1F] border border-white/10 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-[#00FF9D]/50 transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <img src={selectedExchange.logo} alt={selectedExchange.name} className="h-6 w-6 object-contain" onError={(e) => e.target.src = "https://cryptologos.cc/logos/bitcoin-btc-logo.png"} />
                            <span className="font-bold text-white">{selectedExchange.name}</span>
                        </div>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A2023] border border-white/10 rounded-xl overflow-hidden z-20 shadow-xl">
                            {EXCHANGES.map(ex => (
                                <div
                                    key={ex.id}
                                    onClick={() => { setSelectedExchange(ex); setIsDropdownOpen(false); }}
                                    className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors"
                                >
                                    <img src={ex.logo} alt={ex.name} className="h-6 w-6 object-contain" onError={(e) => e.target.src = "https://cryptologos.cc/logos/bitcoin-btc-logo.png"} />
                                    <span className="text-sm font-medium text-gray-200">{ex.name}</span>
                                    {selectedExchange.id === ex.id && <CheckCircle2 size={14} className="text-[#00FF9D] ml-auto" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex bg-black/40 p-1 rounded-xl mb-6 border border-white/5">
                    <button onClick={() => setActiveTab('fast')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'fast' ? 'bg-[#00FF9D] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Fast Connect</button>
                    <button onClick={() => setActiveTab('manual')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'manual' ? 'bg-[#00FF9D] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Manual Entry</button>
                </div>

                {activeTab === 'fast' ? (
                    <div className="text-center py-8 bg-white/5 rounded-2xl border border-dashed border-white/10">
                        <div className="w-12 h-12 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center text-gray-500 mb-4">
                            <Zap size={24} fill="currentColor" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">Unavailable</h3>
                        <p className="text-sm text-gray-500 mb-6">Fast Connect is currently disabled.<br />Please use <b>Manual Entry</b>.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">API Key</label>
                            <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full bg-[#131B1F] border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none transition-colors" placeholder="Enter API Key" />
                        </div>
                        <div>
                            <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">API Secret</label>
                            <input type="password" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} className="w-full bg-[#131B1F] border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none transition-colors" placeholder="Enter API Secret" />
                        </div>
                        {selectedExchange.id === 'okx' && (
                            <div>
                                <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2">Passphrase</label>
                                <input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} className="w-full bg-[#131B1F] border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none transition-colors" placeholder="Enter OKX Passphrase" />
                            </div>
                        )}
                        <button onClick={handleSubmit} disabled={loading} className="w-full mt-4 bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,157,0.3)]">
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Connect Exchange"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- CONNECT API OVERLAY ---
const ConnectApiOverlay = ({ onConnect }) => (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050B0D]/60 backdrop-blur-sm rounded-3xl border border-white/5 transition-all">
        <button
            onClick={(e) => { e.stopPropagation(); onConnect(); }}
            className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-transform hover:scale-105 flex items-center gap-2"
        >
            <Plus size={18} strokeWidth={3} />
            Connect Exchange
        </button>
    </div>
);

// --- PREMIUM SMOOTH CHART COMPONENT ---
const PortfolioChart = ({ data, color = "#00FF9D" }) => {
    // If no history, generate a flat line
    const pointsData = (data && data.length > 0) ? data : [0, 0, 0, 0, 0];
    const width = 800;
    const height = 220;
    const padding = 20;

    const minVal = Math.min(...pointsData);
    const range = Math.max(...pointsData) - minVal || 1;

    // Helper to map data to SVG coordinates
    const getCoord = (index, value) => {
        const x = (index / (pointsData.length - 1)) * width;
        const y = height - ((value - minVal) / range) * (height * 0.7) - padding;
        return { x, y };
    };

    // Build points
    const points = pointsData.map((val, i) => getCoord(i, val));

    // Catmull-Rom Spline for smooth curves
    const linePath = points.reduce((acc, point, i, a) => {
        if (i === 0) return `M ${point.x},${point.y}`;
        const p0 = a[i - 1] || point;
        const p1 = point;
        const p2 = a[i + 1] || point;
        const p3 = a[i + 2] || p2;

        const cp1x = p0.x + (p1.x - p0.x) / 6;
        const cp1y = p0.y + (p1.y - p0.y) / 6;
        const cp2x = p1.x - (p2.x - p0.x) / 6;
        const cp2y = p1.y - (p2.y - p0.y) / 6;

        return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    }, "");

    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

    // Grid lines
    const gridLines = [0.2, 0.4, 0.6, 0.8].map(percent => height - (height * percent));
    const gridCols = Array.from({ length: 12 });

    return (
        <div className="absolute inset-0 w-full h-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.15" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Horizontal Grid */}
                {gridLines.map((y, i) => (
                    <line key={i} x1="0" y1={y} x2={width} y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="1" />
                ))}

                {/* Vertical Grid */}
                {gridCols.map((_, i) => {
                    const x = (i / (gridCols.length - 1)) * width;
                    return <line key={`v-${i}`} x1={x} y1="0" x2={x} y2={height} stroke="white" strokeOpacity="0.05" strokeWidth="1" />;
                })}

                {/* Area */}
                <path d={areaPath} fill="url(#chartGradient)" stroke="none" />

                {/* Line */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_10px_rgba(0,255,157,0.4)]"
                />
            </svg>
        </div>
    );
};

// --- MAIN PORTFOLIO COMPONENT ---
const Portfolio = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ name: "Trader", plan: "Pro Plan Active" });
    const [hasExchange, setHasExchange] = useState(false);

    // Modals
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Filter & Search
    const [searchQuery, setSearchQuery] = useState('');

    // Data State
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
            const userRes = await fetch(`${API_BASE_URL}/user/me`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser({ name: userData.user.full_name || "Trader", plan: "Pro Plan Active" });

                const isConnected = userData.hasExchange === true;
                setHasExchange(isConnected);

                if (isConnected) {
                    const res = await fetch(`${API_BASE_URL}/user/portfolio`, { headers: { 'Authorization': `Bearer ${token}` } });
                    if (res.ok) {
                        const data = await res.json();
                        // SAFELY UPDATE STATE
                        if (data) {
                            setPortfolioData(prev => ({
                                ...prev,
                                totalValue: data.totalValue || 0,
                                changePercent: data.changePercent || 0,
                                assets: data.assets || [],
                                history: (data.history && data.history.length > 0)
                                    ? data.history
                                    : [data.totalValue * 0.9, data.totalValue] // Mock history if only 1 data point
                            }));
                        }
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
    }, [navigate]);

    const filteredAssets = (portfolioData.assets || []).filter(asset =>
        asset.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isPositiveChange = (portfolioData.changePercent || 0) >= 0;

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">

            {/* Background Glows (Identical to Dashboard) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00FF9D]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute bottom-[-30%] left-[20%] w-[60vw] h-[50vh] bg-[#00FF9D]/20 rounded-full blur-[180px] opacity-70"></div>
            </div>

            {/* Modals */}
            <ConnectExchangeModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} onSuccess={fetchPortfolio} />
            <CreateBotModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />

            {/* Sidebar */}
            <Dash_nav user={user} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">

                {/* Header Row */}
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#00FF9D] drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]">My Portfolio</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014]/60 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00FF9D] transition-all relative">
                            <Bell size={20} />
                            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#00FF9D] rounded-full shadow-[0_0_5px_#00FF9D]"></div>
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                        >
                            <Plus size={18} strokeWidth={3} />
                            New Bot
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center h-[50vh]">
                        <Loader2 className="animate-spin text-[#00FF9D]" size={48} />
                    </div>
                ) : (
                    <div className="w-full">

                        {/* --- TOP CHART CARD --- */}
                        <div className="relative w-full bg-[#0A1014]/60 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden mb-12 shadow-2xl">
                            {!hasExchange && <ConnectApiOverlay onConnect={() => setIsConnectModalOpen(true)} />}

                            <div className={`p-8 md:p-10 relative z-10 ${!hasExchange ? 'blur-sm opacity-50' : ''}`}>
                                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-8">

                                    {/* Value Display */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-black font-bold text-xs">$</div>
                                            <span className="text-gray-400 font-medium text-sm tracking-wide">Estimated total value</span>
                                            <ArrowUpRight size={14} className="text-[#00FF9D] opacity-60" />
                                        </div>
                                        <div className="flex items-baseline gap-4">
                                            {/* SAFE ACCESS: Check properties before render */}
                                            <h2 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
                                                ${(portfolioData.totalValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </h2>
                                            <span className={`font-bold px-2.5 py-1 rounded text-xs ${isPositiveChange ? 'text-[#00FF9D] bg-[#00FF9D]/10' : 'text-red-500 bg-red-500/10'}`}>
                                                {isPositiveChange ? '+' : ''}{(portfolioData.changePercent || 0).toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Chart Container */}
                                <div className="relative w-full h-[250px] mb-6">
                                    <PortfolioChart data={portfolioData.history} />
                                </div>
                            </div>
                        </div>

                        {/* --- ASSETS TABLE SECTION --- */}
                        <div className={`relative transition-all duration-500 ${!hasExchange ? 'blur-sm opacity-50 pointer-events-none' : ''}`}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Assets</h3>
                                <div className="relative w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-[#0A1014]/50 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:border-[#00FF9D] focus:outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-12 px-6 py-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                <div className="col-span-4">Symbol</div>
                                <div className="col-span-3">Value</div>
                                <div className="col-span-3">Count</div>
                                <div className="col-span-2 text-right">Change</div>
                            </div>

                            {/* Asset Rows */}
                            <div className="space-y-2">
                                {filteredAssets.length > 0 ? (
                                    filteredAssets.map((asset, i) => (
                                        <div key={i} className="grid grid-cols-12 items-center px-6 py-4 bg-[#0A1014]/40 border border-white/5 rounded-2xl hover:bg-[#0A1014]/80 hover:border-[#00FF9D]/20 transition-all group">
                                            {/* Symbol */}
                                            <div className="col-span-4 flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-full bg-white/5 p-1">
                                                    {/* ✅ USING LOCAL ICONS */}
                                                    <CryptoIcon symbol={asset.symbol} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white text-sm">{asset.symbol}</span>
                                                    <span className="text-[10px] text-gray-500 hidden md:block">Crypto</span>
                                                </div>
                                            </div>

                                            {/* Value - SAFE ACCESS */}
                                            <div className="col-span-3 font-medium text-white text-sm">
                                                ${(asset.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </div>

                                            {/* Count - SAFE ACCESS */}
                                            <div className="col-span-3 font-medium text-gray-400 text-sm">
                                                {(asset.balance || asset.count || 0).toFixed(4)}
                                            </div>

                                            {/* Change - SAFE ACCESS */}
                                            <div className={`col-span-2 text-right font-bold text-sm ${(asset.change || 0) >= 0 ? 'text-[#00FF9D]' : 'text-red-500'}`}>
                                                {(asset.change || 0) > 0 ? '+' : ''}{asset.change || 0}%
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        No assets found matching "{searchQuery}"
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
};

export default Portfolio;
