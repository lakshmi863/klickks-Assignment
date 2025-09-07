import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();

    // 1. While the authentication state is loading, show a loading message.
    // This prevents the user from being redirected before the session check is complete.
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    // 2. If loading is finished and there is no user, redirect to the login page.
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // 3. If loading is finished and a user exists, render the child component (the actual page).
    return children;
};

export default ProtectedRoute;

