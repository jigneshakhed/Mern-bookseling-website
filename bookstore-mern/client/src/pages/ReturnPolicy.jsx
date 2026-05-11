import React from 'react';

const ReturnPolicy = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">Return Policy</h1>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>We want you to be completely satisfied with your purchase. If you are not satisfied, you may return your item(s) under the following conditions:</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">1. Eligibility for Returns</h2>
                    <p>Items must be returned within 30 days of the receipt date. Books must be in their original, unread condition without any damage to the cover or pages.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">2. Non-returnable Items</h2>
                    <p>Gift cards, downloadable software products, and some health and personal care items are not eligible for return or exchange.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">3. Process for Returning</h2>
                    <p>To initiate a return, please contact our support team at returns@bookstore.com with your order number. Once approved, you will receive instructions on how to send the package back to us.</p>
                    <h2 className="text-xl font-bold text-gray-900 mt-6">4. Refunds</h2>
                    <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to your original method of payment within 5-7 business days.</p>
                </div>
            </div>
        </div>
    );
};

export default ReturnPolicy;
