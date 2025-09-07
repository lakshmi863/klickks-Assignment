// frontend/src/components/PhotographerRegister.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PhotographerRegister = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', location: '', specialty: '', bio: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:5000/api/photographers/register', formData);
            setSuccess(response.data.message + " You can now login.");
            setTimeout(() => navigate('/photographers'), 2000); // Redirect to the list after success
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
        }
    };

    return (
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-gray-800">Become a Partner Photographer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"/>
                <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"/>
                <input name="location" placeholder="Location (e.g., San Francisco, CA)" onChange={handleChange} className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"/>
                <input name="specialty" placeholder="Specialty (e.g., Weddings, Portraits)" onChange={handleChange} className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"/>
                <textarea name="bio" placeholder="Tell us about your style and experience..." onChange={handleChange} rows="4" className="w-full px-4 py-2 bg-gray-200 rounded-md focus:outline-none"></textarea>
                <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">Create Profile</button>
            </form>
            {error && <p className="text-center text-red-600">{error}</p>}
            {success && <p className="text-center text-green-600">{success}</p>}
        </div>
    );
};

export default PhotographerRegister;