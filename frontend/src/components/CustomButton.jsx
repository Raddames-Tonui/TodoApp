import React from 'react';

const CustomButton = () => {
    return (
        <button className="relative bg-[#645bff] text-white py-4 px-7 rounded-full flex items-center gap-2 font-bold transition-colors duration-200 hover:bg-[#111]">
            Sign up
            <div className="arrow-wrapper flex justify-center items-center">
                <div className="arrow mt-[1px] w-[10px] bg-[#645bff] h-[2px] relative transition-all duration-200 before:content-[''] before:absolute before:border before:border-solid before:border-transparent before:border-r-2 before:border-b-2 before:border-white before:top-[-3px] before:right-[3px] before:transition-all before:duration-200 before:transform before:rotate-[-45deg] hover:before:right-0"></div>
            </div>
        </button>
    );
};

export default CustomButton;
