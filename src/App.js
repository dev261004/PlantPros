// src/App.js

import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Cart from './components/Cart/Cart';
import ProductDetails from './pages/ProductDetails';
import Footer from "./components/Footer/Footer";
import SellerForm from './pages/SellerForm';
import SellerDashboard from './pages/SellerDashboard';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Events from "./pages/events";
import AnnualReport from "./pages/annual";
import Teams from "./pages/team";
import Blogs from "./pages/blogs";
import SignUp from "./pages/signup";
import AddPlant from './components/AddPlant/AddPlant';
import CategoryDetails from './pages/CategoryDetails'; 

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/annual" element={<AnnualReport />} />
                        <Route path="/team" element={<Teams />} />
                        <Route path="/blogs" element={<Blogs />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/category/:id" element={<CategoryDetails />} />
                        <Route path="/cart" element={<Cart />} /> 
                        <Route path="/product/:id" Component={ProductDetails} />
                        <Route path="/become-seller" element={<SellerForm />} />
                        <Route path="/seller-dashboard" element={<SellerDashboard/>} />
                        <Route path="/add-plant" element={<AddPlant />} />
                    </Routes>
                    
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
