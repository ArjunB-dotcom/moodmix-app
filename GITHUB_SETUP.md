# 📚 GitHub Setup for Deployment

## Step 1: Create GitHub Repository

1. **Go to [GitHub.com](https://github.com)**
2. **Click "New repository"**
3. **Name it**: `moodmix-app`
4. **Make it Public** (for free deployment)
5. **Don't initialize with README** (we already have one)
6. **Click "Create repository"**

## Step 2: Push Your Code

Run these commands in your terminal:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/moodmix-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app/)**
2. **Sign up/Login with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Select your `moodmix-app` repository**
6. **Set Root Directory to**: `backend`
7. **Click "Deploy"**
8. **Wait for deployment to complete**
9. **Copy your Railway URL** (e.g., `https://your-app.railway.app`)

## Step 4: Deploy Frontend to Vercel

1. **Go to [Vercel.com](https://vercel.com/)**
2. **Sign up/Login with GitHub**
3. **Click "New Project"**
4. **Import your `moodmix-app` repository**
5. **Set Root Directory to**: `frontend`
6. **Click "Deploy"**
7. **Wait for deployment to complete**
8. **Copy your Vercel URL** (e.g., `https://your-app.vercel.app`)

## Step 5: Configure Environment Variables

### Railway (Backend) Environment Variables

In your Railway dashboard:

1. **Go to your project**
2. **Click "Variables" tab**
3. **Add these variables**:

```
OPENAI_API_KEY=your_openai_api_key_here
SPOTIFY_CLIENT_ID=your_spotify_client_id_here
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

4. **For Firebase service account**:
   - Click "Files" tab
   - Upload your `serviceAccountKey.json` file
   - Add variable: `FIREBASE_SERVICE_ACCOUNT_KEY=serviceAccountKey.json`

### Vercel (Frontend) Environment Variables

In your Vercel dashboard:

1. **Go to your project**
2. **Click "Settings" → "Environment Variables"**
3. **Add these variables**:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_BACKEND_URL=https://your-railway-backend-url.railway.app
```

## Step 6: Redeploy

After setting environment variables:

1. **Railway**: Will auto-redeploy
2. **Vercel**: Go to "Deployments" → "Redeploy"

## 🎉 Your App is Live!

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

## 🔗 Quick Links

- [GitHub](https://github.com)
- [Railway](https://railway.app)
- [Vercel](https://vercel.com)
- [Firebase Console](https://console.firebase.google.com)
- [Spotify Developer](https://developer.spotify.com/dashboard)
- [OpenAI API](https://platform.openai.com/api-keys)

## 🆘 Need Help?

1. Check the full `DEPLOYMENT.md` for detailed instructions
2. Check `README.md` for setup instructions
3. Make sure all environment variables are set correctly 