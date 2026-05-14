import React, {  useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function ProtectedRoot({ children }) {
  const {isLogin} = useContext(AuthContext);
  return isLogin ? children : <Navigate to={"/login"} />;
}
