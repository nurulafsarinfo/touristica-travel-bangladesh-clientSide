import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';

const PackageDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [shuffledImages, setShuffledImages] = useState([]);
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packageData'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/packages/${id}`);
                return res.data;
            } catch (err) {
                return console.log('Package  not found', err);
            }
        }
    })

    const { data: guides = [] } = useQuery({
        queryKey: ['tourGuides'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get(`/allGuides`);
                return res.data;
            } catch (err) {
                return console.log('Guides not found', err);
            }
        }
    })


    // for shuffle img
    useEffect(() => {
        if (packages?.images?.length > 0) {
            const imagesToShuffle = [...packages.images];

            for (let i = imagesToShuffle.length - 1; i > 0; i--) {

                const j = Math.floor(Math.random() * (i + 1));

                [imagesToShuffle[i], imagesToShuffle[j]] = [imagesToShuffle[j], imagesToShuffle[i]]
            }

            setShuffledImages(imagesToShuffle);
        }
    }, [packages])




    // console.log('data', packages)
    const { mutate } = useMutation({
        mutationFn: async (bookingData) => {
            const res = await axiosSecure.post('/bookings', bookingData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                title: 'Confirm Your Booking!',
                text: 'Your booking has been submitted successfully.',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'My Bookings',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#00a884',
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    navigate(`/dashboard/bookings/${user.email}`);
                }
            })
        },
        onError: (error) => {
            Swal.fire('Error!', error.message || 'Something went wrong.', 'error');
        }

    })

    const onsubmit = (data) => {
        if (!user) {
            navigate('/login');
            console.log('Please log in')
            return;
        }

        const selectedGuideName = data.tourGuide;
        const selectedGuide = guides.find(guide => guide.name === selectedGuideName);

        const toureGuideEmail = selectedGuide.email;


        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to confirm this booking?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#263a88',
            cancelButtonColor: '#f050a6',
            confirmButtonText: 'Yes, book it!',
        }).then((result) => {
            if (result.isConfirmed) {
                const bookingData = {
                    ...data,
                    packageId: packages._id,
                    name: user?.displayName,
                    email: user?.email,
                    packageName: packages.title,
                    toureGuideEmail: toureGuideEmail,
                    price: packages.price,
                    touristImage: user?.photoURL,
                    created_at: new Date().toISOString(),
                    status: 'pending',
                };
                console.log('booking data is ', bookingData)
                mutate(bookingData);
            }


        })
    }



    return (
        <div className='max-w-11/12 mx-auto my-5 md:my-10 font-signikaText'>
            {
                isLoading ? <p>Loading package details data...</p> :
                    <div>

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
                                        src={shuffledImages[3]}
                                        alt="Main"
                                        className="w-full h-[400px] object-cover rounded-xl shadow-md"
                                    />
                                </div>

                                {/* Right side: two stacked images */}
                                <div className="flex flex-col gap-4">
                                    <img
                                        src={shuffledImages[0]}
                                        alt="Secondary 1"
                                        className="w-full h-[195px] object-cover rounded-xl shadow-md"
                                    />
                                    <img
                                        src={shuffledImages[1]}
                                        alt="Secondary 2"
                                        className="w-full h-[195px] object-cover rounded-xl shadow-md"
                                    />
                                </div>
                            </div>

                            {/* Bottom three images */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                <img
                                    src={shuffledImages[2]}
                                    alt="Gallery 3"
                                    className="w-full h-52 object-cover rounded-xl shadow-md"
                                />
                                <img
                                    src={shuffledImages[3]}
                                    alt="Gallery 4"
                                    className="w-full h-52 object-cover rounded-xl shadow-md"
                                />
                                <img
                                    src={shuffledImages[4]}
                                    alt="Gallery 5"
                                    className="w-full h-52 object-cover rounded-xl shadow-md"
                                />
                            </div>
                        </div>

                        {/* description section  */}
                        <div className='my-16'>
                            <h2 className='text-2xl font-bold text-[#263a88]'>About the Tour</h2>
                            <p className='text-sm md:text-md mt-2 text-gray-700 leading-relaxed '>{packages?.description}</p>
                        </div>

                        <div className='my-16'>
                            {
                                packages?.plan?.map((plan, idx) => {
                                    return (
                                        <div key={idx} className="collapse collapse-plus bg-base-100 border border-base-300">
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

                        <div className='my-16'>
                            <h2 className='text-2xl font-bold text-[#263a88] mb-4'>Tour Guides</h2>
                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                                {
                                    guides.map(guide => (
                                        <div key={guide._id}
                                            className='p-4 border border-fuchsia-400 hover:shadow cursor-pointer'
                                            title='Click to View Guide Profile.'
                                            onClick={() => navigate(`/guides/${guide._id}`)}
                                        >
                                            <img src={guide.photoURL} className='h-32 w-full object-cover rounded' />
                                            <h3 className='font-semibold mt-2'>{guide.name}</h3>
                                            <h3 className='text-sm text-gray-600'>{guide.title}</h3>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Booking section  */}
                        <div className='my-16'>
                            <h2 className='text-2xl text-center text-[#263a88] mb-4'>Package Booking Form</h2>
                            <form onSubmit={handleSubmit(onsubmit)} className='grid gap-4'>
                                <div>
                                    <label className='text-[#485ba7] font-semibold'>Package Name</label>
                                    <input type="text" readOnly value={packages.title || ''} className='w-full p-2 border rounded-md bg-gray-100' />
                                </div>

                                {/* tourist information  */}
                                <div>
                                    <label className='text-[#485ba7] font-semibold'>Tourist Name</label>
                                    <input type='text' readOnly value={user?.displayName || ''} className='w-full p-2 border rounded-md bg-gray-100' />
                                </div>
                                <div>
                                    <label className='text-[#485ba7] font-semibold'>Tourist Email</label>
                                    <input type='email' readOnly value={user?.email || ''} className='w-full p-2 border rounded-md bg-gray-100'></input>
                                </div>
                                <div>
                                    <label className="text-[#485ba7] font-medium">Tourist Image</label>
                                    <input type="text" readOnly value={user?.photoURL || ''} className="w-full p-2 border rounded-md bg-gray-100" />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="text-[#485ba7] font-medium">Price</label>
                                    <input type="text" readOnly value={`${packages.price || '0'} tk`} className="w-full p-2 border rounded-md bg-gray-100" />
                                </div>

                                <div className='grid grid-cols-2 gap-4'>
                                    {/* date picker  */}
                                    <div className='flex flex-col'>
                                        <label className='text-[#485ba7] font-semibold'>Select Tour Date</label>
                                        <Controller
                                            control={control}
                                            name='tourDate'
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <DatePicker
                                                    {...field}
                                                    placeholderText='Select a date'
                                                    className='w-full p-2 border rounded-md'
                                                    minDate={new Date()}
                                                    selected={field.value}
                                                    onChange={(date) => field.onChange(date)}
                                                />
                                            )}
                                        ></Controller>
                                        {errors?.tourDate && <p className="text-red-500 text-sm">Please select a tour date</p>}



                                    </div>

                                    {/* tour guid  */}
                                    <div>
                                        <label className='text-[#253a88] font-semibold'>Select Tour Guide</label>
                                        <select
                                            {...register('tourGuide', { required: true })}
                                            className='w-full p-2 border rounded-md'
                                        >
                                            <option value="">-- Select a guide --</option>
                                            {
                                                guides.map((guide) => (
                                                    <option key={guide._id} 
                                                    value={guide.name}>
                                                        {guide.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {errors.tourGuide && <p className="text-red-500 text-sm">Please select a guide</p>}
                                    </div>
                                </div>

                                <button
                                    type='submit'
                                    className='my-5 bg-[#f050a6] hover:bg-[#e53d94] text-white font-semibold py-2 rounded-full transition'
                                >
                                    Book Now
                                </button>


                            </form>
                        </div>
                    </div>
            }
        </div>
    );
};

export default PackageDetails;