// frontend/src/api.js
import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    withCredentials: true // Important for sessions
});

export default api;