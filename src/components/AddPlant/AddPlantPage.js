import React, { useState } from 'react';

const AddPlantPage = () => {
    const [plantName, setPlantName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [sunlight, setSunlight] = useState('');
    const [watering, setWatering] = useState('');
    const [category, setCategory] = useState('');
    const [sku, setSku] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!plantName || !price || !description || !image) {
            setError('Please fill in all fields.');
            return;
        }

        const formData = new FormData();
        formData.append('plantName', plantName);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('quantity', quantity);
        formData.append('sunlight', sunlight);
        formData.append('watering', watering);
        formData.append('category', category);
        formData.append('sku', sku);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:4000/api/v1/plant/add-plant', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(true);
                setError(null);
            } else {
                setSuccess(false);
                setError(data.message || 'Something went wrong.');
            }
        } catch (err) {
            setSuccess(false);
            setError('An error occurred while adding the plant.');
            console.error(err);
        }
    };

    return (
        <div className="add-plant-form container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Add a New Plant</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Plant added successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="plantName" className="block">Plant Name</label>
                    <input
                        type="text"
                        id="plantName"
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block">Price (₹)</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageUpload}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="sunlight" className="block">Sunlight Requirement</label>
                    <input
                        type="text"
                        id="sunlight"
                        value={sunlight}
                        onChange={(e) => setSunlight(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="watering" className="block">Watering Schedule</label>
                    <input
                        type="text"
                        id="watering"
                        value={watering}
                        onChange={(e) => setWatering(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block">Category</label>
                    <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="sku" className="block">SKU (Stock Keeping Unit)</label>
                    <input
                        type="text"
                        id="sku"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-green-500 text-white p-3 rounded">Add Plant</button>
            </form>
        </div>
    );
};

export default AddPlantPage;
