import React, { Component } from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Bannner from '../Pages/Home/Banner/Bannner';
import Register from '../Pages/SignUPpage/Register';
import Forbidden from '../Components/Shared/Navbar/Forbidden';
import Login from '../Pages/SignUPpage/Login';

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Bannner,
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/forbidden',
                Component: Forbidden
            }
        ]
    }
])

export default router;