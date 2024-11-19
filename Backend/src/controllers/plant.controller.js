import Plant from '../models/plants.model.js';// Import the plant model
import cloudinary from 'cloudinary'; // Import Cloudinary SDK for image upload

// Add a new plant to the database
export const addPlants = async (req, res) => {
    try {
        // Destructure the plant data from the request body
        const { plantName, price, description, quantity, category, sunlight, watering, sku } = req.body;

        // Check if the image was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image of the plant.' });
        }

        // Upload the image to Cloudinary and get the URL
        const image = req.file.path; // This is the path returned from Cloudinary

        // Create a new plant document
        const newPlant = new Plant({
            plantName,
            price,
            description,
            image, // Store the image URL from Cloudinary
            quantity,
            category,
            sunlight,
            watering,
            sku,
            nurseryId: req.user.nurseryId // Assuming nurseryId is passed through JWT auth middleware
        });

        // Save the plant to the database
        await newPlant.save();

        // Send a success response
        res.status(201).json({ success: true, message: 'Plant added successfully!', plant: newPlant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get all plants (for the plant listing page)
export const getAllPlants = async (req, res) => {
    try {
        // Fetch all plants from the database
        const plants = await Plant.find();

        // Return the list of plants
        res.status(200).json({ success: true, plants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// Get plants for a specific nursery
export const getPlantsByNursery = async (req, res) => {
    try {
        // Fetch plants associated with the logged-in user's nursery
        const plants = await Plant.find({ nurseryId: req.user.nurseryId });

        // Return the list of plants
        res.status(200).json({ success: true, plants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};
