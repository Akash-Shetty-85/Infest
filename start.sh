#!/bin/bash

# Define paths for frontend and backend
FRONTEND_DIR="$(pwd)/frontend"
BACKEND_DIR="$(pwd)/backend"

# Ensure both directories exist
if [ ! -d "$FRONTEND_DIR" ]; then
  echo "Frontend directory not found!"
  exit 1
fi

if [ ! -d "$BACKEND_DIR" ]; then
  echo "Backend directory not found!"
  exit 1
fi

# Start Frontend (npm install and run dev)
echo "🚀 Starting frontend..."
cd "$FRONTEND_DIR" || exit
npm install
npm run dev &  # Run in the background

# Start Backend (npm install and run dev)
echo "🚀 Starting backend..."
cd "$BACKEND_DIR" || exit
npm install
npm run dev &  # Run in the background

# Wait for the processes to finish
wait

echo "✅ Both frontend and backend are running!"

