import React, { useState, useEffect } from "react";
import Input from "./partial/Input";

import { auth, db } from "../config/firebase";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// ✅ Redux
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;
      localStorage.setItem("Auth_id", user.uid);

      // 🗄 Get user data from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // ✅ Save to Redux
        dispatch(
          setUser({
            user: {
              uid: user.uid,
              email: userData.email,
              displayName: `${userData.fname} ${userData.lname}`,
            },
            role: userData.role,
          }),
        );

        toast.success("Signed in successfully");

        // ⬇ Redirect based on role
        if (userData.role === "admin") navigate("/add-product");
        else if (userData.role === "branch") navigate("/");
        else navigate("/");
      } else {
        toast.error("User data not found");
      }
    } catch (err) {
      console.log("Error", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load dark mode from localStorage
  useEffect(() => {
    const savedDark = JSON.parse(localStorage.getItem("darkMode"));
    if (savedDark) setDarkMode(savedDark);
  }, []);

  return (
    <div className={darkMode ? "dark bg-gray-900" : ""}>
      <div className="relative p-6 bg-white dark-:bg-gray-900 sm:p-0">
        <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row">
          {/* LEFT */}
          <div className="flex flex-col flex-1 w-full lg:w-1/2">
            <div className="w-full max-w-md pt-10 mx-auto">
              <a
                href="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark-:text-gray-400"
              >
                ← Back to dashboard
              </a>
            </div>
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
              <div className="mb-8">
                <h1 className="mb-2 text-xl font-semibold text-gray-800 dark-:text-white">
                  Sign In
                </h1>
                <p className="text-sm text-gray-500 dark-:text-gray-400">
                  Enter your email and password to sign in!
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-5">
                  <Input
                    label="Email"
                    placeholder="Email"
                    OnChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    type="text"
                  />
                  <div className="relative">
                    <Input
                      label="Password"
                      placeholder="Enter your password"
                      OnChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      type={showPassword ? "text" : "password"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 top-[48px] -translate-y-1/2 text-sm text-gray-500"
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm text-gray-700 dark-:text-gray-400">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="mr-2"
                      />
                      Keep me logged in
                    </label>
                    <a
                      href="/reset-password"
                      className="text-sm text-blue-500 hover:text-blue-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </div>
              </form>
              <div className="mt-5 text-sm text-center text-gray-700 dark-:text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-blue-900 text-white">
            <div className="text-center max-w-xs">
              <h2 className="mb-4 text-2xl font-bold">Welcome Back 👋</h2>
              <p className="text-sm opacity-80">
                Sign in to continue your learning journey. Access your courses,
                track progress, and stay connected with your instructors.
              </p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 text-white"
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
}
