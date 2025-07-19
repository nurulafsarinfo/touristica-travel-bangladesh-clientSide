import React, { Component } from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Register from '../Pages/SignUPpage/Register';
import Forbidden from '../Components/Shared/Navbar/Forbidden';
import Login from '../Pages/SignUPpage/Login';
import DashboardLayout from '../Layouts/DashboardLayout';
import PrivateRoute from '../Routes/PrivateRoute';
import Profile from '../DashboardComponent/Profile/Profile';
import Dashboard from '../DashboardComponent/Dashboard';
import HomeLayout from '../Layouts/HomeLayout';
import PackageDetails from '../Pages/Home/PackageAndGuidTabs/PackageDetails';

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomeLayout,
            },
            {
                path: '/packages/:id',
                Component: PackageDetails,
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
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: '',
                Component: Dashboard
            },
            {
                path: 'profile',
                Component: Profile
            }
        ]
    }
])

export default router;