import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/loginContext";

interface ProtectedRouteProps {
  allowedTypes?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedTypes = [] }) => {
  const { isAuthenticated, userType, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedTypes.length > 0 && userType && !allowedTypes.includes(userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;