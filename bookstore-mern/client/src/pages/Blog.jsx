import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogs';

const Blog = () => {
    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/50 py-12 rounded-3xl backdrop-blur-sm border border-gray-100 shadow-xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        The Bookstore <span className="text-indigo-600">Journal</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        Insights, recommendations, and thoughts on all things reading.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {blogPosts.map(post => (
                        <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 flex flex-col">
                            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-center text-xs text-indigo-500 font-semibold uppercase tracking-wider mb-4">
                                    <span>{post.date}</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-indigo-600 transition-colors">
                                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                </h3>
                                <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>
                                <Link to={`/blog/${post.id}`} className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center transition-colors mt-auto">
                                    Read Full Article
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Blog;
