# Interview talk track

## One-minute explanation

CommerceBridge Studio is a full-stack project focused on e-commerce operations. I built it to show the same type of work I have done professionally: adapting e-commerce experiences, handling product data, connecting forms to a database and creating reusable frontend sections. The frontend uses React, Vite, TypeScript and Tailwind, while the backend uses Node, Express, TypeScript, Sequelize and MySQL. I also added Liquid-style rendering to connect the project with Shopify/Liquid workflows.

## Technical decisions

- I used a monorepo to keep the web and API applications together while preserving clear boundaries.
- I used Zod validation on both frontend and backend to reduce invalid data.
- I used TanStack Query to avoid manual loading/error state duplication across server requests.
- I included a Liquid preview endpoint because Liquid is common in Shopify theme customization.
- I organized UI into reusable components instead of one large page.
- I added environment examples and API documentation to make the project easy to run and review.

## What I would improve next

- Add authentication and admin roles.
- Add CSV imports for product catalogs.
- Add tests with Vitest and Supertest.
- Add Shopify Admin API integration behind a safe demo adapter.
- Add deployment documentation for Vercel and Render/Railway.
