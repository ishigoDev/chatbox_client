import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localStorage";

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}
export default PrivateRoute;
