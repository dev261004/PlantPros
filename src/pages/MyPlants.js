import React, { useState, useEffect } from "react";

const MyPlant = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyPlants = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/v1/plant/my-plants", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include JWT token
                },
            });

            const result = await response.json();

            if (response.ok) {
                setPlants(result.data);
            } else {
                throw new Error(result.message || "Failed to fetch plants");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyPlants();
    }, []);

    return (
        <div className="my-plants-dashboard">
            <h1 className="text-xl font-bold mb-4">My Plants</h1>
            {loading ? (
                <p>Loading plants...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : plants.length > 0 ? (
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
                        </div>
                    ))}
                </div>
            ) : (
                <p>No plants found for your nursery.</p>
            )}
        </div>
    );
};

export default MyPlant;
