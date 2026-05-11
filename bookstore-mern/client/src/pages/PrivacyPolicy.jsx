import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">Privacy Policy</h1>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>At BookStore, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">1. Information We Collect</h2>
                    <p>We may collect personal identification information from you in a variety of ways, including when you visit our site, register, place an order, or subscribe to our newsletter.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">2. How We Use Information</h2>
                    <p>The information we collect may be used to personalize your experience, improve our website, process transactions, and send periodic emails regarding your order or other updates.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">3. Data Protection</h2>
                    <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or access your data.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">4. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at support@bookstore.com.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
