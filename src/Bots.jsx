// src/Bots.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bell, Plus, Search, Pause, Activity, Loader2, Bot
} from 'lucide-react';
import API_BASE_URL from './config';
import Dash_nav from './Dash_nav';
import CreateBotModal from './CreateBotModal';
import ConfigureBotModal from './ConfigureBotModal';

const BotSparkline = ({ data, color }) => (
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

const Bots = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [bots, setBots] = useState([]);
    const [availableBots, setAvailableBots] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState({ name: "Trader", plan: "Pro Plan Active" });

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
    const [selectedBotType, setSelectedBotType] = useState('');

    const handleBotSelect = (botType) => {
        setSelectedBotType(botType);
        setIsCreateModalOpen(false);
        setIsConfigModalOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate('/signin');

            try {
                const userRes = await fetch(`${API_BASE_URL}/user/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const userData = await userRes.json();
                setUser({ name: userData.user.full_name || "Trader", plan: "Pro Plan Active" });

                const botsRes = await fetch(`${API_BASE_URL}/user/bots`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (botsRes.ok) {
                    const botsData = await botsRes.json();
                    setBots(botsData.filter(b => b.bot_type !== 'SKIPPED'));
                }

                const availableRes = await fetch(`${API_BASE_URL}/user/available-bots`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (availableRes.ok) {
                    const availableData = await availableRes.json();
                    setAvailableBots(availableData);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const filteredBots = bots.filter(bot =>
        bot.quote_currency?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bot.bot_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#050B0D] font-sans text-white overflow-hidden selection:bg-[#00FF9D] selection:text-black relative">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00FF9D]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/20 rounded-full blur-[150px] opacity-70 mix-blend-screen"></div>
                <div className="absolute bottom-[-30%] left-[20%] w-[60vw] h-[50vh] bg-[#00FF9D]/20 rounded-full blur-[180px] opacity-70"></div>
            </div>

            <CreateBotModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSelect={handleBotSelect}
            />
            <ConfigureBotModal
                isOpen={isConfigModalOpen}
                onClose={() => setIsConfigModalOpen(false)}
                botType={selectedBotType}
            />

            <Dash_nav user={user} />

            <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold text-[#00FF9D] drop-shadow-[0_0_10px_rgba(0,255,157,0.3)]">My Active Bots</h1>
                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-xl bg-[#0A1014]/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white hover:border-[#00FF9D] transition-colors relative">
                            <Bell size={20} />
                            <div className="absolute top-2 right-2 w-2 h-2 bg-[#00FF9D] rounded-full shadow-[0_0_5px_#00FF9D]"></div>
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.5)]"
                        >
                            <Plus size={18} strokeWidth={3} />
                            New Bot
                        </button>
                    </div>
                </header>

                {/* Active Bots Section */}
                <section className="bg-[#0A1014]/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/5 mb-8 relative overflow-hidden min-h-[400px]">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-xl font-bold text-white">Active Bots</h2>
                        <div className="relative w-72">
                            <input
                                type="text"
                                placeholder="Search Bots..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#0A1014]/50 border border-white/10 pl-4 pr-10 py-2.5 rounded-lg outline-none text-sm font-medium text-white focus:border-[#00FF9D] transition-all placeholder:text-gray-600"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-[#00FF9D]" size={40} />
                        </div>
                    ) : filteredBots.length > 0 ? (
                        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                            {filteredBots.map((bot, index) => (
                                <div key={index} className="min-w-[300px] bg-[#0E1416]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 relative group hover:border-[#00FF9D]/30 transition-all duration-300">
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                                    <span className="font-bold text-white">{bot.quote_currency?.charAt(0) || '$'}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white text-sm">{bot.quote_currency || 'Unknown'} Pair</h3>
                                                    <p className="text-[10px] text-[#00FF9D] uppercase tracking-wider">{bot.bot_type || 'Custom Bot'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] shadow-[0_0_5px_#00FF9D]"></div>
                                                <span className="text-[10px] font-bold text-white">Running</span>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <p className="text-xs text-gray-400 mb-1">Total Profit</p>
                                            <p className={`text-2xl font-bold ${bot.total_profit >= 0 ? 'text-[#00FF9D]' : 'text-red-500'}`}>
                                                {bot.total_profit >= 0 ? '+' : ''}${bot.total_profit}
                                            </p>
                                        </div>
                                        <BotSparkline color={bot.total_profit >= 0 ? "#00FF9D" : "#EF4444"} />
                                        <div className="flex justify-between items-center mb-6 pt-2 border-t border-white/5">
                                            <span className="text-xs text-gray-400">Invested Capital</span>
                                            <span className="text-sm font-bold text-white">${bot.invested_capital}</span>
                                        </div>
                                        <button className="w-full bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-[0_0_15px_rgba(0,255,157,0.2)]">
                                            <Pause size={14} fill="black" />
                                            Pause / Stop
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-2xl bg-white/5">
                            <div className="w-16 h-16 bg-[#00FF9D]/10 rounded-full flex items-center justify-center mb-4 border border-[#00FF9D]/20">
                                <Activity size={32} className="text-[#00FF9D]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No Running Bots Available</h3>
                            <p className="text-gray-400 mb-6 text-sm">You currently don't have any active trading bots.</p>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-[#00FF9D] text-black px-8 py-3 rounded-xl font-bold hover:bg-[#00cc7d] transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] flex items-center gap-2"
                            >
                                <Plus size={18} strokeWidth={3} />
                                Activate New Bot
                            </button>
                        </div>
                    )}
                </section>

                {/* Available Bots Grid */}
                <section>
                    <h2 className="text-xl font-bold text-white mb-6">Available Bots</h2>

                    {availableBots.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {availableBots.map((bot) => (
                                <div
                                    key={bot.bot_id || bot.id}
                                    onClick={() => handleBotSelect(bot.bot_type)}
                                    className="h-48 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#00FF9D] hover:bg-[#00FF9D]/5 transition-all group bg-[#0A1014]/40 relative overflow-hidden"
                                >
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-[#00FF9D] group-hover:text-black border border-white/5 group-hover:border-[#00FF9D] shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                                            {/* RENDER CUSTOM ICON WITH HOVER EFFECT */}
                                            {bot.icon_url ? (
                                                <img
                                                    src={bot.icon_url}
                                                    alt={bot.bot_name}
                                                    className="w-8 h-8 object-contain group-hover:brightness-0 transition-all duration-300"
                                                />
                                            ) : (
                                                <Bot size={24} className="text-[#00FF9D] group-hover:text-black" />
                                            )}
                                        </div>
                                        <span className="font-bold text-white tracking-widest text-xs uppercase">{bot.bot_name}</span>
                                        <span className="text-[10px] text-gray-500 mt-1 uppercase">{bot.bot_type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full bg-[#0A1014]/20 border border-white/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center mb-4 text-gray-500">
                                <Bot size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-white">No Bots Available</h3>
                            <p className="text-gray-400 text-sm mt-2">There are currently no system bots available to deploy.</p>
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
};

export default Bots;
