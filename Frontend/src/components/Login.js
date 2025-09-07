// frontend/src/components/Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import our custom hook

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth(); // Get the login function from our context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Call the login function from the context.
            // It will handle the API call, state update, and redirect on its own!
            await login(email, password);
        } catch (err) {
            // If the login function throws an error, we catch it and display it
            setError(err);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
                />
                <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">
                    Login
                </button>
            </form>
            {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}
            <p className="mt-4 text-sm text-center text-gray-600">
                Don't have an account?{' '}
                <Link to="/register-photographer" className="font-medium text-blue-500 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default Login;