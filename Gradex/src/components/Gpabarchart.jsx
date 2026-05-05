const BRAND_RED = "#f23131";

const gradeMap = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0 };

const calcSemesterGPA = (sem) => {
  const graded = sem.courses.filter((c) => c.grade && gradeMap[c.grade] !== undefined);
  if (graded.length === 0) return sem.gpa || 0;
  const totalCredits = graded.reduce((s, c) => s + c.credits, 0);
  if (totalCredits === 0) return 0;
  return graded.reduce((s, c) => s + gradeMap[c.grade] * c.credits, 0) / totalCredits;
};

const GpaBarChart = ({ semesters, maxGpa = 4.0 }) => {
  if (!semesters || semesters.length === 0) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
        className="rounded-2xl p-6 flex flex-col gap-5 items-center justify-center min-h-[200px]"
      >
        <h2 className="text-sm font-semibold text-white">GPA by semester</h2>
        <span className="text-xs text-gray-500">No registered semesters yet</span>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      className="rounded-2xl p-6 flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">GPA by semester</h2>
        <span className="text-[11px] text-gray-500">out of {maxGpa.toFixed(1)}</span>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-3.5">
        {semesters.map((sem) => {
          const raw = calcSemesterGPA(sem);
          const gpa = (raw / 4.0) * maxGpa;
          const pct = (gpa / maxGpa) * 100;
          return (
            <div key={sem.label} className="flex items-center gap-3">
              {/* Label */}
              <span className="text-[11px] text-gray-500 w-20 shrink-0">
                {sem.label}
              </span>

              {/* Track */}
              <div
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                className="flex-1 h-[6px] rounded-full overflow-hidden"
              >
                <div
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, #c0392b, ${BRAND_RED})`,
                  }}
                  className="h-full rounded-full"
                />
              </div>

              {/* Value */}
              <span className="text-xs font-semibold text-white w-8 text-right">
                {gpa.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GpaBarChart;