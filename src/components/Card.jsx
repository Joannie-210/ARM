    import { motion } from "framer-motion";
    import React from "react";
    import Button from "./Button";
    import { useState } from "react";
    import { useNavigate } from "react-router-dom";

    const Card = () => {
        const [selectOption, setSelectOption] = useState(null);
        const navigate = useNavigate();
        
    return (
        <motion.div
        initial={{ x: "-100vw", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", stiffness: 100, damping: 15 }} // Smooth effect
        className="w-150 h-auto bg-white text-purple-800 rounded-lg shadow-lg p-6"
        >
        <p className="text-gray-500 text-center">Steps 1/2</p>
        <h2 className="text-3xl text-center text-black font-bold mb-3">How much work experience do you have?</h2>
        <p className="text-md text-black text-center">Select the option that best suits you</p>
        <div className="flex flex-col items-center justify-center space-y-2 my-1 mt-4  ">
        <Button variant="option" text='No experience (6 months)' onClick={()=> setSelectOption('No experience')}></Button>
        <Button variant="option" text='Entry level (6 months to 1year)'  onClick={() => setSelectOption("Entry level experience")} ></Button>
        <Button variant="option" text='Mid level (3 years+)'  onClick={() => setSelectOption("Mid level experience")}></Button>
        <Button
            variant="option"
            text="Senior level experience (10 years+)"
            onClick={() => setSelectOption("Senior level experience")}
        />

        <div className="flex justify-between items-center w-full h-20 pb-7">
        <Button
            text="Back"
            onClick={() => navigate('/')}
            variant="gold"
            />
        <Button
            text="Continue"
            disabled={!selectOption}
           variant="secondary"
           onClick={()=> navigate('/country')}
        />
        </div>
        </div>
        </motion.div>
    );
    };

    export default Card;
