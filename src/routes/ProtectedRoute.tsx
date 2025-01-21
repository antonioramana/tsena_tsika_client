import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

interface ProtectedRouteProps {
  element: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ element, adminOnly = false }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated && (location.pathname === '/connexion' || location.pathname === '/inscription')) {
    return <Navigate to="/" />;
  }

  // Check if the user is authenticated and if admin-only routes are being accessed
  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location }} />;
  }

  if (adminOnly && !["STAFF_ADMIN", "STAFF"].includes(user?.role)) {
    return <Navigate to="/" />;
  }
  return <>{element}</>;
};

export default ProtectedRoute;
