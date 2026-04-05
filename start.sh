#!/bin/bash

# BeneficiosHub - Local development startup script
set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

echo "================================================"
echo "  BeneficiosHub - Local Development"
echo "================================================"

# Check if node_modules exist, install if not
if [ ! -d "$BACKEND_DIR/node_modules" ]; then
  echo "Installing backend dependencies..."
  cd "$BACKEND_DIR" && npm install
fi

if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
  echo "Installing frontend dependencies..."
  cd "$FRONTEND_DIR" && npm install
fi

# Run Prisma migrate and seed if DB doesn't exist
cd "$BACKEND_DIR"
if [ ! -f "./prisma/dev.db" ]; then
  echo "Running database migrations..."
  npx prisma migrate dev --name init
  echo "Seeding database..."
  node prisma/seed.js
fi

echo ""
echo "Starting services..."
echo "  Backend  → http://localhost:3001"
echo "  Frontend → http://localhost:5173"
echo ""

# Start backend in background
cd "$BACKEND_DIR"
npm run dev &
BACKEND_PID=$!

# Start frontend in background
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

# Trap to kill both processes on exit
trap "echo 'Stopping services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT INT TERM

# Wait for both
wait $BACKEND_PID $FRONTEND_PID
