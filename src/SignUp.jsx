import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Check, Wallet } from 'lucide-react';

const SignUp = ({ navigateTo }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [activeTab, setActiveTab] = useState('signup'); // Default to signup

    // Handler for tab switching
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'login') {
            navigateTo('signin'); // Switch to the SignIn page component
        }
    };

    return (
        <div className="min-h-screen bg-[#050B0D] text-white font-sans relative overflow-hidden animate-in fade-in duration-500">

            {/* --- Global Ambient Background Effects --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-[#00FF9D]/10 rounded-full blur-[150px]" />
                <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[60vh] bg-[#00A3FF]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[40vh] bg-[#00FF9D]/5 rounded-full blur-[180px]" />
            </div>

            <div className="container mx-auto px-6 py-8 relative z-10">

                {/* --- Header / Back Button --- */}
                <div className="mb-8">
                    <img src="/logo.png" alt="FydBlock" className="h-8 mb-8" />

                    <button
                        onClick={() => navigateTo('home')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* --- Left Column: Form --- */}
                    <div className="max-w-md w-full">

                        {/* Tabs */}
                        <div className="flex gap-8 mb-10">
                            <button
                                onClick={() => handleTabClick('login')}
                                className={`text-2xl font-bold pb-2 relative transition-all ${activeTab === 'login' ? 'text-white' : 'text-gray-500'}`}
                            >
                                Log In
                                {activeTab === 'login' && (
                                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#00FF9D] rounded-full"></span>
                                )}
                            </button>
                            <button
                                onClick={() => handleTabClick('signup')}
                                className={`text-2xl font-bold pb-2 relative transition-all ${activeTab === 'signup' ? 'text-white' : 'text-gray-500'}`}
                            >
                                Sign Up
                                {activeTab === 'signup' && (
                                    <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-[#00FF9D] rounded-full"></span>
                                )}
                            </button>
                        </div>

                        {/* Form */}
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address..."
                                    className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#00FF9D] placeholder:text-gray-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password..."
                                        className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#00FF9D] placeholder:text-gray-500 transition-all pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Requirements Checklist */}
                            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                {[
                                    "8 characters", "1 lowercase letter", "1 special character",
                                    "1 uppercase letter", "1 number"
                                ].map((req, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded bg-[#00FF9D] flex items-center justify-center">
                                            <Check size={10} className="text-black" strokeWidth={3} />
                                        </div>
                                        <span className="text-[10px] text-gray-400 font-medium">{req}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-center gap-2 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="w-5 h-5 rounded border border-gray-500 flex items-center justify-center bg-white group-hover:border-[#00FF9D] transition-colors shrink-0">
                                        <input type="checkbox" className="peer sr-only" />
                                        <Check size={14} className="text-black opacity-0 peer-checked:opacity-100" />
                                    </div>
                                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                        I agree to fydblock's <a href="#" className="text-[#00FF9D] hover:underline">Terms of Service</a>
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/20">
                                Create an Account
                            </button>
                        </form>

                        {/* Social Divider */}
                        <div className="relative my-8 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <span className="relative bg-[#050B0D] px-4 text-sm text-gray-400">OR</span>
                        </div>

                        {/* Social Buttons */}
                        <div className="space-y-4">
                            <button className="w-full bg-transparent border border-white/20 hover:border-white text-white font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-all">
                                <GoogleIcon />
                                Continue with Google
                            </button>
                            <button className="w-full bg-transparent border border-white/20 hover:border-white text-white font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-all">
                                <Wallet size={20} className="text-[#3B82F6]" />
                                Continue with Wallet
                            </button>
                        </div>

                    </div>

                    {/* --- Right Column: Illustration Card --- */}
                    <div className="hidden lg:block relative h-[600px] w-full bg-[#0B2323] rounded-3xl overflow-hidden border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-[80%] h-[80%]">
                                {/* Decorative Elements */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>

                                {/* Placeholder for the illustration in the image */}
                                <img
                                    src="/Group.png"
                                    className="w-full h-full object-contain drop-shadow-2xl opacity-80 mix-blend-lighten"
                                    alt="Sign Up Illustration"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// --- Icons ---

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export default SignUp;