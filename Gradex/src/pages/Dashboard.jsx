import StatCard from "../components/Statcard.jsx";
import GpaBarChart from "../components/Gpabarchart.jsx";
import GpaGauge from "../components/Gpagauge.jsx";
import SemesterDisplayer from "../components/Semesterdisplayer.jsx";

const defaultSemesters = [
  {
    label: "Y1 - S1",
    gpa: 3.0,
    courses: [
      { name: "Mathematics 101", credits: 3, status: "done" },
      { name: "Physics 101", credits: 3, status: "done" },
      { name: "English 101", credits: 3, status: "done" },
    ],
  },
  {
    label: "Y1 - S2",
    gpa: 3.2,
    courses: [
      { name: "Mathematics 102", credits: 3, status: "done" },
      { name: "Chemistry 101", credits: 3, status: "done" },
      { name: "History 101", credits: 3, status: "done" },
    ],
  },
  {
    label: "Y2 - S1",
    gpa: 3.3,
    courses: [
      { name: "Data Structures", credits: 3, status: "done" },
      { name: "Algorithms", credits: 3, status: "done" },
      { name: "Database Systems", credits: 3, status: "done" },
    ],
  },
  {
    label: "Y2 - S2",
    gpa: 3.4,
    courses: [
      { name: "Operating Systems", credits: 3, status: "done" },
      { name: "Computer Networks", credits: 3, status: "done" },
      { name: "Software Engineering", credits: 3, status: "done" },
    ],
  },
  {
    label: "Y3 - S1",
    gpa: 3.5,
    courses: [
      { name: "Machine Learning", credits: 3, status: "taking" },
      { name: "Artificial Intelligence", credits: 3, status: "taking" },
      { name: "Web Development", credits: 3, status: "taking" },
    ],
  },
  {
    label: "Y3 - S2",
    gpa: 3.67,
    courses: [
      { name: "Cloud Computing", credits: 3, status: "taking" },
      { name: "Cybersecurity", credits: 3, status: "taking" },
      { name: "Mobile Development", credits: 3, status: "taking" },
    ],
  },
];

const Dashboard = ({ semesters: propSemesters, academic }) => {
  const semesters = propSemesters && propSemesters.length > 0 ? propSemesters : defaultSemesters;
  const maxGPA = academic?.maxGPA || 4.0;
  const graduationCredits = academic?.graduationCredits || 120;

  const gradeMap = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0 };
  const scaleToMax = (val) => (val / 4.0) * maxGPA;

  const calcSemesterGPA = (sem) => {
    const graded = sem.courses.filter((c) => c.grade && gradeMap[c.grade] !== undefined);
    if (graded.length === 0) return sem.gpa || 0;
    const totalCredits = graded.reduce((s, c) => s + c.credits, 0);
    if (totalCredits === 0) return 0;
    const raw = graded.reduce((s, c) => s + gradeMap[c.grade] * c.credits, 0) / totalCredits;
    return scaleToMax(raw);
  };

  const totalCredits = semesters.reduce(
    (sum, sem) => sum + sem.courses.reduce((s, c) => s + c.credits, 0), 0
  );

  const totalCourses = semesters.reduce((sum, sem) => sum + sem.courses.length, 0);

  const completedSemesters = semesters.filter((sem) =>
    sem.courses.every((c) => c.status === "done")
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


