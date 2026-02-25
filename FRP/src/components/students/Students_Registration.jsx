import React, { useState, useEffect } from "react";

import Sidebar from "../partial/Sidebar";
import Header from "../partial/Header";
import Input from "../partial/Input";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Students_Registration() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    class: "",
    section: "A",
  });
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarToggle, setSidebarToggle] = useState(false);

  const savedata = async () => {
    try {
      const generateId = Math.random().toString(36).substr(2, 9);
      setFormData({ ...formData, userID: generateId });

      await setDoc(doc(db, "studentData", generateId), formData);
      console.log("Data saved successfully");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("darkMode"));
    if (saved) setDarkMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark bg-gray-900" : ""}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            sidebarToggle={sidebarToggle}
            setSidebarToggle={setSidebarToggle}
          />
          <main>
            <div className="p-4 mx-auto max-w-[1440px] md:p-6">
              <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                  <div className="px-5 py-4">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">
                      Student Registration Form
                    </h3>
                  </div>
                  <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800">
                    <Input
                      label="First Name"
                      placeholder="Enter your First Name"
                      OnChange={(e) => {
                        setFormData({ ...formData, fname: e.target.value });
                      }}
                      type="text"
                    />
                    <Input
                      label="Last Name"
                      placeholder={"Enter your Last Name"}
                      OnChange={(e) => {
                        setFormData({ ...formData, lname: e.target.value });
                      }}
                      type="text"
                    />
                    <Input
                      label="Email"
                      placeholder={"Enter your Email"}
                      OnChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      type="email"
                    />
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Class
                      </label>

                      <div className="relative">
                        <div className="absolute">
                          <select
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                section: e.target.value,
                              });
                            }}
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
                          onChange={(e) => {
                            setFormData({ ...formData, class: e.target.value });
                          }}
                          placeholder="Select Class"
                          type="number"
                          className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-3 pr-4 pl-[125px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={savedata}
                        class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-primary shadow-theme-xs hover:bg-brand-600"
                        style={{ background: "#000" }}
                      >
                        Register Student
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
