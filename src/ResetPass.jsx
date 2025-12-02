import React, { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResetPass = () => {
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
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
                        onClick={() => navigate('/signin')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* --- Left Column: Content --- */}
                    <div className="max-w-md w-full">

                        <h1 className="text-4xl font-bold mb-4">Forgot Password</h1>

                        {!isSubmitted ? (
                            // STATE 1: Enter Email Form
                            <>
                                <p className="text-gray-400 mb-8">
                                    Please enter the email address Associated with your User Account
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address..."
                                            className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#00FF9D] placeholder:text-gray-500 transition-all"
                                        />
                                    </div>

                                    <button className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-green-500/20">
                                        Reset
                                    </button>
                                </form>

                                {/* Warning Box 1 */}
                                <div className="mt-8 bg-white/5 border border-white/10 rounded-lg p-4 flex gap-3">
                                    <Info className="text-yellow-500 shrink-0 mt-1" size={18} />
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Performing a password reset via email confirmation will reset the API
                                        connections and unlink your connected exchange accounts - please
                                        Log In immediately after resetting your password
                                    </p>
                                </div>
                            </>
                        ) : (
                            // STATE 2: Success Message
                            <>
                                <p className="text-gray-400 mb-8">
                                    we send password reset instruction to your email.
                                </p>

                                <button
                                    onClick={() => window.open('mailto:')}
                                    className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-green-500/20 mb-8"
                                >
                                    Sign in with email
                                </button>

                                {/* Warning Box 2 */}
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex gap-3">
                                    <Info className="text-yellow-500 shrink-0 mt-1" size={18} />
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        If you signed up with a third-party service, you cannot reset your
                                        password. Please sign in using the same service.
                                    </p>
                                </div>
                            </>
                        )}

                    </div>

                    {/* --- Right Column: Illustration Card --- */}
                    <div className="hidden lg:block relative h-[600px] w-full bg-[#0B2323] rounded-3xl overflow-hidden border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-[80%] h-[80%]">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>

                                {/* Reuse the illustration from previous pages */}
                                <img
                                    src="/Group.png"
                                    className="w-full h-full object-contain drop-shadow-2xl opacity-80 mix-blend-lighten"
                                    alt="Reset Password Illustration"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResetPass;
