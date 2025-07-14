import React from 'react';
import { Link } from 'react-router-dom';
import travelImg from '../assets/undraw_traveling.svg'; // Download and place in public/assets or src/assets

const Register = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#d1dbff] via-white to-[#d1dbff] flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-2xl grid lg:grid-cols-2 gap-10 max-w-6xl w-full p-8">
                {/* Illustration */}
                <div className="hidden lg:flex items-center justify-center">
                    <img src={travelImg} alt="Travel Illustration" className="w-[80%]" />
                </div>

                {/* Form */}
                <div className="w-full">
                    <h2 className="text-3xl font-bold text-primary mb-2">Join Touristica</h2>
                    <p className="mb-6 text-secondary">Plan your dream journey with us.</p>
                    <form className="space-y-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Full Name</span>
                            </label>
                            <input type="text" placeholder="Your name" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="example@mail.com" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Profile Image URL</span>
                            </label>
                            <input type="text" placeholder="https://..." className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="••••••••" className="input input-bordered w-full" />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Register</button>
                        <p className="text-sm mt-2 text-center">
                            Already have an account?{' '}
                            <Link to="/login" className="text-secondary hover:underline">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
