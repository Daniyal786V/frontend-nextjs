'use client';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true, // Enables sending cookies with requests
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
