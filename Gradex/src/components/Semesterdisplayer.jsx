import { useState } from "react";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";

const BRAND_RED = "#f23131";

const gradeMap = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0 };

const calcSemesterGPA = (sem, maxGpa = 4.0) => {
  const graded = sem.courses.filter((c) => c.grade && gradeMap[c.grade] !== undefined);
  if (graded.length === 0) return sem.gpa || 0;
  const totalCredits = graded.reduce((s, c) => s + c.credits, 0);
  if (totalCredits === 0) return 0;
  const raw = graded.reduce((s, c) => s + gradeMap[c.grade] * c.credits, 0) / totalCredits;
  return (raw / 4.0) * maxGpa;
};

const SemesterDisplayer = ({ semesters, maxGpa = 4.0 }) => {
  const [expanded, setExpanded] = useState({});
  const [query, setQuery] = useState("");

  const toggleSem = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const matchesSearch = (sem) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    if (sem.label.toLowerCase().includes(q)) return true;
    if (sem.gpa.toFixed(2).includes(q)) return true;
    return sem.courses.some((c) =>
      c.name.toLowerCase().includes(q) ||
      c.credits.toString().includes(q) ||
      c.status.toLowerCase().includes(q) ||
      (c.grade && c.grade.toLowerCase().includes(q))
    );
  };

  const filtered = semesters.filter(matchesSearch);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      className="rounded-2xl p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-sm font-semibold text-white">Semesters</h2>

        {/* Search bar */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search course, year, semester..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg text-xs text-gray-200 placeholder-gray-500 pl-9 pr-8 py-2 outline-none focus:border-red-500/50 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-xs text-gray-500">
          No results found for &quot;{query}&quot;
        </div>
      )}

      <div className="space-y-4">
        {filtered.map((sem) => {
          const isOpen = expanded[sem.label] !== false; // default open
          return (
            <div
              key={sem.label}
              className="rounded-xl bg-white/5 overflow-hidden"
            >
              {/* Semester header */}
              <button
                onClick={() => toggleSem(sem.label)}
                className="flex items-center justify-between w-full px-4 py-2.5"
                style={{
                  background: "rgba(242, 49, 49, 0.06)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-sm font-semibold text-white">{sem.label}</span>
                <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 text-gray-300">
                GPA: {calcSemesterGPA(sem, maxGpa).toFixed(2)}
              </span>
                  <span className="text-gray-400">
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </span>
                </div>
              </button>

              {/* Courses */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isOpen ? "500px" : "0px",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="px-4 py-2 space-y-1.5">
                  {sem.courses.map((course, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-xs py-1.5 border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            course.status === "done" || course.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        />
                        <span className="text-gray-200">{course.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500">{course.credits} cr</span>
                        {course.grade && (
                          <span className="text-gray-500">Grade: {course.grade}</span>
                        )}
                        <span
                          className={`text-[10px] uppercase tracking-wide font-medium px-2 py-0.5 rounded ${
                            course.status === "done" || course.status === "completed"
                              ? "text-green-400 bg-green-400/10"
                              : "text-yellow-400 bg-yellow-400/10"
                          }`}
                        >
                          {course.status === "done" || course.status === "completed" ? "Completed" : "Taking"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SemesterDisplayer;
