// src/Component/MyPlants.js

import React from 'react';

const MyPlants = ({ plants }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plants.map((plant) => (
                <div key={plant.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <img src={plant.image} alt={plant.name} className="w-full h-48 object-cover rounded mb-4" />
                    <h3 className="text-lg font-semibold text-green-800">{plant.name}</h3>
                    <p className="text-gray-600">₹{plant.price}</p>
                    <p className="text-gray-600">{plant.description}</p>
                </div>
            ))}
        </div>
    );
};

export default MyPlants;
