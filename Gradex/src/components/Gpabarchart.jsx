const BRAND_RED = "#f23131";

const DEFAULT_SEMESTERS = [
  { label: "Year 1 · S1", gpa: 3.0 },
  { label: "Year 1 · S2", gpa: 3.2 },
  { label: "Year 2 · S1", gpa: 3.3 },
  { label: "Year 2 · S2", gpa: 3.4 },
  { label: "Year 3 · S1", gpa: 3.5 },
  { label: "Year 3 · S2", gpa: 3.67 },
];

const MAX_GPA = 4.0;

const GpaBarChart = ({ semesters = DEFAULT_SEMESTERS }) => {
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
        <span className="text-[11px] text-gray-500">out of {MAX_GPA.toFixed(1)}</span>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-3.5">
        {semesters.map((sem) => {
          const pct = (sem.gpa / MAX_GPA) * 100;
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
                {sem.gpa.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GpaBarChart;