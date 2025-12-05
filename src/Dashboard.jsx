// src/Dashboard.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- CRITICAL FIX: ADDED THIS IMPORT
import {
    Home, Users, Briefcase, TrendingUp, DollarSign, ArrowUp, Plus,
    Bell, LayoutDashboard, Database, BarChart2,
    Package, RefreshCw, SlidersHorizontal,
    Star, BookOpen, Zap // Ensured all icons used in the sidebar are imported
} from 'lucide-react';

// --- Sub-Components ---

const StatCard = ({ title, value, change, icon, color = 'text-green-400', bgColor = 'bg-green-500/10' }) => (
    <div className="bg-[#0A1014] border border-white/10 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 text-sm">{title}</h3>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor} ${color}`}>
                {icon}
            </div>
        </div>
        <p className="text-3xl font-bold text-white mb-1">{value}</p>
        <div className={`flex items-center gap-1 text-sm ${color}`}>
            <ArrowUp size={16} />
            {change}
        </div>
    </div>
);

const ActiveBotCard = ({ symbol, pair, value, change, navigate }) => (
    <div
        className="bg-[#0A1014] border border-white/10 rounded-xl p-6 shadow-lg min-w-[200px] hover:border-[#00FF9D]/50 transition-colors cursor-pointer"
        onClick={() => navigate('/bot-analytics-detail/' + symbol)}
    >
        <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold text-white">{symbol}</h4>
            <span className="text-xs text-gray-500">{pair}</span>
        </div>
        <p className="text-4xl font-bold text-white mb-1">{value}</p>
        <div className="flex items-center gap-1 text-green-400 text-sm">
            <ArrowUp size={16} />
            {change}
        </div>

        {/* Placeholder chart line */}
        <div className="h-10 mt-2">
            <BarChart2 size={40} className="text-[#00FF9D] opacity-60 w-full rotate-180" style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
        </div>
    </div>
);


// --- Main Component ---

const Dashboard = () => {
    const navigate = useNavigate();
    const userProfile = {
        name: "Akeel Aashath",
        status: "Pro Trader"
    };

    // Dashboard Data from your image
    const dashboardStats = [
        { title: "Today's Profit", value: "$52,291", change: "+0.25%", icon: <DollarSign size={18} />, color: 'text-[#00FF9D]', bgColor: 'bg-[#00FF9D]/10' },
        { title: "30 Days Profit", value: "$502,291", change: "+9.48%", icon: <RefreshCw size={18} />, color: 'text-green-400', bgColor: 'bg-green-500/10' },
        { title: "Assets Value", value: "$6,052,291", change: "+96.85%", icon: <Database size={18} />, color: 'text-green-400', bgColor: 'bg-green-500/10' },
    ];

    const activeBots = [
        { symbol: "SOL / USDT", pair: "spot Grid", value: "$191", change: "+0.25%" },
        { symbol: "HYPE / USDT", pair: "spot DCA", value: "$43.21", change: "+0.25%" },
        { symbol: "ETH / USDT", pair: "spot Grid", value: "$2563.12", change: "+0.25%" },
    ];

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#050B0D] text-white font-sans flex">
            {/* --- Sidebar (Desktop only) --- */}
            <aside className={`bg-[#0A1014] w-64 p-6 flex flex-col justify-between border-r border-white/5 ${isSidebarOpen ? '' : 'hidden md:flex'}`}>
                <div>
                    <div className="text-xl font-bold text-[#00FF9D] mb-10 flex items-center gap-2">
                        <LayoutDashboard size={24} /> Dashboard
                    </div>

                    <nav className="space-y-2">
                        {[
                            { name: "Dashboard", icon: <LayoutDashboard size={18} />, active: true, path: "/dashboard" },
                            { name: "My Portfolio", icon: <Package size={18} />, active: false, path: "/portfolio" },
                            { name: "Backtest", icon: <BarChart2 size={18} />, active: false, path: "/backtest" },
                            { name: "Bots", icon: <SlidersHorizontal size={18} />, active: false, path: "/bots" },
                            { name: "My Exchanges", icon: <Database size={18} />, active: false, path: "/exchanges" },
                            { name: "Bot Analytics", icon: <TrendingUp size={18} />, active: false, path: "/analytics" },
                        ].map(item => (
                            <a
                                key={item.name}
                                href={item.path}
                                className={`flex items-center gap-4 p-3 rounded-lg font-medium transition-colors ${item.active
                                        ? 'bg-[#00FF9D] text-black shadow-lg'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <h4 className="text-xs uppercase text-gray-500 mb-3">Other</h4>
                        <nav className="space-y-2">
                            {[
                                { name: "Join our community", icon: <Users size={18} />, path: "#" },
                                { name: "Invite Friends", icon: <Home size={18} />, path: "#" },
                                { name: "Trading Course", icon: <BookOpen size={18} />, path: "#" },
                                { name: "Live Market", icon: <Zap size={18} />, path: "#" },
                                { name: "Subscription", icon: <Star size={18} />, path: "#" },
                            ].map(item => (
                                <a key={item.name} href={item.path} className="flex items-center gap-4 p-3 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
                                    {item.icon}
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                        {/* Placeholder for Akeel Aashath image */}
                        <img src="/profile1.png" alt="Profile" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                    </div>
                    <div>
                        <p className="text-sm font-bold">{userProfile.name}</p>
                        <p className="text-xs text-gray-500">{userProfile.status}</p>
                    </div>
                </div>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 p-8 overflow-y-auto">
                {/* Header Row */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-white"><Bell size={24} /></button>
                        <button
                            onClick={() => navigate('/bot-builder')}
                            className="bg-[#00FF9D] text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-[#00cc7d]"
                        >
                            <Plus size={20} /> New Bot
                        </button>
                    </div>
                </div>

                {/* 1. Statistics Cards */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {dashboardStats.map(stat => (
                        <StatCard key={stat.title} {...stat} />
                    ))}
                </section>

                {/* 2. Performance Analytics */}
                <section className="bg-[#0A1014] border border-white/10 rounded-xl p-6 shadow-lg mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-white">Performance Analytics</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="text-white font-bold">$52,291.02</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer">1h</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer">3h</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer">1d</span>
                            <span className="px-3 py-1 bg-[#00FF9D]/20 text-[#00FF9D] rounded-full font-bold cursor-pointer">1w</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer">1m</span>
                            <span className="px-3 py-1 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer">3m</span>
                        </div>
                    </div>

                    {/* Placeholder Chart Area */}
                    <div className="h-64 flex items-center justify-center bg-transparent">

                    </div>
                </section>

                {/* 3. Active Bots */}
                <section>
                    <h2 className="text-xl font-bold text-white mb-6">Active Bots</h2>
                    <div className="flex gap-6 overflow-x-auto pb-4">
                        {activeBots.map(bot => (
                            <ActiveBotCard key={bot.symbol} {...bot} />
                        ))}

                        {/* Deploy New Bot Card */}
                        <div
                            onClick={() => navigate('/bot-builder')}
                            className="bg-[#0A1014] border border-white/10 rounded-xl p-6 shadow-lg min-w-[200px] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#00FF9D] text-black flex items-center justify-center mb-2">
                                <Plus size={24} />
                            </div>
                            <p className="font-bold text-white">Deploy New Bot</p>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default Dashboard;
