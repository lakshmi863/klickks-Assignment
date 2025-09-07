// backend/controllers/PhotographerController.js

const bcrypt = require('bcrypt');
const db = require('../db');

const saltRounds = 10;

class PhotographerController {
    /**
     * Handles photographer registration.
     */
    async register(req, res) {
        const { name, email, password, location, specialty, bio } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        try {
            const existingPhotographer = await db.findPhotographerByEmail(email);
            if (existingPhotographer) {
                return res.status(409).json({ message: 'This email is already registered.' });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const profile = {
                name,
                email,
                hashedPassword,
                location: location || 'Location not set',
                specialty: specialty || 'Photography',
                bio: bio || 'No bio provided.',
                // Use a default profile image or let the user upload one later
                profile_image_url: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            };
            
            const photographerId = await db.createPhotographer(profile);
            res.status(201).json({ message: 'Photographer profile created successfully!', photographerId });

        } catch (error) {
            res.status(500).json({ message: 'Server error during registration.', error: error.message });
        }
    }
    
    // NOTE: A photographer-specific login would go here, similar to AuthController
    // It would check the `photographers` table instead of the `users` table.

    /**
     * Gets a list of all photographers for public display.
     */
    async listAll(req, res) {
        try {
            const photographers = await db.getAllPhotographers();
            res.status(200).json(photographers);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching photographers.', error: error.message });
        }
    }

    /**
     * Gets a single photographer's profile by ID.
     */
    async getProfile(req, res) {
        try {
            const { id } = req.params;
            const photographer = await db.getPhotographerById(id);
            if (photographer) {
                res.status(200).json(photographer);
            } else {
                res.status(404).json({ message: 'Photographer not found.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching photographer profile.', error: error.message });
        }
    }
}

module.exports = new PhotographerController();