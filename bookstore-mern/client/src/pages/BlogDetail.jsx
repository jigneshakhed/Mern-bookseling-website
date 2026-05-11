import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogs';

const BlogDetail = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!post) {
        return (
            <div className="bg-gray-50 py-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
                    <p className="text-gray-600 mb-8">The blog article you are looking for does not exist.</p>
                    <Link to="/blog" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link to="/blog" className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center inline-flex">
                        <svg className="w-4 h-4 mr-2 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        Back to Blog
                    </Link>
                </div>

                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
                    
                    <div className="p-8 md:p-12">
                        <div className="flex justify-between items-center text-sm text-indigo-500 font-semibold uppercase tracking-wider mb-6">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                            {post.title}
                        </h1>
                        
                        <div 
                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
