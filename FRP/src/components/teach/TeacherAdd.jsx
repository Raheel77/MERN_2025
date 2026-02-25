import React, { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function TeacherAdd() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        subject: "",
        class: "",
        section: "",
        status: "Active"
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addDoc(collection(db, "teachers"), formData);

            alert("Teacher Added");

            navigate("/teacher-list");

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div>

            <h2>Add Teacher</h2>

            <form onSubmit={handleSubmit}>

                <input name="fname" placeholder="First Name" onChange={handleChange} required />

                <input name="lname" placeholder="Last Name" onChange={handleChange} required />

                <input name="email" placeholder="Email" onChange={handleChange} required />

                <input name="phone" placeholder="Phone" onChange={handleChange} required />

                <input name="subject" placeholder="Subject" onChange={handleChange} required />

                <input name="class" placeholder="Class" onChange={handleChange} required />

                <input name="section" placeholder="Section" onChange={handleChange} required />

                <select name="status" onChange={handleChange}>

                    <option>Active</option>

                    <option>Inactive</option>

                </select>

                <button type="submit">Save</button>

            </form>

        </div>

    );

}