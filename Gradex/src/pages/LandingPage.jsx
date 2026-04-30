import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  BookOpen,
  BarChart3,
  Target,
  Clock,
  Shield,
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

const BRAND_RED = "#f23131";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp size={24} />,
      title: "Track Your GPA",
      description:
        "Monitor your cumulative and semester GPA in real-time with precision calculations.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Visual Analytics",
      description:
        "Beautiful charts and gauges that make understanding your academic progress effortless.",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Course Management",
      description:
        "Organize courses by semester, track credits, and stay on top of your academic workload.",
    },
    {
      icon: <Target size={24} />,
      title: "Goal Setting",
      description:
        "Set graduation targets and track your degree progress with visual milestones.",
    },
    {
      icon: <Clock size={24} />,
      title: "Time Efficient",
      description:
        "Quickly add semesters and courses. Get instant GPA calculations without the hassle.",
    },
    {
      icon: <Shield size={24} />,
      title: "Data Control",
      description:
        "Export and import your data as JSON. Your academic information stays in your hands.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Add Your Semesters",
      description:
        "Start by creating semesters for your academic journey. Customize credits and labels to match your program.",
    },
    {
      number: "02",
      title: "Input Your Courses",
      description:
        "Add courses with their grades and credit hours. Mark them as completed or currently taking.",
    },
    {
      number: "03",
      title: "Track Your Progress",
      description:
        "Watch your GPA update in real-time. Visualize trends and stay motivated toward your goals.",
    },
  ];

  const stats = [
    { value: "4.0", label: "Max GPA Tracking" },
    { value: "100%", label: "Free Forever" },
    { value: "0", label: "Ads or Tracking" },
    { value: "24/7", label: "Always Available" },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-7 h-7 object-contain rounded-lg" alt="logo" />
            <span className="text-base font-semibold">Gradex</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
              How It Works
            </a>
            <button
              onClick={() => navigate("/dashboard")}
              style={{ backgroundColor: BRAND_RED }}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Open Dashboard
            </button>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => {
              const mobile = document.getElementById("mobile-nav");
              mobile?.classList.toggle("hidden");
            }}
          >
            <Menu size={24} />
          </button>
        </div>
        <div id="mobile-nav" className="hidden md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 px-6 py-4 space-y-4">
          <a href="#features" className="block text-sm text-gray-400 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="block text-sm text-gray-400 hover:text-white transition-colors">How It Works</a>
          <button
            onClick={() => navigate("/dashboard")}
            style={{ backgroundColor: BRAND_RED }}
            className="w-full px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          >
            Open Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-gray-400 mb-8"
          >
            <span style={{ color: BRAND_RED }} className="font-semibold">New</span>
            Track your academic progress with precision
          </div>
          <h1
            style={{ letterSpacing: "-1.68px", fontSize: "clamp(36px, 6vw, 64px)", lineHeight: "1.1" }}
            className="font-medium text-white mb-6"
          >
            Your GPA,{" "}
            <span style={{ color: BRAND_RED }}>Simplified.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-center">
            A clean, powerful GPA tracker that helps you monitor your academic performance,
            visualize progress, and stay on track to graduate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              style={{ backgroundColor: BRAND_RED }}
              className="px-8 py-3 rounded-xl text-base font-semibold text-white hover:opacity-90 transition-opacity flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <a
              href="#features"
              className="px-8 py-3 rounded-xl text-base font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors w-full sm:w-auto text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div style={{ color: BRAND_RED }} className="text-3xl font-semibold">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              style={{ letterSpacing: "-0.24px", fontSize: "clamp(28px, 4vw, 40px)" }}
              className="font-medium text-white mb-4 text-center"
            >
              Everything You Need
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-center">
              Built for students who want a straightforward way to track their academic journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                className="rounded-2xl p-6 flex flex-col gap-4 hover:border-white/15 transition-all duration-200 group"
              >
                <div
                  style={{ color: BRAND_RED }}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors"
                >
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-black/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              style={{ letterSpacing: "-0.24px", fontSize: "clamp(28px, 4vw, 40px)" }}
              className="font-medium text-white mb-4 text-center"
            >
              How It Works
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-center">
              Three simple steps to start tracking your GPA.
            </p>
          </div>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                className="rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start hover:border-white/15 transition-all duration-200"
              >
                <div
                  style={{ color: BRAND_RED }}
                  className="text-4xl font-semibold shrink-0"
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                style={{ letterSpacing: "-0.24px", fontSize: "clamp(28px, 4vw, 40px)" }}
                className="font-medium text-white mb-6"
              >
                Take Control of Your{" "}
                <span style={{ color: BRAND_RED }}>Academic Journey</span>
              </h2>
              <p className="text-gray-400 mb-12 leading-relaxed">
                Gradex gives you the tools to monitor every aspect of your academic performance
                in one clean dashboard.
              </p>
              <div className="space-y-5">
                {[
                  "Real-time GPA calculations per semester",
                  "Visual progress tracking with charts",
                  "Course status management (completed/taking)",
                  "Customizable GPA scales (4.0, 5.0, 10.0)",
                  "Export and import your data anytime",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <Check size={16} style={{ color: BRAND_RED }} className="shrink-0" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              className="rounded-2xl p-8"
            >
              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium mb-3">
                    Semester GPAs
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Y1 - S1", gpa: 3.0, width: "75%" },
                      { label: "Y1 - S2", gpa: 3.2, width: "80%" },
                      { label: "Y2 - S1", gpa: 3.3, width: "82.5%" },
                      { label: "Y2 - S2", gpa: 3.4, width: "85%" },
                      { label: "Y3 - S1", gpa: 3.5, width: "87.5%" },
                    ].map((sem) => (
                      <div key={sem.label} className="flex items-center gap-4">
                        <span className="text-xs text-gray-500 w-12">{sem.label}</span>
                        <div className="flex-1 h-6 bg-white/5 rounded-lg overflow-hidden">
                          <div
                            style={{
                              width: sem.width,
                              background: `linear-gradient(90deg, ${BRAND_RED}, #c0392b)`,
                            }}
                            className="h-full rounded-lg transition-all duration-500"
                          />
                        </div>
                        <span className="text-sm font-medium text-white w-10 text-right">
                          {sem.gpa}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-6">
                  <div className="text-xs uppercase tracking-[0.15em] text-gray-500 font-medium mb-3">
                    Cumulative GPA
                  </div>
                  <div className="text-4xl font-semibold" style={{ color: BRAND_RED }}>
                    3.28
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            className="rounded-3xl p-12 md:p-16"
          >
            <h2
              style={{ letterSpacing: "-0.24px", fontSize: "clamp(28px, 4vw, 40px)" }}
              className="font-medium text-white mb-4 text-center"
            >
              Ready to Track Your GPA?
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-center">
              Start monitoring your academic progress today. No sign-up required, completely free.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              style={{ backgroundColor: BRAND_RED }}
              className="px-10 py-3.5 rounded-xl text-base font-semibold text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Launch Dashboard
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="w-6 h-6 object-contain rounded-lg" alt="logo" />
            <span className="text-sm font-semibold">Gradex</span>
          </div>
          <div className="text-xs text-gray-600">
            Built for students, by students.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              Dashboard
            </button>
            <a href="#features" className="text-xs text-gray-400 hover:text-white transition-colors">
              Features
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
};

const ScrollToTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: BRAND_RED }}
      className="fixed bottom-6 right-6 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity z-50 shadow-lg"
      aria-label="Scroll to top"
    >
      <ChevronDown size={20} className="rotate-180" />
    </button>
  );
};

export default LandingPage;
