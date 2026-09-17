#!/bin/bash
set -e

echo "================================================="
echo "   🚀 Launching 'My Thing' on Linux / Docker    "
echo "================================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Error: Docker is not running. Please start Docker Engine / Docker Desktop."
  exit 1
fi

# Ensure .env exists
if [ ! -f .env ]; then
  echo "⚠️  .env file not found. Creating from .env.example..."
  cp .env.example .env
  echo "Please edit .env with your Supabase and Gemini keys before running again."
  exit 1
fi

echo "📦 Building and starting containers (Redis, Backend, Frontend)..."
docker compose down --remove-orphans
docker compose build
docker compose up -d

echo ""
echo "================================================="
echo "✅ All Services Are Running Successfully!"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend:  http://localhost:4000"
echo "   - Redis:    localhost:6379"
echo "================================================="
echo "To view logs, run: docker compose logs -f"
