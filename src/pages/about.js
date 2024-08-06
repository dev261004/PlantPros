// src/pages/about.js

import React from 'react';

const About = () => {
    return (
        <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-green-800">About Us</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Welcome to Plant Marketplace! We are passionate about bringing you the best selection of plants from various sellers across the globe. Our mission is to connect plant enthusiasts and make it easy to buy and sell plants online.
                </p>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-green-800">Our Vision</h2>
                    <p className="mt-2 text-gray-600">
                        Our vision is to create a thriving community of plant lovers who can share their passion and knowledge about plants. We aim to make plant trading accessible to everyone, everywhere.
                    </p>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-green-800">Our Team</h2>
                    <p className="mt-2 text-gray-600">
                        Our team consists of experienced horticulturists, tech enthusiasts, and customer service professionals dedicated to providing you with the best experience possible.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
