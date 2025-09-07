import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('https://klickks-assignment-d2cu.onrender.com/api/auth/register', { email, password });
            setSuccess(response.data.message + ". Redirecting to login...");
            
            setTimeout(() => navigate('/login'), 2000);

        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Sign Up
                    </button>
                </div>
            </form>
            {error && <p className="mt-4 text-sm text-center text-red-600">{error}</p>}
            {success && <p className="mt-4 text-sm text-center text-green-600">{success}</p>}
            <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-500 hover:underline">
                    Login here
                </Link>
            </p>
        </div>
    );
};

export default Register;