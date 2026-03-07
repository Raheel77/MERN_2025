import React, {useState, useEffect} from "react";
import Students from "./students/Students";
import {collection, getDocs, query, limit} from "firebase/firestore";
import {db} from "../config/firebase";
import {Link, useNavigate} from "react-router-dom";
import {ListBulletIcon} from "@heroicons/react/16/solid";
export default function Home() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    const [studentData, setStudentData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [classes, setClasses] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [examList, setExamList] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [results, setResults] = useState([]);
    const fetchSubjects = async () => {
        const snapshot = await getDocs(collection(db, "subjectData"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()});
        });
        setSubjects(data);
    };
    const fetchExams = async () => {
        const snapshot = await getDocs(collection(db, "examSchedule"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()});
        });
        setExamList(data);
    };
    const groupedExams = classes.map((cls) => {
        return {
            className: cls,
            exams: examList.filter((exam) => exam.className == cls)
        };
    });
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
    const fetchResults = async () => {
        const snapshot = await getDocs(collection(db, "examResults"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()});
        });
        setResults(data);
    };

    useEffect(() => {
        fetchExams();
        fetchSubjects();
        fetchStudentData();
        fetchTeacherData();
        fetchResults();
    }, []);
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 xl:col-span-6">
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
            <div className="col-span-12 xl:col-span-6   ">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Date sheet</h3>
                        <button onClick={() => navigate("/exam-schedule")}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition">
                            <ListBulletIcon className="w-4 h-4"/>
                            Add New Date
                        </button>
                    </div>
                    <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                            <div className="max-w-full overflow-x-auto">
                                {groupedExams.map((group) => {
                                    if (group.exams.length === 0) return null;
                                    return (
                                        <div key={group.className} className="mb-6 border rounded-lg overflow-hidden">
                                            {/* Class Header */}
                                            <div className="bg-blue-500 text-white px-4 py-2 font-semibold">
                                                Class {group.className}
                                            </div>
                                            <table className="min-w-full text-sm">
                                                <thead className="bg-gray-200 dark:bg-gray-800">
                                                <tr>
                                                    <th className="border p-2">Subject</th>
                                                    <th className="border p-2">Date</th>
                                                    <th className="border p-2">Time</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {group.exams.map((exam) => {
                                                    const subject = subjects.find(s => s.id === exam.subjectId);
                                                    return (
                                                        <tr
                                                            key={exam.id}
                                                            className="text-center hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                            <td className="border p-2">
                                                                {subject?.subjectName}
                                                            </td>
                                                            <td className="border p-2">
                                                                {new Date(exam.date).toLocaleDateString()}
                                                            </td>
                                                            <td className="border p-2">
                                                                {exam.time}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-12 xl:col-span-6   ">
                <div className="mt-6">
                    <h3 className="font-semibold mb-4 text-lg">Student Results</h3>
                    {studentData.map((student) => {
                        // Get all results for this student
                        const studentResults = results.filter(res => res.studentId === student.id);
                        if (studentResults.length === 0) return null;
                        // Calculate total marks and percentage
                        const totalMarks = studentResults.reduce((sum, r) => sum + Number(r.total), 0);
                        const obtainedMarks = studentResults.reduce((sum, r) => sum + Number(r.marks), 0);
                        const percentage = totalMarks ? ((obtainedMarks / totalMarks) * 100).toFixed(2) : 0;
                        return (
                            <div key={student.id} className="mb-6 border rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700 p-4">
                                {/* Student Header */}
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                        {student.fname} {student.lname}
                                    </h4>
                                    <span className="text-gray-600 dark:text-gray-400">
            Total: {obtainedMarks} / {totalMarks} ({percentage}%)
          </span>
                                </div>
                                {/* Result Table */}
                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
                                        <thead className="bg-gray-200 dark:bg-gray-800">
                                        <tr className="text-left">
                                            <th className="p-2 border">Subject</th>
                                            <th className="p-2 border">Marks</th>
                                            <th className="p-2 border">Total</th>
                                            <th className="p-2 border">Grade</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {studentResults.map((res) => {
                                            const subject = subjects.find(s => s.id === res.subjectId);
                                            const mark = Number(res.marks);
                                            const total = Number(res.total);
                                            const grade = (mark / total) * 100 >= 90 ? "A" :
                                                (mark / total) * 100 >= 75 ? "B" :
                                                    (mark / total) * 100 >= 60 ? "C" :
                                                        (mark / total) * 100 >= 40 ? "D" : "F";
                                            return (
                                                <tr key={res.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="p-2 border">{subject?.subjectName}</td>
                                                    <td className="p-2 border text-center">{mark}</td>
                                                    <td className="p-2 border text-center">{total}</td>
                                                    <td className="p-2 border text-center font-semibold">{grade}</td>
                                                </tr>
                                            );
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
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
