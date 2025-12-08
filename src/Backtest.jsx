// src/Backtest.jsx
import React, { useState, useEffect } from 'react';
import {
    Play, Calendar, DollarSign, BarChart2,
    ArrowDown, ArrowUp, Clock, RotateCcw,
    Save, Trash2, Download, CheckCircle2, AlertCircle, Loader2, Bell, Plus, Search
} from 'lucide-react';
import Dash_nav from './Dash_nav';
import API_BASE_URL from './config';

// --- HELPER: GENERATE MOCK CHART DATA ---
const generateChartData = (points = 50) => {
    let price = 150;
    return Array.from({ length: points }, (_, i) => {
        const change = (Math.random() - 0.45) * 5;
        price += change;
        return {
            date: `Day ${i + 1}`,
            price: Math.max(20, price),
            action: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'buy' : 'sell') : null
        };
    });
};

// --- COMPONENT: CUSTOM CHART (SVG) ---
const BacktestChart = ({ data }) => {
    if (!data || data.length === 0) return null;

    const width = 800;
    const height = 300;
    const padding = 40;

    const maxPrice = Math.max(...data.map(d => d.price));
    const minPrice = Math.min(...data.map(d => d.price));
    const range = maxPrice - minPrice;

    const points = data.map((d, i) => {
        const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
        const y = height - padding - ((d.price - minPrice) / range) * (height - 2 * padding);
        return { x, y, ...d };
    });

    const linePath = "M " + points.map(p => `${p.x},${p.y}`).join(" L ");
    const areaPath = `${linePath} L ${width - padding},${height} L ${padding},${height} Z`;

    const gridLines = [0, 0.25, 0.5, 0.75, 1].map(t => {
        const val = minPrice + range * t;
        const y = height - padding - (t * (height - 2 * padding));
        return { val, y };
    });

    return (
        <div className="w-full h-full relative">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00FF9D" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00FF9D" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {gridLines.map((line, i) => (
                    <g key={i}>
                        <line x1={padding} y1={line.y} x2={width - padding} y2={line.y} stroke="#ffffff10" />
                        <text x={0} y={line.y + 4} fill="#666" fontSize="10" fontFamily="monospace">
                            ${line.val.toFixed(0)}
                        </text>
                    </g>
                ))}

                <path d={areaPath} fill="url(#chartGradient)" />
                <path d={linePath} fill="none" stroke="#00FF9D" strokeWidth="2" />

                {points.filter(p => p.action).map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="3"
                        fill={p.action === 'buy' ? '#00FF9D' : '#EF4444'}
                        stroke="#000"
                        strokeWidth="1"
                    />
                ))}
            </svg>
        </div>
    );
};

const Backtest = () => {
    const [user] = useState({ name: "Trader", plan: "Pro Plan Active" });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // --- STATE: CONFIGURATION ---
    const [config, setConfig] = useState({
        strategy: 'Spot Grid',
        pair: 'SOL/USDT',
        startDate: '2024-04-17',
        endDate: '2025-01-09',
        capital: 1000,
        upperPrice: 240,
        lowerPrice: 110.17,
        gridSize: 30
    });

    // --- STATE: RESULTS & HISTORY ---
    const [result, setResult] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [savedBacktests, setSavedBacktests] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch(`${API_BASE_URL}/user/backtests`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setSavedBacktests(data.slice(0, 3));
            }
        } catch (err) {
            console.error("Failed to fetch history", err);
            setSavedBacktests([
                { id: 1, pair: 'SOL/USDT', profit: 2350, date: 'Dec 6, 10:10 AM' },
                { id: 2, pair: 'BTC/USDT', profit: -120, date: 'Dec 5, 2:30 PM' },
            ]);
        }
    };

    const handleRunBacktest = async () => {
        setLoading(true);
        setResult(null);

        setTimeout(async () => {
            const mockChart = generateChartData(40);
            const totalProfit = (Math.random() * 500) + 100;
            const trades = Math.floor(Math.random() * 50) + 20;

            const newResult = {
                totalProfit: totalProfit.toFixed(2),
                maxDrawdown: (Math.random() * 15).toFixed(2),
                totalTrades: trades,
                history: Array.from({ length: 5 }, (_, i) => ({
                    time: `10:00:${10 + i} AM`,
                    type: i % 2 === 0 ? 'Buy' : 'Sell',
                    price: (130 + i).toFixed(2),
                    amount: 50,
                    profit: (Math.random()).toFixed(2)
                }))
            };

            setChartData(mockChart);
            setResult(newResult);
            setLoading(false);

            await saveBacktestToDB(newResult);

        }, 1500);
    };

    const saveBacktestToDB = async (runResult) => {
        setSaving(true);
        const token = localStorage.getItem('token');
        const newEntry = {
            pair: config.pair,
            strategy: config.strategy,
            profit: runResult.totalProfit,
            config: config,
            date: new Date().toLocaleString()
        };

        try {
            if (savedBacktests.length >= 3) {
                // Determine ID to delete
            }

            const res = await fetch(`${API_BASE_URL}/user/backtest/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newEntry)
            });

            if (res.ok) {
                fetchHistory();
            } else {
                const updatedList = [newEntry, ...savedBacktests].slice(0, 3);
                setSavedBacktests(updatedList);
            }
        } catch (err) {
            console.error("Save failed", err);
            const updatedList = [newEntry, ...savedBacktests].slice(0, 3);
            setSavedBacktests(updatedList);
        } finally {
            setSaving(false);
        }
    };

    const loadBacktest = (item) => {
        alert(`Restoring configuration for ${item.pair}...`);
    };

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">

            {/* Background Effects (MATCHING DASHBOARD EXACTLY) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00FF9D]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute bottom-[-30%] left-[20%] w-[60vw] h-[50vh] bg-[#00FF9D]/20 rounded-full blur-[180px] opacity-70"></div>
            </div>

            <Dash_nav user={user} />

            {/* FIXED: Removed md:ml-64 margin to fix left gap */}
            <main className="flex-1 p-4 md:p-8 overflow-y-auto relative z-10">

                {/* Header (MATCHING DASHBOARD & BOTS) */}
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-[#00FF9D] drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]">Backtest</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014]/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:border-[#00FF9D] transition-colors relative">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-[#00FF9D] rounded-full shadow-[0_0_5px_#00FF9D]"></div>
                        </button>
                        <button
                            className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]"
                        >
                            <Plus size={18} strokeWidth={3} />
                            New Bot
                        </button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-6 h-full pb-10">

                    {/* --- LEFT COL: CONFIGURATION --- */}
                    <div className="lg:col-span-4 flex flex-col gap-6">

                        {/* Config Card */}
                        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 shadow-xl relative z-10">
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <RotateCcw size={18} className="text-[#00FF9D]" />
                                Backtest Configuration
                            </h3>

                            <div className="space-y-5">
                                {/* Strategy */}
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Strategy</label>
                                    <select
                                        value={config.strategy}
                                        onChange={(e) => setConfig({ ...config, strategy: e.target.value })}
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00FF9D]"
                                    >
                                        <option>Spot Grid</option>
                                        <option>Futures DCA</option>
                                        <option>Infinity Grid</option>
                                    </select>
                                </div>

                                {/* Pair */}
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Pair</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={config.pair}
                                            onChange={(e) => setConfig({ ...config, pair: e.target.value })}
                                            className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00FF9D]"
                                        />
                                        <SearchIcon />
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Start Date</label>
                                        <input
                                            type="date"
                                            value={config.startDate}
                                            onChange={(e) => setConfig({ ...config, startDate: e.target.value })}
                                            className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-3 text-white text-xs outline-none focus:border-[#00FF9D]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">End Date</label>
                                        <input
                                            type="date"
                                            value={config.endDate}
                                            onChange={(e) => setConfig({ ...config, endDate: e.target.value })}
                                            className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-3 text-white text-xs outline-none focus:border-[#00FF9D]"
                                        />
                                    </div>
                                </div>

                                {/* Capital */}
                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Initial Capital</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                        <input
                                            type="number"
                                            value={config.capital}
                                            onChange={(e) => setConfig({ ...config, capital: e.target.value })}
                                            className="w-full bg-[#131B1F] border border-white/10 rounded-lg pl-8 pr-4 py-3 text-white outline-none focus:border-[#00FF9D]"
                                        />
                                    </div>
                                </div>

                                {/* Grid Params */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Upper Price</label>
                                        <input
                                            type="number"
                                            value={config.upperPrice}
                                            onChange={(e) => setConfig({ ...config, upperPrice: e.target.value })}
                                            className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00FF9D]"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Lower Price</label>
                                        <input
                                            type="number"
                                            value={config.lowerPrice}
                                            onChange={(e) => setConfig({ ...config, lowerPrice: e.target.value })}
                                            className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00FF9D]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs text-gray-500 font-bold uppercase mb-2 block">Grid Size</label>
                                    <input
                                        type="number"
                                        value={config.gridSize}
                                        onChange={(e) => setConfig({ ...config, gridSize: e.target.value })}
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#00FF9D]"
                                    />
                                </div>

                                <button
                                    onClick={handleRunBacktest}
                                    disabled={loading}
                                    className="w-full bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)] transition-all flex justify-center items-center gap-2 mt-4"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : 'Run Backtest'}
                                </button>
                            </div>
                        </div>

                        {/* Recent Backtests Card (Database List) */}
                        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 flex-1 relative z-10">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-white">Recent Backtests</h3>
                                <span className="text-xs text-gray-500">{savedBacktests.length}/3 Saved</span>
                            </div>

                            <div className="space-y-3">
                                {savedBacktests.length === 0 && <p className="text-gray-600 text-sm italic">No saved data.</p>}
                                {savedBacktests.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5 hover:border-[#00FF9D]/30 transition-all group">
                                        <div>
                                            <p className="text-sm font-bold text-white">
                                                {item.pair} <span className="text-[#00FF9D]">Grid</span>
                                            </p>
                                            <p className={`text-xs ${item.profit >= 0 ? 'text-[#00FF9D]' : 'text-red-500'}`}>
                                                {item.profit >= 0 ? '+' : ''}${item.profit} • <span className="text-gray-500">{item.date}</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => loadBacktest(item)}
                                            className="text-gray-500 hover:text-[#00FF9D] transition-colors flex items-center gap-1 text-xs font-bold"
                                        >
                                            <Download size={14} /> Load
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* --- RIGHT COL: RESULTS --- */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* Chart Card */}
                        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 h-[400px] relative z-10">
                            <h3 className="text-lg font-bold text-white mb-4">Backtest Results</h3>

                            {loading ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10 rounded-2xl">
                                    <Loader2 className="animate-spin text-[#00FF9D] mb-4" size={48} />
                                    <p className="text-[#00FF9D] font-bold animate-pulse">Running Simulation...</p>
                                </div>
                            ) : !result ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-600">
                                    <BarChart2 size={48} className="mb-4 opacity-20" />
                                    <p>Run a backtest to see results</p>
                                </div>
                            ) : (
                                <BacktestChart data={chartData} />
                            )}
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                            <StatCard
                                title="Total Profit"
                                value={result ? `$${result.totalProfit}` : '$0.00'}
                                color={result?.totalProfit >= 0 ? "text-[#00FF9D]" : "text-red-500"}
                            />
                            <StatCard
                                title="Max Drawdown"
                                value={result ? `${result.maxDrawdown}%` : '0.00%'}
                                color="text-red-500"
                            />
                            <StatCard
                                title="Total Trades"
                                value={result ? result.totalTrades : '0'}
                                color="text-white"
                            />
                        </div>

                        {/* Trade History Table */}
                        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6 flex-1 overflow-hidden relative z-10">
                            <h3 className="text-lg font-bold text-white mb-4">Trade History</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-gray-500 uppercase bg-white/5">
                                        <tr>
                                            <th className="px-6 py-3 rounded-l-lg">Time</th>
                                            <th className="px-6 py-3">Type</th>
                                            <th className="px-6 py-3">Price</th>
                                            <th className="px-6 py-3">Amount</th>
                                            <th className="px-6 py-3 rounded-r-lg text-right">Profit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {result?.history.map((row, index) => (
                                            <tr key={index} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-300">{row.time}</td>
                                                <td className={`px-6 py-4 font-bold ${row.type === 'Buy' ? 'text-[#00FF9D]' : 'text-red-500'}`}>
                                                    {row.type}
                                                </td>
                                                <td className="px-6 py-4 text-white">${row.price}</td>
                                                <td className="px-6 py-4 text-gray-400">${row.amount}</td>
                                                <td className="px-6 py-4 text-right text-[#00FF9D]">+${row.profit}</td>
                                            </tr>
                                        )) || (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-600 italic">No trades recorded</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
};

// --- SUB-COMPONENTS ---
const StatCard = ({ title, value, color }) => (
    <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-6">
        <p className="text-gray-500 text-xs font-bold uppercase mb-2">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
);

const SearchIcon = () => (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
    </div>
);

export default Backtest;
