#!/bin/bash

echo "🚀 MoodMix Deployment Script"
echo "=============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3 first."
        exit 1
    fi
    
    print_success "All dependencies are installed"
}

# Initialize git repository if not already done
init_git() {
    if [ ! -d ".git" ]; then
        print_status "Initializing Git repository..."
        git init
        git add .
        git commit -m "Initial commit - MoodMix app"
        print_success "Git repository initialized"
    else
        print_status "Git repository already exists"
    fi
}

# Deploy backend to Railway
deploy_backend() {
    print_status "Deploying backend to Railway..."
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi
    
    cd backend
    
    # Login to Railway if not already logged in
    if ! railway whoami &> /dev/null; then
        print_status "Please login to Railway..."
        railway login
    fi
    
    # Deploy to Railway
    print_status "Deploying to Railway..."
    railway up
    
    # Get the deployment URL
    BACKEND_URL=$(railway status --json | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
    
    cd ..
    
    if [ ! -z "$BACKEND_URL" ]; then
        print_success "Backend deployed to: $BACKEND_URL"
        echo "BACKEND_URL=$BACKEND_URL" > .env.backend
    else
        print_error "Failed to get backend URL"
        exit 1
    fi
}

# Deploy frontend to Vercel
deploy_frontend() {
    print_status "Deploying frontend to Vercel..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    cd frontend
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    # Build the project
    print_status "Building frontend..."
    npm run build
    
    # Deploy to Vercel
    print_status "Deploying to Vercel..."
    vercel --prod
    
    cd ..
    
    print_success "Frontend deployment initiated"
}

# Setup environment variables
setup_env() {
    print_status "Setting up environment variables..."
    
    # Check if .env.backend exists
    if [ -f ".env.backend" ]; then
        BACKEND_URL=$(grep BACKEND_URL .env.backend | cut -d'=' -f2)
        print_status "Backend URL: $BACKEND_URL"
    else
        print_warning "Backend URL not found. Please set it manually in your deployment platform."
    fi
    
    print_warning "IMPORTANT: You need to set up environment variables in your deployment platforms:"
    echo ""
    echo "For Railway (Backend):"
    echo "- OPENAI_API_KEY"
    echo "- SPOTIFY_CLIENT_ID"
    echo "- SPOTIFY_CLIENT_SECRET"
    echo "- FIREBASE_SERVICE_ACCOUNT_KEY (upload the JSON file)"
    echo ""
    echo "For Vercel (Frontend):"
    echo "- REACT_APP_FIREBASE_API_KEY"
    echo "- REACT_APP_FIREBASE_AUTH_DOMAIN"
    echo "- REACT_APP_FIREBASE_PROJECT_ID"
    echo "- REACT_APP_FIREBASE_STORAGE_BUCKET"
    echo "- REACT_APP_FIREBASE_MESSAGING_SENDER_ID"
    echo "- REACT_APP_FIREBASE_APP_ID"
    echo "- REACT_APP_BACKEND_URL (set to your Railway backend URL)"
}

# Main deployment function
main() {
    check_dependencies
    init_git
    deploy_backend
    deploy_frontend
    setup_env
    
    echo ""
    print_success "Deployment completed!"
    echo ""
    print_warning "Next steps:"
    echo "1. Set up environment variables in Railway and Vercel dashboards"
    echo "2. Upload your Firebase service account key to Railway"
    echo "3. Test your deployed application"
    echo ""
    print_status "For detailed instructions, see DEPLOYMENT.md"
}

# Run the main function
main 