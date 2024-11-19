// src/components/AddPlant.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddPlant = () => {
    const navigate = useNavigate();
    const [plantName, setPlantName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload._id;
        }
        return null;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const userId = getUserIdFromToken();

        if (!userId) {
            alert('User is not authenticated');
            return;
        }

        const formData = new FormData();
        formData.append('plantName', plantName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('userId', userId);

        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:4000/api/v1/plant/add-plant', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                alert('Plant added successfully!');
                navigate('/My-plant');
            } else {
                alert(result.message || 'Failed to add the plant.');
            }
        } catch (error) {
            console.error('Error adding plant:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
        } else {
            alert("Please upload a valid image file.");
        }
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
                <button 
                    type="submit" 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? "Adding..." : "Add Plant"}
                </button>
            </form>
        </div>
    );
};



export default AddPlant;

