import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Info } from 'lucide-react';

// --- ANIMATED DCA CHART COMPONENT ---
const AnimatedDCAChart = ({ orders, priceDeviation }) => {
    const width = 500;
    const height = 250;
    const padding = 30;

    // Calculate points for the descending line
    const points = Array.from({ length: orders }, (_, i) => {
        const x = padding + (i / (orders - 1)) * (width - 2 * padding);
        // Map deviation to Y axis (Visual scale factor * 10 to make it visible)
        const drop = (i * priceDeviation * 15);
        const y = padding + (drop / 100) * (height - 2 * padding) + 40;
        return { x, y, id: i };
    });

    // Create path strings
    const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
    const areaPath = `${linePath} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

    return (
        <div className="w-full h-56 relative overflow-hidden bg-[#0A1014] rounded-xl border border-white/5 mt-4 flex items-center justify-center">

            {/* Grid Lines (Subtle Background) */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full relative z-10">
                <defs>
                    <linearGradient id="dcaGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#00FF9D" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00FF9D" stopOpacity="0" />
                    </linearGradient>

                    {/* Glow Filter */}
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Animated Area (Fades in) */}
                <path
                    d={areaPath}
                    fill="url(#dcaGradient)"
                    className="opacity-0 animate-[fadeIn_1s_ease-out_forwards]"
                    style={{ animationDelay: '0.5s' }}
                />

                {/* Animated Line (Draws itself) */}
                <path
                    d={linePath}
                    fill="none"
                    stroke="#00FF9D"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#glow)"
                    className="[stroke-dasharray:1000] [stroke-dashoffset:1000] animate-[dash_2s_linear_forwards]"
                />

                {/* Animated Points (Pop in sequentially) */}
                {points.map((p, i) => (
                    <g key={p.id} className="opacity-0 animate-[popIn_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]" style={{ animationDelay: `${(i + 1) * (2 / orders)}s` }}>
                        {/* Outer Glow */}
                        <circle cx={p.x} cy={p.y} r="8" fill="#00FF9D" fillOpacity="0.2" />
                        {/* Inner Dot */}
                        <circle cx={p.x} cy={p.y} r="4" fill="#050B0D" stroke="#00FF9D" strokeWidth="2" />

                        {/* "Buy" Label appearing */}
                        <text x={p.x} y={p.y - 15} textAnchor="middle" fill="#00FF9D" fontSize="10" fontWeight="bold" className="opacity-70">
                            {i === 0 ? 'Entry' : `Buy ${i}`}
                        </text>
                    </g>
                ))}
            </svg>

            {/* CSS for Keyframes (Injected locally for simplicity) */}
            <style>{`
                @keyframes dash {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes popIn {
                    from { transform: scale(0); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

const ConfigureBotModal = ({ isOpen, onClose, botType = 'SPOT DCA' }) => {
    const [config, setConfig] = useState({
        exchange: 'Binance',
        pair: 'BTC/USDT',
        investment: 1000,
        orders: 5,
        deviation: 2.0,
        takeProfit: 5.0,
        stopLoss: 10.0
    });

    if (!isOpen) return null;

    const firstOrder = (config.investment / config.orders).toFixed(0);
    const lastOrderPriceDrop = (config.orders - 1) * config.deviation;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#0A1014] border border-white/10 rounded-3xl w-full max-w-6xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col lg:flex-row gap-8">

                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20">
                    <X size={24} />
                </button>

                {/* --- LEFT SIDE: CONFIGURATION --- */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">Configure {botType.replace('_', ' ')} Bot</h2>
                    <p className="text-sm text-gray-400 mb-6">Setup your automated trading parameters.</p>

                    <div className="space-y-5">
                        {/* Inputs Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Exchange</label>
                                <div className="relative">
                                    <select className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] appearance-none cursor-pointer text-sm">
                                        <option>Binance</option><option>Bybit</option><option>OKX</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Pair</label>
                                <div className="relative">
                                    <select className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] appearance-none cursor-pointer text-sm">
                                        <option>BTC/USDT</option><option>ETH/USDT</option><option>SOL/USDT</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Total Investment</label>
                            <div className="relative">
                                <input type="number" value={config.investment} onChange={(e) => setConfig({ ...config, investment: Number(e.target.value) })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] text-sm" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">USDT</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Orders</label>
                                <input type="number" value={config.orders} onChange={(e) => setConfig({ ...config, orders: Number(e.target.value) })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Deviation (%)</label>
                                <input type="number" step="0.1" value={config.deviation} onChange={(e) => setConfig({ ...config, deviation: Number(e.target.value) })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Take Profit (%)</label>
                                <input type="number" step="0.1" value={config.takeProfit} onChange={(e) => setConfig({ ...config, takeProfit: Number(e.target.value) })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Stop Loss (%)</label>
                                <input type="number" step="0.1" value={config.stopLoss} onChange={(e) => setConfig({ ...config, stopLoss: Number(e.target.value) })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] text-sm" />
                            </div>
                        </div>

                        <button onClick={() => { alert("Bot Created!"); onClose(); }} className="w-full bg-[#00FF9D] text-black font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:bg-[#00cc7d] hover:scale-[1.01] transition-all mt-4">
                            Create Bot
                        </button>
                    </div>
                </div>

                {/* --- RIGHT SIDE: ANIMATED STRATEGY PREVIEW --- */}
                <div className="flex-1 bg-[#0A1014]/40 border border-white/5 rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-2">Strategy Preview</h3>

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-2 gap-4 mb-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-gray-400">Total Investment</span>
                            <span className="text-white font-mono">{config.investment} USDT</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-gray-400">Order Count</span>
                            <span className="text-white font-mono">{config.orders}</span>
                        </div>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/5 text-sm mb-4">
                        <span className="text-gray-400">Last Order Price</span>
                        <span className="text-white font-mono">{firstOrder} USDT <span className="text-red-500">(-{lastOrderPriceDrop.toFixed(1)}%)</span></span>
                    </div>

                    {/* THE ANIMATION */}
                    <div className="flex-1 flex flex-col justify-center">
                        <AnimatedDCAChart orders={config.orders} priceDeviation={config.deviation} />
                    </div>

                    <div className="mt-6 flex items-start gap-3 text-xs text-gray-400 leading-relaxed bg-[#00FF9D]/5 p-4 rounded-xl border border-[#00FF9D]/10">
                        <Info size={16} className="text-[#00FF9D] shrink-0 mt-0.5" />
                        <p>
                            Bot will place <strong>{config.orders} orders</strong>.
                            Each consecutive order triggers when price drops by <strong>{config.deviation}%</strong>
                            to average down your entry price automatically.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigureBotModal;
