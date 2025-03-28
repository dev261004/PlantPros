import {Cart} from "../models/cart.model.js";
import Plant from "../models/plants.model.js"; // Assuming you have a Plant model
import mongoose from "mongoose";
// Get Cart by User ID
export const getCart = async (req, res) => {
    try {
        const userId = req.user?.id || req.query.userId;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Add Item to Cart

export const addToCart = async (req, res) => {
    try {
        // console.log("Received Data:", req.body); // Log request data
        // console.log("User ID from req.user:", req.user?.id); 
        const { productId, quantity } = req.body;
        const userId = req.user?.id || req.body.userId; // Extract userId correctly

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // Convert `productId` from string to ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid productId format" });
        }
        const productObjectId = new mongoose.Types.ObjectId(productId);

        // Fetch the product price
        const product = await Plant.findById(productObjectId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId: productObjectId, quantity }],
                totalPrice: product.price * quantity  // ✅ Set initial total price
            });
        } else {
            let existingItem = cart.items.find(item => item.productId.equals(productObjectId));
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId: productObjectId, quantity });
            }

            // ✅ Recalculate total price
            const totalPriceArray = await Promise.all(cart.items.map(async (item) => {
                const prod = await Plant.findById(item.productId);
                return prod ? prod.price * item.quantity : 0;
            }));
            
            // Sum up the total price
            cart.totalPrice = totalPriceArray.reduce((acc, price) => acc + price, 0);
        }

        await cart.save();
        res.status(201).json({ message: "Item added to cart successfully", cart });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Error adding to cart", error });
    }
};

// Update Cart Item Quantity
export const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId"); // ✅ Populate productId

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(item => item.productId._id.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity = quantity;

        // ✅ Recalculate total price after updating the quantity
        cart.totalPrice = cart.items.reduce((acc, item) => {
            return acc + item.quantity * (item.productId.price || 0);
        }, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Error updating cart", error });
    }
};


// Remove Item from Cart
export const removeCartItem = async (req, res) => {
    const { productId } = req.params;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required in the request parameters" });
    }

    try {
        let cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        console.log("Cart Items Before Removal:", cart.items.map(item => item.productId._id.toString())); 
        console.log("Product ID to Remove:", productId);

        // Check if the item exists before removing it
        const itemExists = cart.items.some(item => item.productId._id.toString() === productId);

        if (!itemExists) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        // Remove the item
        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);
        cart.markModified("items"); // Ensure Mongoose tracks the update

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error removing item:", error);
        res.status(500).json({ message: "Error removing item", error });
    }
};


// Clear Cart
export const clearCart = async (req, res) => {
    try {
        // Find the user's cart
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        await Cart.deleteOne({ userId: req.user.id });

        return res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        return res.status(500).json({ message: "Error clearing cart", error: error.message });
    }
};

