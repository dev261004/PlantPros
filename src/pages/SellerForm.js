// src/pages/SellerForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SellerForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        shopName: '',
        shopDescription: '',
    });
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.shopName) newErrors.shopName = "Shop Name is required";
        if (!formData.shopDescription) newErrors.shopDescription = "Shop Description is required";
        return newErrors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:4000/api/v1/nursery/profile', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token for authorization
                },
            });
    
            if (response.data.redirectTo) {
                // Redirect to seller dashboard if nursery already exists
                navigate(response.data.redirectTo);
            } else {
                // Proceed with the regular redirect after creating a nursery
                navigate('/seller-dashboard', { state: { formData } });
            }
        } catch (error) {
            if (error.response) {
                setServerError(error.response.data.message || "An error occurred.");
            } else {
                setServerError("Server unavailable. Please try again later.");
            }
        }
    };
    

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-green-800 mb-4">Become a Seller</h1>
                <form onSubmit={handleSubmit}>
                    {['name', 'email', 'phone', 'address', 'shopName', 'shopDescription'].map((field) => (
                        <div className="mb-4" key={field}>
                            <label className="block text-gray-700 capitalize">{field.replace('shop', 'Shop ')}</label>
                            <input
                                type={field === 'email' ? 'email' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className={`w-full p-2 border border-gray-300 rounded ${errors[field] ? 'border-red-500' : ''}`}
                                required
                            />
                            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                        </div>
                    ))}
                    {serverError && <p className="text-red-500 text-sm mb-4">{serverError}</p>}
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerForm;


