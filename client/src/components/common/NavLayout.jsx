import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from './Footer'

const NavLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-grow overflow-y-auto">
          <Outlet />
        </div>
        < Footer />
      </div>
    </>
  );
};

export default NavLayout;