// src/LiveMarket.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
    Bell, Plus, Search, ChevronDown, ArrowUp, ArrowDown,
    Clock, Sliders, MoreHorizontal, Activity, Wallet, X, CheckCircle2, History
} from 'lucide-react';
import Dash_nav from './Dash_nav';

// --- 1. CONFIGURATION & DATA ---

const EXCHANGES = [
    { id: 'BINANCE', name: 'My Binance', type: 'Binance Spot', logo: '/logos/BINANCE.png' },
    { id: 'BYBIT', name: 'My Bybit', type: 'Bybit Spot', logo: '/logos/BYBIT.png' },
    { id: 'OKX', name: 'My OKX', type: 'OKX Spot', logo: '/logos/OKX.jpg' },
];

const MARKETS = [
    { id: 'USDT', name: 'USDT', balance: '0.0052569' },
    { id: 'USDC', name: 'USDC', balance: '540.20' },
    { id: 'BTC', name: 'BTC', balance: '0.000000' },
];

// Full Pair List (Parsed from your request)
const RAW_PAIRS_LIST = `SOL to USDT, BTC to USDT, ETH to USDT, BNB to USDT, XRP to USDT, ADA to USDT, AVAX to USDT, DOGE to USDT, DOT to USDT, LINK to USDT, TRX to USDT, MATIC to USDT, UNI to USDT, LTC to USDT, BCH to USDT, NEAR to USDT, APT to USDT, TUSD to USDT, WBTC to USDT, PAXG to USDT, SC to USDT, SFP to USDT, QTUM to USDT, CAKE to USDT, THETA to USDT, UMA to USDT, DODO to USDT, DENT to USDT, WIN to USDT, PUNDIX to USDT, CHZ to USDT, CTSI to USDT, DGB to USDT, CHR to USDT, RUNE to USDT, MANA to USDT, BAKE to USDT, KAVA to USDT, VTHO to USDT, PSG to USDT, FLOKI to USDT, AR to USDT, SPELL to USDT, MBOX to USDT, KDA to USDT, PYR to USDT, DYDX to USDT, MOVR to USDT, ROSE to USDT, YGG to USDT, IMX to USDT, JOE to USDT, CVX to USDT, FLOW to USDT, ILV to USDT, IOTA to USDT, AUDIO to USDT, STG to USDT, METIS to USDT, XDC to USDT, GMX to USDT, GNO to USDT, LQTY to USDT, TWT to USDT, CELR to USDT, ENS to USDT, BONK to USDT, BLUR to USDT, TON to USDT, CFX to USDT, PEPE to USDT, SUI to USDT, ACH to USDT, RSR to USDT, SKL to USDT, MDT to USDT, ARPA to USDT, INJ to USDT, SYS to USDT, MINA to USDT, MAGIC to USDT, TURBO to USDT, ORDI to USDT, PHB to USDT, ANKR to USDT, HOT to USDT, WOO to USDT, BICO to USDT, ASTR to USDT, DUSK to USDT, MAV to USDT, CKB to USDT, XVG to USDT, ID to USDT, RDNT to USDT, PENDLE to USDT, ARKM to USDT, WLD to USDT, HFT to USDT, CYBER to USDT, SEI to USDT, KMD to USDT, LPT to USDT, OG to USDT, HIFI to USDT, FDUSD to USDT, GMT to USDT, AVA to USDT, FORTH to USDT, MLN to USDT, MTL to USDT, EDU to USDT, API3 to USDT, JASMY to USDT, HIGH to USDT, SSV to USDT, QNT to USDT, FIDA to USDT, TIA to USDT, MEME to USDT, VIC to USDT, PYTH to USDT, JTO to USDT, 1000SATS to USDT, ACE to USDT, DATA to USDT, XAI to USDT, MANTA to USDT, JUP to USDT, RAY to USDT, STRK to USDT, ALT to USDT, PIXEL to USDT, WIF to USDT, SUPER to USDT, BOME to USDT, W to USDT, ENA to USDT, TAO to USDT, JST to USDT, SUN to USDT, BB to USDT, OM to USDT, PEOPLE to USDT, RLC to USDT, POLYX to USDT, PHA to USDT, IOST to USDT, SLP to USDT, ZK to USDT, ZRO to USDT, IO to USDT, ETHFI to USDT, LISTA to USDT, REZ to USDT, VANRY to USDT, NTRN to USDT, PORTAL to USDT, AXL to USDT, DYM to USDT, GLM to USDT, BANANA to USDT, RENDER to USDT, DOGS to USDT, POL to USDT, SLF to USDT, NEIRO to USDT, CATI to USDT, HMSTR to USDT, EIGEN to USDT, ACT to USDT, PNUT to USDT, ME to USDT, MOVE to USDT, PENGU to USDT, CETUS to USDT, COW to USDT, ACX to USDT, LUMIA to USDT, ORCA to USDT, DEGO to USDT, TNSR to USDT, AGLD to USDT, G to USDT, PIVX to USDT, UTK to USDT, XVS to USDT, VELODROME to USDT, TRUMP to USDT, USDQ to USDT, EURQ to USDT, WCT to USDT, A to USDT, USDR to USDT, EURR to USDT, WLFI to USDT, XEC to USDT, TRB to USDT, MBL to USDT, AEVO to USDT, 1INCH to USDT`;

// Helper: Parse and Sort Pairs
const getSortedPairs = () => {
    const pairs = RAW_PAIRS_LIST.split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0)
        .map(p => {
            const [base, quote] = p.split(' to ');
            return {
                label: `${base}/${quote}`,
                value: `${base}${quote}`,
                base: base || 'BTC',
                quote: quote || 'USDT'
            };
        });

    // Priority List
    const priority = ['SOL', 'BTC', 'ETH', 'BNB', 'XRP', 'DOGE', 'ADA'];

    return pairs.sort((a, b) => {
        const indexA = priority.indexOf(a.base);
        const indexB = priority.indexOf(b.base);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.base.localeCompare(b.base);
    });
};

const PAIRS_DATA = getSortedPairs();

// --- 2. COMPONENTS ---

const TradingViewWidget = ({ exchange, pair }) => {
    const container = useRef();

    useEffect(() => {
        if (container.current) {
            container.current.innerHTML = "";
        }

        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => {
            if (window.TradingView) {
                new window.TradingView.widget({
                    "autosize": true,
                    "symbol": `BINANCE:${pair}`, // Defaulting to Binance for better data availability
                    "interval": "1H",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
                    "style": "1",
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "allow_symbol_change": true,
                    "container_id": "tradingview_widget",
                    "hide_side_toolbar": false,
                    "studies": ["MASimple@tv-basicstudies"]
                });
            }
        };

        if (container.current) container.current.appendChild(script);

        const widgetDiv = document.createElement("div");
        widgetDiv.id = "tradingview_widget";
        widgetDiv.style.height = "100%";
        widgetDiv.style.width = "100%";
        if (container.current) container.current.appendChild(widgetDiv);

    }, [exchange, pair]);

    return (
        <div className="w-full h-full bg-[#0A1014] border border-white/10 rounded-2xl overflow-hidden relative" ref={container}>
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">Loading Chart...</div>
        </div>
    );
};

const OrderBook = ({ pair }) => {
    // Generate static looking data that refreshes slightly
    const basePrice = pair.includes('BTC') ? 96500 : pair.includes('SOL') ? 155 : 1.25;

    // Asks (Sell Orders) - Red
    const asks = Array.from({ length: 14 }, (_, i) => ({
        price: (basePrice + (i * basePrice * 0.0001) + 0.01).toFixed(2),
        total: (Math.random() * 5 + 0.1).toFixed(2),
        amount: (Math.random() * 1000).toFixed(2)
    })).reverse();

    // Bids (Buy Orders) - Green
    const bids = Array.from({ length: 14 }, (_, i) => ({
        price: (basePrice - (i * basePrice * 0.0001) - 0.01).toFixed(2),
        total: (Math.random() * 5 + 0.1).toFixed(2),
        amount: (Math.random() * 1000).toFixed(2)
    }));

    return (
        <div className="bg-[#0A1014] border border-white/10 rounded-2xl h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex justify-between p-3 border-b border-white/5 bg-[#0F1619]">
                <div className="flex gap-2">
                    <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-white/20">
                        <div className="w-2 h-1 bg-red-500 mb-0.5"></div>
                        <div className="w-2 h-1 bg-green-500"></div>
                    </div>
                    <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-white/20">
                        <div className="w-2 h-2 bg-green-500"></div>
                    </div>
                    <div className="w-4 h-4 bg-white/10 rounded flex items-center justify-center cursor-pointer hover:bg-white/20">
                        <div className="w-2 h-2 bg-red-500"></div>
                    </div>
                </div>
                <span className="text-[10px] text-gray-500">20</span>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-3 px-3 py-2 text-[9px] font-bold text-gray-500 uppercase">
                <span>Ask Price</span>
                <span className="text-right">Total</span>
                <span className="text-right">Amount</span>
            </div>

            {/* Asks */}
            <div className="flex-1 overflow-hidden space-y-0.5">
                {asks.map((a, i) => (
                    <div key={i} className="grid grid-cols-3 px-3 text-[10px] relative hover:bg-white/5 cursor-pointer">
                        <span className="text-red-500">{a.price}</span>
                        <span className="text-gray-500 text-right">{a.total}</span>
                        <span className="text-gray-400 text-right">{a.amount}</span>
                        <div className="absolute top-0 right-0 bottom-0 bg-red-500/10 z-0" style={{ width: `${Math.random() * 80}%` }}></div>
                    </div>
                ))}
            </div>

            {/* Mid Price */}
            <div className="py-2 px-3 border-y border-white/5 bg-[#0A1014] flex justify-between items-center my-1">
                <span className="text-sm font-bold text-[#00FF9D]">{basePrice.toFixed(2)}</span>
                <ArrowUp size={12} className="text-[#00FF9D]" />
            </div>

            {/* Bids */}
            <div className="flex-1 overflow-hidden space-y-0.5">
                {bids.map((b, i) => (
                    <div key={i} className="grid grid-cols-3 px-3 text-[10px] relative hover:bg-white/5 cursor-pointer">
                        <span className="text-[#00FF9D]">{b.price}</span>
                        <span className="text-gray-500 text-right">{b.total}</span>
                        <span className="text-gray-400 text-right">{b.amount}</span>
                        <div className="absolute top-0 right-0 bottom-0 bg-[#00FF9D]/10 z-0" style={{ width: `${Math.random() * 80}%` }}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const TradePanel = ({ pair, market }) => {
    const [side, setSide] = useState('buy');
    const base = pair.split('USDT')[0];
    const price = pair.includes('BTC') ? 89608.03 : 145.20;

    return (
        <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-5 h-full flex flex-col">
            {/* Asset Info Header */}
            <div className="flex justify-between items-center mb-4 bg-[#131B1F] p-2 rounded-lg border border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-black font-mono">
                        {base.charAt(0)}
                    </div>
                    <span className="font-bold text-white text-sm">{base}/USDT</span>
                </div>
                <span className="text-[10px] text-gray-400">0 {base}</span>
            </div>

            {/* Buy/Sell Tabs */}
            <div className="grid grid-cols-2 gap-0 mb-4 bg-[#131B1F] rounded-lg p-1 border border-white/5">
                <button
                    onClick={() => setSide('buy')}
                    className={`py-2 text-sm font-bold rounded-md transition-all ${side === 'buy' ? 'bg-[#007A5A] text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                    Buy
                </button>
                <button
                    onClick={() => setSide('sell')}
                    className={`py-2 text-sm font-bold rounded-md transition-all ${side === 'sell' ? 'bg-[#B91C1C] text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                    Sell
                </button>
            </div>

            {/* Order Type Tabs */}
            <div className="flex gap-2 mb-4 text-[10px] font-medium">
                <button className="bg-[#2D3035] text-white px-3 py-1 rounded hover:bg-[#3D4045]">Monthly</button>
                <button className="bg-[#2D3035] text-white px-3 py-1 rounded hover:bg-[#3D4045]">Annual</button>
                <button className="text-gray-500 hover:text-white px-2">Conditional</button>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
                <div>
                    <label className="text-[10px] text-gray-500 mb-1 block">Order Price <span className="float-right">USDT</span></label>
                    <input type="number" className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#00FF9D]" defaultValue={price} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] text-gray-500 mb-1 block">Units <span className="float-right">{base}</span></label>
                        <input type="number" className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#00FF9D]" defaultValue={price} />
                        <span className="text-[9px] text-gray-600 block mt-1">Max: 0 {base}</span>
                    </div>
                    <div>
                        <label className="text-[10px] text-gray-500 mb-1 block">Total <span className="float-right">USDT</span></label>
                        <input type="number" className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#00FF9D]" defaultValue={price} />
                        <span className="text-[9px] text-gray-600 block mt-1">Avail: 0.00025 USDT</span>
                    </div>
                </div>

                {/* Percentage Slider */}
                <div className="flex justify-between gap-2">
                    {[10, 25, 50, 75, 100].map(p => (
                        <button key={p} className="flex-1 bg-[#131B1F] hover:bg-white/10 text-[10px] text-gray-400 py-1.5 rounded border border-white/5 transition-colors">{p}%</button>
                    ))}
                </div>

                {/* Submit Button */}
                <button className={`w-full font-bold py-3.5 rounded-lg text-sm shadow-lg mt-2 transition-transform active:scale-95 ${side === 'buy' ? 'bg-[#00FF9D] hover:bg-[#00cc7d] text-black' : 'bg-[#EF4444] hover:bg-red-600 text-white'}`}>
                    {side === 'buy' ? `Buy` : `Sell`}
                </button>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---

const LiveMarket = () => {
    const [user] = useState({ name: "Trader", plan: "Pro Plan Active" });

    // --- GLOBAL STATE ---
    const [selectedExchange, setSelectedExchange] = useState(EXCHANGES[0]);
    const [selectedMarket, setSelectedMarket] = useState(MARKETS[0]);
    const [selectedPair, setSelectedPair] = useState(PAIRS_DATA[0]);

    // Dropdown States
    const [isExOpen, setIsExOpen] = useState(false);
    const [isMktOpen, setIsMktOpen] = useState(false);
    const [isPairOpen, setIsPairOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPairs = PAIRS_DATA.filter(p => p.label.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black">

            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00FF9D]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute bottom-[-30%] left-[20%] w-[60vw] h-[50vh] bg-[#00FF9D]/20 rounded-full blur-[180px] opacity-70"></div>
            </div>

            <Dash_nav user={user} />

            <main className="flex-1 p-6 relative z-10 flex flex-col h-screen overflow-hidden">

                {/* 1. Header (MATCHING BOTS/DASHBOARD STYLE) */}
                <header className="flex justify-between items-center mb-6 shrink-0">
                    <h1 className="text-3xl font-bold text-[#00FF9D] drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]">Terminals</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014]/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:border-[#00FF9D] transition-colors relative">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-[#00FF9D] rounded-full shadow-[0_0_5px_#00FF9D]"></div>
                        </button>
                        <button className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]">
                            <Plus size={18} strokeWidth={3} /> New Bot
                        </button>
                    </div>
                </header>

                {/* 2. Top Filter Bar (MATCHING IMAGE) */}
                <div className="bg-[#0A1014] border border-white/10 rounded-2xl p-4 mb-4 grid grid-cols-1 md:grid-cols-12 gap-4 shrink-0 shadow-lg">

                    {/* Exchange */}
                    <div className="md:col-span-4 relative">
                        <label className="text-[10px] text-gray-500 font-bold uppercase mb-1 block">Exchange</label>
                        <div
                            onClick={() => { setIsExOpen(!isExOpen); setIsMktOpen(false); setIsPairOpen(false); }}
                            className="bg-[#131B1F] border border-white/5 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:border-[#00FF9D]/30 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <img src={selectedExchange.logo} className="w-5 h-5 object-contain" />
                                <div>
                                    <span className="text-[#EAB308] text-xs font-bold mr-2">{selectedExchange.name}</span>
                                    <span className="text-gray-400 text-xs">| {selectedExchange.type}</span>
                                </div>
                            </div>
                            <span className="text-white font-bold text-xs">$0 <ChevronDown size={12} className="inline ml-1" /></span>
                        </div>
                        {isExOpen && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-[#131B1F] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                                {EXCHANGES.map(ex => (
                                    <div key={ex.id} onClick={() => { setSelectedExchange(ex); setIsExOpen(false); }} className="p-3 hover:bg-white/5 cursor-pointer flex items-center gap-2 text-xs text-white">
                                        <img src={ex.logo} className="w-4 h-4" /> {ex.name}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Market */}
                    <div className="md:col-span-4 relative">
                        <label className="text-[10px] text-gray-500 font-bold uppercase mb-1 block">Market</label>
                        <div
                            onClick={() => { setIsMktOpen(!isMktOpen); setIsExOpen(false); setIsPairOpen(false); }}
                            className="bg-[#131B1F] border border-white/5 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:border-[#00FF9D]/30 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-black font-bold">T</div>
                                <span className="text-white text-xs font-bold">{selectedMarket.name}</span>
                            </div>
                            <span className="text-white font-bold text-xs">{selectedMarket.balance} USDT <ChevronDown size={12} className="inline ml-1" /></span>
                        </div>
                        {isMktOpen && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-[#131B1F] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                                {MARKETS.map(m => (
                                    <div key={m.id} onClick={() => { setSelectedMarket(m); setIsMktOpen(false); }} className="p-3 hover:bg-white/5 cursor-pointer text-xs text-white flex justify-between">
                                        <span>{m.name}</span><span>{m.balance}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Pair */}
                    <div className="md:col-span-4 relative">
                        <label className="text-[10px] text-gray-500 font-bold uppercase mb-1 block">Pair</label>
                        <div
                            onClick={() => { setIsPairOpen(!isPairOpen); setIsExOpen(false); setIsMktOpen(false); }}
                            className="bg-[#131B1F] border border-white/5 rounded-lg p-2.5 flex items-center justify-between cursor-pointer hover:border-[#00FF9D]/30 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-[8px] text-black font-bold">{selectedPair.base.charAt(0)}</div>
                                <span className="text-white text-xs font-bold">{selectedPair.label}</span>
                            </div>
                            <span className="text-white font-bold text-xs">0 BTC <ChevronDown size={12} className="inline ml-1" /></span>
                        </div>

                        {/* PAIR SEARCH DROPDOWN */}
                        {isPairOpen && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-[#131B1F] border border-white/10 rounded-xl shadow-2xl z-50 flex flex-col max-h-[400px]">
                                <div className="p-2 border-b border-white/5">
                                    <div className="flex items-center bg-black/30 rounded px-2 py-1.5 border border-white/5">
                                        <Search size={12} className="text-gray-500 mr-2" />
                                        <input
                                            type="text"
                                            autoFocus
                                            placeholder="SEARCH"
                                            className="bg-transparent text-xs text-white outline-none w-full uppercase placeholder:text-gray-600"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="overflow-y-auto flex-1">
                                    {filteredPairs.map(p => (
                                        <div
                                            key={p.value}
                                            onClick={() => { setSelectedPair(p); setIsPairOpen(false); setSearchTerm(""); }}
                                            className={`px-4 py-2 text-xs cursor-pointer flex items-center justify-between hover:bg-white/5 ${selectedPair.value === p.value ? 'text-[#00FF9D] bg-[#00FF9D]/5' : 'text-gray-300'}`}
                                        >
                                            <span>{p.label}</span>
                                            {['BTC', 'ETH', 'SOL', 'BNB'].includes(p.base) && <span className="text-[9px] text-yellow-500">★</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. GRID CONTENT (MATCHING LAYOUT) */}
                <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">

                    {/* --- ROW 1 --- */}

                    {/* CHART (LEFT LARGE) */}
                    <div className="col-span-12 lg:col-span-9 h-[450px] bg-[#0A1014] border border-white/10 rounded-2xl relative overflow-hidden flex flex-col">
                        <div className="h-[40px] border-b border-white/5 flex items-center px-4 justify-between bg-[#0A1014]">
                            <div className="flex gap-4 text-[10px] font-bold text-gray-400">
                                <span className="text-white bg-[#131B1F] px-2 py-0.5 rounded">1h</span>
                                <span className="hover:text-white cursor-pointer px-2">4h</span>
                                <span className="hover:text-white cursor-pointer px-2">1D</span>
                                <span className="hover:text-white cursor-pointer px-2 flex items-center gap-1"><Activity size={10} /> Indicators</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-[10px] text-gray-400 hover:text-white">Save</button>
                                <button className="text-[10px] text-gray-400 hover:text-white">Full</button>
                            </div>
                        </div>
                        <div className="flex-1">
                            <TradingViewWidget exchange={selectedExchange.id} pair={selectedPair.value} />
                        </div>
                    </div>

                    {/* ORDER BOOK (RIGHT SMALL) */}
                    <div className="col-span-12 lg:col-span-3 h-[450px]">
                        <OrderBook pair={selectedPair.value} />
                    </div>

                    {/* --- ROW 2 --- */}

                    {/* TRADE PANEL (BOTTOM LEFT SMALL) */}
                    <div className="col-span-12 lg:col-span-4 h-[350px]">
                        <TradePanel pair={selectedPair.value} market={selectedMarket} />
                    </div>

                    {/* ORDER HISTORY (BOTTOM RIGHT LARGE) */}
                    <div className="col-span-12 lg:col-span-8 h-[350px] bg-[#0A1014] border border-white/10 rounded-2xl flex flex-col overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b border-white/5 bg-[#0A1014]">
                            {['Account Portfolio', 'Open Orders', 'Trades History'].map((tab, i) => (
                                <button
                                    key={tab}
                                    className={`px-6 py-4 text-[10px] font-bold uppercase tracking-wider transition-colors border-b-2 ${i === 1 ? 'text-white border-[#00FF9D]' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Table */}
                        <div className="flex-1 bg-[#0A1014] p-4 overflow-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-[9px] text-[#00FF9D] uppercase border-b border-white/5">
                                        <th className="py-2 pl-2">Coin</th>
                                        <th className="py-2">Side</th>
                                        <th className="py-2">Size</th>
                                        <th className="py-2">Order Type</th>
                                        <th className="py-2">Order Price</th>
                                        <th className="py-2">Trigger Price</th>
                                        <th className="py-2">Creation Date</th>
                                        <th className="py-2 text-right pr-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Empty State */}
                                    <tr>
                                        <td colSpan="8" className="text-center py-20">
                                            <div className="flex flex-col items-center opacity-30">
                                                <Wallet size={32} className="mb-2 text-gray-500" />
                                                <span className="text-xs text-gray-500">No open orders</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default LiveMarket;
