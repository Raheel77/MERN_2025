import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "../partial/Sidebar";
import Header from "../partial/Header";
const BasicDashboard = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("darkMode"));
        if (saved) setDarkMode(saved);
        console.log('asdsad',saved);
    }, []);
    return (
        <div className={darkMode ? "dark bg-gray-900" : ""}>
            <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
                <div className="relative flex flex-col flex-1 overflow-y-auto">
                    <Header darkMode={darkMode} setDarkMode={setDarkMode} sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
                    <main>
                        <div className="p-4 mx-auto max-w-[1440px] md:p-6">
                            <Outlet/>
                        </div>
                    </main>
                </div>
            </div>
        </div>);
};
export default BasicDashboard;
