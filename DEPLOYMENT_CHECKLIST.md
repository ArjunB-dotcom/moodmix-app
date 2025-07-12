# ✅ MoodMix Deployment Checklist

## 🎯 Quick Deployment Steps

### 1. Create GitHub Repository
- [ ] Go to [GitHub.com](https://github.com)
- [ ] Create new repository named `moodmix-app`
- [ ] Make it public
- [ ] Don't initialize with README

### 2. Push Code to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/moodmix-app.git
git branch -M main
git push -u origin main
```

### 3. Deploy Backend (Railway)
- [ ] Go to [Railway.app](https://railway.app/)
- [ ] Sign up/Login with GitHub
- [ ] New Project → Deploy from GitHub repo
- [ ] Select your `moodmix-app` repository
- [ ] Set Root Directory to: `backend`
- [ ] Click Deploy
- [ ] Copy Railway URL

### 4. Deploy Frontend (Vercel)
- [ ] Go to [Vercel.com](https://vercel.com/)
- [ ] Sign up/Login with GitHub
- [ ] New Project → Import repository
- [ ] Select your `moodmix-app` repository
- [ ] Set Root Directory to: `frontend`
- [ ] Click Deploy
- [ ] Copy Vercel URL

### 5. Set Environment Variables

#### Railway (Backend)
- [ ] OPENAI_API_KEY=your_openai_key
- [ ] SPOTIFY_CLIENT_ID=your_spotify_client_id
- [ ] SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
- [ ] Upload serviceAccountKey.json to Files tab
- [ ] FIREBASE_SERVICE_ACCOUNT_KEY=serviceAccountKey.json

#### Vercel (Frontend)
- [ ] REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
- [ ] REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
- [ ] REACT_APP_FIREBASE_PROJECT_ID=your_project_id
- [ ] REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
- [ ] REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
- [ ] REACT_APP_FIREBASE_APP_ID=your_app_id
- [ ] REACT_APP_BACKEND_URL=https://your-railway-url.railway.app

### 6. Test Your App
- [ ] Visit your Vercel URL
- [ ] Test playlist generation
- [ ] Test user authentication
- [ ] Test saving playlists

## 🔗 Your URLs
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

## 📋 Prerequisites Checklist
- [ ] OpenAI API key
- [ ] Spotify API credentials
- [ ] Firebase project setup
- [ ] Firebase service account key

## 🆘 If Something Goes Wrong
1. Check environment variables are set correctly
2. Check Railway and Vercel logs
3. Make sure all API keys are valid
4. Verify Firebase project is properly configured

## 🎉 Success!
Your MoodMix app should now be live and working! 