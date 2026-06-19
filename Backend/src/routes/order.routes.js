import express from 'express';
import { createOrder } from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/auth.js';

const router = express.Router();

// Create a new order
router.post('/', verifyJWT, createOrder);

export default router;
