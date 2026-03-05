import React, {useState, useEffect} from "react";/* import your components*/
import Sidebar from "../partial/Sidebar";
import Header from "../partial/Header";
import {db} from "../../config/firebase";
import {collection, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
export default function CLassList() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "studentData"));
                const users = [];
                querySnapshot.forEach((doc) => {
                    users.push({id: doc.id, ...doc.data()});
                });
                setData(users);
                // console.log("Fetched Data:", users);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        try {
            await deleteDoc(doc(db, "studentData", id));
            setData(data.filter(student => student.id !== id));
            alert("Deleted Successfully");
        } catch (error) {
            console.log(error);
        }
    };
    const groupedClasses = data.reduce((acc, student) => {
        const classNum = Number(student.class);
        const sectionName = student.section;
        if (!acc[classNum]) {
            acc[classNum] = {};
        }
        if (!acc[classNum][sectionName]) {
            acc[classNum][sectionName] = [];
        }
        acc[classNum][sectionName].push(student); // 👈 store FULL student object
        return acc;
    }, {});
    const sortedClasses = Object.keys(groupedClasses)
        .map(Number)
        .sort((a, b) => b - a); // descending
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
            await updateDoc(doc(db, "studentData", student.id), userObject);
            console.log("Data Update successfully");
            setData(data.map((updatedData) => updatedData.id === student.id ? {...updatedData, ...userObject} : updatedData));
        } catch (error) {
            console.log("Error:", error);
        }
    };
    console.log(groupedClasses[10])
    return (
        <div className="space-y-5 sm:space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5"><h3 className="text-base font-medium text-gray-800 dark:text-white/90">All Students</h3></div>
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="space-y-6">
                            {Object.keys(groupedClasses)
                                .sort((a, b) => b - a)
                                .map((classNum) => (
                                    <div
                                        key={classNum}
                                        className="bg-white dark:bg-gray-900 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                                    >
                                        {/* Class Header */}
                                        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                Class {classNum}
                                            </h2>
                                        </div>
                                        {/* Sections */}
                                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {Object.keys(groupedClasses[classNum]).map((section) => (
                                                <div key={section} className="p-6">
                                                    {/* Section Header */}
                                                    <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-xs font-medium text-white bg-black rounded-full">
                  Section {section}
                </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                  {groupedClasses[classNum][section].length} Students
                </span>
                                                    </div>
                                                    {/* Students List */}
                                                    <ul className="space-y-3">
                                                        {groupedClasses[classNum][section].map((student) => (
                                                            <li
                                                                key={student.id}
                                                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition"
                                                            >
                                                                <div>
                                                                    <p className="font-medium text-gray-800 dark:text-white">
                                                                        {student.fname} {student.lname}
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {student.email}
                                                                    </p>
                                                                </div>
                                                                <div className="flex gap-2">
                                                                    <button
                                                                        onClick={() => handleUpdate(student)}
                                                                        className="px-3 py-1 text-xs text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDelete(student.id)}
                                                                        className="px-3 py-1 text-xs text-white bg-red-600 rounded-lg hover:bg-red-700"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
