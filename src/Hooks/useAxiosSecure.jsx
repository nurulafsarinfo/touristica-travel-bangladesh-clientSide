import axios from 'axios';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'https://touristica-server-side.vercel.app',
    // baseURL: 'http://localhost:5000',
    // withCredentials: true,
})


const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    // axiosSecure.interceptors.request.use(
    //     config => {
    //         const token = user?.accessToken;
    //         if (token) {
    //             config.headers.Authorization = `Bearer ${token}`;
    //         }
    //         return config;
    //     }, error => {
    //         return Promise.reject(error);
    //     })

    axiosSecure.interceptors.request.use( (config) => {
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, (error) => {
        return Promise.reject(error);
    });




    axiosSecure.interceptors.response.use(res => {
        return res;
    }), error => {
        // console.log('inside res interceptor', error.status);
        const status = error.response?.status;
        if (status === 403) {
            navigate('/forbidden')
        }
        else if (status === 401) {
            logOut()
                .then(() => {
                   return navigate('/login')
                })
                .catch(() => { })
        }
        return Promise.reject(error);
    }


    return (axiosSecure)
};

export default useAxiosSecure;