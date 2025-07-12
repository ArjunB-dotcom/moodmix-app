from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import openai
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv
import logging
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Initialize OpenAI
openai.api_key = os.getenv('OPENAI_API_KEY')

# Initialize Spotify
spotify_client_id = os.getenv('SPOTIFY_CLIENT_ID')
spotify_client_secret = os.getenv('SPOTIFY_CLIENT_SECRET')
spotify_credentials_manager = SpotifyClientCredentials(
    client_id=spotify_client_id,
    client_secret=spotify_client_secret
)
spotify = spotipy.Spotify(client_credentials_manager=spotify_credentials_manager)

# Initialize Firebase
try:
    cred = credentials.Certificate('firebase-config/serviceAccountKey.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    logger.info("Firebase initialized successfully")
except Exception as e:
    logger.error(f"Firebase initialization failed: {e}")
    db = None

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'MoodMix API is running'})

@app.route('/api/generate-playlist', methods=['POST'])
def generate_playlist():
    """Generate a playlist based on mood and preferences"""
    try:
        data = request.get_json()
        
        # Extract form data
        mood = data.get('mood', '')
        favorite_song = data.get('favoriteSong', '')
        genres = data.get('genres', [])
        vibe_level = data.get('vibeLevel', 5)  # 1-10 scale
        playlist_length = data.get('playlistLength', 30)  # minutes
        user_id = data.get('userId', None)
        
        if not mood:
            return jsonify({'error': 'Mood is required'}), 400
        
        # Step 1: Generate mood description and playlist concept using AI
        mood_description = generate_mood_description(mood, genres, vibe_level)
        playlist_concept = generate_playlist_concept(mood, genres, favorite_song, vibe_level)
        
        # Step 2: Search for tracks based on the concept
        tracks = search_tracks(playlist_concept, genres, favorite_song, playlist_length)
        
        # Step 3: Create playlist response
        playlist_data = {
            'mood': mood,
            'moodDescription': mood_description,
            'playlistConcept': playlist_concept,
            'tracks': tracks,
            'playlistLength': playlist_length,
            'vibeLevel': vibe_level,
            'genres': genres,
            'favoriteSong': favorite_song,
            'timestamp': datetime.now().isoformat(),
            'userId': user_id
        }
        
        # Step 4: Save to Firebase if user is authenticated
        if user_id and db:
            save_playlist_to_firebase(playlist_data)
        
        return jsonify(playlist_data)
        
    except Exception as e:
        logger.error(f"Error generating playlist: {e}")
        return jsonify({'error': 'Failed to generate playlist'}), 500

def generate_mood_description(mood, genres, vibe_level):
    """Generate a description of the mood using OpenAI"""
    try:
        vibe_text = "chill and relaxed" if vibe_level <= 3 else "moderate energy" if vibe_level <= 7 else "high energy and intense"
        
        prompt = f"""
        Analyze this mood and create a short, engaging description (2-3 sentences):
        
        Mood: {mood}
        Genres: {', '.join(genres) if genres else 'Any genre'}
        Energy Level: {vibe_text} (level {vibe_level}/10)
        
        Create a description that captures the emotional essence and musical vibe.
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a music expert who creates engaging mood descriptions for playlists."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )
        
        return response.choices[0].message.content.strip()
        
    except Exception as e:
        logger.error(f"Error generating mood description: {e}")
        return f"A {mood} playlist with {', '.join(genres) if genres else 'diverse'} music"

def generate_playlist_concept(mood, genres, favorite_song, vibe_level):
    """Generate a playlist concept for Spotify search"""
    try:
        vibe_keywords = {
            1: "ambient, chill, lo-fi, peaceful",
            2: "relaxing, smooth, gentle, calm",
            3: "easy listening, soft, mellow",
            4: "laid-back, groovy, soulful",
            5: "balanced, melodic, rhythmic",
            6: "upbeat, energetic, dynamic",
            7: "powerful, driving, intense",
            8: "high energy, fast-paced, electrifying",
            9: "explosive, aggressive, adrenaline",
            10: "extreme, chaotic, overwhelming"
        }
        
        vibe_text = vibe_keywords.get(vibe_level, "energetic")
        genre_text = f"genre:{', '.join(genres)}" if genres else ""
        song_text = f"similar to {favorite_song}" if favorite_song else ""
        
        prompt = f"""
        Create a Spotify search query to find tracks that match this mood:
        
        Mood: {mood}
        Genres: {genre_text}
        Favorite Song: {song_text}
        Energy Level: {vibe_text}
        
        Return only the search terms, no explanations. Focus on mood keywords, emotions, and musical characteristics.
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a music expert who creates effective Spotify search queries."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100,
            temperature=0.8
        )
        
        return response.choices[0].message.content.strip()
        
    except Exception as e:
        logger.error(f"Error generating playlist concept: {e}")
        return f"{mood} {', '.join(genres) if genres else 'music'}"

def search_tracks(concept, genres, favorite_song, playlist_length):
    """Search for tracks using Spotify API"""
    try:
        tracks = []
        target_tracks = max(10, playlist_length // 3)  # Roughly 3 minutes per track
        
        # Search by concept
        search_results = spotify.search(q=concept, type='track', limit=target_tracks)
        
        for track in search_results['tracks']['items']:
            track_info = {
                'id': track['id'],
                'name': track['name'],
                'artist': track['artists'][0]['name'],
                'album': track['album']['name'],
                'albumCover': track['album']['images'][0]['url'] if track['album']['images'] else None,
                'spotifyUrl': track['external_urls']['spotify'],
                'duration': track['duration_ms'],
                'previewUrl': track['preview_url']
            }
            tracks.append(track_info)
        
        # If we have a favorite song, try to find similar tracks
        if favorite_song and len(tracks) < target_tracks:
            try:
                similar_results = spotify.search(q=favorite_song, type='track', limit=5)
                if similar_results['tracks']['items']:
                    # Get audio features for the first result
                    track_id = similar_results['tracks']['items'][0]['id']
                    recommendations = spotify.recommendations(
                        seed_tracks=[track_id],
                        limit=min(5, target_tracks - len(tracks))
                    )
                    
                    for track in recommendations['tracks']:
                        if track['id'] not in [t['id'] for t in tracks]:
                            track_info = {
                                'id': track['id'],
                                'name': track['name'],
                                'artist': track['artists'][0]['name'],
                                'album': track['album']['name'],
                                'albumCover': track['album']['images'][0]['url'] if track['album']['images'] else None,
                                'spotifyUrl': track['external_urls']['spotify'],
                                'duration': track['duration_ms'],
                                'previewUrl': track['preview_url']
                            }
                            tracks.append(track_info)
            except Exception as e:
                logger.error(f"Error finding similar tracks: {e}")
        
        return tracks[:target_tracks]
        
    except Exception as e:
        logger.error(f"Error searching tracks: {e}")
        return []

def save_playlist_to_firebase(playlist_data):
    """Save playlist to Firebase Firestore"""
    try:
        if not db:
            return
        
        # Remove sensitive data before saving
        save_data = {
            'mood': playlist_data['mood'],
            'moodDescription': playlist_data['moodDescription'],
            'playlistConcept': playlist_data['playlistConcept'],
            'tracks': playlist_data['tracks'],
            'playlistLength': playlist_data['playlistLength'],
            'vibeLevel': playlist_data['vibeLevel'],
            'genres': playlist_data['genres'],
            'favoriteSong': playlist_data['favoriteSong'],
            'timestamp': playlist_data['timestamp'],
            'userId': playlist_data['userId']
        }
        
        db.collection('playlists').add(save_data)
        logger.info(f"Playlist saved to Firebase for user {playlist_data['userId']}")
        
    except Exception as e:
        logger.error(f"Error saving playlist to Firebase: {e}")

@app.route('/api/playlists/<user_id>', methods=['GET'])
def get_user_playlists(user_id):
    """Get all playlists for a specific user"""
    try:
        if not db:
            return jsonify({'error': 'Database not available'}), 500
        
        playlists_ref = db.collection('playlists').where('userId', '==', user_id).order_by('timestamp', direction=firestore.Query.DESCENDING)
        playlists = []
        
        for doc in playlists_ref.stream():
            playlist_data = doc.to_dict()
            playlist_data['id'] = doc.id
            playlists.append(playlist_data)
        
        return jsonify(playlists)
        
    except Exception as e:
        logger.error(f"Error fetching playlists: {e}")
        return jsonify({'error': 'Failed to fetch playlists'}), 500

@app.route('/api/playlists/<playlist_id>', methods=['DELETE'])
def delete_playlist(playlist_id):
    """Delete a specific playlist"""
    try:
        if not db:
            return jsonify({'error': 'Database not available'}), 500
        
        db.collection('playlists').document(playlist_id).delete()
        return jsonify({'message': 'Playlist deleted successfully'})
        
    except Exception as e:
        logger.error(f"Error deleting playlist: {e}")
        return jsonify({'error': 'Failed to delete playlist'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 