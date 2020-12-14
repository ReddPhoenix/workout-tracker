const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

// Express assigned to app variable
const PORT = process.env.PORT || 3000;
const app = express();


// Set up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));

// Routes
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

app.use('/', htmlRoutes);
app.use('/api/workouts', apiRoutes);

// Variable assigned to PORT for server and MongooseDB
mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => {
        // Added listener for assigned PORT for server
        app.listen(PORT, () => console.log('==> Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT));
    })
    .catch((error) => {
        console.log(error.message);
    });