// src/components/Checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutPage= () => {
    // Example cart items hardcoded (for the sake of this example)
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Aloe Vera',
            price: 150,
            quantity: 2,
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Bamboo Plant',
            price: 300,
            quantity: 1,
            image: 'https://via.placeholder.com/150',
        },
    ]);

    const [shippingDetails, setShippingDetails] = useState({
        name: '',
        address: '',
        phone: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    // Calculate total amount
    useEffect(() => {
        const total = cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotalAmount(total);
    }, [cartItems]);

    const handleChange = (e) => {
        setShippingDetails({
            ...shippingDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.phone) {
            setError('Please fill in all shipping details.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/orders', {
                cartItems,
                shippingDetails,
                totalAmount,
            });

            if (response.status === 200) {
                setSuccess(true);
                setShippingDetails({ name: '', address: '', phone: '' });
            }
        } catch (error) {
            setError('Error during checkout. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-5xl font-bold text-green-800 mb-8">Checkout</h1>

            {success ? (
                <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl text-green-700">Order placed successfully!</h2>
                    <p className="text-green-600">Thank you for your purchase!</p>
                </div>
            ) : (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold text-green-700 mb-4">Order Summary</h2>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded mr-4"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-gray-600">
                                                ₹{item.price} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="flex justify-between mt-4 border-t pt-4">
                                <h3 className="text-lg font-semibold text-green-700">Total:</h3>
                                <p className="text-lg font-semibold text-green-700">₹{totalAmount}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-green-700 mb-4">Shipping Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={shippingDetails.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Shipping Address"
                                value={shippingDetails.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={shippingDetails.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            {error && <p className="text-red-500">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
                            >
                                Complete Order
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
