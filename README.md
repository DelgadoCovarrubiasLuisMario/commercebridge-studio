# CommerceBridge Studio

Portfolio project aligned with Luis Mario Delgado Covarrubias' CV: custom websites, e-commerce adaptation, Shopify/Liquid, forms, database connectivity, JavaScript/TypeScript, Git, agile delivery and full-stack production thinking.

CommerceBridge Studio is a full-stack e-commerce operations dashboard for small brands that need to manage products, capture customer leads, preview storefront sections and render Liquid-like templates before publishing changes.

## Why this project belongs in the portfolio

This project demonstrates experience that is directly connected to real work listed in the CV:

- Custom website development for client-facing brands.
- E-commerce adaptation and product catalog work.
- Liquid-inspired template rendering using `liquidjs`.
- Forms connected to a database.
- Full-stack architecture with React/Vite/TypeScript and Node/Express/TypeScript.
- MySQL persistence through Sequelize.
- Admin workflows, validation, CORS, security middleware and environment configuration.
- Clean repository structure for GitHub and interviews.

## Tech stack

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS v4 through the Vite plugin
- TanStack Query for server-state management
- React Hook Form + Zod for validated forms
- Motion for interface animations
- Lucide React for icons

### Backend

- Node.js + Express + TypeScript
- Sequelize + MySQL
- Zod request validation
- LiquidJS for server-side Liquid-style template rendering
- Helmet, CORS and rate limiting
- Environment-driven configuration

## Features

- E-commerce dashboard with revenue, product and lead metrics.
- Product catalog with search, status badges and stock indicators.
- Create/update product workflow with validation.
- Storefront preview that simulates a modern brand landing page.
- Liquid template sandbox for product-card previews.
- Lead capture form connected to the API.
- Lead management board for client inquiries.
- Theme settings endpoint for brand colors, announcement bar and hero copy.
- Seed script with demo products, collections, leads and theme configuration.

## Monorepo structure

```txt
commercebridge-suite/
├─ apps/
│  ├─ api/        # Express + Sequelize + MySQL API
│  └─ web/        # React + Vite + Tailwind dashboard
├─ docs/
│  ├─ CV_PROJECT_ENTRY.md
│  ├─ GITHUB_DESCRIPTION.md
│  ├─ INTERVIEW_TALK_TRACK.md
│  └─ PORTFOLIO_SERIES.md
└─ README.md
```

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the API

```bash
cp apps/api/.env.example apps/api/.env
```

Create a MySQL database named `commercebridge_db` or adjust the `.env` values.

### 3. Seed demo data

```bash
npm run db:seed -w apps/api
```

### 4. Run the API

```bash
npm run dev:api
```

The API runs on `http://localhost:4100` by default.

### 5. Run the web app

```bash
npm run dev:web
```

The frontend runs on `http://localhost:5174` by default.

## Environment variables

### API

See `apps/api/.env.example`.

### Web

See `apps/web/.env.example`.

## API overview

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | API health check |
| GET | `/api/products` | List products with filters |
| POST | `/api/products` | Create a product |
| PATCH | `/api/products/:id` | Update a product |
| GET | `/api/collections` | List storefront collections |
| GET | `/api/leads` | List customer leads |
| POST | `/api/leads` | Create a lead from a form |
| GET | `/api/theme` | Get current theme settings |
| PUT | `/api/theme` | Update theme settings |
| POST | `/api/theme/render` | Render Liquid-style template preview |

## Demo positioning for recruiters

> CommerceBridge Studio is a full-stack e-commerce dashboard that helps small brands manage products, customer leads and storefront content. It includes a React/Vite/TypeScript dashboard, a Node/Express/TypeScript API, MySQL persistence with Sequelize and a Liquid-style template renderer for storefront previews.

## Notes

This is a portfolio-safe project. It does not copy private client code, credentials, databases or proprietary designs. It recreates the kind of business problems solved in professional e-commerce work using original code and neutral demo data.
