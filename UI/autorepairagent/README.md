# AutoRepairAgent Frontend

AI Powered Vehicle Service Job Classification and Workshop Management

## Setup

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173

## Configuration

Edit `.env` to point to your backend:
```
VITE_API_BASE_URL=http://localhost:3000
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@autorepair.com | Password123! |
| Job Advisor | advisor@autorepair.com | Password123! |
| Mechanical | mechanical@autorepair.com | Password123! |
| Customer | customer@autorepair.com | Password123! |

## Tech Stack

- React 18 + Vite
- Material UI (MUI) v5
- TanStack Query (React Query)
- React Router DOM v6
- React Hook Form + Zod
- Recharts
- React Toastify
- Axios
- Lucide React

## Features

- Role-based navigation (Admin, Job Advisor, Department Users, Customer)
- JWT Authentication with auto-logout
- Admin Dashboard with KPI cards and charts
- AI-powered job creation with complaint analysis
- Job management with start/complete workflow
- Customer & Vehicle management
- User management (Admin)
- Department management (Admin)
- AI Analysis logs viewer
- Light/Dark mode
- Fully responsive (mobile, tablet, desktop)
- Protected routes with RBAC
