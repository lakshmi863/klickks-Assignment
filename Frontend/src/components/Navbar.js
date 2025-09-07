import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg'; // <-- 1. Import the logo image from the assets folder

const Navbar = () => {
    const { currentUser, logout } = useAuth();

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 z-10">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* 2. Replace the text with an <img> tag for the logo */}
                <Link to="/">
                    <img src={logo} alt="Klickks Photography Logo" className="h-10 w-auto" />
                </Link>
                
                {/* Main Navigation Links */}
                <div className="hidden md:flex space-x-6 text-lg items-center">
                    <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
                    <Link to="/photographers" className="text-gray-600 hover:text-gray-800">Find a Photographer</Link>
                </div>

                {/* Conditional Buttons based on Login Status */}
                <div className="flex items-center space-x-4">
                    {currentUser ? (
                        // If user is LOGGED IN, show this:
                        <button 
                            onClick={logout} 
                            className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-500"
                        >
                            Logout
                        </button>
                    ) : (
                        // If user is LOGGED OUT, show this:
                        <>
                            <Link to="/register-photographer" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500">
                                Register as Photographer
                            </Link>
                            <Link to="/login" className="px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700">
                                Admin Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;