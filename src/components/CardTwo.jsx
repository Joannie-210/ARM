    import { motion } from "framer-motion";
    import React from "react";
    import axios from "axios";
    import Button from "./Button";
    import { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";

    const CardTwo = () => {
        const [countries, setCountry] = useState([]);
        const [selectedCountry, setSelectedCountry] = useState('');
        const navigate = useNavigate(); 

        useEffect(()=> {
const fetchCountries = async() => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map((country)=>country.name.common).sort();
        setCountry(countryNames);
    }
    catch(error) {
        console.error;
    }   
}
fetchCountries()
        }, [])

        useEffect(()=> {
          const savedCountries = localStorage.getItem('selectedCountry');
          if(savedCountries) {
            setSelectedCountry(savedCountries);
          }
        }, [])
        
        const handleCountryChange = (e) => {
          const country = e.target.value;
          setSelectedCountry(country);
          localStorage.getItem('setSelectedCountry', country);
        }
       
        
    return (
        <motion.div
        initial={{ x: "-100vw", opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ type: "spring", stiffness: 100, damping: 15 }} // Smooth effect
        className="w-150 h-auto bg-white text-purple-800 rounded-lg shadow-lg p-6"
        >
        <p className="text-gray-500 text-center">Steps 2/2</p>
      <h2 className="text-3xl text-center text-black font-bold mb-3">Where is your current location?</h2>
      <select className='border-2 w-135 h-10 mt-6 rounde-3xl' value={selectedCountry} onChange = {handleCountryChange}>

      <option className="block hover:border-2 [direction:ltr] bottom-auto text-black" value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <div className="flex w-full h-20 justify-between items-center  mt-5">
      <Button
            text="Back"
            onClick={() => navigate('/experience')}
            variant="gold"
            />
        <Button       
            text="Continue"
            disabled={!selectedCountry} 
           variant="secondary"
           onClick={()=> navigate('/ChooseTemplate')}
        />
      </div>
        </motion.div>
    );
    };

    export default CardTwo;
