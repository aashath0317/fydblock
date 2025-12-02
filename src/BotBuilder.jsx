import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    ChevronRight,
    Server,
    Zap,
    Activity,
    Layers,
    DollarSign,
    ArrowUpRight
} from 'lucide-react';

// --- MOCK DATA ---
const EXCHANGES = [
    { id: 'binance', name: 'Binance', color: '#F3BA2F' },
    { id: 'bybit', name: 'Bybit', color: '#17181e' }, // usually black/orange
    { id: 'okx', name: 'OKX', color: '#fff' },        // usually white/black checker
    { id: 'coinbase', name: 'Coinbase', color: '#0052FF' },
    { id: 'kraken', name: 'Kraken', color: '#5741D9' },
];

const BOT_TYPES = [
    { id: 'dca', name: 'DCA Bot', desc: 'Buy steadily to average out entry price.', icon: <Layers size={24} /> },
    { id: 'grid', name: 'Grid Bot', desc: 'Profit from sideways market volatility.', icon: <Server size={24} /> },
    { id: 'futures', name: 'Futures Bot', desc: 'High risk/reward with leverage.', icon: <Activity size={24} /> },
    { id: 'signal', name: 'Signal Bot', desc: 'Trade based on TradingView signals.', icon: <Zap size={24} /> },
];

// --- COMPONENTS ---

// 1. Breadcrumb Navigation
const Breadcrumbs = ({ currentStep, setStep }) => {
    const steps = [
        { id: 1, label: 'General Information' },
        { id: 2, label: 'Connect Exchange' },
        { id: 3, label: 'Bot Type' },
        { id: 4, label: 'Bot Builder' },
        { id: 5, label: 'Summary' },
    ];

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-12 text-sm font-medium">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-2 md:gap-4">
                    <button
                        onClick={() => step.id < currentStep && setStep(step.id)}
                        disabled={step.id > currentStep}
                        className={`
              px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2
              ${currentStep === step.id
                                ? 'bg-[#00FF9D] text-black font-bold shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                                : step.id < currentStep
                                    ? 'text-gray-400 hover:text-white cursor-pointer'
                                    : 'text-gray-600 cursor-default'
                            }
            `}
                    >
                        {step.id}. {step.label}
                    </button>

                    {index < steps.length - 1 && (
                        <ArrowRight size={14} className="text-gray-700" />
                    )}
                </div>
            ))}
        </div>
    );
};

// Main Application Component
const BotBuilder = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [wizardData, setWizardData] = useState({
        name: '',
        country: '',
        exchange: '',
        apiKey: '',
        apiSecret: '',
        botType: '',
        investment: '',
        riskLevel: 'medium',
        agreed: false
    });

    // Helper to simulate navigation without Router for this preview
    const handleExit = () => {
        // In your real app: navigate('/dashboard');
        console.log("Navigating back...");
        alert("Navigating back to dashboard (Mock)");
    };

    const nextStep = () => {
        if (currentStep < 5) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleFinalSubmit = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert("Bot Created Successfully! (Mock)");
            handleExit();
        }, 1500);
    };

    // Render Helpers to keep JSX clean
    const renderStep1 = () => (
        <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-normal text-white mb-3">General Information</h1>
                <p className="text-gray-400 font-light">
                    Please provide us with some details about yourself so that you can continue creating your first bot!
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-white text-lg font-medium mb-2">Full name</label>
                    <input
                        type="text"
                        className="w-full bg-white text-black text-lg rounded-lg px-4 py-3 outline-none focus:ring-4 focus:ring-[#00FF9D]/30 transition-shadow"
                        placeholder="e.g. Shaafi"
                        value={wizardData.name}
                        onChange={(e) => setWizardData({ ...wizardData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-white text-lg font-medium mb-2">Country of Resident</label>
                    <div className="relative">
                        <select
                            className="w-full bg-white text-black text-lg rounded-lg px-4 py-3 outline-none appearance-none focus:ring-4 focus:ring-[#00FF9D]/30 transition-shadow cursor-pointer"
                            value={wizardData.country}
                            onChange={(e) => setWizardData({ ...wizardData, country: e.target.value })}
                        >
                            <option value="" disabled>Select Country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="SG">Singapore</option>
                            <option value="JP">Japan</option>
                            <option value="Global">Global / Other</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={20} />
                    </div>
                </div>

                {/* Extra field to match visual balance of screenshot if needed, 
            or just keep it clean with what logic requires. */}

                <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`
              w-5 h-5 rounded border border-gray-400 flex items-center justify-center transition-colors
              ${wizardData.agreed ? 'bg-[#00FF9D] border-[#00FF9D]' : 'bg-transparent'}
            `}>
                            {wizardData.agreed && <Check size={14} className="text-black" />}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={wizardData.agreed}
                            onChange={() => setWizardData({ ...wizardData, agreed: !wizardData.agreed })}
                        />
                        <span className="text-gray-400 group-hover:text-[#00FF9D] transition-colors">
                            I agree to Fydblock's <span className="text-[#00FF9D] underline underline-offset-4">Terms of Service</span>
                        </span>
                    </label>
                </div>

                <button
                    onClick={nextStep}
                    disabled={!wizardData.name || !wizardData.country || !wizardData.agreed}
                    className={`
            mt-6 px-10 py-3 rounded bg-[#00FF9D] text-black font-semibold text-lg hover:bg-[#00cc7d] transition-all
            ${(!wizardData.name || !wizardData.country || !wizardData.agreed) ? 'opacity-50 cursor-not-allowed' : 'opacity-100 shadow-[0_0_20px_rgba(0,255,157,0.4)]'}
          `}
                >
                    Submit
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-normal text-white mb-4 leading-tight">
                    Connect An Exchange To Start<br />Trading
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto font-light">
                    Automate your strategy without code, test it on historical data, optimize, and execute across all connected accounts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {EXCHANGES.slice(0, 3).map((ex) => (
                    <div
                        key={ex.id}
                        onClick={() => setWizardData({ ...wizardData, exchange: ex.id })}
                        className={`
              relative group cursor-pointer h-48 rounded-xl border transition-all duration-300 flex items-center justify-center overflow-hidden
              ${wizardData.exchange === ex.id
                                ? 'bg-gradient-to-br from-[#0A1A20] to-[#050B0D] border-[#00FF9D]'
                                : 'bg-transparent border-gray-800 hover:border-gray-600'
                            }
            `}
                    >
                        {/* Hover Arrow Icon */}
                        <div className={`
              absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
              ${wizardData.exchange === ex.id ? 'bg-[#00FF9D] text-black scale-100' : 'bg-gray-800 text-gray-400 scale-0 group-hover:scale-100'}
            `}>
                            <ArrowUpRight size={18} />
                        </div>

                        {/* Logo Placeholder (using text/styled div since we don't have actual images) */}
                        <div className="flex items-center gap-3">
                            {/* Simulating Logo */}
                            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-white text-black">
                                {ex.name[0]}
                            </div>
                            <span className="text-2xl font-bold uppercase tracking-wider text-white">
                                {ex.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center space-y-6">
                <button
                    className="px-8 py-3 rounded border border-gray-700 text-gray-300 hover:border-white hover:text-white transition-all text-sm uppercase tracking-wide"
                >
                    View other exchanges
                </button>

                <button onClick={nextStep} className="text-gray-500 hover:text-gray-300 text-sm">
                    I will do it later
                </button>
            </div>

            {/* API Key Form (Conditional - appears if exchange selected) */}
            {wizardData.exchange && (
                <div className="mt-12 p-8 border border-gray-800 rounded-xl bg-[#0A1014] animate-in slide-in-from-bottom-4">
                    <h3 className="text-xl text-white mb-6">Enter API Credentials for <span className="text-[#00FF9D] capitalize">{wizardData.exchange}</span></h3>
                    <div className="space-y-4">
                        <input
                            className="w-full bg-[#050B0D] border border-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D]"
                            placeholder="API Key"
                            value={wizardData.apiKey}
                            onChange={(e) => setWizardData({ ...wizardData, apiKey: e.target.value })}
                        />
                        <input
                            className="w-full bg-[#050B0D] border border-gray-700 text-white rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D]"
                            placeholder="API Secret"
                            type="password"
                            value={wizardData.apiSecret}
                            onChange={(e) => setWizardData({ ...wizardData, apiSecret: e.target.value })}
                        />
                        <div className="flex justify-end pt-4">
                            <button onClick={nextStep} className="bg-[#00FF9D] text-black px-6 py-2 rounded font-bold hover:bg-[#00cc7d]">
                                Connect & Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

    const renderStep3 = () => (
        <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-normal text-white mb-4">Select Bot Strategy</h1>
                <p className="text-gray-400">Choose the algorithmic logic that suits your market outlook.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BOT_TYPES.map((bot) => (
                    <div
                        key={bot.id}
                        onClick={() => setWizardData({ ...wizardData, botType: bot.id })}
                        className={`
              cursor-pointer rounded-xl border p-6 flex items-start gap-4 transition-all duration-300
              ${wizardData.botType === bot.id
                                ? 'bg-[#00FF9D] text-black border-[#00FF9D] scale-[1.02]'
                                : 'bg-[#0A1014] border-gray-800 hover:border-gray-600 text-white hover:bg-white/5'
                            }
            `}
                    >
                        <div className={`p-3 rounded-lg ${wizardData.botType === bot.id ? 'bg-black/10' : 'bg-white/5'}`}>
                            {bot.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-1">{bot.name}</h3>
                            <p className={`text-sm ${wizardData.botType === bot.id ? 'text-black/70' : 'text-gray-400'}`}>
                                {bot.desc}
                            </p>
                        </div>
                        {wizardData.botType === bot.id && <Check className="ml-auto" size={20} />}
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <button onClick={nextStep} disabled={!wizardData.botType} className="bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                    Continue
                </button>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
                <h1 className="text-4xl text-white mb-3">Configuration</h1>
                <p className="text-gray-400">Set your risk parameters and investment amount.</p>
            </div>

            <div className="bg-[#0A1014] border border-gray-800 rounded-2xl p-8 space-y-8">
                {/* Investment Input */}
                <div>
                    <label className="flex justify-between text-gray-300 mb-3 font-medium">
                        <span>Investment Amount (USDT)</span>
                        <span className="text-[#00FF9D] font-mono">${wizardData.investment || 0}</span>
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="number"
                            className="w-full bg-[#050B0D] border border-gray-700 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-[#00FF9D]"
                            placeholder="5000"
                            value={wizardData.investment}
                            onChange={(e) => setWizardData({ ...wizardData, investment: e.target.value })}
                        />
                    </div>
                </div>

                {/* Risk Slider */}
                <div>
                    <div className="flex justify-between mb-4">
                        <label className="text-gray-300 font-medium">Risk Level</label>
                        <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider
                  ${wizardData.riskLevel === 'low' ? 'bg-green-500/20 text-green-400' :
                                wizardData.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-red-500/20 text-red-400'
                            }
               `}>
                            {wizardData.riskLevel}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1" max="3" step="1"
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00FF9D]"
                        value={wizardData.riskLevel === 'low' ? 1 : wizardData.riskLevel === 'medium' ? 2 : 3}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setWizardData({ ...wizardData, riskLevel: val === 1 ? 'low' : val === 2 ? 'medium' : 'high' });
                        }}
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button onClick={nextStep} className="bg-[#00FF9D] text-black px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:bg-[#00cc7d]">
                    Review Settings
                </button>
            </div>
        </div>
    );

    const renderStep5 = () => (
        <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-10">
                <h1 className="text-4xl text-white mb-3">Review Summary</h1>
                <p className="text-gray-400">Launch your bot into the market.</p>
            </div>

            <div className="bg-[#0A1014] border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800 bg-white/5 flex justify-between items-center">
                    <h3 className="text-xl text-white font-bold">{wizardData.name}</h3>
                    <span className="text-[#00FF9D] text-sm bg-[#00FF9D]/10 px-3 py-1 rounded-full border border-[#00FF9D]/20">
                        Ready to Launch
                    </span>
                </div>
                <div className="p-6 space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-800/50">
                        <span className="text-gray-500">Exchange</span>
                        <span className="text-white uppercase font-medium">{wizardData.exchange}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800/50">
                        <span className="text-gray-500">Strategy</span>
                        <span className="text-white capitalize font-medium">{wizardData.botType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800/50">
                        <span className="text-gray-500">Investment</span>
                        <span className="text-[#00FF9D] font-mono">${wizardData.investment}</span>
                    </div>
                    <div className="flex justify-between py-2">
                        <span className="text-gray-500">Risk Profile</span>
                        <span className="text-white capitalize font-medium">{wizardData.riskLevel}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
                <button onClick={prevStep} className="text-gray-500 hover:text-white transition-colors">
                    Back to edit
                </button>
                <button
                    onClick={handleFinalSubmit}
                    disabled={loading}
                    className="bg-[#00FF9D] text-black px-12 py-4 rounded-lg font-bold text-lg hover:bg-[#00cc7d] transition-all flex items-center gap-2"
                >
                    {loading ? 'Deploying...' : 'Launch Bot 🚀'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020B0F] text-white font-sans selection:bg-[#00FF9D] selection:text-black flex flex-col">
            {/* Background Gradients (Subtle) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#05181E] to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00FF9D]/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-8 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <button
                        onClick={currentStep === 1 ? handleExit : prevStep}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} /> <span className="text-lg">Back</span>
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-xl tracking-tight text-white">Fydblock.</span>
                        <span className="w-px h-6 bg-gray-700 mx-2"></span>
                        <span className="text-gray-400">Bot Builder</span>
                    </div>
                </div>

                {/* Dynamic Breadcrumbs */}
                <Breadcrumbs currentStep={currentStep} setStep={setCurrentStep} />

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-center py-8">
                    {currentStep === 1 && renderStep1()}
                    {currentStep === 2 && renderStep2()}
                    {currentStep === 3 && renderStep3()}
                    {currentStep === 4 && renderStep4()}
                    {currentStep === 5 && renderStep5()}
                </div>
            </div>
        </div>
    );
};

export default BotBuilder;