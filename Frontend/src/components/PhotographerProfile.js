// frontend/src/components/PhotographerProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PhotographerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Gets the ':id' from the URL

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`https://klickks-assignment-d2cu.onrender.com/api/photographers/${id}`);
                setProfile(res.data);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) return <p className="text-center text-lg">Loading profile...</p>;
    if (!profile) return <p className="text-center text-lg text-red-500">Photographer not found.</p>;

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <div className="bg-white rounded-lg shadow-xl p-8 md:flex">
                <img src={profile.profile_image_url} alt={profile.name} className="w-48 h-48 rounded-full mx-auto md:mx-0 md:mr-8 object-cover"/>
                <div className="text-center md:text-left mt-6 md:mt-0">
                    <h1 className="text-4xl font-bold text-gray-900">{profile.name}</h1>
                    <p className="text-lg text-gray-600 mt-2">{profile.location}</p>
                    <p className="text-md text-gray-500 bg-gray-100 inline-block px-3 py-1 rounded-full mt-4">{profile.specialty}</p>
                    <p className="text-gray-700 mt-6 leading-relaxed">{profile.bio}</p>
                </div>
            </div>
        </div>
    );
};

export default PhotographerProfile;