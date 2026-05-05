import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const BRAND_RED = "#f23131";

const AddSemesterPopup = ({ isOpen, onClose, semesters, onAdd, defaultCredits = 3 }) => {
  const [year, setYear] = useState(1);
  const [semester, setSemester] = useState(1);
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
    setCourses(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const validCourses = courses.filter((c) => c.name.trim());
    if (validCourses.length === 0) return;

    const label = `Y${year} - S${semester}`;
    if (semesters.find((s) => s.label === label)) {
      setError("This semester already exists");
      return;
    }

    const gradeMap = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, D: 1.0, F: 0.0 };
    const totalCredits = validCourses.reduce((sum, c) => sum + Number(c.credits), 0);
    const qualityPoints = validCourses.reduce((sum, c) => sum + (gradeMap[c.grade || "B"] * Number(c.credits)), 0);
    const avgGpa = totalCredits > 0 ? (qualityPoints / totalCredits) : 0;

    onAdd({
      label,
      gpa: parseFloat(avgGpa.toFixed(2)),
      courses: validCourses.map((c) => ({
        name: c.name.trim(),
        credits: Number(c.credits),
        status: c.status,
      })),
    });

    setYear(1);
    setSemester(1);
    setCourses([{ name: "", credits: defaultCredits, status: "done", grade: "A" }]);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) setError("");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Add Semester</h2>
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
          {/* Year & Semester */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              >
                {[1, 2, 3, 4, 5, 6].map((y) => (
                  <option key={y} value={y} className="bg-[#1a1a1a]">
                    Year {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              >
                {[1, 2, 3].map((s) => (
                  <option key={s} value={s} className="bg-[#1a1a1a]">
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>
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
                      <select
                        value={course.status}
                        onChange={(e) => updateCourse(idx, "status", e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2 outline-none focus:border-red-500/50 transition-colors"
                      >
                        <option value="done" className="bg-[#1a1a1a]">Completed</option>
                        <option value="taking" className="bg-[#1a1a1a]">Taking</option>
                      </select>
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
            Add Semester
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSemesterPopup;
