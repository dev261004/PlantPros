import Order from '../models/order.model.js'

export const createOrder = async (req, res) => {
    const { cartItems, shippingDetails, totalAmount } = req.body;

    try {
        const newOrder = new Order({
            cartItems,
            shippingDetails,
            totalAmount,
            status: 'Pending', // Set order status to 'Pending' by default
            createdAt: new Date(),
        });

        await newOrder.save();
        res.status(200).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to place the order' });
    }
};

