import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom"; 
import React from "react";
import { motion } from "framer-motion";

export default function BlurryBackground() {
  const navigate = useNavigate();
  
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden px-4">
    
        <motion.div
        className="absolute w-48 h-48 bg-purple-700 rounded-full blur-3xl opacity-30 top-10 left-10"
        animate={{
          y: [30, -20, 30], 
          x: [0, 15, 0],
          opacity: [0.3, 0.5, 0.3], 
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Indigo Blob */}
      <motion.div
        className="absolute w-56 h-56 bg-purple-700 rounded-full blur-3xl opacity-30 bottom-10 right-10"
        animate={{
          y: [30, -15, 30],  
          x: [0, -20, 0], 
          opacity: [0.3, 0.5, 0.3], 
        }}
        transition={{
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

        {/* Content Box */}
        <div className="max-w-xl w-full p-6 md:p-10 bg-opacity-10 rounded-lg flex flex-col items-center text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-green-500 font-bold bg-gradient-to-r from-white via-white to-[#4B0082] bg-clip-text text-transparent">
            Create clean, modern resumes in less than 5 minutes!
          </h1>
        
         
    
       <Button className="mt-6 md:mt-10 w-auto px-6 py-3 text-lg" 
            text="Build Resume Now" 
            onClick={() => navigate("/Experience")} 
            variant="primary" 
          />
   
        </div>
      </div>
    </>
  );
}
