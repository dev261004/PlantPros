import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllPlantPage.css';

const AllPlantPage = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/plant/all-plants');
                const data = await response.json();

                if (data.success) {
                    setPlants(data.data);
                } else {
                    setError('Failed to load plants');
                }
            } catch (err) {
                setError('An error occurred while fetching plants');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPlants();
    }, []);

    const handleBuyClick = (plantId) => {
        navigate(`/buy/${plantId}`);
    };

    const handleAddToCart = (plant) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingPlant = cart.find(item => item._id === plant._id);

        if (existingPlant) {
            existingPlant.quantity += 1;
        } else {
            cart.push({ ...plant, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/cart');
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-4xl font-bold text-green-800 mb-8">All Plants</h1>
            {loading ? (
                <div style={{ fontSize: "2rem", textAlign: "center" }}>🌿 Loading Plants...</div>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="plants-grid grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plants.map((plant) => (
                        <div key={plant._id} className="plant-card border p-4 rounded shadow">
                            <img
                                src={plant.image}
                                alt={plant.plantName}
                                className="mb-2 w-full object-cover rounded"
                            />
                            <h2 className="text-lg font-semibold">{plant.plantName}</h2>
                            <p className="text-gray-700">Price: ₹{plant.price}</p>
                            <p className="text-gray-500">{plant.description}</p>
                            <div className="flex gap-4 mt-4">
                                <button
                                    onClick={() => handleBuyClick(plant._id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                                >
                                    Buy Now
                                </button>
                                <button
                                    onClick={() => handleAddToCart(plant)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllPlantPage;
