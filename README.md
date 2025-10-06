# GroceryGo (FreshCart) — Local Setup

This repository contains a full-stack example grocery app (client + server) using Vite, React, TypeScript, Express and Drizzle ORM.

Quick start (local):

1. Install dependencies

```bash
npm install
```

2. Copy environment variables

```bash
cp .env.example .env
# then edit .env to set REAL values
```

3. Start dev server (server + Vite)

```bash
npm run dev
```

4. Build for production

```bash
npm run build
npm run start
```

Required environment variables (see `.env.example`):
- DATABASE_URL: Postgres connection string (if using a DB)
- PORT: port to run server on (default 5000)
- SESSION_SECRET: secret for sessions

Notes:
- The project originally included Replit-specific Vite plugins; these were removed to give you full control.
- For dev-time overlays and type checking, install `vite-plugin-checker`:

```bash
npm install -D vite-plugin-checker
```

- Server bundling uses `esbuild` in `package.json` — check that dynamic imports and Node globals are supported in your target.

If you want me to wire up DB-backed storage and more API endpoints, tell me and I can implement those next.
