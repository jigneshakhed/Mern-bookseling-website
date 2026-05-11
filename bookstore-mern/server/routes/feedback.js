const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect, admin } = require('../middleware/auth');

// @route   POST https://mern-bookseling-website-2.onrender.com/api/feedback
// @desc    Submit a feedback
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, rating, comment } = req.body;

        if (!name || !email || !rating || !comment) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newFeedback = new Feedback({
            name,
            email,
            rating,
            comment,
            status: 'approved' // Automatically default to approved for immediate display
        });

        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET https://mern-bookseling-website-2.onrender.com/api/feedback
// @desc    Get all approved feedback (for user side)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ status: 'approved' }).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET https://mern-bookseling-website-2.onrender.com/api/feedback/admin
// @desc    Get all feedback (for admin side)
// @access  Private/Admin
router.get('/admin', protect, admin, async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT https://mern-bookseling-website-2.onrender.com/api/feedback/:id/status
// @desc    Update feedback status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
    try {
        const { status } = req.body;
        const feedback = await Feedback.findById(req.params.id);
        
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        feedback.status = status;
        await feedback.save();
        res.json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE https://mern-bookseling-website-2.onrender.com/api/feedback/:id
// @desc    Delete a feedback
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        await feedback.deleteOne();
        res.json({ message: 'Feedback removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
