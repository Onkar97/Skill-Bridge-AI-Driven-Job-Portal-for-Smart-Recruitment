import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const createJobApplication = (applicationData) =>
    axios.post(`${BASE_URL}/job-applications`, applicationData);