import React, { useState } from "react";
import {
  HomeIcon,
  ShoppingBagIcon,
  StarIcon,
  PlusCircleIcon,
  BuildingOfficeIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

export default function Sidebar({ darkMode, sidebarToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the user role from Redux
  const role = useSelector((state) => state.auth.role);

  const activeClass = (path) =>
    location.pathname === path
      ? "bg-blue-100 text-blue-600 font-semibold shadow-sm"
      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600";

  // Define logic for Admin access
  const isAdmin = role?.toLowerCase() === "admin";
  const isBranchManager = role?.toLowerCase() === "branch manager";

  return (
    <aside
      className={`w-64 h-screen p-4 overflow-auto transition-all duration-300
      ${sidebarToggle ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      ${
        darkMode
          ? "bg-gray-900 border-r border-gray-800 text-white"
          : "bg-white border-r border-gray-200 text-gray-800"
      }`}
    >
      <div className="mb-8 px-2">
        <h1
          className={`text-2xl font-black ${darkMode ? "text-white" : "text-gray-800"}`}
        >
          FastFood<span className="text-blue-600">@PP</span>
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
          {role || "User"} Portal
        </p>
      </div>

      <nav className="space-y-2">
        {/* --- COMMON PAGES --- */}
        <button
          onClick={() => navigate("/")}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${activeClass("/")}`}
        >
          <HomeIcon className="w-5 h-5" />
          Menu Catalog
        </button>

        <button
          onClick={() => navigate("/orders")}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${activeClass("/orders")}`}
        >
          <ShoppingBagIcon className="w-5 h-5" />
          Orders List
        </button>

        <button
          onClick={() => navigate("/review")}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${activeClass("/review")}`}
        >
          <StarIcon className="w-5 h-5" />
          Submit Review
        </button>

        {/* --- ADMIN ONLY PAGES --- */}
        {isAdmin && (
          <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
            <p className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Administration
            </p>

            <button
              onClick={() => navigate("/add-product")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${activeClass("/add-product")}`}
            >
              <PlusCircleIcon className="w-5 h-5" />
              Add Product
            </button>

            <button
              onClick={() => navigate("/branches")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${activeClass("/branches")}`}
            >
              <PlusCircleIcon className="w-5 h-5" />
              Branches
            </button>

            <button
              onClick={() => navigate("/add-branch")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${activeClass("/add-branch")}`}
            >
              <BuildingOfficeIcon className="w-5 h-5" />
              Manage Branches
            </button>
          </div>
        )}

        {/* --- BRANCH MANAGER PAGES --- */}
        {/* {(isAdmin || isBranchManager) && (
          <div className="pt-4 mt-2">
            <p className="px-3 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Inventory & Staff
            </p>
            <button
              onClick={() => navigate("/inventory")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${activeClass("/inventory")}`}
            >
              <ClipboardDocumentListIcon className="w-5 h-5" />
              Stock Control
            </button>

            <button
              onClick={() => navigate("/employees")}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition ${activeClass("/employees")}`}
            >
              <UsersIcon className="w-5 h-5" />
              Employees
            </button>
          </div>
        )} */}
      </nav>
    </aside>
  );
}
