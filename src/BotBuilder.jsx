import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Check,
    ChevronRight,
    ArrowUpRight,
    CheckCircle2,
    Loader2,
    Zap,
    Lock,
    BarChart2,
    Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from './config';

// --- CONSTANTS ---

const COUNTRIES = [
    { name: "Afghanistan", code: "+93" },
    { name: "Albania", code: "+355" },
    { name: "Algeria", code: "+213" },
    { name: "American Samoa", code: "+1684" },
    { name: "Andorra", code: "+376" },
    { name: "Angola", code: "+244" },
    { name: "Anguilla", code: "+1264" },
    { name: "Antigua and Barbuda", code: "+1268" },
    { name: "Argentina", code: "+54" },
    { name: "Armenia", code: "+374" },
    { name: "Aruba", code: "+297" },
    { name: "Australia", code: "+61" },
    { name: "Austria", code: "+43" },
    { name: "Azerbaijan", code: "+994" },
    { name: "Bahamas", code: "+1242" },
    { name: "Bahrain", code: "+973" },
    { name: "Bangladesh", code: "+880" },
    { name: "Barbados", code: "+1246" },
    { name: "Belarus", code: "+375" },
    { name: "Belgium", code: "+32" },
    { name: "Belize", code: "+501" },
    { name: "Benin", code: "+229" },
    { name: "Bermuda", code: "+1441" },
    { name: "Bhutan", code: "+975" },
    { name: "Bolivia", code: "+591" },
    { name: "Bosnia and Herzegovina", code: "+387" },
    { name: "Botswana", code: "+267" },
    { name: "Brazil", code: "+55" },
    { name: "British Virgin Islands", code: "+1284" },
    { name: "Brunei Darussalam", code: "+673" },
    { name: "Bulgaria", code: "+359" },
    { name: "Burkina Faso", code: "+226" },
    { name: "Burundi", code: "+257" },
    { name: "Cambodia", code: "+855" },
    { name: "Cameroon", code: "+237" },
    { name: "Canada", code: "+1" },
    { name: "Cape Verde", code: "+238" },
    { name: "Cayman Islands", code: "+1345" },
    { name: "Central African Rep.", code: "+236" },
    { name: "Chad", code: "+235" },
    { name: "Chile", code: "+56" },
    { name: "China", code: "+86" },
    { name: "Colombia", code: "+57" },
    { name: "Comoros", code: "+269" },
    { name: "Congo", code: "+242" },
    { name: "Cook Islands", code: "+682" },
    { name: "Costa Rica", code: "+506" },
    { name: "Côte d'Ivoire", code: "+225" },
    { name: "Croatia", code: "+385" },
    { name: "Cuba", code: "+53" },
    { name: "Cyprus", code: "+357" },
    { name: "Czech Rep.", code: "+420" },
    { name: "Denmark", code: "+45" },
    { name: "Djibouti", code: "+253" },
    { name: "Dominica", code: "+1767" },
    { name: "Dominican Rep.", code: "+1809" },
    { name: "Ecuador", code: "+593" },
    { name: "Egypt", code: "+20" },
    { name: "El Salvador", code: "+503" },
    { name: "Equatorial Guinea", code: "+240" },
    { name: "Eritrea", code: "+291" },
    { name: "Estonia", code: "+372" },
    { name: "Ethiopia", code: "+251" },
    { name: "Falkland Islands", code: "+500" },
    { name: "Faroe Islands", code: "+298" },
    { name: "Fiji", code: "+679" },
    { name: "Finland", code: "+358" },
    { name: "France", code: "+33" },
    { name: "French Guiana", code: "+594" },
    { name: "French Polynesia", code: "+689" },
    { name: "Gabon", code: "+241" },
    { name: "Gambia", code: "+220" },
    { name: "Georgia", code: "+995" },
    { name: "Germany", code: "+49" },
    { name: "Ghana", code: "+233" },
    { name: "Gibraltar", code: "+350" },
    { name: "Greece", code: "+30" },
    { name: "Greenland", code: "+299" },
    { name: "Grenada", code: "+1473" },
    { name: "Guadeloupe", code: "+590" },
    { name: "Guam", code: "+1671" },
    { name: "Guatemala", code: "+502" },
    { name: "Guinea", code: "+224" },
    { name: "Guinea-Bissau", code: "+245" },
    { name: "Guyana", code: "+592" },
    { name: "Haiti", code: "+509" },
    { name: "Honduras", code: "+504" },
    { name: "Hong Kong", code: "+852" },
    { name: "Hungary", code: "+36" },
    { name: "Iceland", code: "+354" },
    { name: "India", code: "+91" },
    { name: "Indonesia", code: "+62" },
    { name: "Iran", code: "+98" },
    { name: "Iraq", code: "+964" },
    { name: "Ireland", code: "+353" },
    { name: "Israel", code: "+972" },
    { name: "Italy", code: "+39" },
    { name: "Jamaica", code: "+1876" },
    { name: "Japan", code: "+81" },
    { name: "Jordan", code: "+962" },
    { name: "Kazakhstan", code: "+7" },
    { name: "Kenya", code: "+254" },
    { name: "Kiribati", code: "+686" },
    { name: "Korea (North)", code: "+850" },
    { name: "Korea (South)", code: "+82" },
    { name: "Kuwait", code: "+965" },
    { name: "Kyrgyzstan", code: "+996" },
    { name: "Laos", code: "+856" },
    { name: "Latvia", code: "+371" },
    { name: "Lebanon", code: "+961" },
    { name: "Lesotho", code: "+266" },
    { name: "Liberia", code: "+231" },
    { name: "Libya", code: "+218" },
    { name: "Liechtenstein", code: "+423" },
    { name: "Lithuania", code: "+370" },
    { name: "Luxembourg", code: "+352" },
    { name: "Macao", code: "+853" },
    { name: "Madagascar", code: "+261" },
    { name: "Malawi", code: "+265" },
    { name: "Malaysia", code: "+60" },
    { name: "Maldives", code: "+960" },
    { name: "Mali", code: "+223" },
    { name: "Malta", code: "+356" },
    { name: "Marshall Islands", code: "+692" },
    { name: "Martinique", code: "+596" },
    { name: "Mauritania", code: "+222" },
    { name: "Mauritius", code: "+230" },
    { name: "Mexico", code: "+52" },
    { name: "Micronesia", code: "+691" },
    { name: "Moldova", code: "+373" },
    { name: "Monaco", code: "+377" },
    { name: "Mongolia", code: "+976" },
    { name: "Montenegro", code: "+382" },
    { name: "Montserrat", code: "+1664" },
    { name: "Morocco", code: "+212" },
    { name: "Mozambique", code: "+258" },
    { name: "Myanmar", code: "+95" },
    { name: "Namibia", code: "+264" },
    { name: "Nauru", code: "+674" },
    { name: "Nepal", code: "+977" },
    { name: "Netherlands", code: "+31" },
    { name: "New Caledonia", code: "+687" },
    { name: "New Zealand", code: "+64" },
    { name: "Nicaragua", code: "+505" },
    { name: "Niger", code: "+227" },
    { name: "Nigeria", code: "+234" },
    { name: "Niue", code: "+683" },
    { name: "Northern Marianas", code: "+1670" },
    { name: "Norway", code: "+47" },
    { name: "Oman", code: "+968" },
    { name: "Pakistan", code: "+92" },
    { name: "Palau", code: "+680" },
    { name: "Panama", code: "+507" },
    { name: "Papua New Guinea", code: "+675" },
    { name: "Paraguay", code: "+595" },
    { name: "Peru", code: "+51" },
    { name: "Philippines", code: "+63" },
    { name: "Poland", code: "+48" },
    { name: "Portugal", code: "+351" },
    { name: "Puerto Rico", code: "+1" },
    { name: "Qatar", code: "+974" },
    { name: "Romania", code: "+40" },
    { name: "Russia", code: "+7" },
    { name: "Rwanda", code: "+250" },
    { name: "Saint Kitts and Nevis", code: "+1869" },
    { name: "Saint Lucia", code: "+1758" },
    { name: "Saint Vincent", code: "+1784" },
    { name: "Samoa", code: "+685" },
    { name: "San Marino", code: "+378" },
    { name: "Sao Tome and Principe", code: "+239" },
    { name: "Saudi Arabia", code: "+966" },
    { name: "Senegal", code: "+221" },
    { name: "Serbia", code: "+381" },
    { name: "Seychelles", code: "+248" },
    { name: "Sierra Leone", code: "+232" },
    { name: "Singapore", code: "+65" },
    { name: "Sint Maarten", code: "+1721" },
    { name: "Slovakia", code: "+421" },
    { name: "Slovenia", code: "+386" },
    { name: "Solomon Islands", code: "+677" },
    { name: "Somalia", code: "+252" },
    { name: "South Africa", code: "+27" },
    { name: "South Sudan", code: "+211" },
    { name: "Spain", code: "+34" },
    { name: "Sri Lanka", code: "+94" },
    { name: "Sudan", code: "+249" },
    { name: "Suriname", code: "+597" },
    { name: "Swaziland", code: "+268" },
    { name: "Sweden", code: "+46" },
    { name: "Switzerland", code: "+41" },
    { name: "Syria", code: "+963" },
    { name: "Taiwan", code: "+886" },
    { name: "Tajikistan", code: "+992" },
    { name: "Tanzania", code: "+255" },
    { name: "Thailand", code: "+66" },
    { name: "Timor-Leste", code: "+670" },
    { name: "Togo", code: "+228" },
    { name: "Tokelau", code: "+690" },
    { name: "Tonga", code: "+676" },
    { name: "Trinidad and Tobago", code: "+1868" },
    { name: "Tunisia", code: "+216" },
    { name: "Turkey", code: "+90" },
    { name: "Turkmenistan", code: "+993" },
    { name: "Turks and Caicos", code: "+1649" },
    { name: "Tuvalu", code: "+688" },
    { name: "Uganda", code: "+256" },
    { name: "Ukraine", code: "+380" },
    { name: "UAE", code: "+971" },
    { name: "UK", code: "+44" },
    { name: "USA", code: "+1" },
    { name: "Uruguay", code: "+598" },
    { name: "Uzbekistan", code: "+998" },
    { name: "Vanuatu", code: "+678" },
    { name: "Venezuela", code: "+58" },
    { name: "Vietnam", code: "+84" },
    { name: "Yemen", code: "+967" },
    { name: "Zambia", code: "+260" },
    { name: "Zimbabwe", code: "+263" },
];

const EXCHANGES = [
    { id: 'binance', name: 'Binance', logo: '/logos/BINANCE.png' },
    { id: 'bybit', name: 'Bybit', logo: '/logos/BYBIT.png' },
    { id: 'okx', name: 'OKX', logo: '/logos/OKX.jpg' },
];

const CURRENCIES = [
    { id: 'USDT', name: 'USDT', icon: 'T', symbol: '$' },
    { id: 'USDC', name: 'USDC', icon: '$', symbol: '$' },
    { id: 'BNB', name: 'BNB', icon: 'B', symbol: 'B' },
    { id: 'BTC', name: 'BTC', icon: '₿', symbol: '₿' },
    { id: 'EUR', name: 'EUR', icon: '€', symbol: '€' },
];

// --- COMPONENTS ---

const Breadcrumbs = ({ currentStep }) => {
    const steps = [
        { id: 1, label: '1. General Information' },
        { id: 2, label: '3. Connect Exchange' },
        { id: 3, label: '4. Select Currency' },
        { id: 4, label: '2. Bot Type & Plans' },
        { id: 5, label: '5. Let\'s Trade' },
    ];
    const stepsInFlow = [1, 2, 3, 4, 5];

    return (
        <div className="flex flex-wrap justify-center items-center gap-4 mb-12 text-sm font-medium">
            {stepsInFlow.map((flowStep, index) => {
                const step = steps[index];
                return (
                    <div key={step.id} className="flex items-center gap-3">
                        <span className={`
                            px-3 py-2 rounded transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                            ${currentStep === flowStep
                                ? 'bg-[#00FF9D] text-black font-bold shadow-[0_0_15px_rgba(0,255,157,0.3)]'
                                : flowStep < currentStep
                                    ? 'text-[#00FF9D]'
                                    : 'text-gray-500'
                            }
                        `}>
                            {step.label}
                        </span>
                        {index < steps.length - 1 && <span className="text-gray-700">→</span>}
                    </div>
                );
            })}
        </div>
    );
};

const BotBuilder = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [wizardData, setWizardData] = useState({
        name: '',
        country: '',
        phoneCode: '',
        phoneNumber: '',
        exchange: '',
        apiKey: '',
        apiSecret: '',
        currency: 'USDT',
        plan: 'signature',
        billingCycle: 'monthly',
        agreed: false
    });

    // --- ACCESS CONTROL & INITIALIZATION ---
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin');
            return;
        }

        const checkStatus = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/user/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();

                if (data.botCreated) {
                    navigate('/dashboard');
                    return;
                }

                if (data.profileComplete) {
                    // Pre-fill phone logic: Try to split code if possible
                    const countryObj = COUNTRIES.find(c => c.name === data.user.country);
                    const pCode = countryObj ? countryObj.code : '';
                    let pNum = data.user.phone_number || '';
                    if (pCode && pNum.startsWith(pCode)) {
                        pNum = pNum.substring(pCode.length);
                    }

                    setWizardData(prev => ({
                        ...prev,
                        name: data.user.full_name,
                        country: data.user.country,
                        phoneCode: pCode,
                        phoneNumber: pNum,
                        agreed: true
                    }));
                }
            } catch (err) {
                navigate('/signin');
            }
        };

        checkStatus();
    }, [navigate]);

    // --- HANDLERS ---
    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        const countryData = COUNTRIES.find(c => c.name === selectedCountry);
        setWizardData(prev => ({
            ...prev,
            country: selectedCountry,
            phoneCode: countryData ? countryData.code : ''
        }));
    };

    // --- API HANDLERS ---
    const submitStep1 = async () => {
        if (!wizardData.name || !wizardData.country || !wizardData.phoneNumber || !wizardData.agreed) {
            return alert("Please fill all fields and agree to the terms.");
        }
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            // Combine code and number for the API
            const fullPhone = `${wizardData.phoneCode}${wizardData.phoneNumber}`;

            const res = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    full_name: wizardData.name,
                    country: wizardData.country,
                    phone: fullPhone
                })
            });
            if (res.ok) { setCurrentStep(2); } else { alert("Failed to save profile."); }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const submitStep2 = async () => {
        if (!wizardData.exchange) return alert("Please select an exchange.");
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/exchange`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ exchange_name: wizardData.exchange, api_key: wizardData.apiKey || "dummy_key", api_secret: wizardData.apiSecret || "dummy_secret" })
            });

            if (res.ok) { setCurrentStep(3); } else { alert("Failed to connect exchange."); }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    const submitFinalBot = async () => {
        if (!wizardData.plan) return alert("Please select a plan.");
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/bot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    bot_name: `${wizardData.plan} Bot`,
                    quote_currency: wizardData.currency,
                    bot_type: 'DCA',
                    plan: wizardData.plan,
                    billing_cycle: wizardData.billingCycle
                })
            });

            if (res.ok) {
                navigate('/dashboard'); // FIXED: Redirect to dashboard instead of setting step
            } else {
                alert("Failed to create bot.");
            }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    // --- RENDER HELPERS ---

    const renderStep1 = () => (
        <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">General Information</h1>
                <p className="text-gray-400 font-light text-lg">
                    Please provide us with some details about yourself so that you can continue creating your first bot!
                </p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-white text-lg font-medium mb-2">Full name</label>
                    <input
                        type="text"
                        className="w-full bg-[#0A1014]/80 backdrop-blur-sm border border-white/10 text-white text-lg rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D] transition-all"
                        placeholder="Shaafi"
                        value={wizardData.name}
                        onChange={(e) => setWizardData({ ...wizardData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-white text-lg font-medium mb-2">Country of Resident</label>
                    <div className="relative">
                        <select
                            className="w-full bg-[#0A1014]/80 backdrop-blur-sm border border-white/10 text-white text-lg rounded-lg px-4 py-3 outline-none appearance-none focus:border-[#00FF9D] transition-all cursor-pointer"
                            value={wizardData.country}
                            onChange={handleCountryChange}
                        >
                            <option value="" disabled>Select Country</option>
                            {COUNTRIES.map((country, index) => (
                                <option key={index} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ChevronRight className="rotate-90" size={20} />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-white text-lg font-medium mb-2">Phone Number</label>
                    <div className="flex gap-4">
                        {/* Read-only Code Field */}
                        <div className="w-[120px] relative">
                            <input
                                type="text"
                                readOnly
                                value={wizardData.phoneCode}
                                className="w-full bg-[#0A1014]/80 backdrop-blur-sm border border-white/10 text-white text-lg rounded-lg px-4 py-3 outline-none text-center cursor-default"
                                placeholder="+1"
                            />
                        </div>
                        {/* Writable Number Field */}
                        <div className="flex-1 relative">
                            <input
                                type="tel"
                                value={wizardData.phoneNumber}
                                onChange={(e) => setWizardData({ ...wizardData, phoneNumber: e.target.value.replace(/\D/g, '') })}
                                className="w-full bg-[#0A1014]/80 backdrop-blur-sm border border-white/10 text-white text-lg rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D] transition-all"
                                placeholder="123 456 7890"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${wizardData.agreed ? 'bg-[#00FF9D] border-[#00FF9D]' : 'border-gray-500'}`}>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={wizardData.agreed}
                                onChange={() => setWizardData({ ...wizardData, agreed: !wizardData.agreed })}
                            />
                            {wizardData.agreed && <Check size={14} className="text-black" />}
                        </div>
                        <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                            I agree to fydblock's <span className="text-[#00FF9D]">Terms of Service</span>
                        </span>
                    </label>
                </div>

                <button
                    onClick={submitStep1}
                    disabled={!wizardData.name || !wizardData.country || !wizardData.phoneNumber || !wizardData.agreed || loading}
                    className={`
                        mt-8 px-10 py-3 rounded-lg bg-[#00FF9D] text-black font-bold text-lg hover:bg-[#00cc7d] transition-all w-40 flex items-center justify-center
                        ${loading || !wizardData.name ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_20px_rgba(0,255,157,0.4)]'}
                    `}
                >
                    {loading ? <Loader2 className="animate-spin" size={24} /> : "Submit"}
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500 relative z-10">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    Connect An Exchange To Start<br />Trading
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                    Automate your strategy without code, test it on historical data, optimize, and execute across all connected accounts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {EXCHANGES.map((ex) => (
                    <div
                        key={ex.id}
                        onClick={() => setWizardData({ ...wizardData, exchange: ex.id })}
                        className={`
                            relative group cursor-pointer h-52 rounded-xl border transition-all duration-300 flex items-center justify-center overflow-hidden bg-[#0A1014]/80 backdrop-blur-sm
                            ${wizardData.exchange === ex.id
                                ? 'border-[#00FF9D] shadow-[0_0_30px_rgba(0,255,157,0.1)]'
                                : 'border-gray-800 hover:border-gray-500'
                            }
                        `}
                    >
                        <div className={`
                            absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                            ${wizardData.exchange === ex.id ? 'bg-[#00FF9D] text-black scale-100' : 'bg-gray-800 text-gray-400'}
                        `}>
                            <ArrowUpRight size={16} />
                        </div>
                        <img src={ex.logo} alt={ex.name} className="h-14 object-contain" />
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center space-y-4">
                <button className="px-10 py-3 rounded border border-gray-700 text-gray-400 hover:border-white hover:text-white transition-all text-sm uppercase tracking-wider">
                    View other exchanges
                </button>
                <p className="text-gray-500">Or</p>
                <button onClick={() => setCurrentStep(3)} className="text-[#00FF9D] hover:text-[#00cc7d] hover:underline text-lg">
                    I will do it later
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24 pt-8 border-t border-gray-800/50 text-xs text-gray-500">
                <div className="flex items-start gap-3">
                    <Lock size={16} className="text-[#00FF9D] shrink-0 mt-1" />
                    <span>We will not have access to transfer or withdraw your assets. Your funds remain secure with encrypted API keys.</span>
                </div>
                <div className="flex items-start gap-3">
                    <Zap size={16} className="text-[#00FF9D] shrink-0 mt-1" />
                    <span>Your data is protected by Cloudflare, defending against attacks and encrypting all information.</span>
                </div>
            </div>
            {wizardData.exchange && (
                <div className="flex justify-center mt-12">
                    <button onClick={submitStep2} className="bg-[#00FF9D] text-black px-12 py-3 rounded-lg font-bold hover:bg-[#00cc7d]">Connect & Continue</button>
                </div>
            )}
        </div>
    );

    const renderStep3 = () => (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500 flex flex-col md:flex-row items-start justify-between gap-16 relative z-10">
            <div className="flex-1 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Select Quote Currency
                </h1>
                <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                    Select the quote currency that your bot will use for all trades on your Bybit account.
                    This will determine which asset your bot uses as the base for executing and settling trades.
                </p>

                <div className="space-y-2 bg-[#050B0D]/80 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
                    {CURRENCIES.map((curr) => (
                        <div
                            key={curr.id}
                            onClick={() => setWizardData({ ...wizardData, currency: curr.id })}
                            className={`
                                flex items-center gap-4 px-6 py-4 border-b border-gray-800 last:border-0 cursor-pointer transition-colors
                                ${wizardData.currency === curr.id ? 'bg-[#00FF9D]/10 border-[#00FF9D]' : 'hover:bg-white/5'}
                            `}
                        >
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                ${wizardData.currency === curr.id ? 'bg-[#00FF9D] text-black' : 'bg-gray-700 text-gray-300'}
                            `}>
                                {curr.symbol}
                            </div>
                            <span className={`text-lg ${wizardData.currency === curr.id ? 'text-[#00FF9D]' : 'text-gray-300'}`}>
                                {curr.name}
                            </span>
                            {wizardData.currency === curr.id && <Check size={20} className="text-[#00FF9D] ml-auto" />}
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setCurrentStep(4)}
                    className="mt-8 bg-[#00FF9D] text-black px-10 py-3 rounded-lg font-bold hover:bg-[#00cc7d] transition-colors"
                >
                    Continue
                </button>
            </div>

            <div className="flex-1 flex justify-center md:justify-end relative min-h-[400px]">
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-64 h-64 bg-gradient-to-br from-gray-800 to-black rounded-full border-4 border-[#00FF9D]/30 flex items-center justify-center shadow-[0_0_50px_rgba(0,255,157,0.2)]">
                        <span className="text-8xl font-bold text-[#00FF9D]">₿</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500 relative z-10">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Path To Automated Trading</h1>
                <p className="text-gray-400 max-w-xl mx-auto">Select the perfect bot based on your goals: effortless long-term growth or full control over complex strategies.</p>
            </div>

            <div className="flex justify-center mb-16">
                <div className="bg-[#1A2226] p-1 rounded-full flex items-center">
                    <button
                        onClick={() => setWizardData({ ...wizardData, billingCycle: 'monthly' })}
                        className={`px-8 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${wizardData.billingCycle === 'monthly' ? 'bg-[#53565A] text-white' : 'text-gray-400'}`}
                    >
                        Monthly <span className="bg-[#E2F708] text-black text-[10px] px-1 rounded">40%</span>
                    </button>
                    <button
                        onClick={() => setWizardData({ ...wizardData, billingCycle: 'annual' })}
                        className={`px-8 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${wizardData.billingCycle === 'annual' ? 'bg-[#53565A] text-white' : 'text-gray-400'}`}
                    >
                        Annual <span className="bg-[#E2F708] text-black text-[10px] px-1 rounded">40%</span>
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                <div
                    onClick={() => setWizardData({ ...wizardData, plan: 'signature' })}
                    className={`
                        rounded-3xl p-8 border cursor-pointer transition-all duration-300 relative overflow-hidden bg-[#0A1014]/80 backdrop-blur-sm
                        ${wizardData.plan === 'signature' ? 'border-[#00FF9D] shadow-[0_0_30px_rgba(0,255,157,0.1)]' : 'border-gray-800 hover:border-gray-600'}
                    `}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#E2F708] text-black text-xs font-bold px-3 py-1 rounded-b-lg">Up to 40% off</div>

                    <h3 className="text-xl text-white mb-2 mt-4">FydBlock Signature Bot</h3>
                    <div className="flex items-end gap-2 mb-6">
                        <span className="text-5xl font-bold text-white">$19</span>
                        <span className="text-xl text-gray-500 line-through">$59</span>
                        <span className="text-gray-400">/Month</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">Set and forget Diversified Portfolios</p>

                    <ul className="space-y-4 mb-8">
                        {['1X Signature Bot Slot', 'AI Native Includes', 'Unlimited Coins', '24/7 Rebalancing'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-white text-sm">
                                <Check className="text-[#00FF9D]" size={16} /> {item}
                            </li>
                        ))}
                    </ul>

                    <button className="w-full bg-[#00FF9D] text-black font-bold py-3 rounded-full hover:bg-[#00cc7d]">
                        7 Days Free Trail
                    </button>
                </div>

                <div
                    onClick={() => setWizardData({ ...wizardData, plan: 'pro' })}
                    className={`
                        rounded-3xl p-8 border cursor-pointer transition-all duration-300 relative overflow-hidden bg-[#00FF9D]
                        ${wizardData.plan === 'pro' ? 'scale-[1.02]' : 'opacity-90 hover:opacity-100'}
                    `}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#E2F708] text-black text-xs font-bold px-3 py-1 rounded-b-lg">Up to 40% off</div>

                    <h3 className="text-xl text-black mb-2 mt-4">Pro Custom Strategy Bot</h3>
                    <div className="flex items-end gap-2 mb-6">
                        <span className="text-5xl font-bold text-black">$34</span>
                        <span className="text-xl text-black/60 line-through">$89</span>
                        <span className="text-black/80">/Month</span>
                    </div>
                    <p className="text-black/80 text-sm mb-6">A full-featured suite for seasoned traders.</p>

                    <ul className="space-y-4 mb-8">
                        {['Unlimited Grid bot', 'Suggested Coin', 'Advanced Parameter', 'Access 6 Custom bots'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-black text-sm font-medium">
                                <Check className="text-black" size={16} /> {item}
                            </li>
                        ))}
                    </ul>

                    <button className="w-full bg-black text-white font-bold py-3 rounded-full hover:bg-gray-900">
                        7 Days Free Trail
                    </button>
                </div>
            </div>

            {wizardData.plan && (
                <div className="flex justify-center mt-12">
                    <button onClick={() => setCurrentStep(5)} className="bg-[#00FF9D] text-black px-12 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:bg-[#00cc7d]">
                        Continue with {wizardData.plan === 'signature' ? 'Signature' : 'Pro'} Bot
                    </button>
                </div>
            )}
        </div>
    );

    const renderStep5 = () => (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 relative z-10">
            <div className="w-32 h-32 rounded-full bg-[#00FF9D]/10 flex items-center justify-center mb-8 animate-pulse">
                <CheckCircle2 size={64} className="text-[#00FF9D]" />
            </div>

            <h1 className="text-4xl text-white font-bold mb-4">Let's Trade</h1>
            <p className="text-gray-400 mb-12 text-xl">Your bot is configured and ready to start trading.</p>

            <button
                onClick={submitFinalBot}
                className="bg-[#00FF9D] text-black text-xl font-bold px-16 py-4 rounded-lg shadow-[0_0_30px_rgba(0,255,157,0.4)] hover:bg-[#00cc7d] hover:scale-105 transition-all"
            >
                {loading ? "Launching..." : "Let's Trade"}
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020B0F] text-white font-sans flex flex-col pt-8 pb-12 relative overflow-hidden">

            {/* --- NEON BACKGROUND EFFECTS --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full">
                    {/* Top Left Green Blob */}
                    <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vh] bg-[#00FF9D]/10 rounded-full blur-[120px]" />
                    {/* Top Right Blue Blob */}
                    <div className="absolute top-[20%] right-[-5%] w-[30vw] h-[50vh] bg-[#00A3FF]/10 rounded-full blur-[120px]" />
                    {/* Bottom Left Green Blob */}
                    <div className="absolute bottom-[-10%] left-[30%] w-[50vw] h-[40vh] bg-[#00FF9D]/5 rounded-full blur-[150px]" />
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                {/* Header/Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={currentStep === 1 ? () => navigate('/') : () => setCurrentStep(c => c - 1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} /> Back
                    </button>
                    <div className="h-6 w-px bg-gray-700 mx-2 hidden md:block"></div>
                    <span className="font-bold text-xl text-white">Bot Builder</span>
                </div>

                <Breadcrumbs currentStep={currentStep} />

                <div className="mt-8">
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
