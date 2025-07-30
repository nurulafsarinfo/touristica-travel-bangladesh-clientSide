import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import useUserRole from '../Hooks/useUserRole';

const GuideRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <span className='loading loading-spinner loading-xl'></span>
    }

    if (!user || role !== 'guide') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden" />
    }

    return children
};

export default GuideRoute;