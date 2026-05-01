import { useState, useEffect } from "react";
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
  Zap,
  Award,
  PieChart,
  Search,
  Layers,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import AuthPopup from "../components/AuthPopup";

const BRAND_RED = "#f23131";

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <TrendingUp size={22} />,
      title: "Real-Time GPA Tracking",
      description: "Monitor cumulative and semester GPA instantly as you add courses and grades.",
    },
    {
      icon: <BarChart3 size={22} />,
      title: "Visual Analytics",
      description: "Interactive charts and gauges that make understanding your academic progress effortless.",
    },
    {
      icon: <BookOpen size={22} />,
      title: "Course Management",
      description: "Organize courses by semester with credit hours, grades, and completion status.",
    },
    {
      icon: <Target size={22} />,
      title: "Target GPA Planning",
      description: "Set semester targets and see exactly what grades you need to reach your goals.",
    },
    {
      icon: <Clock size={22} />,
      title: "Instant Calculations",
      description: "Add semesters and courses in seconds. No spreadsheets, no manual math.",
    },
    {
      icon: <Shield size={22} />,
      title: "Full Data Control",
      description: "Export and import your data as JSON. Your information stays entirely yours.",
    },
  ];

  const steps = [
    {
      icon: <Layers size={24} />,
      title: "Create Your Semesters",
      description: "Set up each semester with custom labels and credit requirements that match your program.",
    },
    {
      icon: <Search size={24} />,
      title: "Add Courses & Grades",
      description: "Input your courses with grades and credits. Mark them as completed or in-progress.",
    },
    {
      icon: <PieChart size={24} />,
      title: "Monitor & Improve",
      description: "Watch your GPA update in real-time. Use visual insights to stay on track for graduation.",
    },
  ];

  const stats = [
    { value: "4.0", label: "Scale Support" },
    { value: "100%", label: "Free, Always" },
    { value: "0", label: "Ads or Trackers" },
    { value: "Instant", label: "Calculations" },
  ];

  const faqs = [
    {
      question: "Is Gradex really free?",
      answer: "Yes, Gradex is completely free with no hidden costs, ads, or data tracking. Sign up in seconds and start tracking your GPA immediately.",
    },
    {
      question: "What GPA scales does it support?",
      answer: "Gradex supports 4.0, 5.0, and 10.0 GPA scales, covering most grading systems used worldwide.",
    },
    {
      question: "Is my data saved?",
      answer: "Your data is stored securely with your account. You can also export it as a JSON file at any time for backup.",
    },
    {
      question: "Can I access Gradex from any device?",
      answer: "Yes, simply sign in with your account on any device to access your GPA data, courses, and progress.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">

      {/* =================== NAVIGATION =================== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#111111]/95 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
            <img src="/logo.png" className="w-8 h-8 object-contain rounded-lg" alt="Gradex logo" />
            <span className="text-lg font-bold tracking-tight">Gradex</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("features")} className="text-sm text-gray-400 hover:text-white transition-colors">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-sm text-gray-400 hover:text-white transition-colors">How It Works</button>
            <button onClick={() => scrollToSection("faq")} className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAuthMode("login")}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode("signup")}
                style={{ backgroundColor: BRAND_RED }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Sign Up Free
              </button>
            </div>
          </div>
          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111111]/98 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4">
            <button onClick={() => scrollToSection("features")} className="block w-full text-left text-sm text-gray-400 hover:text-white transition-colors py-2">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="block w-full text-left text-sm text-gray-400 hover:text-white transition-colors py-2">How It Works</button>
            <button onClick={() => scrollToSection("faq")} className="block w-full text-left text-sm text-gray-400 hover:text-white transition-colors py-2">FAQ</button>
            <div className="pt-2 space-y-3 border-t border-white/5">
              <button
                onClick={() => { setAuthMode("login"); setMobileMenuOpen(false); }}
                className="w-full px-5 py-3 rounded-xl text-sm font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => { setAuthMode("signup"); setMobileMenuOpen(false); }}
                style={{ backgroundColor: BRAND_RED }}
                className="w-full px-5 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Sign Up Free
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* =================== HERO =================== */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 px-6">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-[0.15]"
            style={{ background: `radial-gradient(ellipse at center, ${BRAND_RED}33 0%, transparent 70%)` }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs mb-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Sparkles size={14} style={{ color: BRAND_RED }} />
            <span className="font-medium text-gray-300">GradeX</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="text-gray-500">Academic Performance Tracker</span>
          </div>

          <h1
            className="font-bold text-white mb-6 leading-[1.08]"
            style={{ fontSize: "clamp(38px, 7vw, 72px)", letterSpacing: "-2px" }}
          >
            Track Your GPA
            <br />
            <span style={{ color: BRAND_RED }}>With Precision.</span>
          </h1>

          <div className="flex flex-col items-center text-center mb-8">
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              A powerful, intuitive academic tracker that helps students monitor GPA,
              visualize progress, and plan for success all in one clean dashboard.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => setAuthMode("signup")}
              style={{ backgroundColor: BRAND_RED }}
              className="px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setAuthMode("login")}
              className="px-8 py-4 rounded-xl text-base font-medium text-gray-300 border border-white/10 hover:bg-white/5 transition-colors w-full sm:w-auto text-center"
            >
              Sign In
            </button>
          </div>

          {/* Hero dashboard mockup */}
          <div
            className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="p-px" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 50%)" }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: "#0a0a0a" }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-4 py-1 rounded-md text-xs text-gray-600" style={{ background: "rgba(255,255,255,0.03)" }}>
                      gradex.app/dashboard
                    </div>
                  </div>
                </div>
                <div className="p-5 md:p-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Cumulative GPA", value: "3.65" },
                      { label: "Total Credits", value: "72" },
                      { label: "Semesters", value: "4" },
                      { label: "Courses", value: "24" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                        <div className="text-xl md:text-2xl font-bold" style={{ color: BRAND_RED }}>{stat.value}</div>
                      </div>
                    ))}
                  </div>
          <div className="space-y-2">
                    {[
                      { sem: "Year 1 - Semester 1", gpa: 3.4, pct: "85%" },
                      { sem: "Year 1 - Semester 2", gpa: 3.5, pct: "87.5%" },
                      { sem: "Year 2 - Semester 1", gpa: 3.7, pct: "92.5%" },
                      { sem: "Year 2 - Semester 2", gpa: 3.9, pct: "97.5%" },
                    ].map((s) => (
                      <div key={s.sem} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 w-28 md:w-36 truncate">{s.sem}</span>
                        <div className="flex-1 h-4 rounded-md overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
                          <div
                            className="h-full rounded-md"
                            style={{ width: s.pct, background: `linear-gradient(90deg, ${BRAND_RED}, #c0392b)` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-white w-8 text-right">{s.gpa}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-32 opacity-20 blur-3xl"
            style={{ background: `radial-gradient(ellipse, ${BRAND_RED}40 0%, transparent 70%)` }}
          />
        </div>
      </section>

      {/* =================== STATS =================== */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold" style={{ color: BRAND_RED }}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/5" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =================== FEATURES =================== */}
      <section id="features" className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ background: `${BRAND_RED}12`, color: BRAND_RED, border: `1px solid ${BRAND_RED}20` }}
            >
              <Zap size={12} />
              Features
            </div>
            <h2 className="font-bold text-white mb-3" style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-1px" }}>
              Everything You Need to{" "}
              <span style={{ color: BRAND_RED }}>Excel</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg text-center">
              Built with students in mind, every feature is designed to make academic tracking effortless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 group"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors"
                  style={{ color: BRAND_RED, background: `${BRAND_RED}10` }}
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

      {/* =================== HOW IT WORKS =================== */}
      <section id="how-it-works" className="py-16 md:py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 opacity-[0.08]"
            style={{ background: `radial-gradient(circle at center, ${BRAND_RED}25 0%, transparent 70%)` }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <GraduationCap size={12} style={{ color: BRAND_RED }} />
              How It Works
            </div>
            <h2 className="font-bold text-white mb-3" style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-1px" }}>
              Three Steps to{" "}
              <span style={{ color: BRAND_RED }}>Full Control</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg text-center">
              Get started in under a minute. No setup, no account, no hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-2xl p-8 flex flex-col items-center text-center"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${BRAND_RED}10`, color: BRAND_RED }}
                >
                  {step.icon}
                </div>
                <div className="text-xs font-bold mb-3" style={{ color: BRAND_RED }}>
                  STEP {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== CAPABILITIES =================== */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Award size={12} style={{ color: BRAND_RED }} />
                Why Gradex
              </div>
              <h2 className="font-bold text-white mb-4 leading-tight" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-1px" }}>
                Built for Students Who{" "}
                <span style={{ color: BRAND_RED }}>Take Their GPA Seriously</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Whether you are aiming for honors, keeping a scholarship, or just want to stay organized,
                Gradex gives you a clear picture of where you stand.
              </p>
                  <div className="space-y-3">
                    {[
                      { label: "Y1 - S1", gpa: 3.2, pct: "80%" },
                      { label: "Y1 - S2", gpa: 3.4, pct: "85%" },
                      { label: "Y2 - S1", gpa: 3.5, pct: "87.5%" },
                      { label: "Y2 - S2", gpa: 3.7, pct: "92.5%" },
                      { label: "Y3 - S1", gpa: 3.8, pct: "95%" },
                    ].map((sem) => (
                      <div key={sem.label} className="flex items-center gap-3">
                        <span className="text-xs text-gray-600 w-14 font-medium">{sem.label}</span>
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: sem.pct, background: `linear-gradient(90deg, ${BRAND_RED}, ${BRAND_RED}cc)` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-white w-8 text-right">{sem.gpa}</span>
                      </div>
                    ))}
              </div>
            </div>

            {/* Preview Card */}
            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="space-y-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-gray-600 font-semibold mb-4">
                    Semester GPA Progress
                  </div>
              <div className="space-y-3">
                    {[
                      { label: "Y1 - S1", gpa: 3.2, pct: "80%" },
                      { label: "Y1 - S2", gpa: 3.4, pct: "85%" },
                      { label: "Y2 - S1", gpa: 3.5, pct: "87.5%" },
                      { label: "Y2 - S2", gpa: 3.7, pct: "92.5%" },
                      { label: "Y3 - S1", gpa: 3.8, pct: "95%" },
                    ].map((sem) => (
                      <div key={sem.label} className="flex items-center gap-4">
                        <span className="text-xs text-gray-600 w-14 font-medium">{sem.label}</span>
                        <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
                          <div
                            className="h-full rounded-full"
                            style={{ width: sem.pct, background: `linear-gradient(90deg, ${BRAND_RED}, ${BRAND_RED}cc)` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-white w-8 text-right">{sem.gpa}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-white/5 flex items-end justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-gray-600 font-semibold mb-1">
                      Cumulative GPA
                    </div>
                    <div className="text-5xl font-bold" style={{ color: BRAND_RED }}>
                      3.52
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 pb-1">out of 4.0 scale</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================== FAQ =================== */}
      <section id="faq" className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Search size={12} style={{ color: BRAND_RED }} />
              FAQ
            </div>
            <h2 className="font-bold text-white mb-3" style={{ fontSize: "clamp(28px, 4vw, 44px)", letterSpacing: "-1px" }}>
              Frequently Asked{" "}
              <span style={{ color: BRAND_RED }}>Questions</span>
            </h2>
            <p className="text-gray-400 max-w-xl text-lg text-center">
              Everything you need to know about using Gradex.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: openFaq === i ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${openFaq === i ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)"}`,
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className="text-gray-500 flex-shrink-0 transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================== CTA =================== */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden text-center"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.15]"
              style={{ background: `radial-gradient(ellipse at center, ${BRAND_RED}30 0%, transparent 70%)` }}
            />

            <div className="flex flex-col items-center text-center px-8 py-12 md:px-16 md:py-16 relative">
              <h2 className="font-bold text-white mb-3" style={{ fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-1px" }}>
                Ready to Take Control of Your{" "}
                <span style={{ color: BRAND_RED }}>Academic Future?</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-lg text-lg">
                Create your free account today and start tracking your GPA in minutes.
              </p>
              <button
                onClick={() => setAuthMode("signup")}
                style={{ backgroundColor: BRAND_RED }}
                className="px-7 py-3 rounded-xl text-base font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 mt-4"
              >
                Create Free Account
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =================== FOOTER =================== */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" className="w-7 h-7 object-contain rounded-lg" alt="Gradex logo" />
              <div>
                <span className="text-sm font-bold">Gradex</span>
                <div className="text-xs text-gray-600">Academic Performance Tracker</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button onClick={() => scrollToSection("features")} className="text-xs text-gray-500 hover:text-white transition-colors">Features</button>
              <button onClick={() => scrollToSection("how-it-works")} className="text-xs text-gray-500 hover:text-white transition-colors">How It Works</button>
              <button onClick={() => scrollToSection("faq")} className="text-xs text-gray-500 hover:text-white transition-colors">FAQ</button>
              <button
                onClick={() => setAuthMode("login")}
                className="text-xs font-medium hover:text-white transition-colors"
                style={{ color: BRAND_RED }}
              >
                Sign In
              </button>
            </div>
            <div className="text-xs text-gray-600">
              Built for students. Free forever.
            </div>
          </div>
        </div>
      </footer>

      {/* =================== SCROLL TO TOP =================== */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ backgroundColor: BRAND_RED }}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full flex items-center justify-center hover:opacity-90 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ChevronDown size={20} className="rotate-180" />
        </button>
      )}

      {/* =================== AUTH POPUP =================== */}
      {authMode && (
        <AuthPopup
          isOpen={authMode !== null}
          onClose={() => setAuthMode(null)}
          mode={authMode}
        />
      )}
    </div>
  );
};

export default LandingPage;
