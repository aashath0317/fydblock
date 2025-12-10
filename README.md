# ⚡ FydBlock – AI Algorithmic Trading Ecosystem

FydBlock is a full-stack, microservices-based crypto trading ecosystem that enables users to automate trading using advanced **Grid** and **DCA** strategies.  
It features a real-time user dashboard, a powerful admin panel, and a high-performance Python trading engine capable of executing hundreds of bots asynchronously.

---

## 🏗️ System Architecture

FydBlock is built as four independent microservices:

| Service | Technology | Description | Port |
|--------|------------|-------------|------|
| **Backend API** | Node.js / Express | Core REST API, Auth, DB & Exchange Key Management | `5000` |
| **User Platform** | React / Vite | Trader dashboard for bots, portfolio & analytics | `5173` |
| **Admin Panel** | React / Vite | Internal admin system for users, bots & settings | `5174` |
| **Trading Engine** | Python / FastAPI | High-frequency, async trading executor | `8000` |

---

## 🚀 Tech Stack

- **Frontend:** React 18, Tailwind CSS, Lucide Icons, Recharts, Framer Motion  
- **Backend:** Node.js, Express, PostgreSQL, JWT, CCXT (JavaScript)  
- **Trading Engine:** Python 3.9+, FastAPI, Uvicorn, CCXT (Async), Pandas  
- **Database:** PostgreSQL (Relational storage for users, bots, configs)  
- **Infrastructure:** PM2 (Process Manager), Nginx (Reverse Proxy)  

---

## 🛠️ Prerequisites

Ensure the following are installed:

- Node.js **v18+**  
- Python **3.9+**  
- PostgreSQL  
- PM2 (`npm install -g pm2`)  

---

## 📦 Installation & Setup

### 1️⃣ Database Setup
```bash
psql -U postgres -c "CREATE DATABASE fydblock_db;"
psql -U postgres -d fydblock_db -f backend/database.sql
```

---

### 2️⃣ Backend (Node.js)
```bash
cd fydblock_backend
npm install
# Add environment variables (see backend/README.md)
npm run dev
```

---

### 3️⃣ User Frontend (React)
```bash
cd fydblock_user
npm install
# Add .env variables (see frontend/README.md)
npm run dev
```

---

### 4️⃣ Admin Panel (React)
```bash
cd fydblock_admin
npm install
# Add .env file
npm run dev -- --port 5174
```

---

### 5️⃣ Trading Engine (Python)
```bash
cd fydblock_engine
python3 -m venv venv
source venv/bin/activate         # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn bot_engine:app --reload --port 8000
```

---

## 🚀 Production Deployment with PM2

Use this **ecosystem.config.js** to run backend + engine in production:

```javascript
module.exports = {
  apps: [
    {
      name: "fydblock-api",
      script: "./fydblock_backend/server.js",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    },
    {
      name: "fydblock-engine",
      script: "uvicorn",
      args: "bot_engine:app --host 0.0.0.0 --port 8000",
      cwd: "./fydblock_engine",
      interpreter: "./fydblock_engine/venv/bin/python"
    }
    // Frontends should be built (npm run build) and served via Nginx
  ]
};
```

Start all services:

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## 🔐 Environment Variables

Each service requires its own `.env` file.

### Backend `.env`
```env
PORT=5000
DB_URL=postgres://user:pass@localhost:5432/fydblock_db
JWT_SECRET=secure_secret_key
TRADING_ENGINE_URL=http://localhost:8000
```

### Frontend `.env`
```env
VITE_API_BASE_URL=https://api.fydblock.com/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🤝 Contribution Guide

1. Fork the repository  
2. Create a feature branch:  
   ```bash
   git checkout -b feature/NewBotStrategy
   ```
3. Commit changes  
4. Push to your branch  
5. Open a Pull Request  

---

## 📄 License

**MIT License © 2025 FydBlock**
