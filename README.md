# Taskify

A full-stack personal task manager built to turn plans into finished work. Taskify combines a focused, responsive interface with secure account access, a zero-friction demo and persistent cloud data.

**Live app:** [taskify-app-dev.netlify.app](https://taskify-app-dev.netlify.app)

**API health:** [taskify-9ruc.onrender.com/health](https://taskify-9ruc.onrender.com/health)

## Highlights

- Account registration, sign-in, persistent sessions and protected routes
- Instant private demo workspace with starter tasks
- Create, search, filter, sort, edit and delete tasks
- Dashboard statistics for active, completed and overdue work
- Responsive layouts, empty states, loading feedback and accessible controls
- Per-user data isolation in PostgreSQL
- Automatic cleanup of temporary demo accounts after 48 hours
- Authentication rate limiting and salted password hashing
- Editable profile, contact form, legal pages and custom 404 page

## Architecture

| Layer | Technology | Hosting |
| --- | --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS | Netlify |
| API | Node.js, Express | Render |
| Database | PostgreSQL | Neon |

The frontend calls a REST API using bearer-token authentication. The API owns validation and data access, while PostgreSQL keeps every user's tasks isolated by owner ID. Local development falls back to JSON files when no database URL is configured.

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm install
cd backend && npm install
```

Create `.env.local` in the project root:

```env
VITE_API_URL=http://localhost:4000
PORT=4000
CORS_ORIGIN=http://localhost:5173
AUTH_SECRET=replace-with-a-long-random-secret
# DATABASE_URL is optional locally
```

Start the API from `backend` and the frontend from the project root:

```bash
npm start
npm run dev
```

The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:4000`.

## Quality checks

```bash
npm test
npm run lint
npm run build
```

## Deployment

The repository includes `netlify.toml` and `render.yaml`.

- Netlify: set `VITE_API_URL` to the public Render service URL.
- Render: set `CORS_ORIGIN` to the exact Netlify origin and `DATABASE_URL` to the pooled Neon connection string.
- Render generates `AUTH_SECRET` automatically when the service is created from the Blueprint.
- Database tables are created idempotently when the API starts.

## Product decisions

The demo removes signup friction for reviewers while still exercising the same API and database path as a normal account. Demo sessions are temporary and their data is deleted automatically. Features that require an external delivery service, such as password-reset email, are intentionally not presented as functional until a real mail provider is connected.
