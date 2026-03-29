import React, {useState} from "react";
import Input from "./partial/Input";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [checkboxToggle, setCheckboxToggle] = useState(false);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    role: "user", // default role = user
    });

  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checkboxToggle) {
            toast.error("Please accept Terms & Policy");
            return;
        }

        try {
      // 🔐 Firebase Auth
            const res = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = res.user;

      // 💾 Firestore: save user with role
            await setDoc(doc(db, "users", user.uid), {
                fname: formData.fname,
                lname: formData.lname,
                email: formData.email,
        role: formData.role,
                createdAt: new Date(),
                    });

            toast.success("Signup Successfully");

      // ⬇ Redirect based on role
      if (formData.role === "admin") navigate("/admin");
      else if (formData.role === "branch") navigate("/branch");
      else navigate("/user"); // normal customer

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className={darkMode ? "dark bg-gray-900" : ""}>
            <div className="relative p-6 bg-white dark-:bg-gray-900 sm:p-0">
                <div className="flex flex-col justify-center w-full min-h-screen lg:flex-row">

                    {/* LEFT */}
                    <div className="flex flex-col flex-1 w-full lg:w-1/2">
                        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                            <div className="mb-8">
                                <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark-:text-white">
                                    Sign Up
                                </h1>
                                <p className="text-sm text-gray-500 dark-:text-gray-400">
                                    Enter your email and password to sign up!
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>

                                {/* Names */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        OnChange={(e) =>
                                            setFormData({ ...formData, fname: e.target.value })
                                        }
                                        type="text"
                                    />
                                    <Input
                                        label="Last Name"
                                        placeholder="Last Name"
                                        OnChange={(e) =>
                                            setFormData({ ...formData, lname: e.target.value })
                                        }
                                        type="text"
                                    />
                                </div>

                                <Input
                                    label="Email"
                                    placeholder="Email"
                                    OnChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    type="email"
                                />

                                {/* Password */}
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
                                        className="absolute right-3 top-[48px] text-sm text-gray-500"
                                    >
                                        {showPassword ? "🙈" : "👁"}
                                    </button>
                                </div>

                {/* Role Selection */}
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark-:text-gray-400">
                  <span>Role: </span>
                  <select
                    className="border p-1 rounded"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  >
                    <option value="user">User</option>
                    <option value="branch">Branch Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                                {/* Terms */}
                                <label className="flex items-center space-x-3 text-sm text-gray-600 dark-:text-gray-400">
                                    <input
                                        type="checkbox"
                                        checked={checkboxToggle}
                                        onChange={() => setCheckboxToggle(!checkboxToggle)}
                                    />
                                    <span>I agree to the Terms & Privacy Policy</span>
                                </label>

                                <button
                                    type="submit"
                                    className="w-full py-3 text-white rounded-lg bg-blue-600 hover:bg-blue-700"
                                >
                                    Sign Up
                                </button>
                            </form>

                            <p className="mt-5 text-sm text-center text-gray-600 dark-:text-gray-400">
                                Already have an account?{" "}
                <button
                  onClick={() => navigate("/signin")}
                  className="text-blue-600"
                >
                                    Sign In
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="hidden lg:flex items-center justify-center w-1/2 bg-gray-100 dark-:bg-gray-800">
<div>
                            <h2 className="mb-4 text-2xl font-bold">
                                Start Your Learning Journey 🚀
                            </h2>

                            <p className="text-gray-500 dark-:text-gray-300 text-center max-w-xs">
                                Create an account to access courses, track your progress,
                                and achieve your learning goals.
                            </p>
</div>
                    </div>
                </div>

                {/* Dark Mode */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="fixed bottom-6 right-6 px-4 py-2 text-white bg-black rounded-lg"
                >
                    Toggle Dark
                </button>

                <ToastContainer />
            </div>
        </div>
    );
};

export default SignUp;
