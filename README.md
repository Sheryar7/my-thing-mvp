# MyThing Platform Monorepo

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-pgvector-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Pro%20%2F%20Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)
[![BullMQ](https://img.shields.io/badge/BullMQ-Redis%20Queue-CC0000?style=flat-square&logo=redis&logoColor=white)](https://bullmq.io)

---

## 1. System Overview

MyThing is a full-stack generative content production studio designed for technical creators, podcasters, educators, and media teams. The platform structures content creation into a disciplined, multi-stage production pipeline:

1. **Archive**: Centralizes research assets (PDF research papers, online publications, YouTube video transcripts, and personal notes). Ingests raw text into chunked vector embeddings via Google Gemini and Supabase pgvector, providing semantic claims extraction and automated technical summaries.
2. **Workshop**: A dual-pane authoring workstation for script generation and editing. Creators write scripts with immediate side-drawer access to indexed sources, claim verification, revision history, and an inline contextual AI co-writer.
3. **Forge**: A live studio recording booth featuring a configurable teleprompter. Supports variable speed pacing, font sizing, line-by-line speech tracking, and recording session synchronizations.
4. **Lens**: An automated pre-flight quality audit engine. Evaluates drafted scripts across multi-dimensional criteria including coverage score, grammar accuracy, factual alignment, and clarity, returning targeted recommendations before export.
5. **Export & Publish**: Multi-format publishing hub supporting export to Markdown, PDF, Audio, and Video, with direct channel integration configurations for YouTube, Spotify, Substack, and Medium.

---

## 2. Monorepo Structure

The repository is organized as a unified full-stack monorepo with dedicated service workspaces:

```
my-thing-mvp/
|-- .gitignore                     # Global monorepo ignore rules (env, logs, build, OS)
|-- .dockerignore                  # Monorepo Docker ignore configuration
|-- .env.example                   # Master environment configuration template
|-- docker-compose.yml             # Local multi-container stack (Redis, Backend, Frontend)
|-- package.json                   # Root orchestrator scripts (concurrently dev & build)
|-- package-lock.json              # Root workspace lockfile
|-- start-linux.sh                 # Unix environment automated startup script
|-- my-thing-backend/              # NestJS REST API and background worker engine
|   |-- .dockerignore              # Backend Docker ignore rules
|   |-- .env.example               # Backend environment variable template
|   |-- .gitignore                 # Backend-specific ignore rules
|   |-- Dockerfile                 # Multi-stage production container build
|   |-- README.md                  # Service-specific backend documentation
|   |-- nest-cli.json              # NestJS CLI configuration
|   |-- package.json               # Backend dependencies and scripts
|   |-- tsconfig.json              # TypeScript compilation configuration
|   `-- src/                       # Application source code
|       |-- common/                # Shared utilities, filters, and interceptors
|       |-- modules/
|       |   |-- ai/                # Google Gemini GenAI SDK provider
|       |   |-- archive/           # Document ingestion, claims, and summaries
|       |   |-- forge/             # Teleprompter blocks and recording sessions
|       |   |-- lens/              # Audit scoring engine and suggestions
|       |   |-- projects/          # Project metadata and portfolio metrics
|       |   |-- rag/               # BullMQ vector ingestion worker and search
|       |   |-- supabase/          # Supabase client and PostgreSQL connection
|       |   `-- workshop/          # Script drafting, versioning, and editing
|       `-- main.ts                # Application entry point (Port 4000)
`-- my-thing-frontend/             # Next.js 16 App Router client application
    |-- .dockerignore              # Frontend Docker ignore rules
    |-- .env.example               # Frontend environment variable template
    |-- .gitignore                 # Frontend-specific ignore rules
    |-- Dockerfile                 # Standalone production container build
    |-- README.md                  # Service-specific frontend documentation
    |-- next.config.ts             # Next.js and Turbopack configuration
    |-- package.json               # Frontend dependencies and scripts
    |-- tsconfig.json              # Frontend TypeScript configuration
    `-- src/                       # Application source code
        |-- app/
        |   |-- (auth)/            # Authentication flows (login, sign-up, reset)
        |   |-- (dashboard)/       # Main application workflows
        |   |   |-- archive/       # Source materials index and document viewer
        |   |   |-- dashboard/     # Project overview and workflow tracker
        |   |   |-- export-publish/# Multi-format export and distribution setup
        |   |   |-- forge/         # Live teleprompter studio
        |   |   |-- lens/          # Script validation and metric scores
        |   |   `-- workshop/      # Script editor and research drawer
        |   `-- api/               # Next.js server-side proxy routes (/api/rag/query)
        `-- components/            # Reusable UI component design system
```

---

## 3. System Architecture & Data Flow

```mermaid
flowchart TD
    User([Content Creator])

    subgraph ClientLayer [Frontend Layer - Port 3000]
        NextApp[Next.js 16 App Router]
        ProxyRoute[Next.js API Route
/api/rag/query]
    end

    subgraph APILayer [Backend Service - Port 4000]
        NestServer[NestJS Modular API Engine]
        RAGService[RAG Service & Ingestion Producer]
        IngestWorker[BullMQ Ingestion Processor]
    end

    subgraph Infrastructure [Data & External Services]
        RedisBroker[(Redis 7 / Upstash
BullMQ Broker)]
        SupabaseDB[(Supabase PostgreSQL
pgvector Tables)]
        GeminiAPI[Google Gemini AI
Embeddings & LLM]
    end

    User -->|Browser UI| NextApp
    NextApp -->|REST CRUD Requests| NestServer
    NextApp -->|Chat Inquiries| ProxyRoute
    ProxyRoute -->|Internal Forwarding| RAGService
    NestServer -->|Query / Store Records| SupabaseDB
    RAGService -->|Vector Search RPC| SupabaseDB
    RAGService -->|Prompt Synthesis| GeminiAPI
    RAGService -->|Enqueue Ingestion Job| RedisBroker
    RedisBroker -->|Dispatch Job| IngestWorker
    IngestWorker -->|Generate Embeddings| GeminiAPI
    IngestWorker -->|Persist Chunks & Vectors| SupabaseDB
```

### Architectural Boundaries

- **Client Layer**: Runs Next.js 16 with React 19. Renders dashboard interfaces, coordinates real-time teleprompter autoscrolling, and passes user questions through a secure same-origin API proxy route (`/api/rag/query`).
- **API Layer**: Implements NestJS 11 modular controllers. Enforces input validation (`class-validator`), handles business logic, and delegates heavy ingestion tasks to BullMQ queues.
- **Worker Layer**: Background workers handle document chunking using LangChain recursive text splitters, compute 768-dimensional embeddings via Google Gemini (`text-embedding-004`), and write vector records to Supabase.
- **Storage Layer**: PostgreSQL hosted on Supabase with the `pgvector` extension for cosine similarity search (`match_documents` stored procedure).

---

## 4. Technology Stack Summary

| Domain | Technology | Version | Key Functionality |
|---|---|---|---|
| Frontend Framework | Next.js | 16.2.9 | App Router, React Server Components, Turbopack |
| UI Framework | React | 19.2.4 | Interactive client-side view components |
| Styling Engine | Tailwind CSS | 4.x | Design token utility styling |
| Icons | React Icons / Lucide | 5.7.0 / 1.23.0 | UI iconography |
| Backend Framework | NestJS | 11.0.1 | Modular enterprise application architecture |
| Asynchronous Queues | BullMQ | 5.81.3 | Background job orchestration and retries |
| Message Broker | Redis | 7-alpine / Upstash | Queue backing store and fast key-value cache |
| Database & Vectors | Supabase (PostgreSQL) | Latest | Relational metadata, claims, and pgvector storage |
| Large Language Model | Google Gemini | 2.5 Pro / Flash | Summaries, RAG synthesis, and quality auditing |
| Embedding Model | Google GenAI | text-embedding-004 | Document vectorization (768 dimensions) |
| Monorepo Tooling | Concurrently | 8.2.2 | Multi-service orchestration during development |

---

## 5. Prerequisites

Verify that your system meets the following software requirements:

- **Node.js**: >= 20.10.0 (LTS recommended)
- **npm**: >= 10.0.0
- **Docker & Docker Compose**: (Optional) For containerized local Redis or running the complete stack
- **Supabase Account**: With a project created and the `pgvector` extension enabled
- **Google AI Studio Key**: API key with access to Gemini models and embedding endpoints

---

## 6. Environment Configuration

The monorepo uses environment files to manage external credentials. Never commit active credentials to source control.

### Master Root Template (`.env.example`)

```bash
# -------------------------------------------------------------
# MyThing Platform - Master Environment Configuration
# -------------------------------------------------------------

# Supabase Credentials (Project Settings -> API)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres

# Google Gemini API Key (Google AI Studio)
GEMINI_API_KEY=your-gemini-api-key

# Redis / BullMQ Ingestion Queue
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Service Endpoints & Bindings
PORT=4000
NEXT_PUBLIC_NESTJS_BACKEND_URL=http://localhost:4000
```

### Environment Variable Matrix

| Variable | Target Service | Description |
|---|---|---|
| `PORT` | Backend, Root | Port on which NestJS listens (Default: `4000`) |
| `NEXT_PUBLIC_NESTJS_BACKEND_URL` | Frontend, Root | Public API URL used by Next.js client fetches |
| `GEMINI_API_KEY` | Backend, Frontend | Google Gemini API key for embeddings and completions |
| `SUPABASE_URL` | Backend, Root | Supabase project API URL |
| `SUPABASE_ANON_KEY` | Backend, Root | Supabase public anonymous access key |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend, Root | Supabase administrative service role key (server-side only) |
| `DATABASE_URL` | Backend, Root | Direct PostgreSQL connection string |
| `REDIS_HOST` | Backend, Root | Redis hostname (`localhost`, `redis`, or Upstash host) |
| `REDIS_PORT` | Backend, Root | Redis port (Default: `6379`) |
| `REDIS_PASSWORD` | Backend, Root | Redis authentication password (empty for local Redis) |

---

## 7. Local Development Setup

### Method A: Monorepo Root Execution (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/my-thing-mvp.git
   cd my-thing-mvp
   ```

2. **Install all dependencies**:
   ```bash
   # Install root orchestration tools
   npm install

   # Install backend dependencies
   cd my-thing-backend && npm install && cd ..

   # Install frontend dependencies
   cd my-thing-frontend && npm install && cd ..
   ```

3. **Initialize environment files**:
   ```bash
   cp .env.example .env
   cp my-thing-backend/.env.example my-thing-backend/.env
   cp my-thing-frontend/.env.example my-thing-frontend/.env.local
   ```
   Configure your actual credentials in `my-thing-backend/.env` and `my-thing-frontend/.env.local`.

4. **Launch Redis** (if using local Docker):
   ```bash
   docker run -d --name mything-redis -p 6379:6379 redis:7-alpine
   ```

5. **Start frontend and backend concurrently**:
   ```bash
   npm run dev
   ```
   - Frontend application: [http://localhost:3000](http://localhost:3000)
   - Backend REST API: [http://localhost:4000](http://localhost:4000)

---

### Method B: Independent Service Execution

#### 1. Backend Service
```bash
cd my-thing-backend

# Start development server with file watching
npm run start:dev

# Run production build
npm run build

# Execute unit tests
npm run test

# Execute e2e integration tests
npm run test:e2e
```

#### 2. Frontend Service
```bash
cd my-thing-frontend

# Start Next.js development server
npm run dev

# Run production build verification
npm run build

# Start production server
npm run start

# Run ESLint validation
npm run lint
```

---

### Method C: Docker Compose Full Stack

To spin up the entire application stack (Redis broker, NestJS API server, and Next.js client) using Docker:

```bash
# Configure master environment file
cp .env.example .env

# Build and start all containers
docker compose up --build -d

# Tail consolidated service logs
docker compose logs -f

# Stop and remove containers
docker compose down
```

---

## 8. Service Ports & Verification Matrix

| Service | Host Port | Internal Port | Protocol | Verification URL |
|---|---|---|---|---|
| Next.js Frontend | `3000` | `3000` | HTTP | `http://localhost:3000/dashboard` |
| NestJS Backend API | `4000` | `4000` | HTTP | `http://localhost:4000/` |
| Redis Ingestion Queue | `6379` | `6379` | TCP | `redis-cli -p 6379 ping` |

---

## 9. Security & Git Hygiene Policies

- **Strict Environment Isolation**: All real credentials, API tokens, database connection strings, and private keys reside solely in `.env`, `.env.local`, or hosting secret stores. Only `.env.example` templates are permitted in Git.
- **Layered Gitignore Rules**: The root and nested `.gitignore` files exclude all variants of `.env*` files, `node_modules/`, build outputs (`.next/`, `dist/`, `build/`, `out/`), logs (`*.log`), OS files (`.DS_Store`, `Thumbs.db`), and editor settings (`.vscode/`, `.idea/`).
- **Zero Browser Secret Exposure**: Administrative keys such as the Supabase `SERVICE_ROLE_KEY` are restricted to the NestJS backend and never bundled into frontend client packages.