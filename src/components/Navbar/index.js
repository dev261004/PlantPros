import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from "./navbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/events">Events</NavLink>
                    <NavLink to="/cart">Cart</NavLink>
                </NavMenu>

                <NavBtn>
                    <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
                    <NavBtnLink to="/login">Login</NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;
