import StatCard from "../components/Statcard.jsx";
import GpaBarChart from "../components/Gpabarchart.jsx";
import GpaGauge from "../components/Gpagauge.jsx";
import SemesterDisplayer from "../components/Semesterdisplayer.jsx";
import DroppedFailedCourses from "../components/DroppedFailedCourses.jsx";

const gradeMap = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0 };

const Dashboard = ({ semesters, academic }) => {
  const maxGPA = Number(academic?.maxGPA) || 4.0;
  const graduationCredits = Number(academic?.graduationCredits) || 120;

  const scaleToMax = (val) => (val / 4.0) * maxGPA;

  const calcSemesterGPA = (sem) => {
    const graded = sem.courses ? sem.courses.filter((c) => c.grade && gradeMap[c.grade] !== undefined) : [];
    if (graded.length === 0) return Number(sem.gpa) || 0;
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

   const calcCumulativeGPA = () => {
     let totalQualityPoints = 0;
     let totalCredits = 0;

     for (const sem of semesters) {
       if (!sem.courses) continue;
       for (const c of sem.courses) {
         if (c.grade && gradeMap[c.grade] !== undefined) {
           totalQualityPoints += gradeMap[c.grade] * c.credits;
           totalCredits += c.credits;
         }
       }
     }

     if (totalCredits === 0) return "0.00";
     const raw = totalQualityPoints / totalCredits;
     return scaleToMax(raw).toFixed(2);
   };

   const cumulativeGPA = calcCumulativeGPA();

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

      {/* Charts and Dropped/Failed Widget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 h-80">
          <GpaBarChart semesters={semesters} maxGpa={maxGPA} />
        </div>
        <div className="md:col-span-1 h-80">
          <GpaGauge
            gpa={parseFloat(cumulativeGPA)}
            maxGpa={maxGPA}
            degreeProgress={degreeProgress}
          />
        </div>
        <div className="md:col-span-1 h-80">
          <DroppedFailedCourses semesters={semesters} />
        </div>
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
