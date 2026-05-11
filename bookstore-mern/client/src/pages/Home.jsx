import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import About from './About';
import Blog from './Blog';
import Contact from './Contact';
import Feedback from './Feedback';

const Home = () => {
    const [featuredBooks, setFeaturedBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const { data } = await axios.get('https://mern-bookseling-website-2.onrender.com/api/books');
                setFeaturedBooks(data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching featured books:', error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <video 
                        className="w-full h-full object-cover opacity-30" 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                    >
                        <source src="/uploads/4.mp4" type="video/mp4" />
                        {/* Fallback to image if video fails or doesn't exist yet */}
                        <img className="w-full h-full object-cover opacity-30" src="/uploads/image-1771675356855.jpg" alt="Library Background" />
                    </video>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Read, Learn, <span className="text-indigo-400">Grow</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl">
                        Dive into our massive collection of books and discover your next favorite story today. Delivered straight to your door.
                    </p>
                    <Link
                        to="/books"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full text-indigo-900 bg-white hover:bg-gray-100 shadow-xl transition-transform transform hover:-translate-y-1"
                    >
                        Explore the Catalog
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="p-6">
                            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Massive Selection</h3>
                            <p className="text-gray-500">Over 100,000 titles across hundreds of genres available instantly.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Payments</h3>
                            <p className="text-gray-500">Shop with confidence using our 100% secure payment gateways.</p>
                        </div>
                        <div className="p-6">
                            <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
                            <p className="text-gray-500">Get your physical books delivered to your doorstep in 48 hours.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Books */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-gray-900">Trending Now</h2>
                        <p className="text-gray-500 mt-2">Books causing a buzz in the literary world.</p>
                    </div>
                    <Link to="/books" className="hidden sm:inline-flex text-indigo-600 hover:text-indigo-800 font-medium items-center">
                        View All <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredBooks.map((book) => (
                        <div key={book._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group">
                            <div className="relative overflow-hidden bg-gray-100 flex items-center justify-center h-72">
                                <img src={book.image} alt={book.title} className="max-h-full object-contain transform group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-indigo-600 shadow-sm">
                                    {book.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="font-bold text-xl text-gray-900 mb-1 line-clamp-1">{book.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{book.author}</p>
                                <div className="mt-auto flex justify-between items-center border-t border-gray-50 pt-4">
                                    <span className="font-extrabold text-indigo-600 text-lg">₹{book.price.toFixed(2)}</span>
                                    <Link to={`/books/${book._id}`} className="text-sm bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 font-medium transition-colors">
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Embedded Pages */}
            <About />
            <Blog />
            <Contact />
            <Feedback />
        </div>
    );
};

export default Home;
