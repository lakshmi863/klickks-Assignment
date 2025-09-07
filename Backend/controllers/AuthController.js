const bcrypt = require('bcrypt');
const db = require('../db'); // Import our database class instance

const saltRounds = 10;

class AuthController {
    /** 
     * Handles user registration.
     */
    async register(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        try {
            // Check if user already exists
            const existingUser = await db.findUserByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'This email is already registered.' });
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const userId = await db.createUser(email, hashedPassword);

            res.status(201).json({ message: 'User registered successfully!', userId });
        } catch (error) {
            res.status(500).json({ message: 'Server error during registration.', error: error.message });
        }
    }

    /**
     * Handles user login.
     */
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        try {
            const user = await db.findUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            // Create session
            req.session.userId = user.id;
            req.session.email = user.email;

            res.status(200).json({ message: 'Logged in successfully!', user: { id: user.id, email: user.email } });
        } catch (error) {
            res.status(500).json({ message: 'Server error during login.', error: error.message });
        }
    }

    /**
     * Handles user logout.
     */
    logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Could not log out. Please try again.' });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logged out successfully.' });
        });
    }

    /**
     * Checks if a user has an active session.
     */
    checkAuth(req, res) {
        if (req.session.userId && req.session.email) {
            res.status(200).json({ loggedIn: true, email: req.session.email });
        } else {
            res.status(401).json({ loggedIn: false, message: 'User not authenticated' });
        }
    }
}

// Export a single instance of the AuthController
module.exports = new AuthController();