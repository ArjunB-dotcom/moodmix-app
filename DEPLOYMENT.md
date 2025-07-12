# 🚀 MoodMix Deployment Guide

This guide will help you deploy the MoodMix application to various platforms.

## 📋 Prerequisites

Before deploying, ensure you have:

1. **API Keys and Credentials**:
   - OpenAI API key
   - Spotify API credentials
   - Firebase project setup
   - Service account key

2. **Environment Variables**: Set up all required environment variables

3. **Domain/URL**: A domain name for your application (optional but recommended)

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Build the Frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Configure Environment Variables**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add all environment variables from `frontend/env.example`

### Option 2: Netlify

1. **Build the Frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Deploy**:
   - Drag and drop the `build` folder to Netlify
   - Or connect your GitHub repository

3. **Configure Environment Variables**:
   - Go to Site settings > Environment variables
   - Add all required variables

### Option 3: GitHub Pages

1. **Update package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/moodmix",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🖥️ Backend Deployment

### Option 1: Heroku

1. **Install Heroku CLI**:
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku App**:
   ```bash
   cd backend
   heroku create your-moodmix-backend
   ```

3. **Set Environment Variables**:
   ```bash
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set SPOTIFY_CLIENT_ID=your_id
   heroku config:set SPOTIFY_CLIENT_SECRET=your_secret
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 2: Railway

1. **Connect Repository**:
   - Go to [Railway](https://railway.app/)
   - Connect your GitHub repository
   - Select the backend directory

2. **Configure Environment Variables**:
   - Add all environment variables in Railway dashboard

3. **Deploy**:
   - Railway will automatically deploy on push

### Option 3: DigitalOcean App Platform

1. **Create App**:
   - Go to DigitalOcean App Platform
   - Connect your repository
   - Select Python as the environment

2. **Configure Build Settings**:
   ```yaml
   build_command: pip install -r requirements.txt
   run_command: python app.py
   ```

3. **Set Environment Variables**:
   - Add all required environment variables

### Option 4: AWS Elastic Beanstalk

1. **Install EB CLI**:
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB**:
   ```bash
   cd backend
   eb init
   ```

3. **Create Environment**:
   ```bash
   eb create moodmix-backend
   ```

4. **Set Environment Variables**:
   ```bash
   eb setenv OPENAI_API_KEY=your_key
   eb setenv SPOTIFY_CLIENT_ID=your_id
   eb setenv SPOTIFY_CLIENT_SECRET=your_secret
   ```

5. **Deploy**:
   ```bash
   eb deploy
   ```

## 🔧 Environment Configuration

### Frontend Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Backend Environment Variables

Create a `.env` file in the backend directory:

```env
OPENAI_API_KEY=your_openai_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
FIREBASE_SERVICE_ACCOUNT_KEY=firebase-config/serviceAccountKey.json
FLASK_ENV=production
PORT=5000
```

## 🔒 Security Considerations

### CORS Configuration

Update the backend CORS settings for production:

```python
# In backend/app.py
CORS(app, origins=[
    "https://your-frontend-domain.com",
    "https://www.your-frontend-domain.com"
])
```

### Firebase Security Rules

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /playlists/{playlistId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Environment Variables

- Never commit `.env` files to version control
- Use platform-specific environment variable management
- Rotate API keys regularly
- Use least privilege principle for service accounts

## 📊 Monitoring and Analytics

### Frontend Monitoring

1. **Error Tracking**: Integrate Sentry for error monitoring
2. **Analytics**: Add Google Analytics or similar
3. **Performance**: Monitor Core Web Vitals

### Backend Monitoring

1. **Logging**: Set up structured logging
2. **Health Checks**: Implement health check endpoints
3. **Metrics**: Monitor API response times and error rates

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy MoodMix

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
          working-directory: ./backend
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Check CORS configuration in backend
   - Verify frontend URL is in allowed origins

2. **Environment Variables**:
   - Ensure all variables are set correctly
   - Check for typos in variable names

3. **Firebase Issues**:
   - Verify Firebase project configuration
   - Check service account permissions

4. **API Rate Limits**:
   - Monitor OpenAI and Spotify API usage
   - Implement rate limiting if needed

### Performance Optimization

1. **Frontend**:
   - Enable code splitting
   - Optimize bundle size
   - Use CDN for static assets

2. **Backend**:
   - Implement caching
   - Optimize database queries
   - Use connection pooling

## 📞 Support

For deployment issues:

1. Check the platform-specific documentation
2. Review error logs
3. Test locally first
4. Use staging environment for testing

---

**Happy Deploying! 🚀** 