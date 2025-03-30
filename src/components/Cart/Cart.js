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
                const token = localStorage.getItem("token");
                //console.log("Stored Token:", token); // Debugging log
    
                const response = await axios.get("http://localhost:4000/api/v1/cart/", {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                });
    
                //console.log("Cart Data:", response.data);
    
                // Fetch product details for each item
                const itemsWithDetails = await Promise.all(
                    response.data.items.map(async (item) => {
                        const productId = item.productId._id;
                        
                        const productResponse = await axios.get(`http://localhost:4000/api/v1/plant/${productId}`);
                       // console.log("productResponse:",productResponse);
                        return {
                            ...item,
                            product: productResponse.data.data, // Add full product details
                        };
                    })
                );
    
                setCartItems(itemsWithDetails);
                setTotal(response.data.totalPrice || 0);
            } catch (error) {
                console.error("Error fetching cart:", error.response?.data || error.message);
            }
        };        
        fetchCart();
    }, [cartItems]);

    // Calculate total price
    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
        setTotal(total);
    };

    // Handle quantity change
    const handleQuantityChange = async (productId, quantity) => {
        try {
            const token = localStorage.getItem("token");
            
            // Ensure quantity is at least 1
            const newQuantity = Math.max(1, parseInt(quantity, 10) || 1);
    
            // Send update request to the backend
            const response = await axios.put(
                `http://localhost:4000/api/v1/cart/update`,
                { productId, quantity: newQuantity },
                {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                }
            );
    
            if (response.status === 200) {
                // Update local state
                const updatedCartItems = cartItems.map(item =>
                    item.productId._id === productId ? { ...item, quantity: newQuantity } : item
                );
    
                setCartItems(updatedCartItems);
                calculateTotal(updatedCartItems);
            }
        } catch (error) {
            console.error("Error updating quantity:", error.response?.data || error.message);
        }
    };
    

    // Handle item removal
    const handleRemoveItem = async (productId) => {
        try {
            console.log("id",productId._id);
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:4000/api/v1/cart/remove/${productId._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  
                    },
                }
            );
            
            if (response.status === 200) {
                const updatedCartItems = cartItems.filter(item => item.productId._id !== productId);
                setCartItems(updatedCartItems);
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
        {cartItems.map((item) => (
            <div key={item.productId} className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                    <img src={item.product?.image} alt={item.product?.name} className="w-24 h-24 object-cover rounded mr-4" />
                    <div>
                        <h2 className="text-lg font-semibold text-green-800">{item.product?.name}</h2>
                        <p className="text-gray-600">₹{item.product?.price}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.productId._id, e.target.value)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded mr-4"
                    />
                    <button
                        onClick={() => handleRemoveItem(item.productId)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                    >
                        Remove
                    </button>
                </div>
            </div>
        ))}
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
