import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Package } from 'lucide-react';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('https://mern-bookseling-website-2.onrender.com/api/orders/myorders', config);
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const cancelOrder = async (id) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.put(`https://mern-bookseling-website-2.onrender.com/api/orders/${id}/cancel`, {}, config);
                setOrders(orders.map(order =>
                    order._id === id ? { ...order, status: 'cancelled' } : order
                ));
            } catch (error) {
                console.error('Error cancelling order:', error);
                alert(error.response?.data?.message || 'Failed to cancel order');
            }
        }
    };

    if (loading) return <div className="min-h-screen py-12 text-center text-gray-500">Loading your orders...</div>;

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-4rem)] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
                    <Package className="mr-3 w-10 h-10 text-indigo-600" /> My Orders history
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                        <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-500">You haven't placed any orders yet. Start exploring our catalog!</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Order ID</p>
                                        <p className="font-bold text-gray-900">...{order._id.substring(order._id.length - 8)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Date Placed</p>
                                        <p className="font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                                        <p className="font-bold text-indigo-600 text-lg">₹{order.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider 
                                            ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'}`}>
                                            {order.status}
                                        </span>
                                        {(order.status !== 'cancelled' && order.status !== 'delivered') && (
                                            <button
                                                onClick={() => cancelOrder(order._id)}
                                                className="text-red-500 hover:text-white hover:bg-red-500 font-medium text-sm border border-red-200 hover:border-red-500 px-3 py-1 rounded transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Items in this order</h4>
                                    <ul className="space-y-3">
                                        {order.books.map(item => (
                                            <li key={item.book?._id || Math.random()} className="flex justify-between items-center text-gray-700 group">
                                                <div className="flex items-center">
                                                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md text-sm mr-3">{item.quantity}x</span>
                                                    <span className="font-medium group-hover:text-indigo-600 transition-colors">{item.book?.title || 'Unknown Book'}</span>
                                                </div>
                                                <span className="font-medium text-gray-600">₹{(item.book?.price * item.quantity).toFixed(2) || '0.00'}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
