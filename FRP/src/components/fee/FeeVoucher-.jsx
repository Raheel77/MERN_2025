import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
    query,
    where,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function FeeStructure() {
    const { studentId } = useParams(); // 👈 from route
    const [studentClass, setStudentClass] = useState(null);

    const [formData, setFormData] = useState({
        className: "",
        admissionFee: "",
        monthlyFee: "",
        examFee: "",
        transportFee: "",
    });

    const [structures, setStructures] = useState([]);

    // ✅ Fetch Student If studentId exists
    useEffect(() => {
        const fetchStudent = async () => {
            if (!studentId) return;

            const studentRef = doc(db, "studentData", studentId);
            const snap = await getDoc(studentRef);

            if (snap.exists()) {
                setStudentClass(snap.data().class);
            }
        };

        fetchStudent();
    }, [studentId]);

    // ✅ Realtime Fetch Fee Structures (Filtered If Needed)
    useEffect(() => {
        let q;

        if (studentClass) {
            q = query(
                collection(db, "feeStructures"),
                where("className", "==", studentClass)
            );
        } else {
            q = collection(db, "feeStructures");
        }

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setStructures(list);
        });

        return () => unsubscribe();
    }, [studentClass]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, "feeStructures"), {
            ...formData,
            createdAt: new Date(),
        });

        setFormData({
            className: "",
            admissionFee: "",
            monthlyFee: "",
            examFee: "",
            transportFee: "",
        });
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "feeStructures", id));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                    Fee Structure Setup
                </h2>

                {/* 🔥 If student specific view */}
                {studentClass && (
                    <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
                        Showing Fee Structure For Class: {studentClass}
                    </div>
                )}

                {/* Form */}
                {!studentId && (
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-2 gap-4 mb-10"
                    >
                        <input
                            name="className"
                            placeholder="Class Name"
                            value={formData.className}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            name="admissionFee"
                            type="number"
                            placeholder="Admission Fee"
                            value={formData.admissionFee}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            name="monthlyFee"
                            type="number"
                            placeholder="Monthly Fee"
                            value={formData.monthlyFee}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            name="examFee"
                            type="number"
                            placeholder="Exam Fee"
                            value={formData.examFee}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />
                        <input
                            name="transportFee"
                            type="number"
                            placeholder="Transport Fee"
                            value={formData.transportFee}
                            onChange={handleChange}
                            className="border p-2 rounded"
                        />

                        <button className="col-span-2 bg-blue-600 text-white py-2 rounded">
                            Save Structure
                        </button>
                    </form>
                )}

                {/* List */}
                <h3 className="text-xl font-semibold mb-4 text-gray-600">
                    Existing Fee Structures
                </h3>

                <div className="overflow-x-auto">
                    <table className="min-w-full border rounded-lg overflow-hidden">
                        <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 text-left">Class</th>
                            <th className="py-2 px-4">Monthly</th>
                            <th className="py-2 px-4">Exam</th>
                            <th className="py-2 px-4">Transport</th>
                            {!studentId && <th className="py-2 px-4">Action</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {structures.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="py-2 px-4">{item.className}</td>
                                <td className="py-2 px-4 text-center">{item.monthlyFee}</td>
                                <td className="py-2 px-4 text-center">{item.examFee}</td>
                                <td className="py-2 px-4 text-center">{item.transportFee}</td>

                                {!studentId && (
                                    <td className="py-2 px-4 text-center">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}