// src/pages/SellerForm.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SellerForm = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        shopName: '',
        shopDescription: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save formData to backend or local storage
        history.push('/seller-dashboard', { formData });
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-green-800 mb-4">Become a Seller</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Shop Name</label>
                        <input
                            type="text"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Shop Description</label>
                        <textarea
                            name="shopDescription"
                            value={formData.shopDescription}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerForm;
