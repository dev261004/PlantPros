// controllers/plantController.js
import Plant from '../models/plants.model.js';
import mongoose from "mongoose";

const addPlant = async (req, res) => {
    try {
        const { plantName, price, description } = req.body;

        // The Cloudinary URL is provided by multer-storage-cloudinary
        const image = req.file.path; // Path returned by multer with Cloudinary

        const userId = req.user._id;
        const nurseryId = req.user.nursery; // Assuming the user model has this reference

        const plant = await Plant.create({
            plantName,
            price,
            description,
            image, // Store the Cloudinary URL
            seller: userId,
            nursery: nurseryId,
        });

        res.status(201).json({
            success: true,
            message: "Plant added successfully",
            data: plant,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};


const getPlantsByNursery = async (req, res) => {
    try {
        const nurseryId = req.user.nursery; // Ensure `nursery` is assigned in `verifyJWT`

        if (!nurseryId) {
            return res.status(400).json({
                success: false,
                message: "Nursery ID is required",
            });
        }

        const plants = await Plant.find({ nursery: nurseryId });

        res.status(200).json({
            success: true,
            message: "Plants retrieved successfully",
            data: plants,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Server Error",
        });
    }
};
 const getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.find();
        res.status(200).json({
            success: true,
            data: plants,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};
const getPlantById = async (req, res) => {
    const { plantId } = req.params;
    //console.log("planid:",plantId) // Get plantId from request parameters
    if (!mongoose.Types.ObjectId.isValid(plantId)) {
        return res.status(400).json({ error: "Invalid Product ID" });
    }

    try {
        const plant = await Plant.findById(plantId); // Find plant by ID
        if (!plant) {
            return res.status(404).json({
                success: false,
                message: 'Plant not found',
            });
        }

        res.status(200).json({
            success: true,
            data: plant,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

export { addPlant ,getPlantsByNursery,getAllPlants,getPlantById};




