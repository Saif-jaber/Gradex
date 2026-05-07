import { useState } from "react";
import { X, Search } from "lucide-react";

const BRAND_RED = "#f23131";

const UpdateCourseGradePopup = ({ isOpen, onClose, semesters, onUpdate }) => {
  const [query, setQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newGrade, setNewGrade] = useState("A");
  const [error, setError] = useState("");

  const allCourses = semesters.flatMap((sem) =>
    sem.courses.map((c) => ({ ...c, semester: sem.label }))
  );

  const filtered = allCourses.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.semester.toLowerCase().includes(query.toLowerCase())
  );

  const handleUpdate = () => {
    if (!selectedCourse) {
      setError("Please select a course");
      return;
    }

    onUpdate({
      semester: selectedCourse.semester,
      courseName: selectedCourse.name,
      grade: newGrade,
      status: newGrade === "F" ? "failed" : selectedCourse.status,
    });

    setSelectedCourse(null);
    setNewGrade("A");
    setQuery("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Update Course Grade</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-400 -mt-3 mb-3">{error}</p>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search courses..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedCourse(null);
            }}
            className="w-full bg-white/5 border border-white/10 rounded-lg text-xs text-gray-200 placeholder-gray-500 pl-9 pr-3 py-2 outline-none focus:border-red-500/50 transition-colors"
          />
        </div>

        {/* Course List */}
        <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-1 mb-4">
          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No courses found</p>
          ) : (
            filtered.map((course, idx) => (
              <button
                key={`${course.semester}-${idx}`}
                onClick={() => setSelectedCourse(course)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCourse?.name === course.name && selectedCourse?.semester === course.semester
                    ? "bg-red-500/20 border border-red-500/50"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">{course.name}</span>
                  <span className="text-xs text-gray-500">{course.semester}</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* New Grade Selection */}
        {selectedCourse && (
          <div className="space-y-1.5 mb-4">
            <label className="text-xs text-gray-400 font-medium">New Grade</label>
            <select
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
            >
              {["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"].map((g) => (
                <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>
              ))}
            </select>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleUpdate}
          disabled={!selectedCourse}
          style={{ backgroundColor: selectedCourse ? BRAND_RED : "#666" }}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:cursor-not-allowed"
        >
          Update Grade
        </button>
      </div>
    </div>
  );
};

export default UpdateCourseGradePopup;
