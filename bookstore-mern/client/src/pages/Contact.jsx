import React, { useState } from 'react';

import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('//contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Get in <span className="text-indigo-600">Touch</span>
                    </h1>
                    <p className="text-lg text-gray-500">
                        Have a question about a book, or an order? We would love to hear from you.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row max-w-5xl mx-auto border border-gray-100">
                    {/* Left Info Panel */}
                    <div className="bg-indigo-700 text-white p-10 md:w-2/5 flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <p className="text-indigo-100 mb-8 leading-relaxed">
                                Our support team is available around the clock to address any concerns or queries you might have.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <Phone className="w-6 h-6 mr-4 text-indigo-300" />
                                    <span>+91 98765 43210</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-6 h-6 mr-4 text-indigo-300" />
                                    <span>support@bookstore.com</span>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="w-6 h-6 mr-4 text-indigo-300 shrink-0 mt-1" />
                                    <span>123 Bookworm Lane,<br />Reading City, IN 400001</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10">
                            {/* Decorative element */}
                            <div className="w-24 h-24 rounded-full bg-white/10 blur-2xl absolute -bottom-10 -left-10"></div>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="p-10 md:w-3/5 bg-white relative">
                        {submitted && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center shadow-sm">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                Message sent successfully! We will write you back shortly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    placeholder="Jane Doe"
                                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder="jane@example.com"
                                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">Your Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    required
                                    placeholder="How can we help you?"
                                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:-translate-y-1"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;
