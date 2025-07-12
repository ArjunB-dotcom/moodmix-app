import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Network error occurred');
  }
);

// API functions
export const generatePlaylist = async (playlistData) => {
  try {
    const response = await api.post('/api/generate-playlist', playlistData);
    return response;
  } catch (error) {
    console.error('Error generating playlist:', error);
    throw error;
  }
};

export const getUserPlaylists = async (userId) => {
  try {
    const response = await api.get(`/api/playlists/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching user playlists:', error);
    throw error;
  }
};

export const deletePlaylist = async (playlistId) => {
  try {
    const response = await api.delete(`/api/playlists/${playlistId}`);
    return response;
  } catch (error) {
    console.error('Error deleting playlist:', error);
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/api/health');
    return response;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default api; 