import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, User } from 'lucide-react';

const Feedback = () => {
    const [formData, setFormData] = useState({ name: '', email: '', rating: 5, comment: '' });
    const [submitted, setSubmitted] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await fetch('/api/feedback');
            if (response.ok) {
                const data = await response.json();
                setFeedbacks(data);
            }
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ name: '', email: '', rating: 5, comment: '' });
                fetchFeedbacks(); // Refresh the list
                setTimeout(() => setSubmitted(false), 3000);
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to send feedback. Please try again later.');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Customer <span className="text-indigo-600">Feedback</span>
                    </h1>
                    <p className="text-lg text-gray-500">
                        We value your opinion. Share your experience with us and read what others have to say!
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    
                    {/* Feedback Form */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-10">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                            <MessageSquare className="w-6 h-6 mr-3 text-indigo-600" />
                            Write a Review
                        </h3>
                        
                        {submitted && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6 flex items-center shadow-sm">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                Thank you for your feedback!
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
                                <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-1">Rating (1-5)</label>
                                <select
                                    id="rating"
                                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                >
                                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                                    <option value="3">⭐⭐⭐ (3/5)</option>
                                    <option value="2">⭐⭐ (2/5)</option>
                                    <option value="1">⭐ (1/5)</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-1">Your Feedback</label>
                                <textarea
                                    id="comment"
                                    rows="4"
                                    required
                                    placeholder="Tell us what you think..."
                                    className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:-translate-y-1"
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Feedback Display */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                            <Star className="w-6 h-6 mr-3 text-yellow-500" />
                            Recent Reviews
                        </h3>
                        
                        {feedbacks.length === 0 ? (
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center text-gray-500">
                                No feedback yet. Be the first to share your experience!
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                                {feedbacks.map((fb) => (
                                    <div key={fb._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-lg mr-3">
                                                    {fb.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900">{fb.name}</h4>
                                                    <span className="text-xs text-gray-500">{new Date(fb.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-4 h-4 ${i < fb.rating ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 italic">"{fb.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Feedback;
