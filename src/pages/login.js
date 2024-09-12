import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { IoChevronBack } from 'react-icons/io5';

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-4">
            <div className="relative w-full max-w-sm">
                <img
                    src="https://your-image-url.com/leaf-background.jpg"
                    alt="leaf background"
                    className="absolute top-0 left-0 w-full h-48 object-cover rounded-t-lg"
                />
                <Link to="/" className="absolute top-2 left-2 bg-white p-1 rounded-full shadow">
                    <IoChevronBack className="text-green-600" size={24} />
                </Link>
                <div className="relative bg-white p-8 rounded-lg shadow-lg pt-48">
                    <h2 className="text-3xl font-bold text-green-800 text-center mb-2">Welcome Back</h2>
                    <p className="text-gray-500 text-center mb-6">Login to your account ?</p>
                    <form>
                        <div className="mb-4">
                            <div className="flex items-center bg-green-100 p-2 rounded">
                                <FaUserAlt className="w-6 h-6 text-green-600" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="bg-green-100 w-full pl-2 outline-none"
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center bg-green-100 p-2 rounded">
                                <FaLock className="w-6 h-6 text-green-600" />
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Password"
                                    className="bg-green-100 w-full pl-2 outline-none"
                                />
                                <button type="button" onClick={togglePasswordVisibility}>
                                    {passwordVisible ? <FiEyeOff className="text-green-600" /> : <FiEye className="text-green-600" />}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <label className="flex items-center text-gray-500">
                                <input type="checkbox" className="form-checkbox text-green-600" />
                                <span className="ml-2">Remember Me</span>
                            </label>
                            <Link to="/forgot-password" className="text-green-600 hover:underline">Forgot password?</Link>
                        </div>
                        <button className="bg-green-500 text-white w-full py-2 rounded-lg font-semibold">Login</button>
                    </form>
                    <p className="text-center text-gray-500 mt-6">
                        Don’t have an account? <Link to="/sign-up" className="text-green-600 font-semibold hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
