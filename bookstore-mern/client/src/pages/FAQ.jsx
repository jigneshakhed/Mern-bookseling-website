import React from 'react';

const FAQ = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">How long does shipping take?</h3>
                        <p className="text-gray-600">Typically, our standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Can I return a book if I don't like it?</h3>
                        <p className="text-gray-600">Yes, we offer a 30-day return policy for books in their original condition. Please refer to our Return Policy page for more details.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Do you ship internationally?</h3>
                        <p className="text-gray-600">Currently, we only ship within the country. We are working on expanding our reach internationally in the near future.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Are my payment details secure?</h3>
                        <p className="text-gray-600">Absolutely. We use industry-standard encryption protocols to ensure that your payment information is kept completely secure.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
