import { useState } from "react";
import { GraduationCap, Building2, X } from "lucide-react";

const BRAND_RED = "#f23131";

const SetupPopup = ({ isOpen, onClose, onSave }) => {
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!university.trim() && !major.trim()) return;

    setLoading(true);
    try {
      await onSave({ university: university.trim(), major: major.trim() });
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <img src="/logo.png" className="w-7 h-7 object-contain rounded-lg" alt="Gradex" />
          <span className="text-base font-bold text-white">Gradex</span>
        </div>

        <h2 className="text-lg font-bold text-white mb-1">Welcome to Gradex!</h2>
        <p className="text-gray-400 text-xs mb-6">Tell us a bit about yourself to get started.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">University / College</label>
            <div className="relative">
              <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="e.g. MIT"
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 pl-9 pr-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">Major / Program</label>
            <div className="relative">
              <GraduationCap size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="e.g. Computer Science"
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 pl-9 pr-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || (!university.trim() && !major.trim())}
            style={{ backgroundColor: BRAND_RED }}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
            ) : (
              "Get Started"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupPopup;
