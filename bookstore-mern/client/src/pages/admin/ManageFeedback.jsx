import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, CheckCircle, XCircle, MessageSquare } from 'lucide-react';

const ManageFeedback = () => {
    const { user } = useContext(AuthContext);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const { data } = await axios.get('/api/feedback/admin', config);
            setFeedbacks(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                await axios.delete(`/api/feedback/${id}`, config);
                fetchFeedbacks();
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    const updateStatusHandler = async (id, status) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            await axios.put(`/api/feedback/${id}/status`, { status }, config);
            fetchFeedbacks();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Feedback</h1>
                    <p className="text-gray-600">Review and manage user feedback.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Rating</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Feedback</th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {feedbacks.map((fb) => (
                                <tr key={fb._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(fb.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{fb.name}</div>
                                        <div className="text-sm text-gray-500">{fb.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-4 h-4 ${i < fb.rating ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 line-clamp-2">{fb.comment}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            fb.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            fb.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {fb.status.charAt(0).toUpperCase() + fb.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            {fb.status !== 'approved' && (
                                                <button onClick={() => updateStatusHandler(fb._id, 'approved')} className="text-green-600 hover:text-green-900 bg-green-50 p-2 rounded-lg" title="Approve">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            {fb.status !== 'rejected' && (
                                                <button onClick={() => updateStatusHandler(fb._id, 'rejected')} className="text-yellow-600 hover:text-yellow-900 bg-yellow-50 p-2 rounded-lg" title="Reject">
                                                    <XCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button onClick={() => deleteHandler(fb._id)} className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg" title="Delete">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {feedbacks.length === 0 && (
                        <div className="text-center py-12">
                            <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">No feedback found</h3>
                            <p className="mt-1 text-sm text-gray-500">There are currently no feedback entries to manage.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageFeedback;
