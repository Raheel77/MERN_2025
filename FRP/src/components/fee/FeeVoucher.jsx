import React, {useState, useEffect} from "react";/* import your components*/
import Sidebar from "../partial/Sidebar";
import Header from "../partial/Header";
import {db} from "../../config/firebase";
import {collection, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
export default function FeeStructure() {
    const [data, setData] = useState([]);
    return (
        <div className="space-y-5 sm:space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5"><h3 className="text-base font-medium text-gray-800 dark:text-white/90">Fee Structure</h3></div>
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                        <div className="max-w-full overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <th className="px-5 py-3 text-left"><p className="font-medium text-gray-500 text-lg dark:text-gray-400 text-center">Class</p></th>
                                    <th className="px-5 py-3 text-left"><p className="font-medium text-gray-500 text-lg dark:text-gray-400 text-center">Admission Fee</p></th>
                                    <th className="px-5 py-3 text-left"><p className="font-medium text-gray-500 text-lg dark:text-gray-400 text-center">Monthly</p></th>
                                    <th className="px-5 py-3 text-left"><p className="font-medium text-gray-500 text-lg dark:text-gray-400 text-center">Exam</p></th>
                                    <th className="px-5 py-3 text-left"><p className="font-medium text-gray-500 text-lg dark:text-gray-400 text-center">Transport</p></th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">10</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">20,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">5,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">3,000</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">9</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">20,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">5,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">3,000</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">8</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">20,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">4,500</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">3,000</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">7</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">20,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">4,500</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">3,000</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">6</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">20,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">4,500</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">3,000</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">5</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">15,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">4,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">1,500</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">4</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">15,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">4,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">1,500</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">3</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">15,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">4,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">1,500</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">2</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">15,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">4,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">1,500</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-10 text-gray-400 text-center text-3xl font-bold">1</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">15,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">4,000</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">1,500</td>
                                    <td className="px-5 py-10 text-gray-400 text-center">2,000</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
