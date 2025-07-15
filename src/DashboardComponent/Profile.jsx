import React from 'react';
import useAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import { Link } from 'react-router';

const Profile = () => {
    const { user } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return (
            <div className="flex justify-center items-center h-60">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl font-signikaText">
            <h2 className="text-2xl font-raleway text-[#263a88] mb-4">Welcome back, <span className="font-bold">{name || user?.displayName}</span></h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                    src={user.photoURL || user?.photoURL}
                    alt="User"
                    className="w-32 h-32 object-cover rounded-full border-4 border-[#d1dbff] shadow-md"
                />
                <div className="text-gray-700 text-[1rem] space-y-2">
                    <p><span className="font-semibold">Name:</span> {user?.displayName}</p>
                    <p><span className="font-semibold">Email:</span> {user?.email}</p>
                    <p><span className="font-semibold">Role:</span> <span className="capitalize">{role || 'traveller'}</span></p>

                    <div className="flex gap-4 mt-4">
                        <button className="px-4 py-2 bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white rounded-xl shadow font-semibold transition duration-200">
                            Edit Profile
                        </button>
                        <Link to="/dashboard/join-guide">
                            <button className="px-4 py-2 bg-[#f050a6] hover:bg-[#f050a6]/90 text-white rounded-xl shadow font-semibold transition duration-200">
                                Join as Tour Guide
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
