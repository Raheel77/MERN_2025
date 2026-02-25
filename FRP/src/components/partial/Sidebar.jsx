import React, {useState, useEffect} from "react";
import {HomeIcon, UserIcon, UserPlusIcon, UsersIcon, AcademicCapIcon, ChevronDownIcon,} from "@heroicons/react/24/outline";
import {useNavigate, useLocation} from "react-router";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(null);/* ✅ Open menu automatically based on route*/
    useEffect(() => {
        if (location.pathname.includes("student")) setOpenMenu("students"); else if (location.pathname.includes("teacher")) setOpenMenu("teachers");
    }, [location.pathname]);
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };
    const activeClass = (path) => location.pathname === path ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600";
    return (<aside className="w-64 h-screen bg-white border-r border-gray-200 p-4"><h1 className="text-gray-800 text-2xl font-bold mb-8">Dashboard</h1>{/* Dashboard */}
        <button onClick={() => navigate("/")} className={`w-full flex items-center gap-3 p-3 mb-2 rounded-lg transition ${activeClass("/")}`}><HomeIcon className="w-5 h-5"/>Dashboard</button>
        {/* Students */}
        <button onClick={() => toggleMenu("students")} className="w-full flex justify-between items-center p-3 rounded-lg text-gray-600 hover:bg-blue-50">
            <div className="flex gap-3"><UserIcon className="w-5 h-5"/>Students</div>
            <ChevronDownIcon className={`w-4 h-4 transition ${openMenu === "students" ? "rotate-180" : ""}`}/></button>
        {openMenu === "students" && (<div className="ml-8 mt-2 mb-2 space-y-2">
            <button onClick={() => navigate("/students")} className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/students")}`}><UsersIcon className="w-4 h-4"/>All Students</button>
            <button onClick={() => navigate("/register-student")} className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/register-student")}`}><UserPlusIcon className="w-4 h-4"/>Register Student</button>
        </div>)}{/* Teachers */}
        <button onClick={() => toggleMenu("teachers")} className="w-full flex justify-between items-center p-3 rounded-lg text-gray-600 hover:bg-blue-50">
            <div className="flex gap-3"><AcademicCapIcon className="w-5 h-5"/>Teachers</div>
            <ChevronDownIcon className={`w-4 h-4 transition ${openMenu === "teachers" ? "rotate-180" : ""}`}/></button>
        {openMenu === "teachers" && (<div className="ml-8 mt-2 space-y-2">
            <button onClick={() => navigate("/teachers")} className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/teachers")}`}><UsersIcon className="w-4 h-4"/>All Teachers</button>
            <button onClick={() => navigate("/register-teacher")} className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/register-teacher")}`}><UserPlusIcon className="w-4 h-4"/>Register Teacher</button>
        </div>)}</aside>);
}