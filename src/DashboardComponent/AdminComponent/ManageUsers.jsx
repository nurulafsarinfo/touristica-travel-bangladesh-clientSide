import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Select from 'react-select';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

// Debounce hook to delay API calls while typing
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState({ value: 'all', label: 'All Roles' });
    
    const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

    const roleOptions = [
        { value: 'all', label: 'All Roles' },
        { value: 'tourist', label: 'Tourist' },
        { value: 'guide', label: 'Guide' },
        { value: 'admin', label: 'Admin' },
    ];

    // Fetch users based on search and filter
    const { data: users = [], isLoading,  } = useQuery({
        queryKey: ['users', debouncedSearchTerm, roleFilter.value],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                params: {
                    search: debouncedSearchTerm,
                    role: roleFilter.value,
                }
            });
            return res.data;
        }
    });

    // Mutation to update user role
    const { mutate: updateUserRole } = useMutation({
        mutationFn: async ({ userId, newRole }) => {
            return await axiosSecure.patch(`/users/role/${userId}`, { newRole });
        },
        onSuccess: () => {
            Swal.fire('Success!', 'User role has been updated.', 'success');
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to update user role.', 'error');
        }
    });

    const handleRoleChange = (userId, newRole) => {
        updateUserRole({ userId, newRole });
    };

    return (
        <div className="bg-gray-50 p-4 sm:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>

                {/* Filters and Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="input input-bordered w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <Select
                            options={roleOptions}
                            value={roleFilter}
                            onChange={setRoleFilter}
                            classNamePrefix="react-select"
                            placeholder="Filter by role..."
                        />
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="5" className="text-center p-4">Loading users...</td></tr>
                            ) : (
                                users.map((user, index) => (
                                    <tr key={user._id} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${
                                                user.role === 'admin' ? 'badge-primary' :
                                                user.role === 'guide' ? 'badge-secondary' : 'badge-ghost'
                                            }`}>
                                                {user.role || 'traveller'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown dropdown-left">
                                                <button tabIndex={0} className="btn btn-sm btn-outline">Change Role</button>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li><a onClick={() => handleRoleChange(user._id, 'tourist')}>Make Tourist</a></li>
                                                    <li><a onClick={() => handleRoleChange(user._id, 'guide')}>Make Guide</a></li>
                                                    <li><a onClick={() => handleRoleChange(user._id, 'admin')}>Make Admin</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
