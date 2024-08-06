// src/components/IconWithBackground.js

import React from 'react';

const IconWithBackground = ({ icon }) => {
    return (
        <div className="flex items-center justify-center h-12 w-12 bg-green-500 rounded-full">
            <img src={icon} alt="icon" className="h-15 w-15 object-contain" />
        </div>
    );
};

export default IconWithBackground;
