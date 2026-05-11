const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { protect, admin } = require('../middleware/auth');

// @route   GET https://mern-bookseling-website-2.onrender.com/api/books
router.get('/', async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? { title: { $regex: req.query.keyword, $options: 'i' } }
            : {};
        const books = await Book.find({ ...keyword });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET https://mern-bookseling-website-2.onrender.com/api/books/:id
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   POST https://mern-bookseling-website-2.onrender.com/api/books
// @desc    Admin create book
router.post('/', protect, admin, async (req, res) => {
    try {
        const book = new Book({
            title: req.body.title || 'Sample title',
            author: req.body.author || 'Sample author',
            description: req.body.description || 'Sample description',
            price: req.body.price || 0,
            image: req.body.image || '/images/1.jpg',
            category: req.body.category || 'Sample category',
        });
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT https://mern-bookseling-website-2.onrender.com/api/books/:id
// @desc    Admin update book
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { title, author, description, price, image, category } = req.body;
        const book = await Book.findById(req.params.id);

        if (book) {
            book.title = title || book.title;
            book.author = author || book.author;
            book.description = description || book.description;
            book.price = price || book.price;
            book.image = image || book.image;
            book.category = category || book.category;

            const updatedBook = await book.save();
            res.json(updatedBook);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE https://mern-bookseling-website-2.onrender.com/api/books/:id
// @desc    Admin delete book
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
