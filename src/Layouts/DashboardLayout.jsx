import React, { useState } from 'react';
import {
    FaBars,
    FaTimes,
    FaUserCircle,
    FaPlusSquare,
    FaUsersCog,
    FaUserCheck,
    FaClipboardList,
    FaBookmark,
    FaFolderOpen,
    FaPenFancy
} from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import useUserRole from '../Hooks/useUserRole';
import useAuth from '../Hooks/useAuth';

const DashboardLayout = () => {
    const { user } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { role, roleLoading } = useUserRole();

    if (roleLoading) return <p className="text-center mt-10 text-lg">Loading...</p>;

    return (
        <div className="min-h-screen flex font-signikaText text-[#263a88] bg-[#d1dbff]">
            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden fixed top-4 right-4 z-50">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1 rounded-md bg-white/90 shadow-md"
                >
                    {sidebarOpen ? (
                        <FaTimes className="w-6 h-6 text-[#263a88]" />

                    ) : (
                        <FaBars className="w-6 h-6 text-[#263a88]" />
                    )}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed md:static top-0 left-0 z-40 h-screen md:h-auto w-64 bg-white shadow-xl border-r border-[#0ea5e9] overflow-y-auto transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-200 ease-in-out`}
            >
                <NavLink to={'/'}>
                    <div className="p-6 border-b border-[#0ea5e9] text-2xl font-logoText text-[#0ea5e9]">
                        Touristica
                    </div>
                </NavLink>

                <NavLink to="">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4">
                        <img
                            src={user?.photoURL}
                            alt="user"
                            className="w-12 h-12 rounded-full object-cover shadow"
                        />
                        <div>
                            <p className="text-base font-raleway font-semibold">{user?.displayName}</p>
                            <p className="text-sm text-gray-500 capitalize">{role || 'Traveller'}</p>
                        </div>
                    </div>
                </NavLink>

                <nav className="p-4 space-y-2 font-raleway text-[1rem]">
                    <NavLink to="/dashboard/profile" className={({ isActive }) =>
                        `px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${isActive
                            ? 'bg-[#0ea5e9]/20 font-semibold'
                            : 'hover:bg-[#0ea5e9]/30'}`
                    }>
                        <FaUserCircle /> Profile
                    </NavLink>

                    {role === 'admin' && (
                        <>
                            <NavLink to="/dashboard/add-package" className={({ isActive }) =>
                                ` px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${isActive
                                    ? 'bg-[#0ea5e9]/20 font-semibold'
                                    : 'hover:bg-[#0ea5e9]/30'}`
                            }>
                                <FaPlusSquare /> Add Packages
                            </NavLink>

                            <NavLink to="/dashboard/manage-users" className={({ isActive }) =>
                                `px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${isActive
                                    ? 'bg-[#0ea5e9]/20 font-semibold'
                                    : 'hover:bg-[#0ea5e9]/30'}`
                            }>
                                <FaUsersCog /> Manage Users
                            </NavLink>

                            <NavLink to="/dashboard/manage-candidates" className={({ isActive }) =>
                                `px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${isActive
                                    ? 'bg-[#0ea5e9]/20 font-semibold'
                                    : 'hover:bg-[#0ea5e9]/30'}`
                            }>
                                <FaUserCheck /> Manage Candidates
                            </NavLink>
                        </>
                    )}

                    {role === 'guide' || role !== 'admin' ? (
                        <NavLink to={`/dashboard/assigned-tours/${user.email}`} className={({ isActive }) =>
                            `px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${isActive
                                ? 'bg-[#0ea5e9]/20 font-semibold'
                                : 'hover:bg-[#0ea5e9]/30'}`
                        }>
                            <FaClipboardList /> My Assigned Tours
                        </NavLink>
                    ) : (
                        <NavLink to={`/dashboard/bookings/${user.email}`} className={({ isActive }) =>
                            `px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${isActive
                                ? 'bg-[#0ea5e9]/20 font-semibold'
                                : 'hover:bg-[#0ea5e9]/30'}`
                        }>
                            <FaBookmark /> My Bookings
                        </NavLink>
                    )}

                    <NavLink to="/dashboard/manage-stories" className={({ isActive }) =>
                        `px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${isActive
                            ? 'bg-[#0ea5e9]/20 font-semibold'
                            : 'hover:bg-[#0ea5e9]/30'}`
                    }>
                        <FaFolderOpen /> Manage Stories
                    </NavLink>

                    <NavLink to="/dashboard/add-Story" className={({ isActive }) =>
                        `px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${isActive
                            ? 'bg-[#0ea5e9]/20 font-semibold'
                            : 'hover:bg-[#0ea5e9]/30'}`
                    }>
                        <FaPenFancy /> Add Stories
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
