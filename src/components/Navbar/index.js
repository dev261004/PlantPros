import React, { useState, useEffect } from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./navbarElements";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";


const Navbar = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    // Check if the user is logged in (you can store the user token or authentication state in localStorage)
    useEffect(() => {
      const token = localStorage.getItem("token"); 
      if (token) {
        setIsAuthenticated(true);
      }
    }, []);
  
    const handleLogout = () => {
      localStorage.removeItem("token"); // Clear the auth token or user data
      setIsAuthenticated(false);
      navigate("/"); // Redirect to home after logout
    };

    const [cartItems, setCartItems] = useState([]);

    // Fetch Cart Items Count from Backend (or Local Storage)
    useEffect(() => {
        const fetchCart = async () => {
            try {
              const token = localStorage.getItem("token");
              const response = await axios.get("http://localhost:4000/api/v1/cart/", {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            });
            console.log("Response:", response.data.items.length);
            setCartItems(response.data.items || []); 
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCart();
    }, [cartItems]);
  
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/events">Events</NavLink>
                    <NavLink to="/plant-info">PlantInfo</NavLink>
                 
                </NavMenu>
                  
                <div className="flex items-center space-x-6"> 
                {/* Cart Icon with Proper Spacing */}
                <Link to="/cart" className="relative text-white hover:text-gray-300 mr-6">
                    <FaShoppingCart size={24} />
                    {cartItems.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cartItems.length}
                        </span>
                    )}
                </Link>
                </div>

                
                {isAuthenticated ? (
                    <div className="flex ijustify-center items-center">
                    <Link to="/profile">
                      <img src="./image.png" alt="User Profile"  className="w-10 h-10 rounded-full object-cover transition-all duration-300 ease-in-out hover:scale-110" />
                    </Link>
                    <button onClick={handleLogout} className="whitespace-nowrap rounded-xl bg-blue-700 px-5 py-3 font-medium text-white">Logout</button>
                  </div>
                ) : (
                  <>
                   <NavBtn>
                    <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
                    <NavBtnLink to="/login">Login</NavBtnLink>
                </NavBtn>
                  </>
                )}
               
            </Nav>
        </>
    );
};

export default Navbar;
