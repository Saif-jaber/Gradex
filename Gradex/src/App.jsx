import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

const Semesters = () => (
  <h1 className="text-white text-3xl">Semesters</h1>
);

const Courses = () => (
  <h1 className="text-white text-3xl">Courses</h1>
);

const AddSemester = () => (
  <h1 className="text-white text-3xl">Add Semester</h1>
);

const AddCourse = () => (
  <h1 className="text-white text-3xl">Add Course</h1>
);

const Settings = () => (
  <h1 className="text-white text-3xl">Settings</h1>
);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#111111]">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main className="flex-1 pt-16 md:pt-0 overflow-y-auto">
        <Routes>
          <Route path="/"             element={<Dashboard />} />
          <Route path="/semesters"    element={<Semesters />} />
          <Route path="/courses"      element={<Courses />} />
          <Route path="/add-semester" element={<AddSemester />} />
          <Route path="/add-course"   element={<AddCourse />} />
          <Route path="/settings"     element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;