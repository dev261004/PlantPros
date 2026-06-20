import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/models/user.model.js';
import Plant from './src/models/plants.model.js';
import Order from './src/models/order.model.js';
import { addressModel } from './src/models/address.model.js';
import Nursery from './src/models/nursery.model.js';

dotenv.config();

const plantsData = [
    {
        plantName: "Monstera Deliciosa",
        price: 899,
        description: "Known for its iconic split leaves, the Monstera Deliciosa is a statement plant that brings a lush tropical vibe to any space.",
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=60",
        quantity: 15,
        category: "Indoor",
        sunlight: "Indirect Sunlight",
        watering: "Once a week",
        sku: "MON-DEL-001"
    },
    {
        plantName: "Snake Plant (Laurentii)",
        price: 499,
        description: "An incredibly hardy plant with upright, sword-like leaves edged in vibrant yellow. Excellent air purifier and very low maintenance.",
        image: "/images/snake_plant.png",
        quantity: 25,
        category: "Low Light",
        sunlight: "Low to bright light",
        watering: "Every 2-3 weeks",
        sku: "SNA-LAU-002"
    },
    {
        plantName: "Fiddle Leaf Fig",
        price: 1499,
        description: "Features large, heavily veined, violin-shaped leaves. Highly sought after by designers for its dramatic, tree-like appearance.",
        image: "/images/fiddle_leaf_fig.png",
        quantity: 8,
        category: "Indoor Tree",
        sunlight: "Bright, filtered light",
        watering: "When top soil is dry",
        sku: "FID-FIG-003"
    },
    {
        plantName: "Aloe Vera Premium",
        price: 349,
        description: "A functional succulent famed for its soothing gel. Thrives in sunny spots and requires minimal watering.",
        image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=800&auto=format&fit=crop&q=60",
        quantity: 30,
        category: "Succulents",
        sunlight: "Bright direct sunlight",
        watering: "Every 3 weeks",
        sku: "ALO-VER-004"
    },
    {
        plantName: "Peace Lily (Spathiphyllum)",
        price: 599,
        description: "Elegant dark green leaves with beautiful white blooms. Signals when it needs water by drooping slightly, making care easy.",
        image: "/images/peace_lily.png",
        quantity: 12,
        category: "Flowering Plants",
        sunlight: "Medium indirect light",
        watering: "Keep soil moist",
        sku: "PEA-LIL-005"
    },
    {
        plantName: "Boston Fern",
        price: 649,
        description: "Feathery, arching fronds that look gorgeous in hanging baskets. Prefers high humidity and dappled shade.",
        image: "/images/boston_fern.png",
        quantity: 10,
        category: "Ferns",
        sunlight: "Indirect light / Shade",
        watering: "Regular misting & damp soil",
        sku: "BOS-FER-006"
    },
    {
        plantName: "Golden Pothos",
        price: 299,
        description: "A fast-growing trailing vine with heart-shaped leaves variegated in green and yellow. Perfect for shelves or hanging pots.",
        image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=800&auto=format&fit=crop&q=60",
        quantity: 40,
        category: "Trailing",
        sunlight: "Adaptable",
        watering: "Once a week",
        sku: "GOL-POT-007"
    },
    {
        plantName: "Calathea Roseopicta",
        price: 799,
        description: "Exquisite patterned leaves that fold up at night. A stunning decorative houseplant that appreciates clean, filtered water.",
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=60",
        quantity: 14,
        category: "Indoor",
        sunlight: "Medium indirect light",
        watering: "Keep consistently moist",
        sku: "CAL-ROS-008"
    }
];

const addressesData = [
    {
        name: "Dev Agrawal",
        phone: "9876543210",
        pinCode: "380009",
        address: "402, Green Valley Apartments, Near Nehru Park, Vastrapur",
        landmark: "Opposite Lake Garden",
        city: "Ahmedabad",
        state: "Gujarat",
        setAsDefault: true
    },
    {
        name: "Dev Agrawal (Office)",
        phone: "9123456789",
        pinCode: "400013",
        address: "12th Floor, Tech Hub Tower B, Lower Parel",
        landmark: "Next to Metro Station",
        city: "Mumbai",
        state: "Maharashtra",
        setAsDefault: false
    }
];

const seed = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Connected to: ${conn.connection.host}`);

        // Find existing users
        const users = await User.find({});
        if (users.length === 0) {
            console.log("❌ No users found in the database. Please register a user first through the frontend so we can seed data for them.");
            process.exit(1);
        }

        console.log(`Found ${users.length} user(s). Seeding data for the first user: ${users[0].username} (${users[0].email})`);
        const primaryUser = users[0];

        // 1. Seed Nursery
        console.log("Seeding Nursery...");
        await Nursery.deleteMany({});
        const nursery = await Nursery.create({
            name: "Green Horizon Nursery",
            email: "nursery@greenhorizon.com",
            phone: "+91 9988776655",
            address: "Highway Road, Gandhinagar, Gujarat",
            shopName: "Green Horizon Store",
            shopDescription: "Your local destination for premium plants, organic soils, and garden accessories.",
            user: primaryUser._id
        });
        console.log("✅ Seeded Nursery successfully.");

        // 2. Seed Plants
        console.log("Seeding Plants...");
        await Plant.deleteMany({});
        const plantsToInsert = plantsData.map(p => ({
            ...p,
            nursery: nursery._id,
            seller: primaryUser._id
        }));
        const seededPlants = await Plant.insertMany(plantsToInsert);
        console.log(`✅ Seeded ${seededPlants.length} plants.`);

        // 3. Seed Addresses
        console.log("Seeding Addresses...");
        await addressModel.deleteMany({ user: primaryUser._id });
        const addressesToInsert = addressesData.map(addr => ({
            ...addr,
            user: primaryUser._id
        }));
        const seededAddresses = await addressModel.insertMany(addressesToInsert);
        console.log(`✅ Seeded ${seededAddresses.length} addresses for user ${primaryUser.username}.`);

        // 4. Seed Orders
        console.log("Seeding Orders...");
        await Order.deleteMany({ user: primaryUser._id });

        const order1 = {
            user: primaryUser._id,
            cartItems: [
                {
                    id: seededPlants[0]._id.toString(),
                    name: seededPlants[0].plantName,
                    price: seededPlants[0].price,
                    quantity: 1,
                    image: seededPlants[0].image
                },
                {
                    id: seededPlants[3]._id.toString(),
                    name: seededPlants[3].plantName,
                    price: seededPlants[3].price,
                    quantity: 2,
                    image: seededPlants[3].image
                }
            ],
            shippingDetails: {
                name: seededAddresses[0].name,
                address: `${seededAddresses[0].address}, ${seededAddresses[0].city}, ${seededAddresses[0].state} - ${seededAddresses[0].pinCode}`,
                phone: seededAddresses[0].phone
            },
            totalAmount: seededPlants[0].price + (seededPlants[3].price * 2),
            status: "Delivered",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        };

        const order2 = {
            user: primaryUser._id,
            cartItems: [
                {
                    id: seededPlants[2]._id.toString(),
                    name: seededPlants[2].plantName,
                    price: seededPlants[2].price,
                    quantity: 1,
                    image: seededPlants[2].image
                }
            ],
            shippingDetails: {
                name: seededAddresses[0].name,
                address: `${seededAddresses[0].address}, ${seededAddresses[0].city}, ${seededAddresses[0].state} - ${seededAddresses[0].pinCode}`,
                phone: seededAddresses[0].phone
            },
            totalAmount: seededPlants[2].price,
            status: "Pending",
            createdAt: new Date() // Today
        };

        const order3 = {
            user: primaryUser._id,
            cartItems: [
                {
                    id: seededPlants[1]._id.toString(),
                    name: seededPlants[1].plantName,
                    price: seededPlants[1].price,
                    quantity: 1,
                    image: seededPlants[1].image
                },
                {
                    id: seededPlants[6]._id.toString(),
                    name: seededPlants[6].plantName,
                    price: seededPlants[6].price,
                    quantity: 1,
                    image: seededPlants[6].image
                }
            ],
            shippingDetails: {
                name: seededAddresses[1].name,
                address: `${seededAddresses[1].address}, ${seededAddresses[1].city}, ${seededAddresses[1].state} - ${seededAddresses[1].pinCode}`,
                phone: seededAddresses[1].phone
            },
            totalAmount: seededPlants[1].price + seededPlants[6].price,
            status: "Shipped",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        };

        await Order.insertMany([order1, order2, order3]);
        console.log("✅ Seeded 3 Orders successfully.");

        console.log("🎉 Seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

seed();
