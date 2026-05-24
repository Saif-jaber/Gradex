import { useState } from "react";
import { X, Search, AlertTriangle, Trash2 } from "lucide-react";

const BRAND_RED = "#f23131";

const DeleteSemesterPopup = ({ isOpen, onClose, semesters, onDelete }) => {
  const [query, setQuery] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = semesters.filter((sem) =>
    sem.label.toLowerCase().includes(query.toLowerCase())
  );

   const handleDelete = () => {
     if (!pendingDelete) return;
     onDelete({ 
       label: pendingDelete.label, 
       id: pendingDelete.id 
     });
     setPendingDelete(null);
     onClose();
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
          <h2 className="text-lg font-semibold text-white">Delete Semester</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="relative mb-4">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search semesters..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPendingDelete(null); }}
            className="w-full bg-white/5 border border-white/10 rounded-lg text-xs text-gray-200 placeholder-gray-500 pl-9 pr-8 py-2 outline-none focus:border-red-500/50 transition-colors"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

         {pendingDelete ? (
           <div className="space-y-4">
             <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
               <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
               <p className="text-xs text-red-300">
                 Delete <span className="text-red-200 font-medium">{pendingDelete.label}</span> and all {pendingDelete.courses?.length || 0} courses in it? This cannot be undone.
               </p>
             </div>
            <div className="flex gap-2">
              <button
                onClick={handleDelete}
                className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
              >
                <Trash2 size={14} />
                Delete
              </button>
              <button
                onClick={() => setPendingDelete(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-sm text-gray-300 hover:bg-white/15 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                {semesters.length === 0 ? "No semesters to delete." : "No results found."}
              </p>
            ) : (
              filtered.map((sem) => (
                <div
                  key={sem.label}
                  className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5"
                >
                  <div>
                    <span className="text-sm text-white font-medium">{sem.label}</span>
                    <span className="text-[10px] text-gray-500 ml-2">{sem.courses.length} courses</span>
                  </div>
                   <button
                     onClick={() => setPendingDelete(sem)}
                     className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                   >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteSemesterPopup;
