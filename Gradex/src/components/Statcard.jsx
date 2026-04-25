const StatCard = ({ label, value }) => {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      className="rounded-2xl p-5 flex flex-col gap-3 hover:border-white/15 transition-all duration-200"
    >
      <span className="text-[17px] uppercase tracking-[0.15em] text-gray-500 font-medium">
        {label}
      </span>

      <span className="text-4xl font-semibold leading-none text-white">
        {value}
      </span>
    </div>
  );
};

export default StatCard;