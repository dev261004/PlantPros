// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    cartItems: [
        {
            id: { type: Number },
            name: { type: String },
            price: { type: Number },
            quantity: { type: Number },
            image: { type: String },
        },
    ],
    shippingDetails: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
    },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
