import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGuideRole = () => {
    const {user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: role = 'guide', isLoading: roleLoading, refetch } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !loading && !!user?.email,

        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data.role;
        }
    })
    
    return {role, roleLoading: loading || roleLoading, refetch}
};

export default useGuideRole;