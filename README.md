
# PlantPros

PlantPros is a web-based platform where users can buy and sell plants. It provides plant enthusiasts with an easy-to-use interface to explore various plant types, connect with sellers, and even sell plants. The platform also allows nursery retailers to create listings and reach a wider audience.

## Features

- **Buy Plants**: Browse and purchase a variety of plants from different sellers.
- **Sell Plants**: Create listings to sell plants with detailed information.
- **Plant Information**: View comprehensive details about different types of plants.
- **Responsive Design**: Optimized for both mobile and desktop viewing.

## Installation

### Prerequisites

- **Node.js** (version >= 14)
- **npm** (version >= 6)
- **MongoDB** (for backend)

### Getting Started

1. **Clone the repository**:

   \`\`\`bash
   git clone https://github.com/username/PlantPros.git
   cd PlantPros
   \`\`\`

2. **Install dependencies**:

   Navigate to both the frontend and backend directories and install dependencies:

   \`\`\`bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   \`\`\`

3. **Set up environment variables**:

   Create a \`.env\` file in the backend directory with the following contents:

   \`\`\`bash
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_URL=your_cloudinary_url
   JWT_SECRET=your_jwt_secret
   \`\`\`

4. **Start the application**:

   To run the app locally, use the following commands:

   \`\`\`bash
   # Start the backend
   cd backend
   npm run dev

   # Start the frontend
   cd ../frontend
   npm start
   \`\`\`

5. **Access the website**:

   Open your browser and navigate to \`http://localhost:3000\`.

## Folder Structure

\`\`\`bash
PlantPros/
│
├── backend/                # Backend server using Node.js and Express
│   ├── config/             # Configuration files (e.g., DB connection, Cloudinary)
│   ├── controllers/        # Logic for handling routes
│   ├── models/             # MongoDB models for Plants, Users, etc.
│   ├── routes/             # API routes for Plants, Users, and Authentication
│   ├── utils/              # Utility functions (e.g., authentication, file upload)
│   ├── .env                # Environment variables (not committed to Git)
│   └── server.js           # Entry point for the backend
│
├── frontend/               # React frontend for PlantPros
│   ├── src/
│   │   ├── assets/         # Static images and other assets
│   │   ├── components/     # Reusable components like Navbar, Footer, etc.
│   │   ├── pages/          # Page components (e.g., Home, Login, Signup, PlantDetails)
│   │   ├── services/       # API service to interact with the backend
│   │   └── App.js          # Main entry point for the React application
│   └── public/             # Public files like index.html
│
└── README.md               # Project documentation
\`\`\`

## Download Link

To download the project directly, [click here](https://github.com/username/PlantPros/archive/refs/heads/main.zip).

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
