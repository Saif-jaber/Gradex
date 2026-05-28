import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SettingsPage from "./pages/Settings";
import AddSemesterPopup from "./components/Addsemesterpopup";
import AddCoursePopup from "./components/Addcoursepopup";
import DeleteSemesterPopup from "./components/Deletesemesterpopup";
import DeleteCoursePopup from "./components/Deletecoursepopup";
import UpdateCourseStatusPopup from "./components/UpdateCourseStatusPopup";
import SuccessPopup from "./components/SuccessPopup";
import ClearDataPopup from "./components/ClearDataPopup";
import SetupPopup from "./components/SetupPopup";
import { deleteCourse, updateCourseStatus } from "./services/courseSrv";
import { deleteSemester, getSemesters, deleteAllSemesters } from "./services/semSrv";
import { getSettings, updateSettings } from "./services/settingsSrv";
import { useToast } from "./context/ToastContext";

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
  const [showUpdateCourseStatus, setShowUpdateCourseStatus] = useState(false);
  const [showCourseSuccess, setShowCourseSuccess] = useState(false);
  const [showSemesterSuccess, setShowSemesterSuccess] = useState(false);
  const [showClearData, setShowClearData] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);
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
  const location = useLocation();
  const { addToast } = useToast();

  // Show setup popup only when arriving at dashboard and needs setup
  useEffect(() => {
    if (needsSetup && location.pathname === "/dashboard") {
      setShowSetup(true);
    }
  }, [needsSetup, location.pathname]);

   const transformDbSemester = (dbSem) => {
     console.log("Transforming DB semester:", JSON.stringify(dbSem, null, 2));
     return {
       ...dbSem,
       label: dbSem.name,
       courses: Array.isArray(dbSem.courses) ? dbSem.courses : [],
     };
   };

   const loadSemestersFromDb = async () => {
     console.log("=== loadSemestersFromDb CALLED ===");
     try {
       const data = await getSemesters();
       console.log("Raw data from DB:", JSON.stringify(data, null, 2));
       
       const transformed = Array.isArray(data) ? data.map(transformDbSemester) : [];
       console.log("Transformed semesters:", transformed);
       
       if (transformed.length > 0) {
         console.log("First semester keys:", Object.keys(transformed[0]));
         console.log("First semester id:", transformed[0].id);
         if (transformed[0].courses && transformed[0].courses.length > 0) {
           console.log("First course keys:", Object.keys(transformed[0].courses[0]));
           console.log("First course id:", transformed[0].courses[0].id);
         }
       }
       
       setSemesters(transformed);
       console.log("Semesters state updated with", transformed.length, "semesters");
     } catch (err) {
       console.error("Failed to load semesters:", err);
       console.error("Error message:", err.message);
     }
   };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);

        // Load settings from DB
        getSettings().then((settings) => {
          if (settings.university) userData.university = settings.university;
          if (settings.major) userData.major = settings.major;
          localStorage.setItem("user", JSON.stringify(userData));
          setAcademic({
            maxGPA: settings.maxGpa ?? 4.0,
            semestersPerYear: settings.semestersPerYear ?? 3,
            graduationCredits: settings.graduationCredits ?? 120,
            defaultCredits: settings.defaultCredits ?? 3,
          });
          setProfile((prev) => ({
            ...prev,
            name: userData.name || "",
            university: settings.university || "",
            major: settings.major || "",
          }));
          if (!settings.university && !settings.major) {
            setNeedsSetup(true);
          }
        }).catch((err) => {
          console.error("Failed to load settings:", err);
        });

        loadSemestersFromDb();
      } catch (err) {
        console.error("Failed to restore session:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setSemesters([]);
    navigate("/");
  };

  const handleClearData = async () => {
    try {
      await deleteAllSemesters();
      setSemesters([]);
      setShowClearData(false);
      addToast("All data cleared successfully", "success");
    } catch (err) {
      console.error("Clear data error:", err);
      addToast("Failed to clear data: " + (err.message || "Server error"), "error");
    }
  };

  const handleSetupSave = async ({ university, major }) => {
    try {
      await updateSettings({ university, major });
      const storedUser = JSON.parse(localStorage.getItem("user"));
      storedUser.university = university;
      storedUser.major = major;
      localStorage.setItem("user", JSON.stringify(storedUser));
      setUser({ ...storedUser });
      setProfile((prev) => ({ ...prev, university, major }));
      setShowSetup(false);
      setNeedsSetup(false);
      addToast("Profile setup complete!", "success");
    } catch (err) {
      console.error("Setup save error:", err);
      addToast("Failed to save profile: " + (err.message || "Server error"), "error");
      throw err;
    }
  };

  const handleAcademicSave = (field, value) => {
    const payload = {};
    const fieldMap = {
      maxGPA: "maxGpa",
      semestersPerYear: "semestersPerYear",
      graduationCredits: "graduationCredits",
      defaultCredits: "defaultCredits",
    };
    payload[fieldMap[field]] = value;
    updateSettings(payload).then(() => {
      addToast(`${field} updated`, "success");
    }).catch((err) => {
      console.error("Failed to save academic setting:", err);
      addToast("Failed to save setting", "error");
    });
  };

   const handleAddSemester = (newSem) => {
     setSemesters((prev) => [...prev, newSem]);
     setShowSemesterSuccess(true);
     setTimeout(() => setShowSemesterSuccess(false), 2000);
   };

  const handleAddCourse = ({ semester, course: newCourse }) => {
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
        const updated = { ...exists, courses: [...exists.courses, newCourse] };
        updated.gpa = recalcGPA(updated.courses);
        return prev.map((s) => s.label === semester ? updated : s);
      }
      return [...prev, { label: semester, gpa: 0.0, courses: [newCourse] }];
    });
     setShowCourseSuccess(true);
     setTimeout(() => setShowCourseSuccess(false), 2000);
   };

   const handleDeleteSemester = async ({ label, id }) => {
     console.log("Delete semester called:", { label, id });

     if (!id) {
       addToast("Cannot delete: semester has no ID", "error");
       return;
     }

     try {
       console.log("Calling deleteSemester API with id:", id);
       const result = await deleteSemester(id);
       console.log("Delete semester API result:", result);
       setSemesters((prev) => {
         const updated = prev.filter((s) => s.label !== label);
         console.log("Semesters after filter:", updated.length, "remaining");
         return updated;
       });
       addToast("Semester deleted successfully", "success");
     } catch (err) {
       console.error("Delete semester API error:", err);
       addToast("Failed to delete semester: " + (err.message || "Server error"), "error");
     }
   };

   const handleDeleteCourse = async ({ semesterLabel, courseName, courseId }) => {
     console.log("Delete course called:", { semesterLabel, courseName, courseId });

     if (!courseId) {
       addToast("Cannot delete: course has no ID", "error");
       return;
     }

     try {
       console.log("Calling deleteCourse API with id:", courseId);
       const result = await deleteCourse(courseId);
       console.log("Delete course API result:", result);

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
             console.log("Found semester, current courses:", s.courses.length);
             const updatedCourses = s.courses.filter((c) => c.id !== courseId);
             console.log("Courses after filter:", updatedCourses.length);

             const updated = {
               ...s,
               courses: updatedCourses
             };
             updated.gpa = recalcGPA(updated.courses);
             console.log("Updated semester gpa:", updated.gpa);
             return updated;
           }
           return s;
         })
       );
       addToast("Course deleted successfully", "success");
     } catch (err) {
       console.error("Delete course API error:", err);
       addToast("Failed to delete course: " + (err.message || "Server error"), "error");
     }
   };

  const handleUpdateCourseStatus = async ({ courseId, semester, courseName, status, grade }) => {
    const gradeMap = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0 };

    try {
      await updateCourseStatus(courseId, status, grade);

      setSemesters((prev) =>
        prev.map((s) => {
          if (s.label === semester) {
            const updated = {
              ...s,
              courses: s.courses.map((c) =>
                c.name === courseName ? { ...c, status, grade } : c
              ),
            };
            const graded = updated.courses.filter((c) => c.grade && gradeMap[c.grade] !== undefined);
            if (graded.length === 0) {
              updated.gpa = 0;
            } else {
              const totalCredits = graded.reduce((sum, c) => sum + c.credits, 0);
              if (totalCredits > 0) {
                updated.gpa = parseFloat(
                  (graded.reduce((sum, c) => sum + gradeMap[c.grade] * c.credits, 0) / totalCredits).toFixed(2)
                );
              }
            }
            return updated;
          }
          return s;
        })
      );
      addToast("Course status updated successfully", "success");
    } catch (err) {
      console.error("Update course status error:", err);
      addToast("Failed to update course status: " + (err.message || "Server error"), "error");
    }
  };

  return (
    <>
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
                onOpenUpdateCourseStatus={() => setShowUpdateCourseStatus(true)}
                onLogout={handleLogout}
                user={user}
              />

              <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
                <Dashboard semesters={semesters} academic={academic} />
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
                 onOpenUpdateCourseStatus={() => setShowUpdateCourseStatus(true)}
                 onLogout={handleLogout}
                 user={user}
               />
              <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
                <SettingsPage semesters={semesters} setSemesters={setSemesters} academic={academic} setAcademic={setAcademic} profile={profile} setProfile={setProfile} onOpenClearData={() => setShowClearData(true)} onSaveAcademic={handleAcademicSave} />
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

    <UpdateCourseStatusPopup
      isOpen={showUpdateCourseStatus}
      onClose={() => setShowUpdateCourseStatus(false)}
      semesters={semesters}
      onUpdate={handleUpdateCourseStatus}
    />

    <SuccessPopup
      isOpen={showCourseSuccess}
      onClose={() => setShowCourseSuccess(false)}
      message="Course added successfully!"
      className="w-full max-w-lg"
    />
    <SuccessPopup
      isOpen={showSemesterSuccess}
      onClose={() => setShowSemesterSuccess(false)}
      message="Semester added successfully!"
      className="w-full max-w-md"
    />

    <ClearDataPopup
      isOpen={showClearData}
      onClose={() => setShowClearData(false)}
      onConfirm={handleClearData}
    />

    <SetupPopup
      isOpen={showSetup}
      onClose={() => { setShowSetup(false); setNeedsSetup(false); }}
      onSave={handleSetupSave}
    />
  </>
  );
};

export default App;