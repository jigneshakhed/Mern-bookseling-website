import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const totalAmount = cart.reduce((acc, item) => acc + item.book.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added any books to your cart yet.</p>
                <Link to="/books" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow w-full lg:w-2/3">
                    {cart.map((item) => (
                        <div key={item.book._id} className="flex flex-col sm:flex-row items-center bg-white p-4 mb-4 rounded-lg shadow">
                            <img src={item.book.image} alt={item.book.title} className="w-24 h-32 object-cover rounded mb-4 sm:mb-0 sm:mr-6" />

                            <div className="flex-grow text-center sm:text-left">
                                <h3 className="text-lg font-bold text-gray-900"><Link to={`/books/${item.book._id}`}>{item.book.title}</Link></h3>
                                <p className="text-gray-500 mb-2">{item.book.author}</p>
                                <div className="flex items-center justify-center sm:justify-start space-x-4">
                                    <div className="flex items-center border rounded">
                                        <button
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                            onClick={() => updateQuantity(item.book._id, item.quantity - 1)}
                                        >-</button>
                                        <span className="px-4 py-1 border-x">{item.quantity}</span>
                                        <button
                                            className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                            onClick={() => updateQuantity(item.book._id, item.quantity + 1)}
                                        >+</button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.book._id)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 font-bold text-lg text-gray-900 whitespace-nowrap">
                                ₹{(item.book.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full lg:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow sticky top-20">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)} items)</span>
                            <span className="font-bold">₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4 pb-4 border-b">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-bold">Free</span>
                        </div>
                        <div className="flex justify-between mb-6 text-lg font-bold">
                            <span>Total</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700 transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
