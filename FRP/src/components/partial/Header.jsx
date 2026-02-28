import React, {useEffect, useState} from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function Header() {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [menuToggle, setMenuToggle] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));

        if (darkMode) {
            document.body.classList.add("dark", "bg-gray-900");
            document.body.classList.remove("bg-white");
        } else {
            document.body.classList.remove("dark", "bg-gray-900");
            document.body.classList.add("bg-white");
        }
    }, [darkMode]);



    return (<header className="sticky top-0 z-[99999]- flex w-full border-gray-200 bg-white lg:border-b dark:border-gray-800 dark:bg-gray-900">
        <div className="flex grow flex-col items-center justify-between lg:flex-row lg:px-6">
            <div className="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 lg:border-b-0 dark:border-gray-800">
                <button onClick={() => setSidebarToggle(!sidebarToggle)} className={`flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 dark:border-gray-800 dark:text-gray-400 ${sidebarToggle ? "bg-gray-100 dark:bg-gray-800" : ""}`}>☰</button>
                <div className="hidden lg:block w-full">
                    <input type="text" placeholder="Search..." className="h-11 w-full rounded-lg border border-gray-200 px-4 dark:bg-gray-900 dark:border-gray-800"/></div>
                <button onClick={() => setMenuToggle(!menuToggle)} className="lg:hidden h-10 w-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">⋮</button>
            </div>
            <div className={`${menuToggle ? "flex" : "hidden"} lg:flex items-center gap-3 p-4`}>

                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    {darkMode ? (
                        <SunIcon className="w-5 h-5 text-yellow-500" />
                    ) : (
                        <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    )}
                </button>

                <div className="relative">
                    <button onClick={() => setUserOpen(!userOpen)} className="flex items-center gap-2">
                        <img src="https://i.pravatar.cc/40" alt="user" className="rounded-full"/><span>Raheel</span></button>
                    {userOpen && (<div className="absolute right-0 mt-3 w-60 bg-white dark:bg-gray-900 shadow-lg rounded-xl p-3">
                        <button className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-800">Profile</button>
                        <button className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-800">Settings</button>
                        <button className="block w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-800">Logout</button>
                    </div>)}</div>
            </div>
        </div>
    </header>);
}
