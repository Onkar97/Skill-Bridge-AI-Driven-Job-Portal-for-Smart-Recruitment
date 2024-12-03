import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Update with your backend URL

export const createJobApplication = async (formData) => {
    return axios.post(`${BASE_URL}/api/job-applications`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};