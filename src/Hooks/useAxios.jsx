import axios from 'axios';
import React from 'react';

const axiosSecure = axios.create({
    baseURL: 'https://touristica-server-side.vercel.app',
    withCredentials: true,
})

const useAxios = () => {
    return axiosSecure;
};

export default useAxios;