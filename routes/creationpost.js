const express = require('express');
const router = express.Router(); //Creates an Express Router object. Routers help organize your application's routes (URLs) and their corresponding logic.
const { createUser } = require('../models/createuser') // Imports the createUser function for creating a new user in the database.
const pool = require('../config/database'); // Import the pool for querying users


// Route for the about page
router.get('/', (req, res) => {res.render('index');});

// Route for the about page
router.get('/about', (req, res) => {res.render('about');});

// Route for the registra67tion page
router.get('/EventRegistrationForm', (req, res) => {
    res.render('EventRegistrationForm');
});


// Handle user registration
router.post('/submit', async (req, res) => {
    const { first_name, last_name, birthday, gender, email, phone_number } = req.body;
    const userData = {
        first_name,
        last_name,
        birthday,
        gender,
        email,
        phone_number
    };

    // Basic input validation (optional)
    if (!email || !phone_number) {
        return res.status(400).json({ error: 'Email and phone number are required' });
    }

    try {
        const newUser = await createUser(userData);
        res.status(201).redirect('/'); // Redirect to home page on success
      } catch (error) {
        console.error('Error creating user:', error.message);
        res.render('EventRegistrationForm', { errors: error.errors || [error.message] }); // Pass the error array or a single error message
      }
});


// Route to display registered users
router.get('/RegisteredUsers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users'); // Query to fetch users
        res.render('RegisteredUsers', { users: result.rows }); // Render the template
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Could not retrieve registered users.');
    }
});


module.exports = router;