import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import travelImg from '../../assets/Undraw Traveling.svg';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import axios from 'axios';
import SocialLogin from './SocialLogin';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = useAxios();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(async result => {
                console.log(result)

                // Update user info in the database
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    photoURL: profilePic,
                    role: 'traveller', // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                }

                const userRes = await axiosInstance.post('/users', userInfo);

                console.log(userRes.data);

                axiosInstance.post('/jwt', { email: data.email })
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            navigate(from, { replace: true });
                        };
                    });


                //Update user profile in firebase
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                }
                updateUserProfile(userProfile)
                    .then(() => {
                        console.log(`profile name pic updated`);
                    })
                    .catch(err => {
                        console.log(err);
                    })

                navigate(from)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append("image", image);

        const imageUploaUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploaUrl, formData)

        setProfilePic(res.data.data.url)

    }



    return (
        <div className="min-h-screen bg-gradient-to-r from-[#d1dbff] via-white to-[#d1dbff] flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-2xl grid lg:grid-cols-2 gap-10 max-w-6xl w-full p-8">
                {/* Illustration */}
                <div className="hidden lg:flex items-center justify-center">
                    <img src={travelImg} alt="Travel Illustration" className="w-[80%]" />
                </div>

                {/* Form */}
                <div className={`w-full`}>
                    <h2 className="text-3xl font-bold text-[#0ea5e9] mb-2">Join Touristica</h2>
                    <p className="mb-6 text-secondary">Plan your dream journey with us.</p>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" placeholder="Your name" {...register('name', { required: 'Name is required' })} className="input input-bordered w-full" />

                            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="example@mail.com" {...register('email', { required: 'Email is required!' })}
                                className="input input-bordered w-full" />
                            {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
                        </div>




                        <div>
                            <label className="label">
                                <span className="label-text">Profile Image URL</span>
                            </label>

                            <input type='file' onChange={handleImageUpload} className='input input-bordered w-full p-2 text-gray-500' />
                        </div>




                        <div>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <input type="password" placeholder="••••••••"
                                {...register('password', {
                                    required: 'Password is required!', pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\w_]).{8,}$/, message: "Minium 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special char" }
                                })}

                                className="input input-bordered w-full" />
                            {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}

                        </div>


                        <button type="submit" className="btn bg-[#0ea5e9] w-full text-white">Register</button>
                        <p className="text-sm mt-2 text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-secondary hover:underline">Login here</Link>
                        </p>
                    </form>
                </div>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;
