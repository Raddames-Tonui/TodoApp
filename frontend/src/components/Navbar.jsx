import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import { BiSolidBadgeCheck } from 'react-icons/bi';

const Navbar = () => {
    const { currentUser, logout_user } = useContext(UserContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
      <>
        <div className="relative bg-gray-800 border-b border-gray-600  overflow-y-scroll no-scrollbar flex">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                <div className="flex items-center">
                    <h1 className="flex text-2xl font-bold text-white ml-2">
                        Todo
                        <BiSolidBadgeCheck className="text-3xl text-[#35ca22]" />
                    </h1>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {currentUser && (
                        <>
                            <Link to="/users/tasks" className="text-white hover:underline  font-semibold hover:font-bold ">My Todos</Link>
                            <Link to="/users/profile_update" className="text-white hover:underline  font-semibold hover:font-bold ">Update</Link>
                            <button
                                className="relative w-24 h-10 rounded-3xl text-sm font-inherit border-none overflow-hidden z-10 bg-gradient-to-r from-[#36e66e] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd850] hover:to-[#35ca22] transition-all duration-500 ring-slate-900 hover:ring-black"
                                onClick={logout_user}
                            >
                                <span className="relative z-10 px-2 text-black font-semibold">
                                    Log Out
                                </span>
                            </button>
                        </>
                    )}
                    {!currentUser && (
                        <>
                            <Link to="/" className="text-white hover:underline  font-semibold hover:font-bold ">Home</Link>
                            <Link to="/users/signup" className="text-white hover:underline  font-semibold hover:font-bold ">
                                Sign Up
                            </Link>
                            <button
                                className="relative w-24 h-10 rounded-3xl text-sm font-inherit border-none overflow-hidden z-10 bg-gradient-to-r from-[#36e66e] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd850] hover:to-[#35ca22] transition-all duration-500 ring-slate-900 hover:ring-black"
                            >
                                <Link to="/users/signin" className="relative z-10 text-black font-semibold">
                                    Sign In
                                </Link>
                            </button>
                        </>
                    )}
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={toggleMobileMenu}>
                        {isMobileMenuOpen ? <FaTimes className="text-2xl text-white" /> : <FaBars className="text-2xl text-white" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full right-0 w-[50vw] h-[100vh] z-20 bg-gray-800 opacity-90 flex justify-center items-center shadow-lg border-b-2 border-r-2">
                    <div className="flex flex-col items-center space-y-6 py-4 px-6">
                        {currentUser ? (
                            <>
                                <Link to="/users/tasks" className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={toggleMobileMenu}>My Todos</Link>
                                <Link to="/users/profile_update" className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={toggleMobileMenu}>Update</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={toggleMobileMenu}>Home</Link>
                                <Link to="/users/signup" className="text-white hover:text-gray-900 text-2xl font-semibold" onClick={toggleMobileMenu}>Sign Up</Link>
                            </>
                        )}
                        <button className="text-white hover:text-gray-900 text-2xl font-semibold">
                            {currentUser ? (
                                <span onClick={logout_user} className="relative z-10 text-white">Sign out</span>
                            ) : (
                                <Link to="/users/signin" className="relative z-10 text-white" onClick={toggleMobileMenu}>Sign in</Link>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Navbar;
