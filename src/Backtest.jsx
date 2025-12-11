import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
    Play, Pause, RotateCcw,
    Bell, Search, Loader2, BarChart2, Bot, FastForward, ChevronDown, Check
} from 'lucide-react';
import Dash_nav from './Dash_nav';
import API_BASE_URL from './config';

// --- DATA: PAIRS & PRIORITY (Utility Code) ---
const RAW_PAIRS_LIST = `SOL to USDT, BTC to USDT, ETH to USDT, BNB to USDT, XRP to USDT, ADA to USDT, AVAX to USDT, DOGE to USDT, DOT to USDT, LINK to USDT, TRX to USDT, MATIC to USDT, UNI to USDT, LTC to USDT, BCH to USDT, NEAR to USDT, APT to USDT, TUSD to USDT, WBTC to USDT, PAXG to USDT, SC to USDT, SFP to USDT, QTUM to USDT, CAKE to USDT, THETA to USDT, UMA to USDT, DODO to USDT, DENT to USDT, WIN to USDT, PUNDIX to USDT, CHZ to USDT, CTSI to USDT, DGB to USDT, CHR to USDT, RUNE to USDT, MANA to USDT, BAKE to USDT, KAVA to USDT, VTHO to USDT, PSG to USDT, FLOKI to USDT, AR to USDT, SPELL to USDT, MBOX to USDT, KDA to USDT, PYR to USDT, DYDX to USDT, MOVR to USDT, ROSE to USDT, YGG to USDT, IMX to USDT, JOE to USDT, CVX to USDT, FLOW to USDT, ILV to USDT, IOTA to USDT, AUDIO to USDT, STG to USDT, METIS to USDT, XDC to USDT, GMX to USDT, GNO to USDT, LQTY to USDT, TWT to USDT, CELR to USDT, ENS to USDT, BONK to USDT, BLUR to USDT, TON to USDT, CFX to USDT, PEPE to USDT, SUI to USDT, ACH to USDT, RSR to USDT, SKL to USDT, MDT to USDT, ARPA to USDT, INJ to USDT, SYS to USDT, MINA to USDT, MAGIC to USDT, TURBO to USDT, ORDI to USDT, PHB to USDT, ANKR to USDT, HOT to USDT, WOO to USDT, BICO to USDT, ASTR to USDT, DUSK to USDT, MAV to USDT, CKB to USDT, XVG to USDT, ID to USDT, RDNT to USDT, PENDLE to USDT, ARKM to USDT, WLD to USDT, HFT to USDT, CYBER to USDT, SEI to USDT, KMD to USDT, LPT to USDT, OG to USDT, HIFI to USDT, FDUSD to USDT, GMT to USDT, AVA to USDT, FORTH to USDT, MLN to USDT, MTL to USDT, EDU to USDT, API3 to USDT, JASMY to USDT, HIGH to USDT, SSV to USDT, QNT to USDT, FIDA to USDT, TIA to USDT, MEME to USDT, VIC to USDT, PYTH to USDT, JTO to USDT, 1000SATS to USDT, ACE to USDT, DATA to USDT, XAI to USDT, MANTA to USDT, JUP to USDT, RAY to USDT, STRK to USDT, ALT to USDT, PIXEL to USDT, WIF to USDT, SUPER to USDT, BOME to USDT, W to USDT, ENA to USDT, TAO to USDT, JST to USDT, SUN to USDT, BB to USDT, OM to USDT, PEOPLE to USDT, RLC to USDT, POLYX to USDT, PHA to USDT, IOST to USDT, SLP to USDT, ZK to USDT, ZRO to USDT, IO to USDT, ETHFI to USDT, LISTA to USDT, REZ to USDT, VANRY to USDT, NTRN to USDT, PORTAL to USDT, AXL to USDT, DYM to USDT, GLM to USDT, BANANA to USDT, RENDER to USDT, DOGS to USDT, POL to USDT, SLF to USDT, NEIRO to USDT, CATI to USDT, HMSTR to USDT, EIGEN to USDT, ACT to USDT, PNUT to USDT, ME to USDT, MOVE to USDT, PENGU to USDT, CETUS to USDT, COW to USDT, ACX to USDT, LUMIA to USDT, ORCA to USDT, DEGO to USDT, TNSR to USDT, AGLD to USDT, G to USDT, PIVX to USDT, UTK to USDT, XVS to USDT, VELODROME to USDT, TRUMP to USDT, USDQ to USDT, EURQ to USDT, WCT to USDT, A to USDT, USDR to USDT, EURR to USDT, WLFI to USDT, XEC to USDT, TRB to USDT, MBL to USDT, AEVO to USDT, 1INCH to USDT`;

const PRIORITY_COINS = ['SOL', 'BTC', 'ETH', 'BNB', 'XRP', 'DOGE', 'ADA'];

const getSortedPairs = () => {
    const pairs = RAW_PAIRS_LIST.split(',').map(p => p.trim().replace(' to ', '/'));
    return pairs.sort((a, b) => {
        const baseA = a.split('/')[0];
        const baseB = b.split('/')[0];
        const idxA = PRIORITY_COINS.indexOf(baseA);
        const idxB = PRIORITY_COINS.indexOf(baseB);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.localeCompare(b);
    });
};

const ALL_PAIRS = getSortedPairs();

// --- COMPONENT: ANIMATED CHART WITH AXIS ---
const AnimatedBacktestChart = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="h-full flex flex-col items-center justify-center text-gray-600">
            <BarChart2 size={48} className="mb-4 opacity-20" />
            <p>Ready to start simulation</p>
        </div>
    );

    const width = 1200;
    const height = 400;
    const padding = { top: 20, right: 60, bottom: 30, left: 10 };

    // 1. Calculate Price Range (Y-Axis)
    const allPrices = data.map(d => d.price);
    const maxPrice = Math.max(...allPrices) * 1.002;
    const minPrice = Math.min(...allPrices) * 0.998;
    const priceRange = maxPrice - minPrice || 1;

    // 2. Map Data Points
    const points = data.map((d, i) => {
        const x = padding.left + (i / (data.length - 1 || 1)) * (width - padding.left - padding.right);
        const y = height - padding.bottom - ((d.price - minPrice) / priceRange) * (height - padding.top - padding.bottom);
        return { x, y, ...d };
    });

    // 3. Generate Path strings
    const linePath = "M " + points.map(p => `${p.x},${p.y}`).join(" L ");
    const areaPath = `${linePath} L ${points[points.length - 1]?.x},${height - padding.bottom} L ${padding.left},${height - padding.bottom} Z`;

    // 4. Generate Y-Axis Labels
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => {
        const value = minPrice + t * priceRange;
        const y = height - padding.bottom - (t * (height - padding.top - padding.bottom));
        return { value, y };
    });

    // 5. Generate X-Axis Labels
    const xTickCount = 6;
    const xTicks = Array.from({ length: xTickCount }, (_, i) => {
        const index = Math.floor(i * (data.length - 1) / (xTickCount - 1));
        const point = points[index];
        if (!point) return null;
        return {
            x: point.x,
            label: point.date.split(' ')[0]
        };
    }).filter(Boolean);

    return (
        <div className="w-full h-full relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00FF9D" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00FF9D" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {yTicks.map((tick, i) => (
                    <g key={i}>
                        <line x1={padding.left} y1={tick.y} x2={width - padding.right} y2={tick.y} stroke="#ffffff10" strokeWidth="1" />
                        <text x={width - padding.right + 10} y={tick.y + 4} fill="#6B7280" fontSize="10" fontFamily="monospace">
                            ${tick.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </text>
                    </g>
                ))}

                {xTicks.map((tick, i) => (
                    <text key={i} x={tick.x} y={height - 10} fill="#6B7280" fontSize="10" textAnchor="middle" fontFamily="monospace">
                        {tick.label}
                    </text>
                ))}

                <path d={areaPath} fill="url(#chartGradient)" />
                <path d={linePath} fill="none" stroke="#00FF9D" strokeWidth="2" vectorEffect="non-scaling-stroke" />

                {points.filter(p => p.action).map((p, i) => (
                    <g key={i}>
                        <circle cx={p.x} cy={p.y} r="4" fill={p.action === 'buy' ? '#00FF9D' : '#EF4444'} stroke="#000" strokeWidth="1" />
                    </g>
                ))}

                {points.length > 0 && (
                    <line x1={padding.left} y1={points[points.length - 1].y} x2={width - padding.right} y2={points[points.length - 1].y} stroke="white" strokeDasharray="4 4" opacity="0.3" />
                )}
            </svg>
        </div>
    );
};

const Backtest = () => {
    const [user] = useState({ name: "Trader", plan: "Pro Plan Active" });

    // --- STATE: BOTS LISTS ---
    const [userBots, setUserBots] = useState([]);
    const [systemBots, setSystemBots] = useState([]);
    const [selectedBotId, setSelectedBotId] = useState('');

    // --- STATE: DROPDOWNS & MODES ---
    const [isPairOpen, setIsPairOpen] = useState(false);
    const [pairSearch, setPairSearch] = useState('');
    const [isPriceLoading, setIsPriceLoading] = useState(false);
    const [mode, setMode] = useState('auto'); // 'auto' | 'manual'
    const [riskLevel, setRiskLevel] = useState('high'); // 'high'|'medium'|'low'

    // --- STATE: CONFIGURATION ---
    const [config, setConfig] = useState({
        pair: 'BTC/USDT',
        timeframe: '1h',
        startDate: '2023-01-01',
        endDate: new Date().toISOString().split('T')[0],
        capital: 1000,
        upperPrice: 0,
        lowerPrice: 0,
        gridSize: 20,
        trailingUp: false,
        trailingDown: false
    });

    const [loading, setLoading] = useState(false);

    // --- STATE: ANIMATION & DATA ---
    const [fullData, setFullData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [tradeHistory, setTradeHistory] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(50);
    const [finalStats, setFinalStats] = useState(null);

    const animationRef = useRef();

    // 1. FETCH DATA ON LOAD
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const botsRes = await fetch(`${API_BASE_URL}/user/bots`, { headers: { 'Authorization': `Bearer ${token}` } });
                if (botsRes.ok) setUserBots(await botsRes.json());

                const systemRes = await fetch(`${API_BASE_URL}/user/available-bots`, { headers: { 'Authorization': `Bearer ${token}` } });
                if (systemRes.ok) setSystemBots(await systemRes.json());
            } catch (e) { console.error(e); }
        };
        fetchData();
    }, []);

    // 2. AUTO FETCH PRICE WHEN PAIR CHANGES
    useEffect(() => {
        const fetchPriceAndSetRange = async () => {
            if (!config.pair) return;
            setIsPriceLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/user/market-data?exchange=binance&symbol=${config.pair}`);
                if (res.ok) {
                    const data = await res.json();
                    const currentPrice = data.price || (data.bid + data.ask) / 2;

                    if (currentPrice > 0 && mode === 'manual') {
                        // Only set defaults if manual mode, otherwise Auto calculates in backend
                        setConfig(prev => ({
                            ...prev,
                            upperPrice: parseFloat((currentPrice * 1.10).toFixed(4)),
                            lowerPrice: parseFloat((currentPrice * 0.90).toFixed(4))
                        }));
                    }
                }
            } catch (error) { console.error("Failed to fetch live price:", error); }
            finally { setIsPriceLoading(false); }
        };
        const timeout = setTimeout(fetchPriceAndSetRange, 500);
        return () => clearTimeout(timeout);
    }, [config.pair, mode]);

    const filteredPairs = useMemo(() => {
        return ALL_PAIRS.filter(pair => pair.toLowerCase().includes(pairSearch.toLowerCase()));
    }, [pairSearch]);

    // 3. HANDLE BOT SELECTION
    const handleSelectBot = (e) => {
        const botId = e.target.value;
        setSelectedBotId(botId);
        if (botId === "") return;

        let selectedBot = userBots.find(b => (b.bot_id || b.id).toString() === botId) ||
            systemBots.find(b => (b.bot_id || b.id).toString() === botId);

        if (selectedBot) {
            let botConfig = {};
            try {
                botConfig = typeof selectedBot.config === 'string' ? JSON.parse(selectedBot.config) : selectedBot.config;
            } catch (err) { console.error("Error parsing config", err); }

            setConfig(prev => ({
                ...prev,
                pair: selectedBot.quote_currency ? `${selectedBot.quote_currency}/USDT` : 'BTC/USDT',
                gridSize: botConfig.gridSize || botConfig.grids || prev.gridSize,
                capital: botConfig.investment || botConfig.capital || prev.capital
            }));
        }
    };

    // 4. RUN BACKTEST
    const handleRunBacktest = async () => {
        if (!selectedBotId) return alert("Please select a Bot Strategy first.");

        setLoading(true);
        setIsPlaying(false);
        setDisplayedData([]);
        setFullData([]);
        setTradeHistory([]);
        setCurrentIndex(0);
        setFinalStats(null);

        // Prepare Payload
        const payload = {
            ...config,
            riskPercentage: mode === 'auto'
                ? (riskLevel === 'high' ? 0.10 : riskLevel === 'medium' ? 0.20 : 0.30)
                : 0,
            upperPrice: mode === 'manual' ? config.upperPrice : 0,
            lowerPrice: mode === 'manual' ? config.lowerPrice : 0,
            trailingUp: mode === 'manual' ? config.trailingUp : false,
            trailingDown: mode === 'manual' ? config.trailingDown : false,
        };

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/backtest/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (data.status === 'success') {
                setFullData(data.chartData);
                setFinalStats(data.stats);
                setTradeHistory(data.history || []);
                setIsPlaying(true);
            } else {
                alert("Backtest failed: " + (data.message || "Unknown error"));
            }
        } catch (err) {
            console.error(err);
            alert("Connection error. Ensure backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleSkip = () => {
        setIsPlaying(false);
        if (fullData.length > 0) setCurrentIndex(fullData.length - 1);
    };

    // 5. ANIMATION LOOP
    useEffect(() => {
        if (isPlaying && fullData.length > 0) {
            animationRef.current = setInterval(() => {
                setCurrentIndex(prev => {
                    if (prev >= fullData.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, playbackSpeed);
        } else {
            clearInterval(animationRef.current);
        }
        return () => clearInterval(animationRef.current);
    }, [isPlaying, fullData, playbackSpeed]);

    // 6. SYNC DATA
    useEffect(() => {
        if (fullData.length > 0) {
            const WINDOW_SIZE = 100;
            const start = Math.max(0, currentIndex - WINDOW_SIZE);
            setDisplayedData(fullData.slice(start, currentIndex + 1));
        }
    }, [currentIndex, fullData]);

    const reset = () => { setIsPlaying(false); setCurrentIndex(0); };
    const currentStats = displayedData.length > 0 ? displayedData[displayedData.length - 1] : null;

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">

            {/* Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00FF9D]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
            </div>

            <Dash_nav user={user} />

            <main className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-[#00FF9D]">Backtest Simulator</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014]/40 border border-white/10 flex items-center justify-center hover:border-[#00FF9D] transition-colors"><Bell size={20} /></button>
                    </div>
                </header>

                {/* --- CHART --- */}
                <div className="w-full mb-8">
                    <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 h-[550px] relative z-10 flex flex-col shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-white">Simulation Replay</h3>
                            {fullData.length > 0 && (
                                <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                    <button onClick={reset} title="Reset"><RotateCcw size={16} className="text-gray-400 hover:text-white" /></button>
                                    <button onClick={() => setIsPlaying(!isPlaying)}>
                                        {isPlaying ? <Pause size={20} className="text-[#00FF9D]" /> : <Play size={20} className="text-[#00FF9D]" />}
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-500 uppercase font-bold">Speed</span>
                                        <input type="range" min="10" max="200" step="10" value={210 - playbackSpeed} onChange={(e) => setPlaybackSpeed(210 - Number(e.target.value))} className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00FF9D]" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 w-full overflow-hidden border border-white/5 rounded-xl bg-black/20 relative">
                            {loading && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
                                    <Loader2 className="animate-spin text-[#00FF9D] mb-2" size={48} />
                                    <p className="text-[#00FF9D] font-mono text-sm">Processing Historical Data...</p>
                                </div>
                            )}
                            <AnimatedBacktestChart data={displayedData} />
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 pb-10">

                    {/* --- CONFIGURATION --- */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 shadow-xl relative z-10 h-full">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <RotateCcw size={18} className="text-[#00FF9D]" /> Configuration
                            </h3>

                            <div className="space-y-4">
                                {/* Bot Selection */}
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Select Bot Strategy</label>
                                    <div className="relative">
                                        <select value={selectedBotId} onChange={handleSelectBot} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D] appearance-none cursor-pointer text-white">
                                            <option value="">-- Select a Strategy --</option>
                                            {userBots.length > 0 && <optgroup label="My Active Bots">{userBots.map(bot => <option key={bot.bot_id || bot.id} value={bot.bot_id || bot.id}>{bot.bot_name}</option>)}</optgroup>}
                                            {systemBots.length > 0 && <optgroup label="System Templates">{systemBots.map(bot => <option key={bot.bot_id || bot.id} value={bot.bot_id || bot.id}>{bot.bot_name}</option>)}</optgroup>}
                                        </select>
                                        <Bot className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="border-t border-white/10 my-2"></div>

                                {/* Mode Toggle */}
                                <div className="flex bg-[#131B1F] p-1 rounded-lg">
                                    <button onClick={() => setMode('auto')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${mode === 'auto' ? 'bg-[#00FF9D] text-black' : 'text-gray-400 hover:text-white'}`}>AUTO (AI)</button>
                                    <button onClick={() => setMode('manual')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${mode === 'manual' ? 'bg-[#00FF9D] text-black' : 'text-gray-400 hover:text-white'}`}>MANUAL</button>
                                </div>

                                {/* Pair & Timeframe */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Pair</label>
                                        <div className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-3 flex items-center justify-between cursor-pointer focus:border-[#00FF9D]" onClick={() => setIsPairOpen(!isPairOpen)}>
                                            <span className="text-white text-sm truncate">{config.pair}</span>
                                            <ChevronDown size={16} className="text-gray-500" />
                                        </div>
                                        {isPairOpen && (
                                            <div className="absolute top-full left-0 w-full mt-2 bg-[#1A2023] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden h-60 flex flex-col">
                                                <div className="p-2 border-b border-white/5">
                                                    <div className="flex items-center bg-black/30 rounded px-2 py-1.5 border border-white/5">
                                                        <Search size={14} className="text-gray-500 mr-2" />
                                                        <input type="text" autoFocus placeholder="SEARCH" className="bg-transparent text-xs text-white outline-none w-full uppercase" value={pairSearch} onChange={(e) => setPairSearch(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="overflow-y-auto flex-1">
                                                    {filteredPairs.map((p) => {
                                                        const isPriority = PRIORITY_COINS.some(c => p.startsWith(c + '/'));
                                                        return (
                                                            <div key={p} onClick={() => { setConfig({ ...config, pair: p }); setIsPairOpen(false); }} className={`px-4 py-2 text-xs cursor-pointer flex items-center justify-between hover:bg-white/5 ${config.pair === p ? 'text-[#00FF9D] bg-[#00FF9D]/5' : 'text-gray-300'}`}>
                                                                <span className={isPriority ? 'font-bold text-white' : ''}>{p}</span>
                                                                {isPriority && <span className="text-[10px] text-yellow-500">★</span>}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Timeframe</label>
                                        <select value={config.timeframe} onChange={e => setConfig({ ...config, timeframe: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-3 outline-none focus:border-[#00FF9D] text-white appearance-none cursor-pointer">
                                            <option value="5m">5m (Slow)</option>
                                            <option value="15m">15m</option>
                                            <option value="1h">1 Hour</option>
                                            <option value="4h">4 Hours</option>
                                            <option value="1d">1 Day</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Date Range</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative"><span className="text-[10px] text-gray-500 absolute -top-4 left-0">Start</span><input type="date" value={config.startDate} onChange={e => setConfig({ ...config, startDate: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-2 py-3 outline-none focus:border-[#00FF9D] text-sm" /></div>
                                        <div className="relative"><span className="text-[10px] text-gray-500 absolute -top-4 left-0">End</span><input type="date" value={config.endDate} onChange={e => setConfig({ ...config, endDate: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-2 py-3 outline-none focus:border-[#00FF9D] text-sm" /></div>
                                    </div>
                                </div>

                                {/* AUTO MODE: RISK LEVELS */}
                                {mode === 'auto' && (
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Risk Level</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <button onClick={() => setRiskLevel('high')} className={`py-3 rounded-lg border text-xs font-bold transition-all ${riskLevel === 'high' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-white/10 text-gray-400'}`}>High<br /><span className="text-[9px] opacity-70">±10% Range</span></button>
                                            <button onClick={() => setRiskLevel('medium')} className={`py-3 rounded-lg border text-xs font-bold transition-all ${riskLevel === 'medium' ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 'border-white/10 text-gray-400'}`}>Medium<br /><span className="text-[9px] opacity-70">±20% Range</span></button>
                                            <button onClick={() => setRiskLevel('low')} className={`py-3 rounded-lg border text-xs font-bold transition-all ${riskLevel === 'low' ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-white/10 text-gray-400'}`}>Low<br /><span className="text-[9px] opacity-70">±30% Range</span></button>
                                        </div>
                                    </div>
                                )}

                                {/* MANUAL MODE: PRICES & TRAILING */}
                                {mode === 'manual' && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4 relative">
                                            {isPriceLoading && <div className="absolute inset-0 bg-[#0A1014]/80 z-10 flex items-center justify-center rounded-lg"><Loader2 size={16} className="animate-spin text-[#00FF9D]" /></div>}
                                            <div><label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Upper Price</label><input type="number" value={config.upperPrice} onChange={e => setConfig({ ...config, upperPrice: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-3 outline-none focus:border-[#00FF9D]" /></div>
                                            <div><label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Lower Price</label><input type="number" value={config.lowerPrice} onChange={e => setConfig({ ...config, lowerPrice: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-3 outline-none focus:border-[#00FF9D]" /></div>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Trailing Features</label>
                                            <div className="flex gap-4">
                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${config.trailingUp ? 'bg-[#00FF9D] border-[#00FF9D]' : 'border-gray-600'}`}>{config.trailingUp && <Check size={12} className="text-black" />}</div>
                                                    <input type="checkbox" className="hidden" checked={config.trailingUp} onChange={e => setConfig({ ...config, trailingUp: e.target.checked })} />
                                                    <span className="text-xs text-gray-300 group-hover:text-white">Trailing Up</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${config.trailingDown ? 'bg-[#00FF9D] border-[#00FF9D]' : 'border-gray-600'}`}>{config.trailingDown && <Check size={12} className="text-black" />}</div>
                                                    <input type="checkbox" className="hidden" checked={config.trailingDown} onChange={e => setConfig({ ...config, trailingDown: e.target.checked })} />
                                                    <span className="text-xs text-gray-300 group-hover:text-white">Trailing Down</span>
                                                </label>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div><label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Initial Capital</label><input type="number" value={config.capital} onChange={e => setConfig({ ...config, capital: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg pl-3 pr-3 py-3 outline-none focus:border-[#00FF9D]" /></div>
                                <div><label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Grid Size</label><input type="number" value={config.gridSize} onChange={e => setConfig({ ...config, gridSize: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D]" /></div>

                                <button onClick={isPlaying ? handleSkip : handleRunBacktest} disabled={loading || !selectedBotId} className={`w-full font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 mt-4 ${isPlaying ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : !selectedBotId ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-[#00FF9D] hover:bg-[#00cc7d] text-black shadow-[0_0_20px_rgba(0,255,157,0.3)]'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {loading ? <Loader2 className="animate-spin" /> : isPlaying ? <><FastForward size={20} /> Skip Backtest</> : 'Run Simulation'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- STATS & LOGS --- */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#0A1014] p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                                <div className="relative z-10"><p className="text-gray-500 text-xs font-bold uppercase mb-1">Grid Profit (Realized)</p><p className="text-3xl font-bold text-[#00FF9D]"> +${(currentStats?.gridProfit || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p></div>
                                <div className="absolute bottom-0 left-0 h-1 bg-[#00FF9D] transition-all duration-300" style={{ width: `${Math.min((currentStats?.gridProfit || 0) / (config.capital * 0.5) * 100, 100)}%` }}></div>
                            </div>
                            <div className="bg-[#0A1014] p-6 rounded-2xl border border-white/10"><p className="text-gray-500 text-xs font-bold uppercase mb-1">Asset Value (Held)</p><p className="text-3xl font-bold text-blue-400">${(currentStats?.assetValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p><p className="text-xs text-gray-600 mt-1">Fluctuates with market price</p></div>
                            <div className="bg-[#0A1014] p-6 rounded-2xl border border-white/10"><p className="text-gray-500 text-xs font-bold uppercase mb-1">Total Equity</p><p className={`text-3xl font-bold ${(currentStats?.totalValue || config.capital) >= config.capital ? 'text-white' : 'text-red-500'}`}>${(currentStats?.totalValue || config.capital).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p></div>
                        </div>

                        {tradeHistory.length > 0 ? (
                            <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 flex-1 relative z-10 max-h-[400px] overflow-hidden flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-4">Trade Log</h3>
                                <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="sticky top-0 bg-[#0A1014] z-10 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                            <tr><th className="pb-3 pl-2">Time</th><th className="pb-3">Type</th><th className="pb-3">Price</th><th className="pb-3">Amount</th><th className="pb-3 text-right pr-2">Profit</th></tr>
                                        </thead>
                                        <tbody className="text-xs font-mono">
                                            {tradeHistory.map((trade, i) => (
                                                <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                                    <td className="py-2.5 pl-2 text-gray-400">{trade.time}</td>
                                                    <td className={`py-2.5 font-bold ${trade.type === 'Buy' ? 'text-[#00FF9D]' : 'text-red-500'}`}>{trade.type.toUpperCase()}</td>
                                                    <td className="py-2.5 text-white">${trade.price.toFixed(2)}</td>
                                                    <td className="py-2.5 text-gray-300">{trade.amount.toFixed(4)}</td>
                                                    <td className={`py-2.5 text-right pr-2 ${trade.profit > 0 ? 'text-[#00FF9D]' : 'text-gray-600'}`}>{trade.profit > 0 ? `+$${trade.profit.toFixed(2)}` : '-'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-gray-500 opacity-50"><Bot size={48} className="mb-4" /><p>Run simulation to see trade history</p></div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Backtest;
