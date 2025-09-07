const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Map routes to controller methods
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/dashboard', AuthController.checkAuth);

module.exports = router;