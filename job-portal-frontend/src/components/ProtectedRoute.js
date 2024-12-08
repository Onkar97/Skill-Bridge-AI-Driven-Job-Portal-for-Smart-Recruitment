import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useUserContext();

  console.log("ProtectedRoute: Checking Access...");
  console.log("User Context:", user || "No User Found");
  console.log("Loading State:", loading);

  // Show loading fallback while checking context
  if (loading) {
    console.log("ProtectedRoute: Context still loading, displaying fallback...");
    return <div>Loading, please wait...</div>;
  }

  // Redirect if the user is not logged in
  if (!user?.role) {
    console.error("ProtectedRoute: User not logged in. Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  // Role-based access control
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.error(
      `ProtectedRoute: Access denied for role '${user.role}'. Redirecting to Home.`
    );
    return <Navigate to="/" replace />;
  }

  console.log("ProtectedRoute: Access Granted for role:", user.role);
  return children;
};

export default ProtectedRoute;
