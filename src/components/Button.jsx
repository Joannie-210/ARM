import React from "react";

const Button = ({ text, onClick, variant = "primary", disabled = false }) => {
    const baseStyles = "px-4 py-2 font-semibold rounded-lg transition duration-300";
    
    const variants = {
      primary: "block mt-10 bg-purple-800 text-white hover:opacity-70 transition duration-300 cursor-pointer",
      secondary: "w-62 h-12 bg-purple-800 text-white cursor-pointer",
      danger: "bg-red-500 text-white hover:bg-red-600",
      gold: "bg-black h-12 w-62 border-2 border-white rounded-full text-white hover:bg-gray-200 hover:border-2 hover:border-gray-20 hover:text-black hover:border-black cursor-pointer ",
      option: 'focus:bg-black focus:text-white focus:border-none hover:bg-gray-200 hover:text-black hover:border-none active:scale-95 h-14  mb-8 border-2 w-full border-purple-800 rounded-3xl flex items-center justify-start cursor-pointer '
    };
  
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  