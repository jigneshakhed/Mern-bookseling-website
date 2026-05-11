const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/auth');

// @route   POST api/contact
// @desc    Submit a contact form message
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const newContact = new Contact({
            name,
            email,
            message
        });

        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET api/contact
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   DELETE api/contact/:id
// @desc    Delete a contact message
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Message not found' });
        }
        await contact.deleteOne();
        res.json({ message: 'Message removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
