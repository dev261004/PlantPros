/* eslint-disable no-unused-vars */

// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    // Fetch cart from API on component mount
    useEffect(() => {
        const fetchCart = async () => {
            try {
                console.log("Stored Token:", localStorage.getItem('token'));

                const response = await axios.get('http://localhost:4000/api/v1/cart/', {
                    withCredentials: true,  // Ensure cookies are sent
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Send token from localStorage
                    }
                });
        
                setCartItems(response.data.cart.items || []); 
                calculateTotal(response.data.cart.items || []);
            } catch (error) {
                console.error("Error fetching cart:", error.response?.data || error.message);
                setCartItems([]); 
            }
        };
        

        fetchCart();
    }, []);

    // Calculate total price
    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
        setTotal(total);
    };

    // Handle quantity change
    const handleQuantityChange = async (id, quantity) => {
        const updatedCartItems = cartItems.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, parseInt(quantity, 10) || 1) } : item
        );

        setCartItems([...updatedCartItems]);
        calculateTotal(updatedCartItems);

        try {
            await axios.put(`http://localhost:4000/api/v1/cart/update`, { id, quantity });
        } catch (error) {
            console.error("Error updating quantity:", error.response?.data || error.message);
        }
    };

    // Handle item removal
    const handleRemoveItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/v1/cart/remove/${id}`);

            if (response.status === 200) {
                const updatedCartItems = cartItems.filter(item => item.id !== id);
                setCartItems(updatedCartItems);
                calculateTotal(updatedCartItems);
            }
        } catch (error) {
            console.error('Error removing item:', error.response?.data || error.message);
        }
    };

    // Handle checkout
    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/cart/checkout', { cartItems });

            if (response.status === 200) {
                alert('Checkout successful!');
                setCartItems([]);
            }
        } catch (error) {
            console.error('Checkout error:', error.response?.data || error.message);
            alert(`Error during checkout: ${error.response?.data?.message || error.message}`);
        }
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
                            <h2 className="text-2xl font-semibold text-green-800 mb-4">Total: ₹{total}</h2>
                            <button
                                onClick={handleCheckout}
                                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                            >
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
