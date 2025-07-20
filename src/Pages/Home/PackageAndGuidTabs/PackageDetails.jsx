import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PackageDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    console.log('id is ', id);

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packageData'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/packages/${id}`);
                return res.data;
            } catch (err) {
                return console.log('Package  not found', err)
            }
        }
    })

    console.log('packages data', packages)

    return (
        <div className='max-w-11/12 mx-auto my-5 md:my-10 font-signikaText'>
            <h2 className='text-xl md:text-2xl font-bold text-[#263a88] text-center'>Tour Packages Details</h2>

            <div className="max-w-11/12 mx-auto my-8 px-4">
                <div className='text-center mb-6 '>
                    <h2 className="text-2xl font-bold text-[#f050a6] m text-center">Tour Gallery</h2>
                    <p className='text-[#f38cd9]'>{packages?.title}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left side: big image */}
                    <div className="md:col-span-2">
                        <img
                            src={packages?.images[3]}
                            alt="Main"
                            className="w-full h-[400px] object-cover rounded-xl shadow-md"
                        />
                    </div>

                    {/* Right side: two stacked images */}
                    <div className="flex flex-col gap-4">
                        <img
                            src={packages?.images[0]}
                            alt="Secondary 1"
                            className="w-full h-[195px] object-cover rounded-xl shadow-md"
                        />
                        <img
                            src={packages?.images[1]}
                            alt="Secondary 2"
                            className="w-full h-[195px] object-cover rounded-xl shadow-md"
                        />
                    </div>
                </div>

                {/* Bottom three images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                    <img
                        src={packages?.images[2]}
                        alt="Gallery 3"
                        className="w-full h-52 object-cover rounded-xl shadow-md"
                    />
                    <img
                        src={packages?.images[3]}
                        alt="Gallery 4"
                        className="w-full h-52 object-cover rounded-xl shadow-md"
                    />
                    <img
                        src={packages?.images[4]}
                        alt="Gallery 5"
                        className="w-full h-52 object-cover rounded-xl shadow-md"
                    />
                </div>
            </div>

            {/* description section  */}
            <div className='my-8'>
                <h2 className='text-2xl font-bold text-[#263a88]'>About the Tour</h2>
                <p className='text-sm md:text-md mt-2 text-gray-700 leading-relaxed '>{packages?.description}</p>
            </div>

            <div className='my-8'>
                {
                    packages?.plan?.map(plan => {
                        return (
                        <div className="collapse collapse-plus bg-base-100 border border-base-300">
                            <input type="radio" name="my-accordion-3" defaultChecked />
                            <div className="collapse-title text-[#f050a6] font-semibold flex justify-between">
                                <p>🎋 {plan.activity}</p>
                                <span className='text-blue-300 border px-2 rounded'>Day - {plan?.day}</span>
                            </div>
                            <div className="collapse-content text-gray-500 text-sm">{plan.description}</div>
                        </div>
                        )
                    })
                }
            </div>

            <div className='my-8'>
                <h2 className='text-2xl font-bold text-[#263a88] mb-4'>Tour Guides</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {
                        
                    }
                </div>
            </div>

        </div>
    );
};

export default PackageDetails;