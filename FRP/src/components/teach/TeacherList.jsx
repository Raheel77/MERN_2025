import React, { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function TeacherList() {

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        fetchTeachers();

    }, []);

    const fetchTeachers = async () => {

        const querySnapshot = await getDocs(collection(db, "teachers"));

        const list = [];

        querySnapshot.forEach((doc) => {

            list.push({ id: doc.id, ...doc.data() });

        });

        setData(list);

    };

    const handleDelete = async (id) => {

        await deleteDoc(doc(db, "teachers", id));

        fetchTeachers();

    };

    return (

        <div>

            <h2>Teacher List</h2>

            <button onClick={() => navigate("/teacher-add")}>
                Add Teacher
            </button>

            <table border="1">

                <thead>

                <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Phone</th>

                    <th>Subject</th>

                    <th>Class</th>

                    <th>Section</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {data.map((teacher) => (

                    <tr key={teacher.id}>

                        <td>{teacher.fname} {teacher.lname}</td>

                        <td>{teacher.email}</td>

                        <td>{teacher.phone}</td>

                        <td>{teacher.subject}</td>

                        <td>{teacher.class}</td>

                        <td>{teacher.section}</td>

                        <td>{teacher.status}</td>

                        <td>

                            <button onClick={() => handleDelete(teacher.id)}>
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