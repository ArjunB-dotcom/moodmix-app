# 🚀 Quick Deploy Guide - MoodMix

## Option 1: Automated Deployment (Recommended)

Run the automated deployment script:

```bash
./deploy.sh
```

This will:
- Deploy backend to Railway
- Deploy frontend to Vercel
- Guide you through environment setup

## Option 2: Manual Deployment

### Step 1: Deploy Backend to Railway

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Deploy Backend**:
   ```bash
   cd backend
   railway up
   ```

4. **Get your backend URL**:
   ```bash
   railway status
   ```

### Step 2: Deploy Frontend to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   vercel --prod
   ```

## 🔧 Environment Setup

### Railway (Backend) Environment Variables

Go to your Railway dashboard and add these variables:

```
OPENAI_API_KEY=your_openai_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
FIREBASE_SERVICE_ACCOUNT_KEY=path_to_your_service_account.json
```

### Vercel (Frontend) Environment Variables

Go to your Vercel dashboard and add these variables:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_BACKEND_URL=https://your-railway-backend-url.railway.app
```

## 🎯 Quick Start Commands

```bash
# 1. Run automated deployment
./deploy.sh

# 2. Or deploy manually
cd backend && railway up
cd ../frontend && vercel --prod

# 3. Set environment variables in dashboards
# 4. Test your app!
```

## 📋 Prerequisites

Before deploying, make sure you have:

- [ ] OpenAI API key
- [ ] Spotify API credentials
- [ ] Firebase project setup
- [ ] Firebase service account key

## 🔗 Useful Links

- [Railway Dashboard](https://railway.app/dashboard)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Firebase Console](https://console.firebase.google.com/)
- [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- [OpenAI API](https://platform.openai.com/api-keys)

## 🆘 Need Help?

1. Check the full `DEPLOYMENT.md` for detailed instructions
2. Check `README.md` for setup instructions
3. Run `./quick-start.sh` for local development setup 