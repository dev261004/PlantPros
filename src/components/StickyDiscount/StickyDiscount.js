// src/components/StickyDiscount.js

import React from 'react';
import discountImage from '../../assets/home1.jpg';
import { Link} from "react-router-dom"; // Replace with your discount background image path

const StickyDiscount = () => {
    return (
        <div className="relative" style={{ height: '70vh', backgroundImage: `url(${discountImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h2 className="text-4xl font-bold mb-4">Exclusive Discount!</h2>
                <p className="text-xl mb-4">Get 20% off on all plants</p>
                <Link to="/plants" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Shop Now
                </Link>
            </div>
        </div>
    );
};

export default StickyDiscount;
