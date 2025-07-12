import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Music, Heart, Zap } from 'lucide-react';

const MoodForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    mood: '',
    favoriteSong: '',
    genres: [],
    vibeLevel: 5,
    playlistLength: 30,
  });

  const genreOptions = [
    'Pop', 'Rock', 'Hip Hop', 'R&B', 'Electronic', 'Jazz', 'Classical',
    'Country', 'Folk', 'Indie', 'Alternative', 'Metal', 'Punk', 'Blues',
    'Reggae', 'Latin', 'K-pop', 'J-pop', 'Ambient', 'Lo-fi'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.mood.trim()) {
      return;
    }
    onSubmit(formData);
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

  const getVibeLabel = (level) => {
    if (level <= 2) return 'Very Chill';
    if (level <= 4) return 'Chill';
    if (level <= 6) return 'Balanced';
    if (level <= 8) return 'Energetic';
    return 'Intense';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mood Input */}
      <div>
        <label className="block text-white font-medium mb-2">
          <Sparkles className="w-4 h-4 inline mr-2" />
          How are you feeling today?
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.mood}
            onChange={(e) => handleInputChange('mood', e.target.value)}
            placeholder="e.g., nostalgic but energized, chill and contemplative..."
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
            required
          />
          {formData.mood && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl">
              {getMoodEmoji(formData.mood)}
            </span>
          )}
        </div>
        <p className="text-white/60 text-sm mt-1">
          Describe your mood in detail for better playlist curation
        </p>
      </div>

      {/* Favorite Song */}
      <div>
        <label className="block text-white font-medium mb-2">
          <Heart className="w-4 h-4 inline mr-2" />
          Favorite Song (Optional)
        </label>
        <input
          type="text"
          value={formData.favoriteSong}
          onChange={(e) => handleInputChange('favoriteSong', e.target.value)}
          placeholder="e.g., Bohemian Rhapsody by Queen"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-spotify-green focus:border-transparent"
        />
        <p className="text-white/60 text-sm mt-1">
          We'll find similar songs to include in your playlist
        </p>
      </div>

      {/* Genre Selection */}
      <div>
        <label className="block text-white font-medium mb-2">
          <Music className="w-4 h-4 inline mr-2" />
          Favorite Genres
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
          {genreOptions.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => handleGenreToggle(genre)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                formData.genres.includes(genre)
                  ? 'bg-spotify-green text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
        <p className="text-white/60 text-sm mt-1">
          Select multiple genres or leave empty for variety
        </p>
      </div>

      {/* Vibe Slider */}
      <div>
        <label className="block text-white font-medium mb-2">
          <Zap className="w-4 h-4 inline mr-2" />
          Energy Level: {getVibeLabel(formData.vibeLevel)}
        </label>
        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={formData.vibeLevel}
            onChange={(e) => handleInputChange('vibeLevel', parseInt(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-white/60 text-xs mt-1">
            <span>Chill</span>
            <span>Balanced</span>
            <span>Intense</span>
          </div>
        </div>
      </div>

      {/* Playlist Length */}
      <div>
        <label className="block text-white font-medium mb-2">
          Playlist Duration
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[15, 30, 60].map((length) => (
            <button
              key={length}
              type="button"
              onClick={() => handleInputChange('playlistLength', length)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                formData.playlistLength === length
                  ? 'bg-spotify-green text-white'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {length} min
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading || !formData.mood.trim()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all ${
          loading || !formData.mood.trim()
            ? 'bg-gray-500 cursor-not-allowed'
            : 'bg-spotify-green hover:bg-green-600 pulse-glow'
        } text-white flex items-center justify-center space-x-2`}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full loading-spinner"></div>
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Generate Playlist</span>
          </>
        )}
      </motion.button>
    </form>
  );
};

export default MoodForm; 