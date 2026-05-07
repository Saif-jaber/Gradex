import { useState, useEffect } from "react";
import { X } from "lucide-react";

const BRAND_RED = "#f23131";

const AddSemesterPopup = ({ isOpen, onClose, semesters, onAdd }) => {
  const [year, setYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const label = `Y${year} - S${semester}`;

    if (!startDate || !endDate) {
      setError("Please enter both start and end dates");
      return;
    }

    if (semesters.find((s) => s.label === label)) {
      setError("This semester already exists");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date");
      return;
    }

    onAdd({
      label,
      startDate,
      endDate,
      gpa: 0,
      courses: [],
    });

    setYear(1);
    setSemester(1);
    setStartDate("");
    setEndDate("");
    onClose();
  };

  useEffect(() => {
    if (!isOpen) setError("");
  }, [isOpen]);

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

          {/* Start & End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
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
