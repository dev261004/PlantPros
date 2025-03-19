import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_KEY = "sk-wgqV67da6ec4ac1159229"; // Store API key securely
const API_URL = `https://perenual.com/api/v2/species-list?key=${API_KEY}`;

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await axios.get(API_URL);
                setPlants(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching plants:", error);
                setLoading(false);
            }
        };

        fetchPlants();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading plants...</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">🌿 Plant Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {plants.map((plant) => (
                    <div key={plant.id} className="bg-white shadow-md p-4 rounded-lg">
                        <img src={plant.default_image?.thumbnail} alt={plant.common_name} className="w-full h-40 object-cover rounded-lg" />
                        <h3 className="text-lg font-semibold mt-2">{plant.common_name}</h3>
                        <p className="text-gray-600 mt-1">Cycle: {plant.cycle}</p>
                        <button
                            onClick={() => navigate(`/plant/${plant.id}`)}
                            className="mt-3 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            View Full Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlantList;
