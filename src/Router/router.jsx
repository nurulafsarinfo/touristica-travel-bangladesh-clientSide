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
import AllStory from '../Pages/AllStory/AllStory';
import MyAssignedTours from '../DashboardComponent/GuideComponent/MyAssignedTour';
import AddPackage from '../DashboardComponent/AdminComponent/AddPackage';
import ManageUsers from '../DashboardComponent/AdminComponent/ManageUsers';
import ManageCandidates from '../DashboardComponent/AdminComponent/ManageCandidates';

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
                path: '/all-trips',
                Component: AllTrips,
            },
            {
                path: '/all-stories',
                Component: AllStory,
            },
            {
                path: '/guides/:id',
                Component: GuideProfile,
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
                Component: MyAssignedTours,
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
                Component: AddPackage
            },
            {
                path: 'manage-users',
                Component: ManageUsers,
            },
            {
                path: 'manage-candidates',
                Component: ManageCandidates,
            }
        ]
    }
])

export default router;