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
  Pencil,
  Check,
  X,
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

const SettingsPage = ({ semesters, setSemesters, academic, setAcademic, profile, setProfile, onOpenClearData, onSaveAcademic }) => {
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (field, currentValue) => {
    setEditingField(field);
    setEditValue(String(currentValue));
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue("");
  };

  const saveEdit = (field) => {
    const numValue = Number(editValue);
    if (isNaN(numValue)) return;
    setAcademic({ ...a, [field]: numValue });
    onSaveAcademic(field, numValue);
    setEditingField(null);
    setEditValue("");
  };

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
            {[
              { key: "maxGPA", label: "Max GPA", type: "select", options: [4.0, 5.0, 10.0] },
              { key: "semestersPerYear", label: "Semesters / Year", type: "select", options: [2, 3, 4] },
              { key: "graduationCredits", label: "Graduation Credits", type: "number", min: 60, max: 200 },
              { key: "defaultCredits", label: "Default Credits", type: "number", min: 1, max: 6 },
            ].map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">{field.label}</label>
                {editingField === field.key ? (
                  <div className="flex items-center gap-1">
                    {field.type === "select" ? (
                      <select
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg text-sm text-white px-2 py-2.5 outline-none focus:border-red-500/50 transition-colors"
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#1a1a1a]">{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        min={field.min}
                        max={field.max}
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg text-sm text-white px-2 py-2.5 outline-none focus:border-red-500/50 transition-colors"
                      />
                    )}
                    <button
                      onClick={() => saveEdit(field.key)}
                      className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="p-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/15 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="flex-1 bg-white/5 border border-white/10 rounded-lg text-sm text-white px-3 py-2.5">
                      {String(a[field.key] ?? "")}
                    </div>
                    <button
                      onClick={() => startEdit(field.key, a[field.key] ?? "")}
                      className="p-2 rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/10 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))}
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

            <button
              onClick={onOpenClearData}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 size={14} />
              Clear Data
            </button>
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
