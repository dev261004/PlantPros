// src/components/Navbar.js

import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./navbarElements";

const Navbar = () => {
    return (
        <>
            <Nav className="bg-green-800 h-16 flex justify-between items-center px-4">
                <Bars className="text-green-300" />

                <NavMenu className="flex items-center">
                    <NavLink to="/about" className="text-green-300 px-4 py-2">About</NavLink>
                    <NavLink to="/events" className="text-green-300 px-4 py-2">Events</NavLink>
                    {/* <NavLink to="/annual" className="text-green-300 px-4 py-2">Annual Report</NavLink>
                    <NavLink to="/team" className="text-green-300 px-4 py-2">Teams</NavLink>
                    <NavLink to="/blogs" className="text-green-300 px-4 py-2">Blogs</NavLink> */}
                   
                    <NavLink to="/Cart" className="text-green-300 px-4 py-2">Cart</NavLink>
                </NavMenu>

                <NavBtn>
                    <NavBtnLink to="/sign-up" className="bg-green-500 text-whhite px-4 py-2 rounded ">Sign Up</NavBtnLink>
                    <NavBtnLink to="/signin" className="bg-green-500 text-white px-4 py-2 rounded">Sign In</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
