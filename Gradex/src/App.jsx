import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/Settings";
import AddSemesterPopup from "./components/Addsemesterpopup";
import AddCoursePopup from "./components/Addcoursepopup";
import DeleteSemesterPopup from "./components/Deletesemesterpopup";
import DeleteCoursePopup from "./components/Deletecoursepopup";

const Semesters = () => (
  <h1 className="text-white text-3xl">Semesters</h1>
);

const Courses = () => (
  <h1 className="text-white text-3xl">Courses</h1>
);

const AddSemester = () => (
  <h1 className="text-white text-3xl">Add Semester</h1>
);

const AddCourse = () => (
  <h1 className="text-white text-3xl">Add Course</h1>
);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showAddSemester, setShowAddSemester] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showDeleteSemester, setShowDeleteSemester] = useState(false);
  const [showDeleteCourse, setShowDeleteCourse] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [academic, setAcademic] = useState({
    maxGPA: 4.0,
    semestersPerYear: 3,
    graduationCredits: 120,
    defaultCredits: 3,
  });
  const [profile, setProfile] = useState({
    name: "",
    university: "",
    major: "",
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setSemesters([]);
    navigate("/");
  };

  const handleAddSemester = (newSem) => {
    setSemesters((prev) => [...prev, newSem]);
  };

  const handleAddCourse = ({ semester, course }) => {
    const gradeMap = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0 };

    const recalcGPA = (courses) => {
      const graded = courses.filter((c) => c.grade && gradeMap[c.grade] !== undefined);
      if (graded.length === 0) return 0;
      const totalCredits = graded.reduce((s, c) => s + c.credits, 0);
      if (totalCredits === 0) return 0;
      return parseFloat((graded.reduce((s, c) => s + gradeMap[c.grade] * c.credits, 0) / totalCredits).toFixed(2));
    };

    setSemesters((prev) => {
      const exists = prev.find((s) => s.label === semester);
      if (exists) {
        const updated = { ...exists, courses: [...exists.courses, course] };
        updated.gpa = recalcGPA(updated.courses);
        return prev.map((s) => s.label === semester ? updated : s);
      }
      return [...prev, { label: semester, gpa: 0.0, courses: [course] }];
    });
  };

  const handleDeleteSemester = (label) => {
    setSemesters((prev) => prev.filter((s) => s.label !== label));
  };

  const handleDeleteCourse = (semesterLabel, courseName) => {
    const gradeMap = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0 };

    const recalcGPA = (courses) => {
      const graded = courses.filter((c) => c.grade && gradeMap[c.grade] !== undefined);
      if (graded.length === 0) return 0;
      const totalCredits = graded.reduce((s, c) => s + c.credits, 0);
      if (totalCredits === 0) return 0;
      return parseFloat((graded.reduce((s, c) => s + gradeMap[c.grade] * c.credits, 0) / totalCredits).toFixed(2));
    };

    setSemesters((prev) =>
      prev.map((s) => {
        if (s.label === semesterLabel) {
          const updated = { ...s, courses: s.courses.filter((c) => c.name !== courseName) };
          updated.gpa = recalcGPA(updated.courses);
          return updated;
        }
        return s;
      })
    );
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage user={user} onLogout={handleLogout} />} />
      <Route path="/dashboard" element={
        user ? (
          <div className="flex h-screen w-full bg-[#111111]">
            <Sidebar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              onOpenAddSemester={() => setShowAddSemester(true)}
              onOpenAddCourse={() => setShowAddCourse(true)}
              onOpenDeleteSemester={() => setShowDeleteSemester(true)}
              onOpenDeleteCourse={() => setShowDeleteCourse(true)}
              onLogout={handleLogout}
              user={user}
            />

            <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
              <Dashboard semesters={semesters} academic={academic} />
            </main>

            <AddSemesterPopup
              isOpen={showAddSemester}
              onClose={() => setShowAddSemester(false)}
              semesters={semesters}
              onAdd={handleAddSemester}
              defaultCredits={academic.defaultCredits}
            />

            <AddCoursePopup
              isOpen={showAddCourse}
              onClose={() => setShowAddCourse(false)}
              semesters={semesters}
              onAdd={handleAddCourse}
              defaultCredits={academic.defaultCredits}
            />

            <DeleteSemesterPopup
              isOpen={showDeleteSemester}
              onClose={() => setShowDeleteSemester(false)}
              semesters={semesters}
              onDelete={handleDeleteSemester}
            />

            <DeleteCoursePopup
              isOpen={showDeleteCourse}
              onClose={() => setShowDeleteCourse(false)}
              semesters={semesters}
              onDelete={handleDeleteCourse}
            />
          </div>
        ) : (
          <div className="min-h-screen bg-[#111111] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Please log in to continue</h2>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: "#f23131" }}
              >
                Go to Login
              </button>
            </div>
          </div>
        )
      } />
      <Route path="/semesters" element={<Semesters />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/add-semester" element={<AddSemester />} />
      <Route path="/add-course" element={<AddCourse />} />
      <Route path="/settings" element={
        user ? (
          <div className="flex h-screen w-full bg-[#111111]">
            <Sidebar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              onOpenAddSemester={() => setShowAddSemester(true)}
              onOpenAddCourse={() => setShowAddCourse(true)}
              onOpenDeleteSemester={() => setShowDeleteSemester(true)}
              onOpenDeleteCourse={() => setShowDeleteCourse(true)}
              onLogout={handleLogout}
              user={user}
            />
            <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
              <SettingsPage semesters={semesters} setSemesters={setSemesters} academic={academic} setAcademic={setAcademic} profile={profile} setProfile={setProfile} />
            </main>
          </div>
        ) : (
          <div className="min-h-screen bg-[#111111] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Please log in to continue</h2>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: "#f23131" }}
              >
                Go to Login
              </button>
            </div>
          </div>
        )
      } />
    </Routes>
  );
};

export default App;