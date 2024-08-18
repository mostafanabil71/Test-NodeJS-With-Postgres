// ** This code defines a function createUser that takes user data as an object and inserts it into the users table of a PostgreSQL database using a prepared SQL statement.**

// Import the Pool class to create a connection pool to the PostgreSQL database
const { Pool } = require('pg');

// Import the configured connection pool from config/database.js
const pool = require('../config/database');

const moment = require('moment');
// Function to create a new user in the database

const createUser = async (userData) => {
    const { email, phone_number } = userData;
    
        try {
            // Check for existing email or phone number
            const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 OR phone_number = $2', [email, phone_number]);
            if (existingUser.rows.length > 0) {
                const errorMessages = [];
                if (existingUser.rows.find(user => user.email === email)) {
                    errorMessages.push('Email already exists');
                }
                if (existingUser.rows.find(user => user.phone_number === phone_number)) {
                    errorMessages.push('Phone number already exists');
                }
                return { errors: errorMessages };
            }
        
            const parsedBirthday = moment(userData.birthday.trim(), 'DD/MM/YYYY', true);
        
    // Insert user data if unique (existing code remains the same)
    const sql = `INSERT INTO users (first_name, last_name, birthday, gender, email, phone_number) VALUES ($1, $2, TO_DATE($3, 'YYYY-MM-DD'), $4, $5, $6) RETURNING *`;
    const values = [userData.first_name, userData.last_name, parsedBirthday.format('YYYY-MM-DD'), userData.gender, userData.email, userData.phone_number];
    const result = await pool.query(sql, values);
    return result.rows[0]; // Return the newly created user object
  } catch (error) {
    // Handle specific errors and return an array of error messages
    if (error.message.includes('duplicate key value')) {
      return { errors: ['Email or phone number already exists'] };
    } else {
      throw error; // Re-throw other errors
    }
  }
    };

module.exports = { createUser };