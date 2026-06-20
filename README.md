# 🌿 PlantPros Marketplace

Welcome to **PlantPros**, a comprehensive MERN-stack web application tailored for plant enthusiasts, nurseries, and casual buyers! PlantPros provides a beautiful, modern, and easy-to-use interface to explore, buy, and sell a wide variety of plants. 

## ✨ Key Features

- **🛍️ Buy Plants**: A seamless shopping experience with a dedicated Cart and Checkout system. Add your favorite indoor and outdoor plants and manage your shipping details.
- **🏪 Sell Plants**: Built-in capabilities for nursery retailers or individuals to create plant listings and reach a wider audience.
- **📚 Plant Database**: Detailed information about different types of plants, their care routines (sunlight, watering needs), and pricing.
- **📱 Responsive Design**: Fully optimized UI that adapts gracefully to both mobile devices and desktop screens, featuring modern Tailwind styling.
- **🔐 Secure Authentication**: User registration and login utilizing secure JWT-based authentication.
- **🌱 Data Seeding**: Comes with a built-in `seed.js` script to instantly populate your database with high-quality demo data, including gorgeous plant images.

## 💻 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios, React Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Authentication**: JSON Web Tokens (JWT) & bcrypt

## 🚀 Getting Started

Follow these instructions to get a local copy of PlantPros up and running on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dev261004/PlantPros.git
   cd PlantPros
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**:
   ```bash
   cd Backend
   npm install
   ```

### Environment Variables

Create a `.env` file in the `Backend` directory and add the following keys:

```env
PORT=4000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_URL=your_cloudinary_url_if_applicable
```

### 🪴 Seeding the Database (Optional but Recommended)

To quickly populate your store with plants (like Snake Plant, Monstera, Peace Lily), users, and demo nurseries:
1. Ensure your MongoDB is running and `MONGODB_URL` is set.
2. Register at least one user from the frontend.
3. Run the seed script from the Backend folder:
   ```bash
   cd Backend
   node seed.js
   ```

### Running the Application

To run both the frontend and backend servers simultaneously:

**Start the Backend API (Port 4000)**
```bash
cd Backend
npm run dev
```

**Start the Frontend Client (Port 3000)**
Open a new terminal and run:
```bash
npm run start
```

Navigate to `http://localhost:3000` in your browser to view the application!

## 📂 Project Structure

```text
PlantPros/
│
├── Backend/                 # Express backend server
│   ├── src/                 
│   │   ├── controllers/     # Route logic (Orders, Users, Plants)
│   │   ├── models/          # Mongoose Schemas
│   │   ├── routes/          # Express API endpoints
│   │   └── index.js         # Backend entry point
│   ├── seed.js              # Database population script
│   └── .env                 # Environment config
│
├── src/                     # React frontend
│   ├── components/          # Reusable UI components
│   ├── pages/               # Main route views (Home, Checkout, Profile)
│   ├── App.js               # Main React entry point
│   └── index.css            # Tailwind directives
│
└── public/                  # Static frontend assets (Images, Favicon)
```

## 🤝 Contributing

Contributions are always welcome! If you have any ideas, bug fixes, or enhancements:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
