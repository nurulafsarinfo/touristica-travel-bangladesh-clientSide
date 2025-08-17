import React, { Component } from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout';
import Register from '../Pages/SignUPpage/Register';
import Forbidden from '../Components/Shared/Forbidden';
import Login from '../Pages/SignUPpage/Login';
import DashboardLayout from '../Layouts/DashboardLayout';
import PrivateRoute from '../Routes/PrivateRoute';
import Profile from '../DashboardComponent/Profile/Profile';
import Dashboard from '../DashboardComponent/Dashboard';
import HomeLayout from '../Layouts/HomeLayout';
import PackageDetails from '../Pages/Home/PackageAndGuidTabs/PackageDetails';
import AllTrips from '../Components/AllTrips/AllTrips';
import GuideProfile from '../Components/Guides/GuideProfile';
import MyBookings from '../DashboardComponent/TouristComponent/MyBookings';
import Payment from '../DashboardComponent/TouristComponent/Payment/Payment';
import Add_Story from '../DashboardComponent/TouristComponent/Add_Story';
import ManageStories from '../DashboardComponent/TouristComponent/ManageStories/ManageStories';
import EditStory from '../DashboardComponent/TouristComponent/ManageStories/EditStory';
import MyAssignedTours from '../DashboardComponent/GuideComponent/MyAssignedTour';
import AddPackage from '../DashboardComponent/AdminComponent/AddPackage';
import ManageUsers from '../DashboardComponent/AdminComponent/ManageUsers';
import ManageCandidates from '../DashboardComponent/AdminComponent/ManageCandidates';
import AdminRoute from '../Routes/AdminRoute';
import Community from '../Pages/Community/Community';
import AboutUs from '../Pages/About Us/AboutUs';
import GuideRoute from '../Routes/GuideRoute';
import NotFoundPage from '../Components/NotFoundPage';

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
                element: <PrivateRoute><PackageDetails/></PrivateRoute>
            },
            {
                path: '/all-trips',
                Component: AllTrips,
            },
            {
                path: '/all-stories',
                Component: Community,
            },
            {
                path: '/about-us',
                Component: AboutUs,
            },
            {
                path: '/guides/:id',
                element: <PrivateRoute><GuideProfile/></PrivateRoute>
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
            },
            {
                path: '*',
                Component: NotFoundPage
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
                Component: Profile,
            },
            {
                path: 'bookings/:email',
                Component: MyBookings,
            },
            {
                path: 'payment/:id',
                Component: Payment,
            },
            {
                path: 'manage-stories',
                Component: ManageStories
            },
            {
                path: 'assigned-tours/:email',
                element: <GuideRoute><MyAssignedTours/></GuideRoute>
                
            },
            {
                path: 'edit-story/:id',
                Component: EditStory,
            },
            {
                path: 'add-Story',
                Component: Add_Story,
            },
            {
                path: 'add-package',
                element: <AdminRoute><AddPackage/></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUsers/></AdminRoute>,
            },
            {
                path: 'manage-candidates',
                Component: ManageCandidates,
                element: <AdminRoute><ManageCandidates/></AdminRoute>
            }
        ]
    }
])

export default router;