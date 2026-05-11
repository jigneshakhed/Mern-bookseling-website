import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, Settings, Users, ClipboardList, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ books: 0, orders: 0, users: 0, revenue: 0 });

    const navItems = [
        { name: 'Dashboard Home', path: '/admin', icon: Settings },
     
        { name: 'Manage Books', path: '/admin/books', icon: BookOpen },
        { name: 'Manage Orders', path: '/admin/orders', icon: ClipboardList },
        { name: 'Manage Users', path: '/admin/users', icon: Users },
        { name: 'Contact Messages', path: '/admin/messages', icon: MessageSquare },
        { name: 'Manage Feedback', path: '/admin/feedback', icon: MessageSquare },
        
    ];

    useEffect(() => {
        if (location.pathname === '/admin' && user) {
            const fetchStats = async () => {
                try {
                    const config = { headers: { Authorization: `Bearer ${user.token}` } };
                    const [booksRes, ordersRes, usersRes] = await Promise.all([
                        axios.get('https://mern-bookseling-website-2.onrender.com/api/books'),
                        axios.get('https://mern-bookseling-website-2.onrender.com/api/orders', config),
                        axios.get('https://mern-bookseling-website-2.onrender.com/api/users', config)
                    ]);

                    const revenue = ordersRes.data
                        .filter(o => o.status !== 'cancelled')
                        .reduce((acc, order) => acc + order.totalAmount, 0);

                    setStats({
                        books: booksRes.data.length,
                        orders: ordersRes.data.length,
                        users: usersRes.data.length,
                        revenue
                    });
                } catch (error) {
                    console.error("Error fetching admin stats", error);
                }
            };
            fetchStats();
        }
    }, [location.pathname, user]);

    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md hidden md:block border-r border-gray-100">
                <div className="p-6">
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">Admin<span className="text-indigo-600">Panel</span></h2>
                </div>
                <nav className="mt-6 flex flex-col gap-1 px-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-all ${location.pathname === item.path ? 'bg-indigo-600 text-white shadow-md hover:text-white hover:bg-indigo-700' : ''}`}
                        >
                            <item.icon className="h-5 w-5 mr-3 shrink-0" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
                {location.pathname === '/admin' ? (
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Overview Dashboard</h1>
                        <p className="text-gray-500 mb-10">Welcome back, {user?.name}. Here's what's happening with your store today.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
                                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full mb-4">
                                    <BookOpen className="w-8 h-8" />
                                </div>
                                <h3 className="text-gray-500 font-medium mb-1">Total Books</h3>
                                <p className="text-4xl font-black text-gray-900 mb-4">{stats.books}</p>
                                <Link to="/admin/books" className="text-sm text-indigo-600 hover:underline font-semibold bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors w-full">Manage Catalog</Link>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
                                <div className="p-3 bg-purple-100 text-purple-600 rounded-full mb-4">
                                    <ClipboardList className="w-8 h-8" />
                                </div>
                                <h3 className="text-gray-500 font-medium mb-1">Total Orders</h3>
                                <p className="text-4xl font-black text-gray-900 mb-4">{stats.orders}</p>
                                <Link to="/admin/orders" className="text-sm text-purple-600 hover:underline font-semibold bg-purple-50 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors w-full">View Sales</Link>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center transform transition-all hover:-translate-y-1 hover:shadow-lg">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-4">
                                    <Users className="w-8 h-8" />
                                </div>
                                <h3 className="text-gray-500 font-medium mb-1">Registered Users</h3>
                                <p className="text-4xl font-black text-gray-900 mb-4">{stats.users}</p>
                                <Link to="/admin/users" className="text-sm text-blue-600 hover:underline font-semibold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors w-full">Manage Users</Link>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center transform transition-all hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
                                <div className="p-3 bg-white/20 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <h3 className="text-indigo-100 font-medium mb-1">Total Revenue</h3>
                                <p className="text-4xl font-black text-white mb-4">₹{stats.revenue.toFixed(2)}</p>
                                <div className="text-sm text-indigo-200 font-medium bg-black/10 px-4 py-2 rounded-lg w-full">All-time Earnings</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
