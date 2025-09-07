import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import PhotographersPage from './components/PhotographersPage';
import PhotographerProfile from './components/PhotographerProfile';
import PhotographerRegister from './components/PhotographerRegister';
import ProtectedRoute from './components/ProtectedRoute'; // <-- IMPORT THE NEW COMPONENT

function App() {
    return (
        <>
            <Navbar />
            <main className="pt-16">
                <Routes>
                    {/* --- Public Routes --- */}
                    {/* These routes DO NOT have protection because a new user needs to access them. */}
                    <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                    <Route path="/register-photographer" element={<PageWrapper><PhotographerRegister /></PageWrapper>} />

                    {/* --- Protected Routes --- */}
                    {/* All routes below are wrapped with ProtectedRoute. */}
                    {/* A non-logged-in user will be redirected to /login if they try to access these. */}

                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/photographers" 
                        element={
                            <ProtectedRoute>
                                <PageWrapper><PhotographersPage /></PageWrapper>
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/photographers/:id" 
                        element={
                            <ProtectedRoute>
                                <PageWrapper><PhotographerProfile /></PageWrapper>
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

// Re-usable wrapper component for styling pages
const PageWrapper = ({ children }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {children}
    </div>
);

export default App;