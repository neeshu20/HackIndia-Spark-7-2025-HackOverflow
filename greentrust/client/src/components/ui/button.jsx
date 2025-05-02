import React from "react";

export const Button = ({ children, onClick, className = "", ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
