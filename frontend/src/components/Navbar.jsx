import React, { useState } from 'react';
import { SiProtodotio } from "react-icons/si";
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <SiProtodotio className='text-3xl text-green-500'/>
          <h1 className="text-xl font-bold text-gray-800 ml-2">Todo App</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>

          <Link to="/signup" className="text-gray-700 hover:text-gray-900">
            Sign Up
          </Link>       

          <button id='sign'  className="relative w-20 h-8 rounded-full text-sm font-inherit border-none overflow-hidden z-10 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] bg-gradient-to-r from-[#0fd850] to-[#f9f047] hover:before:content-[''] hover:before:w-full hover:before:h-full hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:rounded-full hover:before:bg-gradient-to-r hover:before:from-[#0fd850] hover:before:to-[#f9f047] hover:before:transition-all hover:before:duration-500">
                { isLoggedin ? <span className="relative z-10 text-white">Sign out</span> :  <Link to="/signin" className="relative z-10 text-white ">Sign in</Link>
                }
          </button>

     
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
