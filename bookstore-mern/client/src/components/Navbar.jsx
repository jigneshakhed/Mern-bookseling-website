import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, LogOut, User, BookOpen, Search } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/books?keyword=${searchTerm}`);
            setSearchTerm(''); // Clear after search
        }
    };

    const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center flex-1">
                        <Link to="/" className="flex-shrink-0 flex items-center mr-8">
                            <BookOpen className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 font-bold text-xl text-gray-800">UniBuy</span>
                        </Link>
                        
                        {/* Global Search Bar */}
                        <form onSubmit={handleSearch} className="hidden md:flex relative max-w-md w-full">
                            <input
                                type="text"
                                placeholder="Search books..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <button type="submit" className="hidden">Search</button>
                        </form>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/books" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Books</Link>
                        <Link to="/blog" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Blog</Link>
                        <Link to="/about" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium border-l border-gray-100 pl-4 ml-4">Contact</Link>
                        <Link to="/feedback" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Feedback</Link>

                        <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 px-3 py-2 flex items-center">
                            <ShoppingCart className="h-6 w-6" />
                            {cartItemsCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="relative group flex items-center space-x-2">
                                <span className="text-gray-700 text-sm font-medium hidden sm:block whitespace-nowrap">Hi, {user.name}</span>
                                {user.role === 'admin' && (
                                    <Link to="/admin" className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Dashboard</Link>
                                )}
                                <Link to="/myorders" className="text-gray-600 hover:text-indigo-600 text-sm font-medium mr-2">My Orders</Link>
                                <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 flex items-center">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <Link to="/login" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                                <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">Signup</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
