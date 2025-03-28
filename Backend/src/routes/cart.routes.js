import express from "express";
import {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../controllers/cart.controller.js";

import {verifyJWT} from '../middlewares/auth.js'; // Assuming authentication middleware

const router = express.Router();

router.get("/", verifyJWT, getCart);
router.post("/add", verifyJWT, addToCart);
router.put("/update", verifyJWT, updateCartItem);
router.delete("/remove/:productId", verifyJWT, removeCartItem);
router.delete("/clear", verifyJWT, clearCart);

export default router;
