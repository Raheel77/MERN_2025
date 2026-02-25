import React, {useState, useEffect} from "react";/* import your components*/
import Sidebar from "../partial/Sidebar";
import Header from "../partial/Header";
import {db} from "../../config/firebase";
import {collection, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";

export default function Teacher() {
    const [data, setData] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "teacherData"));
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({id: doc.id, ...doc.data()});
            });
            setData(users);
            console.log("Fetched Data:", users);
        } catch (error) {
            console.log("Error:", error);
        }
    };
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        try {
            await deleteDoc(doc(db, "teacherData", id));
            setData(data.filter(student => student.id !== id));
            alert("Deleted Successfully");
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    const handleUpdate = async (student) => {
        const fNameU = prompt("Enter First name", student.fname);
        const lNameU = prompt("Enter Last name", student.lname);
        const emailU = prompt("Enter Email", student.email);
        const classU = prompt("Enter Class", student.class);
        const sectionU = prompt("Enter Section", student.section);
        if (
            fNameU === null ||
            lNameU === null ||
            emailU === null ||
            classU === null ||
            sectionU === null
        ) return;
        try {
            const userObject = {
                fname: fNameU,
                lname: lNameU,
                email: emailU,
                class: classU,
                section: sectionU,
            };
            await updateDoc(doc(db, "teacherData", student.id), userObject);
            console.log("Data Update successfully");
            setData(data.map((updatedData) => updatedData.id === student.id ? {...updatedData, ...userObject} : updatedData));
        } catch (error) {
            console.log("Error:", error);
        }

    };
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("darkMode"));
        if (saved !== null) setDarkMode(saved);
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);
    return (<div className={darkMode ? "dark bg-gray-900" : ""}>
        <div className="flex h-screen overflow-hidden"><Sidebar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
            <div className="relative flex flex-col flex-1 overflow-y-auto"><Header darkMode={darkMode} setDarkMode={setDarkMode} sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
                <main>
                    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="px-5 py-4 sm:px-6 sm:py-5"><h3 className="text-base font-medium text-gray-800 dark:text-white/90">All Students</h3></div>
                        <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                                <div className="max-w-full overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-800">
                                            <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400">Student name</p></th>
                                            <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Class Name</p></th>
                                            <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Section</p></th>
                                            <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Status</p></th>
                                            <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Student ID</p></th>
                                            <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Actions</p></th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {data.map((student) => (<tr key={student.id}>
                                            <td className="px-5 py-4 sm:px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">{student.fname.charAt(0).toUpperCase()}{student.lname.charAt(0).toUpperCase()}</div>
                                                    <div><span className="block font-medium text-gray-800 dark:text-white/90">{student.fname} {student.lname}</span><span className="block text-gray-500 text-xs dark:text-gray-400">{student.email}</span></div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 sm:px-6"><p className="text-gray-500 text-theme-sm dark:text-gray-400 text-center"><b>{student.class}</b></p></td>
                                            <td className="px-5 py-4 sm:px-6"><p className="text-gray-500 text-theme-sm dark:text-gray-400 text-center"><b>{student.section}</b></p></td>
                                            <td className="px-5 py-4 sm:px-6"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs text-center">Active</span></td>
                                            <td className="px-5 py-4 sm:px-6"><p className="text-gray-500 text-theme-sm dark:text-gray-400 text-center">{student.id}</p></td>
                                            <td className="px-5 py-4 sm:px-6 ">
                                                <div className="flex gap-2 justify-center">
                                                    <button onClick={() => handleUpdate(student)} className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
                                                    <button onClick={() => handleDelete(student.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                                                </div>
                                            </td>

                                        </tr>))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>);
}
