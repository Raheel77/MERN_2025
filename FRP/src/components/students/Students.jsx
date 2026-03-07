import React, {useState, useEffect} from "react";/* import your components*/
import {Link} from "react-router-dom";
import {db} from "../../config/firebase";
import {collection, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
import {useNavigate} from "react-router";


export default function Students({col1}) {
    const [data, setData] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const studentSnapshot = await getDocs(collection(db, "studentData"));
                const students = [];
                studentSnapshot.forEach((doc) => {
                    students.push({id: doc.id, ...doc.data()});
                });
                const feeSnapshot = await getDocs(collection(db, "payments"));
                const paidStudentIds = new Set();
                feeSnapshot.forEach((doc) => {
                    console.log(doc.data());
                    paidStudentIds.add(doc.data().studentId);
                });
                const updatedStudents = students.map((student) => ({
                    ...student,
                    feeStatus: paidStudentIds.has(student.id) ? "Paid" : "Unpaid",
                }));
                setData(updatedStudents);
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
    return (
        <div className="space-y-5 sm:space-y-6">
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
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">{data.map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-5 py-4 sm:px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                                                    {student.fname.charAt(0).toUpperCase()}
                                                    {student.lname.charAt(0).toUpperCase()}
                                                </div>
                                                <div><span className="block font-medium text-gray-800 dark:text-white/90">{student.fname} {student.lname}</span><span className="block text-gray-500 text-xs dark:text-gray-400">{student.email}</span></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 sm:px-6"><p className="text-gray-500 text-theme-sm dark:text-gray-400 text-center"><b>{student.class}</b></p></td>
                                        <td className="px-5 py-4 sm:px-6"><p className="text-gray-500 text-theme-sm dark:text-gray-400 text-center"><b>{student.section}</b></p></td>
                                        <td className="px-5 py-4 sm:px-6 text-center"><span className="">
                                             {student.feeStatus === "Paid" ? (
                                                 <span className="px-3 py-1 text-sm rounded-full font-medium bg-green-100 text-green-700">Paid</span>
                                             ) : (
                                                 <>
                                                     <span className="px-3 py-1 text-sm rounded-full font-medium bg-green-100 text-green-700">UnPaid</span>
                                                     <br/>
                                                     <Link to={`/fee-submission/${student.id}`} className="link-underline text-[10px]">Pay Now</Link>
                                                 </>
                                             )}
                                         </span></td>
                                        <td className="px-5 py-4 sm:px-6"><p className="text-gray-500 text-theme-sm dark:text-gray-400 text-center">{student.id}</p></td>
                                        <td className="px-5 py-4 sm:px-6 ">
                                            <div className="flex gap-2 justify-center">
                                                <button onClick={() => handleUpdate(student)} className="bg-blue-500 text-white px-3 py-1 rounded">Update</button>
                                                <button onClick={() => handleDelete(student.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
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
