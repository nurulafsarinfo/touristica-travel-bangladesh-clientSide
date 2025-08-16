import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../Components/Shared/LoadingSpinner';

const PrivateRoute = ({children}) => {
   const {user, loading} = useAuth();
    const location = useLocation();

    if(loading){
        return <LoadingSpinner/>
    }

    if(!user){
        return <Navigate state={{from: location.pathname}} to={'/login'}></Navigate>
    }



    return children
};

export default PrivateRoute;