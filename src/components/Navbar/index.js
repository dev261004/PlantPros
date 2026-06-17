import React, { useState, useEffect } from "react";
import {
    Actions,
    Bars,
    BrandLink,
    BrandMark,
    BrandText,
    CartBadge,
    CartLink,
    LogoutButton,
    MobileActions,
    MobileMenu,
    Nav,
    NavBtn,
    NavBtnLink,
    NavInner,
    NavLink,
    NavMenu,
    ProfileLink,
    ProfileWrap,
} from "./navbarElements";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaLeaf, FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import axios from "axios";

const navLinks = [
    { to: "/", label: "Home", end: true },
    { to: "/plants", label: "Plants" },
    { to: "/about", label: "About" },
    { to: "/events", label: "Events" },
    { to: "/plant-info", label: "Plant Info" },
];

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsAuthenticated(Boolean(localStorage.getItem("token")));
        setIsMenuOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setCartItems([]);
        setIsMenuOpen(false);
        navigate("/");
    };

    useEffect(() => {
        const fetchCart = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setCartItems([]);
                return;
            }

            try {
                const response = await axios.get("http://localhost:4000/api/v1/cart/", {
                    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                });
                setCartItems(response.data.items || []);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCart();
    }, [isAuthenticated, location.pathname]);

    const cartCount = cartItems.length;
    const displayedCartCount = cartCount > 99 ? "99+" : cartCount;

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Nav>
            <NavInner>
                <BrandLink to="/" aria-label="PlantPros home">
                    <BrandMark>
                        <FaLeaf size={20} />
                    </BrandMark>
                    <BrandText>
                        PlantPros
                        <small>Marketplace</small>
                    </BrandText>
                </BrandLink>

                <NavMenu>
                    {navLinks.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.end}>
                            {link.label}
                        </NavLink>
                    ))}
                </NavMenu>

                <Actions>
                    <CartLink to="/cart" aria-label={`Cart with ${cartCount} items`}>
                        <FaShoppingCart size={19} />
                        {cartCount > 0 && <CartBadge>{displayedCartCount}</CartBadge>}
                    </CartLink>

                    {isAuthenticated ? (
                        <ProfileWrap>
                            <ProfileLink to="/profile" aria-label="Profile">
                                <FaUserCircle size={22} />
                            </ProfileLink>
                            <LogoutButton type="button" onClick={handleLogout}>
                                Logout
                            </LogoutButton>
                        </ProfileWrap>
                    ) : (
                        <NavBtn>
                            <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
                            <NavBtnLink to="/login" $variant="ghost">
                                Login
                            </NavBtnLink>
                        </NavBtn>
                    )}

                    <Bars
                        type="button"
                        onClick={() => setIsMenuOpen((current) => !current)}
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                    </Bars>
                </Actions>
            </NavInner>

            <MobileMenu $isOpen={isMenuOpen}>
                {navLinks.map((link) => (
                    <NavLink key={link.to} to={link.to} end={link.end} onClick={closeMenu}>
                        {link.label}
                    </NavLink>
                ))}

                {isAuthenticated ? (
                    <MobileActions $stacked>
                        <ProfileLink to="/profile" onClick={closeMenu}>
                            <FaUserCircle size={20} />
                            Profile
                        </ProfileLink>
                        <LogoutButton type="button" onClick={handleLogout}>
                            Logout
                        </LogoutButton>
                    </MobileActions>
                ) : (
                    <MobileActions>
                        <NavBtnLink to="/sign-up" onClick={closeMenu}>
                            Sign Up
                        </NavBtnLink>
                        <NavBtnLink to="/login" $variant="ghost" onClick={closeMenu}>
                            Login
                        </NavBtnLink>
                    </MobileActions>
                )}
            </MobileMenu>
        </Nav>
    );
};

export default Navbar;
