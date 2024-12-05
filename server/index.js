const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv')
dotenv.config()
const dbConnection = require("./config/dbConfig");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const privateRoutes = require('./routes/privateRoutes')

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variables if available


dbConnection();

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable CORS for all requests
app.use(morgan('dev')); // Logging requests (use 'combined' for production)
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Basic Route (for testing)
app.use('/private', privateRoutes);
app.get('/', (req, res) => {
    res.send('Hello, World! The server is running.');
});

// Start the server
app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is Successfully Running, and App is listening on port ${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
