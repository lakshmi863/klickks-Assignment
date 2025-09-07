// frontend/src/components/PhotographersPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PhotographersPage = () => {
    const [photographers, setPhotographers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotographers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/photographers');
                setPhotographers(res.data);
            } catch (error) {
                console.error("Failed to fetch photographers", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPhotographers();
    }, []);

    if (loading) return <p className="text-center text-lg">Loading photographers...</p>;

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Find Your Photographer</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {photographers.map(p => (
                    <div key={p.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={p.profile_image_url} alt={p.name} className="w-full h-56 object-cover" />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800">{p.name}</h2>
                            <p className="text-md text-gray-600 mt-2">{p.location}</p>
                            <p className="text-sm text-gray-500 mt-1">{p.specialty}</p>
                            <Link to={`/photographers/${p.id}`} className="inline-block mt-4 text-white bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-700">
                                View Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotographersPage;