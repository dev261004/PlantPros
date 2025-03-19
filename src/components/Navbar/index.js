import React, { useState, useEffect } from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./navbarElements";
import { Link, useNavigate } from "react-router-dom";

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
  
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/events">Events</NavLink>
                    <NavLink to="/plant-info">PlantInfo</NavLink>
                    {/* <NavLink to="/cart">Cart</NavLink> */}
                </NavMenu>
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
