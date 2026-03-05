import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateField, saveStudent, resetForm} from "../../store/slices/studentSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import Input from "../partial/Input";
export default function Students_Registration() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {formData, loading} = useSelector((state) => state.student);
    const handleSave = async () => {
        if (
            !formData.fname ||
            !formData.lname ||
            !formData.email ||
            !formData.class ||
            !formData.section
        ) {
            toast.error("Please fill all required fields");
            return;
        }
        const result = await dispatch(saveStudent(formData));
        if (result.meta.requestStatus === "fulfilled") {
            toast.success("Data saved successfully");
            dispatch(resetForm());
            navigate("/students");
        } else {
            toast.error(result.payload);
        }
    };
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">
                        Student Registration Form
                    </h3>
                </div>
                <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-3">
                            <Input
                                label="First Name"
                                                                placeholder="Enter your First Name"

                                OnChange={(e) =>
                                    dispatch(updateField({name: "fname", value: e.target.value}))
                                }
                                type="text"
                                required
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <Input
                                label="Last Name"
                                placeholder={"Enter your Last Name"}
                                OnChange={(e) =>
                                    dispatch(updateField({name: "lname", value: e.target.value}))
                                }
                                type="text"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <Input
                                label="Email"
                                placeholder={"Enter your Email"}
                                OnChange={(e) =>
                                    dispatch(updateField({name: "email", value: e.target.value}))
                                }
                                type="email"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                                Class
                            </label>
                            <div className="relative">
                                <div className="absolute">
                                    <select
                                        onChange={(e) =>
                                            dispatch(updateField({name: "section", value: e.target.value}))
                                        }
                                        className="focus:border-brand-300 focus:ring-brand-500/10 appearance-none rounded-l-lg border-0 border-r border-gray-200 bg-transparent py-3 pr-8 pl-3.5 leading-tight text-gray-700 focus:ring-3 focus:outline-none dark:border-gray-800 dark:text-gray-400"
                                    >
                                        <option value="A">Section A</option>
                                        <option value="B">Section B</option>
                                        <option value="C">Section C</option>
                                        <option value="D">Section D</option>
                                    </select>
                                    {/* Arrow */}
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700 dark:text-gray-400">
                                        <svg
                                            className="stroke-current"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <input
                                onChange={(e) =>
                                    dispatch(updateField({name: "class", value: e.target.value}))
                                }
                                    placeholder="Select Class"
                                    type="number"
                                    className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-3 pr-4 pl-[125px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4 md:col-start-9">
                            <button
                            onClick={handleSave} disabled={loading}
                                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-primary shadow-theme-xs hover:bg-brand-600" style={{background:"#000"}}>
                                {loading ? "Saving..." : "Register Student"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}