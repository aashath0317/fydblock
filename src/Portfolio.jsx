import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, Plus, Search, ArrowUpRight, Loader2, X, Zap, CheckCircle2, ChevronDown, CircleDollarSign, FileText, CheckSquare, Square
} from 'lucide-react';
import API_BASE_URL from './config';
import Dash_nav from './Dash_nav';
import CreateBotModal from './CreateBotModal';
import { useTrading } from './context/TradingContext';

// --- CONSTANTS ---
const EXCHANGES = [
    { id: 'binance', name: 'Binance', logo: '/logos/BINANCE.png' },
    { id: 'bybit', name: 'Bybit', logo: '/logos/BYBIT.png' },
    { id: 'okx', name: 'OKX', logo: '/logos/OKX.jpg' },
];

// --- HELPER COMPONENTS ---
const CryptoIcon = ({ symbol, className = "w-full h-full" }) => {
    const symbolLower = symbol?.toLowerCase() || 'btc';
    const remotePath = `https://assets.coincap.io/assets/icons/${symbolLower}@2x.png`;
    return (
        <img
            src={remotePath}
            alt={symbol}
            className={`object-contain rounded-full ${className}`}
            onError={(e) => { e.target.style.display = 'none'; }}
        />
    );
};

const SafeCoinIcon = ({ symbol, className }) => (
    <div className={`relative flex items-center justify-center bg-gray-800 rounded-full text-gray-500 overflow-hidden ${className}`}>
        <CryptoIcon symbol={symbol} className="w-full h-full" />
        <div className="absolute inset-0 -z-10 flex items-center justify-center bg-[#1A2023] text-[8px] font-bold text-gray-500">
            {symbol ? symbol.substring(0, 3) : '$'}
        </div>
    </div>
);

// --- COMPONENT: CONNECT EXCHANGE MODAL ---
const ConnectExchangeModal = ({ isOpen, onClose, onSuccess, defaultIsTestnet = false }) => {
    const [activeTab, setActiveTab] = useState('manual');
    const [selectedExchange, setSelectedExchange] = useState(EXCHANGES[0]);
    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [passphrase, setPassphrase] = useState('');
    const [isTestnet, setIsTestnet] = useState(defaultIsTestnet);
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => { setIsTestnet(defaultIsTestnet); }, [defaultIsTestnet, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!apiKey || !apiSecret) return alert("Please enter API Key and Secret");
        if (selectedExchange.id === 'okx' && !passphrase) return alert("Please enter Passphrase");

        setLoading(true);
        try {
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

            if (res.ok) { onSuccess(); onClose(); }
            else { alert("Connection failed. Please check your keys."); }
        } catch (error) { console.error(error); alert("Error connecting to server."); }
        finally { setLoading(false); }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0A1014]/90 backdrop-blur-2xl border border-white/10 w-full max-w-lg rounded-3xl p-8 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><X size={20} /></button>
                <h2 className="text-2xl font-bold text-white mb-6">Connect {isTestnet ? 'Paper' : 'Exchange'} API</h2>

                <div className="mb-6 relative">
                    <label className="block text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Select Exchange</label>
                    <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between cursor-pointer hover:border-[#00FF9D]/30">
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
                                    <img src={ex.logo} className="h-6 w-6 object-contain" />
                                    <span className="text-sm font-medium text-gray-200">{ex.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex bg-black/20 p-1 rounded-xl mb-6 border border-white/5">
                    <button onClick={() => setActiveTab('fast')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'fast' ? 'bg-[#00FF9D] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Fast Connect</button>
                    <button onClick={() => setActiveTab('manual')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'manual' ? 'bg-[#00FF9D] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Manual Entry</button>
                </div>

                {activeTab === 'fast' ? (
                    <div className="text-center py-8 bg-white/5 rounded-2xl border border-dashed border-white/5">
                        <div className="w-12 h-12 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center text-gray-500 mb-4"><Zap size={24} /></div>
                        <p className="text-sm text-gray-500">Fast Connect disabled. Use <b>Manual Entry</b>.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none" placeholder={`Enter ${selectedExchange.name} API Key`} />
                        <input type="password" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none" placeholder={`Enter ${selectedExchange.name} API Secret`} />
                        {selectedExchange.id === 'okx' && <input type="password" value={passphrase} onChange={(e) => setPassphrase(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-[#00FF9D] outline-none" placeholder="Enter OKX Passphrase" />}

                        <div className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors ${isTestnet ? 'bg-[#E2F708]/10 border-[#E2F708]/30' : 'bg-white/5 border-white/5 hover:bg-white/10'}`} onClick={() => setIsTestnet(!isTestnet)}>
                            {isTestnet ? <CheckSquare size={20} className="text-[#E2F708]" /> : <Square size={20} className="text-gray-500" />}
                            <div><p className={`text-sm font-bold ${isTestnet ? 'text-[#E2F708]' : 'text-gray-400'}`}>Connect to Testnet</p></div>
                        </div>

                        <button onClick={handleSubmit} disabled={loading} className={`w-full mt-4 font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 ${isTestnet ? 'bg-[#E2F708] hover:bg-[#d4e600] text-black' : 'bg-[#00FF9D] hover:bg-[#00cc7d] text-black'}`}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Connect"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ConnectApiOverlay = ({ onConnect, isPaper }) => (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050B0D]/80 backdrop-blur-md rounded-[32px] border border-white/5 transition-all">
        <div className="text-center animate-in fade-in zoom-in duration-300 p-8">
            <h3 className="text-2xl font-bold text-white mb-2">{isPaper ? "Connect Paper Trading" : "Connect Exchange"}</h3>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto text-sm">To see your portfolio, please connect your {isPaper ? "Testnet" : "Exchange"} API keys.</p>
            <button onClick={(e) => { e.stopPropagation(); onConnect(); }} className={`text-black font-bold py-3 px-8 rounded-full text-sm shadow-lg transition-all hover:scale-105 ${isPaper ? 'bg-[#E2F708] hover:bg-[#d4e600]' : 'bg-[#00FF9D] hover:bg-[#00cc7d]'}`}>
                {isPaper ? "Connect Testnet Key" : "Connect Exchange"}
            </button>
        </div>
    </div>
);

// --- COMPONENT: CHART ---
const PortfolioChart = ({ data, color = "#00FF9D" }) => {
    const containerRef = useRef(null);
    const [hoverIndex, setHoverIndex] = useState(null);
    const [hoverCoords, setHoverCoords] = useState({ x: 0, y: 0 });

    const pointsData = (data && data.length > 0) ? data : [0, 0, 0, 0, 0];
    const width = 800; const height = 220; const padding = 20;
    const minVal = Math.min(...pointsData); const maxVal = Math.max(...pointsData); const range = maxVal - minVal || 1;

    const getCoord = (index, value) => ({
        x: (index / (pointsData.length - 1)) * width,
        y: height - ((value - minVal) / range) * (height * 0.7) - padding
    });

    const points = pointsData.map((val, i) => getCoord(i, val));
    const smoothPath = points.reduce((acc, point, i, a) => {
        if (i === 0) return `M ${point.x},${point.y}`;
        const p0 = a[i - 1];
        const cp1x = p0.x + (point.x - p0.x) / 2; const cp1y = p0.y;
        const cp2x = p0.x + (point.x - p0.x) / 2; const cp2y = point.y;
        return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`;
    }, "");
    const areaPath = `${smoothPath} L ${width},${height} L 0,${height} Z`;

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const index = Math.round(mouseX / (rect.width / (points.length - 1)));
        if (index >= 0 && index < points.length) { setHoverIndex(index); setHoverCoords(points[index]); }
    };

    const leftPos = hoverIndex !== null ? `${(hoverCoords.x / width) * 100}%` : '0%';
    const topPos = hoverIndex !== null ? `${(hoverCoords.y / height) * 100}%` : '0%';

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-crosshair group" onMouseMove={handleMouseMove} onMouseLeave={() => setHoverIndex(null)}>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs><linearGradient id={`chartGradient-${color}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.2" /><stop offset="100%" stopColor={color} stopOpacity="0" /></linearGradient></defs>
                <path d={areaPath} fill={`url(#chartGradient-${color})`} stroke="none" />
                <path d={smoothPath} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
                {hoverIndex !== null && <line x1={hoverCoords.x} y1={0} x2={hoverCoords.x} y2={height} stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />}
            </svg>
            {hoverIndex !== null && (
                <>
                    <div className="absolute rounded-full pointer-events-none z-10 border-2 border-white" style={{ backgroundColor: color, width: '10px', height: '10px', left: leftPos, top: topPos, transform: 'translate(-50%, -50%)' }} />
                    <div className="absolute bg-[#0A1014] border text-white text-xs rounded-lg px-3 py-1.5 shadow-xl pointer-events-none z-20" style={{ borderColor: color, left: leftPos, top: topPos, transform: 'translate(-50%, -140%)' }}>
                        <p className="font-bold" style={{ color: color }}>${pointsData[hoverIndex].toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                    </div>
                </>
            )}
        </div>
    );
};

// --- MAIN PAGE ---
const Portfolio = () => {
    const navigate = useNavigate();
    const { isPaperTrading } = useTrading();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ name: "Trader", plan: "Pro Plan Active" });
    const [hasExchange, setHasExchange] = useState(false);

    const [connectModalTestnetDefault, setConnectModalTestnetDefault] = useState(false);
    const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [portfolioData, setPortfolioData] = useState({
        totalValue: 0, changePercent: 0, assets: [], history: [], isSimulated: false, error: null
    });

    const themeColor = isPaperTrading ? '#E2F708' : '#00FF9D';
    const themeTextClass = isPaperTrading ? 'text-[#E2F708]' : 'text-[#00FF9D]';
    const themeBadgeClass = isPaperTrading ? 'bg-[#E2F708]/20 text-[#E2F708]' : 'bg-[#00FF9D]/20 text-[#00FF9D]';

    const fetchPortfolio = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) return navigate('/signin');

        try {
            const userRes = await fetch(`${API_BASE_URL}/user/me`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser({ name: userData.user.full_name || "Trader", plan: "Pro Plan Active" });

                // STRICT CHECK: Do we have keys for the CURRENT mode?
                const isConnected = isPaperTrading ? userData.hasPaperExchange : userData.hasLiveExchange;
                setHasExchange(isConnected);

                const queryMode = isPaperTrading ? 'paper' : 'live';
                const portRes = await fetch(`${API_BASE_URL}/user/portfolio?mode=${queryMode}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (portRes.ok) {
                    const data = await portRes.json();

                    // If backend returns error (e.g. no keys), force disconnected state
                    if (data.error) {
                        console.warn("Portfolio Fetch Warning:", data.error);
                        setHasExchange(false);
                    }

                    setPortfolioData({
                        totalValue: data.totalValue || 0,
                        changePercent: data.changePercent || 0,
                        assets: data.assets || [],
                        history: (data.history && data.history.length > 0) ? data.history : [0, 0, 0, 0, 0],
                        isSimulated: false,
                        error: data.error
                    });
                }
            }
        } catch (error) { console.error("Network error:", error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchPortfolio(); }, [navigate, isPaperTrading]);

    const openConnectModal = () => {
        setConnectModalTestnetDefault(isPaperTrading);
        setIsConnectModalOpen(true);
    };

    const filteredAssets = (portfolioData.assets || []).filter(asset =>
        asset.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const isPositiveChange = (portfolioData.changePercent || 0) >= 0;

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className={`absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-70 mix-blend-screen transition-colors duration-700 ${isPaperTrading ? 'bg-[#E2F708]/20' : 'bg-[#00FF9D]/20'}`}></div>
            </div>

            <ConnectExchangeModal isOpen={isConnectModalOpen} onClose={() => setIsConnectModalOpen(false)} onSuccess={fetchPortfolio} defaultIsTestnet={connectModalTestnetDefault} />
            <CreateBotModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
            <Dash_nav user={user} />

            <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-10">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className={`text-3xl font-bold ${themeTextClass}`}>{isPaperTrading ? "Paper Portfolio" : "My Portfolio"}</h1>
                        {isPaperTrading && <span className="text-xs text-gray-400 mt-1">Testnet Environment</span>}
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={openConnectModal} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors">{hasExchange ? "Manage Keys" : "Connect Key"}</button>
                        <button onClick={() => setIsCreateModalOpen(true)} className={`text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 shadow-lg hover:scale-105 ${isPaperTrading ? 'bg-[#E2F708]' : 'bg-[#00FF9D]'}`}><Plus size={18} strokeWidth={3} /> New Bot</button>
                    </div>
                </header>

                {loading ? <div className="flex items-center justify-center h-[50vh]"><Loader2 className={`animate-spin ${themeTextClass}`} size={48} /></div> : (
                    <div className="w-full">
                        <div className="relative w-full bg-[#0A1014]/60 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden mb-12 shadow-2xl">
                            {!hasExchange && <ConnectApiOverlay onConnect={openConnectModal} isPaper={isPaperTrading} />}
                            <div className={`p-8 md:p-10 relative z-10 ${!hasExchange ? 'blur-md opacity-30 pointer-events-none' : ''}`}>
                                <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3"><div className="w-6 h-6 rounded bg-white flex items-center justify-center text-black font-bold text-xs">$</div><span className="text-gray-400 font-medium text-sm tracking-wide">Total Equity</span></div>
                                        <div className="flex items-baseline gap-4">
                                            <h2 className="text-4xl font-bold text-white tracking-tight">${(portfolioData.totalValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}</h2>
                                            {isPaperTrading && hasExchange && <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${themeBadgeClass}`}>Testnet API</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative w-full h-[250px] mb-6"><PortfolioChart data={portfolioData.history} color={themeColor} /></div>
                            </div>
                        </div>

                        <div className={`relative transition-all duration-500 ${!hasExchange ? 'blur-md opacity-30 pointer-events-none' : ''}`}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Assets</h3>
                                <div className="relative w-64"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} /><input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-full bg-[#0A1014]/50 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:border-opacity-50`} /></div>
                            </div>
                            <div className="grid grid-cols-12 px-6 py-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider"><div className="col-span-4">Symbol</div><div className="col-span-3">Value</div><div className="col-span-3">Balance</div><div className="col-span-2 text-right">Change</div></div>
                            <div className="space-y-2">
                                {filteredAssets.length > 0 ? filteredAssets.map((asset, i) => (
                                    <div key={i} className={`grid grid-cols-12 items-center px-6 py-4 bg-[#0A1014]/40 border border-white/5 rounded-2xl hover:bg-[#0A1014]/80 transition-all`}>
                                        <div className="col-span-4 flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-white/5 p-1"><SafeCoinIcon symbol={asset.symbol} className="w-6 h-6" /></div><span className="font-bold text-white text-sm">{asset.symbol}</span></div>
                                        <div className="col-span-3 font-medium text-white text-sm">${(asset.value || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                                        <div className="col-span-3 font-medium text-gray-400 text-sm">{(asset.balance || 0).toFixed(4)}</div>
                                        <div className={`col-span-2 text-right font-bold text-sm ${(asset.change || 0) >= 0 ? themeTextClass : 'text-red-500'}`}>{(asset.change || 0) > 0 ? '+' : ''}{asset.change || 0}%</div>
                                    </div>
                                )) : <div className="text-center py-12 text-gray-500 border border-white/5 rounded-2xl">No assets found</div>}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Portfolio;
