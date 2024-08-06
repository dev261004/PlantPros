// src/components/Category.js

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import id from '../../assets/indore-plat.jpg';
import od from '../../assets/outdoor-plant.jpg';
import fp from '../../assets/flowering-plant.avif';
import cs from '../../assets/cacti-succulents.jpg';
import h from '../../assets/herbs.jpeg';
import f from '../../assets/ferns.webp';

const Category = () => {
    const categories = [
        { id: 1, name: 'Indoor Plants', image: id },
        { id: 2, name: 'Outdoor Plants', image: od },
        { id: 3, name: 'Flowering Plants', image: fp },
        { id: 4, name: 'Cacti & Succulents', image: cs },
        { id: 5, name: 'Herbs', image: h },
        { id: 6, name: 'Ferns', image: f },
    ];

    const settings = {
        dots: true, 
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false, 
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const sliderRef = React.useRef(null);

    const goToNext = () => {
        sliderRef.current.slickNext();
    };

    const goToPrev = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="flex justify-center items-center text-3xl font-bold text-green-800 mb-4">Plant Categories</h2>
                <Slider ref={sliderRef} {...settings}>
                    {categories.map((category) => (
                        <div key={category.id} className="flex justify-center items-center px-2">
                            <Link to={`/category/${category.id}`} className="block">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="rounded-lg shadow-lg h-64 object-cover"
                                />
                                <div className="text-center mt-4">
                                    <h3 className="text-lg font-semibold text-green-800">{category.name}</h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
                <div className="flex justify-center mt-6">
                    <button onClick={goToPrev} className="bg-green-500 text-white px-4 py-2 rounded mr-4">
                        Previous
                    </button>
                    <button onClick={goToNext} className="bg-green-500 text-white px-4 py-2 rounded">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Category;
