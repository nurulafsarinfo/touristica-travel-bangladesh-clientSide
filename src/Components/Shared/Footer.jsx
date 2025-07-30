import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router";
import logoImage from '/Simple Wordmark Logo for Touristica.png';


const Footer = () => {
    
    return (
        <footer className="bg-teal-100 text-base-content py-10 px-5 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo & Site Name */}
                <div className="flex flex-col font-logoText items-center md:items-start space-y-3">
                    <img
                        src={logoImage}
                        alt="Touristica Logo"
                        className="w-12 h-12 object-contain bg-teal-200 rounded-full"
                    />
                    <h2 className="text-2xl font-bold">Touristica</h2>
                    <p className="text-sm text-gray-600 max-w-xs text-center md:text-left">
                        Your ultimate travel companion for discovering Bangladesh's best destinations, tours, and stories.
                    </p>
                </div>

                {/* Useful Links */}
                <div>
                    <h3 className="font-semibold mb-4">Useful Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/"
                                className="hover:text-indigo-600 transition-colors duration-300"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/community"
                                className="hover:text-indigo-600 transition-colors duration-300"
                            >
                                Community
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className="hover:text-indigo-600 transition-colors duration-300"
                            >
                                About Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/trips"
                                className="hover:text-indigo-600 transition-colors duration-300"
                            >
                                Trips
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Developer Links */}
                <div>
                    <h3 className="font-semibold mb-4">Developer</h3>
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-indigo-600 transition-colors duration-300"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://linkedin.com/in/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-indigo-600 transition-colors duration-300"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://yourportfolio.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-indigo-600 transition-colors duration-300"
                            >
                                Portfolio
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a
                            href="https://twitter.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        >
                            <FaTwitter size={20} />
                        </a>
                        <a
                            href="https://facebook.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            <FaFacebookF size={20} />
                        </a>
                        <a
                            href="https://instagram.com/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="p-3 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition"
                        >
                            <FaInstagram size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/yourprofile"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="p-3 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition"
                        >
                            <FaLinkedinIn size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-base-300 pt-6 text-center text-xs opacity-60">
                &copy; {new Date().getFullYear()} Touristica. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
