import React from 'react';
import { X, DollarSign, BarChart2, TrendingUp, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateBotModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleSelect = (botType) => {
        // Navigate to builder, optionally passing the bot type
        // You can read this in BotBuilder using searchParams
        navigate(`/bot-builder?type=${botType}&step=1`);
        onClose();
    };

    const botOptions = [
        {
            id: 'spot_dca',
            title: 'SPOT DCA',
            desc: 'Dollar Cost Averaging for spot trading.',
            icon: <DollarSign size={32} className="text-[#00FF9D]" />,
            type: 'dca'
        },
        {
            id: 'spot_grid',
            title: 'SPOT GRID',
            desc: 'Grid trading strategy for spot markets.',
            icon: <BarChart2 size={32} className="text-[#00FF9D]" />,
            type: 'grid'
        },
        {
            id: 'future_grid',
            title: 'FUTURE GRID',
            desc: 'Grid trading for futures contracts.',
            icon: <TrendingUp size={32} className="text-[#00FF9D]" />,
            type: 'futures_grid'
        },
        {
            id: 'future_dca',
            title: 'FUTURE DCA',
            desc: 'DCA strategy for futures trading.',
            icon: <Activity size={32} className="text-[#00FF9D]" />,
            type: 'futures_dca'
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Container */}
            <div className="bg-[#0A1014] border border-white/10 rounded-3xl w-full max-w-4xl p-8 relative shadow-2xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold text-white mb-8">Create New Bot</h2>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {botOptions.map((bot) => (
                        <div
                            key={bot.id}
                            className="bg-[#131B1F] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#00FF9D]/30 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#00FF9D]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF9D]/20 transition-colors">
                                {bot.icon}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{bot.title}</h3>
                            <p className="text-sm text-gray-400 mb-6">{bot.desc}</p>

                            <button
                                onClick={() => handleSelect(bot.type)}
                                className="w-full bg-[#00FF9D] text-black font-bold py-3 rounded-lg hover:bg-[#00cc7d] transition-colors shadow-[0_0_15px_rgba(0,255,157,0.2)]"
                            >
                                Select
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreateBotModal;
