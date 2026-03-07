import React, {useState, useEffect} from "react";
import Students from "./students/Students";
import {collection, getDocs, query, limit} from "firebase/firestore";
import {db} from "../config/firebase";
import {Link, useNavigate} from "react-router-dom";
import {ListBulletIcon} from "@heroicons/react/16/solid";
export default function Home() {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "teacherData"));
                const users = [];
                querySnapshot.forEach((doc) => {
                    users.push({id: doc.id, ...doc.data()});
                });
                setTeacherData(users);
                console.log("Fetched Data:", users);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        const fetchStudentData = async () => {
            try {
                const q = query(collection(db, "studentData"), limit(5));
                const studentSnapshot = await getDocs(q);
                const students = [];
                studentSnapshot.forEach((doc) => {
                    students.push({id: doc.id, ...doc.data()});
                });
                console.log(students);
                setStudentData(students);
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchStudentData();
        fetchTeacherData();
    }, []);
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 xl:col-span-6   ">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Students</h3>
                        <button onClick={() => navigate("/students")}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition">
                            <ListBulletIcon className="w-4 h-4"/>
                            All students
                        </button>
                    </div>
                    <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="max-w-full overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                        <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400">Student name</p></th>
                                        <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Class Name</p></th>
                                        <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Section</p></th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">{studentData.map((student) => (
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
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Right */}
            <div className="col-span-12 xl:col-span-6   ">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Teachers</h3>
                        <button onClick={() => navigate("/teacher")}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition">
                            <ListBulletIcon className="w-4 h-4"/>
                            All teachers
                        </button>
                    </div>

                    <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="max-w-full overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-800">
                                        <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400">Teacher name</p></th>
                                        <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Subject</p></th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {teacherData.map((teacher) => (<tr key={teacher.id}>
                                        <td className="px-5 py-4 sm:px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-semibold">{teacher.fname.charAt(0).toUpperCase()}{teacher.lname.charAt(0).toUpperCase()}</div>
                                                <div><span className="block font-medium text-gray-800 dark:text-white/90">{teacher.fname} {teacher.lname}</span><span className="block text-gray-500 text-xs dark:text-gray-400">{teacher.email}</span></div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 sm:px-6"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs text-center">{teacher.subject}</span></td>
                                    </tr>))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Chart 3 */}
            <div className="col-span-12">{/* <ChartThree /> */}</div>
            {/* Map */}
            <div className="col-span-12 xl:col-span-5">
                {/* <MapOne /> */}
            </div>
            {/* Table */}
            <div className="col-span-12 xl:col-span-7">
                {/* <TableOne /> */}
            </div>
        </div>
    );
}
