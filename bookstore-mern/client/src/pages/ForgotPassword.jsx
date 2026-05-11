import React, { useState } from 'react';
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            if (res.ok) {
                setMessage(data.message + (data.resetToken ? `. Token: ${data.resetToken}` : ''));
            } else {
                setError(data.message || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/login" className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 mb-6 transition-colors group">
                    <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                </Link>
                <div className="bg-white py-10 px-6 shadow-xl rounded-3xl sm:px-12 border border-gray-100">
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
                            <Mail className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Forgot Password</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Enter your email address and we'll send you a token to reset your password.
                        </p>
                    </div>

                    {message && (
                        <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-100 text-green-700 text-sm">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">
                                    <Mail className="w-5 h-5" />
                                </span>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="block w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-2xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Send Reset Token'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
