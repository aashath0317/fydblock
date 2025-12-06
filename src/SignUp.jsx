import React, { useState } from 'react';
import {
    ArrowLeft, Eye, EyeOff, Check, Wallet,
    Loader2, AlertCircle, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google'; // Import Google Hook
import API_BASE_URL from './config';

const SignUp = () => {
    const navigate = useNavigate();

    // Visibility toggles
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [activeTab, setActiveTab] = useState('signup');

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

    // UI States
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Focus State for showing rules
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    // Password Validation Rules
    const passwordRules = [
        { label: "8 characters", test: (p) => p.length >= 8 },
        { label: "1 lowercase letter", test: (p) => /[a-z]/.test(p) },
        { label: "1 special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
        { label: "1 uppercase letter", test: (p) => /[A-Z]/.test(p) },
        { label: "1 number", test: (p) => /\d/.test(p) },
    ];

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'login') {
            navigate('/signin');
        }
    };

    // --- 1. HANDLE MANUAL SIGN UP ---
    const handleSignUp = async (e) => {
        e.preventDefault();

        // Reset previous states
        setError('');
        setSuccess('');

        // Validate Terms Agreement
        if (!agreed) {
            setError("You must agree to the Terms of Service to create an account.");
            return;
        }

        // Validate Password Match
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        // Validate Password Strength
        const isPasswordValid = passwordRules.every(rule => rule.test(password));
        if (!isPasswordValid) {
            setError("Please meet all password requirements.");
            return;
        }

        // Start Loading
        setIsLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Success State
                localStorage.setItem('token', data.token); // Auto-login after register
                setSuccess('Account created successfully! Redirecting...');

                // Redirect to profile setup
                setTimeout(() => {
                    navigate('/bot-builder');
                }, 1500);
            } else {
                // API Error State
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Unable to connect to the server. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- 2. HANDLE GOOGLE SIGN UP ---
    const handleGoogleSignUp = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            if (!agreed) {
                setError("You must agree to the Terms of Service to sign up.");
                return;
            }

            setIsLoading(true);
            setError('');

            try {
                // Send access_token to backend (Backend handles creation if user doesn't exist)
                const res = await fetch(`${API_BASE_URL}/auth/google`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: tokenResponse.access_token }),
                });

                const data = await res.json();

                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    setSuccess('Google Sign-Up successful!');

                    // Check profile status to determine next step
                    const userRes = await fetch(`${API_BASE_URL}/user/me`, {
                        headers: { 'Authorization': `Bearer ${data.token}` }
                    });

                    if (userRes.ok) {
                        const userData = await userRes.json();
                        setTimeout(() => {
                            if (!userData.profileComplete || !userData.botCreated) {
                                navigate('/bot-builder');
                            } else {
                                navigate('/dashboard');
                            }
                        }, 1500);
                    } else {
                        // Default to builder for new users
                        setTimeout(() => navigate('/bot-builder'), 1500);
                    }
                } else {
                    setError(data.message || 'Google Sign-Up Failed');
                }
            } catch (err) {
                console.error("Google Sign-Up Error", err);
                setError('Server connection error during Google Sign-Up.');
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => setError('Google Sign-Up Failed'),
    });

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
                    <img src="/logo.png" alt="FydBlock" className="h-8 md:h-10 object-contain" />

                    <button
                        onClick={() => navigate('/')}
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
                        <div className="flex gap-8 mb-8">
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

                        {/* --- STATUS MESSAGES (Success/Error) --- */}
                        {error && (
                            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-[#00FF9D]/50 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                <CheckCircle className="text-[#00FF9D] shrink-0 mt-0.5" size={18} />
                                <p className="text-sm text-green-200">{success}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSignUp} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    disabled={isLoading}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address..."
                                    className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#00FF9D] placeholder:text-gray-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        disabled={isLoading}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        placeholder="Enter your password..."
                                        className="w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#00FF9D] placeholder:text-gray-500 transition-all pr-12 disabled:opacity-70 disabled:cursor-not-allowed"
                                    />
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black disabled:opacity-50"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Dynamic Checklist */}
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPasswordFocused || password.length > 0 ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-white/5 p-3 rounded-lg border border-white/10">
                                    {passwordRules.map((req, i) => {
                                        const isValid = req.test(password);
                                        return (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${isValid ? 'bg-[#00FF9D]' : 'bg-gray-600'}`}>
                                                    <Check size={10} className={isValid ? "text-black" : "text-gray-400"} strokeWidth={3} />
                                                </div>
                                                <span className={`text-[10px] font-medium transition-colors ${isValid ? 'text-[#00FF9D]' : 'text-gray-400'}`}>
                                                    {req.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        disabled={isLoading}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm your password..."
                                        className={`w-full bg-white text-black rounded-lg px-4 py-3 outline-none focus:ring-2 placeholder:text-gray-500 transition-all pr-12 disabled:opacity-70 disabled:cursor-not-allowed ${confirmPassword && password !== confirmPassword
                                            ? 'focus:ring-red-500 ring-2 ring-red-500/50'
                                            : 'focus:ring-[#00FF9D]'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        disabled={isLoading}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black disabled:opacity-50"
                                    >
                                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {confirmPassword && password !== confirmPassword && (
                                    <p className="text-red-400 text-xs mt-1 pl-1 animate-in fade-in">Passwords do not match</p>
                                )}
                            </div>

                            {/* Terms Checkbox */}
                            <div className="flex items-center gap-2 pt-2">
                                <label className={`flex items-center gap-2 cursor-pointer group ${isLoading ? 'pointer-events-none opacity-70' : ''}`}>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 
                                        ${agreed ? 'bg-[#00FF9D] border-[#00FF9D]' : 'bg-white border-gray-500 group-hover:border-[#00FF9D]'}
                                    `}>
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={agreed}
                                            disabled={isLoading}
                                            onChange={(e) => setAgreed(e.target.checked)}
                                        />
                                        <Check size={14} className={`text-black transition-opacity ${agreed ? 'opacity-100' : 'opacity-0'}`} />
                                    </div>
                                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                        I agree to Fydblock's <a href="#" className="text-[#00FF9D] hover:underline">Terms of Service</a>
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button with Loading State */}
                            <button
                                className={`w-full font-bold py-3 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2
                                    ${agreed && !isLoading
                                        ? 'bg-[#3B82F6] hover:bg-[#2563EB] text-white hover:shadow-blue-500/20'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                                disabled={!agreed || isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    "Create an Account"
                                )}
                            </button>
                        </form>

                        {/* Social Logic */}
                        <div className="relative my-8 text-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <span className="relative bg-[#050B0D] px-4 text-sm text-gray-400">OR</span>
                        </div>

                        <div className="space-y-4">
                            {/* GOOGLE BUTTON */}
                            <button
                                type="button"
                                onClick={() => handleGoogleSignUp()}
                                disabled={isLoading || !agreed}
                                className={`w-full bg-transparent border border-white/20 hover:border-white text-white font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 ${!agreed ? 'cursor-not-allowed hover:border-white/20' : ''}`}
                                title={!agreed ? "Please agree to Terms of Service first" : ""}
                            >
                                <GoogleIcon />
                                Continue with Google
                            </button>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="hidden lg:block relative h-[600px] w-full bg-[#0B2323] rounded-3xl overflow-hidden border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative w-[80%] h-[80%]">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl"></div>
                                <img
                                    src="/Group.png"
                                    className="w-full h-full object-contain drop-shadow-2xl opacity-80 mix-blend-lighten"
                                    alt="Sign Up Illustration"
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

const GoogleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
);

export default SignUp;
