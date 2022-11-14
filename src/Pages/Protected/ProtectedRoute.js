import React from "react";
import { Navigate } from "react-router-dom";

import {useSelector}  from "react-redux";
const ProtectedRoute = ({ children }) => {
  const {  user } = useSelector((state) => state.auth);

  console.log("Check user in Private: ", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};


export default ProtectedRoute;
