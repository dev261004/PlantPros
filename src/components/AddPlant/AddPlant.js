// src/components/AddPlant.js

import React, { useState } from 'react';

const AddPlant = () => {
    const [plantName, setPlantName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission and add plant details
        console.log({
            plantName,
            price,
            description,
            image
        });
        // After submission, you might want to redirect or clear the form
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-4xl font-bold text-green-800 mb-8">Add New Plant</h1>
            <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Plant Name</label>
                    <input 
                        type="text" 
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter plant name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input 
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter price"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter plant description"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Plant Image</label>
                    <input 
                        type="file"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                    Add Plant
                </button>
            </form>
        </div>
    );
};

export default AddPlant;
