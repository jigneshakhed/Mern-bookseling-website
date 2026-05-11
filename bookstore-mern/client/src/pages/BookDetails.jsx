import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const BookDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await axios.get(`https://mern-bookseling-website-2.onrender.com/api/books/${id}`);
                setBook(data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
            setLoading(false);
        };

        fetchBook();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(book);
        navigate('/cart');
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!book) return <div className="text-center py-20 text-red-500">Book not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                    <img src={book.image} alt={book.title} className="max-w-full max-h-[500px] object-contain shadow-lg" />
                </div>
                <div className="p-8 md:w-2/3 flex flex-col">
                    <div className="mb-2 text-sm text-indigo-600 font-semibold tracking-wide uppercase">
                        {book.category}
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
                    <p className="text-xl text-gray-500 mb-6">by {book.author}</p>
                    <p className="text-gray-700 mb-8 whitespace-pre-line flex-grow">{book.description}</p>

                    <div className="mt-auto flex items-center justify-between border-t pt-6">
                        <span className="text-3xl font-bold text-gray-900">₹{book.price.toFixed(2)}</span>
                        <button
                            onClick={handleAddToCart}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
