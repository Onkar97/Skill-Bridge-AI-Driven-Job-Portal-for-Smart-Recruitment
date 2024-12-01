import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const fetchNotifications = () => axios.get(`${BASE_URL}/notifications`).then((res) => res.data);


