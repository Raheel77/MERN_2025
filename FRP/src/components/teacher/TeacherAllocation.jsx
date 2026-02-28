import React, {useEffect, useState} from "react";
import {db} from "../../config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import Sidebar from "../partial/Sidebar";
import Header from "../partial/Header";
import Input from "../partial/Input";
export default function TeacherAllocation() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [allocations, setAllocations] = useState([]);
    const [teacherMap, setTeacherMap] = useState({});
    const [formData, setFormData] = useState({
        teacherId: "",
        class: "",
        section: "",
        subject: "",
    });
    useEffect(() => {
        fetchTeachers();
        fetchAllocations();
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
        setTeacherMap(map);
    };
    // Fetch allocations
    const fetchAllocations = async () => {
        const querySnapshot = await getDocs(
            collection(db, "teacherAllocation")
        );
        let list = [];
        querySnapshot.forEach((doc) => {
            list.push({id: doc.id, ...doc.data()});
        });
        setAllocations(list);
    };
    // Handle form change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // Add allocation
    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDoc(
            collection(db, "teacherAllocation"),
            formData
        );
        alert("Allocated Successfully");
        fetchAllocations();
    };
    // Delete allocation
    const handleDelete = async (id) => {
        await deleteDoc(
            doc(db, "teacherAllocation", id)
        );
        fetchAllocations();
    };
    const groupedAllocations = Object.values(
        allocations.reduce((acc, item) => {
            if (!acc[item.teacherId]) {
                acc[item.teacherId] = {
                    teacherId: item.teacherId,
                    classes: [],
                    sections: [],
                    subjects: [],
                    ids: [],
                };
            }
            acc[item.teacherId].classes.push(item.class);
            acc[item.teacherId].sections.push(item.section);
            acc[item.teacherId].subjects.push(item.subject);
            acc[item.teacherId].ids.push(item.id);
            return acc;
        }, {})
    );
    return (<>
            <div className="col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">
                        Teacher Allocation
                    </h3>
                </div>
                <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-3">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Select Input</label>
                                <div className="relative z-20 bg-transparent">
                                    <select name="teacherId" onChange={handleChange} required className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                                        <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" value="">Select Teacher</option>
                                        {teachers.map((teacher) => (
                                            <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400" key={teacher.id} value={teacher.id}>{teacher.fname} {teacher.lname}</option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400"><svg className="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-2">
                                <Input
                                    label="Class"
                                    name="class"
                                    placeholder="Enter your Class Name"
                                    OnChange={handleChange}
                                    type="text"
                                />
                            </div>
                            <div className="col-span-12 md:col-span-2">
                                <Input
                                    label="Section"
                                    name="section"
                                    placeholder="Enter your Section Name"
                                    OnChange={handleChange}
                                    type="text"
                                />
                            </div>
                            <div className="col-span-12 md:col-span-2">
                                <Input
                                    label="Subject"
                                    name="subject"
                                    placeholder="Enter your Subject"
                                    OnChange={handleChange}
                                    type="text"
                                />
                            </div>
                            <div className="col-span-12 md:col-span-1"></div>
                            <div className="col-span-12 md:col-span-2">
                                <button type="submit" className="bg-blue-500 text-white px-3 py-2 mt-7  rounded">Allocate</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <br/>
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5"><h3 className="text-base font-medium text-gray-800 dark:text-white/90">Allocation List</h3></div>
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400">Teacher name</p></th>
                                    <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Teacher's Classes</p></th>
                                    <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Teacher's Sections</p></th>
                                    <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Teacher's Subjects</p></th>
                                    <th className="px-5 py-3 sm:px-6 text-left"><p className="font-medium text-gray-500 text-xs dark:text-gray-400 text-center">Actions</p></th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {groupedAllocations.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-4 sm:px-6 font-medium text-gray-500 text-xs dark:text-gray-400">
                                            {teacherMap[item.teacherId]}
                                        </td>
                                        <td className="px-5 py-4 sm:px-6 font-medium text-gray-500 text-xs dark:text-gray-400 text-center">
                                            {item.classes.join(", ")}
                                        </td>
                                        <td className="px-5 py-4 sm:px-6 font-medium text-gray-500 text-xs dark:text-gray-400 text-center">
                                            {item.sections.join(", ")}
                                        </td>
                                        <td className="px-5 py-4 sm:px-6 font-medium text-gray-500 text-xs dark:text-gray-400 text-center">
                                            {item.subjects.join(", ")}
                                        </td>
                                        <td className="px-5 py-4 sm:px-6 font-medium text-gray-500 text-xs dark:text-gray-400 text-center   ">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                                onClick={() => item.ids.forEach(id => handleDelete(id))}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}