import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 1. Create the context
const AuthContext = createContext(null);

// This line is crucial for all API requests to include cookies
axios.defaults.withCredentials = true;

// 2. Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true); // To handle initial auth check
    const navigate = useNavigate();

    // --- Function to handle LOGIN ---
    const login = async (email, password) => {
        try {
            const response = await axios.post('https://klickks-assignment-d2cu.onrender.com/api/auth/login', { email, password });
            if (response.data && response.data.user) {
                setCurrentUser(response.data.user); // Set the logged-in user
                navigate('/'); // Redirect to HOME page
            }
        } catch (error) {
            // Re-throw the error so the Login component can display it
            throw error.response?.data?.message || 'Login failed';
        }
    };

    // --- MODIFIED FUNCTION for instant LOGOUT ---
    const logout = async () => {
        // Step 1: Immediately clear user state and redirect (Optimistic Update)
        setCurrentUser(null);
        navigate('/login');

        // Step 2: In the background, send the request to the server to destroy the session
        try {
            await axios.post('https://klickks-assignment-d2cu.onrender.com/api/auth/logout');
            // No action needed on success, UI is already updated
        } catch (error) {
            // Log the error for developers, but the user experience is already handled
            console.error('Server logout failed, but client state is cleared:', error);
        }
    };

    // --- Effect to check for an existing session on app load ---
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                // Check if the user has an active session cookie
                const response = await axios.get('https://klickks-assignment-d2cu.onrender.com/api/auth/dashboard');
                if (response.data && response.data.loggedIn) {
                    setCurrentUser({ email: response.data.email }); // Set user from session
                }
            } catch (error) {
                // This error is expected if there is no session
            } finally {
                setLoading(false);
            }
        };

        checkLoggedIn();
    }, []);

    // The value that will be available to all children components
    const value = { currentUser, login, logout, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> // <-- THE FIX IS HERE
    );
};

// 3. Create a custom hook for easy access to the context
export const useAuth = () => {
    return useContext(AuthContext);
};