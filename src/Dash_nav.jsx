import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, PieChart, Briefcase, Activity, Terminal, Wallet, LogOut
} from 'lucide-react';

const Dash_nav = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentView = location.pathname;

    const navItems = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "My Portfolio", icon: PieChart, path: "/portfolio" },
        { name: "Bots", icon: Briefcase, path: "/bots" },
        { name: "Backtest", icon: Wallet, path: "#" }, // Placeholder
        { name: "My Exchanges", icon: Terminal, path: "#" }, // Placeholder
        { name: "Terminal", icon: Activity, path: "#" }, // Placeholder
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        // Redirect to home/signin and force reload to clear state
        window.location.href = '/';
    };

    return (
        <aside className="w-64 bg-[#050B0D]/80 backdrop-blur-md border-r border-white/5 flex flex-col justify-between py-6 z-20 hidden md:flex h-full">
            <div className="px-6">
                {/* Logo Area */}
                <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
                    <img src="/logo.png" alt="FydBlock" className="h-8 object-contain" />
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
                                        ? 'bg-[#00FF9D] text-black shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                <item.icon size={18} className={isActive ? "text-black" : "group-hover:text-[#00FF9D] transition-colors"} />
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Section: Profile & Logout */}
            <div className="px-6 pb-2">
                {/* Profile Card */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#00FF9D]/30 transition-all cursor-pointer backdrop-blur-sm mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-600 overflow-hidden relative">
                        <img src="/profile1.png" className="absolute inset-0 w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} alt="Profile" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">{user?.name || 'Trader'}</p>
                        <p className="text-xs text-[#00FF9D]">{user?.plan || 'Free Plan'}</p>
                    </div>
                </div>

                {/* Logout Button */}
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
