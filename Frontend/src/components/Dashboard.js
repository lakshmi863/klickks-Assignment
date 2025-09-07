import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/dashboard');
                if (res.data.loggedIn) {
                    setUserEmail(res.data.email);
                } else {
                    navigate('/login');
                }
            } catch (err) {
                console.error('Authentication check failed:', err);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="w-full max-w-lg p-8 text-center bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="mt-4 text-lg text-gray-600">
                Welcome, <span className="font-semibold text-blue-500">{userEmail}</span>!
            </p>
            <p className="mt-2 text-gray-500">You have successfully logged in.</p>
            <div className="mt-8">
                <button
                    onClick={handleLogout}
                    className="px-6 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;