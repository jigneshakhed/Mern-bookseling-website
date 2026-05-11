import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Search } from 'lucide-react';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    const [searchInput, setSearchInput] = useState(keyword);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`/api/books?keyword=${keyword}`);
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
            setLoading(false);
        };

        fetchBooks();
    }, [keyword]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setSearchParams({ keyword: searchInput });
        } else {
            setSearchParams({});
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">All Books</h1>
                <form onSubmit={handleSearch} className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search books by title..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Loading books...</div>
            ) : books.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No books found. Try a different search.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {books.map((book) => (
                        <div key={book._id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                            <div className="relative bg-gray-100 flex items-center justify-center h-64">
                                <img src={book.image} alt={book.title} className="max-h-full object-contain p-2" />
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{book.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                                <div className="mt-auto flex justify-between items-center">
                                    <span className="font-bold text-indigo-600">₹{book.price.toFixed(2)}</span>
                                    <Link to={`/books/${book._id}`} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Books;
