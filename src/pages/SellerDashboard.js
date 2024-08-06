// src/pages/SellerDashboard.js

import React from 'react';
import { useLocation } from 'react-router-dom';

const SellerDashboard = () => {
    const location = useLocation();
    const { formData } = location.state || {}; // Get formData from state

    if (!formData) {
        return <div>No seller details available</div>;
    }

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-green-800 mb-4">Seller Dashboard</h1>
                <h2 className="text-2xl font-semibold text-green-700 mb-2">Welcome, {formData.name}</h2>
                <p className="text-gray-700"><strong>Email:</strong> {formData.email}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {formData.phone}</p>
                <p className="text-gray-700"><strong>Address:</strong> {formData.address}</p>
                <p className="text-gray-700"><strong>Shop Name:</strong> {formData.shopName}</p>
                <p className="text-gray-700"><strong>Shop Description:</strong> {formData.shopDescription}</p>
            </div>
        </div>
    );
};

export default SellerDashboard;
