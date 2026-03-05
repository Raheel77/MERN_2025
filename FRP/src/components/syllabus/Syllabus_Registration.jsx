import React, {useState, useEffect} from "react";
import Sidebar from "../partial/Sidebar";
import Header from "../partial/Header";
import Input from "../partial/Input";
import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {db} from "../../config/firebase";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {ListBulletIcon} from "@heroicons/react/16/solid";
export default function Syllabus_Registration() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        subjectCode: "",
        subjectName: "",
        subjectClass: "",
        fileUrl: "",

    });
    const [file, setFile] = useState(null);
    const savedata = async () => {
        try {
            const generateId = Math.random().toString(36).substr(2, 9);

    let fileUrl = "";

    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `syllabusFiles/${generateId}_${file.name}`);

      await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(storageRef);
    }

    await setDoc(doc(db, "syllabusData", generateId), {
      subjectCode: generateId,
      subjectName: formData.subjectName,
      subjectClass: formData.subjectClass,
      fileUrl: fileUrl,
    });

    toast.success("Syllabus added successfully");

        } catch (error) {
            console.log("Error:", error);
    toast.error(error.message);
        }
    };
    const randomNumber = Math.floor(100 + Math.random() * 900);

    return (
        <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
                <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">All Syllabus</h3>
                    <button onClick={() => {
                        navigate("/subjects")
                    }} className=" flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition">
                        <ListBulletIcon   className="w-4 h-4"/>
                        Subjects list
                    </button>
                </div>
                <div className="space-y-6 border-t border-gray-100 p-5 dark:border-gray-800">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-4">
                            <Input
                                label="Syllabus Name"
                                placeholder="Enter your Syllabus Name"
                                OnChange={(e) => {
                                    setFormData({...formData, subjectName: e.target.value});
                                }}
                                type="text"
                            />
                        </div>

                        <div className="col-span-12 md:col-span-4">
                            <label className="block mb-2 text-sm font-medium">
                                Upload Syllabus File
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <Input
                                label="Syllabus CLass"
                                placeholder={"Enter  your Syllabus Class"}
                                OnChange={(e) => {
                                    setFormData({...formData, subjectClass: e.target.value});
                                }}
                                type="number"
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4 md:col-start-9">
                            <button
                                onClick={savedata}
                                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-primary shadow-theme-xs hover:bg-brand-600 mt-6"
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
