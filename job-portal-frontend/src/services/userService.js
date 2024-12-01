import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const fetchUserDetails = () => axios.get(`${BASE_URL}/users/me`).then((res) => res.data);