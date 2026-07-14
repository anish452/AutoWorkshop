# AutoRepairAgent

Production-ready backend system for vehicle repair centers/workshops with AI-powered complaint classification and automated job routing.

## Technology Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js (LTS) |
| Framework | Express.js |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Authentication | JWT + bcrypt |
| AI Engine | DeepSeek API |
| Validation | Zod |
| Logging | Winston |
| Architecture | Clean Architecture + Repository Pattern |

## Features

- **AI-Powered Job Classification** — DeepSeek agent analyzes multilingual complaints and creates separate jobs per issue
- **Role-Based Access Control** — Admin, Job Advisor, Department Users, Customer roles
- **Department Job Filtering** — Users only see jobs for their department
- **Job Lifecycle Management** — Pending → Assigned → In Progress → Completed
- **Audit Logging** — Tracks logins, job events, user management
- **Dashboard APIs** — Role-specific dashboards for Admin, Advisor, Department, Customer
- **Security** — JWT, RBAC, Helmet, CORS, Rate Limiting, Input Validation

## Quick Start (Full Stack)

Pre-configured `.env` files are included so a new developer can clone and run immediately.

### Prerequisites

- **Node.js 18+** (LTS recommended)
- **Git**

### 1. Clone & install

```bash
git clone https://github.com/anish452/AutoWorkshop.git
cd AutoWorkshop
npm run setup
```

`npm run setup` installs backend + frontend dependencies, runs migrations, and seeds test data.

### 2. Run backend + frontend together

```bash
npm run dev:all
```

| Service | URL |
|---------|-----|
| **Frontend (React UI)** | http://localhost:5173 |
| **Backend API** | http://localhost:3000 |
| **Health check** | http://localhost:3000/health |

### 3. Login

Open http://localhost:5173/login and sign in with any test account below.  
Default password for all users: **`Password123!`**

### Environment files (already included)

| File | Purpose |
|------|---------|
| `.env` | Backend — database, JWT, DeepSeek (shared Neon DB for dev) |
| `UI/autorepairagent/.env` | Frontend — Vite proxy to API (leave `VITE_API_BASE_URL` empty in dev) |

To use your own database, copy `.env.example` → `.env` and update `DATABASE_URL`.  
AI job creation works without a real DeepSeek key — the system falls back to keyword classification.

### Manual setup (optional)

```bash
npm run install:all    # install backend + UI dependencies
npm run db:setup       # migrate + seed only
npm run dev            # API only (port 3000)
npm run dev:ui         # UI only (port 5173)
npm start              # production API
```

## Test Accounts

All seeded users use password: `Password123!`

| Role | Email |
|------|-------|
| Admin | admin@autorepair.com |
| Job Advisor | advisor@autorepair.com |
| Mechanical | mechanical@autorepair.com |
| Electrical | electrical@autorepair.com |
| Body Repair | body@autorepair.com |
| Paint | paint@autorepair.com |
| Customer | customer@autorepair.com |

**Test Vehicles:** `ABC123` (Toyota Camry), `XYZ789` (Honda Civic)

## API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | Public | Login and get JWT token |

### Admin - User Management
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/admin/users` | Admin | Create user |
| GET | `/api/admin/users` | Admin | List all users |
| GET | `/api/admin/users/:id` | Admin | Get user by ID |
| PUT | `/api/admin/users/:id` | Admin | Update user |
| DELETE | `/api/admin/users/:id` | Admin | Delete user |
| PATCH | `/api/admin/users/:id/activate` | Admin | Activate user |
| PATCH | `/api/admin/users/:id/deactivate` | Admin | Deactivate user |
| POST | `/api/admin/departments` | Admin | Create department |
| GET | `/api/admin/departments` | Admin | List departments |

### Customers
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/customers` | Advisor/Admin | Create customer |
| GET | `/api/customers` | Advisor/Admin | List customers |
| GET | `/api/customers/:id` | Advisor/Admin | Get customer |
| PUT | `/api/customers/:id` | Advisor/Admin | Update customer |
| DELETE | `/api/customers/:id` | Advisor/Admin | Delete customer |

### Vehicles
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/vehicles` | Advisor/Admin | Create vehicle |
| GET | `/api/vehicles` | Advisor/Admin | List vehicles |
| GET | `/api/vehicles/:id` | Advisor/Admin | Get vehicle |
| PUT | `/api/vehicles/:id` | Advisor/Admin | Update vehicle |
| DELETE | `/api/vehicles/:id` | Advisor/Admin | Delete vehicle |

### Jobs
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/jobs/analyze` | Advisor/Admin | AI analyze complaint & create jobs |
| GET | `/api/jobs` | Role-filtered | List jobs (filtered by role) |
| GET | `/api/jobs/:id` | Role-filtered | Get job details |
| POST | `/api/jobs/:id/start` | Dept User | Start a job |
| POST | `/api/jobs/:id/complete` | Dept User | Complete a job |

### Dashboards
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/dashboard/admin` | Admin | Admin dashboard stats |
| GET | `/api/dashboard/job-advisor` | Advisor/Admin | Advisor dashboard |
| GET | `/api/dashboard/department` | Dept User | Department dashboard |
| GET | `/api/dashboard/customer` | Customer | Customer dashboard |

## Workflow Example

### 1. Login as Job Advisor
```bash
POST /api/auth/login
{ "email": "advisor@autorepair.com", "password": "Password123!" }
```

### 2. Analyze Customer Complaint
```bash
POST /api/jobs/analyze
Authorization: Bearer <token>
{
  "vehicleRegistrationNo": "ABC123",
  "description": "Engine making noise and battery not charging"
}
```

**AI creates 2 jobs:**
- Job #1 → Mechanical Department (Engine Noise)
- Job #2 → Electrical Department (Battery Charging Problem)

### 3. Department User Works on Job
```bash
# Login as mechanical user
POST /api/jobs/:id/start

# Complete the job
POST /api/jobs/:id/complete
{ "comments": "Replaced timing belt and tensioner" }
```

## Postman Collection

Import `postman/AutoRepairAgent.postman_collection.json` into Postman.

The collection includes:
- All endpoints with request examples
- Response examples (success and error)
- Auto-token capture scripts on login requests
- Collection variables for `baseUrl`, `token`, `jobId`, etc.

**Recommended test flow:**
1. Health Check
2. Login as Admin → Login as Job Advisor → Login as Mechanical
3. POST Analyze Complaint (creates jobs)
4. GET Jobs (as Mechanical — filtered view)
5. POST Start Job → POST Complete Job
6. GET Dashboard endpoints

## Project Structure

```
AutoRepairAgent/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.js                # Seed data
│   └── migrations/            # Database migrations
├── UI/autorepairagent/        # React + Vite frontend
├── postman/
│   └── AutoRepairAgent.postman_collection.json
├── docs/                      # Reports, presentations, screenshots
├── src/
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│   ├── config/                # Environment, logger
│   ├── domain/enums/          # Business enums
│   ├── infrastructure/
│   │   ├── database/          # Prisma client
│   │   └── repositories/      # Data access layer
│   ├── application/services/  # Business logic
│   ├── presentation/
│   │   ├── controllers/       # HTTP handlers
│   │   ├── routes/            # Route definitions
│   │   ├── middlewares/       # Auth, RBAC, validation
│   │   └── validators/        # Zod schemas
│   └── shared/                # Errors, utilities
├── .env                       # Backend env (included for dev)
├── .env.example
└── package.json
```

## Database Schema

| Table | Description |
|-------|-------------|
| roles | User role definitions |
| departments | Repair departments |
| users | System users with role/department |
| customers | Customer records |
| vehicles | Vehicle records (unique registration) |
| jobs | Repair jobs with AI metadata |
| job_assignments | Job-to-user assignments |
| job_comments | Completion comments |
| ai_analysis_logs | AI classification history |
| audit_logs | System audit trail |

All tables include `created_date`, `updated_date`, `created_by`, `updated_by`.

## Security

- **JWT Authentication** — Bearer token on all protected routes
- **RBAC** — Role-based middleware on every endpoint
- **Password Hashing** — bcrypt with cost factor 12
- **Input Validation** — Zod schemas on all inputs
- **SQL Injection Protection** — Prisma parameterized queries
- **Rate Limiting** — 100 requests per 15 minutes (configurable)
- **Helmet** — Security HTTP headers
- **CORS** — Configurable origin

## AI Agent

The DeepSeek AI agent:
1. Reads complaint (any language)
2. Extracts individual issues
3. Identifies department per issue
4. Generates confidence scores
5. Stores AI reasoning in database
6. Creates separate job records
7. Auto-assigns to department users

Falls back to keyword-based classification if DeepSeek API is unavailable.

## License

MIT
