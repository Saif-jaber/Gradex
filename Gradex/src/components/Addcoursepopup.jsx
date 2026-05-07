import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const BRAND_RED = "#f23131";

const AddCoursePopup = ({ isOpen, onClose, semesters, onAdd, defaultCredits = 3 }) => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([
    { name: "", credits: defaultCredits, status: "done", grade: "A" },
  ]);

  const addCourse = () => {
    setCourses([...courses, { name: "", credits: defaultCredits, status: "done", grade: "A" }]);
  };

  const removeCourse = (idx) => {
    if (courses.length > 1) setCourses(courses.filter((_, i) => i !== idx));
  };

  const updateCourse = (idx, field, value) => {
    const updated = [...courses];
    updated[idx] = { ...updated[idx], [field]: value };

    if (field === "grade" && value === "F") {
      updated[idx].status = "failed";
    }

    setCourses(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!selectedSemester) {
      setError("Please select a semester");
      return;
    }

    const validCourses = courses.filter((c) => c.name.trim());
    if (validCourses.length === 0) return;

    onAdd({
      semester: selectedSemester,
      courses: validCourses.map((c) => ({
        name: c.name.trim(),
        credits: Number(c.credits),
        grade: c.grade,
        status: c.grade === "F" ? "failed" : c.status,
      })),
    });

    setSelectedSemester("");
    setCourses([{ name: "", credits: defaultCredits, status: "done", grade: "A" }]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Add Course</h2>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Select existing semester */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Select Semester</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
            >
              <option value="" className="bg-[#1a1a1a]">
                Select a semester
              </option>
              {semesters.map((sem) => (
                <option key={sem.label} value={sem.label} className="bg-[#1a1a1a]">
                  {sem.label}
                </option>
              ))}
            </select>
          </div>

          {/* Courses */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-400 font-medium">Courses</label>
              <button
                type="button"
                onClick={addCourse}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                <Plus size={14} />
                Add course
              </button>
            </div>

            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-xl p-3 space-y-2.5 border border-white/5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] uppercase tracking-wide text-gray-500 mt-2">
                    #{idx + 1}
                  </span>
                  {courses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCourse(idx)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Course name"
                    value={course.name}
                    onChange={(e) => updateCourse(idx, "name", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 px-3 py-2 outline-none focus:border-red-500/50 transition-colors"
                  />

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500">Credits</label>
                      <input
                        type="number"
                        min="1"
                        max="6"
                        value={course.credits}
                        onChange={(e) => updateCourse(idx, "credits", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2 outline-none focus:border-red-500/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500">Grade</label>
                      <select
                        value={course.grade}
                        onChange={(e) => updateCourse(idx, "grade", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2 outline-none focus:border-red-500/50 transition-colors"
                      >
                        {["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"].map((g) => (
                          <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-gray-500">Status</label>
                      {course.grade === "F" ? (
                        <div className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-red-400 px-3 py-2">
                          Failed
                        </div>
                      ) : (
                        <select
                          value={course.status}
                          onChange={(e) => updateCourse(idx, "status", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2 outline-none focus:border-red-500/50 transition-colors"
                        >
                          <option value="done" className="bg-[#1a1a1a]">Completed</option>
                          <option value="taking" className="bg-[#1a1a1a]">Taking</option>
                          <option value="failed" className="bg-[#1a1a1a]">Failed</option>
                          <option value="dropped" className="bg-[#1a1a1a]">Dropped</option>
                        </select>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            style={{ backgroundColor: BRAND_RED }}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity mt-4"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoursePopup;
