import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-bold text-lg mb-2">BookStore</h3>
                        <p className="text-gray-400">Discover your next great read.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Links</h3>
                        <ul className="text-gray-400 space-y-1">
                            <li><a href="/about" className="hover:text-white">About Us</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact</a></li>
                            <li><a href="/feedback" className="hover:text-white">Feedback</a></li>
                            <li><a href="/books" className="hover:text-white">All Books</a></li>
                            <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Legal</h3>
                        <ul className="text-gray-400 space-y-1">
                            <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                            <li><a href="/return-policy" className="hover:text-white">Return Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-2">Contact</h3>
                        <p className="text-gray-400">contact@bookstore.com</p>
                        <p className="text-gray-400">+1 234 567 890</p>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-4 text-gray-400">
                    <p>&copy; {new Date().getFullYear()} BookStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
