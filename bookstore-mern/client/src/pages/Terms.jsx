import React from 'react';

const Terms = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">Terms of Service</h1>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>These Terms of Service govern your use of our website and services. By accessing or using the BookStore website, you agree to be bound by these terms.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">1. Usage Rights</h2>
                    <p>You may use our site for lawful purposes only. You must not use our site in any way that causes, or may cause, damage or impairment of the availability or accessibility of the website.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">2. Intellectual Property</h2>
                    <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of BookStore or its content suppliers and protected by copyright laws.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">3. Limitation of Liability</h2>
                    <p>BookStore won't be liable for any damages that arise from the use of, or the inability to use, the materials on this site.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">4. Modifications</h2>
                    <p>We reserve the right to revise these terms of service for its website at any time without notice.</p>
                </div>
            </div>
        </div>
    );
};

export default Terms;
