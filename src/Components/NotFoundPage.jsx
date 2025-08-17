// src/Pages/NotFoundPage.js

import React from 'react';
import { Link } from 'react-router';
import { HiArrowLeft } from 'react-icons/hi'; // Optional: for a nice back icon

const NotFoundPage = () => {
    return (
        // Main container to center the content
        <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                {/* The "404" text */}
                <h1 className="text-9xl font-black text-gray-800 tracking-wider">404</h1>

                {/* The "Page Not Found" heading */}
                <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-gray-700">
                    Page Not Found
                </h2>

                {/* A user-friendly message */}
                <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
                    দুঃখিত, আপনি যে পেজটি খুঁজছেন তা আমরা খুঁজে পাইনি। লিঙ্কটি ভুল হতে পারে অথবা পেজটি সরিয়ে ফেলা হয়েছে।
                </p>

                {/* The "Go Home" button/link */}
                <div className="mt-8">
                    <Link
                        to="/"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        <HiArrowLeft className="mr-2 h-5 w-5" /> {/* Back icon */}
                        হোমপেজে ফিরে যান
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;