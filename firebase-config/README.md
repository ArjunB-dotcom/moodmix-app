# Firebase Configuration

This directory contains Firebase configuration files for the MoodMix application.

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "moodmix-app")
4. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Google" as a sign-in provider
5. Configure the OAuth consent screen if needed

### 3. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location for your database

### 4. Get Firebase Config

1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web"
4. Register your app and copy the config object

### 5. Get Service Account Key

1. In your Firebase project, go to "Project settings"
2. Go to the "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file and save it as `serviceAccountKey.json` in this directory

### 6. Update Environment Variables

#### Frontend (.env)
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

#### Backend (.env)
```env
FIREBASE_SERVICE_ACCOUNT_KEY=firebase-config/serviceAccountKey.json
```

## Security Rules

### Firestore Rules
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

### Authentication Rules
- Only allow Google sign-in
- Require email verification (optional)

## Important Notes

- Never commit the actual `serviceAccountKey.json` file to version control
- Add `firebase-config/serviceAccountKey.json` to your `.gitignore` file
- Keep your Firebase config keys secure
- Use environment variables for all sensitive data

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your Firebase project allows your domain
2. **Authentication Errors**: Check that Google sign-in is properly configured
3. **Firestore Permission Errors**: Verify your security rules are correct
4. **Service Account Errors**: Ensure the service account key is valid and has proper permissions 