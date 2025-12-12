// src/Bots.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, Plus, Search, Pause, Play, Activity, Loader2, Bot, Trash2
} from 'lucide-react';
import API_BASE_URL from './config';
import Dash_nav from './Dash_nav';
import CreateBotModal from './CreateBotModal';
import ConfigureBotModal from './ConfigureBotModal';
import { useTrading } from './context/TradingContext'; // 1. Import Context

// --- SPARKLINE COMPONENT (Mini Chart) ---
const BotSparkline = ({ color }) => (
    <div className="h-12 w-full mt-4 mb-4 relative overflow-hidden">
        <svg viewBox="0 0 100 40" className="w-full h-full" preserveAspectRatio="none">
            <path
                d="M0,30 L10,25 L20,35 L30,15 L40,25 L50,10 L60,30 L70,20 L80,5 L90,25 L100,20"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="100" cy="20" r="3" fill={color} className="animate-pulse" />
        </svg>
    </div>
);

// --- MAIN COMPONENT ---
const Bots = () => {
    const navigate = useNavigate();
    const { isPaperTrading } = useTrading(); // 2. Get Global Mode

    const [loading, setLoading] = useState(true);
    const [bots, setBots] = useState([]);
    const [availableBots, setAvailableBots] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState({ name: "Trader", plan: "Pro Plan Active" });

    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [selectedBotType, setSelectedBotType] = useState('');

    // --- FETCH DATA ---
    const fetchData = async () => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/signin');

        try {
            // 1. Get User
            const userRes = await fetch(`${API_BASE_URL}/user/me`, { headers: { 'Authorization': `Bearer ${token}` } });
            if (userRes.ok) {
                const userData = await userRes.json();
                setUser({ name: userData.user.full_name || "Trader", plan: "Pro Plan Active" });

                // 2. Get Bots (Filtered by Mode)
                const modeQuery = isPaperTrading ? '?mode=paper' : '?mode=live';
                const botsRes = await fetch(`${API_BASE_URL}/user/bots${modeQuery}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (botsRes.ok) {
                    const botsData = await botsRes.json();
                    setBots(botsData.filter(b => b.bot_type !== 'SKIPPED'));
                }

                // 3. Get Available Templates
                const availableRes = await fetch(`${API_BASE_URL}/user/available-bots`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (availableRes.ok) {
                    setAvailableBots(await availableRes.json());
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Refetch when mode changes (Live <-> Paper)
    useEffect(() => {
        fetchData();
    }, [navigate, isPaperTrading]);

    // --- ACTIONS ---

    const handleToggleBot = async (botId, currentStatus) => {
        const token = localStorage.getItem('token');
        // Optimistic UI Update
        const originalBots = [...bots];
        setBots(bots.map(b =>
            (b.bot_id === botId || b.id === botId)
                ? { ...b, status: currentStatus === 'active' ? 'paused' : 'active' }
                : b
        ));

        try {
            const res = await fetch(`${API_BASE_URL}/user/bot/${botId}/toggle`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) {
                throw new Error("Failed to toggle");
            }
            // Success - Refetch to sync exact state
            fetchData();
        } catch (e) {
            console.error(e);
            alert("Failed to change bot status. Check console.");
            setBots(originalBots); // Revert on error
        }
    };

    const handleDeleteBot = async (botId) => {
        if (!window.confirm("Are you sure you want to delete this bot? This action cannot be undone.")) return;

        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE_URL}/user/bot/${botId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                fetchData(); // Remove from list
            } else {
                alert("Failed to delete bot");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleBotSelect = (botType) => {
        setSelectedBotType(botType);
        setIsCreateModalOpen(false);
        setIsConfigModalOpen(true);
    };

    // --- FILTERING ---
    const filteredBots = bots.filter(bot =>
        bot.quote_currency?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bot.bot_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // --- THEME VARIABLES ---
    const themeColor = isPaperTrading ? '#E2F708' : '#00FF9D';
    const themeText = isPaperTrading ? 'text-[#E2F708]' : 'text-[#00FF9D]';
    const themeBgBtn = isPaperTrading ? 'bg-[#E2F708]' : 'bg-[#00FF9D]';
    const themeHoverBtn = isPaperTrading ? 'hover:bg-[#d4e600]' : 'hover:bg-[#00cc7d]';

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">

            {/* Background FX */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className={`absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-70 mix-blend-screen transition-colors duration-700 ${isPaperTrading ? 'bg-[#E2F708]/20' : 'bg-[#00FF9D]/20'}`}></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className={`absolute bottom-[-30%] left-[20%] w-[60vw] h-[50vh] rounded-full blur-[180px] opacity-70 transition-colors duration-700 ${isPaperTrading ? 'bg-[#E2F708]/10' : 'bg-[#00FF9D]/20'}`}></div>
            </div>

            {/* Modals */}
            <CreateBotModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSelect={handleBotSelect}
            />
            <ConfigureBotModal
                isOpen={isConfigModalOpen}
                onClose={() => setIsConfigModalOpen(false)}
                botType={selectedBotType}
                onSuccess={fetchData}
            />

            <Dash_nav user={user} />

            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className={`text-3xl font-bold ${themeText} drop-shadow-md`}>
                        {isPaperTrading ? 'Paper Bots' : 'Active Bots'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014]/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:border-white transition-colors relative">
                            <Bell size={20} />
                            <div className={`absolute top-2 right-2 w-2 h-2 rounded-full shadow-[0_0_5px_currentColor] ${isPaperTrading ? 'bg-[#E2F708] text-[#E2F708]' : 'bg-[#00FF9D] text-[#00FF9D]'}`}></div>
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className={`text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:scale-105 ${themeBgBtn} ${themeHoverBtn}`}
                        >
                            <Plus size={18} strokeWidth={3} />
                            New Bot
                        </button>
                    </div>
                </header>

                {/* --- ACTIVE BOTS LIST --- */}
                <section className="bg-[#0A1014]/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/5 mb-8 relative min-h-[400px]">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-white">Running Strategies</h2>
                        <div className="relative w-72">
                            <input
                                type="text"
                                placeholder="Search Bots..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0A1014]/50 border border-white/10 pl-4 pr-10 py-2.5 rounded-lg outline-none text-sm font-medium text-white focus:border-white/30 transition-all placeholder:text-gray-600"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className={`animate-spin ${themeText}`} size={40} />
                        </div>
                    ) : filteredBots.length > 0 ? (
                        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                            {filteredBots.map((bot, index) => (
                                <div key={index} className="min-w-[300px] bg-[#0E1416]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative group hover:border-white/20 transition-all duration-300">
                                    <div className="relative z-10">

                                        {/* Bot Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 text-white font-bold">
                                                    {bot.quote_currency?.charAt(0) || '$'}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-sm">{bot.quote_currency || 'Unknown'} Pair</h3>
                                                    <p className={`text-[10px] uppercase tracking-wider ${themeText}`}>{bot.bot_type || 'Custom'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${bot.status === 'active' ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-yellow-500'}`}></div>
                                                <span className="text-[10px] font-bold text-white capitalize">{bot.status}</span>
                                            </div>
                                        </div>

                                        {/* Profit & Sparkline */}
                                        <div className="mb-2">
                                            <p className="text-xs text-gray-400 mb-1">Total Profit</p>
                                            <p className={`text-2xl font-bold ${bot.total_profit >= 0 ? themeText : 'text-red-500'}`}>
                                                {bot.total_profit >= 0 ? '+' : ''}${bot.total_profit}
                                            </p>
                                        </div>

                                        <BotSparkline color={bot.total_profit >= 0 ? themeColor : "#EF4444"} />

                                        <div className="flex justify-between items-center mb-6 pt-2 border-t border-white/5">
                                            <span className="text-xs text-gray-400">Invested Capital</span>
                                            <span className="text-sm font-bold text-white">${bot.invested_capital}</span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            {/* Start/Stop Button */}
                                            <button
                                                onClick={() => handleToggleBot(bot.bot_id || bot.id, bot.status)}
                                                className={`flex-1 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-lg
                                                    ${bot.status === 'active'
                                                        ? 'bg-[#EF4444] text-white hover:bg-red-600'
                                                        : `${themeBgBtn} text-black ${themeHoverBtn}`
                                                    }`}
                                            >
                                                {bot.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                                                {bot.status === 'active' ? 'Stop' : 'Start'}
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDeleteBot(bot.bot_id || bot.id)}
                                                className="px-3 py-3 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-gray-400 transition-colors border border-white/5 hover:border-red-500/50"
                                                title="Delete Bot"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl bg-white/5">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border transition-colors bg-white/5 border-white/10`}>
                                <Activity size={32} className="text-gray-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Active Bots</h3>
                            <p className="text-gray-400 mb-6 text-sm">
                                You don't have any running {isPaperTrading ? 'paper' : 'live'} bots yet.
                            </p>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className={`text-black px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${themeBgBtn} ${themeHoverBtn}`}
                            >
                                <Plus size={18} strokeWidth={3} />
                                Create First Bot
                            </button>
                        </div>
                    )}
                </section>

                {/* --- AVAILABLE BOTS (Templates) --- */}
                <section>
                    <h2 className="text-xl font-bold text-white mb-6">Available Strategy Templates</h2>

                    {availableBots.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {availableBots.map((bot) => (
                                <div
                                    key={bot.bot_id || bot.id}
                                    onClick={() => handleBotSelect(bot.bot_type)}
                                    className={`h-48 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all group bg-[#0A1014]/40 relative overflow-hidden hover:border-[${themeColor}]`}
                                    style={{ borderColor: 'rgba(255,255,255,0.1)' }} // Default border
                                >
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className={`w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:text-black border border-white/5 shadow-lg group-hover:bg-[${themeColor}]`}
                                            style={{ transition: 'all 0.3s ease' }}
                                        >
                                            {bot.icon_url ? (
                                                <img
                                                    src={bot.icon_url}
                                                    alt={bot.bot_name}
                                                    className="w-8 h-8 object-contain group-hover:brightness-0 transition-all duration-300"
                                                />
                                            ) : (
                                                <Bot size={24} className={`text-[${themeColor}] group-hover:text-black`} />
                                            )}
                                        </div>
                                        <span className="font-bold text-white tracking-widest text-xs uppercase">{bot.bot_name}</span>
                                        <span className="text-[10px] text-gray-500 mt-1 uppercase">{bot.bot_type}</span>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className={`absolute inset-0 bg-[${themeColor}]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full bg-[#0A1014]/20 border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                            <Bot size={32} className="text-gray-600 mb-4" />
                            <h3 className="text-lg font-bold text-white">No Templates Available</h3>
                            <p className="text-gray-400 text-sm mt-2">Check back later for new strategies.</p>
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
};

export default Bots;
