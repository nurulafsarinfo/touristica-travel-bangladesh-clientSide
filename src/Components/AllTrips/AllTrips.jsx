import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { FaDollarSign, FaStar, FaClock } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import LoadingSpinner from '../Shared/LoadingSpinner';


const AllPackages = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [ sortOrder, setSortOrder ] = useState('');

    // Fetch all packages using React Query and a real API call
    const { data: packages = [], isLoading, error } = useQuery({
        queryKey: ['allPackages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/packages');
            return res.data;
        },
    });

    
    const sortedPackages = useMemo(() => {
        const packagesCopy = [...packages];

        

        if(sortOrder === 'latest'){
            console.log('clicked latest')
            return packagesCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) );

        };

        if(sortOrder === 'oldest'){
             console.log('clicked oldest')
            return packagesCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt) );
        }

        return packagesCopy;

    }, [packages, sortOrder])



    // Handle Loading State
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-100">
                <LoadingSpinner/>
            </div>
        );
    }
    
    // Handle Error State
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-100">
                <div className="text-center p-4">
                    <h2 className="text-2xl font-bold text-red-500">Failed to Load Packages</h2>
                    <p className="text-gray-600 mt-2">{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-base-100 py-8 md:py-10 font-signikaText">
            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Header */}
                <div className="text-center mb-4">
                    <h1 className="text-4xl md:text-5xl font-raleway font-bold text-[#263a88]">
                        Discover Our Tours
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our curated list of unforgettable journeys. Find the perfect adventure that awaits you.</p>
                </div>



                {/* section of sorting stories  */}
                <div className='flex justify-end'>
                    <select 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className='border border-blue-500 rounded-md px-4 mb-4'
                    >
                        <option value="" disabled>--Sort by--</option>
                        <option value={"latest"}>Sort by Latest</option>
                        <option value={"oldest"}>Sort by Oldest</option>
                    </select>
                </div>



                {/* Responsive Grid for Package Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {sortedPackages.map((pkg) => (
                        <div
                            key={pkg._id}
                            className="card bg-white shadow-lg hover:shadow-2xl transition-shadow duration-800 rounded-lg overflow-hidden flex flex-col group"
                        >
                            <figure className="relative h-56 overflow-hidden">
                                <img
                                    src={pkg.images?.[0] || pkg.images?.[3]}
                                    alt={`Image of ${pkg.title}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/d1dbff/263a88?text=Image+Not+Found'; }}
                                />
                                <div className="absolute top-2 right-2 bg-[#f050a6] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    {pkg.type}
                                </div>
                            </figure>
                            <div className="card-body p-5 flex flex-col flex-grow">
                                <h2 className="card-title text-xl font-raleway font-bold text-[#263a88] mb-2 h-14">
                                    {pkg.title}
                                </h2>
                                <p className="text-gray-500 text-sm mb-4 h-10">
                                    {pkg.description?.slice(0, 80) || 'No description available'}...
                                </p>

                                <div className="mt-auto border-t border-gray-300 pt-4 space-y-2 text-sm">
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span className="flex items-center"><FaStar className="mr-2 text-yellow-400" /> Rating:</span>
                                        <span className="font-bold text-[#263a88]">{pkg.rating} / 5</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span className="flex items-center"><FaClock className="mr-2 text-sky-500" /> Duration:</span>
                                        <span className="font-bold text-[#263a88]">{pkg.duration} Days</span>
                                    </div>
                                    <div className="flex justify-between items-center text-gray-600">
                                        <span className="flex items-center"><FaDollarSign className="mr-2 text-green-500" /> Price:</span>
                                        <span className="font-bold text-lg text-[#f050a6]">{pkg.price} TK</span>
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-5">
                                    <button
                                        onClick={() => navigate(`/packages/${pkg._id}`)}
                                        className="btn bg-[#0ea5e9] hover:bg-[#0b98d2] text-white font-bold w-full rounded-full transition-all duration-300 transform hover:scale-105"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllPackages;
