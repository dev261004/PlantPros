// src/components/NewsletterSignUp.js

import React from 'react';

const NewsletterSignUp = () => {
    return (
        <div className="flex flex-col items-center my-16">
            <div className="flex justify-between w-full px-8">
                <div className="flex items-center">
                    <h2 className="text-2xl font-bold text-green-800">Sign Up For Newsletter</h2>
                </div>
                <div className="flex items-center ">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-96 px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button className=" absolute bg-green-500 text-white right-0  px-4 py-2.5 mx-8 rounded-3xl hover:bg-green-600 transition duration-300">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSignUp;
