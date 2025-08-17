import React from 'react';

const Dashboard = () => {
    return (
        <div className='min-h-screen'>
            <header className="mb-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-raleway text-[#0ea5e9]">
                    Dashboard
                </h1>
                <p className="mt-2 text-sm md:text-base text-[#263a88]/70">
                    Welcome to the
                    <span className="font-logoText text-[#f050a6]">Touristica</span> dashboard!
                </p>
            </header>

            {/* Placeholder Cards or Nested Routes */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
        </div>
    );
};

export default Dashboard;