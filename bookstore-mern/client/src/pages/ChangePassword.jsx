import React, { useState, useContext } from 'react';
import { ShieldCheck, ArrowLeft, Loader2, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ChangePassword = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            return setError('New passwords do not match');
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await fetch('https://mern-bookseling-website-2.onrender.com/api/auth/change-password', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });
            const data = await res.json();

            if (res.ok) {
                setMessage('Password changed successfully!');
                setFormData({ email: '', currentPassword: '', newPassword: '', confirmPassword: '' });
                setTimeout(() => navigate('/'), 3000);
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
                    Back to Login / Profile
                </Link>
                <div className="bg-white py-10 px-6 shadow-xl rounded-3xl sm:px-12 border border-gray-100">
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4 text-indigo-600">
                            <KeyRound className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Change Password</h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Keep your account secure by updating your password regularly.
                        </p>
                    </div>

                    {message && (
                        <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-100 text-green-700 text-sm flex items-center">
                            <ShieldCheck className="w-5 h-5 mr-3" />
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-100 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Current Password
                            </label>
                            <input
                                type="password"
                                required
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                                placeholder="••••••••"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                            />
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                required
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                                placeholder="••••••••"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                required
                                className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 flex justify-center items-center py-3.5 px-4 border border-transparent rounded-2xl shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                'Update Password'
                            )}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
