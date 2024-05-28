import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { FaBell, FaBitcoin } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const Options = [
    "My Profile",
    "My Earnings",
    "Funds",
    "Change Password",
    "Logout",
  ];

  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false);
  };
  return (
    <header className="text-gray-600 body-font w-full border-b-gray-100 border-2 fixed z-50 bg-white">
      <div className="w-full flex flex-wrap px-14 py-3 flex-col md:flex-row items-center">
        <button className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={Logo} alt="Logo" className="object-contain w-40 h-10" />
        </button>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-4">
          <button className="inline-flex items-center bg-gray-50 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded-full text-base mt-4 md:mt-0">
            <FaBell size={20} className="text-[#F29B11]" />
          </button>
          <button className="inline-flex items-center bg-gray-50 border-0 py-2 px-3 focus:outline-none hover:bg-gray-200 rounded-full text-base mt-4 md:mt-0">
            <FaBitcoin size={20} className="text-[#FCC00E]" />
          </button>
          <button
            className="inline-flex relative items-center bg-gray-50 border-0 focus:outline-none hover:bg-gray-200 rounded-full text-base mt-4 md:mt-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <IoPersonCircleSharp size={30} />
            {isDropdownVisible && (
              <div className=" bg-transparent mt-2">
                <div className="absolute z-10 top-full right-0 w-36 divide-y divide-gray-100 rounded-lg shadow bg-gray-500">
                  <ul className="py-2 text-sm text-gray-200">
                    {Options.map((option, index) => (
                      <li key={index}>
                        <button className="inline-block w-full text-left px-4 py-2 hover:bg-gray-600 hover:text-white">
                          {option}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
