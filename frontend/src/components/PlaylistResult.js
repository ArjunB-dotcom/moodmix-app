import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Heart, 
  ExternalLink, 
  Clock, 
  Music, 
  Share2, 
  Copy,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const PlaylistResult = ({ playlist, user }) => {
  const [copied, setCopied] = useState(false);

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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

  const copyPlaylistInfo = async () => {
    const playlistInfo = `🎵 MoodMix Playlist: ${playlist.mood}\n\n${playlist.moodDescription}\n\nTracks:\n${playlist.tracks.map((track, index) => `${index + 1}. ${track.name} - ${track.artist}`).join('\n')}`;
    
    try {
      await navigator.clipboard.writeText(playlistInfo);
      setCopied(true);
      toast.success('Playlist info copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy playlist info');
    }
  };

  const sharePlaylist = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MoodMix: ${playlist.mood}`,
          text: playlist.moodDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      copyPlaylistInfo();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Playlist Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className="text-3xl">{getMoodEmoji(playlist.mood)}</span>
          <h3 className="text-xl font-bold text-white">{playlist.mood}</h3>
        </div>
        <p className="text-white/80 mb-4">{playlist.moodDescription}</p>
        
        {/* Playlist Stats */}
        <div className="flex items-center justify-center space-x-6 text-white/60 text-sm">
          <div className="flex items-center space-x-1">
            <Music className="w-4 h-4" />
            <span>{playlist.tracks.length} tracks</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{playlist.playlistLength} min</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sharePlaylist}
          className="flex items-center space-x-2 px-4 py-2 bg-spotify-green hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyPlaylistInfo}
          className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Info</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Tracks List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {playlist.tracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-4 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center space-x-4">
              {/* Track Number */}
              <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              
              {/* Album Cover */}
              {track.albumCover && (
                <img
                  src={track.albumCover}
                  alt={track.album}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              
              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{track.name}</h4>
                <p className="text-white/60 text-sm truncate">{track.artist}</p>
                <p className="text-white/40 text-xs truncate">{track.album}</p>
              </div>
              
              {/* Duration */}
              <div className="text-white/60 text-sm">
                {formatDuration(track.duration)}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {track.previewUrl && (
                  <button
                    onClick={() => {
                      const audio = new Audio(track.previewUrl);
                      audio.play();
                    }}
                    className="p-2 bg-spotify-green hover:bg-green-600 rounded-full transition-colors"
                  >
                    <Play className="w-4 h-4 text-white" />
                  </button>
                )}
                
                <a
                  href={track.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Spotify Integration Note */}
      <div className="text-center text-white/60 text-sm">
        <p>
          💡 Want to save this playlist to your Spotify? 
          {user ? (
            <span className="text-spotify-green"> Sign in with Spotify to enable this feature!</span>
          ) : (
            <span className="text-spotify-green"> Sign in to enable Spotify integration!</span>
          )}
        </p>
      </div>
    </motion.div>
  );
};

export default PlaylistResult; 