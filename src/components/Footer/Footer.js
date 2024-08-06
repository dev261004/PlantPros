// src/components/Footer.js

import React from 'react';

function Footer() {
    return (
        <footer className="bg-green-800 text-white py-4 ">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Plant Marketplace. All rights reserved.</p>
                
            </div>
        </footer>
    );
}

export default Footer;
