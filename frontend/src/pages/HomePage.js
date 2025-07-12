import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Sparkles, Heart, Zap, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import MoodForm from '../components/MoodForm';
import PlaylistResult from '../components/PlaylistResult';
import { generatePlaylist } from '../services/api';

const HomePage = ({ user }) => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlaylist = async (formData) => {
    setLoading(true);
    try {
      const result = await generatePlaylist({
        ...formData,
        userId: user?.uid || null,
      });
      setPlaylist(result);
      toast.success('Playlist generated successfully! 🎵');
    } catch (error) {
      console.error('Error generating playlist:', error);
      toast.error('Failed to generate playlist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Music className="w-16 h-16 text-white mx-auto" />
            <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Discover Your Perfect
          <span className="block gradient-text">Mood Mix</span>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
          Let AI curate the perfect Spotify playlist based on your mood, 
          favorite genres, and musical preferences.
        </p>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 rounded-xl text-center"
          >
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Mood-Based</h3>
            <p className="text-white/70">AI analyzes your mood to create the perfect musical atmosphere</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6 rounded-xl text-center"
          >
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Instant Generation</h3>
            <p className="text-white/70">Get your personalized playlist in seconds with real Spotify tracks</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-xl text-center"
          >
            <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">Save & Share</h3>
            <p className="text-white/70">Save your favorite playlists and access them anytime</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Create Your Mood Mix
            </h2>
            <MoodForm onSubmit={handleGeneratePlaylist} loading={loading} />
          </motion.div>

          {/* Result Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Your Playlist
            </h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="relative">
                  <Music className="w-12 h-12 text-white loading-spinner mx-auto mb-4" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full loading-spinner"></div>
                  </div>
                </div>
                <p className="text-white/80">Crafting your perfect mood mix...</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                    <span>Analyzing your mood</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span>Searching for perfect tracks</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span>Curating your playlist</span>
                  </div>
                </div>
              </div>
            ) : playlist ? (
              <PlaylistResult playlist={playlist} user={user} />
            ) : (
              <div className="text-center py-12 text-white/60">
                <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Fill out the form to generate your personalized playlist</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating music notes background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="music-note absolute top-20 left-10 text-white/10 text-4xl">♪</div>
        <div className="music-note absolute top-40 right-20 text-white/10 text-2xl" style={{ animationDelay: '2s' }}>♫</div>
        <div className="music-note absolute bottom-40 left-20 text-white/10 text-3xl" style={{ animationDelay: '4s' }}>♬</div>
        <div className="music-note absolute bottom-20 right-10 text-white/10 text-xl" style={{ animationDelay: '1s' }}>♪</div>
        <div className="music-note absolute top-60 left-1/2 text-white/10 text-2xl" style={{ animationDelay: '3s' }}>♫</div>
      </div>
    </div>
  );
};

export default HomePage; 