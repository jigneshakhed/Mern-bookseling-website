const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    books: [{
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
        quantity: { type: Number, required: true, default: 1 }
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['placed', 'pending', 'out for delivery', 'cancelled'],
        default: 'placed'
    },
    shippingAddress: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
