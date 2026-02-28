import {useState} from "react";
import viteLogo from "/vite.svg";
import "./index.css";
import SignUp from "./components/SignUp";
import {ToastContainer, toast} from "react-toastify";
import {Route, Router, Routes} from "react-router";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import Students from "./components/students/Students";
import Students_Registration from "./components/students/Students_Registration";
import Teacher from "./components/teacher/Teacher";
import Teacher_Registration from "./components/teacher/Teacher_Registration";
import Auth_Route from "./ProtecteRoutes/Auth_Route";
import Auth_Route_2 from "./ProtecteRoutes/Auth_Route_2";
import TeacherAllocation from "./components/teacher/TeacherAllocation";
import BasicDashboard from "./components/Basic/BasicDashboard";
import Subject from "./components/subject/Subject";
import Subjects_Registration from "./components/subject/Subjects_Registration";

function App() {
    return (
        <>
            <Routes>
                <Route element={<Auth_Route/>}>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                </Route>
                <Route element={<Auth_Route_2/>}>
                    <Route element={<BasicDashboard/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register-student" element={<Students_Registration/>}/>
                        <Route path="/students" element={<Students/>}/>

                        <Route path="/register-subject" element={<Subjects_Registration/>}/>
                        <Route path="/subject" element={<Subject/>}/>

                        <Route path="/register-teacher" element={<Teacher_Registration/>}/>
                        <Route path="/teacher" element={<Teacher/>}/>
                        <Route path="/teacher-allocate" element={<TeacherAllocation/>}/>
                    </Route>
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}
export default App;
