import React, { useState, useEffect } from 'react';
import { X, Bot, Loader2 } from 'lucide-react';
import API_BASE_URL from './config';

const CreateBotModal = ({ isOpen, onClose, onSelect }) => {
    const [availableBots, setAvailableBots] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch bots when modal opens
    useEffect(() => {
        if (isOpen) {
            fetchAvailableBots();
        }
    }, [isOpen]);

    const fetchAvailableBots = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/user/available-bots`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setAvailableBots(data);
            } else {
                console.error("Failed to fetch available bots");
            }
        } catch (error) {
            console.error("Error fetching bots:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0A1014] border border-white/10 rounded-3xl w-full max-w-4xl p-8 relative shadow-2xl">

                <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-white mb-8">Create New Bot</h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="animate-spin text-[#00FF9D]" size={32} />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto pr-2">
                        {availableBots.length > 0 ? (
                            availableBots.map((bot) => (
                                <div key={bot.bot_id || bot.id} className="bg-[#131B1F] border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center hover:border-[#00FF9D]/30 transition-all group">

                                    {/* Icon Display */}
                                    <div className="w-16 h-16 rounded-full bg-[#00FF9D]/10 flex items-center justify-center mb-4 group-hover:bg-[#00FF9D]/20 transition-colors border border-[#00FF9D]/20">
                                        {bot.icon_url ? (
                                            <img
                                                src={bot.icon_url}
                                                alt={bot.bot_name}
                                                className="w-8 h-8 object-contain group-hover:brightness-0 transition-all duration-300"
                                            />
                                        ) : (
                                            <Bot size={32} className="text-[#00FF9D]" />
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 uppercase">{bot.bot_name}</h3>

                                    <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                                        {bot.description || `Automated ${bot.bot_type} trading strategy.`}
                                    </p>

                                    <button
                                        onClick={() => onSelect(bot.bot_type)} // Passes bot type back to parent
                                        className="w-full bg-[#00FF9D] text-black font-bold py-3 rounded-lg hover:bg-[#00cc7d] transition-colors shadow-[0_0_15px_rgba(0,255,157,0.2)]"
                                    >
                                        Select
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-10 text-gray-500">
                                <Bot size={48} className="mx-auto mb-3 opacity-20" />
                                <p>No system bots are currently available.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateBotModal;
