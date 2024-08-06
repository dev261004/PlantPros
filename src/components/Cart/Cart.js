// src/components/Cart.js

import React, { useState, useEffect } from 'react';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const handleQuantityChange = (id, quantity) => {
        const updatedCartItems = cartItems.map(item => 
            item.id === id ? { ...item, quantity: parseInt(quantity) } : item
        );
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleRemoveItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-5xl font-bold text-green-800 mb-8">Shopping Cart</h1>
            {cartItems.length > 0 ? (
                <div>
                    <div className="mb-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-lg">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
                                    <div>
                                        <h2 className="text-lg font-semibold text-green-800">{item.name}</h2>
                                        <p className="text-gray-600">₹{item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="w-16 px-2 py-1 border border-gray-300 rounded mr-4"
                                    />
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold text-green-800 mb-4">Total: ₹{calculateTotal()}</h2>
                            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
