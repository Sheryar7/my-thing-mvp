# MyThing Frontend Service

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## 1. Overview

The `my-thing-frontend` workspace is a Next.js 16 application leveraging React 19, the App Router architecture, and Tailwind CSS v4. It delivers the responsive web user interface for all creator stages across desktop, tablet, and mobile devices.

---

## 2. Route & Directory Structure

```
my-thing-frontend/
|-- public/                        # Static brand assets, icons, and illustrations
|-- src/
|   |-- app/
|   |   |-- (auth)/                # Unauthenticated flows
|   |   |   |-- forgot-password/   # Password reset request view
|   |   |   |-- log-in/            # User authentication view
|   |   |   |-- reset-password/    # Password update confirmation view
|   |   |   `-- sign-up/           # New account registration view
|   |   |-- (dashboard)/           # Authenticated application views
|   |   |   |-- _components/       # Global navigation: Sidebar, Header, Breadcrumbs
|   |   |   |-- archive/           # Research asset repository
|   |   |   |   |-- [id]/          # Project sources list & claim inspection
|   |   |   |   |   |-- [documentId]/ # Document viewer & Ask AI chat interface
|   |   |   |   |   `-- processing/# Ingestion progress tracking view
|   |   |   |-- dashboard/         # Project portfolio, activity table, & quick stats
|   |   |   |-- export-publish/    # Format generator & publication channels
|   |   |   |-- forge/             # Live teleprompter booth & recording controls
|   |   |   |-- lens/              # Multi-metric pre-flight quality audit
|   |   |   `-- workshop/          # Two-column script authoring & context drawer
|   |   |-- api/
|   |   |   `-- rag/query/         # Same-origin proxy route to backend /v1/rag/query
|   |   |-- globals.css            # Tailwind CSS v4 design tokens and directives
|   |   `-- layout.tsx             # Root document layout with responsive shell
|   |-- components/
|   |   `-- ui/                    # Base design system primitives (Button, Cards)
|   `-- lib/                       # Utility helpers (cn, tailwind-merge, clsx)
|-- next.config.ts                 # Next.js compiler settings
|-- package.json                   # Dependencies and scripts
`-- tsconfig.json                  # TypeScript compiler options
```

---

## 3. Component Architecture & State Flow

### Application Views

1. **Dashboard** (`/dashboard`): Displays high-level workspace stats (active projects, total sources, published scripts), recent projects table with status pills, and interactive workflow milestone links.
2. **Archive** (`/archive`, `/archive/[id]`, `/archive/[id]/[documentId]`): Manages categorized research documents (Websites, PDFs, Videos, Notes). The detail view provides page-by-page document reading, key takeaways, claims list, and an inline Ask AI chat interface.
3. **Workshop** (`/workshop`): Dual-column drafting studio featuring a full-length script editor alongside a collapsable research drawer, contextual source cards, revision version history, and an AI co-author.
4. **Forge** (`/forge`): Production teleprompter with auto-scroll speed controls, text size/boldness selectors, line-by-line speech highlighting, playback controls, and project synchronization.
5. **Lens** (`/lens`): Pre-flight evaluation screen displaying circular score gauges for overall coverage, along with detailed ratings for grammar, accuracy, and writing quality, paired with actionable improvement suggestions.
6. **Export & Publish** (`/export-publish`): Multi-channel distribution screen for exporting scripts into Markdown, PDF, Audio, or Video, and dispatching to YouTube, Spotify, Substack, and Medium.

### API Integration & Proxy Route

The frontend communicates with the NestJS backend via:

- **Client Fetch Calls**: Standard REST queries for projects, sources, scripts, and teleprompter blocks point to `process.env.NEXT_PUBLIC_NESTJS_BACKEND_URL` (Default: `http://localhost:4000`).
- **RAG Proxy Route** (`/api/rag/query`): User inquiries made to the contextual AI assistant route through the Next.js API route handler (`src/app/api/rag/query/route.ts`). This route validates payload shapes and forwards the request server-to-server to NestJS, avoiding CORS restrictions and hiding internal backend network addresses.

---

## 4. Environment Variables

Configure environment variables in `.env.local`:

```bash
# NestJS Backend API URL
NEXT_PUBLIC_NESTJS_BACKEND_URL=http://localhost:4000

# Google Gemini API Key (Direct client features / fallbacks)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Public Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# PostgreSQL Direct Connection String (Optional server components)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project-ref.supabase.co:5432/postgres
```

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_NESTJS_BACKEND_URL` | Yes | Base URL for REST communication with the NestJS server |
| `GEMINI_API_KEY` | Yes | API key for direct Google Gemini requests |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Public URL of your Supabase instance |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anonymous key for client-side queries |

---

## 5. Development Scripts

Execute the following commands from within the `my-thing-frontend` directory:

```bash
# Start development server on port 3000 (with Turbopack)
npm run dev

# Generate production build
npm run build

# Start production server
npm run start

# Run ESLint checks
npm run lint
```