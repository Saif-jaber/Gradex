const BRAND_RED = "#f23131";

const polarToCartesian = (cx, cy, r, angleDeg) => {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
};

const describeArc = (cx, cy, r, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
};

const GpaGauge = ({
  gpa = 3.5,
  maxGpa = 4.0,
  degreeProgress = 72,
  standing = "Honor",
}) => {
  const cx = 110;
  const cy = 105;
  const r = 78;
  const startAngle = -210;
  const endAngle = 30;
  const fillAngle = startAngle + (gpa / maxGpa) * (endAngle - startAngle);

  const trackPath = describeArc(cx, cy, r, startAngle, endAngle);
  const fillPath = describeArc(cx, cy, r, startAngle, fillAngle);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      className="rounded-2xl p-6 flex flex-col gap-4"
    >
      {/* Header */}
      <h2 className="text-sm font-semibold text-white">Cumulative GPA</h2>

      {/* Gauge SVG */}
      <div className="flex justify-center">
        <svg
          width="220"
          height="145"
          viewBox="0 0 220 145"
          aria-label={`GPA gauge showing ${gpa} out of ${maxGpa}`}
        >
          {/* Track arc */}
          <path
            d={trackPath}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Glow effect behind fill */}
          <path
            d={fillPath}
            fill="none"
            stroke="rgba(242,49,49,0.2)"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Fill arc */}
          <path
            d={fillPath}
            fill="none"
            stroke={BRAND_RED}
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* GPA number */}
          <text
            x={cx}
            y={cy + 6}
            textAnchor="middle"
            fontSize="30"
            fontWeight="600"
            fill={BRAND_RED}
            fontFamily="inherit"
          >
            {gpa.toFixed(2)}
          </text>
          {/* Sub label */}
          <text
            x={cx}
            y={cy + 24}
            textAnchor="middle"
            fontSize="11"
            fill="#6b7280"
            fontFamily="inherit"
          >
            out of {maxGpa.toFixed(1)}
          </text>
        </svg>
      </div>

      {/* Scale */}
      <div className="flex justify-between px-3 -mt-3">
        {[0.0, 1.0, 2.0, 3.0, 4.0].map((v) => (
          <span key={v} className="text-[10px] text-gray-600">
            {v.toFixed(1)}
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        className="flex justify-around pt-4 mt-1"
      >
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xl font-semibold text-white">{degreeProgress}%</span>
          <span className="text-[11px] text-gray-500">Degree progress</span>
        </div>
        <div style={{ width: "1px", background: "rgba(255,255,255,0.07)" }} />
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-xl font-semibold text-white">{standing}</span>
          <span className="text-[11px] text-gray-500">Standing</span>
        </div>
      </div>
    </div>
  );
};

export default GpaGauge;