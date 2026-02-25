import React, {useState} from "react";
import Input from "./partial/Input";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [checkboxToggle, setCheckboxToggle] = useState(false);
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
    });
    let handleSubmit = (e)=>{
        e.preventDefault();
        console.log("Signup Data:", formData);
        try {
            createUserWithEmailAndPassword(auth, formData.email, formData.password)
                .then((res) => {
                    console.log('RE',res    );
                    toast.success("SignUpSuccesfully", {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err .message, {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                });
        } catch (error) {
            console.log('Er',error);
            toast.error(error.message, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }



    return (
        <div className={darkMode ? "dark bg-gray-900" : ""}>
            <div className="relative p-6 bg-white dark:bg-gray-900 sm:p-0">
                <div className="flex flex-col justify-center w-full min-h-screen lg:flex-row">
                    <div className="flex flex-col flex-1 w-full lg:w-1/2">
                        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                            <div className="mb-8">
                                <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
                                    Sign Up
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Enter your email and password to sign up!
                                </p>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* First & Last Name */}
                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <Input
                                        label="First Name"
                                        placeholder={"First Name"}
                                        OnChange={(e) => {
                                          setFormData({ ...formData, fname: e.target.value });
                                        }}
                                        type="text"
                                    />
                                    <Input
                                        label="Last Name"
                                        placeholder={"Last Name"}
                                        OnChange={(e) => {
                                          setFormData({ ...formData, lname: e.target.value });
                                        }}
                                        type="text"
                                    />
                                </div>

                                <Input
                                    label="Email"
                                    placeholder={"Email"}
                                    OnChange={(e) => {
                                      setFormData({ ...formData, email: e.target.value });
                                    }}
                                    type="text"
                                />

                                {/* Password */}
                                <div className="relative">
                                    <Input
                                        label="Password"
                                        placeholder={"Enter your password"}
                                        OnChange={(e) => {
                                          setFormData({ ...formData, password: e.target.value });
                                        }}
                                        type={showPassword ? "text" : "password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 top-[48px] -translate-y-1/2 text-sm text-gray-500">
                                        {showPassword ? "🙈" : "👁"}
                                    </button>
                                </div>

                                <label className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
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

                            <p className="mt-5 text-sm text-center text-gray-600 dark:text-gray-400">
                                Already have an account?{" "}
                                <a href="/signin" className="text-blue-600">
                                    Sign In
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="hidden lg:flex items-center justify-center w-1/2 bg-gray-100 dark:bg-gray-800">
                        <p className="text-gray-500 dark:text-gray-300 text-center max-w-xs">
                            Free and Open-Source Tailwind CSS Admin Dashboard Template
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="fixed bottom-6 right-6 px-4 py-2 text-white bg-black rounded-lg"
                >
                    Toggle Dark
                </button>
            </div>
        </div>
    );
};

export default SignUp;
