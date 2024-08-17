import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NavLayout from "../components/NavLayout";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<Login />} />
        <Route path="/" element={<NavLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
