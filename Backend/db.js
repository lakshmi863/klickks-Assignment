// backend/db.js

const sqlite3 = require('sqlite3').verbose();

class Database {
    constructor(dbPath = './users.db') {
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error opening database:', err.message);
                throw err;
            }
            console.log('Connected to the SQLite database.');
            this.initialize(); // Call the initialize method
        });
    }

    initialize() {
        // --- 1. Create Users Table (for Admin/Simple Users) ---
        const createUserTableSql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password TEXT NOT NULL
            )
        `;
        this.db.run(createUserTableSql, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            } else {
                console.log('Users table is ready.');
            }
        });

        // --- 2. Create Photographers Table ---
        const createPhotographersTableSql = `
            CREATE TABLE IF NOT EXISTS photographers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                location TEXT,
                specialty TEXT,
                bio TEXT,
                profile_image_url TEXT
            )
        `;
        this.db.run(createPhotographersTableSql, (err) => {
            if (err) {
                console.error('Error creating photographers table:', err.message);
            } else {
                console.log('Photographers table is ready.');
            }
        });
    }

    // --- Methods for 'users' table ---

    findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE email = ?`;
            this.db.get(sql, [email], (err, row) => {
                if (err) reject(err);
                resolve(row);
            });
        });
    }

    createUser(email, hashedPassword) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
            this.db.run(sql, [email, hashedPassword], function (err) {
                if (err) reject(err);
                resolve(this.lastID);
            });
        });
    }

    // --- Methods for 'photographers' table ---

    createPhotographer(profile) {
        return new Promise((resolve, reject) => {
            const { name, email, hashedPassword, location, specialty, bio, profile_image_url } = profile;
            const sql = `INSERT INTO photographers (name, email, password, location, specialty, bio, profile_image_url) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            this.db.run(sql, [name, email, hashedPassword, location, specialty, bio, profile_image_url], function (err) {
                if (err) return reject(err);
                resolve(this.lastID);
            });
        });
    }

    findPhotographerByEmail(email) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM photographers WHERE email = ?`;
            this.db.get(sql, [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }

    getAllPhotographers() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id, name, location, specialty, bio, profile_image_url FROM photographers`;
            this.db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    getPhotographerById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT id, name, location, specialty, bio, profile_image_url FROM photographers WHERE id = ?`;
            this.db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    }
}

// Export a single instance of the Database class
module.exports = new Database();