import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronDown, Info, Search, Loader2, Check, LayoutGrid } from 'lucide-react';
import API_BASE_URL from './config';

// --- DATA: PAIRS & PRIORITY ---
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

const ConfigureBotModal = ({ isOpen, onClose, botType = 'SPOT GRID' }) => {
    const [config, setConfig] = useState({
        exchange: 'Binance',
        pair: 'BTC/USDT',
        investment: 1000,
        grids: 20,
        upperPrice: 0,
        lowerPrice: 0,
        trailingUp: false,
        trailingDown: false
    });

    const [mode, setMode] = useState('auto');
    const [riskLevel, setRiskLevel] = useState('high');
    const [isPairOpen, setIsPairOpen] = useState(false);
    const [pairSearch, setPairSearch] = useState('');
    const [isPriceLoading, setIsPriceLoading] = useState(false);

    const [fetchedPrice, setFetchedPrice] = useState(0);

    const filteredPairs = useMemo(() => {
        return ALL_PAIRS.filter(pair => pair.toLowerCase().includes(pairSearch.toLowerCase()));
    }, [pairSearch]);

    // --- HELPER: Calculate Range based on Price & Risk ---
    const calculateRange = (price, risk) => {
        let percentage = 0.10; // Default High
        if (risk === 'medium') percentage = 0.20;
        if (risk === 'low') percentage = 0.30;

        const newUpper = parseFloat((price * (1 + percentage)).toFixed(4));
        const newLower = parseFloat((price * (1 - percentage)).toFixed(4));
        return { newUpper, newLower };
    };

    // --- 1. FETCH PRICE ---
    useEffect(() => {
        if (!isOpen) return;

        const fetchPrice = async () => {
            setIsPriceLoading(true);
            try {
                const exch = config.exchange ? config.exchange.toLowerCase() : 'binance';
                const url = `${API_BASE_URL}/user/market-data?exchange=${exch}&symbol=${config.pair}`;

                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();

                    let price = 0;
                    if (data.price) {
                        price = parseFloat(data.price);
                    } else if (data.bids && data.bids.length > 0 && data.asks && data.asks.length > 0) {
                        const bestBid = parseFloat(data.bids[0][0]);
                        const bestAsk = parseFloat(data.asks[0][0]);
                        price = (bestBid + bestAsk) / 2;
                    }

                    if (price > 0 && !isNaN(price)) {
                        setFetchedPrice(price);

                        if (mode === 'auto') {
                            const { newUpper, newLower } = calculateRange(price, riskLevel);
                            setConfig(prev => ({ ...prev, upperPrice: newUpper, lowerPrice: newLower }));
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch live price:", error);
            } finally {
                setIsPriceLoading(false);
            }
        };

        fetchPrice();
    }, [config.pair, config.exchange, isOpen]);

    // --- 2. UPDATE INPUTS WHEN RISK/MODE CHANGES ---
    useEffect(() => {
        if (fetchedPrice <= 0) return;
        if (mode === 'manual') return;

        const { newUpper, newLower } = calculateRange(fetchedPrice, riskLevel);

        setConfig(prev => ({
            ...prev,
            upperPrice: newUpper,
            lowerPrice: newLower
        }));

    }, [fetchedPrice, mode, riskLevel]);


    const handleCreate = () => {
        if (Number(config.upperPrice) <= 0 || Number(config.lowerPrice) <= 0) {
            alert("Price range is invalid.");
            return;
        }

        const payload = {
            bot_name: `${config.pair} Grid Bot`,
            quote_currency: config.pair.split('/')[0],
            bot_type: 'GRID',
            status: 'active',
            config: {
                exchange: config.exchange,
                pair: config.pair,
                strategy: {
                    upper_price: Number(config.upperPrice),
                    lower_price: Number(config.lowerPrice),
                    grids: Number(config.grids),
                    investment: Number(config.investment),
                    trailing_up: config.trailingUp,
                    trailing_down: config.trailingDown
                }
            }
        };

        const createBot = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_BASE_URL}/user/bot`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    alert("Grid Bot Created Successfully!");
                    onClose();
                } else {
                    const errData = await res.json();
                    alert(`Failed to create bot: ${errData.message || 'Unknown error'}`);
                }
            } catch (e) { console.error(e); }
        };
        createBot();
    };

    if (!isOpen) return null;

    const numUpper = Number(config.upperPrice) || 0;
    const numLower = Number(config.lowerPrice) || 0;
    const numGrids = Number(config.grids) || 0;
    const numInv = Number(config.investment) || 0;

    const priceRange = numUpper - numLower;
    const gridStep = numGrids > 0 ? (priceRange / numGrids) : 0;
    const investmentPerGrid = numGrids > 0 ? (numInv / numGrids).toFixed(2) : 0;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            {/* FIXED: Changed flex layout to grid layout to strictly split containers */}
            <div className="bg-[#0A1014] border border-white/10 rounded-3xl w-full max-w-6xl p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-20">
                    <X size={24} />
                </button>

                {/* --- LEFT SIDE: CONFIGURATION (Fixed Col Span 7) --- */}
                <div className="lg:col-span-7 flex flex-col h-full">
                    <h2 className="text-2xl font-bold text-white mb-1">Configure Grid Bot</h2>
                    <p className="text-sm text-gray-400 mb-6">Setup your automated grid trading parameters.</p>

                    <div className="space-y-5">
                        {/* EXCHANGE & PAIR */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Exchange</label>
                                <div className="relative">
                                    <select
                                        value={config.exchange}
                                        onChange={(e) => setConfig({ ...config, exchange: e.target.value })}
                                        className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] appearance-none cursor-pointer text-sm"
                                    >
                                        <option>Binance</option><option>Bybit</option><option>OKX</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={14} />
                                </div>
                            </div>

                            <div className="space-y-1 relative">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Pair</label>
                                <div
                                    className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 flex items-center justify-between cursor-pointer hover:border-[#00FF9D]/30"
                                    onClick={() => setIsPairOpen(!isPairOpen)}
                                >
                                    <span className="text-white text-sm truncate">{config.pair}</span>
                                    <ChevronDown size={14} className="text-gray-500" />
                                </div>
                                {isPairOpen && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-[#1A2023] border border-white/10 rounded-xl shadow-2xl z-30 overflow-hidden h-60 flex flex-col">
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
                        </div>

                        {/* MODE TOGGLE */}
                        <div className="flex bg-[#131B1F] p-1 rounded-lg mt-2">
                            <button onClick={() => setMode('auto')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${mode === 'auto' ? 'bg-[#00FF9D] text-black' : 'text-gray-400 hover:text-white'}`}>AUTO (AI)</button>
                            <button onClick={() => setMode('manual')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${mode === 'manual' ? 'bg-[#00FF9D] text-black' : 'text-gray-400 hover:text-white'}`}>MANUAL</button>
                        </div>

                        {/* FIXED: FIXED HEIGHT WRAPPER 
                            This div wraps the dynamic content (Inputs vs Buttons).
                            It forces this section to always be 180px tall so content below doesn't jump.
                        */}
                        <div className="h-[180px] flex flex-col justify-center">
                            {mode === 'auto' ? (
                                <div className="space-y-3 w-full animate-in fade-in duration-300">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Select Risk Level</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button onClick={() => setRiskLevel('high')} className={`py-4 rounded-xl border text-sm font-bold transition-all flex flex-col items-center justify-center gap-1 ${riskLevel === 'high' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                                            High Risk <span className="text-[10px] font-normal opacity-70">±10% Range</span>
                                        </button>
                                        <button onClick={() => setRiskLevel('medium')} className={`py-4 rounded-xl border text-sm font-bold transition-all flex flex-col items-center justify-center gap-1 ${riskLevel === 'medium' ? 'border-yellow-500 bg-yellow-500/10 text-yellow-500' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                                            Medium Risk <span className="text-[10px] font-normal opacity-70">±20% Range</span>
                                        </button>
                                        <button onClick={() => setRiskLevel('low')} className={`py-4 rounded-xl border text-sm font-bold transition-all flex flex-col items-center justify-center gap-1 ${riskLevel === 'low' ? 'border-green-500 bg-green-500/10 text-green-500' : 'border-white/10 text-gray-400 hover:border-white/30'}`}>
                                            Low Risk <span className="text-[10px] font-normal opacity-70">±30% Range</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 w-full animate-in fade-in duration-300">
                                    <div className="grid grid-cols-2 gap-4 relative">
                                        {isPriceLoading && <div className="absolute inset-0 bg-[#0A1014]/80 z-10 flex items-center justify-center rounded-lg"><Loader2 size={16} className="animate-spin text-[#00FF9D]" /></div>}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Upper Price</label>
                                            <input
                                                type="number"
                                                value={config.upperPrice}
                                                onChange={(e) => setConfig({ ...config, upperPrice: e.target.value })}
                                                className={`w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] text-sm`}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Lower Price</label>
                                            <input
                                                type="number"
                                                value={config.lowerPrice}
                                                onChange={(e) => setConfig({ ...config, lowerPrice: e.target.value })}
                                                className={`w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] text-sm`}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Trailing Features</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer group bg-[#131B1F] px-4 py-2 rounded-lg border border-white/5 hover:border-white/20 transition-all flex-1 justify-center">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${config.trailingUp ? 'bg-[#00FF9D] border-[#00FF9D]' : 'border-gray-600'}`}>{config.trailingUp && <Check size={12} className="text-black" />}</div>
                                                <input type="checkbox" className="hidden" checked={config.trailingUp} onChange={e => setConfig({ ...config, trailingUp: e.target.checked })} />
                                                <span className="text-xs text-gray-300 group-hover:text-white font-bold">Trailing Up</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer group bg-[#131B1F] px-4 py-2 rounded-lg border border-white/5 hover:border-white/20 transition-all flex-1 justify-center">
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${config.trailingDown ? 'bg-[#00FF9D] border-[#00FF9D]' : 'border-gray-600'}`}>{config.trailingDown && <Check size={12} className="text-black" />}</div>
                                                <input type="checkbox" className="hidden" checked={config.trailingDown} onChange={e => setConfig({ ...config, trailingDown: e.target.checked })} />
                                                <span className="text-xs text-gray-300 group-hover:text-white font-bold">Trailing Down</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* --- COMMON INPUTS --- */}
                        <div className="space-y-1 mt-2">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase">Total Investment</label>
                            <div className="relative">
                                <input type="number" value={config.investment} onChange={(e) => setConfig({ ...config, investment: parseFloat(e.target.value) || 0 })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] text-sm" />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">USDT</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-400 uppercase">Number of Grids</label>
                            <div className="relative">
                                <input type="number" value={config.grids} onChange={(e) => setConfig({ ...config, grids: parseFloat(e.target.value) || 0 })} className="w-full bg-[#131B1F] border border-white/10 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00FF9D] text-sm" />
                                <LayoutGrid size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            </div>
                        </div>

                        <button onClick={handleCreate} className="w-full bg-[#00FF9D] text-black font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:bg-[#00cc7d] hover:scale-[1.01] transition-all mt-4">
                            Create Grid Bot
                        </button>
                    </div>
                </div>

                {/* --- RIGHT SIDE: PREVIEW (Fixed Col Span 5) --- */}
                <div className="lg:col-span-5 h-full">
                    <div className="bg-[#0A1014]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 sticky top-10 h-full flex flex-col">
                        <h2 className="text-xl font-bold text-white mb-6">Strategy Preview</h2>

                        <div className="space-y-4 text-sm flex-1">
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="text-gray-400">Current Price</span>
                                <span className="font-bold text-[#00FF9D]">${fetchedPrice.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="text-gray-400">Grid Range</span>
                                <span className="font-bold text-white">
                                    {numLower > 0 ? numLower.toFixed(4) : '---'} - {numUpper > 0 ? numUpper.toFixed(4) : '---'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="text-gray-400">Grid Density</span>
                                <span className="font-bold text-white">
                                    {numGrids} Grids (~${gridStep.toFixed(2)} step)
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="text-gray-400">Investment per Grid</span>
                                <span className="font-bold text-white">${investmentPerGrid}</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="text-gray-400">Mode</span>
                                <span className={`font-bold uppercase ${mode === 'auto' ? 'text-[#00FF9D]' : 'text-yellow-500'}`}>{mode} ({mode === 'auto' ? riskLevel : 'Custom'})</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <span className="text-gray-400">Trailing</span>
                                <div className="flex gap-2">
                                    {config.trailingUp && <span className="text-[10px] bg-[#00FF9D]/10 text-[#00FF9D] px-2 py-1 rounded">UP</span>}
                                    {config.trailingDown && <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded">DOWN</span>}
                                    {!config.trailingUp && !config.trailingDown && <span className="text-gray-600">-</span>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-2 p-4 bg-[#00FF9D]/5 border border-[#00FF9D]/20 rounded-xl min-h-[80px]">
                            <Info size={18} className="text-[#00FF9D] shrink-0 mt-0.5" />
                            <p className="text-xs text-[#00FF9D]/80 leading-relaxed">
                                Bot will place <strong>{numGrids} orders</strong> in the price range of {numLower.toFixed(2)} to {numUpper.toFixed(2)}.
                                {mode === 'auto' ? ` Optimized for ${riskLevel} risk market conditions.` : ' Using custom manual settings.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfigureBotModal;
