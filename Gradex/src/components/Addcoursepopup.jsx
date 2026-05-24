import { useState } from "react";
import { X } from "lucide-react";
import { addCourse as addCourseApi } from "../services/courseSrv";
import SuccessPopup from "./SuccessPopup.jsx";

const BRAND_RED = "#f23131";

const AddCoursePopup = ({ isOpen, onClose, semesters, onAdd, defaultCredits = 3 }) => {
  const [selectedSemester, setSelectedSemester] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [course, setCourse] = useState({
    name: "",
    code: "",
    credits: defaultCredits,
    status: "done",
    grade: "A",
  });

  const updateCourse = (field, value) => {
    const updated = { ...course, [field]: value };

    if (field === "grade" && value === "F") {
      updated.status = "failed";
    }

    setCourse(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!selectedSemester) {
      setError("Please select a semester");
      return;
    }

    const courseName = course.name.trim();
    if (!courseName) {
      setError("Please enter a course name");
      return;
    }

    try {
      const matched = semesters.find((s) => s.label === selectedSemester);
      if (!matched || !matched.id) {
        setError("Semester not found. Please try again.");
        return;
      }

      const courseData = {
        name: courseName,
        code: course.code.trim() || null,
        credits: Number(course.credits),
        grade: course.grade,
        status: course.grade === "F" ? "failed" : course.status === "done" ? "completed" : course.status,
      };

       const dbCourse = await addCourseApi({
         semester_id: matched.id,
         ...courseData,
       });

       const courseWithId = { ...courseData, id: dbCourse?.id };

       onAdd({
         semester: selectedSemester,
         course: courseWithId,
       });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedSemester("");
        setCourse({ name: "", code: "", credits: defaultCredits, status: "done", grade: "A" });
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Add course error:", err);
      setError(err.message || "Failed to add course. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        message="Course added successfully!"
        className="w-full max-w-md"
      />
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
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

          <div className="bg-white/5 rounded-xl p-4 space-y-3 border border-white/5">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Course Name</label>
              <input
                type="text"
                placeholder="e.g., Calculus I"
                value={course.name}
                onChange={(e) => updateCourse("name", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Course Code</label>
              <input
                type="text"
                placeholder="e.g., MATH101"
                value={course.code}
                onChange={(e) => updateCourse("code", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-medium">Credits</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={course.credits}
                  onChange={(e) => updateCourse("credits", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-medium">Grade</label>
                <select
                  value={course.grade}
                  onChange={(e) => updateCourse("grade", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
                >
                  {["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"].map((g) => (
                    <option key={g} value={g} className="bg-[#1a1a1a]">{g}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-medium">Status</label>
                {course.grade === "F" ? (
                  <div className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-red-400 px-3 py-2.5 flex items-center">
                    Failed
                  </div>
                ) : (
                  <select
                    value={course.status}
                    onChange={(e) => updateCourse("status", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
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

          <button
            type="submit"
            style={{ backgroundColor: BRAND_RED }}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity mt-2"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddCoursePopup;
