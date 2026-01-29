import React, { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
