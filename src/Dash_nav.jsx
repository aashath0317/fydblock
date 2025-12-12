// src/Dash_nav.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, PieChart, Briefcase, Activity, Terminal, Wallet, LogOut, FileText
} from 'lucide-react';
import { useTrading } from './context/TradingContext'; // <--- Import Context Hook

const Dash_nav = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentView = location.pathname;

    // Consume Global State for Paper Trading
    const { isPaperTrading, togglePaperTrading } = useTrading();

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "My Portfolio", icon: PieChart, path: "/portfolio" },
        { name: "Bots", icon: Briefcase, path: "/bots" },
        { name: "Backtest", icon: Wallet, path: "/backtest" },
        { name: "Terminal", icon: Activity, path: "/live-market" },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Redirect to home and force reload to clear app state
        window.location.href = '/';
    };

    // Determine Theme Colors based on Active Mode
    // Live = Green (#00FF9D), Paper = Yellow (#E2F708)
    const activeColor = isPaperTrading ? 'text-[#E2F708]' : 'text-[#00FF9D]';
    const activeBg = isPaperTrading ? 'bg-[#E2F708]' : 'bg-[#00FF9D]';
    const shadowClass = isPaperTrading ? 'shadow-[0_0_15px_rgba(226,247,8,0.3)]' : 'shadow-[0_0_15px_rgba(0,255,157,0.3)]';
    const hoverBorder = isPaperTrading ? 'hover:border-[#E2F708]/30' : 'hover:border-[#00FF9D]/30';

    return (
        <aside className="w-64 bg-[#050B0D]/90 backdrop-blur-xl border-r border-white/5 flex flex-col justify-between py-6 z-50 hidden md:flex h-full sticky top-0">
            <div className="px-6">
                {/* Logo Area */}
                <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="FydBlock" className="h-8 object-contain" />
                </div>

                {/* --- GLOBAL TRADING MODE TOGGLE --- */}
                <div className="mb-8 bg-[#0A1014] border border-white/10 p-1.5 rounded-xl flex items-center relative">
                    {/* Animated Background Slider */}
                    <div
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-lg transition-all duration-300 ${activeBg}`}
                        style={{ left: isPaperTrading ? 'calc(50% + 3px)' : '3px' }}
                    ></div>

                    <button
                        onClick={() => togglePaperTrading(false)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-300 z-10 text-center ${!isPaperTrading ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        Live
                    </button>
                    <button
                        onClick={() => togglePaperTrading(true)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all duration-300 z-10 flex items-center justify-center gap-1.5 ${isPaperTrading ? 'text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        <FileText size={12} />
                        Paper
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = currentView === item.path;
                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group 
                                ${isActive
                                        ? `${activeBg} text-black ${shadowClass}`
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <item.icon
                                    size={18}
                                    className={isActive ? "text-black" : `group-hover:${activeColor} transition-colors text-gray-500`}
                                />
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section: Profile & Logout */}
            <div className="px-6 pb-2">
                <div className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer backdrop-blur-sm mb-4 bg-white/5 border-white/5 ${hoverBorder}`}>
                    <div className="w-10 h-10 rounded-lg bg-gray-600 overflow-hidden relative">
                        <img
                            src="/profile1.png"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => e.target.style.display = 'none'}
                            alt="Profile"
                        />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">{user?.name || 'Trader'}</p>
                        <p className={`text-xs ${activeColor}`}>
                            {isPaperTrading ? 'Demo Account' : (user?.plan || 'Free Plan')}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                >
                    <LogOut size={18} />
                    Log Out
                </button>
            </div>
        </aside>
    );
};

export default Dash_nav;
