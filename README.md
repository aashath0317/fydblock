# FydBlock - AI-Powered Crypto Trading Platform

🚀 **Project Overview**

FydBlock is a high-fidelity, responsive frontend interface for a next-generation crypto trading bot platform. Designed with a dark, neon-green aesthetic inspired by premium fintech dashboards, it features immersive glassmorphism effects, interactive 3D elements, and a complete multi-page navigation structure.

The platform showcases a modern trading ecosystem including a **Landing Page**, **Pricing Plans**, **Affiliate System**, **Company Info**, and fully styled **Authentication Flows** (Login, Register, Password Reset).

---

## ✨ Key Features

- 🎨 **Immersive Dark Mode UI** — Deep forest/black backgrounds with neon green `#00FF9D` accents and glowing ambient effects.
- 🌍 **Interactive 3D Globe** — HTML5 Canvas rendering of a rotating network globe (custom `WorldGlobe` component).
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop with a custom mobile hamburger menu.
- ⚡ **High Performance** — Built with Vite for instant server start and optimized production builds.
- 🔄 **Seamless Navigation** — State-based routing system managing Home, Company, Affiliate, Pricing, and Contact views.
- 🔐 **Authentication UI** — Professionally designed Sign In, Sign Up, and Forgot Password pages with form validation states.
- 💎 **Glassmorphism** — Heavy use of backdrop filters, gradients, and frosted UI panels.
- 📊 **Animated Statistics** — Real-time counter animations for platform metrics (Volume, Users, Uptime).

---

## 🛠️ Tech Stack

- **Framework:** React 18  
- **Build Tool:** Vite  
- **Styling:** Tailwind CSS  
- **Icons:** Lucide React  
- **Animations:** CSS Keyframes (Float, Marquee) & Canvas API  

---

## 🏁 Getting Started

Follow these steps to run the project locally.

### **Prerequisites**

- Node.js v18+
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fydblock.git
   cd fydblock
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
fydblock/
├── public/                 # Static assets (Logos, Hero images)
│   └── logos/              # Exchange logos (Binance, Coinbase, etc.)
├── src/
│   ├── App.jsx             # Main Application & Router Logic
│   ├── main.jsx            # React Entry Point
│   ├── index.css           # Global Styles & Custom Animations
│   │
│   {/* Layout & Components */}
│   ├── Navbar.jsx          # Responsive Navigation Bar
│   ├── Footer.jsx          # Site Footer
│   ├── WorldGlobe.jsx      # Reusable 3D Globe Animation
│   │
│   {/* Pages */}
│   ├── LandingPage.jsx     # Homepage (Hero, Features, Stats, Marquee)
│   ├── Company.jsx         # About Us, History & Founders
│   ├── PricingAndPlans.jsx # Pricing Cards & FAQ
│   ├── Affiliate.jsx       # Affiliate Program & Calculator
│   ├── ContactPage.jsx     # Contact Form & Info
│   │
│   {/* Authentication Pages */}
│   ├── SignIn.jsx          # Login Page with Toggle
│   ├── SignUp.jsx          # Registration Page
│   └── ResetPass.jsx       # Forgot Password Page
│
├── tailwind.config.js      # Tailwind Configuration (Custom Container widths)
└── vite.config.js          # Vite Configuration
```

---

## 🚀 Deployment

FydBlock is optimized for deployment on **Vercel** or **Netlify**.

1. Push your project to GitHub.  
2. Import the repository into Vercel/Netlify.  
3. Build command: `vite build`  
4. Output directory: `dist`  

---

## 📄 License

This project is licensed under the **MIT License**.

