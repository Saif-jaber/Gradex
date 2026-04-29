import { useState } from "react";
import {
  Download,
  Upload,
  Trash2,
  RotateCcw,
  User,
  GraduationCap,
  BookOpen,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const BRAND_RED = "#f23131";

const Section = ({ icon, title, description, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-5 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span style={{ color: BRAND_RED }}>{icon}</span>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <p className="text-[11px] text-gray-500">{description}</p>
          </div>
        </div>
        <span className="text-gray-500">{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
          {children}
        </div>
      )}
    </div>
  );
};

const SettingsPage = ({ semesters, setSemesters, academic, setAcademic, profile, setProfile }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExport = () => {
    const data = {
      profile,
      academic: a,
      semesters,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const aEl = document.createElement("a");
    aEl.href = url;
    aEl.download = `gradex-backup-${new Date().toISOString().slice(0, 10)}.json`;
    aEl.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target.result);
        if (data.profile) setProfile(data.profile);
        if (data.academic) setAcademic(data.academic);
        if (data.semesters) setSemesters(data.semesters);
      } catch {
        alert("Invalid backup file");
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    setSemesters([]);
    setShowDeleteConfirm(false);
  };

  const handleReset = () => {
    setProfile({ name: "", university: "", major: "" });
    setAcademic({ maxGPA: 4.0, semestersPerYear: 3, graduationCredits: 120, defaultCredits: 3 });
    setSemesters([]);
  };

  const defaultAcademic = { maxGPA: 4.0, semestersPerYear: 3, graduationCredits: 120, defaultCredits: 3 };
  const a = academic || defaultAcademic;

  return (
    <div className="flex flex-col gap-4 p-6 w-full min-h-screen bg-[#111111] items-start">
      <div className="w-full max-w-3xl space-y-4">
        {/* Profile */}
        <Section
          icon={<User size={18} />}
          title="Profile"
          description="Your personal and academic information"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">University / College</label>
              <input
                type="text"
                placeholder="MIT"
                value={profile.university}
                onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs text-gray-400 font-medium">Major / Program</label>
              <input
                type="text"
                placeholder="Computer Science"
                value={profile.major}
                onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
          </div>
        </Section>

        {/* Academic */}
        <Section
          icon={<GraduationCap size={18} />}
          title="Academic Settings"
          description="Configure GPA scale and graduation requirements"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Max GPA</label>
              <select
                value={a.maxGPA}
                onChange={(e) => setAcademic({ ...a, maxGPA: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              >
                <option value={4.0} className="bg-[#1a1a1a]">4.0</option>
                <option value={5.0} className="bg-[#1a1a1a]">5.0</option>
                <option value={10.0} className="bg-[#1a1a1a]">10.0</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Semesters / Year</label>
              <select
                value={a.semestersPerYear}
                onChange={(e) => setAcademic({ ...a, semestersPerYear: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              >
                {[2, 3, 4].map((n) => (
                  <option key={n} value={n} className="bg-[#1a1a1a]">{n}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Graduation Credits</label>
              <input
                type="number"
                min="60"
                max="200"
                value={a.graduationCredits}
                onChange={(e) => setAcademic({ ...a, graduationCredits: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 font-medium">Default Credits</label>
              <input
                type="number"
                min="1"
                max="6"
                value={a.defaultCredits}
                onChange={(e) => setAcademic({ ...a, defaultCredits: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5 outline-none focus:border-red-500/50 transition-colors"
              />
            </div>
          </div>
        </Section>

        {/* Data Management */}
        <Section
          icon={<SettingsIcon size={18} />}
          title="Data Management"
          description="Export, import, or clear your data"
        >
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 hover:bg-white/10 transition-colors"
            >
              <Download size={14} />
              Export Backup
            </button>

            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 hover:bg-white/10 transition-colors cursor-pointer">
              <Upload size={14} />
              Import Backup
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-200 hover:bg-white/10 transition-colors"
            >
              <RotateCcw size={14} />
              Reset All
            </button>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <Trash2 size={14} />
                Clear Data
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-400">Are you sure?</span>
                <button
                  onClick={handleClearData}
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-xs font-semibold text-white hover:bg-red-600 transition-colors"
                >
                  Yes, clear
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 text-xs text-gray-300 hover:bg-white/15 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </Section>

        {/* Stats */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-white">{semesters.length}</div>
              <div className="text-[10px] uppercase tracking-wide text-gray-500">Semesters</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">
                {semesters.reduce((s, sem) => s + sem.courses.length, 0)}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-gray-500">Courses</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-white">
                {semesters.reduce((s, sem) => s + sem.courses.reduce((c, cr) => c + cr.credits, 0), 0)}
              </div>
              <div className="text-[10px] uppercase tracking-wide text-gray-500">Total Credits</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
