const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const photographerRoutes = require('./routes/photographers'); 


const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'your-very-secret-key-that-should-be-in-an-env-file',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to `true` if using HTTPS in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

// === Routes ===
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the class-based authentication API!' });
});

// Use the authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/photographers', photographerRoutes);

// === Start Server ===
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});