import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { authAPI } from "../services/api";
import StatCard from "../components/Statcard.jsx";
import GpaBarChart from "../components/Gpabarchart.jsx";
import GpaGauge from "../components/Gpagauge.jsx";
import SemesterDisplayer from "../components/Semesterdisplayer.jsx";

const gradeMap = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0 };

const Dashboard = ({ userId, academic }) => {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  const maxGPA = academic?.maxGPA || 4.0;
  const graduationCredits = academic?.graduationCredits || 120;

  useEffect(() => {
    if (userId) {
      loadSemesters();
    }
  }, [userId]);

  const loadSemesters = async () => {
    try {
      setLoading(true);
      const data = await authAPI.getSemesters();
      setSemesters(data.semesters || []);
    } catch (error) {
      addToast(error.message || "Failed to load semesters", "error");
    } finally {
      setLoading(false);
    }
  };

  const scaleToMax = (val) => (val / 4.0) * maxGPA;

  const calcSemesterGPA = (sem) => {
    const graded = sem.courses ? sem.courses.filter((c) => c.grade && gradeMap[c.grade] !== undefined) : [];
    if (graded.length === 0) return sem.gpa || 0;
    const totalCredits = graded.reduce((s, c) => s + c.credits, 0);
    if (totalCredits === 0) return 0;
    const raw = graded.reduce((s, c) => s + gradeMap[c.grade] * c.credits, 0) / totalCredits;
    return scaleToMax(raw);
  };

  const totalCredits = semesters.reduce(
    (sum, sem) => sum + (sem.courses ? sem.courses.reduce((s, c) => s + c.credits, 0) : 0),
    0
  );

  const totalCourses = semesters.reduce((sum, sem) => sum + (sem.courses ? sem.courses.length : 0), 0);

  const completedSemesters = semesters.filter((sem) =>
    sem.courses && sem.courses.every((c) => c.status === "completed")
  );

  const cumulativeGPA =
    completedSemesters.length > 0
      ? (
          completedSemesters.reduce((sum, sem) => sum + calcSemesterGPA(sem), 0) /
          completedSemesters.length
        ).toFixed(2)
      : "0.00";

  const lastSemester = semesters[semesters.length - 1];
  const semesterGPA = lastSemester ? calcSemesterGPA(lastSemester).toFixed(2) : "0.00";

  const degreeProgress = Math.min(
    Math.round((totalCredits / graduationCredits) * 100),
    100
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111111]">
        <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 w-full min-h-screen bg-[#111111]">

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Cumulative GPA" value={cumulativeGPA} />
        <StatCard label="Semester GPA" value={semesterGPA} />
        <StatCard label="Credit Hours" value={totalCredits} />
        <StatCard label="Courses Taken" value={totalCourses} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GpaBarChart semesters={semesters} maxGpa={maxGPA} />
        <GpaGauge
          gpa={parseFloat(cumulativeGPA)}
          maxGpa={maxGPA}
          degreeProgress={degreeProgress}
        />
      </div>

      {/* Separator */}
      <hr style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="w-full" />

      {/* Semesters */}
      <div id="semesters-section">
        <SemesterDisplayer semesters={semesters} maxGpa={maxGPA} />
      </div>
    </div>
  );
};

export default Dashboard;
