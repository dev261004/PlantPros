// src/pages/CategoryDetails.js

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/Product/Product';
import indoor from '../assets/indore-plat.jpg';
import cacti from '../assets/cacti-succulents.jpg';

const CategoryDetails = () => {
    const { id } = useParams();

    const [viewType, setViewType] = useState('grid');
    const [sortOption, setSortOption] = useState('name');

    const categories = [
        { id: 1, name: 'Indoor Plants', plants: [
            { id: 1, name: 'Cactus Plant', price: 29.99, description: 'A beautiful cactus plant for your home.', image: indoor },
            { id: 2, name: 'Succulent Plant', price: 19.99, description: 'A low-maintenance succulent plant.', image: cacti },
        ]},
        { id: 2, name: 'Outdoor Plants', plants: [
            { id: 3, name: 'Rose Plant', price: 15.99, description: 'A fragrant rose plant.', image: '../assets/flowering-plant.avif' },
            { id: 4, name: 'Tulip Plant', price: 12.99, description: 'A vibrant tulip plant.', image: '../assets/flowering-plant.avif' },
        ]},
    ];

    const category = categories.find(category => category.id === parseInt(id));

    if (!category) {
        return <div>Category not found</div>;
    }

    const sortedPlants = [...category.plants].sort((a, b) => {
        if (sortOption === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'price') {
            return a.price - b.price;
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-5xl font-bold text-green-800 mb-8">{category.name}</h1>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <button
                        onClick={() => setViewType('grid')}
                        className={`px-4 py-2 rounded ${viewType === 'grid' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    >
                        Grid View
                    </button>
                    <button
                        onClick={() => setViewType('list')}
                        className={`px-4 py-2 rounded ml-2 ${viewType === 'list' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                    >
                        List View
                    </button>
                </div>
                <div>
                    <label className="mr-2">Sort by:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded"
                    >
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>
            <div className={viewType === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col'}>
                {sortedPlants.map(plant => (
                    <Product
                        key={plant.id}
                        image={plant.image}
                        name={plant.name}
                        price={plant.price}
                        description={plant.description}
                        link={{
                            pathname: `/product/${plant.id}`,
                            state: { products: category.plants } 
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryDetails;
