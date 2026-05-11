import React from 'react';

const About = () => {
    return (
        <div className="bg-gray-50 py-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Our Story
                    </h1>
                    <p className="text-lg text-gray-500">
                        Pioneering the modern way to discover, read, and share the written word.
                    </p>
                </div>

                {/* Content Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-100 transform translate-x-4 translate-y-4 rounded-3xl -z-10"></div>
                        <img
                            src="/uploads/image-1771675390148.jpg"
                            alt="Library Collection"
                            className="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">More than just a Bookstore</h2>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Welcome to BookStore, your premier destination for finding the best books online. We believe in the power of reading and its ability to transform lives, inspire minds, and provide an escape into entirely different worlds.
                        </p>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Our mission is to make reading accessible to everyone by providing a vast selection of books at affordable prices. Whether you're looking for the latest bestseller, a classic novel, or a niche non-fiction title, we have something specifically curated for you.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="border-l-4 border-indigo-600 pl-4">
                                <p className="text-3xl font-black text-gray-900 mb-1">1M+</p>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Happy Readers</p>
                            </div>
                            <div className="border-l-4 border-indigo-600 pl-4">
                                <p className="text-3xl font-black text-gray-900 mb-1">50k+</p>
                                <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Curated Titles</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
