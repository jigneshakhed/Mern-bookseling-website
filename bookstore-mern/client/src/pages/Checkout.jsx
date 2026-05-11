import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { cart, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=checkout');
        }
    }, [user, navigate]);

    const totalAmount = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

    const placeOrder = async (e) => {
        e.preventDefault();
        if (!address.trim()) {
            setError('Shipping address is required');
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                books: cart.map(item => ({ book: item.book._id, quantity: item.quantity })),
                totalAmount,
                shippingAddress: address
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post('/api/orders', orderData, config);
            clearCart();
            setLoading(false);
            navigate('/myorders');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-bold">Order Details</h2>
                </div>
                <div className="p-6">
                    <ul className="mb-6 space-y-2">
                        {cart.map(item => (
                            <li key={item.book._id} className="flex justify-between text-gray-600">
                                <span>{item.quantity} x {item.book.title}</span>
                                <span>₹{(item.book.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t pt-4 flex justify-between font-bold text-lg mb-8">
                        <span>Total Amount</span>
                        <span>₹{totalAmount.toFixed(2)}</span>
                    </div>

                    {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4">{error}</div>}

                    <form onSubmit={placeOrder}>
                        <div className="mb-6">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                            <textarea
                                id="address"
                                rows="3"
                                className="w-full border border-gray-300 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your full shipping address"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Place Order'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
