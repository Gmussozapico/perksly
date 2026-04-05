# BeneficiosHub

A full-stack benefits aggregator platform for Chilean users to centralize discounts and perks from bank cards, phone companies, retail cards, and more.

## Tech Stack

- **Backend**: Node.js + Express + Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Frontend**: React + Vite + Tailwind CSS + lucide-react + axios + react-router-dom
- **Auth**: JWT (7-day expiry) + bcryptjs
- **Deployment**: Railway

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Run locally (both services)

```bash
chmod +x start.sh
./start.sh
```

This will:
1. Install all dependencies
2. Run database migrations
3. Seed the database with 16 providers and 40+ benefits
4. Start backend on http://localhost:3001
5. Start frontend on http://localhost:5173

### Run manually

**Backend:**
```bash
cd backend
npm install
cp .env.example .env   # edit as needed
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Demo Account

After seeding:
- **Email**: demo@beneficioshub.cl
- **Password**: demo1234

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /health | No | Health check |
| POST | /api/auth/register | No | Register user |
| POST | /api/auth/login | No | Login |
| GET | /api/auth/me | Yes | Current user |
| GET | /api/providers | No | All providers |
| GET | /api/providers/categories | No | All categories |
| GET | /api/providers/:id | No | Single provider |
| GET | /api/benefits | No | All benefits |
| GET | /api/user/providers | Yes | User's providers |
| POST | /api/user/providers | Yes | Add provider |
| DELETE | /api/user/providers/:id | Yes | Remove provider |
| GET | /api/user/benefits | Yes | User's benefits |
| GET | /api/user/stats | Yes | User stats |

## Deployment (Railway)

### Backend
1. Create a new Railway service from the `backend/` directory
2. Add a PostgreSQL database plugin
3. Set environment variables:
   - `DATABASE_URL` (auto-set by Railway PostgreSQL plugin)
   - `JWT_SECRET` (strong random string)
   - `FRONTEND_URL` (your frontend Railway URL)
   - `NODE_ENV=production`
4. Run migrations: `npx prisma migrate deploy && node prisma/seed.js`

### Frontend
1. Create a new Railway service from the `frontend/` directory
2. Set environment variables:
   - `VITE_API_URL` (your backend Railway URL)
3. Build command: `npm run build`
4. Start command: `npx serve dist`

## Project Structure

```
beneficios-hub/
├── backend/
│   ├── src/
│   │   ├── index.js              # Express app entry point
│   │   ├── prismaClient.js       # Prisma client singleton
│   │   ├── middleware/auth.js    # JWT middleware
│   │   └── routes/
│   │       ├── auth.js           # Auth routes
│   │       ├── providers.js      # Provider routes
│   │       ├── benefits.js       # Benefit routes
│   │       └── user.js           # User routes
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── seed.js               # Seed data
│   ├── .env                      # Local environment (git-ignored)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx               # Router + auth guards
│   │   ├── main.jsx              # Entry point
│   │   ├── context/AuthContext.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── BenefitCard.jsx
│   │   │   ├── ProviderCard.jsx
│   │   │   └── ProviderSelector.jsx
│   │   └── pages/
│   │       ├── Landing.jsx
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Dashboard.jsx
│   │       ├── MyBenefits.jsx
│   │       └── Explore.jsx
│   └── package.json
├── start.sh                      # Local dev startup script
├── railway.json                  # Railway config
└── .gitignore
```
