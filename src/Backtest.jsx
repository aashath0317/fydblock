import React, { useState, useEffect, useRef } from 'react';
import {
    Play, Pause, RotateCcw,
    Bell, Plus, Search, Loader2, BarChart2,
    Calendar, DollarSign, Download, Save, Bot
} from 'lucide-react';
import Dash_nav from './Dash_nav';
import API_BASE_URL from './config';

// --- COMPONENT: ANIMATED CHART ---
const AnimatedBacktestChart = ({ data }) => {
    if (!data || data.length === 0) return (
        <div className="h-full flex flex-col items-center justify-center text-gray-600">
            <BarChart2 size={48} className="mb-4 opacity-20" />
            <p>Ready to start simulation</p>
        </div>
    );

    const width = 800;
    const height = 300;
    const padding = 40;

    const allPrices = data.map(d => d.price);
    const maxPrice = Math.max(...allPrices) * 1.02;
    const minPrice = Math.min(...allPrices) * 0.98;
    const range = maxPrice - minPrice || 1;

    const points = data.map((d, i) => {
        const x = padding + (i / (data.length - 1 || 1)) * (width - 2 * padding);
        const y = height - padding - ((d.price - minPrice) / range) * (height - 2 * padding);
        return { x, y, ...d };
    });

    const linePath = "M " + points.map(p => `${p.x},${p.y}`).join(" L ");
    const areaPath = `${linePath} L ${points[points.length - 1]?.x},${height} L ${padding},${height} Z`;

    return (
        <div className="w-full h-full relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00FF9D" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00FF9D" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {[0.25, 0.5, 0.75].map(t => (
                    <line
                        key={t}
                        x1={padding} y1={height - padding - (t * (height - 2 * padding))}
                        x2={width - padding} y2={height - padding - (t * (height - 2 * padding))}
                        stroke="#ffffff10"
                    />
                ))}

                <path d={areaPath} fill="url(#chartGradient)" />
                <path d={linePath} fill="none" stroke="#00FF9D" strokeWidth="2" vectorEffect="non-scaling-stroke" />

                {points.filter(p => p.action).map((p, i) => (
                    <circle
                        key={i} cx={p.x} cy={p.y} r="3"
                        fill={p.action === 'buy' ? '#00FF9D' : '#EF4444'}
                        stroke="#000" strokeWidth="1"
                    />
                ))}

                {points.length > 0 && (
                    <line
                        x1={points[points.length - 1].x} y1={padding}
                        x2={points[points.length - 1].x} y2={height - padding}
                        stroke="white" strokeDasharray="4 4" opacity="0.3"
                    />
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

    // --- STATE: CONFIGURATION ---
    const [config, setConfig] = useState({
        pair: 'BTC/USDT',
        startDate: '2023-01-01',
        endDate: new Date().toISOString().split('T')[0], // Default: Today
        capital: 1000,
        upperPrice: 60000,
        lowerPrice: 30000,
        gridSize: 20
    });

    const [loading, setLoading] = useState(false);

    // --- STATE: ANIMATION & DATA ---
    const [fullData, setFullData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(50);
    const [finalStats, setFinalStats] = useState(null);
    const [savedBacktests, setSavedBacktests] = useState([]);

    const animationRef = useRef();

    // 1. FETCH DATA ON LOAD
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const historyRes = await fetch(`${API_BASE_URL}/user/backtests`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (historyRes.ok) setSavedBacktests(await historyRes.json());

                const botsRes = await fetch(`${API_BASE_URL}/user/bots`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (botsRes.ok) {
                    const botsData = await botsRes.json();
                    setUserBots(botsData);
                }

                const systemRes = await fetch(`${API_BASE_URL}/user/available-bots`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (systemRes.ok) {
                    const systemData = await systemRes.json();
                    setSystemBots(systemData);
                }

            } catch (e) { console.error(e); }
        };
        fetchData();
    }, []);

    // 2. HANDLE BOT SELECTION
    const handleSelectBot = (e) => {
        const botId = e.target.value;
        setSelectedBotId(botId);

        if (botId === "") return;

        let selectedBot = userBots.find(b => (b.bot_id || b.id).toString() === botId);
        if (!selectedBot) {
            selectedBot = systemBots.find(b => (b.bot_id || b.id).toString() === botId);
        }

        if (selectedBot) {
            let botConfig = {};
            try {
                botConfig = typeof selectedBot.config === 'string'
                    ? JSON.parse(selectedBot.config)
                    : selectedBot.config;
            } catch (err) {
                console.error("Error parsing bot config", err);
            }

            setConfig(prev => ({
                ...prev,
                pair: selectedBot.quote_currency ? `${selectedBot.quote_currency}/USDT` : 'BTC/USDT',
                upperPrice: botConfig.upperPrice || botConfig.upper_price || prev.upperPrice,
                lowerPrice: botConfig.lowerPrice || botConfig.lower_price || prev.lowerPrice,
                gridSize: botConfig.gridSize || botConfig.grids || prev.gridSize,
                capital: botConfig.investment || botConfig.capital || prev.capital
            }));
        }
    };

    // 3. RUN BACKTEST
    const handleRunBacktest = async () => {
        setLoading(true);
        setIsPlaying(false);
        setDisplayedData([]);
        setFullData([]);
        setCurrentIndex(0);
        setFinalStats(null);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/backtest/run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(config)
            });

            const data = await res.json();

            if (data.status === 'success') {
                setFullData(data.chartData);
                setFinalStats(data.stats);
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

    // 4. ANIMATION LOOP
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

    // 5. SYNC DATA
    useEffect(() => {
        if (fullData.length > 0) {
            const currentSlice = fullData.slice(0, currentIndex + 1);
            setDisplayedData(currentSlice);
        }
    }, [currentIndex, fullData]);

    const reset = () => {
        setIsPlaying(false);
        setCurrentIndex(0);
    };

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00FF9D]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
            </div>

            <Dash_nav user={user} />

            <main className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-[#00FF9D]">Backtest Simulator</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014]/40 border border-white/10 flex items-center justify-center hover:border-[#00FF9D] transition-colors">
                            <Bell size={20} />
                        </button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-6 h-full pb-10">

                    {/* --- LEFT: CONFIG --- */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 shadow-xl relative z-10">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <RotateCcw size={18} className="text-[#00FF9D]" /> Configuration
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Select Bot Strategy</label>
                                    <div className="relative">
                                        <select
                                            value={selectedBotId}
                                            onChange={handleSelectBot}
                                            className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D] appearance-none cursor-pointer text-white"
                                        >
                                            <option value="">-- Start from Scratch --</option>
                                            {userBots.length > 0 && (
                                                <optgroup label="My Active Bots">
                                                    {userBots.map(bot => (
                                                        <option key={bot.bot_id || bot.id} value={bot.bot_id || bot.id}>
                                                            {bot.bot_name} ({bot.quote_currency || 'USDT'})
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            )}
                                            {systemBots.length > 0 && (
                                                <optgroup label="System Templates">
                                                    {systemBots.map(bot => (
                                                        <option key={bot.bot_id || bot.id} value={bot.bot_id || bot.id}>
                                                            {bot.bot_name} (Template)
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            )}
                                        </select>
                                        <Bot className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="border-t border-white/10 my-2"></div>

                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Pair</label>
                                    <div className="relative">
                                        <input type="text" value={config.pair} onChange={e => setConfig({ ...config, pair: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D]" />
                                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                                    </div>
                                </div>

                                {/* DATE RANGE SELECTOR */}
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Date Range</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="relative">
                                            <span className="text-[10px] text-gray-500 absolute -top-4 left-0">Start</span>
                                            <input type="date" value={config.startDate} onChange={e => setConfig({ ...config, startDate: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-2 py-3 outline-none focus:border-[#00FF9D] text-sm" />
                                        </div>
                                        <div className="relative">
                                            <span className="text-[10px] text-gray-500 absolute -top-4 left-0">End</span>
                                            <input type="date" value={config.endDate} onChange={e => setConfig({ ...config, endDate: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-2 py-3 outline-none focus:border-[#00FF9D] text-sm" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Upper Price</label>
                                        <input type="number" value={config.upperPrice} onChange={e => setConfig({ ...config, upperPrice: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-3 outline-none focus:border-[#00FF9D]" />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Lower Price</label>
                                        <input type="number" value={config.lowerPrice} onChange={e => setConfig({ ...config, lowerPrice: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-3 outline-none focus:border-[#00FF9D]" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Initial Capital</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input type="number" value={config.capital} onChange={e => setConfig({ ...config, capital: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg pl-8 pr-4 py-3 outline-none focus:border-[#00FF9D]" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Grid Size</label>
                                    <input type="number" value={config.gridSize} onChange={e => setConfig({ ...config, gridSize: e.target.value })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D]" />
                                </div>

                                <button onClick={handleRunBacktest} disabled={loading} className="w-full bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-3.5 rounded-xl transition-all flex justify-center items-center gap-2 mt-4 shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                                    {loading ? <Loader2 className="animate-spin" /> : 'Run Simulation'}
                                </button>
                            </div>
                        </div>

                        {/* Recent History */}
                        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 flex-1 relative z-10">
                            <h3 className="text-lg font-bold text-white mb-4">Saved Runs</h3>
                            <div className="space-y-3">
                                {savedBacktests.length === 0 && <p className="text-gray-600 text-sm italic">No history found.</p>}
                                {savedBacktests.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:border-[#00FF9D]/30 transition-all">
                                        <div>
                                            <p className="text-sm font-bold text-white">{item.pair}</p>
                                            <p className="text-xs text-[#00FF9D] font-bold">+${item.profit}</p>
                                        </div>
                                        <button className="text-gray-500 hover:text-white"><Download size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT: VISUALIZER --- */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 h-[450px] relative z-10 flex flex-col">
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
                                            <input
                                                type="range" min="10" max="200" step="10"
                                                value={210 - playbackSpeed}
                                                onChange={(e) => setPlaybackSpeed(210 - Number(e.target.value))}
                                                className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00FF9D]"
                                            />
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

                        {finalStats ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-[#0A1014] p-6 rounded-2xl border border-white/10">
                                    <p className="text-gray-500 text-xs font-bold uppercase mb-1">Total Profit</p>
                                    <p className={`text-3xl font-bold ${finalStats.totalProfit >= 0 ? 'text-[#00FF9D]' : 'text-red-500'}`}>
                                        ${finalStats.totalProfit}
                                    </p>
                                </div>
                                <div className="bg-[#0A1014] p-6 rounded-2xl border border-white/10">
                                    <p className="text-gray-500 text-xs font-bold uppercase mb-1">ROI</p>
                                    <p className={`text-3xl font-bold ${finalStats.roi >= 0 ? 'text-[#00FF9D]' : 'text-red-500'}`}>
                                        {finalStats.roi}%
                                    </p>
                                </div>
                                <div className="bg-[#0A1014] p-6 rounded-2xl border border-white/10">
                                    <p className="text-gray-500 text-xs font-bold uppercase mb-1">Total Trades</p>
                                    <p className="text-3xl font-bold text-white">{finalStats.totalTrades}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-3 gap-6 opacity-50">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-[#0A1014] p-6 rounded-2xl border border-white/5 h-24"></div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Backtest;
