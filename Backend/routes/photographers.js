// backend/routes/photographers.js

const express = require('express');
const PhotographerController = require('../controllers/PhotographerController');
const router = express.Router();

// Public routes, anyone can access these
router.get('/', PhotographerController.listAll);
router.get('/:id', PhotographerController.getProfile);

// Route to create a new profile
router.post('/register', PhotographerController.register);

module.exports = router;