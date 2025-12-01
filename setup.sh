#!/bin/bash

# 🚀 Launch Mini App - Quick Setup Script
# This script helps you get started quickly

echo "🚀 Welcome to Launch Mini App Setup!"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old. Please install Node.js 18+ or higher."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm -v) detected"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Check for .env.local file
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: You need to add your Thirdweb Client ID"
    echo "   1. Visit: https://thirdweb.com/dashboard"
    echo "   2. Get your Client ID"
    echo "   3. Add it to .env.local"
    echo ""
    read -p "Press Enter to open .env.local in your editor..."
    
    # Try to open in common editors
    if command -v code &> /dev/null; then
        code .env.local
    elif command -v nano &> /dev/null; then
        nano .env.local
    elif command -v vim &> /dev/null; then
        vim .env.local
    else
        echo "Please manually edit .env.local"
    fi
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "===================================="
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Make sure you've added your Thirdweb Client ID to .env.local"
echo "  2. Add icon.png (512x512) to the /public folder"
echo "  3. Add splash.png (1200x630) to the /public folder"
echo "  4. Run: npm run dev"
echo "  5. Visit: http://localhost:3000"
echo ""
echo "For deployment instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "Happy building! 🚀"
