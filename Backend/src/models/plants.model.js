import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
    plantName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // Store the image URL or filename (depending on how you handle image uploads)
        required: true
    },
    nursery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nursery', 

    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        
    },quantity: { type: Number },
    category: { type: String }, // Optional
    sunlight: { type: String }, // Optional
    watering: { type: String }, // Optional
    sku: { type: String }, // Optional
}, { timestamps: true });

const Plant = mongoose.model('Plant', plantSchema);

export default Plant;

