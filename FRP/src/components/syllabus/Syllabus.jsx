import React, {useState, useEffect} from "react";/* import your components*/
import Sidebar from "../partial/Sidebar";
import Header from "../partial/Header";
import {db} from "../../config/firebase";
import {collection, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
export default function Syllabus() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "subjectData"));
                const users = [];
                querySnapshot.forEach((doc) => {
                    users.push({id: doc.id, ...doc.data()});
                });
                setData(users);
            } catch (error) {
                toast.error(error.message);
                console.log("Error:", error);
            }
        };
        fetchData();
    }, []);
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;
        try {
            await deleteDoc(doc(db, "subjectData", id));
            setData(data.filter(student => student.id !== id));
            toast.success("Deleted Successfully");
        } catch (error) {
            toast.error(error);
            console.log(error);
        }
    };
    const handleUpdate = async (student) => {
        const subjectNameU = prompt("Syllabus Name", student.subjectName);
        const subjectClassU = prompt("Syllabus Class", student.subjectClass);
        if (
            subjectNameU === null ||
            subjectClassU === null
        ) return;
        try {
            const userObject = {
                subjectName: subjectNameU,
                subjectClass: subjectClassU,
            };
            console.log("Update",student)
            await updateDoc(doc(db, "subjectData", student.id), userObject);
            console.log("Data Update successfully");
            setData(data.map((updatedData) => updatedData.id === student.id ? {...updatedData, ...userObject} : updatedData));
        } catch (error) {
            console.log("Error:", error);
        }
    };
    return (
        <div className="space-y-5 sm:space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">All Subject</h3>
                    <button onClick={() => {
                        navigate("/register-subject")
                    }} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                        </svg>
                        Add Subject
                    </button>
                </div>
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400">Student Code</p></th>
                                    <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Subject Name</p></th>
                                    <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Class's Subject</p></th>
                                    <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Action</p></th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">{data.map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-5 py-4 sm:px-6"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs text-center">{student.id}</span></td>
                                        <td className="px-5 py-4 sm:px-6"><p className="text-gray-500 text-theme-sm dark:text-gray-400 text-center"><b>{student.subjectName}</b></p></td>
                                        <td className="px-5 py-4 sm:px-6"><p className="text-gray-500 text-theme-sm dark:text-gray-400 text-center"><b>{student.subjectClass}</b></p></td>
                                        <td className="px-5 py-4 sm:px-6 ">
                                            <div className="flex gap-2 justify-center">
                                                <button onClick={() => handleUpdate(student)} className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
                                                <button onClick={() => handleDelete(student.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete{}</button>
                                            </div>
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
