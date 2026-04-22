import { useState, useEffect, useRef } from "react";
import img3 from "./assets/img3.png";
import img2 from "./assets/img2.png";
import img1 from "./assets/img1.png";
import logo from "./assets/Bio-logo.jpeg";
import preview from "./assets/Biolife.png";

/* ── Hooks ─────────────────────────────────────────────────────────────── */
function useTyping(words, speed = 90, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wi];
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => setDeleting(true), pause);
        else setCi((c) => c + 1);
      } else {
        setDisplay(word.slice(0, ci - 1));
        if (ci - 1 === 0) { setDeleting(false); setWi((w) => (w + 1) % words.length); setCi(0); }
        else setCi((c) => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ci, deleting, wi, words, speed, pause]);
  return display;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Shared ────────────────────────────────────────────────────────────── */
function SectionLabel({ sub, title }) {
  return (
    <div className="mb-12">
      <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-2">// {sub}</p>
      <div className="flex items-center gap-4">
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{title}</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-violet-500/50 to-transparent" />
      </div>
    </div>
  );
}

/* ── Navbar ────────────────────────────────────────────────────────────── */
function Navbar({ active, setActive }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];
  const go = (s) => { setActive(s); setMenuOpen(false); };
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a18]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-violet-900/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => go("Home")} className="font-bold text-xl">
          <span className="text-violet-400">&lt;</span><span className="text-white">ZIA</span><span className="text-violet-400">/&gt;</span>
        </button>
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l}>
              <button onClick={() => go(l)}
                className={`text-sm transition-colors duration-200 ${active === l ? "text-violet-300 font-semibold" : "text-slate-400 hover:text-violet-300"}`}>
                {l}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => go("Contact")}
          className="hidden md:block px-5 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-violet-500/30">
          Hire Me
        </button>
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`block w-6 h-0.5 bg-slate-300 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-300 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-300 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a18]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 flex flex-col gap-3">
          {links.map(l => (
            <button key={l} onClick={() => go(l)} className="text-left text-sm text-slate-400 hover:text-violet-300 py-1">{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */
function Hero({ setActive }) {
  const typed = useTyping(["Web Developer", "Frontend Engineer", "Full-Stack Dev", "React Specialist"]);
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Open to opportunities · Chennai, India
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-5">
            Hi, I'm<br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">Ziauddeen S</span>
          </h1>
          <div className="h-9 flex items-center mb-5">
            <span className="text-xl sm:text-2xl font-semibold text-slate-300">
              {typed}<span className="text-violet-400 animate-pulse">|</span>
            </span>
          </div>
          <p className="text-sm text-violet-400/80 font-medium mb-4">✦ Building intuitive and user-friendly web applications</p>
          <p className="text-base text-slate-400 leading-relaxed mb-10 max-w-md">
            B.Sc Computer Science graduate building clean, modern web experiences with React, Node.js & MongoDB. Fresher ready to contribute and grow.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <button onClick={() => setActive("Contact")}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5">
              Hire Me 🚀
            </button>
            <a
              href="/resume.pdf"
              download
              className="px-8 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              ↓ Download Resume
            </a>
          </div>
          <div className="flex gap-5">
            {[["GitHub", "https://github.com/ziauddeen028-ZIA"], ["LinkedIn", "https://www.linkedin.com/in/ziauddeen-s"],["Instagram", "https://www.instagram.com/zia_uddeen_09/"], ["Email", "mailto:ziauddeen028@gmail.com"]].map(([l, h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-violet-300 transition-colors">{l} ↗</a>
            ))}
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/30 to-indigo-500/30 blur-2xl scale-110" />
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10" />
              <img
                src={img3}
                alt="Ziauddeen"
                className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 
rounded-3xl object-cover object-center
border-4 border-white/20 
shadow-[0_0_70px_rgba(99,102,241,0.6)]"
              />
              <div className="relative z-10 text-center">
                <p className="text-white font-bold text-lg">Ziauddeen S</p>
                <p className="text-slate-400 text-sm">Full-Stack Developer</p>
              </div>
              <div className="relative z-10 flex flex-wrap justify-center gap-2 px-6">
                {["React", "Node.js", "Express.js", "MongoDB"].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs">{t}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-violet-400" />
        <span className="text-violet-400 text-xs">scroll</span>
      </div>
    </section>
  );
}

/* ── About ─────────────────────────────────────────────────────────────── */
function About() {
  const [ref, inView] = useInView();
  const stats = [{ value: "5+", label: "Projects" }, { value: "1", label: "Internship" }, { value: "⚽", label: "Athlete" }, { value: "∞", label: "Learning" }];
  const info = [
    { icon: "🎓", label: "Degree", value: "B.Sc Computer Science" },
    { icon: "📍", label: "Location", value: "Chennai, India" },
    { icon: "📧", label: "Email", value: "ziauddeen028@gmail.com" },
    { icon: "📞", label: "Phone", value: "+91 6374069185" },
  ];
  return (
    <section className="py-28 relative">
      <div className="absolute left-0 top-1/2 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel sub="Who I am" title="About Me" />
        <div ref={ref} className={`grid md:grid-cols-2 gap-14 items-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-72 h-90 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-br from-violet-600/30 to-indigo-600/20 border border-white/10 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center mb-6"><div className="text-8xl mb-2">
                  <img
                    src={img1}
                    alt="Ziauddeen"
                    className="relative z-10 w-46 h-46 rounded-3xl object-cover 
  border-4 border-white/20 
  shadow-[0_0_70px_rgba(99,102,241,0.6)]"
                  />
                </div>
                  <p className="text-white font-bold">Ziauddeen S</p><p className="text-slate-400 text-sm">Full-Stack Dev</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-violet-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl" />
            </div>
          </div>
          <div>
            <p className="text-slate-300 text-base leading-8 mb-5">
              I'm a <span className="text-violet-300 font-semibold">B.Sc Computer Science</span> graduate with strong skills in software development and problem solving. Built real-world web applications using React, Node.js, and MongoDB.
            </p>
            <p className="text-slate-400 text-base leading-8 mb-8">
              Completed an internship at <span className="text-violet-300 font-semibold">Livewire, Mylapore</span>, working on frontend + backend development. Currently open to fresher roles and freelance projects.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {info.map(item => (
                <div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8">
                  <span className="text-xl">{item.icon}</span>
                  <div><p className="text-slate-500 text-xs">{item.label}</p><p className="text-slate-200 text-sm font-medium">{item.value}</p></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {stats.map(s => (
                <div key={s.label} className="text-center py-4 rounded-2xl bg-gradient-to-b from-violet-500/10 to-indigo-500/10 border border-white/8">
                  <div className="text-2xl font-black text-violet-300 mb-1">{s.value}</div>
                  <div className="text-slate-500 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Skills ────────────────────────────────────────────────────────────── */
function Skills() {
  const [ref, inView] = useInView();
  const cats = [
    { name: "Frontend", icon: "🎨", color: "from-violet-500/20 to-purple-500/10 border-violet-500/20 hover:border-violet-400/50", skills: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Tailwind CSS"] },
    { name: "Backend", icon: "⚙️", color: "from-indigo-500/20 to-blue-500/10 border-indigo-500/20 hover:border-indigo-400/50", skills: ["Node.js", "Express.js", "REST API"] },
    { name: "Database", icon: "🗄️", color: "from-blue-500/20 to-cyan-500/10 border-blue-500/20 hover:border-blue-400/50", skills: ["MongoDB", "MySQL", "SQL"] },
    { name: "Programming", icon: "💻", color: "from-purple-500/20 to-pink-500/10 border-purple-500/20 hover:border-purple-400/50", skills: ["C", "Python", "Java", "C++"] },
  ];
  const tools = ["Git", "GitHub", "VS Code", "Vercel", "Strapi", "Postman"];
  return (
    <section className="py-28 relative">
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel sub="What I work with" title="Skills" />
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {cats.map(cat => (
              <div key={cat.name} className={`group rounded-2xl border bg-gradient-to-br ${cat.color} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="text-white font-bold text-sm mb-4">{cat.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(sk => (
                    <span key={sk} className="px-3 py-1 rounded-lg bg-white/8 border border-white/10 text-slate-300 text-xs font-medium">{sk}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-4">Tools & Technologies</p>
            <div className="flex flex-wrap gap-3">
              {tools.map(t => (
                <span key={t} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm font-medium hover:border-violet-400/40 hover:text-violet-300 hover:bg-violet-500/10 transition-all cursor-default">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Projects ──────────────────────────────────────────────────────────── */
function Projects() {
  const [ref, inView] = useInView();
  const others = [
    { title: "Sportify E-Commerce", desc: "Full-stack sports e-commerce app with authentication, product listing, cart, and order management.", stack: ["React", "Node.js", "Strapi", "MySQL", "Tailwind"], features: ["Auth system", "Cart & Orders", "REST API"], emoji: "🏆", color: "from-amber-500/10 to-orange-500/5 border-amber-500/20 hover:border-amber-400/40" },
    { title: "Mobile Suggestion Website", desc: "Smart React app displaying mobile specs, pricing comparisons, filtering, and recommendation logic.", stack: ["React", "JavaScript", "CSS"], features: ["Filtering", "Comparisons", "Recommendations"], emoji: "📱", color: "from-cyan-500/10 to-teal-500/5 border-cyan-500/20 hover:border-cyan-400/40" },
  ];
  return (
    <section className="py-28 relative">
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-96 h-96 bg-violet-600/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel sub="Things I've built" title="Projects" />
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-4">⭐ Featured Project</p>
          <div className="group relative rounded-3xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-transparent p-8 md:p-10 mb-10 overflow-hidden hover:border-violet-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl group-hover:bg-violet-500/15 transition-all duration-500" />
            <div className="relative grid md:grid-cols-5 gap-10 items-center">
              <div className="md:col-span-3">
                <img
                  src={logo}
                  alt="Biolife Logo"
                  className="w-14 h-14 mb-5 object-contain"
                />
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">BIOLIFE Pharma Website</h3>
                <p className="text-slate-400 text-sm leading-7 mb-6">Developed a professional website for a pharmaceutical company with a clean, modern UI and fully responsive design. Showcases products with smooth navigation.Developed using React.js , Tailwind css, JavaScript </p>
                <ul className="flex flex-col gap-2 mb-7">
                  {["Fully responsive layout", "Product showcase section", "Smooth UX navigation"].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300"><span className="text-violet-400 text-xs">▸</span>{f}</li>
                  ))}
                </ul>
                <a href="https://biolifepharma.vercel.app/" target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5">
                  🔗 Live Demo
                </a>
              </div>
              <div className="md:col-span-2">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg hover:shadow-violet-500/20 transition-all">

                  <img
                    src={preview}
                    alt="Biolife Website"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                  />

                </div>

                {/* Tech stack below */}

              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-5">Other Projects</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {others.map(p => (
              <div key={p.title} className={`group rounded-2xl border bg-gradient-to-br ${p.color} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}>
                <div className="text-4xl mb-4">{p.emoji}</div>
                <h4 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">{p.title}</h4>
                <p className="text-slate-400 text-sm leading-6 mb-4">{p.desc}</p>
                <ul className="flex flex-col gap-1 mb-5">
                  {p.features.map(f => <li key={f} className="text-xs text-slate-500 flex items-center gap-2"><span className="text-violet-400">▸</span>{f}</li>)}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map(s => <span key={s} className="px-2.5 py-1 rounded-lg bg-white/8 border border-white/8 text-slate-400 text-xs font-mono">{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Experience ────────────────────────────────────────────────────────── */
function Experience() {
  const [ref, inView] = useInView();
  const extras = [
    { icon: "⚽", title: "District Football Player", desc: "Represented Alpha sc in Kancheepuram district football", color: "from-green-500/10 to-emerald-500/5 border-green-500/20" },
    { icon: "💻", title: "Coding Competitions", desc: "Participated in multiple coding challenges & hackathons", color: "from-blue-500/10 to-indigo-500/5 border-blue-500/20" },
  ];
  return (
    <section className="py-28 relative">
      <div className="absolute right-0 bottom-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel sub="My journey" title="Experience" />
        <div ref={ref} className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-indigo-500/30 to-transparent" />
            <div className="relative pl-16 pb-12">
              <div className="absolute left-2.5 top-1.5 w-5 h-5 rounded-full bg-violet-500 border-4 border-[#0a0a18] shadow-lg shadow-violet-500/30" />
              <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 hover:border-violet-500/20 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">Full Stack Development Intern</h3>
                    <p className="text-violet-300 font-medium text-sm mt-0.5">Livewire, Mylapore</p>
                  </div>
                  <span className="px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/20 text-violet-300 text-xs font-medium">Internship</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {["Worked on both frontend and backend development", "Built real-time web applications using modern tech", "Learned debugging, responsive design, and API integration"].map(b => (
                    <li key={b} className="flex items-start gap-3 text-slate-400 text-sm"><span className="text-violet-400 mt-1 text-xs">▸</span>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative pl-16">
              <div className="absolute left-2.5 top-1.5 w-5 h-5 rounded-full bg-white/10 border-4 border-[#0a0a18]" />
              <div>
                <h3 className="text-white font-bold text-lg mb-5">Extra Activities</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {extras.map(item => (
                    <div key={item.title} className={`flex gap-4 p-5 rounded-2xl border bg-gradient-to-br ${item.color} hover:-translate-y-0.5 transition-transform`}>
                      <span className="text-3xl">{item.icon}</span>
                      <div><p className="text-white font-semibold text-sm">{item.title}</p><p className="text-slate-400 text-xs mt-1 leading-5">{item.desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ───────────────────────────────────────────────────────────── */
function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.name || !form.email || !form.message) return;

    const text =
      `Hello, I'm ${form.name}%0A` +
      `Email: ${form.email}%0A%0A` +
      `${form.message}`;

    const whatsappURL = `https://wa.me/916374069185?text=${text}`;

    window.open(whatsappURL, "_blank");

    setSent(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => setSent(false), 4000);
  };
  const inp = "w-full px-4 py-3 rounded-xl border border-white/8 bg-white/5 text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-violet-500/50 focus:bg-violet-500/5 transition-all";
  const contactInfo = [
    { icon: "📧", label: "Email", value: "ziauddeen028@gmail.com", href: "mailto:ziauddeen028@gmail.com" },
    { icon: "📞", label: "Phone", value: "+91 6374069185", href: "tel:+916374069185" },
    { icon: "📍", label: "Location", value: "Chennai, India", href: null },
  ];
  return (
    <section className="py-28 relative">
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-64 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel sub="Let's work together" title="Contact" />
        <div ref={ref} className={`grid md:grid-cols-2 gap-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Open to opportunities</h3>
            <p className="text-slate-400 text-sm leading-7 mb-8">Whether you need a freelance developer or are hiring a fresher — I'd love to connect. Drop a message or reach out directly.</p>
            <div className="flex flex-col gap-3 mb-8">
              {contactInfo.map(c => (
                <div key={c.label} className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-white/4 border border-white/8 hover:border-violet-500/20 transition-colors">
                  <span className="text-2xl">{c.icon}</span>
                  <div><p className="text-slate-500 text-xs mb-0.5">{c.label}</p>
                    {c.href ? <a href={c.href} className="text-slate-200 text-sm hover:text-violet-300 transition-colors font-medium">{c.value}</a>
                      : <p className="text-slate-200 text-sm font-medium">{c.value}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <a href="https://github.com/ziauddeen028-ZIA" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/8 hover:bg-white/15 text-slate-300 text-sm font-semibold transition-all hover:-translate-y-0.5">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/ziauddeen-s" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-xl border border-blue-500/30 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-sm font-semibold transition-all hover:-translate-y-0.5">LinkedIn ↗</a>
              <a href="https://www.instagram.com/zia_uddeen_09/" target="_blank" rel="noreferrer"
                className="px-5 py-2.5 rounded-xl border border-pink-500/30 bg-pink-600/20 hover:bg-pink-600/30 text-pink-300 text-sm font-semibold transition-all hover:-translate-y-0.5">
                Instagram ↗
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 hover:border-violet-500/15 transition-colors">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-16 gap-4">
                <div className="text-5xl">✅</div>
                <p className="text-white font-bold text-xl">Message sent!</p>
                <p className="text-slate-400 text-sm">I'll get back to you soon.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h4 className="text-white font-bold mb-1">Send a message</h4>
                <div><label className="block text-xs text-slate-500 mb-1.5">Your Name</label><input type="text" placeholder="John Doe" value={form.name} onChange={set("name")} className={inp} /></div>
                <div><label className="block text-xs text-slate-500 mb-1.5">Email Address</label><input type="email" placeholder="john@example.com" value={form.email} onChange={set("email")} className={inp} /></div>
                <div><label className="block text-xs text-slate-500 mb-1.5">Message</label><textarea rows={4} placeholder="Tell me about your project..." value={form.message} onChange={set("message")} className={`${inp} resize-none`} /></div>
                <button onClick={submit} className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all hover:shadow-xl hover:shadow-violet-500/25 hover:-translate-y-0.5 mt-1">
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ────────────────────────────────────────────────────────────── */
function Footer({ setActive }) {
  const navLinks = ["About", "Skills", "Projects", "Experience", "Contact"];
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button onClick={() => setActive("Home")} className="font-bold text-lg">
            <span className="text-violet-400">&lt;</span><span className="text-white">ZIA</span><span className="text-violet-400">/&gt;</span>
          </button>
          <div className="flex flex-wrap justify-center gap-5">
            {navLinks.map(l => <button key={l} onClick={() => setActive(l)} className="text-xs text-slate-500 hover:text-violet-300 transition-colors">{l}</button>)}
          </div>
          <div className="flex gap-4">
            {[["GitHub", "https://github.com/ziauddeen028-ZIA"], ["LinkedIn", "https://www.linkedin.com/in/ziauddeen-s"],["Instagram", "https://www.instagram.com/zia_uddeen_09/"], ["Email", "mailto:ziauddeen028@gmail.com"]].map(([l, h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-violet-300 transition-colors">{l}</a>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-slate-600">© 2025 Ziauddeen S · Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

/* ── App ───────────────────────────────────────────────────────────────── */
const SECTIONS = { Home: <></>, About: <></>, Skills: <></>, Projects: <></>, Experience: <></>, Contact: <></> };

export default function App() {
  const [active, setActive] = useState("Home");

  // Scroll to section when nav clicked
  useEffect(() => {
    const id = active.toLowerCase();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [active]);

  return (
    <div style={{
      background: "linear-gradient(135deg,#0a0a18 0%,#0d0b2b 35%,#110828 65%,#0a0a18 100%)",
      fontFamily: "'Plus Jakarta Sans','Outfit',sans-serif",
      minHeight: "100vh",
      color: "white"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#0a0a18;}
        ::-webkit-scrollbar-thumb{background:linear-gradient(#7c3aed,#4f46e5);border-radius:4px;}
        ::selection{background:rgba(139,92,246,0.3);}
        .bg-white\/3{background:rgba(255,255,255,0.03);}
        .bg-white\/4{background:rgba(255,255,255,0.04);}
        .bg-white\/5{background:rgba(255,255,255,0.05);}
        .bg-white\/8{background:rgba(255,255,255,0.08);}
        .bg-white\/10{background:rgba(255,255,255,0.10);}
        .bg-white\/15{background:rgba(255,255,255,0.15);}
        .border-white\/5{border-color:rgba(255,255,255,0.05);}
        .border-white\/8{border-color:rgba(255,255,255,0.08);}
        .border-white\/10{border-color:rgba(255,255,255,0.10);}
      `}</style>
      <Navbar active={active} setActive={setActive} />
      <div id="home"><Hero setActive={setActive} /></div>
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
      <div id="experience"><Experience /></div>
      <div id="contact"><Contact /></div>
      <Footer setActive={setActive} />
    </div>
  );
}
