#!/usr/bin/env bash
set -euo pipefail

if [[ ! -f .env ]]; then
  echo "[launch] .env not found. Creating from .env.example"
  cp .env.example .env
fi

echo "[launch] starting platform stack (api + postgres + redis)"
docker compose up -d --build

echo "[launch] waiting for API health endpoint..."
for i in {1..30}; do
  if curl -fsS http://localhost:8080/health >/dev/null; then
    echo "[launch] API is healthy ✅"
    exit 0
  fi
  sleep 1
done

echo "[launch] API failed to become healthy in time"
exit 1
