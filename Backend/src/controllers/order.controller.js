import Order from '../models/order.model.js';
import { Cart } from '../models/cart.model.js';

export const createOrder = async (req, res) => {
    try {
        const { cartItems, shippingDetails, totalAmount } = req.body;
        const userId = req.user?._id || req.user?.id;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: 'No cart items provided' });
        }

        // Create the order
        const newOrder = new Order({
            user: userId,
            cartItems: cartItems.map(item => ({
                id: item.id, // Or item.productId depending on how the frontend sends it
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            })),
            shippingDetails,
            totalAmount,
            status: 'Pending',
        });

        const savedOrder = await newOrder.save();

        // Optionally clear the user's cart after successful order creation
        if (userId) {
            await Cart.deleteOne({ userId });
        }

        res.status(200).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server Error: Could not create order' });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Server Error: Could not fetch orders' });
    }
};
