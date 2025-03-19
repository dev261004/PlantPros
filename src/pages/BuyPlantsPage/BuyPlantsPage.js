import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BuyPlantPage = () => {
    const { plantId } = useParams(); // Get plantId from URL
    const navigate = useNavigate();
    const [plant, setPlant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlantDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/plant/${plantId}`);
                const data = await response.json();

                if (data.success) {
                    setPlant(data.data);
                } else {
                    setError('Failed to load plant details');
                }
            } catch (err) {
                setError('An error occurred while fetching plant details');
                console.error(err);
            }
        };

        fetchPlantDetails();
    }, [plantId]);

    const handleBuy = () => {
        if (!plant) return;
        
        // Proceed with the checkout process
        console.log(`Buying ${quantity} of ${plant.plantName}`);
        navigate('/checkout'); // Redirect to the checkout page
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : !plant ? (
                <div style={{ fontSize: "2rem", textAlign: "center" }}>🌿 Loading Plant Details...</div>
            ) : (
                <div className="plant-details bg-white p-8 rounded shadow-lg max-w-lg mx-auto">
                    <img
                        src={plant.image} // Assuming plant image URL from cloudinary
                        alt={plant.plantName}
                        className="w-full h-64 object-cover rounded mb-4"
                    />
                    <h2 className="text-3xl font-semibold">{plant.plantName}</h2>
                    <p className="text-gray-700">Price: ₹{plant.price}</p>
                    <p className="text-gray-500">{plant.description}</p>

                    <div className="mt-4">
                        <label className="block text-gray-700 mb-2">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            className="w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <button
                        onClick={handleBuy}
                        className="bg-green-500 text-white px-6 py-3 rounded mt-6 hover:bg-green-600 transition duration-300"
                    >
                        Buy Now
                    </button>
                </div>
            )}
        </div>
    );
};

export default BuyPlantPage;
