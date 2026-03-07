import React, {useState, useEffect} from "react";
import {db} from "../../config/firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";
import Input from "../partial/Input";
import SelectInput from "../partial/SelectInput";
export default function ExamSchedule() {
    const [subjects, setSubjects] = useState([]);
    const [classes, setClasses] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [examList, setExamList] = useState([]);
    const [schedule, setSchedule] = useState({
        subjectId: "",
        className: "",
        date: "",
        time: ""
    });
    const handleChange = (e) => {
        setSchedule({
            ...schedule,
            [e.target.name]: e.target.value
        });
    };
    // Fetch Subjects
    const fetchSubjects = async () => {
        const snapshot = await getDocs(collection(db, "subjectData"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()});
        });
        setSubjects(data);
    };
    // Fetch Exam Schedule
    const fetchExams = async () => {
        const snapshot = await getDocs(collection(db, "examSchedule"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()});
        });
        setExamList(data);
    };
    useEffect(() => {
        fetchSubjects();
        fetchExams();
    }, []);
    // Add Exam
    const addExam = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "examSchedule"), schedule);
        setSchedule({
            subjectId: "",
            className: "",
            date: "",
            time: ""
        });
        fetchExams();
    };
    const groupedExams = classes.map((cls) => {
        return {
            className: cls,
            exams: examList.filter((exam) => exam.className == cls)
        };
    });
    return (
        <div className="p-6">
            <div className="space-y-5 sm:space-y-6">
                <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="px-5 py-4 sm:px-6 sm:py-5"><h3 className="text-base font-medium text-gray-800 dark:text-white/90">Exam Schedule</h3></div>
                    <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                        <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800">
                            <form onSubmit={addExam} className="space-y-3">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 md:col-span-3">
                                        <SelectInput
                                            label="Select Class"
                                            OnChange={handleChange}
                                            name="className"
                                            value={schedule.className}
                                            option1={"Select Class"}
                                            options={classes}
                                            type="className"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-3">
                                        <SelectInput
                                            name="subjectId"
                                            value={schedule.subjectId}
                                            label="Select Subject"
                                            OnChange={handleChange}
                                            option1={"Select Subject"}
                                            options={subjects}
                                            type="subject"
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-3">
                                        <Input
                                            label="Date"
                                            placeholder="Enter Date"
                                            type="date"
                                            name="date"
                                            value={schedule.date}
                                            OnChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-3">
                                        <Input
                                            label="Time"
                                            placeholder="Enter Time"
                                            type="time"
                                            name="time"
                                            value={schedule.time}
                                            OnChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-4 md:col-start-10">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center w-full"
                                        >
                                            Add Exam
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="font-semibold mb-4 text-lg">Exam Date Sheet</h3>
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
    );
}