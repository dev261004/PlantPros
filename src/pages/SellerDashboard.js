import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MyPlants from '../components/MyPlants/MyPlants';

const SellerDashboard = ({ name }) => {
    const [plants, setPlants] = useState([]); // This would ideally come from your backend
    const [showMyPlants, setShowMyPlants] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const handleAddPlant = (newPlant) => {
        setPlants([...plants, newPlant]);
    };

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <h1 className="text-3xl font-bold text-green-800 mb-8">Hi, {name}</h1>
            
            {/* Container for buttons, arranged in a row */}
            <div className="flex space-x-4 mb-4">
                <Link to='/My-plant'
                    onClick={() => setShowMyPlants(!showMyPlants)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {showMyPlants ? 'Hide My Plants' : 'Show My Plants'}
                </Link>
                <Link to="/add-plant" className="bg-green-500 text-white px-4 py-2 rounded">
                    Add New Plant
                </Link>
            </div>

            {/* Show plants if 'Show My Plants' is toggled */}
            {showMyPlants && <MyPlants plants={plants} />}
        </div>
    );
};

export default SellerDashboard;
