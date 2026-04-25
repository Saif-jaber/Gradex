import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  BookOpen,
  PlusSquare,
  BookPlus,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const BRAND_RED = "#f23131";

const NAV_ITEMS = [
  {
    id: "dashboard",
    path: "/",
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    section: null,
  },
  {
    id: "semesters",
    path: "/semesters",
    icon: <CalendarDays size={18} />,
    label: "Semesters",
    section: null,
  },
  {
    id: "courses",
    path: "/courses",
    icon: <BookOpen size={18} />,
    label: "Courses",
    section: null,
  },
  {
    id: "add-semester",
    path: "/add-semester",
    icon: <PlusSquare size={18} />,
    label: "Add Semester",
    section: "Functions",
  },
  {
    id: "add-course",
    path: "/add-course",
    icon: <BookPlus size={18} />,
    label: "Add Course",
    section: null,
  },
  {
    id: "settings",
    path: "/settings",
    icon: <Settings size={18} />,
    label: "Settings",
    section: "Configuration",
  },
];

const SidebarItem = ({ icon, label, collapsed, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={
        isActive
          ? { backgroundColor: "rgba(242, 49, 49, 0.08)", color: BRAND_RED }
          : {}
      }
      className={`
        relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left
        ${isActive ? "" : "text-gray-400 hover:bg-white/5 hover:text-gray-200"}
      `}
    >
      {/* Left accent bar */}
      {isActive && (
        <span
          style={{ backgroundColor: BRAND_RED }}
          className="absolute left-0 top-[20%] h-[60%] w-[3px] rounded-r-full"
        />
      )}

      {/* Icon */}
      <span
        style={isActive ? { color: BRAND_RED } : {}}
        className={`shrink-0 ${!isActive ? "text-gray-400" : ""}`}
      >
        {icon}
      </span>

      {/* Label */}
      {!collapsed && (
        <span className="text-xs font-medium whitespace-nowrap">{label}</span>
      )}
    </button>
  );
};

const SectionDivider = ({ title }) => (
  <div className="flex items-center gap-2 px-3 pt-2 pb-1">
    <div className="h-px flex-1 bg-gray-500/40" />
    <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
      {title}
    </span>
    <div className="h-px flex-1 bg-gray-500/40" />
  </div>
);

const LogoutButton = ({ collapsed }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        // TODO: wire up your logout logic here
        console.log("Logging out...");
      }}
      style={{
        backgroundColor: hovered ? "rgba(242, 49, 49, 0.15)" : "transparent",
        color: hovered ? "#f23131" : "#6b7280",
        border: "1px solid",
        borderColor: hovered
          ? "rgba(242, 49, 49, 0.35)"
          : "rgba(255,255,255,0.07)",
      }}
      className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left"
    >
      <span
        style={{ backgroundColor: "#f23131" }}
        className="absolute left-0 top-[20%] h-[60%] w-[3px] rounded-r-full opacity-60"
      />

      <span
        style={{ color: hovered ? "#f23131" : "#6b7280" }}
        className="shrink-0 transition-colors duration-200"
      >
        <LogOut size={18} />
      </span>

      {!collapsed && (
        <span className="text-xs font-medium whitespace-nowrap">Logout</span>
      )}
    </button>
  );
};

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-black border-b border-white/10 flex items-center justify-between px-4 z-50">
        <span className="text-white font-semibold">Gradex</span>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white text-xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen bg-black/85 backdrop-blur-md
          border-r border-white/10 text-white
          transition-all duration-300
          flex flex-col overflow-hidden
          ${collapsed ? "w-20" : "w-60"}
          md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* TOP SECTION */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src="/logo.png"
              className="w-7 h-7 object-contain rounded-lg"
              alt="logo"
            />
            {!collapsed && (
              <span className="text-base font-semibold">Gradex</span>
            )}
          </div>

          {/* DESKTOP COLLAPSE BUTTON */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:flex p-1.5 rounded-lg hover:bg-gray-800 transition"
          >
            {collapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>

          {/* MOBILE CLOSE BUTTON */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* NAV */}
        <nav className="px-3 py-3 space-y-1 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <div key={item.id}>
              {item.section && !collapsed && (
                <SectionDivider title={item.section} />
              )}
              <SidebarItem
                icon={item.icon}
                label={item.label}
                collapsed={collapsed}
                isActive={location.pathname === item.path}
                onClick={() => handleNavClick(item.path)}
              />
            </div>
          ))}
        </nav>

        {/* LOGOUT — pinned to bottom */}
        <div className="px-3 py-4 border-t border-white/10 shrink-0">
          <LogoutButton collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;