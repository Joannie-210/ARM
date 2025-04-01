import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
    <div className="fixed top-0 z-50 w-full h-20 flex justify-between items-center bg-black text-white">
      <h1 className="text-xl bg-gradient-to-r from-purple-800 via-purple-800 to-white bg-clip-text text-transparent mx-6 font-logo">ResuMate</h1>
      <ul className="flex justify-end space-x-6 items-center mx-6">
        <li>
         About us
        </li>
        <li>
        Our Services
        </li>
       
            <button className=" w-32 h-10 bg-purple-800 text-white rounded-md hover:opacity-70 transition duration-300 cursor-pointer"> 
            Get Started
            </button>
         
        
      </ul>
    </div>
    
    </>
  );
};

export default Navbar;
