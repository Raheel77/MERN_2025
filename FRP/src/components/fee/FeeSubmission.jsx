import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import {
    collection,
    addDoc,
    getDocs,
} from "firebase/firestore";

export default function FeeSubmission() {
    const [students, setStudents] = useState([]);
    const [paymentData, setPaymentData] = useState({
        studentId: "",
        month: "",
        amount: "",
        paymentMethod: "",
    });

    // Fetch Students
    useEffect(() => {
        const fetchStudents = async () => {
            const snapshot = await getDocs(collection(db, "studentData"));
            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setStudents(list);
        };
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "payments"), {
                ...paymentData,
                createdAt: new Date(),
            });

            alert("Payment Submitted!");
            setPaymentData({
                studentId: "",
                month: "",
                amount: "",
                paymentMethod: "",
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">

                <select
                    name="studentId"
                    value={paymentData.studentId}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                >
                    <option value="">Select Student</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.fname} {student.lname}
                        </option>
                    ))}
                </select>

                <input
                    type="month"
                    name="month"
                    value={paymentData.month}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={paymentData.amount}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />

                <select
                    name="paymentMethod"
                    value={paymentData.paymentMethod}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                >
                    <option value="">Payment Method</option>
                    <option>Cash</option>
                    <option>Bank</option>
                    <option>JazzCash</option>
                </select>

                <button className="bg-green-600 text-white px-4 py-2 rounded">
                    Submit Payment
                </button>
            </form>
        </div>
    );
}