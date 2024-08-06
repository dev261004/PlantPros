// src/pages/ProductDetails.js

import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const { products } = location.state; // Retrieve products from state

    const product = products.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-5xl font-bold text-green-800 mb-8">{product.name}</h1>
                <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg mb-4" />
                <p className="text-xl text-gray-700 mb-4">{product.description}</p>
                <p className="text-2xl font-bold text-green-800 mb-4">Price: ₹{product.price}</p>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">Add to Cart</button>
                <Link to="/categories" className="text-green-500 hover:underline mt-4 inline-block">Back to Categories</Link>
            </div>
        </div>
    );
};

export default ProductDetails;
