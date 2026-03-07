import React, {useState, useEffect} from "react";
import {db} from "../../config/firebase";
import {collection, getDocs, addDoc} from "firebase/firestore";
import SelectInput from "../partial/SelectInput";
import Input from "../partial/Input";
export default function ExamResult() {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [results, setResults] = useState([]);
    const [formData, setFormData] = useState({
        studentId: "",
        subjectId: "",
        marks: "",
        total: ""
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    // Fetch students
    const fetchStudents = async () => {
        const snapshot = await getDocs(collection(db, "studentData"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()});
        });
        setStudents(data);
    };
    // Fetch subjects
    const fetchSubjects = async () => {
        const snapshot = await getDocs(collection(db, "subjectData"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()});
        });
        setSubjects(data);
    };
    // Fetch results
    const fetchResults = async () => {
        const snapshot = await getDocs(collection(db, "examResults"));
        const data = [];
        snapshot.forEach((doc) => {
            data.push({id: doc.id, ...doc.data()});
        });
        setResults(data);
    };
    useEffect(() => {
        fetchStudents();
        fetchSubjects();
        fetchResults();
    }, []);
    // Add result
    const addResult = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "examResults"), formData);
        setFormData({
            studentId: "",
            subjectId: "",
            marks: "",
            total: ""
        });
        fetchResults();
    };
    return (
        <div className="p-6">
            <div className="p-6">
                <div className="space-y-5 sm:space-y-6">
                    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="px-5 py-4 sm:px-6 sm:py-5"><h3 className="text-base font-medium text-gray-800 dark:text-white/90">Exam Result</h3></div>
                        <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                            <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800">
                                <form onSubmit={addResult} className="space-y-3">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12 md:col-span-3">
                                            <SelectInput
                                                label="Select Subject"
                                                OnChange={handleChange}
                                                name="subjectId"
                                                value={formData.subjectId}
                                                option1={"Select Subject"}
                                                options={subjects}
                                                type="subject"
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-3">
                                            <SelectInput
                                                label="Select Student"
                                                OnChange={handleChange}
                                                name="studentId"
                                                value={formData.studentId}
                                                option1={"Select Student"}
                                                options={students}
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-3">
                                            <Input
                                                type="number"
                                                name="marks"
                                                value={formData.marks}
                                                label="Number"
                                                placeholder="Enter Marks"
                                                OnChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-3">
                                            <Input
                                                type="number"
                                                name="total"
                                                placeholder="Total Marks"
                                                value={formData.total}
                                                label="Number"
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
            </div>
            {/* Results List */}
            <div className="mt-6">
                <h3 className="font-semibold mb-4 text-lg">Student Results</h3>
                {students.map((student) => {
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
    );
}