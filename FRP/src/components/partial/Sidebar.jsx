import React, {useState, useEffect} from "react";
import {HomeIcon, UserIcon, UserPlusIcon, UsersIcon, AdjustmentsVerticalIcon, AcademicCapIcon, ChevronDownIcon, ListBulletIcon, BookOpenIcon, BookmarkSquareIcon, PaperAirplaneIcon, PaperClipIcon,} from "@heroicons/react/24/outline";
import {useNavigate, useLocation} from "react-router";
export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(null);/* ✅ Open menu automatically based on route*/
    useEffect(() => {
        if (location.pathname.includes("student")) setOpenMenu("students");
        else if (location.pathname.includes("teacher")) setOpenMenu("teachers");
    }, [location.pathname]);
    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };
    const activeClass = (path) => location.pathname === path ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-600 hover:bg-blue-50 hover:text-blue-600";
    return (<aside className="w-64 h-screen bg-white border-r border-gray-200 p-4 overflow-auto">
        <h1 className="text-gray-800 text-2xl font-bold mb-8">Dashboard</h1>
        <button onClick={() => navigate("/")} className={`w-full flex items-center gap-3 p-3 mb-2 rounded-lg transition ${activeClass("/")}`}><HomeIcon className="w-5 h-5"/>Dashboard</button>
        <button onClick={() => toggleMenu("students")} className="w-full flex justify-between items-center p-3 rounded-lg text-gray-600 hover:bg-blue-50">
            <div className="flex gap-3"><UserIcon className="w-5 h-5"/>Students</div>
            <ChevronDownIcon className={`w-4 h-4 transition ${openMenu === "students" ? "rotate-180" : ""}`}/>
        </button>
        {openMenu === "students" && (
            <div className="ml-8 mt-2 mb-2 space-y-2">
                <button onClick={() => navigate("/students")} className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/students")}`}><UsersIcon className="w-4 h-4"/>All Students</button>
                <button onClick={() => navigate("/register-student")} className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/register-student")}`}><UserPlusIcon className="w-4 h-4"/>Register Student</button>
            </div>)}
        {/*teacher*/}
        <button onClick={() => toggleMenu("teachers")} className="w-full flex justify-between items-center p-3 rounded-lg text-gray-600 hover:bg-blue-50">
            <div className="flex gap-3"><AcademicCapIcon className="w-5 h-5"/>Teachers</div>
            <ChevronDownIcon className={`w-4 h-4 transition ${openMenu === "teachers" ? "rotate-180" : ""}`}/></button>
        {openMenu === "teachers" && (
            <div className="ml-8 mt-2 space-y-2">
                <button onClick={() => navigate("/teacher")}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/teacher")}`}><UsersIcon className="w-4 h-4"/>All Teachers
                </button>
                <button onClick={() => navigate("/register-teacher")} className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/register-teacher")}`}><UserPlusIcon className="w-4 h-4"/>Register Teacher</button>
                <button onClick={() =>
                    navigate("/teacher-allocate")} className={`${activeClass("/teacher-allocate")} w-full flex items-center gap-3 p-2 rounded-lg transition `}><AdjustmentsVerticalIcon className="w-4 h-4"/>Teacher Allocation
                </button>
            </div>)}
        <button onClick={() => toggleMenu("subject")} className="w-full flex justify-between items-center p-3 rounded-lg text-gray-600 hover:bg-blue-50">
            <div className="flex gap-3"><AcademicCapIcon className="w-5 h-5"/>Subject</div>
            <ChevronDownIcon className={`w-4 h-4 transition ${openMenu === "teachers" ? "rotate-180" : ""}`}/></button>
        {openMenu === "subject" && (
            <div className="ml-8 mt-2 space-y-2">
                <button onClick={() => navigate("/subjects")}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/subjects")}`}><BookOpenIcon className="w-4 h-4"/>All Subjects
                </button>
                <button onClick={() => navigate("/register-subject")}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/register-subject")}`}><BookmarkSquareIcon className="w-4 h-4"/>Add Subject
                </button>
            </div>)}
        <button onClick={() => toggleMenu("syllabus")} className="w-full flex justify-between items-center p-3 rounded-lg text-gray-600 hover:bg-blue-50">
            <div className="flex gap-3"><PaperClipIcon className="w-5 h-5"/>Syllabus</div>
            <ChevronDownIcon className={`w-4 h-4 transition ${openMenu === "syllabus" ? "rotate-180" : ""}`}/></button>
        {openMenu === "syllabus" && (
            <div className="ml-8 mt-2 space-y-2">
                <button onClick={() => navigate("/syllabus")}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/syllabus")}`}><PaperClipIcon className="w-4 h-4"/>Syllabus
                </button>
                <button onClick={() => navigate("/register-syllabus")}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/register-syllabus")}`}><BookmarkSquareIcon className="w-4 h-4"/>Add Syllabus
                </button>
            </div>)}
        <button onClick={() => navigate("/class-list")}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/class-list")}`}><ListBulletIcon className="w-4 h-4"/>Class list
        </button>
        <button onClick={() => toggleMenu("fees")} className="w-full flex justify-between items-center p-3 rounded-lg text-gray-600 hover:bg-blue-50">
            <div className="flex gap-3"><PaperClipIcon className="w-5 h-5"/>Fees</div>
            <ChevronDownIcon className={`w-4 h-4 transition ${openMenu === "syllabus" ? "rotate-180" : ""}`}/></button>
        {openMenu === "fees" && (
            <div className="ml-8 mt-2 space-y-2">
                <button onClick={() => navigate("/fee-structure")}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/fee-structure")}`}><PaperClipIcon className="w-4 h-4"/>Fee Structure
                </button>
                <button onClick={() => navigate("/fee-submission")}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/fee-submission")}`}><BookmarkSquareIcon className="w-4 h-4"/>Fee Submission
                </button>
                <button onClick={() => navigate("/fee-voucher")}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition ${activeClass("/fee-voucher")}`}><BookmarkSquareIcon className="w-4 h-4"/>Fee Voucher
                </button>
            </div>)}
    </aside>);
}