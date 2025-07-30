import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useUserRole from '../../Hooks/useUserRole';
import { Link } from 'react-router';
import EditProfileModal from './EditProfileModal';
import toast from 'react-hot-toast';

import { Toaster } from 'react-hot-toast'
import JoinGuideModal from './JoinAsGuid';

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';



const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    // console.log('data updated', user);
    const { role, roleLoading } = useUserRole();
    const [isModalOpen, setIsModalOpen] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [updatedName, setUpdatedName] = useState('');
    const [isJoinGuidModalOpen, setIsJoinGuideModalOpen] = useState(false);




    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['adminStats'],
        enabled: role === 'admin',
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats');
            return res.data;
        },
    });

    // console.log(stats)


    const handleSave = (updatedData) => {

        updateUserProfile(updatedData)
            .then(async () => {
                setUpdatedName(updatedData);
                // console.log('profile updaaaaaat', updatedData)
                toast.success('✅ Profile updated!');
            })
            .catch((error) => {
                toast.error(`❌ Failed to update profile: ${error.message}`);
            })


    }

    <Toaster position='top-right' reverseOrder={false} />

    if (roleLoading) {
        return (
            <div className="flex justify-center items-center h-60">
                <span className="loading loading-spinner text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-xl rounded-2xl font-signikaText">
            <h2 className="text-2xl font-raleway text-[#263a88] mb-4">Welcome back, <span className="font-bold">{user?.displayName}</span></h2>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-32 h-32 object-cover rounded-full border-4 border-[#d1dbff] shadow-md"
                />
                <div className="text-gray-700 text-[1rem] space-y-2">
                    <p><span className="font-semibold">Name:</span> {user?.displayName}</p>
                    <p><span className="font-semibold">Email:</span> {user?.email}</p>
                    <p><span className="font-semibold">Role:</span> <span className="capitalize">{role || 'traveller'}</span></p>

                    <div className="flex gap-4 mt-4">
                        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white rounded-xl shadow font-semibold transition duration-200">
                            Edit Profile
                        </button>
                        {
                            role === 'guide' || role === 'admin' ? '' :
                                <button onClick={() => setIsJoinGuideModalOpen(true)} className="px-4 py-2 bg-[#f050a6] hover:bg-[#f050a6]/90 text-white rounded-xl shadow font-semibold transition duration-200">
                                    Join as Tour Guide
                                </button>
                        }
                    </div>

                    {/* Edit profil modal  */}
                    <EditProfileModal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        userData={{
                            name: user.displayName,
                            photoURL: user.photoURL,
                            email: user.email,
                            role,
                        }}
                        onSave={handleSave}
                    >

                    </EditProfileModal>

                    {/* Join guide modal  */}
                    <JoinGuideModal
                        isOpen={isJoinGuidModalOpen}
                        onRequestClose={() => setIsJoinGuideModalOpen(false)}
                    >

                    </JoinGuideModal>

                </div>
            </div>

            {
                statsLoading && <p>States Loading...</p>
            }
            {role === 'admin' && (
                <div className="mt-8 bg-[#f9f9f9] p-6 rounded-lg shadow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                    <div className="bg-white rounded-xl p-4 shadow-md border">
                        <h4 className="text-lg font-semibold text-[#263a88]">Total Payments</h4>
                        <p className="text-xl font-bold text-green-600">{stats.totalPayments} ৳</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border">
                        <h4 className="text-lg font-semibold text-[#263a88]">Total Tour Guides</h4>
                        <p className="text-xl font-bold">{stats.totalGuides}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border">
                        <h4 className="text-lg font-semibold text-[#263a88]">Total Clients</h4>
                        <p className="text-xl font-bold">{stats.totalClients}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border">
                        <h4 className="text-lg font-semibold text-[#263a88]">Total Packages</h4>
                        <p className="text-xl font-bold">{stats.totalPackages}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-md border col-span-1 sm:col-span-2 lg:col-span-1">
                        <h4 className="text-lg font-semibold text-[#263a88]">Total Stories</h4>
                        <p className="text-xl font-bold">{stats.totalStories}</p>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Profile;
