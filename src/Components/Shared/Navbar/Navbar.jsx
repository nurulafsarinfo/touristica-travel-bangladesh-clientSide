import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { NavLink } from "react-router"; // use react-router-dom for web routing
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import logoImage from '/Simple Wordmark Logo for Touristica.png'

const Navbar = () => {
    const { user, logOut } = useAuth();

    const [dropdownOpen, setDropdownOpen] = useState(false);


    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "font-semibold text-indigo-600" : "font-signikaText"
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/community"
                    className={({ isActive }) =>
                        isActive ? "font-semibold text-indigo-600" : "font-signikaText"
                    }
                >
                    Community
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        isActive ? "font-semibold text-indigo-600" : "font-signikaText"
                    }
                >
                    About Us
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-trips"
                    className={({ isActive }) =>
                        isActive ? "font-semibold text-indigo-600" : "font-signikaText"
                    }
                >
                    Trips
                </NavLink>
            </li>
        </>
    );

    const handleLogout = () => {
        // your logout logic here
        logOut()
            .then(console.log('User loged out'))
        setDropdownOpen(false);
    };

    return (
        <div className="sticky top-0 z-50  ">
            <div className="navbar  shadow-sm font-signikaText bg-teal-300 backdrop-blur-2xl px-4 md:px-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle lg:hidden"
                        >
                            <BiMenuAltLeft size={28} />
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {navLinks}
                            {!user && (
                                <>
                                    <li>
                                        <NavLink to="/login" className="font-signikaText">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register" className="font-signikaText">
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <NavLink
                        to="/"
                        className="btn btn-ghost text-xl font-logoText tracking-widest"
                    >
                        <div className="flex gap-2 items-center">
                            <img src={logoImage} alt="touristica logo" className="w-16 h-12 rounded-2xl"/>
                        <p className="text-bold text-2xl">Touristica</p>
                        </div>
                    </NavLink>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 space-x-3">{navLinks}</ul>
                </div>

                {/* NAVBAR END  */}
                <div className="navbar-end">
                    {!user ? (
                        <>
                            <NavLink
                                to="/login"
                                className="btn btn-outline border-[#0ea5e9] hover:bg-[#0ea5e9] mr-3 py-2 px-3 hidden md:inline-block"
                            >
                                Log In
                            </NavLink>
                            <NavLink
                                to="/register"
                                className="btn bg-[#0ea5e9] py-2 px-4 hidden md:inline-block"
                            >
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <div className="relative" tabIndex={0}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                title="Click here"
                                className="btn btn-ghost btn-circle avatar flex items-center justify-center border border-indigo-500 space-x-4"
                            >
                                {user.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                ) : (
                                    <FaUserCircle size={32} />
                                )}

                            </button>
                            {dropdownOpen && (
                                <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56 absolute right-0 z-50">
                                    <li className="pointer-events-none px-3 py-2">
                                        <div className="font-semibold">{user.displayName}</div>
                                        <div className="text-xs opacity-70">{user.email}</div>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    {/* Optional: Offer Announcements */}
                                    <li>
                                        <NavLink
                                            to="/offer-announcements"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Offer Announcements
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="text-error">
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
