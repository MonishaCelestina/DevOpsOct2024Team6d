const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const studentRoutes = require('./Backend/routes/studentRoutes'); // Student-related routes
const loginRoutes = require('./Backend/routes/loginRoutes'); // Login and authentication routes

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Attach Routes
app.use('/', loginRoutes); // Keep login routes at root "/"
app.use("/api/students", studentRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
