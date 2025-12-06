# FydBlock - AI-Powered Crypto Trading Platform

![FydBlock Hero](public/hero.png)

🚀 **Project Overview**

FydBlock is a high-fidelity, responsive frontend interface for a next-generation crypto trading bot platform. Designed with a dark, neon-green aesthetic (`#00FF9D`) inspired by premium fintech dashboards, it features immersive glassmorphism effects, interactive 3D elements, and a complete multi-page navigation structure.

The platform includes a **Trading Dashboard**, **Bot Builder Wizard**, **Authentication System** (with Google OAuth), and a high-conversion **Landing Page**.

---

## ✨ Key Features

- **🎨 Immersive Dark Mode UI** — Deep forest/black backgrounds with neon green accents and glowing ambient effects.
- **🌍 Interactive 3D Globe** — Custom HTML5 Canvas rendering of a rotating network globe.
- **🤖 Bot Builder Wizard** — A multi-step flow (`BotBuilder.jsx`) for users to configure trading strategies, exchange connections, and pricing plans.
- **📊 Real-Time Dashboard** — A comprehensive user dashboard (`Dashboard.jsx`) displaying portfolio value, active bots, and profit analytics.
- **🔐 Advanced Authentication** — Fully integrated Sign In/Up flows with:
  - Google OAuth 2.0 integration via `@react-oauth/google`.
  - JWT token management.
  - Password strength validation and visual toggles.
- **📱 Fully Responsive** — Optimized for mobile, tablet, and desktop with a custom drawer navigation.
- **⚡ High Performance** — Built with **Vite** for instant server start and optimized production builds.

---

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM v6+
- **Authentication:** React OAuth Google
- **Icons:** Lucide React
- **Animations:** CSS Keyframes & HTML5 Canvas

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### 1. Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- A running instance of the **FydBlock Backend** (for Auth/Dashboard features)

### 2. Installation

```bash
git clone https://github.com/yourusername/fydblock.git
cd fydblock
npm install
```

### 3. Configuration

⚠️ **Important:** This project requires API and Google OAuth configuration.

#### A. Backend Connection

Update `API_BASE_URL` in:

```
src/config.js
```

Example:

```javascript
const API_BASE_URL = "http://localhost:5000/api";
export default API_BASE_URL;
```

#### B. Google OAuth Setup

Update your Google Client ID inside:

```
src/main.jsx
```

```javascript
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
```

### 4. Run Development Server

```bash
npm run dev
```

Visit: **http://localhost:5173**

### 5. Build for Production

```bash
npm run build
```

Output will be generated inside `/dist`.

---

## 📂 Project Structure

```text
fydblock/
├── public/                 # Static assets (Logos, Hero images)
│   └── logos/              # Exchange logos (Binance, Coinbase, etc.)
├── src/
│   ├── App.jsx             # Main Application & Router Logic
│   ├── main.jsx            # Entry Point & Google OAuth Provider
│   ├── config.js           # API Base URL Configuration
│   ├── index.css           # Global Styles & Tailwind Directives
│   │
│   {/* Components */}
│   ├── Navbar.jsx          # Responsive Navigation
│   ├── Footer.jsx          # Site Footer
│   ├── WorldGlobe.jsx      # 3D Canvas Globe Animation
│   │
│   {/* Feature Pages */}
│   ├── LandingPage.jsx     # Home (Hero, Features, Stats)
│   ├── Dashboard.jsx       # User Dashboard & Analytics
│   ├── BotBuilder.jsx      # 5-Step Bot Creation Wizard
│   ├── PricingAndPlans.jsx # Pricing Cards & Billing Toggle
│   │
│   {/* Authentication */}
│   ├── SignIn.jsx          # Login Page
│   ├── SignUp.jsx          # Registration Page with Validation
│   └── ResetPass.jsx       # Password Reset Flow
│
├── tailwind.config.js      # Custom Theme Configuration
└── vite.config.js          # Vite Configuration
```

---

## 🚀 Deployment

### Deploying on Vercel

1. Push project to GitHub  
2. Import into Vercel  
3. Vercel auto-detects Vite  
4. Deploy 🎉

The included `vercel.json` ensures correct SPA routing.

---

## 📄 License

Licensed under the **MIT License**.  
See the `LICENSE` file for details.

---

**Developed by FydBlock Team**
