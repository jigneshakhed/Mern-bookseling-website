const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/auth');

// @route   POST https://mern-bookseling-website-2.onrender.com/api/orders
// @desc    Create new order
router.post('/', protect, async (req, res) => {
    try {
        const { books, totalAmount, shippingAddress } = req.body;

        if (books && books.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

        const order = new Order({
            user: req.user._id,
            books,
            totalAmount,
            shippingAddress
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET https://mern-bookseling-website-2.onrender.com/api/orders/myorders
// @desc    Get logged in user orders
router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('books.book', 'title price image');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET https://mern-bookseling-website-2.onrender.com/api/orders
// @desc    Get all orders (Admin area)
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name').populate('books.book', 'title');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT https://mern-bookseling-website-2.onrender.com/api/orders/:id/status
// @desc    Update order status
router.put('/:id/status', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = req.body.status || order.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT https://mern-bookseling-website-2.onrender.com/api/orders/:id/cancel
// @desc    Cancel order (User)
router.put('/:id/cancel', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            // Check if user owns the order
            if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                return res.status(401).json({ message: 'Not authorized to cancel this order' });
            }
            if (order.status === 'delivered' || order.status === 'cancelled') {
                return res.status(400).json({ message: 'Cannot cancel this order' });
            }
            order.status = 'cancelled';
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
