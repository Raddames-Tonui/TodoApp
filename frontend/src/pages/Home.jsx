import React from 'react';
import { Link } from 'react-router-dom';
import { BiSolidBadgeCheck } from 'react-icons/bi';

const Homepage = () => {
    return (
        <div className="h-[90vh] flex flex-col justify-center items-center bg-slate-200 py-12 no-scrollbar overflow-y-hidden">
            <div className="bg-white p-10 rounded-lg shadow-md max-w-md w-full">
                <div className="flex justify-center">
                    <h1 className="flex text-2xl font-bold text-black ml-2">
                        Todo
                        <BiSolidBadgeCheck className="text-3xl text-green-500" />
                    </h1>
                </div>
                <p className="text-center text-gray-600 mb-6">
                    Welcome to Todo App! Your one-stop solution for managing your tasks efficiently.
                </p>

                <div className="flex flex-col items-center space-y-4">
                    <Link to="/users/signup" className="relative w-40 h-12 rounded-3xl text-lg font-bold border-none overflow-hidden z-10 bg-gradient-to-r from-[#36e66e] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd850] hover:to-[#f9f047] transition-all duration-500 ring-slate-900 hover:ring-black flex items-center justify-center text-black">
                        Sign Up
                    </Link>
                    <Link to="/users/signin" className="relative w-40 h-12 rounded-3xl text-lg font-bold border-none overflow-hidden z-10 bg-gradient-to-r from-[#36e66e] to-[#f9f047] hover:bg-gradient-to-r hover:from-[#0fd850] hover:to-[#f9f047] transition-all duration-500 ring-slate-900 hover:ring-black flex items-center justify-center text-black">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
