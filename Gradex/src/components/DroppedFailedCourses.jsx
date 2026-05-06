import { useState } from "react";
import { Search, X, AlertTriangle, BookOpen, Filter } from "lucide-react";

const STATUS_CONFIG = {
  dropped: { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", label: "Dropped" },
  failed: { color: "text-red-400 bg-red-400/10 border-red-400/20", label: "Failed" },
};

const DroppedFailedCourses = ({ semesters }) => {
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const droppedFailedCourses = semesters.flatMap((sem) =>
    sem.courses
      .filter((c) => c.status === "dropped" || c.status === "failed")
      .map((c) => ({ ...c, semester: sem.label }))
  );

  const filtered = droppedFailedCourses.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.semester.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = filterStatus === "all" || c.status === filterStatus;
    return matchesQuery && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const config = STATUS_CONFIG[status];
    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-yellow-400" />
          <h3 className="text-base font-semibold text-white">Dropped / Failed Courses</h3>
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/10 text-gray-300">
            {droppedFailedCourses.length}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-4 shrink-0">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search courses..."
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

        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white/5 border border-white/10 rounded-lg text-xs text-gray-200 pl-8 pr-8 py-2 outline-none focus:border-red-500/50 transition-colors cursor-pointer"
          >
            <option value="all">All</option>
            <option value="dropped">Dropped</option>
            <option value="failed">Failed</option>
          </select>
          <Filter size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen size={32} className="mx-auto text-gray-600 mb-2" />
            <p className="text-sm text-gray-500">
              {droppedFailedCourses.length === 0
                ? "No dropped or failed courses"
                : "No results found"}
            </p>
          </div>
        ) : (
          filtered.map((course, idx) => (
            <div
              key={`${course.semester}-${idx}`}
              className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white font-medium truncate">{course.name}</span>
                  {getStatusBadge(course.status)}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-gray-500">{course.semester}</span>
                  <span className="text-[10px] text-gray-600">·</span>
                  <span className="text-[10px] text-gray-500">{course.credits} cr</span>
                  {course.grade && (
                    <>
                      <span className="text-[10px] text-gray-600">·</span>
                      <span className="text-[10px] text-gray-500">Grade: {course.grade}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DroppedFailedCourses;
