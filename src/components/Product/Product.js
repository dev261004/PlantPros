import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ id, image, name, price, description, link }) => {
    const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cartItems.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ id, name, price, image, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cartItems));
        alert(`${name} added to cart!`);
    };

    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-white flex">
            <img src={image} alt={name} className="w-48 h-48 object-cover rounded mr-4" />
            <div className="flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-green-800">{name}</h3>
                    <p className="text-gray-600">{description}</p>
                </div>
                <div className="mt-4">
                    <p className="text-xl font-bold text-green-800">₹{price}</p>
                    <Link to={link} className="text-green-500 hover:underline mt-2 inline-block">View Details</Link>
                    <button
                        onClick={handleAddToCart}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2 hover:bg-green-600 transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
