import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
// import SettingsIcon from "../../assets/NavBar/SettingsIcon.png";
// import NotificationIcon from "../../assets/NavBar/NotificationIcon.png";

const NavBar = () => {
  return (
    // navbar section
    <div className=" w-full bg-secondery min-h-2 flex justify-between">
      {/* Logo Section */}
      <NavLink to="/">
        <img className="w-20 m-3 " src={Logo} alt="Logo" />
      </NavLink>

      {/* Icon section */}
      <div className=" flex justify-center items-center font-serif gap-4 mx-5  ">
        <NavLink to="/view/settings" className={'cursor-pointer hover:bg-primary hover:px-3 hover:rounded-md hover:py-2 hover:text-white duration-300'}>
          {/* <img
            className="w-7 h-7 m-3 cursor-pointer hover:scale-110 duration-300 "
            src={SettingsIcon}
            alt="Settings"
            title="Settings"
          /> */}
          About Us
        </NavLink>
        <NavLink to="/Notifications" className={'cursor-pointer hover:bg-primary hover:px-3 hover:rounded-md hover:py-2 hover:text-white duration-300'}>
        Profile 
          {/* <img
            className="w-7 h-7 mr-6 ml-2 cursor-pointer hover:scale-110 duration-300"
            src={NotificationIcon}
            alt="Notifications"
            title="Notifications"
          /> */}
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;