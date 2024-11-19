// routes/orderRoutes.js
import express from 'express';
import Order from '../models/order.model.js'; // Assuming you have an Order model in models folder
import { createOrder } from '../controllers/cart.controller.js';

const router = express.Router();

// Create a new order
router.post('/orders', createOrder)

export default router;
