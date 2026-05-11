import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Plus, Edit, Trash2, X } from 'lucide-react';

const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const { user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        title: '', author: '', description: '', price: '', image: '', category: ''
    });
    const [uploading, setUploading] = useState(false);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append('image', file);
        setUploading(true);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('https://mern-bookseling-website-2.onrender.com/api/upload', uploadData, config);
            setFormData(prev => ({ ...prev, image: data }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const fetchBooks = async () => {
        try {
            const { data } = await axios.get('https://mern-bookseling-website-2.onrender.com/api/books');
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books', error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleOpenModal = (book = null) => {
        if (book) {
            setEditingBook(book);
            setFormData({
                title: book.title, author: book.author, description: book.description,
                price: book.price, image: book.image, category: book.category
            });
        } else {
            setEditingBook(null);
            setFormData({ title: '', author: '', description: '', price: '', image: '', category: '' });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingBook(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };

            if (editingBook) {
                await axios.put(`https://mern-bookseling-website-2.onrender.com/api/books/${editingBook._id}`, formData, config);
            } else {
                await axios.post('https://mern-bookseling-website-2.onrender.com/api/books', formData, config);
            }

            handleCloseModal();
            fetchBooks();
        } catch (error) {
            console.error('Error saving book', error);
            alert('Failed to save book');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`https://mern-bookseling-website-2.onrender.com/api/books/${id}`, config);
                fetchBooks();
            } catch (error) {
                console.error('Error deleting book', error);
                alert('Failed to delete book');
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Manage Books</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
                >
                    <Plus className="h-5 w-5 mr-2" /> Add Book
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded object-cover" src={book.image} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                            <div className="text-sm text-gray-500">{book.author}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{book.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{book.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleOpenModal(book)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(book._id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-lg font-bold text-gray-900">{editingBook ? 'Edit Book' : 'Add New Book'}</h3>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-500">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Author</label>
                                <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea required rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label className="block text-sm font- medium text-gray-700">Price</label>
                                    <input required type="number" step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                                </div>
                                {/*<div className="w-1/2">
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <input required type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
                                </div>*/}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input type="text" placeholder="Enter image URL or upload file" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
                                <input type="file" onChange={uploadFileHandler} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
                                {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button type="button" onClick={handleCloseModal} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-2">Cancel</button>
                                <button type="submit" className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700">{editingBook ? 'Update' : 'Save'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBooks;
