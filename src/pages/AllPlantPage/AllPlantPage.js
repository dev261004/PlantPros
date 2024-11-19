import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AllPlantPage.css'

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
        navigate(`/buy/${plantId}`); // Redirect to buy page for this specific plant
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-4xl font-bold text-green-800 mb-8">All Plants</h1>
            {loading ? (
                <p>Loading plants...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="plants-grid grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plants.map((plant) => (
                        <div key={plant._id} className="plant-card border p-4 rounded shadow">
                        <img
                            src={plant.image} // Assuming cloudinary URL is stored in plant.image
                            alt={plant.plantName}
                            className="mb-2 w-full object-cover rounded"
                        />
                        <h2 className="text-lg font-semibold">{plant.plantName}</h2>
                        <p className="text-gray-700">Price: ₹{plant.price}</p>
                        <p className="text-gray-500">{plant.description}</p>
                        <button
                            onClick={() => handleBuyClick(plant._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mt-4"
                        >
                            Buy Plant
                        </button>
                    </div>
                    
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllPlantPage;
