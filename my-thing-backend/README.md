# MyThing Backend API Service

[![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![BullMQ](https://img.shields.io/badge/BullMQ-5.81.3-CC0000?style=flat-square&logo=redis&logoColor=white)](https://bullmq.io)
[![Supabase](https://img.shields.io/badge/Supabase-pgvector-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-text--embedding--004-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)

---

## 1. Overview

The `my-thing-backend` workspace is an enterprise NestJS 11 application providing RESTful API endpoints and asynchronous queue workers. It powers knowledge indexing, vector similarity searches, teleprompter block sequencing, script versioning, and AI-driven quality audits.

---

## 2. Architecture & Module Structure

```
my-thing-backend/
|-- src/
|   |-- common/                    # Shared filters, pipes, interceptors, and DTOs
|   |-- modules/
|   |   |-- ai/                    # Google Gemini GenAI SDK provider wrapper
|   |   |-- archive/               # Multi-format source ingestion & claim extraction
|   |   |-- forge/                 # Teleprompter block management & recording telemetry
|   |   |-- lens/                  # Script pre-flight auditing & quality metrics
|   |   |-- projects/              # Workspace project CRUD & workflow statistics
|   |   |-- rag/                   # Vector search, embeddings, & BullMQ processors
|   |   |   |-- dto/               # Ingestion and query request validation schemas
|   |   |   |-- processors/        # BullMQ async background worker consumers
|   |   |   |-- providers/         # Supabase and Gemini vector client wrappers
|   |   |   |-- services/          # Recursive text chunking and cosine similarity search
|   |   |   |-- rag.controller.ts  # Ingest and query HTTP endpoints
|   |   |   `-- rag.service.ts     # Orchestration service for RAG pipeline
|   |   |-- supabase/              # Supabase client factory and pgvector bindings
|   |   `-- workshop/              # Script generation, block editing, & versions
|   |-- app.controller.ts          # Health check endpoint (GET /)
|   |-- app.module.ts              # Root application module with BullMQ and Config
|   |-- app.service.ts             # Health check service implementation
|   |-- main.ts                    # Bootstrap entry point with global validation
|   `-- seed-real-content.ts       # Database content seed utility
|-- test/                          # Unit and End-to-End Jest test suites
|-- Dockerfile                     # Multi-stage production container build
|-- nest-cli.json                  # Nest CLI configuration
|-- package.json                   # Dependencies and scripts
`-- tsconfig.json                  # TypeScript compiler configuration
```

---

## 3. Core Modules & Endpoints

### 1. Archive Module (`/v1/archive`)
- `GET /v1/archive/sources?projectId=:id` - Retrieve indexed sources for a given project.
- `GET /v1/archive/sources/:id` - Fetch single source details, full text, and claims.
- `POST /v1/archive/ingest` - Ingest raw document content (PDF, Web, Note, Video).

### 2. Workshop Module (`/v1/workshop`)
- `GET /v1/workshop/scripts?projectId=:id` - List scripts associated with a project.
- `POST /v1/workshop/scripts` - Save or update script draft content.
- `GET /v1/workshop/versions/:scriptId` - Retrieve revision history for a script.

### 3. Forge Module (`/v1/forge`)
- `GET /v1/forge/teleprompter/:scriptId` - Retrieve speech-parsed teleprompter blocks.
- `POST /v1/forge/session` - Record teleprompter playback telemetry and pacing logs.

### 4. Lens Module (`/v1/lens`)
- `GET /v1/lens/reports?projectId=:id` - Fetch pre-flight audit scores and suggestions.
- `POST /v1/lens/evaluate` - Trigger fresh multi-dimensional evaluation of script text.

### 5. Projects Module (`/v1/projects`)
- `GET /v1/projects` - List all workspace projects with status indicators.
- `GET /v1/projects/:id` - Retrieve metadata and statistics for a specific project.
- `POST /v1/projects` - Create a new content project.

### 6. RAG Module (`/v1/rag`)
- `POST /v1/rag/query` - Perform semantic vector search and LLM context synthesis.
- `POST /v1/rag/ingest` - Push document into BullMQ queue for chunking and embedding.

---

## 4. Background Queue & Vector Ingestion

The backend uses **BullMQ** over Redis for non-blocking document ingestion:

1. **Job Enqueueing**: When a document is ingested via `/v1/rag/ingest`, a job is added to the `document-ingestion` BullMQ queue.
2. **Chunking**: `ChunkingService` processes the raw text with LangChain recursive character splitters (default chunk size: 1000 characters, overlap: 200 characters).
3. **Embedding**: `GeminiProvider` submits chunks in batches to `text-embedding-004`, generating 768-dimensional float vectors.
4. **Vector Storage**: `SupabaseProvider` writes the chunk records and vectors into the `document_chunks` table.
5. **Retrieval**: The `match_documents` PostgreSQL stored procedure computes cosine similarity between user queries and stored chunks.

---

## 5. Environment Variables

Configure environment variables in `.env`:

```bash
# Application Port
PORT=4000

# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Credentials
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# PostgreSQL Connection String
DATABASE_URL=postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres

# Redis / BullMQ Ingestion Queue
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | Yes | HTTP listening port (Default: `4000`) |
| `GEMINI_API_KEY` | Yes | Key for Google Gemini LLM and embeddings |
| `SUPABASE_URL` | Yes | Supabase project API endpoint |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Administrative secret key for vector writes and database RPCs |
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `REDIS_HOST` | Yes | Redis host (`localhost`, `redis`, or Upstash host) |
| `REDIS_PORT` | Yes | Redis port (`6379`) |
| `REDIS_PASSWORD` | Optional | Redis authentication password |

---

## 6. Development Scripts

Execute the following commands from within the `my-thing-backend` directory:

```bash
# Start development server with file watch mode
npm run start:dev

# Compile TypeScript to dist/
npm run build

# Start production server
npm run start:prod

# Execute unit test suite
npm run test

# Execute unit tests in watch mode
npm run test:watch

# Execute end-to-end integration tests
npm run test:e2e

# Generate test coverage report
npm run test:cov

# Run ESLint fix
npm run lint

# Format code with Prettier
npm run format
```