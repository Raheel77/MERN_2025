import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  Bars3Icon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

export default function Header({
  darkMode,
  setDarkMode,
  sidebarToggle,
  setSidebarToggle,
}) {
  const [userOpen, setUserOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("Auth_id");
    navigate("/signin");
  };

  return (
    <header
      className={`sticky top-0 z-[99] w-full border-b transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-white"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Left Side: Toggle & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setSidebarToggle(!sidebarToggle)}
            className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          <div className="hidden md:block w-full max-w-md">
            <input
              type="text"
              placeholder="Search products or orders..."
              className={`h-10 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                darkMode
                  ? "bg-gray-800 border-gray-700 placeholder-gray-500 text-white"
                  : "bg-gray-50 border-gray-200 placeholder-gray-400"
              }`}
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`h-10 w-10 flex items-center justify-center rounded-xl border transition-all ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-yellow-400"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>

          <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                <UserCircleIcon className="w-7 h-7" />
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-sm font-bold truncate max-w-[120px]">
                  {user?.displayName || user?.email?.split("@")[0] || "User"}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-black text-blue-500">
                  {role || "Customer"}
                </span>
              </div>
              <ChevronDownIcon
                className={`w-4 h-4 text-gray-400 transition-transform ${userOpen ? "rotate-180" : ""}`}
              />
            </button>

            {userOpen && (
              <>
                {/* Click Overlay to close dropdown */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setUserOpen(false)}
                ></div>

                <div
                  className={`absolute right-0 mt-3 w-56 shadow-2xl rounded-2xl p-2 z-20 border animate-in fade-in zoom-in-95 duration-100 ${
                    darkMode
                      ? "bg-gray-900 border-gray-800"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="px-3 py-2 mb-2 border-b border-gray-100 dark:border-gray-800">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      Account
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
