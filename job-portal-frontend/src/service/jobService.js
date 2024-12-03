import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

export const fetchJobs = () => axios.get(`${BASE_URL}/jobs`).then((res) => res.data);
export const createJob = (jobData) => axios.post(`${BASE_URL}/jobs`, jobData);
