import React, {useEffect, useState} from "react";
import {db} from "../../config/firebase";
import {
    collection,
    addDoc,
    getDocs,
} from "firebase/firestore";
import {useParams} from "react-router";
import Input from "../partial/Input";
export default function FeeSubmission() {
    const {studentId} = useParams();
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
    useEffect(() => {
        if (studentId) {
            setPaymentData((prev) => ({
                ...prev,
                studentId: studentId,
            }));
        }
    }, [studentId]);
    const handleChange = (e) => {
        setPaymentData({...paymentData, [e.target.name]: e.target.value});
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
        <>
            <div className="col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">
                        Fee Submission
                    </h3>
                </div>
                <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-3">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Select Input</label>
                                <div className="relative z-20 bg-transparent">
                                    <select
                                        name="studentId"
                                        value={paymentData.studentId}
                                        onChange={handleChange}
                                        className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                    >
                                        <option value="">Select Student</option>
                                        {students.map((student) => (
                                            <option key={student.id} value={student.id} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                                                {student.fname} {student.lname}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400"><svg className="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-2">
                                <Input
                                    label="fee month"
                                    placeholder="Enter fee month"
                                    type="month"
                                    name="month"
                                    value={paymentData.month}
                                    OnChange={handleChange}
                                />

                            </div>
                            <div className="col-span-12 md:col-span-2">
                                <Input
                                    label="Amount"
                                    placeholder="Enter amount"
                                    type="number"
                                    name="amount"
                                    value={paymentData.amount}
                                    OnChange={handleChange}
                                />

                            </div>
                            <div className="col-span-12 md:col-span-3">
                                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">Select Input</label>
                                <div className="relative z-20 bg-transparent">
                                    <select
                                        name="paymentMethod"
                                        value={paymentData.paymentMethod}
                                        onChange={handleChange}
                                        className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                                    >
                                        <option value="" className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">Payment Method</option>
                                        <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">Cash</option>
                                        <option className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">Bank</option>
                                    </select>
                                    <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400"><svg className="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-2">
                                {/*
                                <button className="bg-green-600 text-white px-4 py-2 rounded">
                                    Submit Payment
                                </button>
*/}
                                <button type="submit" className="bg-blue-500 text-white px-3 py-2 mt-7  rounded">Submit Payment</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}