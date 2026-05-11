import React, { useState } from 'react';

const Settings = () => {
    const [storeName, setStoreName] = useState('BookStore MERN');
    const [email, setEmail] = useState('admin@bookstore.com');
    const [currency, setCurrency] = useState('INR');

    const handleSave = (e) => {
        e.preventDefault();
        alert('Settings saved successfully!');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Store Settings</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <form onSubmit={handleSave} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Name</label>
                        <input
                            type="text"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Store Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="INR">Indian Rupee (₹)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="EUR">Euro (€)</option>
                            <option value="GBP">British Pound (£)</option>
                        </select>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
