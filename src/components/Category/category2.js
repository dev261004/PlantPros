// src/components/Component2.js

import React from 'react';

const Component2 = ({ category }) => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
      <img src={category.image} alt={category.name} className="w-full h-auto rounded-lg" />
      <p className="text-gray-500">{category.description}</p>
    </div>
  );
};

export default Component2;
