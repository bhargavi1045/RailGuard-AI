import React, { useState } from 'react';
const Card = ({ children }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      {children}
  </div>
  );
};
export default Card;