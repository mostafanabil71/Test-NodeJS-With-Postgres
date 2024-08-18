// Dependencies and Server Setup
const express = require('express'); // **Imports Express framework for building Node.Js web applications**
const path = require('path'); //The Path module provides a way of working with directories and file paths.
const cors = require('cors'); // Enable CORS for all origins (not recommended in production)
const bodyParser = require('body-parser'); // Parses incoming request bodies, making data from forms or JSON payloads accessible.
const session = require('express-session');  // session module allows the creation and storage of the session data used for authentication or user preferences
const creationPostRouter = require('./routes/creationpost'); //**define routes for handling user-related requests (e.g., user registration, login, profile**

const app = express(); // Creates an Express application instance (The foundation for building the web application)
const port = process.env.PORT || 3000; // Sets default port 7000, if PORT is not defined

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use environmental variables
    resave: false,
    saveUninitialized: true,
}));

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));

// Serve static files (CSS, JS, images)
app.use(express.static('public')); //points to the folder containing your CSS and JS files.


// Mount the routes
app.use('/', creationPostRouter);


// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


// Starting the server and handling potential database errors
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});