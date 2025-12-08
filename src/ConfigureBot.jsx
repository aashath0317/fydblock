import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Bell, CheckCircle2, ChevronDown, Info } from 'lucide-react';
import Dash_nav from './Dash_nav';

// --- ANIMATED DCA CHART COMPONENT ---
const AnimatedDCAChart = ({ orders, priceDeviation }) => {
    // Generate points to simulate a price drop and buy orders
    // P0 is entry. P_last is the final safety order.
    const width = 400;
    const height = 200;
    const padding = 20;

    // Generate hypothetical data points based on inputs
    const points = Array.from({ length: Math.max(2, orders) }, (_, i) => {
        const x = padding + (i / (orders - 1)) * (width - 2 * padding);
        // Simulate price dropping by 'priceDeviation' percent per step
        // We map this to Y pixel coordinates (higher Y = lower price)
        const dropFactor = (i * priceDeviation * 5); // Scale effect for visual
        const y = padding + (dropFactor / 100) * (height - 2 * padding) + (height * 0.2);
        return { x, y, order: i + 1 };
    });

    const pathD = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const areaD = `${pathD} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

    return (
        <div className="w-full h-48 relative overflow-hidden bg-[#050B0D]/50 rounded-xl border border-white/5 mt-6">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
                <defs>
                    <linearGradient id="dcaGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00FF9D" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#00FF9D" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Animated Area Fill */}
                <path d={areaD} fill="url(#dcaGradient)" className="animate-in fade-in duration-1000" />

                {/* Animated Line */}
                <path
                    d={pathD}
                    fill="none"
                    stroke="#00FF9D"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]"
                />

                {/* Order Points (Dots) */}
                {points.map((p, i) => (
                    <g key={i} className="group">
                        <circle
                            cx={p.x}
                            cy={p.y}
                            r="4"
                            fill="#050B0D"
                            stroke="#00FF9D"
                            strokeWidth="2"
                            className="transition-all duration-300 group-hover:r-6"
                        />
                        {/* Tooltip-like Price Label */}
                        <text
                            x={p.x}
                            y={p.y - 12}
                            textAnchor="middle"
                            fill="#00FF9D"
                            fontSize="10"
                            className="opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                        >
                            Buy #{p.order}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Animation Overlay (Scanning effect) */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
    );
};

const ConfigureBot = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const botType = searchParams.get('type') || 'SPOT DCA';
    const [user] = useState({ name: "Akeel Aashath", plan: "Pro Plan Active" });

    // Form State
    const [config, setConfig] = useState({
        exchange: 'Binance',
        pair: 'BTC/USDT',
        investment: 1000,
        orders: 5,
        deviation: 2.0,
        takeProfit: 5.0,
        stopLoss: 10.0
    });

    // Derived Calculations for Preview
    const firstOrder = (config.investment / config.orders).toFixed(0);
    const lastOrderPriceDrop = (config.orders - 1) * config.deviation; // Simple approximation

    const handleCreate = () => {
        // Logic to save bot would go here
        alert("Bot Created Successfully!");
        navigate('/bots');
    };

    return (
        <div className="flex min-h-screen bg-[#020506] font-sans text-white selection:bg-[#00FF9D] selection:text-black">

            {/* Background Glows (Matching Dashboard) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vh] bg-[#00FF9D]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[10%] left-[20%] w-[30vw] h-[30vh] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
            </div>

            {/* Reused Sidebar */}
            <Dash_nav user={user} />

            <main className="flex-1 md:ml-64 p-6 md:p-10 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/bots')} className="text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-3xl font-bold text-white">Configure {botType.replace('_', ' ').toUpperCase()} Bot</h1>
                    </div>
                    <button className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2.5 px-6 rounded-xl shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                        + New Bot
                    </button>
                </header>

                <div className="grid lg:grid-cols-12 gap-8">

                    {/* --- LEFT COLUMN: BOT SETTINGS FORM --- */}
                    <div className="lg:col-span-7 bg-[#0A1014]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
                        <h2 className="text-xl font-bold text-white mb-6">Bot Settings</h2>

                        <div className="space-y-6">
                            {/* Exchange & Pair Row */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Exchange</label>
                                    <div className="relative">
                                        <select
                                            value={config.exchange}
                                            onChange={(e) => setConfig({ ...config, exchange: e.target.value })}
                                            className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] appearance-none cursor-pointer"
                                        >
                                            <option>Binance</option>
                                            <option>Bybit</option>
                                            <option>OKX</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Trading Pair</label>
                                    <div className="relative">
                                        <select
                                            value={config.pair}
                                            onChange={(e) => setConfig({ ...config, pair: e.target.value })}
                                            className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] appearance-none cursor-pointer"
                                        >
                                            <option>BTC/USDT</option>
                                            <option>ETH/USDT</option>
                                            <option>SOL/USDT</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Investment Amount */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Total Investment Amount</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={config.investment}
                                        onChange={(e) => setConfig({ ...config, investment: Number(e.target.value) })}
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] transition-all"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">USDT</span>
                                </div>
                            </div>

                            {/* Orders */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Number of Orders</label>
                                <input
                                    type="number"
                                    value={config.orders}
                                    onChange={(e) => setConfig({ ...config, orders: Number(e.target.value) })}
                                    className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] transition-all"
                                />
                            </div>

                            {/* Percentages Row 1 */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Price Deviation (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={config.deviation}
                                        onChange={(e) => setConfig({ ...config, deviation: Number(e.target.value) })}
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Take Profit (%)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={config.takeProfit}
                                        onChange={(e) => setConfig({ ...config, takeProfit: Number(e.target.value) })}
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Stop Loss */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Stop Loss (%)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={config.stopLoss}
                                    onChange={(e) => setConfig({ ...config, stopLoss: Number(e.target.value) })}
                                    className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] transition-all"
                                />
                            </div>

                            <button
                                onClick={handleCreate}
                                className="w-full bg-[#00FF9D] text-black font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:bg-[#00cc7d] hover:scale-[1.01] transition-all mt-4"
                            >
                                Create Bot
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: STRATEGY PREVIEW --- */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#0A1014]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sticky top-10">
                            <h2 className="text-xl font-bold text-white mb-6">Strategy Preview</h2>

                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <span className="text-gray-400">Total Investment:</span>
                                    <span className="font-bold text-white">{config.investment} USDT</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <span className="text-gray-400">Orders:</span>
                                    <span className="font-bold text-white">{config.orders}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <span className="text-gray-400">First Order:</span>
                                    <span className="font-bold text-white">{firstOrder} USDT</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <span className="text-gray-400">Last Order:</span>
                                    <span className="font-bold text-white">{firstOrder} USDT at <span className="text-red-500">-{lastOrderPriceDrop.toFixed(1)}%</span></span>
                                </div>
                            </div>

                            {/* --- ANIMATED SVG CHART --- */}
                            <AnimatedDCAChart orders={config.orders} priceDeviation={config.deviation} />

                            <div className="flex items-start gap-2 mt-6 p-4 bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-xl">
                                <Info size={18} className="text-[#00FF9D] shrink-0 mt-0.5" />
                                <p className="text-xs text-[#00FF9D]/80 leading-relaxed">
                                    This DCA strategy will place <strong>{config.orders} buy orders</strong> as the price drops.
                                    If the price falls by <strong>{config.deviation}%</strong>, the bot triggers the next buy order to lower your average entry price.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ConfigureBot;
