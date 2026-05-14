import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

const SuccessPopup = ({ isOpen, onClose, message, className = "" }) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 animate-scale-in ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <CheckCircle2 size={72} className="text-emerald-500" style={{ filter: "drop-shadow(0 0 12px rgba(16, 185, 129, 0.5))" }} />
          <p className="text-white text-lg font-semibold text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
