// src/components/ui/Card.js
import React from 'react';

function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-white shadow-md rounded-md p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export const CardHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-xl font-bold">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div className="text-gray-700">{children}</div>
);

export default Card;
