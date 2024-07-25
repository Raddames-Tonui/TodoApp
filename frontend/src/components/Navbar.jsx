import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { SiProtodotio } from "react-icons/si";
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const { currentUser } = useContext(UserContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="flex items-center">
                    <SiProtodotio className='text-3xl text-green-500' />
                    <h1 className="text-xl font-bold text-gray-800 ml-2">Todo App</h1>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
                    {currentUser && currentUser.email ? (
                        <button id='sign' className="relative w-20 h-8 rounded-full text-sm font-inherit border-none overflow-hidden z-10 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] bg-gradient-to-r from-[#0fd850] to-[#f9f047] hover:before:content-[''] hover:before:w-full hover:before:h-full hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:rounded-full hover:before:bg-gradient-to-r hover:before:from-[#0fd850] hover:before:to-[#f9f047] hover:before:transition-all hover:before:duration-500">
                            <Link to="/users/signin" className="relative z-10 text-white">Sign Out</Link>
                        </button>
                    ) : (
                        <>
                            <Link to="/users/signup" className="text-gray-700 hover:text-gray-900">Sign Up</Link>
                            <button id='sign' className="relative w-20 h-8 rounded-full text-sm font-inherit border-none overflow-hidden z-10 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] bg-gradient-to-r from-[#0fd850] to-[#f9f047] hover:before:content-[''] hover:before:w-full hover:before:h-full hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:rounded-full hover:before:bg-gradient-to-r hover:before:from-[#0fd850] hover:before:to-[#f9f047] hover:before:transition-all hover:before:duration-500">
                                <Link to="/users/signin" className="relative z-10 text-white">Sign in</Link>
                            </button>
                        </>
                    )}
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <FaTimes className="text-2xl text-gray-800" /> : <FaBars className="text-2xl text-gray-800" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col items-center space-y-4 py-4 px-6">
                        <Link to="/" className="text-gray-700 hover:text-gray-900" onClick={toggleMobileMenu}>Home</Link>
                        <Link to="/users/signup" className="text-gray-700 hover:text-gray-900" onClick={toggleMobileMenu}>Sign Up</Link>
                        <button id='sign' className="relative w-20 h-8 rounded-full text-sm font-inherit border-none overflow-hidden z-10 shadow-[6px_6px_12px_#c5c5c5,-6px_-6px_12px_#ffffff] bg-gradient-to-r from-[#0fd850] to-[#f9f047] hover:before:content-[''] hover:before:w-full hover:before:h-full hover:before:absolute hover:before:top-0 hover:before:left-0 hover:before:rounded-full hover:before:bg-gradient-to-r hover:before:from-[#0fd850] hover:before:to-[#f9f047] hover:before:transition-all hover:before:duration-500">
                            {currentUser ? (
                                <span className="relative z-10 text-white">Sign out</span>
                            ) : (
                                <Link to="/users/signin" className="relative z-10 text-white" onClick={toggleMobileMenu}>Sign in</Link>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
