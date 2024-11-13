// src/components/ui/Button.js
import React from 'react';

function Button({ children, variant = 'default', className = '', ...props }) {
  const baseStyles = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  let variantStyles = '';

  switch (variant) {
    case 'outline':
      variantStyles = 'border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white';
      break;
    case 'default':
    default:
      variantStyles = 'bg-blue-500 text-white hover:bg-blue-700';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
