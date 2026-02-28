import React, {useState, useEffect} from "react";
import Sidebar from "../partial/Sidebar";
import Header from "../partial/Header";
import Input from "../partial/Input";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../../config/firebase";
export default function Subjects_Registration() {
    const [code, setCode] = useState("");
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState({
        subjectName: "",
        subjectCode: "",
        subjectClass: "",
        subjectTeacher: "",
    });
    useEffect(() => {
        fetchTeachers();
    }, []);
    // Fetch teachers
    const fetchTeachers = async () => {
        const querySnapshot = await getDocs(collection(db, "teacherData"));
        let list = [];
        let map = {};
        querySnapshot.forEach((doc) => {
            list.push({id: doc.id, ...doc.data()});
            map[doc.id] = doc.data().fname + " " + doc.data().lname;
        });
        setTeachers(list);
    };
    const savedata = async () => {
        try {
            const generateId = Math.random().toString(36).substr(2, 9);
            setFormData({...formData, userID: generateId});
            await setDoc(doc(db, "studentData", generateId), formData);
            console.log("Data saved successfully");
        } catch (error) {
            console.log("Error:", error);
        }
    };
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">
                        Subject Registration Form
                    </h3>
                </div>
                <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-3">
                            <Input
                                label="Subject Name"
                                placeholder="Enter your Subject Name"
                                OnChange={(e) => {
                                    const randomNumber = Math.floor(100 + Math.random() * 900);
                                    setFormData({...formData, subjectName: e.target.value});
                                    setCode(e.target.value + randomNumber)
                                }}
                                type="text"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <Input
                                label="Subject Code"
                                placeholder={"Enter your Subject Code"}
                                OnChange={(e) => {
                                    setFormData({...formData, subjectCode: e.target.value});
                                }}
                                type="text"
                                value={code}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Subject's Teacher</label>
                            <div className="relative z-20 bg-transparent">
                                <select onChange={() => {
                                    setFormData({...formData, subjectTeacher: e.target.value});
                                }} required className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                                    <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="">Select Teacher</option>
                                    {teachers.map((teacher) => (
                                        <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" key={teacher.id} value={teacher.id}>{teacher.fname} {teacher.lname}</option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400"><svg className="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <Input
                                label="Subject CLass"
                                placeholder={"Enter  your Subject Class"}
                                OnChange={(e) => {
                                    setFormData({...formData, subjectClass: e.target.value});
                                }}
                                type="number"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4 md:col-start-9">
                            <button
                                onClick={savedata}
                                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-primary shadow-theme-xs hover:bg-brand-600"
                                style={{background: "#000"}}
                            >
                                Register Student
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
