import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Auth_Route_2() {
  return localStorage.getItem("Auth_id") ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
}
