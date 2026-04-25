import StatCard from "../components/Statcard.jsx";
import GpaBarChart from "../components/Gpabarchart.jsx";
import GpaGauge from "../components/Gpagauge.jsx";

// ── Replace with real data from your state / API ─────────────────────────────
const statCards = [
  { label: "Cumulative GPA", value: "3.50" },
  { label: "Semester GPA",   value: "3.67" },
  { label: "Credit Hours",   value: "87"   },
  { label: "Courses Taken",  value: "24"   },
];

const semesters = [
  { label: "Year 1 · S1", gpa: 3.0 },
  { label: "Year 1 · S2", gpa: 3.2 },
  { label: "Year 2 · S1", gpa: 3.3 },
  { label: "Year 2 · S2", gpa: 3.4 },
  { label: "Year 3 · S1", gpa: 3.5 },
  { label: "Year 3 · S2", gpa: 3.67 },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 p-6 w-full min-h-screen bg-[#111111]">

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard
            key={card.label}
            label={card.label}
            value={card.value}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GpaBarChart semesters={semesters} />
        <GpaGauge
          gpa={3.5}
          maxGpa={4.0}
          degreeProgress={72}
          standing="Honor"
        />
      </div>
    </div>
  );
};

export default Dashboard;


