const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path'); // Added path import

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('https://mern-bookseling-website-2.onrender.com/api/auth', require('./routes/auth'));
app.use('https://mern-bookseling-website-2.onrender.com/api/books', require('./routes/books'));
app.use('https://mern-bookseling-website-2.onrender.com/api/orders', require('./routes/orders'));
const uploadRoutes = require('./routes/uploadRoutes'); // Added uploadRoutes import
const userRoutes = require('./routes/users');

app.use('https://mern-bookseling-website-2.onrender.com/api/upload', uploadRoutes); // Mounted uploadRoutes
app.use('https://mern-bookseling-website-2.onrender.com/api/users', userRoutes);
app.use('https://mern-bookseling-website-2.onrender.com/api/contact', require('./routes/contact'));
app.use('https://mern-bookseling-website-2.onrender.com/api/feedback', require('./routes/feedback'));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); // Serve /uploads statically

const PORT = process.env.PORT || 5000;
// We were instructed to use "mongodb://localhost:27017"
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore";

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

