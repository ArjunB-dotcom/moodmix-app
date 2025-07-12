import React from 'react';
import { Music } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="text-center">
        <div className="relative">
          <Music className="w-16 h-16 text-white loading-spinner mx-auto mb-4" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full loading-spinner"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">MoodMix</h2>
        <p className="text-white/80">Loading your musical journey...</p>
        
        {/* Floating music notes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="music-note absolute top-1/4 left-1/4 text-white/20 text-2xl">♪</div>
          <div className="music-note absolute top-1/3 right-1/4 text-white/20 text-xl" style={{ animationDelay: '1s' }}>♫</div>
          <div className="music-note absolute bottom-1/4 left-1/3 text-white/20 text-3xl" style={{ animationDelay: '2s' }}>♬</div>
          <div className="music-note absolute bottom-1/3 right-1/3 text-white/20 text-lg" style={{ animationDelay: '0.5s' }}>♪</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 