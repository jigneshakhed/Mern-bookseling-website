import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Mail, User, Calendar, Trash2, MessageSquare } from 'lucide-react';

const ContactMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get('https://mern-bookseling-website-2.onrender.com/api/contact', config);
            setMessages(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching messages:', error);
            setLoading(false);
        }
    };

    const deleteMessage = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                };
                await axios.delete(`https://mern-bookseling-website-2.onrender.com/api/contact/${id}`, config);
                setMessages(messages.filter(msg => msg._id !== id));
            } catch (error) {
                console.error('Error deleting message:', error);
                alert('Failed to delete message');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Contact Messages</h1>
                    <p className="text-gray-500 mt-1">Manage inquiries from your customers</p>
                </div>
                <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold">
                    {messages.length} Messages
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <MessageSquare className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No messages yet</h3>
                    <p className="text-gray-500">When customers contact you, their messages will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {messages.map((msg) => (
                        <div key={msg._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mr-4">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">{msg.name}</h3>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Mail className="w-4 h-4 mr-1" />
                                                {msg.email}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center text-xs text-gray-400">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </div>
                                        <button 
                                            onClick={() => deleteMessage(msg._id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Message"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4 text-gray-700 whitespace-pre-wrap border border-gray-100">
                                    {msg.message}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactMessages;
