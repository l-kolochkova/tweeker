import React from "react";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export const AnonymousRoute = ({ children }) => {
  const user = localStorage.getItem("uid");
  let expired = false;

  if (user) {
    const decodedToken = jwt_decode(localStorage.getItem("token"));
    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      expired = true;
    }
  }

  if (user && !expired) {
    return <Navigate to="/home" />;
  }

  return children;
};

export const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("uid");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
