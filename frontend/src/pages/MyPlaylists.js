import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Music, 
  Clock, 
  Calendar, 
  Trash2, 
  ExternalLink,
  Heart,
  Search
} from 'lucide-react';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../App';
import toast from 'react-hot-toast';

const MyPlaylists = ({ user }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPlaylists();
  }, [user]);

  const fetchPlaylists = async () => {
    try {
      const playlistsRef = collection(db, 'playlists');
      const q = query(
        playlistsRef,
        where('userId', '==', user.uid),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const playlistsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setPlaylists(playlistsData);
    } catch (error) {
      console.error('Error fetching playlists:', error);
      toast.error('Failed to load playlists');
    } finally {
      setLoading(false);
    }
  };

  const deletePlaylist = async (playlistId) => {
    try {
      await deleteDoc(doc(db, 'playlists', playlistId));
      setPlaylists(prev => prev.filter(p => p.id !== playlistId));
      toast.success('Playlist deleted successfully');
    } catch (error) {
      console.error('Error deleting playlist:', error);
      toast.error('Failed to delete playlist');
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodEmoji = (mood) => {
    const moodLower = mood.toLowerCase();
    if (moodLower.includes('happy') || moodLower.includes('joy')) return '😊';
    if (moodLower.includes('sad') || moodLower.includes('melancholy')) return '😢';
    if (moodLower.includes('energetic') || moodLower.includes('pump')) return '⚡';
    if (moodLower.includes('chill') || moodLower.includes('relax')) return '😌';
    if (moodLower.includes('nostalgic') || moodLower.includes('memory')) return '🕰️';
    if (moodLower.includes('romantic') || moodLower.includes('love')) return '💕';
    if (moodLower.includes('angry') || moodLower.includes('rage')) return '😤';
    if (moodLower.includes('confident') || moodLower.includes('power')) return '💪';
    return '🎵';
  };

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.mood.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlist.moodDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Music className="w-12 h-12 text-white loading-spinner mx-auto mb-4" />
          <p className="text-white/80">Loading your playlists...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          My Playlists
        </h1>
        <p className="text-white/80 text-lg">
          Your personalized mood mixes, saved for whenever you need them
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
          <input
            type="text"
            placeholder="Search playlists by mood..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Playlists Grid */}
      {filteredPlaylists.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Music className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            {searchTerm ? 'No playlists found' : 'No playlists yet'}
          </h3>
          <p className="text-white/60">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'Create your first mood mix to get started!'
            }
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaylists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-xl hover:bg-white/5 transition-all duration-300"
            >
              {/* Playlist Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getMoodEmoji(playlist.mood)}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white truncate">
                      {playlist.mood}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {playlist.tracks?.length || 0} tracks
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => deletePlaylist(playlist.id)}
                  className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-white/80 text-sm mb-4 line-clamp-2">
                {playlist.moodDescription}
              </p>

              {/* Playlist Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-white/60 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{playlist.playlistLength} minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(playlist.timestamp)}</span>
                </div>
                {playlist.genres && playlist.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {playlist.genres.slice(0, 3).map((genre) => (
                      <span
                        key={genre}
                        className="px-2 py-1 bg-spotify-green/20 text-spotify-green text-xs rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                    {playlist.genres.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
                        +{playlist.genres.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Sample Tracks */}
              {playlist.tracks && playlist.tracks.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h4 className="text-white font-medium text-sm">Sample Tracks:</h4>
                  <div className="space-y-1">
                    {playlist.tracks.slice(0, 3).map((track, trackIndex) => (
                      <div key={trackIndex} className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {trackIndex + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white/80 text-xs truncate">{track.name}</p>
                          <p className="text-white/50 text-xs truncate">{track.artist}</p>
                        </div>
                      </div>
                    ))}
                    {playlist.tracks.length > 3 && (
                      <p className="text-white/40 text-xs">
                        +{playlist.tracks.length - 3} more tracks
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-spotify-green hover:bg-green-600 text-white rounded-lg font-medium transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>Regenerate</span>
                </button>
                <button className="flex items-center justify-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlaylists; 