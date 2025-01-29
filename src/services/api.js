import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://voxleads-api-dot-voxleads-api-stg-bv7a.uc.r.appspot.com/api/v1',
    baseURL: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:8000/api/v1' 
        : 'https://voxleads-api-dot-voxleads-api-stg-bv7a.uc.r.appspot.com/api/v1',
    headers: {
        // Add this to prevent caching issues
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': 'Basic ' + btoa('api:true')
    },
    validateStatus: (status) => {
        console.log('Response status:', status);
        return status >= 200 && status < 300;
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'An error occurred';
        console.error('API Error:', error.response?.data || message);

        throw error;
    }
);


export default api;

