// src/components/ui/Textarea.js
import React from 'react';

function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      {...props}
    />
  );
}

export default Textarea;
