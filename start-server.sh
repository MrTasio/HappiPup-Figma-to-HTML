#!/bin/bash
# Simple script to start a local web server

echo "Starting local web server..."
echo "Open your browser and go to: http://localhost:8000/index.html"
echo "Press Ctrl+C to stop the server"
echo ""

# Try Python 3 first, then Python 2, then Node.js
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
elif command -v node &> /dev/null; then
    npx http-server -p 8000
else
    echo "Error: No web server found. Please install Python 3 or Node.js"
    exit 1
fi

