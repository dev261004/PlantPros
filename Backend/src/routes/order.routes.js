import express from 'express';
import { createOrder, getUserOrders } from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/auth.js';

const router = express.Router();

// Create a new order
router.post('/', verifyJWT, createOrder);

// Get all orders for the current user
router.get('/', verifyJWT, getUserOrders);

export default router;
