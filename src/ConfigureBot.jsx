import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Bell, ChevronDown, Info, Search, Loader2 } from 'lucide-react';
import Dash_nav from './Dash_nav';
import API_BASE_URL from './config';
import { useTrading } from './context/TradingContext'; // <--- IMPORT ADDED

// --- DATA: PAIRS & PRIORITY (Utility Code) ---
const RAW_PAIRS_LIST = `SOL to USDT, BTC to USDT, ETH to USDT, BNB to USDT, XRP to USDT, HYPE to USDT, ADA to USDT, AVAX to USDT, DOGE to USDT, DOT to USDT, LINK to USDT, TRX to USDT, MATIC to USDT, UNI to USDT, LTC to USDT, BCH to USDT, NEAR to USDT, APT to USDT, TUSD to USDT, WBTC to USDT, PAXG to USDT, SC to USDT, SFP to USDT, QTUM to USDT, CAKE to USDT, THETA to USDT, UMA to USDT, DODO to USDT, DENT to USDT, WIN to USDT, PUNDIX to USDT, CHZ to USDT, CTSI to USDT, DGB to USDT, CHR to USDT, RUNE to USDT, MANA to USDT, BAKE to USDT, KAVA to USDT, VTHO to USDT, PSG to USDT, FLOKI to USDT, AR to USDT, SPELL to USDT, MBOX to USDT, KDA to USDT, PYR to USDT, DYDX to USDT, MOVR to USDT, ROSE to USDT, YGG to USDT, IMX to USDT, JOE to USDT, CVX to USDT, FLOW to USDT, ILV to USDT, IOTA to USDT, AUDIO to USDT, STG to USDT, METIS to USDT, XDC to USDT, GMX to USDT, GNO to USDT, LQTY to USDT, TWT to USDT, CELR to USDT, ENS to USDT, BONK to USDT, BLUR to USDT, TON to USDT, CFX to USDT, PEPE to USDT, SUI to USDT, ACH to USDT, RSR to USDT, SKL to USDT, MDT to USDT, ARPA to USDT, INJ to USDT, SYS to USDT, MINA to USDT, MAGIC to USDT, TURBO to USDT, ORDI to USDT, PHB to USDT, ANKR to USDT, HOT to USDT, WOO to USDT, BICO to USDT, ASTR to USDT, DUSK to USDT, MAV to USDT, CKB to USDT, XVG to USDT, ID to USDT, RDNT to USDT, PENDLE to USDT, ARKM to USDT, WLD to USDT, HFT to USDT, CYBER to USDT, SEI to USDT, KMD to USDT, LPT to USDT, OG to USDT, HIFI to USDT, FDUSD to USDT, GMT to USDT, AVA to USDT, FORTH to USDT, MLN to USDT, MTL to USDT, EDU to USDT, API3 to USDT, JASMY to USDT, HIGH to USDT, SSV to USDT, QNT to USDT, FIDA to USDT, TIA to USDT, MEME to USDT, VIC to USDT, PYTH to USDT, JTO to USDT, 1000SATS to USDT, ACE to USDT, DATA to USDT, XAI to USDT, MANTA to USDT, JUP to USDT, RAY to USDT, STRK to USDT, ALT to USDT, PIXEL to USDT, WIF to USDT, SUPER to USDT, BOME to USDT, W to USDT, ENA to USDT, TAO to USDT, JST to USDT, SUN to USDT, BB to USDT, OM to USDT, PEOPLE to USDT, RLC to USDT, POLYX to USDT, PHA to USDT, IOST to USDT, SLP to USDT, ZK to USDT, ZRO to USDT, IO to USDT, ETHFI to USDT, LISTA to USDT, REZ to USDT, VANRY to USDT, NTRN to USDT, PORTAL to USDT, AXL to USDT, DYM to USDT, GLM to USDT, BANANA to USDT, RENDER to USDT, DOGS to USDT, POL to USDT, SLF to USDT, NEIRO to USDT, CATI to USDT, HMSTR to USDT, EIGEN to USDT, ACT to USDT, PNUT to USDT, ME to USDT, MOVE to USDT, PENGU to USDT, CETUS to USDT, COW to USDT, ACX to USDT, LUMIA to USDT, ORCA to USDT, DEGO to USDT, TNSR to USDT, AGLD to USDT, G to USDT, PIVX to USDT, UTK to USDT, XVS to USDT, VELODROME to USDT, TRUMP to USDT, USDQ to USDT, EURQ to USDT, WCT to USDT, A to USDT, USDR to USDT, EURR to USDT, WLFI to USDT, XEC to USDT, TRB to USDT, MBL to USDT, AEVO to USDT, 1INCH to USDT`;
const PRIORITY_COINS = ['SOL', 'BTC', 'ETH', 'BNB', 'XRP', 'DOGE', 'ADA', 'HYPE'];
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
// --- END DATA UTILITY ---


const ConfigureBot = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const botType = searchParams.get('type') || 'SPOT DCA';
    const [user] = useState({ name: "Akeel Aashath", plan: "Pro Plan Active" });

    // Global Trading Context (For Paper vs Live)
    const { isPaperTrading } = useTrading();

    // Dropdown/Search State
    const [isPairOpen, setIsPairOpen] = useState(false);
    const [pairSearch, setPairSearch] = useState('');
    const [isPriceLoading, setIsPriceLoading] = useState(false);

    // API Submission State
    const [creating, setCreating] = useState(false);

    const filteredPairs = useMemo(() => {
        return ALL_PAIRS.filter(pair => pair.toLowerCase().includes(pairSearch.toLowerCase()));
    }, [pairSearch]);


    // Form State
    const [config, setConfig] = useState({
        exchange: 'Binance',
        pair: 'BTC/USDT',
        investment: 1000,
        orders: 5,
        deviation: 2.0,
        takeProfit: 5.0,
        stopLoss: 10.0,
        upperPrice: 0,
        lowerPrice: 0,
    });


    // 1. AUTO FETCH PRICE AND SET RANGE
    useEffect(() => {
        const fetchPriceAndSetRange = async () => {
            if (!config.pair) return;

            setIsPriceLoading(true);
            try {
                // Assuming Binance for generic live price check
                const res = await fetch(`${API_BASE_URL}/user/market-data?exchange=binance&symbol=${config.pair}`);
                if (res.ok) {
                    const data = await res.json();

                    // Use the calculated mid-price (or last price from the ticker)
                    const currentPrice = data.price || (data.bid + data.ask) / 2;

                    if (currentPrice > 0) {
                        setConfig(prev => ({
                            ...prev,
                            upperPrice: parseFloat((currentPrice * 1.10).toFixed(4)), // +10%
                            lowerPrice: parseFloat((currentPrice * 0.90).toFixed(4))  // -10%
                        }));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch live price:", error);
            } finally {
                setIsPriceLoading(false);
            }
        };

        const timeout = setTimeout(fetchPriceAndSetRange, 300);
        return () => clearTimeout(timeout);
    }, [config.pair]);


    // Derived Calculations for Preview
    const firstOrder = (config.investment / config.orders).toFixed(0);
    const lastOrderPriceDrop = (config.orders - 1) * config.deviation; // Simple approximation

    // --- HANDLE CREATE BOT (UPDATED WITH API CALL) ---
    const handleCreate = async () => {
        if (!config.investment || config.investment <= 0) {
            alert("Please enter a valid investment amount.");
            return;
        }

        setCreating(true);

        const payload = {
            bot_name: `${config.pair} ${botType} Bot (${isPaperTrading ? 'Paper' : 'Live'})`,
            quote_currency: config.pair.split('/')[0],
            bot_type: botType, // e.g. "SPOT DCA"
            status: 'active',
            mode: isPaperTrading ? 'paper' : 'live',
            config: {
                exchange: config.exchange,
                pair: config.pair,
                mode: isPaperTrading ? 'paper' : 'live',
                strategy: {
                    investment: Number(config.investment),
                    orders: Number(config.orders),
                    deviation: Number(config.deviation),
                    take_profit: Number(config.takeProfit),
                    stop_loss: Number(config.stopLoss),
                    upper_price: Number(config.upperPrice),
                    lower_price: Number(config.lowerPrice)
                }
            }
        };

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/bot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert("Bot Created Successfully!");
                navigate('/bots');
            } else {
                const data = await res.json();
                alert(`Failed to create bot: ${data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Error creating bot:", error);
            alert("Network error. Please try again.");
        } finally {
            setCreating(false);
        }
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
                    {/* Header Action Button (Optional secondary create) */}
                    <button
                        onClick={handleCreate}
                        disabled={creating}
                        className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2.5 px-6 rounded-xl shadow-[0_0_20px_rgba(0,255,157,0.3)] disabled:opacity-50"
                    >
                        {creating ? <Loader2 className="animate-spin" size={20} /> : "+ Create"}
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
                                <div className="space-y-2 relative">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Trading Pair</label>
                                    {/* CUSTOM PAIR DROPDOWN */}
                                    <div
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-3 flex items-center justify-between cursor-pointer hover:border-[#00FF9D]/30"
                                        onClick={() => setIsPairOpen(!isPairOpen)}
                                    >
                                        <span className="text-white text-sm truncate">{config.pair}</span>
                                        <ChevronDown size={16} className="text-gray-500" />
                                    </div>
                                    {isPairOpen && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-[#1A2023] border border-white/10 rounded-xl shadow-2xl z-30 overflow-hidden h-60 flex flex-col">
                                            <div className="p-2 border-b border-white/5">
                                                <div className="flex items-center bg-black/30 rounded px-2 py-1.5 border border-white/5">
                                                    <Search size={14} className="text-gray-500 mr-2" />
                                                    <input
                                                        type="text"
                                                        autoFocus
                                                        placeholder="SEARCH"
                                                        className="bg-transparent text-xs text-white outline-none w-full uppercase"
                                                        value={pairSearch}
                                                        onChange={(e) => setPairSearch(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="overflow-y-auto flex-1">
                                                {filteredPairs.map((p) => {
                                                    const isPriority = PRIORITY_COINS.some(c => p.startsWith(c + '/'));
                                                    return (
                                                        <div
                                                            key={p}
                                                            onClick={() => { setConfig({ ...config, pair: p }); setIsPairOpen(false); }}
                                                            className={`px-4 py-2 text-xs cursor-pointer flex items-center justify-between hover:bg-white/5 ${config.pair === p ? 'text-[#00FF9D] bg-[#00FF9D]/5' : 'text-gray-300'}`}
                                                        >
                                                            <span className={isPriority ? 'font-bold text-white' : ''}>{p}</span>
                                                            {isPriority && <span className="text-[10px] text-yellow-500">★</span>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
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

                            {/* Auto Updated Prices Fields */}
                            <div className="grid grid-cols-2 gap-6 relative">
                                {isPriceLoading && (
                                    <div className="absolute inset-0 bg-[#0A1014]/80 z-10 flex items-center justify-center rounded-xl">
                                        <Loader2 size={16} className="animate-spin text-[#00FF9D]" />
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Upper Price (+10%)</label>
                                    <input
                                        type="number"
                                        value={config.upperPrice}
                                        onChange={(e) => setConfig({ ...config, upperPrice: Number(e.target.value) })}
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Lower Price (-10%)</label>
                                    <input
                                        type="number"
                                        value={config.lowerPrice}
                                        onChange={(e) => setConfig({ ...config, lowerPrice: Number(e.target.value) })}
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] transition-all"
                                    />
                                </div>
                            </div>

                            {/* Orders & Deviation */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Number of Orders</label>
                                    <input
                                        type="number"
                                        value={config.orders}
                                        onChange={(e) => setConfig({ ...config, orders: Number(e.target.value) })}
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#00FF9D] transition-all"
                                    />
                                </div>
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
                            </div>

                            {/* Take Profit & Stop Loss */}
                            <div className="grid grid-cols-2 gap-6">
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
                            </div>

                            <button
                                onClick={handleCreate}
                                disabled={creating}
                                className={`w-full bg-[#00FF9D] text-black font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:bg-[#00cc7d] hover:scale-[1.01] transition-all mt-4 flex items-center justify-center gap-2 ${creating ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {creating ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Bot"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: ANIMATED STRATEGY PREVIEW --- */}
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
                                    <span className="text-gray-400">Pair Range</span>
                                    <span className="font-bold text-white">{config.lowerPrice.toFixed(2)} - {config.upperPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                    <span className="text-gray-400">Last Order Price</span>
                                    <span className="font-bold text-white">{firstOrder} USDT at <span className="text-red-500">-{lastOrderPriceDrop.toFixed(1)}%</span></span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-start gap-2 p-4 bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-xl">
                                <Info size={18} className="text-[#00FF9D] shrink-0 mt-0.5" />
                                <p className="text-xs text-[#00FF9D]/80 leading-relaxed">
                                    Bot will place <strong>{config.orders} buy orders</strong> between the price range set automatically ({config.lowerPrice.toFixed(2)} to {config.upperPrice.toFixed(2)}) to maximize coverage.
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
