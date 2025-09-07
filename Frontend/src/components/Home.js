// frontend/src/components/Home.js

import React from 'react';
import { galleryImages, heroImage } from './galleryData';
import { recentCoverages, upcomingEvents } from './eventData'; // <-- New import

const Home = () => {
    return (
        <div className="w-full">
            {/* Hero Section (Existing) */}
            <header
                className="h-screen bg-cover bg-center flex items-center justify-center text-white"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                {/* Overlay for text readability */}
                <div className="absolute top-0 left-0 w-full h-screen bg-black opacity-50"></div>
                <div className="z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Capturing Moments, Creating Memories</h1>
                    <p className="mt-4 text-xl md:text-2xl text-gray-200">Timeless wedding photography for the modern couple.</p>
                </div>
            </header>
            
            {/* NEW SECTION: RECENT COVERAGES (Add this here) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Recent Wedding Coverages</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {recentCoverages.map(event => (
                            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                                <img src={event.imageUrl} alt={event.title} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"/>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                                    <p className="mt-2 text-gray-600">{event.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Preview Section (Existing) */}
            <section className="py-20 bg-gray-50"> {/* Changed to bg-gray-50 for contrast */}
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">My Work</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {galleryImages.map(image => (
                            <div key={image.id} className="overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                                <img src={image.src} alt={image.alt} className="w-full h-full object-cover"/>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Me Section (Existing) */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">About Me</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        I'm a passionate wedding photographer with a love for storytelling. My approach is to capture the genuine emotions and spontaneous moments that make your day unique. I believe in creating beautiful, light-filled images that you and your family will cherish for a lifetime. Let's work together to tell your love story.
                    </p>
                </div>
            </section>
            
            {/* NEW SECTION: UPCOMING EVENTS (Add this at the end) */}
            <section className="py-20 bg-gray-800 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-12">Upcoming Events</h2>
                    <div className="max-w-2xl mx-auto">
                        {upcomingEvents.map(event => (
                            <div key={event.id} className="flex justify-between items-center border-b border-gray-600 py-4">
                                <span className="text-lg font-semibold">{event.couple}</span>
                                <span className="text-gray-400">{event.location} - {event.date}</span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-gray-300">Booking for late 2026 and 2027. Get in touch to schedule a consultation!</p>
                </div>
            </section>
        </div>
    );
};

export default Home;