#!/bin/bash

echo "🎧 Welcome to MoodMix Setup!"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3 first."
    echo "Visit: https://python.org/"
    exit 1
fi

echo "✅ Node.js and Python are installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Create environment files
echo "🔧 Setting up environment files..."

# Frontend .env
if [ ! -f frontend/.env ]; then
    echo "Creating frontend/.env from template..."
    cp frontend/env.example frontend/.env
    echo "⚠️  Please update frontend/.env with your Firebase credentials"
fi

# Backend .env
if [ ! -f backend/.env ]; then
    echo "Creating backend/.env from template..."
    cp backend/env.example backend/.env
    echo "⚠️  Please update backend/.env with your API keys"
fi

# Firebase service account
if [ ! -f firebase-config/serviceAccountKey.json ]; then
    echo "⚠️  Please add your Firebase service account key to firebase-config/serviceAccountKey.json"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update frontend/.env with your Firebase credentials"
echo "2. Update backend/.env with your API keys"
echo "3. Add your Firebase service account key"
echo "4. Start the backend: cd backend && python app.py"
echo "5. Start the frontend: cd frontend && npm start"
echo ""
echo "📚 For detailed setup instructions, see README.md"
echo "🚀 For deployment guide, see DEPLOYMENT.md" 