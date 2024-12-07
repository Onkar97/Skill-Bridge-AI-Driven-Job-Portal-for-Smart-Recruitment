import axios from 'axios';

// Base URL for your API
const BASE_URL = 'http://localhost:8080';

// Create an Axios instance with default configuration
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Enable cookies with requests
});

export const fetchUserDetails = () =>
    api.get('/api/users/me').then((res) => res.data);