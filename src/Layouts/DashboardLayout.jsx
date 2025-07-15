import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                className={`fixed md:static top-0 left-0 z-40 h-screen md:h-auto w-64 bg-white shadow-xl border-r border-[#0ea5e9] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0 transition-transform duration-200 ease-in-out`}
            >
                <div className="p-6 border-b border-[#0ea5e9] text-2xl font-logoText text-[#0ea5e9]">
                    Touristica
                </div>
                <nav className="p-4 space-y-2 font-raleway text-[1rem]">
                    <NavLink to={'/dashboard'} className={({ isActive }) =>
                        `block px-4 py-2 rounded transition-colors duration-200 ${isActive
                            ? 'bg-[#0ea5e9]/20 font-semibold'
                            : 'hover:bg-[#0ea5e9]/30'
                        }`
                    }>
                        Dashboard
                    </NavLink>

                    <NavLink to={'/tours'} className={({ isActive }) =>
                        `block px-4 py-2 rounded transition-colors duration-200 ${isActive
                            ? 'bg-[#0ea5e9]/20 font-semibold'
                            : 'hover:bg-[#0ea5e9]/30'
                        }`
                    }>
                        Tours
                    </NavLink>

                    <NavLink to={'/bookings'} className={({ isActive }) =>
                        `block px-4 py-2 rounded transition-colors duration-200 ${isActive
                            ? 'bg-[#0ea5e9]/20 font-semibold'
                            : 'hover:bg-[#0ea5e9]/30'
                        }`
                    }>
                        Bookings
                    </NavLink>

                    <NavLink to={'/users'} className={({ isActive }) =>
                        `block px-4 py-2 rounded transition-colors duration-200 ${isActive
                            ? 'bg-[#0ea5e9]/20 font-semibold'
                            : 'hover:bg-[#0ea5e9]/30'
                        }`
                    }>
                        Users
                    </NavLink>

                    <NavLink to={'/reviews'} className={({ isActive }) =>
                        `block px-4 py-2 rounded transition-colors duration-200 ${isActive
                            ? 'bg-[#0ea5e9]/20 font-semibold'
                            : 'hover:bg-[#0ea5e9]/30'
                        }`
                    }>
                        Reviews
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8">
                <header className="mb-6">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-raleway text-[#0ea5e9]">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-sm md:text-base text-[#263a88]/70">
                        Welcome to the{" "}
                        <span className="font-logoText text-[#f050a6]">Touristica</span> admin dashboard!
                    </p>
                </header>

                {/* Main Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Placeholder cards for future content */}
                    <div className="bg-white p-6 rounded-xl shadow-md border border-[#0ea5e9]/20">
                        <h2 className="text-lg font-raleway font-semibold text-[#0ea5e9]">Quick Overview</h2>
                        <p className="mt-2 text-sm text-[#263a88]/80">Analytics, reports, and summary go here.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-[#0ea5e9]/20">
                        <h2 className="text-lg font-raleway font-semibold text-[#0ea5e9]">Recent Activity</h2>
                        <p className="mt-2 text-sm text-[#263a88]/80">Track your recent user actions or logs.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-[#0ea5e9]/20">
                        <h2 className="text-lg font-raleway font-semibold text-[#0ea5e9]">Upcoming Tasks</h2>
                        <p className="mt-2 text-sm text-[#263a88]/80">Your pending approvals or reminders.</p>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DashboardLayout;

