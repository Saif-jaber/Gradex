import { useState, useEffect } from "react";
import { X, Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useToast } from "../context/ToastContext";
import { authAPI } from "../services/api";

const BRAND_RED = "#f23131";

const AuthPopup = ({ isOpen, onClose, mode = "login" }) => {
  const [formMode, setFormMode] = useState(mode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setFormMode(mode);
    resetForm();
  }, [mode, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formMode === "signup" && password !== confirmPassword) return;

    setLoading(true);
    try {
      if (formMode === "signup") {
        const data = await authAPI.register(email, password, name);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        addToast("Account created successfully!", "success");
      } else {
        const data = await authAPI.login(email, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        addToast("Logged in successfully!", "success");
      }
      setLoading(false);
      onClose();
      window.location.href = "/dashboard";
    } catch (error) {
      setLoading(false);
      addToast(error.message || "Authentication failed", "error");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirm(false);
    setLoading(false);
  };

  const switchMode = () => {
    resetForm();
    setFormMode(formMode === "login" ? "signup" : "login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-sm rounded-xl overflow-hidden"
        style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-gray-500 hover:text-white transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="p-6 pb-0">
          <div className="flex items-center gap-2.5 mb-5">
            <img src="/logo.png" className="w-7 h-7 object-contain rounded-lg" alt="Gradex logo" />
            <span className="text-base font-bold">Gradex</span>
          </div>

          {formMode === "login" ? (
            <>
              <h2 className="text-lg font-bold text-white mb-1">Welcome back</h2>
              <p className="text-gray-400 text-xs">Sign in to continue tracking your GPA</p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-white mb-1">Create account</h2>
              <p className="text-gray-400 text-xs">Start tracking your GPA. Free forever.</p>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-5 space-y-3">
          {formMode === "signup" && (
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onFocus={(e) => (e.target.style.borderColor = BRAND_RED)}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              required
              className="w-full px-3.5 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-colors"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              onFocus={(e) => (e.target.style.borderColor = BRAND_RED)}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={formMode === "signup" ? "Min. 8 characters" : "Enter password"}
                required
                minLength={formMode === "signup" ? 8 : undefined}
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-colors"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onFocus={(e) => (e.target.style.borderColor = BRAND_RED)}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {formMode === "signup" && (
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">Confirm password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  onFocus={(e) => (e.target.style.borderColor = BRAND_RED)}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (formMode === "signup" && password !== confirmPassword)}
            style={{ backgroundColor: BRAND_RED }}
            className="w-full py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-60 mt-4"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : formMode === "login" ? (
              <>
                Sign In
                <LogIn size={15} />
              </>
            ) : (
              <>
                Create Account
                <UserPlus size={15} />
              </>
            )}
          </button>
        </form>

        <div className="px-6 pb-5 text-center">
          <p className="text-xs text-gray-500">
            {formMode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button onClick={switchMode} style={{ color: BRAND_RED }} className="font-medium hover:opacity-80 transition-opacity">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={switchMode} style={{ color: BRAND_RED }} className="font-medium hover:opacity-80 transition-opacity">
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
