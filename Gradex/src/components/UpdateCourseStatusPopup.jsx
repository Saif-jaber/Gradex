import { useState, useEffect } from "react";
import { X, Search, RefreshCw } from "lucide-react";

const BRAND_RED = "#f23131";
const STATUSES = ["taking", "dropped", "completed", "failed"];
const GRADES = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

const UpdateCourseStatusPopup = ({ isOpen, onClose, semesters, onUpdate }) => {
  const [query, setQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [newGrade, setNewGrade] = useState("A");

  const allCourses = semesters.flatMap((sem) =>
    sem.courses.map((c) => ({ ...c, semester: sem.label, currentStatus: c.status || "taking" }))
  );

  const filtered = allCourses.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.semester.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (selectedStatus === "failed") {
      setNewGrade("F");
    } else if (selectedStatus === "completed") {
      setNewGrade(selectedCourse?.grade || "A");
    }
  }, [selectedStatus]);

  const handleUpdate = () => {
    if (!selectedCourse || !selectedStatus) return;
    const grade =
      selectedStatus === "failed" ? "F" :
      selectedStatus === "completed" ? newGrade :
      null;
    onUpdate({
      courseId: selectedCourse.id,
      semester: selectedCourse.semester,
      courseName: selectedCourse.name,
      status: selectedStatus,
      grade,
    });
    setSelectedCourse(null);
    setSelectedStatus("");
    setNewGrade("A");
    setQuery("");
    onClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "taking": return "text-blue-400 bg-blue-400/10";
      case "dropped": return "text-yellow-400 bg-yellow-400/10";
      case "completed": return "text-green-400 bg-green-400/10";
      case "failed": return "text-red-400 bg-red-400/10";
      default: return "text-gray-400 bg-gray-400/10";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Update Course Status</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {selectedCourse ? (
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-white font-medium">{selectedCourse.name}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                {selectedCourse.semester} · {selectedCourse.credits} cr ·
                <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${getStatusColor(selectedCourse.currentStatus)}`}>
                  {selectedCourse.currentStatus}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-gray-400">Select new status:</p>
              {STATUSES.filter(s => s !== selectedCourse.currentStatus).map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors ${
                    selectedStatus === status
                      ? "bg-red-600 text-white"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <span className={`px-2 py-0.5 rounded-full text-[10px] mr-2 ${getStatusColor(status)}`}>
                    {status}
                  </span>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {(selectedStatus === "completed" || selectedStatus === "failed") && (
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">
                  {selectedStatus === "failed" ? "Grade (auto-set to F)" : "Grade"}
                </label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  disabled={selectedStatus === "failed"}
                  className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors disabled:opacity-50"
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleUpdate}
                disabled={!selectedStatus}
                className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={14} />
                Update Status
              </button>
              <button
                onClick={() => { setSelectedCourse(null); setSelectedStatus(""); setNewGrade("A"); }}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-sm text-gray-300 hover:bg-white/15 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search courses or semesters..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); }}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-xs text-gray-200 placeholder-gray-500 pl-9 pr-8 py-2 outline-none focus:border-red-500/50 transition-colors"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="space-y-2">
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">
                  {allCourses.length === 0 ? "No courses found." : "No results found."}
                </p>
              ) : (
                filtered.map((course, idx) => (
                  <div
                    key={`${course.semester}-${idx}`}
                    onClick={() => setSelectedCourse(course)}
                    className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5 hover:bg-white/10 cursor-pointer transition-colors"
                  >
                    <div>
                      <span className="text-sm text-white font-medium">{course.name}</span>
                      <span className="text-[10px] text-gray-500 ml-2">{course.semester} · {course.credits} cr</span>
                      <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${getStatusColor(course.currentStatus)}`}>
                        {course.currentStatus}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UpdateCourseStatusPopup;
