// src/pages/Home.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage1 from '../assets/home6.jpg'; 
import backgroundImage2 from '../assets/home7.jpg';

import Category from "../components/Category/Category";
import StickyDiscount from '../components/StickyDiscount/StickyDiscount.js';
import OurSpecial from '../components/OurSpecial/OurSpecial.js';
import NewsletterSignUp from "../components/NewsletterSignUp/NewsletterSignUp.js";

function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const backgrounds = [backgroundImage1, backgroundImage2]; 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgrounds.length); // Cycle through images
        }, 4000); 

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [backgrounds.length]);
    
        const navigate = useNavigate();
    
        const handleSellPlantsClick = () => {
            navigate('/become-seller');
        }
    return (
        <>
        <div
            className="min-h-screen flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url(${backgrounds[currentImageIndex]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className=" p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-5xl font-bold text-white">Welcome to Plant Marketplace</h1>
                <p className="mt-4 text-xl text-white">
                    Discover a variety of plants to buy and sell.
                    Join our community of plant enthusiasts!
                </p>
                <div className="mt-8">
                    <button className="bg-green-500 text-white px-4 py-2 rounded mr-4">Buy Plants</button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSellPlantsClick}>Sell Plants</button>
                </div>
            </div>
        </div>
                    <Category /> 
                    <StickyDiscount/>
                    <OurSpecial/>
                    <NewsletterSignUp />
        </>
    );
}

export default Home;
