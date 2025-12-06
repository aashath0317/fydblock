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
    Layers,
    ChevronDown,
    AlertCircle
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API_BASE_URL from './config';

// --- CONSTANTS ---
const COUNTRIES = [
    { name: "Afghanistan", code: "+93", min: 9, max: 9 },
    { name: "Albania", code: "+355", min: 3, max: 9 },
    { name: "Algeria", code: "+213", min: 8, max: 9 },
    { name: "American Samoa", code: "+1684", min: 7, max: 7 },
    { name: "Andorra", code: "+376", min: 6, max: 9 },
    { name: "Angola", code: "+244", min: 9, max: 9 },
    { name: "Anguilla", code: "+1264", min: 7, max: 7 },
    { name: "Antigua and Barbuda", code: "+1268", min: 7, max: 7 },
    { name: "Argentina", code: "+54", min: 10, max: 10 },
    { name: "Armenia", code: "+374", min: 8, max: 8 },
    { name: "Aruba", code: "+297", min: 7, max: 7 },
    { name: "Australia", code: "+61", min: 5, max: 15 },
    { name: "Austria", code: "+43", min: 4, max: 13 },
    { name: "Azerbaijan", code: "+994", min: 8, max: 9 },
    { name: "Bahamas", code: "+1242", min: 7, max: 7 },
    { name: "Bahrain", code: "+973", min: 8, max: 8 },
    { name: "Bangladesh", code: "+880", min: 6, max: 10 },
    { name: "Barbados", code: "+1246", min: 7, max: 7 },
    { name: "Belarus", code: "+375", min: 9, max: 10 },
    { name: "Belgium", code: "+32", min: 8, max: 9 },
    { name: "Belize", code: "+501", min: 7, max: 7 },
    { name: "Benin", code: "+229", min: 8, max: 8 },
    { name: "Bermuda", code: "+1441", min: 7, max: 7 },
    { name: "Bhutan", code: "+975", min: 7, max: 8 },
    { name: "Bolivia", code: "+591", min: 8, max: 8 },
    { name: "Bosnia and Herzegovina", code: "+387", min: 8, max: 8 },
    { name: "Botswana", code: "+267", min: 7, max: 8 },
    { name: "Brazil", code: "+55", min: 10, max: 11 },
    { name: "British Virgin Islands", code: "+1284", min: 7, max: 7 },
    { name: "Brunei Darussalam", code: "+673", min: 7, max: 7 },
    { name: "Bulgaria", code: "+359", min: 7, max: 9 },
    { name: "Burkina Faso", code: "+226", min: 8, max: 8 },
    { name: "Burundi", code: "+257", min: 8, max: 8 },
    { name: "Cambodia", code: "+855", min: 8, max: 9 },
    { name: "Cameroon", code: "+237", min: 8, max: 8 },
    { name: "Canada", code: "+1", min: 10, max: 10 },
    { name: "Cape Verde", code: "+238", min: 7, max: 7 },
    { name: "Cayman Islands", code: "+1345", min: 7, max: 7 },
    { name: "Central African Rep.", code: "+236", min: 8, max: 8 },
    { name: "Chad", code: "+235", min: 8, max: 8 },
    { name: "Chile", code: "+56", min: 8, max: 9 },
    { name: "China", code: "+86", min: 5, max: 12 },
    { name: "Colombia", code: "+57", min: 8, max: 10 },
    { name: "Comoros", code: "+269", min: 7, max: 7 },
    { name: "Congo", code: "+242", min: 9, max: 9 },
    { name: "Cook Islands", code: "+682", min: 5, max: 5 },
    { name: "Costa Rica", code: "+506", min: 8, max: 8 },
    { name: "Côte d'Ivoire", code: "+225", min: 8, max: 8 },
    { name: "Croatia", code: "+385", min: 8, max: 12 },
    { name: "Cuba", code: "+53", min: 6, max: 8 },
    { name: "Cyprus", code: "+357", min: 8, max: 11 },
    { name: "Czech Rep.", code: "+420", min: 4, max: 12 },
    { name: "Denmark", code: "+45", min: 8, max: 8 },
    { name: "Djibouti", code: "+253", min: 6, max: 6 },
    { name: "Dominica", code: "+1767", min: 7, max: 7 },
    { name: "Dominican Rep.", code: "+1809", min: 7, max: 7 },
    { name: "Ecuador", code: "+593", min: 8, max: 8 },
    { name: "Egypt", code: "+20", min: 7, max: 9 },
    { name: "El Salvador", code: "+503", min: 7, max: 11 },
    { name: "Equatorial Guinea", code: "+240", min: 9, max: 9 },
    { name: "Eritrea", code: "+291", min: 7, max: 7 },
    { name: "Estonia", code: "+372", min: 7, max: 10 },
    { name: "Ethiopia", code: "+251", min: 9, max: 9 },
    { name: "Falkland Islands", code: "+500", min: 5, max: 5 },
    { name: "Faroe Islands", code: "+298", min: 6, max: 6 },
    { name: "Fiji", code: "+679", min: 7, max: 7 },
    { name: "Finland", code: "+358", min: 5, max: 12 },
    { name: "France", code: "+33", min: 9, max: 9 },
    { name: "French Guiana", code: "+594", min: 9, max: 9 },
    { name: "French Polynesia", code: "+689", min: 6, max: 6 },
    { name: "Gabon", code: "+241", min: 6, max: 7 },
    { name: "Gambia", code: "+220", min: 7, max: 7 },
    { name: "Georgia", code: "+995", min: 9, max: 9 },
    { name: "Germany", code: "+49", min: 6, max: 13 },
    { name: "Ghana", code: "+233", min: 5, max: 9 },
    { name: "Gibraltar", code: "+350", min: 8, max: 8 },
    { name: "Greece", code: "+30", min: 10, max: 10 },
    { name: "Greenland", code: "+299", min: 6, max: 6 },
    { name: "Grenada", code: "+1473", min: 7, max: 7 },
    { name: "Guadeloupe", code: "+590", min: 9, max: 9 },
    { name: "Guam", code: "+1671", min: 7, max: 7 },
    { name: "Guatemala", code: "+502", min: 8, max: 8 },
    { name: "Guinea", code: "+224", min: 8, max: 8 },
    { name: "Guinea-Bissau", code: "+245", min: 7, max: 7 },
    { name: "Guyana", code: "+592", min: 7, max: 7 },
    { name: "Haiti", code: "+509", min: 8, max: 8 },
    { name: "Honduras", code: "+504", min: 8, max: 8 },
    { name: "Hong Kong", code: "+852", min: 8, max: 9 },
    { name: "Hungary", code: "+36", min: 8, max: 9 },
    { name: "Iceland", code: "+354", min: 7, max: 9 },
    { name: "India", code: "+91", min: 10, max: 10 },
    { name: "Indonesia", code: "+62", min: 5, max: 10 },
    { name: "Iran", code: "+98", min: 6, max: 10 },
    { name: "Iraq", code: "+964", min: 8, max: 10 },
    { name: "Ireland", code: "+353", min: 7, max: 11 },
    { name: "Israel", code: "+972", min: 8, max: 9 },
    { name: "Italy", code: "+39", min: 9, max: 11 },
    { name: "Jamaica", code: "+1876", min: 7, max: 7 },
    { name: "Japan", code: "+81", min: 9, max: 10 },
    { name: "Jordan", code: "+962", min: 5, max: 9 },
    { name: "Kazakhstan", code: "+7", min: 10, max: 10 },
    { name: "Kenya", code: "+254", min: 6, max: 10 },
    { name: "Kiribati", code: "+686", min: 5, max: 5 },
    { name: "Korea (South)", code: "+82", min: 8, max: 11 },
    { name: "Kuwait", code: "+965", min: 7, max: 8 },
    { name: "Kyrgyzstan", code: "+996", min: 9, max: 9 },
    { name: "Laos", code: "+856", min: 8, max: 10 },
    { name: "Latvia", code: "+371", min: 7, max: 8 },
    { name: "Lebanon", code: "+961", min: 7, max: 8 },
    { name: "Lesotho", code: "+266", min: 8, max: 8 },
    { name: "Liberia", code: "+231", min: 7, max: 8 },
    { name: "Libya", code: "+218", min: 8, max: 9 },
    { name: "Liechtenstein", code: "+423", min: 7, max: 9 },
    { name: "Lithuania", code: "+370", min: 8, max: 8 },
    { name: "Luxembourg", code: "+352", min: 4, max: 11 },
    { name: "Macao", code: "+853", min: 7, max: 8 },
    { name: "Madagascar", code: "+261", min: 9, max: 10 },
    { name: "Malawi", code: "+265", min: 7, max: 8 },
    { name: "Malaysia", code: "+60", min: 7, max: 9 },
    { name: "Maldives", code: "+960", min: 7, max: 7 },
    { name: "Mali", code: "+223", min: 8, max: 8 },
    { name: "Malta", code: "+356", min: 8, max: 8 },
    { name: "Marshall Islands", code: "+692", min: 7, max: 7 },
    { name: "Martinique", code: "+596", min: 9, max: 9 },
    { name: "Mauritania", code: "+222", min: 7, max: 7 },
    { name: "Mauritius", code: "+230", min: 7, max: 7 },
    { name: "Mexico", code: "+52", min: 10, max: 10 },
    { name: "Micronesia", code: "+691", min: 7, max: 7 },
    { name: "Moldova", code: "+373", min: 8, max: 8 },
    { name: "Monaco", code: "+377", min: 5, max: 9 },
    { name: "Mongolia", code: "+976", min: 7, max: 8 },
    { name: "Montenegro", code: "+382", min: 4, max: 12 },
    { name: "Montserrat", code: "+1664", min: 7, max: 7 },
    { name: "Morocco", code: "+212", min: 9, max: 9 },
    { name: "Mozambique", code: "+258", min: 8, max: 9 },
    { name: "Myanmar", code: "+95", min: 7, max: 9 },
    { name: "Namibia", code: "+264", min: 6, max: 10 },
    { name: "Nauru", code: "+674", min: 4, max: 7 },
    { name: "Nepal", code: "+977", min: 8, max: 9 },
    { name: "Netherlands", code: "+31", min: 9, max: 9 },
    { name: "New Caledonia", code: "+687", min: 6, max: 6 },
    { name: "New Zealand", code: "+64", min: 3, max: 10 },
    { name: "Nicaragua", code: "+505", min: 8, max: 8 },
    { name: "Niger", code: "+227", min: 8, max: 8 },
    { name: "Nigeria", code: "+234", min: 7, max: 10 },
    { name: "Niue", code: "+683", min: 4, max: 4 },
    { name: "Northern Marianas", code: "+1670", min: 7, max: 7 },
    { name: "Norway", code: "+47", min: 5, max: 8 },
    { name: "Oman", code: "+968", min: 7, max: 8 },
    { name: "Pakistan", code: "+92", min: 8, max: 11 },
    { name: "Palau", code: "+680", min: 7, max: 7 },
    { name: "Panama", code: "+507", min: 7, max: 8 },
    { name: "Papua New Guinea", code: "+675", min: 4, max: 11 },
    { name: "Paraguay", code: "+595", min: 5, max: 9 },
    { name: "Peru", code: "+51", min: 8, max: 11 },
    { name: "Philippines", code: "+63", min: 8, max: 10 },
    { name: "Poland", code: "+48", min: 6, max: 9 },
    { name: "Portugal", code: "+351", min: 9, max: 11 },
    { name: "Puerto Rico", code: "+1", min: 10, max: 10 },
    { name: "Qatar", code: "+974", min: 3, max: 8 },
    { name: "Romania", code: "+40", min: 9, max: 9 },
    { name: "Russia", code: "+7", min: 10, max: 10 },
    { name: "Rwanda", code: "+250", min: 9, max: 9 },
    { name: "Saint Kitts and Nevis", code: "+1869", min: 7, max: 7 },
    { name: "Saint Lucia", code: "+1758", min: 7, max: 7 },
    { name: "Saint Vincent", code: "+1784", min: 7, max: 7 },
    { name: "Samoa", code: "+685", min: 3, max: 7 },
    { name: "San Marino", code: "+378", min: 6, max: 10 },
    { name: "Sao Tome and Principe", code: "+239", min: 7, max: 7 },
    { name: "Saudi Arabia", code: "+966", min: 8, max: 9 },
    { name: "Senegal", code: "+221", min: 9, max: 9 },
    { name: "Serbia", code: "+381", min: 4, max: 12 },
    { name: "Seychelles", code: "+248", min: 7, max: 7 },
    { name: "Sierra Leone", code: "+232", min: 8, max: 8 },
    { name: "Singapore", code: "+65", min: 8, max: 12 },
    { name: "Sint Maarten", code: "+1721", min: 7, max: 7 },
    { name: "Slovakia", code: "+421", min: 4, max: 9 },
    { name: "Slovenia", code: "+386", min: 8, max: 8 },
    { name: "Solomon Islands", code: "+677", min: 5, max: 5 },
    { name: "Somalia", code: "+252", min: 5, max: 8 },
    { name: "South Africa", code: "+27", min: 9, max: 9 },
    { name: "South Sudan", code: "+211", min: 9, max: 9 },
    { name: "Spain", code: "+34", min: 9, max: 9 },
    { name: "Sri Lanka", code: "+94", min: 9, max: 9 },
    { name: "Sudan", code: "+249", min: 9, max: 9 },
    { name: "Suriname", code: "+597", min: 6, max: 7 },
    { name: "Swaziland", code: "+268", min: 7, max: 8 },
    { name: "Sweden", code: "+46", min: 7, max: 13 },
    { name: "Switzerland", code: "+41", min: 4, max: 12 },
    { name: "Syria", code: "+963", min: 8, max: 10 },
    { name: "Taiwan", code: "+886", min: 8, max: 9 },
    { name: "Tajikistan", code: "+992", min: 9, max: 9 },
    { name: "Tanzania", code: "+255", min: 9, max: 9 },
    { name: "Thailand", code: "+66", min: 8, max: 9 },
    { name: "Timor-Leste", code: "+670", min: 7, max: 7 },
    { name: "Togo", code: "+228", min: 8, max: 8 },
    { name: "Tokelau", code: "+690", min: 4, max: 4 },
    { name: "Tonga", code: "+676", min: 5, max: 7 },
    { name: "Trinidad and Tobago", code: "+1868", min: 7, max: 7 },
    { name: "Tunisia", code: "+216", min: 8, max: 8 },
    { name: "Turkey", code: "+90", min: 10, max: 10 },
    { name: "Turkmenistan", code: "+993", min: 8, max: 8 },
    { name: "Turks and Caicos", code: "+1649", min: 7, max: 7 },
    { name: "Tuvalu", code: "+688", min: 5, max: 6 },
    { name: "Uganda", code: "+256", min: 9, max: 9 },
    { name: "Ukraine", code: "+380", min: 9, max: 9 },
    { name: "UAE", code: "+971", min: 8, max: 9 },
    { name: "UK", code: "+44", min: 7, max: 10 },
    { name: "USA", code: "+1", min: 10, max: 10 },
    { name: "Uruguay", code: "+598", min: 4, max: 11 },
    { name: "Uzbekistan", code: "+998", min: 9, max: 9 },
    { name: "Vanuatu", code: "+678", min: 5, max: 7 },
    { name: "Venezuela", code: "+58", min: 10, max: 10 },
    { name: "Vietnam", code: "+84", min: 7, max: 10 },
    { name: "Yemen", code: "+967", min: 6, max: 9 },
    { name: "Zambia", code: "+260", min: 9, max: 9 },
    { name: "Zimbabwe", code: "+263", min: 5, max: 10 },
];

const EXCHANGES = [
    { id: 'binance', name: 'Binance', logo: '/logos/BINANCE.png' },
    { id: 'bybit', name: 'Bybit', logo: '/logos/BYBIT.png' },
    { id: 'okx', name: 'OKX', logo: '/logos/OKX.jpg' },
];

// Currencies with color classes
const CURRENCIES = [
    { id: 'USDT', name: 'USDT', icon: 'T', symbol: '$', color: 'bg-teal-500' },
    { id: 'USDC', name: 'USDC', icon: '$', symbol: '$', color: 'bg-blue-500' },
    { id: 'BNB', name: 'BNB', icon: 'B', symbol: 'B', color: 'bg-yellow-500' },
    { id: 'BTC', name: 'BTC', icon: '₿', symbol: '₿', color: 'bg-orange-500' },
    { id: 'EUR', name: 'EUR', icon: '€', symbol: '€', color: 'bg-indigo-500' },
];

// --- COMPONENTS ---

const Breadcrumbs = ({ currentStep }) => {
    const steps = [
        { id: 1, label: '1. General Information' },
        { id: 2, label: '2. Connect Exchange' },
        { id: 3, label: '3. Select Currency' },
        { id: 4, label: '4. Bot Type & Plans' },
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
    const [searchParams] = useSearchParams();
    
    // Check if user returned from OAuth (e.g. ?step=3)
    const initialStep = parseInt(searchParams.get('step')) || 1;
    const [currentStep, setCurrentStep] = useState(initialStep);
    
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    
    // New state for toggling between Fast (OAuth) and Manual connection
    const [connectMethod, setConnectMethod] = useState('fast'); // 'fast' | 'manual'

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

    const selectedCurrencyObj = CURRENCIES.find(c => c.id === wizardData.currency);

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

                if (data.profileComplete && currentStep === 1) {
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
    }, [navigate, currentStep]);

    // Update connectMethod based on exchange selection
    useEffect(() => {
        if (wizardData.exchange === 'binance') {
            setConnectMethod('manual');
        } else if (wizardData.exchange) {
            setConnectMethod('fast');
        }
    }, [wizardData.exchange]);

    // --- HANDLERS ---
    const handleCountryChange = (e) => {
        const selectedCountry = e.target.value;
        const countryData = COUNTRIES.find(c => c.name === selectedCountry);
        setWizardData(prev => ({
            ...prev,
            country: selectedCountry,
            phoneCode: countryData ? countryData.code : '',
            phoneNumber: ''
        }));
        setPhoneError('');
    };

    const validatePhone = (number, countryName) => {
        const country = COUNTRIES.find(c => c.name === countryName);
        if (!country) return true;

        const len = number.length;
        if (len < country.min || len > country.max) {
            setPhoneError(`Enter full number`);
            return false;
        }
        setPhoneError('');
        return true;
    };

    const handlePhoneChange = (e) => {
        const val = e.target.value.replace(/\D/g, '');
        setWizardData(prev => ({ ...prev, phoneNumber: val }));

        if (wizardData.country) {
            validatePhone(val, wizardData.country);
        }
    };
    
    // --- NEW: Handle Fast Connect (OAuth Redirect) ---
    const handleFastConnect = async () => {
        if (!wizardData.exchange) return alert("Please select an exchange first.");
        
        // This endpoint will be responsible for redirecting the browser to Binance/OKX
        window.location.href = `${API_BASE_URL}/user/exchange/auth/${wizardData.exchange}?token=${localStorage.getItem('token')}`;
    };

    // --- API HANDLERS ---
    const submitStep1 = async () => {
        if (phoneError) return;

        if (!wizardData.name || !wizardData.country || !wizardData.phoneNumber || !wizardData.agreed) {
            return alert("Please fill all fields and agree to the terms.");
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
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
        
        // For Manual connection, validate keys
        if (connectMethod === 'manual') {
            if (!wizardData.apiKey || !wizardData.apiSecret) {
                return alert("Please enter both API Key and API Secret.");
            }
        } else {
            // If they are on "Fast Connect" tab but clicked a submit button (unlikely with new UI, but safety check)
            return handleFastConnect();
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/user/exchange`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ 
                    exchange_name: wizardData.exchange, 
                    api_key: wizardData.apiKey, 
                    api_secret: wizardData.apiSecret 
                })
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
                navigate('/dashboard');
            } else {
                alert("Failed to create bot.");
            }
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    // --- RENDER HELPERS ---

    const renderStep1 = () => {
        const isStep1Valid = wizardData.name && wizardData.country && wizardData.phoneNumber && wizardData.agreed && !phoneError;

        return (
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
                            className="w-full bg-white border border-white/10 text-black text-lg rounded-lg px-4 py-3 outline-none focus:border-[#00FF9D] transition-all"
                            placeholder="Shaafi"
                            value={wizardData.name}
                            onChange={(e) => setWizardData({ ...wizardData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-white text-lg font-medium mb-2">Country of Resident</label>
                        <div className="relative">
                            <select
                                className="w-full bg-white border border-white/10 text-black text-lg rounded-lg px-4 py-3 outline-none appearance-none focus:border-[#00FF9D] transition-all cursor-pointer"
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
                                <ChevronDown size={20} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-white text-lg font-medium mb-2">Phone Number</label>
                        <div className="flex gap-4">
                            <div className="w-[120px] relative">
                                <input
                                    type="text"
                                    readOnly
                                    value={wizardData.phoneCode}
                                    className="w-full bg-white border border-white/10 text-black text-lg rounded-lg px-4 py-3 outline-none text-center cursor-default"
                                    placeholder="+1"
                                />
                            </div>
                            <div className="flex-1 relative">
                                <input
                                    type="tel"
                                    value={wizardData.phoneNumber}
                                    onChange={handlePhoneChange}
                                    className={`w-full bg-white border text-black text-lg rounded-lg px-4 py-3 outline-none transition-all ${phoneError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#00FF9D]'}`}
                                    placeholder="123 456 7890"
                                />
                            </div>
                        </div>
                        {phoneError && (
                            <div className="flex items-center gap-2 mt-2 text-red-500 text-sm animate-in fade-in slide-in-from-top-1">
                                <AlertCircle size={14} />
                                <span>{phoneError}</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${wizardData.agreed ? 'bg-[#00FF9D] border-[#00FF9D]' : 'bg-white border-gray-500'}`}>
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
                        disabled={!isStep1Valid || loading}
                        className={`
                        mt-8 px-10 py-3 rounded-lg bg-[#00FF9D] text-black font-bold text-lg hover:bg-[#00cc7d] transition-all w-40 flex items-center justify-center
                        ${loading || !isStep1Valid ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_20px_rgba(0,255,157,0.4)]'}
                    `}
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : "Submit"}
                    </button>
                </div>
            </div>
        )
    };

    const renderStep2 = () => {
        // Logic: Binance = Manual Only. Others = Fast + Manual.
        const supportsFastConnect = wizardData.exchange !== 'binance';

        return (
            <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500 relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Connect An Exchange To Start<br />Trading
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                        Automate your strategy without code, test it on historical data, optimize, and execute across all connected accounts.
                    </p>
                </div>

                {/* 1. Exchange Selection Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {EXCHANGES.map((ex) => (
                        <div
                            key={ex.id}
                            onClick={() => setWizardData({ ...wizardData, exchange: ex.id })}
                            className={`
                                relative group cursor-pointer h-52 rounded-xl border transition-all duration-300 flex flex-col gap-4 items-center justify-center overflow-hidden bg-[#0A1014]/80 backdrop-blur-sm
                                ${wizardData.exchange === ex.id
                                    ? 'border-[#00FF9D] shadow-[0_0_30px_rgba(0,255,157,0.1)] bg-[#00FF9D]/5'
                                    : 'border-gray-800 hover:border-gray-500'
                                }
                            `}
                        >
                            {wizardData.exchange === ex.id && (
                                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#00FF9D] text-black flex items-center justify-center animate-in fade-in zoom-in">
                                    <CheckCircle2 size={16} />
                                </div>
                            )}
                            <img src={ex.logo} alt={ex.name} className="h-14 object-contain" />
                            <span className={`font-bold text-lg ${wizardData.exchange === ex.id ? 'text-[#00FF9D]' : 'text-gray-400'}`}>{ex.name}</span>
                        </div>
                    ))}
                </div>

                {wizardData.exchange && (
                    <div className="max-w-xl mx-auto bg-[#0A1014] border border-white/10 rounded-2xl p-6 md:p-8 mb-12 animate-in fade-in slide-in-from-bottom-4">
                        
                        {/* 2. Toggle Switch: Only show if Exchange Supports Fast Connect */}
                        {supportsFastConnect && (
                            <div className="flex bg-white/5 p-1 rounded-lg mb-8">
                                <button
                                    onClick={() => setConnectMethod('fast')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                                        connectMethod === 'fast' ? 'bg-[#00FF9D] text-black shadow-lg' : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    Fast Connect
                                </button>
                                <button
                                    onClick={() => setConnectMethod('manual')}
                                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                                        connectMethod === 'manual' ? 'bg-[#00FF9D] text-black shadow-lg' : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    Manual Entry
                                </button>
                            </div>
                        )}

                        {/* 3A. Fast Connect View */}
                        {connectMethod === 'fast' && supportsFastConnect && (
                            <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-2">
                                <div className="w-16 h-16 mx-auto bg-[#00FF9D]/10 rounded-full flex items-center justify-center text-[#00FF9D] shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                                    <Zap size={32} fill="currentColor" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Connect to {EXCHANGES.find(e => e.id === wizardData.exchange)?.name}</h3>
                                    <p className="text-sm text-gray-400">
                                        You will be redirected to the exchange to approve the connection. No need to copy API keys manually.
                                    </p>
                                </div>
                                <button 
                                    onClick={handleFastConnect}
                                    className="w-full bg-[#00FF9D] text-black font-bold py-4 rounded-xl hover:bg-[#00cc7d] transition-all shadow-[0_0_20px_rgba(0,255,157,0.3)] flex items-center justify-center gap-2"
                                >
                                    Continue to {EXCHANGES.find(e => e.id === wizardData.exchange)?.name}
                                    <ArrowUpRight size={20} />
                                </button>
                            </div>
                        )}

                        {/* 3B. Manual Connect View */}
                        {connectMethod === 'manual' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                                {!supportsFastConnect && (
                                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-500 text-xs mb-4">
                                        Manual Connection Required for Binance
                                    </div>
                                )}
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">API Key</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF9D] outline-none transition-colors"
                                        placeholder="Paste API Key"
                                        value={wizardData.apiKey} 
                                        onChange={(e) => setWizardData({...wizardData, apiKey: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">API Secret</label>
                                    <input 
                                        type="password" 
                                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-[#00FF9D] outline-none transition-colors"
                                        placeholder="Paste API Secret"
                                        value={wizardData.apiSecret} 
                                        onChange={(e) => setWizardData({...wizardData, apiSecret: e.target.value})}
                                    />
                                </div>
                                <button 
                                    onClick={submitStep2}
                                    className="w-full mt-4 bg-white/10 text-white font-bold py-3 rounded-xl hover:bg-[#00FF9D] hover:text-black transition-all border border-white/10 hover:border-[#00FF9D]"
                                >
                                    Connect Manually
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col items-center space-y-4">
                    <button className="px-10 py-3 rounded border border-gray-700 text-gray-400 hover:border-white hover:text-white transition-all text-sm uppercase tracking-wider">
                        View other exchanges
                    </button>
                    <p className="text-gray-500">Or</p>
                    <button onClick={() => setCurrentStep(3)} className="text-[#00FF9D] hover:text-[#00cc7d] hover:underline text-lg">
                        I will do it later
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-gray-800/50 text-xs text-gray-500 max-w-4xl mx-auto">
                    <div className="flex items-start gap-3">
                        <Lock size={16} className="text-[#00FF9D] shrink-0 mt-1" />
                        <span>We will not have access to transfer or withdraw your assets. Your funds remain secure with encrypted API keys.</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <Zap size={16} className="text-[#00FF9D] shrink-0 mt-1" />
                        <span>Your data is protected by Cloudflare, defending against attacks and encrypting all information.</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderStep3 = () => (
        <div className="w-full max-w-6xl mx-auto animate-in fade-in duration-500 flex flex-col md:flex-row items-start justify-between gap-16 relative z-10">
            <div className="flex-1 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Quote currency
                </h1>
                <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                    Select the quote currency that your bot will use for all trades on your Bybit account.
                    This will determine which asset your bot uses as the base for executing and settling trades.
                </p>

                {/* --- CUSTOM DROPDOWN CONTAINER (With Static Header) --- */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">Quote currency</h3>
                    <div className="border border-white/10 rounded-2xl p-4 bg-[#0A1014]/1 backdrop-blur-sm relative">
                        {/* Header of the Dropdown (Always says Select Quote Currency) */}
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex justify-between items-center text-gray-400 mb-4 px-2 cursor-pointer hover:text-white transition-colors select-none"
                        >
                            <span className="text-white font-bold">Select Quote Currency</span>
                            <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {/* List Items (Conditionally Rendered) */}
                        <div className={`space-y-3 transition-all duration-300 overflow-hidden ${isDropdownOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            {CURRENCIES.map((curr) => (
                                <div
                                    key={curr.id}
                                    onClick={() => {
                                        setWizardData({ ...wizardData, currency: curr.id });
                                        // Removed auto-close here
                                    }}
                                    className={`
                                        flex items-center gap-4 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-300 relative
                                        ${wizardData.currency === curr.id
                                            ? 'border-[#00FF9D] bg-[#00FF9D]/10 shadow-[0_0_20px_rgba(0,255,157,0.5)]' // Enhanced Neon Glow
                                            : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                                        }
                                    `}
                                >
                                    {/* Colored Icon Circle */}
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg
                                        ${curr.color}
                                    `}>
                                        {curr.icon}
                                    </div>

                                    <span className="text-lg text-white font-medium">
                                        {curr.name}
                                    </span>

                                    {/* Selection Corners */}
                                    {wizardData.currency === curr.id && (
                                        <>
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00FF9D] -mt-[1px] -ml-[1px]"></div>
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00FF9D] -mt-[1px] -mr-[1px]"></div>
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00FF9D] -mb-[1px] -ml-[1px]"></div>
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00FF9D] -mb-[1px] -mr-[1px]"></div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setCurrentStep(4)}
                    className="mt-8 bg-[#00FF9D] text-black px-10 py-3 rounded-lg font-bold hover:bg-[#00cc7d] transition-colors"
                >
                    Continue
                </button>
            </div>

            {/* --- UPDATED IMAGE SECTION --- */}
            <div className="flex-1 flex justify-center md:justify-end relative min-h-[400px]">
                <div className="relative w-full h-full flex items-center justify-center">
                    <img
                        src="/BTC_ETH.png"
                        alt="Bitcoin and Ethereum Coins"
                        className="w-auto h-auto max-w-full max-h-[500px] object-contain drop-shadow-[0_0_50px_rgba(0,255,157,0.2)] animate-float"
                    />
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
                <div className="bg-[#2D3035] p-1 rounded-lg flex items-center relative">
                    {/* Monthly Button */}
                    <button
                        onClick={() => setWizardData({ ...wizardData, billingCycle: 'monthly' })}
                        className={`
                            px-8 py-3 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2
                            ${wizardData.billingCycle === 'monthly' ? 'bg-[#53565A] text-white shadow-sm' : 'text-gray-400 hover:text-white'}
                        `}
                    >
                        Monthly
                        <span className="text-[10px] bg-[#E2F708] text-black px-1.5 py-0.5 rounded font-bold">-15%</span>
                    </button>

                    {/* Annual Button */}
                    <button
                        onClick={() => setWizardData({ ...wizardData, billingCycle: 'annual' })}
                        className={`
                            px-8 py-3 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2
                            ${wizardData.billingCycle === 'annual' ? 'bg-[#53565A] text-white shadow-sm' : 'text-gray-400 hover:text-white'}
                        `}
                    >
                        Annual
                        <span className="text-[10px] bg-[#E2F708] text-black px-1.5 py-0.5 rounded font-bold">-54%</span>
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-16">
                {/* Signature Bot Card */}
                <div
                    onClick={() => setWizardData({ ...wizardData, plan: 'signature' })}
                    className={`
                        bg-[#0A1014] border rounded-3xl p-8 relative flex flex-col cursor-pointer transition-all hover:border-white/20
                        ${wizardData.plan === 'signature' ? 'border-[#00FF9D] shadow-[0_0_30px_rgba(0,255,157,0.1)]' : 'border-white/10'}
                    `}
                >
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E2F708] text-black text-xs font-bold px-6 py-2 rounded-md uppercase tracking-wider shadow-[0_0_15px_rgba(226,247,8,0.3)] whitespace-nowrap transition-opacity duration-300 ${wizardData.billingCycle === 'annual' ? 'opacity-100' : 'opacity-0'}`}>
                        Up to 40% off
                    </div>

                    <div className="mt-4 mb-6">
                        <h3 className="text-xl font-bold text-white mb-4">FydBlock Signature Bot</h3>
                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-5xl font-bold text-white">
                                ${wizardData.billingCycle === 'annual' ? '19' : '50'}
                            </span>
                            <span className="text-xl text-gray-500 line-through decoration-gray-500">$59</span>
                            <span className="text-sm text-gray-400">/Month</span>
                        </div>
                        <p className="text-gray-400 text-sm mt-4">Set and forget Diversified Portfolios</p>
                    </div>

                    <ul className="space-y-5 mb-10 flex-1">
                        {['1X Signature Bot Slot', 'AI Native Includes', 'Unlimited Coins', '24/7 Rebalancing'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-medium text-white">
                                <div className="shrink-0">
                                    <Check size={18} className="text-[#00FF9D]" strokeWidth={3} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <button className="w-full bg-[#00FF9D] hover:bg-[#00cc7d] text-black font-bold py-4 rounded-full transition-all shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                        7 Days Free Trial
                    </button>
                </div>

                {/* Pro Bot Card */}
                <div
                    onClick={() => setWizardData({ ...wizardData, plan: 'pro' })}
                    className={`
                        bg-[#00FF9D] rounded-3xl p-8 relative flex flex-col shadow-[0_0_40px_rgba(0,255,157,0.1)] cursor-pointer
                        ${wizardData.plan === 'pro' ? 'scale-[1.02]' : 'opacity-90 hover:opacity-100'}
                    `}
                >
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E2F708] text-black text-xs font-bold px-6 py-2 rounded-md uppercase tracking-wider shadow-lg whitespace-nowrap transition-opacity duration-300 ${wizardData.billingCycle === 'annual' ? 'opacity-100' : 'opacity-0'}`}>
                        Up to 40% off
                    </div>

                    <div className="mt-4 mb-6">
                        <h3 className="text-xl font-bold text-black mb-4">Pro Custom Strategy Bot</h3>
                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-5xl font-bold text-black">
                                ${wizardData.billingCycle === 'annual' ? '34' : '76'}
                            </span>
                            <span className="text-xl text-black/60 line-through decoration-black/40">$89</span>
                            <span className="text-sm text-black/80">/Month</span>
                        </div>
                        <p className="text-black/80 text-sm font-medium mt-4">A full-featured suite for seasoned traders.</p>
                    </div>

                    <ul className="space-y-5 mb-10 flex-1">
                        {['Unlimited Grid bot', 'Suggested Coin', 'Advanced Parameter', 'Access 6 Custom bots'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm font-bold text-black">
                                <div className="shrink-0">
                                    <Check size={18} className="text-black" strokeWidth={3} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <button className="w-full bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-full transition-all shadow-xl">
                        7 Days Free Trial
                    </button>
                </div>
            </div>

            {/* --- CUSTOM PLAN (Below the Grid) --- */}
            <div className="max-w-5xl mx-auto bg-[#0A1014] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden mb-16">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF9D]/5 rounded-full blur-[80px] pointer-events-none"></div>

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="flex-1 text-center lg:text-left">
                        <h3 className="text-3xl font-bold text-white mb-2">Custom Plan</h3>
                        <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto lg:mx-0">
                            Go beyond pre-set plans. Unlock more bots, more analytics, and dedicated support strategies.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                        {[
                            "Everything in Plus",
                            "Dedicated ML",
                            "Custom Bot Setting",
                            "Advanced analytics"
                        ].map((feat, i) => (
                            <div key={i} className="flex items-center gap-3 justify-start">
                                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                                    <Check size={18} className="text-[#00FF9D]" strokeWidth={3} />
                                </div>
                                <span className="text-sm text-white font-medium">{feat}</span>
                            </div>
                        ))}
                    </div>

                    <div>
                        <button className="bg-[#FFDDA1] hover:bg-[#ffe5b5] text-black px-10 py-3 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,221,161,0.2)] whitespace-nowrap">
                            Contact US
                        </button>
                    </div>
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
        <div className="w-full h-[70vh] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500 relative z-10">

            {/* Success Bot Image */}
            <div className="relative mb-8">
                {/* Optional Glow behind the bot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#00FF9D]/20 blur-[60px] rounded-full pointer-events-none"></div>

                <img
                    src="/bot.png"
                    alt="Success Bot"
                    className="w-80 h-80 md:w-80 md:h-80 object-contain relative z-10 drop-shadow-2xl animate-float"
                />
            </div>

            <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 text-center">You're All Set!</h1>
            <p className="text-gray-400 mb-10 text-lg text-center">Your bot is ready to start trading</p>

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
