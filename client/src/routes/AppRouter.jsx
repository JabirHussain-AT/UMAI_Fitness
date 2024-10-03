// routes/AppRouter.js
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
import Profile from "../pages/Profile";
import AboutPage from "../pages/AboutPage";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import PaymentDetails from "../pages/PaymentDetials";
import AdminPayments from "../pages/Admin/AdminPayments";
import AdminWorkouts from "../pages/Admin/AdminWorkouts";

const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="signup" element={<Login />} />
          <Route path="/" element={<NavLayout />}>
            <Route path="/" element={<Home />} />
            <Route 
              path="/workouts" 
              element={
                <PrivateRoute>
                  <Workouts />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/payment-details" 
              element={
                <PrivateRoute>
                  <PaymentDetails />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/workouts/:level" 
              element={
                <PrivateRoute>
                  <WorkoutDetialed />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/about-us" 
              element={
                <PrivateRoute>
                  <AboutPage />
                </PrivateRoute>
              } 
            />
          </Route>
          <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
            <Route path="home" element={<AdminHome />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="workouts" element={<AdminWorkouts />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
