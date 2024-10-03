import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import {
  FaTimes,
  FaDumbbell,
  FaCreditCard,
  FaUser,
  FaInfoCircle,
} from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when an option is selected
  const handleOptionClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* navbar section */}
      <div className="w-full bg-gradient-to-r from-secondery via-[#c1ff83] to-[#85e705] min-h-2 flex justify-between items-center">
        {/* Logo Section */}
        <NavLink to="/">
          <img className="w-20 m-3" src={Logo} alt="Logo" />
        </NavLink>

        {/* Icon section */}
        <div className="flex justify-center items-center font-serif gap-4 mx-5">
          <button onClick={toggleSidebar} className="text-2xl">
            <CgMenuRight className="hover: text-bold duration-500 hover:scale-125" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-primary text-white transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-5">
          <button
            onClick={toggleSidebar}
            className="absolute top-5 right-5 text-2xl"
          >
            <FaTimes />
          </button>
          <nav className="mt-10">
            <NavLink
              to="/profile"
              onClick={handleOptionClick} // Close sidebar on click
              className="py-2 hover:bg-secondery hover:text-black rounded px-3 transition duration-300 flex items-center"
            >
              <FaUser className="mr-2" /> Profile
            </NavLink>
            <NavLink
              to="/about-us"
              onClick={handleOptionClick} // Close sidebar on click
              className="py-2 hover:bg-secondery hover:text-black rounded px-3 transition duration-300 flex items-center"
            >
              <FaInfoCircle className="mr-2" /> About Us
            </NavLink>
            <div className="relative group">
              <NavLink
                to="/workouts"
                onClick={handleOptionClick} // Close sidebar on click
                className="py-2 hover:bg-secondery hover:text-black rounded px-3 transition duration-300 flex items-center"
              >
                <FaDumbbell className="mr-2" /> Workouts
              </NavLink>
              <div className="absolute left-full top-0 ml-2 hidden group-hover:block bg-primary text-white rounded shadow-lg">
                <NavLink
                  to="/workouts/cardio"
                  onClick={handleOptionClick} // Close sidebar on click
                  className="block px-4 py-2 hover:bg-secondery hover:text-black"
                >
                  Cardio
                </NavLink>
                <NavLink
                  to="/workouts/strength"
                  onClick={handleOptionClick} // Close sidebar on click
                  className="block px-4 py-2 hover:bg-secondery hover:text-black"
                >
                  Strength
                </NavLink>
                <NavLink
                  to="/workouts/flexibility"
                  onClick={handleOptionClick} // Close sidebar on click
                  className="block px-4 py-2 hover:bg-secondery hover:text-black"
                >
                  Flexibility
                </NavLink>
              </div>
            </div>
            <NavLink
              to="/payment-details"
              onClick={handleOptionClick} // Close sidebar on click
              className="py-2 hover:bg-secondery hover:text-black rounded px-3 transition duration-300 flex items-center"
            >
              <FaCreditCard className="mr-2" /> Payment Details
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavBar;
