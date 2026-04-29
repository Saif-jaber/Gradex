import { useState } from "react";
import { X } from "lucide-react";

const BRAND_RED = "#f23131";

const AddCoursePopup = ({ isOpen, onClose, semesters, onAdd, defaultCredits = 3 }) => {
  const [year, setYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [existing, setExisting] = useState("");
  const [courseName, setCourseName] = useState("");
  const [credits, setCredits] = useState(defaultCredits);
  const [status, setStatus] = useState("done");
  const [grade, setGrade] = useState("A");

  const useExisting = existing !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseName.trim()) return;

    const targetSemester = useExisting ? existing : `Y${year} - S${semester}`;

    onAdd({
      semester: targetSemester,
      course: {
        name: courseName.trim(),
        credits: Number(credits),
        status,
        grade,
      },
    });

    setCourseName("");
    setCredits(defaultCredits);
    setStatus("done");
    setGrade("A");
    setExisting("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Existing semester */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Add to existing semester</label>
            <select
              value={existing}
              onChange={(e) => setExisting(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
            >
              <option value="" className="bg-[#1a1a1a]">
                New semester
              </option>
              {semesters.map((sem) => (
                <option key={sem.label} value={sem.label} className="bg-[#1a1a1a]">
                  {sem.label}
                </option>
              ))}
            </select>
          </div>

          {/* Year & Semester (only if no existing selected) */}
          {!useExisting && (
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
          )}

          {/* Course name */}
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 font-medium">Course name</label>
            <input
              type="text"
              placeholder="e.g. Mathematics 101"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          {/* Credits, Grade & Status */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Credits</label>
              <input
                type="number"
                min="1"
                max="6"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Grade</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              >
                {["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"].map((g) => (
                  <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              >
                <option value="done" className="bg-[#1a1a1a]">Completed</option>
                <option value="taking" className="bg-[#1a1a1a]">Taking</option>
              </select>
            </div>
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
