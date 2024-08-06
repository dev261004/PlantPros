// src/components/OurSpecial.js

import React from 'react';
import { useInView } from 'react-intersection-observer';
import specialImage from '../../assets/service-img.jpg'; 
import icon1 from '../../assets/service-icon1.png';
import icon2 from '../../assets/service-icon2.png';
import icon3 from '../../assets/service-icon3.png';
import icon4 from '../../assets/service-icon4.png';
import icon5 from '../../assets/service-icon5.png';
import icon6 from '../../assets/service-icon6.png';
import IconWithBackground from './IconWithBackground';
import './OurSpecial.css'; 

const OurSpecial = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="flex flex-col items-center my-16">
            <h2 className="text-3xl font-bold text-green-800 mb-8" ref={ref}>
                Our Special
            </h2>
            <div className="flex flex-row justify-center items-center w-full max-w-5xl relative">
                <div className={`flex flex-col items-end pr-8 w-1/3 space-y-4 text-right transition-transform duration-700 ${inView ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
                    <div className="flex items-center space-x-2">
                        <IconWithBackground icon={icon1} />
                        <p>Best Offer</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IconWithBackground icon={icon2} />
                        <p>Good Quality</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IconWithBackground icon={icon3} />
                        <p>Trustable Seller</p>
                    </div>
                </div>
                <div className="flex justify-center w-1/3 relative">
                    <img src={specialImage} alt="Special" className=" w-100 object-cover" />
                    <div className="absolute  flex flex-col items-center justify-center  text-white">
                        <h2 className="text-4xl mt-20 font-bold mb-1">PlantPros</h2>
                        <button className="bg-green-500 text-white px-4 py-2 mt-10 rounded">Buy Now</button>
                    </div>
                </div>
                <div className={`flex flex-col items-start pl-8 w-1/3 space-y-4 text-left transition-transform duration-700 ${inView ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                    <div className="flex items-center space-x-2">
                        <IconWithBackground icon={icon4} />
                        <p>Free Shipping</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IconWithBackground icon={icon5} />
                        <p>Big Discount</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <IconWithBackground icon={icon6} />
                        <p>Easy Returns</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurSpecial;
