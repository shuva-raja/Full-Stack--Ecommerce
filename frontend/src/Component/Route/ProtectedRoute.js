import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route, Navigate, Routes } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (loading) {
    return null; // or loading indicator if preferred
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <Routes><Route {...rest} element={<Component />} /></Routes>;
};

export default ProtectedRoute;
