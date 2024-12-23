import React from "react";
import { Navigate } from "react-router-dom";
import { isAuth } from "../../services/loginService";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles: string[];
}

const PrivateRoute = ({ children, roles }: PrivateRouteProps) => {
  const user = isAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userRole = user.idRol === 1 ? "user" : user.idRol === 2 ? "admin" : "";

  if (!roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
