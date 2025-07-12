# 🎧 MoodMix - AI-Powered Spotify Playlist Generator

MoodMix is a web application that uses AI to curate personalized Spotify playlists based on your mood and music preferences.

## 🚀 Features

- **AI-Powered Playlist Generation**: Uses OpenAI/Claude to analyze mood and create playlist concepts
- **Spotify Integration**: Fetches real tracks from Spotify API based on mood and preferences
- **Firebase Authentication**: Secure user login with Google Sign-In
- **Playlist History**: Save and view your generated playlists
- **Responsive Design**: Beautiful, mobile-friendly interface
- **Real-time Generation**: Live playlist creation with loading animations

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python 3.8+ (for backend)
- Spotify Developer Account
- OpenAI API Key
- Firebase Project

## 🔧 Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

### 2. Environment Variables

Create `.env` files in both frontend and backend directories:

#### Frontend (.env)
```env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_BACKEND_URL=http://localhost:5000
```

#### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
FIREBASE_SERVICE_ACCOUNT_KEY=path_to_service_account.json
```

### 3. API Setup

#### Spotify API
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Get your Client ID and Client Secret
4. Add `http://localhost:3000/callback` to Redirect URIs

#### OpenAI API
1. Sign up at [OpenAI](https://openai.com)
2. Get your API key from the dashboard

#### Firebase
1. Create a new Firebase project
2. Enable Authentication (Google Sign-In)
3. Enable Firestore Database
4. Download service account key
5. Get your Firebase config

### 4. Running the Application

```bash
# Start backend (Terminal 1)
cd backend
python app.py

# Start frontend (Terminal 2)
cd frontend
npm start
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🏗️ Project Structure

```
moodmix/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── public/             # Static files
│   └── package.json
├── backend/                 # Flask API
│   ├── app.py              # Main Flask application
│   ├── services/           # Business logic
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── firebase-config/        # Firebase configuration
│   └── serviceAccountKey.json
└── README.md
```

## 🎨 Features in Detail

### Frontend
- **Mood Input Form**: Text input for mood description
- **Genre Selection**: Multi-select dropdown for favorite genres
- **Vibe Slider**: Interactive slider from "chill" to "intense"
- **Playlist Length**: Options for 15, 30, or 60 minutes
- **Real-time Generation**: Loading animations and progress indicators
- **Playlist Display**: Embedded Spotify player with track information
- **User Authentication**: Google Sign-In integration
- **Playlist History**: View and manage saved playlists

### Backend
- **AI Integration**: OpenAI/Claude API for mood analysis
- **Spotify API**: Track search and playlist creation
- **Firebase Integration**: User authentication and data storage
- **RESTful API**: Clean endpoints for frontend communication

## 🔒 Security

- Environment variables for sensitive data
- Firebase Authentication for user management
- CORS configuration for secure API communication
- Input validation and sanitization

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy build folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Add Procfile and runtime.txt
# Deploy to your preferred platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Happy listening! 🎵** 