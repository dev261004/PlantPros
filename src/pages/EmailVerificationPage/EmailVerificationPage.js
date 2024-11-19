import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Email is required');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/v1/nursery/verify-nursery-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (result.success) {
                if (result.exists) {
                    // Redirect to seller dashboard if nursery exists
                    navigate('/seller-dashboard');
                } else {
                    // Redirect to seller form if nursery does not exist
                    navigate('/become-seller');
                }
            } else {
                setError(result.message || 'An error occurred');
            }
        } catch (err) {
            setError('Failed to verify email');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-8">
            <div className="bg-white p-8 rounded shadow-lg max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-center mb-4">Verify Your Email</h2>
                <form onSubmit={handleEmailSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Enter your email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    >
                        Verify Email
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
