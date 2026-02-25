import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

export default function TeacherAllocation() {

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

        const querySnapshot = await getDocs(collection(db, "teachers"));

        let list = [];
        let map = {};

        querySnapshot.forEach((doc) => {

            list.push({ id: doc.id, ...doc.data() });

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

            list.push({ id: doc.id, ...doc.data() });

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



    return (

        <div>

            <h2>Teacher Allocation</h2>


            {/* Form */}

            <form onSubmit={handleSubmit}>

                <select
                    name="teacherId"
                    onChange={handleChange}
                    required
                >

                    <option value="">Select Teacher</option>

                    {teachers.map((teacher) => (

                        <option
                            key={teacher.id}
                            value={teacher.id}
                        >

                            {teacher.fname} {teacher.lname}

                        </option>

                    ))}

                </select>


                <input
                    name="class"
                    placeholder="Class"
                    onChange={handleChange}
                    required
                />


                <input
                    name="section"
                    placeholder="Section"
                    onChange={handleChange}
                    required
                />


                <input
                    name="subject"
                    placeholder="Subject"
                    onChange={handleChange}
                    required
                />


                <button type="submit">

                    Allocate

                </button>

            </form>



            <hr />


            {/* Allocation List */}

            <h3>Allocation List</h3>


            <table border="1" cellPadding="10">

                <thead>

                <tr>

                    <th>Teacher</th>
                    <th>Class</th>
                    <th>Section</th>
                    <th>Subject</th>
                    <th>Action</th>

                </tr>

                </thead>


                <tbody>

                {allocations.map((item) => (

                    <tr key={item.id}>

                        <td>

                            {teacherMap[item.teacherId]}

                        </td>

                        <td>{item.class}</td>

                        <td>{item.section}</td>

                        <td>{item.subject}</td>

                        <td>

                            <button
                                onClick={() =>
                                    handleDelete(item.id)
                                }
                            >

                                Delete

                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>


        </div>

    );

}