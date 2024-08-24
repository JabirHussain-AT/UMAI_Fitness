import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NavLayout from "../components/common/NavLayout";
import Workouts from "../pages/Workouts";
import WorkoutDetialed from "../pages/WorkoutDetialed";
import AdminHome from "../pages/Admin/AdminHome";
import AdminLayout from "../components/admin/adminLayout";
import AdminMembers from "../pages/Admin/AdminMembers";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="signup" element={<Login />} />
        <Route path="/" element={<NavLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workouts/:level" element={<WorkoutDetialed />} />
        </Route>
        <Route path="/admin" element={< AdminLayout />}>
          <Route path="home" element={< AdminHome />} />
          <Route path="members" element={< AdminMembers />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
