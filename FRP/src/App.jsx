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
import TeacherAdd from "./components/teach/TeacherAdd";
import TeacherList from "./components/teach/TeacherList";
import TeacherAllocation from "./components/teach/TeacherAllocation";

function App() {
    return (
        <>
            <Routes>

                <Route element={<Auth_Route/>}>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/signin" element={<SignIn/>}/>
                </Route>
                <Route element={<Auth_Route_2/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register-student" element={<Students_Registration/>}/>
                    <Route path="/students" element={<Students/>}/>

                    <Route path="/register-teacher" element={<Teacher_Registration/>}/>
                    <Route path="/teachers" element={<Teacher/>}/>
                    <Route path="/register-teacher-2" element={<TeacherAdd/>}/>
                    <Route path="/teachers-2" element={<TeacherList/>}/>
                    <Route path="/allocate" element={<TeacherAllocation/>}/>
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
