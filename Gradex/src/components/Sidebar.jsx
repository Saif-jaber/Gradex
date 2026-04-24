import { useState } from "react";
import {
  LayoutDashboard,
  PlusSquare,
  BookPlus,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const SidebarItem = ({ icon, label, collapsed, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-800/70 transition text-left"
    >
      <span className="shrink-0">{icon}</span>

      {!collapsed && (
        <span className="text-xs font-medium whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  );
};

const SectionDivider = ({ title }) => (
  <div className="flex items-center gap-2 px-3 pt-2 pb-1">
    <div className="h-px flex-1 bg-gray-500/40"></div>
    <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500">
      {title}
    </span>
    <div className="h-px flex-1 bg-gray-500/40"></div>
  </div>
);

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        {/* TOP SECTION (sticky inside sidebar) */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src="/logo.png"
              className="w-7 h-7 object-contain"
              alt="logo"
            />

            {!collapsed && (
              <span className="text-base font-semibold">
                Gradex
              </span>
            )}
          </div>

          {/* DESKTOP COLLAPSE */}
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

          {/* MOBILE CLOSE */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* NAV (scrollable section) */}
        <nav className="px-3 py-3 space-y-2 flex-1 overflow-y-auto">
          <SidebarItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />

          {!collapsed && <SectionDivider title="Functions" />}

          <SidebarItem
            icon={<PlusSquare size={18} />}
            label="Add Semester"
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />

          <SidebarItem
            icon={<BookPlus size={18} />}
            label="Add Course"
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />

          {!collapsed && <SectionDivider title="Configuration" />}

          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            collapsed={collapsed}
            onClick={() => setMobileOpen(false)}
          />
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
