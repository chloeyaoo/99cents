// src/components/ui/Alert.js
import React from 'react';

function Alert({ children, className = '', ...props }) {
  return (
    <div className={`bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export const AlertDescription = ({ children }) => (
  <p className="text-sm">{children}</p>
);

export default Alert;
