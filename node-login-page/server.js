// server.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();

// Use session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Set up a simple user database (replace with a database in a real application)
const users = [
    {
        username: 'ayush',
        password: '123456' // Password is "password"
    },
    {
        username: 'user2',
        password: '789456' // Password is "password123"
    }
];

// Serve static files (e.g., login.html)
app.use(express.static("D:\Complete Web Development\node-login-page\login.html"));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Render the login form
app.get('/', (req, res) => {
    res.sendFile("D:\Complete Web Development\node-login-page\login.html");
});

// Handle login post request
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.send('User not found');
    }

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (result) {
            // Set a session variable to indicate the user is logged in
            req.session.loggedIn = true;
            res.send('Login successful');
        } else {
            res.send('Invalid password');
        }
    });
});

// Protect a route with authentication
app.get('/protected', (req, res) => {
    if (req.session.loggedIn) {
        res.send('This is a protected page.');
    } else {
        res.send('Access denied. Please login.');
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});