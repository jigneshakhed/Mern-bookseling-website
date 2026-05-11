import React from 'react';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';

const Analytics = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Store Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                        <DollarSign className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">₹45,231</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">1,254</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Active Users</p>
                        <p className="text-2xl font-bold text-gray-900">892</p>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6 flex items-center">
                    <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                        <BarChart3 className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Conversion Rate</p>
                        <p className="text-2xl font-bold text-gray-900">3.2%</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Sales Overview (Monthly)</h2>
                <div className="h-64 flex items-end space-x-2 border-b border-l border-gray-200 p-4">
                    {/* Placeholder for a chart */}
                    <div className="w-1/12 bg-indigo-500 rounded-t h-1/4 hover:bg-indigo-600 transition-colors title='Jan'"></div>
                    <div className="w-1/12 bg-indigo-500 rounded-t h-1/2 hover:bg-indigo-600 transition-colors title='Feb'"></div>
                    <div className="w-1/12 bg-indigo-500 rounded-t h-1/3 hover:bg-indigo-600 transition-colors title='Mar'"></div>
                    <div className="w-1/12 bg-indigo-500 rounded-t h-2/3 hover:bg-indigo-600 transition-colors title='Apr'"></div>
                    <div className="w-1/12 bg-indigo-500 rounded-t h-3/4 hover:bg-indigo-600 transition-colors title='May'"></div>
                    <div className="w-1/12 bg-indigo-500 rounded-t h-full hover:bg-indigo-600 transition-colors title='Jun'"></div>
                    <div className="flex-1 flex items-center justify-center text-gray-400">Chart Data</div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500 px-4">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
