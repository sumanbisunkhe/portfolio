/**
 * Runtime Monograph: editorial systems-design portfolio.
 * Uses mineral paper, graphite structure, Ember Red signals, and restrained kinetic detail.
 */
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const runtimeHero = "/images/15.png";
const serviceArchitecture = "/images/1.webp";
const codeKinetics = "/images/7.png";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
];

const sections = [
  { id: "top", label: "INTRO" },
  { id: "work", label: "WORK" },
  { id: "skills", label: "SKILLS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
];

const projects = [
  {
    index: "01",
    name: "MessageIn",
    type: "Real-time communication",
    description:
      "A full-stack messaging platform built for low-latency one-to-one and group communication with media sharing, presence, search, and secure authentication.",
    stack: ["Java", "Spring Boot", "Next.js", "WebSocket", "PostgreSQL"],
    detail:
      "The system combines Spring WebSocket and STOMP for real-time messaging with JWT and OAuth2 authentication, PostgreSQL persistence, Cloudinary media storage, group administration, message search, presence tracking, and privacy-focused controls.",
    metric: "Real-time by design",
    image: "/images/projects/1.png",
  },

  {
    index: "02",
    name: "Fotoo",
    type: "AI-powered photo distribution",
    description:
      "An automated photo distribution platform that uses face recognition to match event photographs with registered users and deliver them instantly through Telegram.",
    stack: ["Python", "FastAPI", "Face Recognition", "MongoDB", "Cloudinary"],
    detail:
      "The processing pipeline handles camera FTP uploads and local file monitoring, generates 128D face encodings, matches photographs against registered users, stores optimized images in Cloudinary, and triggers real-time delivery through Telegram.",
    metric: "Automated from capture to delivery",
    image: "/images/projects/2.png",
  },

  {
    index: "03",
    name: "HotShop",
    type: "E-commerce infrastructure",
    description:
      "A modular e-commerce backend handling authentication, products, inventory, orders, payments, analytics, and personalized recommendations.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "JPA", "JWT"],
    detail:
      "The backend is structured around clear application layers and domain responsibilities. Secure REST APIs coordinate product management, hierarchical categories, persistent carts, order workflows, inventory tracking, payment methods, analytics, and recommendation logic.",
    metric: "Built around domain boundaries",
    image: "/images/projects/3.png",
  },

  {
    index: "04",
    name: "Inventory",
    type: "Inventory automation",
    description:
      "An inventory control system that automates stock monitoring, supplier workflows, replenishment, and low-stock communication.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT", "JUnit"],
    detail:
      "The system connects products with suppliers, continuously monitors inventory levels, detects low-stock conditions, sends automated notifications, processes CSV-based data operations, and routes replenishment orders directly to suppliers.",
    metric: "Replenishment without friction",
    image: "/images/projects/4.png",
  },

  {
    index: "05",
    name: "URL Shortener",
    type: "URL management infrastructure",
    description:
      "A secure URL shortening platform with custom aliases, expiration controls, usage analytics, authentication, and role-based access.",
    stack: ["Java", "Spring Boot", "MySQL", "Spring Security", "Thymeleaf"],
    detail:
      "The application manages the complete URL lifecycle from creation and custom alias assignment to redirection, expiration, activation state, and analytics, with security enforced across user and administrative workflows.",
    metric: "Small URLs, controlled lifecycle",
    image: "/images/projects/5.png",
  },
];

const capabilities = [
  {
    number: "A",
    title: "Service architecture",
    description:
      "Modular monoliths, domain boundaries, and distributed systems that stay understandable as they grow.",
    tags: ["DDD", "API design", "Event-driven"],
  },
  {
    number: "B",
    title: "Performance & scale",
    description:
      "Practical profiling and capacity thinking for services that need to hold their shape under real load.",
    tags: ["JVM tuning", "Caching", "Async IO"],
  },
  {
    number: "C",
    title: "Reliable delivery",
    description:
      "Thoughtful testing, observability, and delivery paths that lower operational uncertainty.",
    tags: ["Testcontainers", "OpenTelemetry", "CI/CD"],
  },
];

const experiences = [
  {
    range: "NOW — JUL 2025",
    role: "Java Developer",
    focus: "Building production-ready backend services, APIs, and scalable Java applications at Qpixel.",
  },
  {
    range: "JUN 2025 — APR 2025",
    role: "Java Developer Intern",
    focus: "Built Spring Boot applications while contributing to backend services and API development in a production environment.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="section-label">
      <span className="section-label-dot" />
      <span>{children}</span>
    </div>
  );
}

function Logo({ stacked = false }: { stacked?: boolean }) {
  return (
    <span className={stacked ? "logo logo--stacked" : "logo"}>
      <span className="logo-first">SUMAN</span>
      <span className="logo-last">BISUNKHE</span>
    </span>
  );
}

export default function Home() {
  const [openProject, setOpenProject] = useState<string | null>("Ledgerline");
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("INTRO");
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const activeProject = useMemo(
    () => projects.find((project) => project.name === openProject),
    [openProject],
  );

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const threshold = window.innerHeight * 0.3;
        let current = sections[0].label;
        for (const { id, label } of sections) {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top <= threshold) {
            current = label;
          }
        }
        setActiveSection(current);
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("load", update);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 84);
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("sumanbisunkhe304@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:sumanbisunkhe304@gmail.com";
    }
  };

  const smoothScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <main className={`runtime-page${isScrolled ? " is-scrolled" : ""}`}>
      <aside className="runtime-rail" aria-label="Section progress">
        <a href="#top" className="rail-mark" aria-label="SUMAN BISUNKHE — back to top">
          <Logo stacked />
        </a>
        <nav className="rail-nav" aria-label="Runtime section navigation">
          {sections.map(({ id, label }, index) => (
            <a key={id} href={`#${id}`} className={activeSection === label ? "is-current" : ""}>
              <span>0{index}</span><i aria-hidden="true" /><b>{label}</b>
            </a>
          ))}
        </nav>
        <div className="rail-reading" aria-live="polite">
          <span>READING</span>
          <strong>{activeSection}</strong>
        </div>
        
      </aside>

      <header className="site-header">
        <a href="#top" className="wordmark" aria-label="SUMAN BISUNKHE — home">
          <Logo />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.label} onClick={() => smoothScroll(item.href)}>
              <span>{item.label}</span>
              <ArrowDownRight size={14} strokeWidth={1.8} />
            </button>
          ))}
        </nav>
        <button className="header-contact" onClick={() => smoothScroll("#contact")}>
          Let&apos;s build <ArrowUpRight size={16} />
        </button>
        <button
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            aria-label="Mobile navigation"
          >
            {navItems.map((item, index) => (
              <button key={item.label} onClick={() => smoothScroll(item.href)}>
                <span>0{index + 1}</span>{item.label}<ArrowUpRight size={19} />
              </button>
            ))}
            <button onClick={() => smoothScroll("#contact")}>
              <span>04</span>Let&apos;s build<ArrowUpRight size={19} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      <section className="hero-section" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <motion.div
            className="eyebrow"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <span className="pulse-dot" /> SOFTWARE ENGINEER / JAVA
          </motion.div>
          <h1 id="hero-title">
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            >
              Systems that
            </motion.span>
            <motion.span
              className="hero-outline"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            >
              hold their
            </motion.span>
            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.28, ease: [0.23, 1, 0.32, 1] }}
            >
              shape.
            </motion.span>
          </h1>
          <motion.div
            className="hero-bottom"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.46 }}
          >
            <p>
              I design Java services that stay fast, clear, and dependable when the problem gets interesting.
            </p>
            <button className="text-cta" onClick={() => smoothScroll("#work")}>
              Explore selected work <ArrowDownRight size={18} />
            </button>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 34 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.86, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* <div className="visual-index">RUNTIME / 21</div> */}
          <img src={runtimeHero} alt="Abstract JVM runtime structure with an ember-red core" />
          <div className="visual-corner top-corner" />
          <div className="visual-corner bottom-corner" />
        </motion.div>

        <div className="hero-ledger" aria-label="Technical focus areas">
          <span>JAVA</span>
          <span>SPRING BOOT</span>
          <span>DISTRIBUTED SYSTEMS</span>
          <span>OBSERVABILITY</span>
        </div>
      </section>

      <section className="manifesto-section" aria-label="Working approach">
        <div className="manifesto-number">/01</div>
        <div>
          <p className="manifesto-kicker">THE OPERATING PRINCIPLE</p>
          <p className="manifesto-copy">
            Good systems don&apos;t merely process requests. They make complexity <em>visible</em>, recovery <em>possible</em>,
            and the next decision <em>clear</em>.
          </p>
        </div>
        <div className="manifesto-aside">
          <span>ENGINEERED FOR</span>
          <strong>CLARITY<br />UNDER LOAD</strong>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <svg className="process-path work-process-path" viewBox="0 0 680 190" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 22 H170 V78 H405 V147 H680" />
          <circle cx="170" cy="22" r="5" /><circle cx="405" cy="78" r="5" /><circle cx="680" cy="147" r="5" />
        </svg>
        <div className="section-heading">
          <SectionLabel>SELECTED WORK</SectionLabel>
          <h2 id="work-title">A few systems,<br /><em>closely considered.</em></h2>
          <p>Architecture that remains readable to the people who need to evolve it next.</p>
        </div>

        <div className="project-list">
          {projects.map((project) => {
            const isOpen = openProject === project.name;
            return (
              <article className={`project-card ${isOpen ? "is-open" : ""}`} key={project.name}>
                <button
                  className="project-trigger"
                  onClick={() => setOpenProject(isOpen ? null : project.name)}
                  aria-expanded={isOpen}
                >
                  <span className="project-index">{project.index}</span>
                  <div className="project-title-wrap">
                    <h3>{project.name}</h3>
                    <span>{project.type}</span>
                  </div>
                  <p>{project.description}</p>
                  <span className="project-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="project-detail"
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="project-detail-inner">
                        {project.image ? (
                          <img src={project.image} alt="Abstract service architecture study" />
                        ) : (
                          <div className="project-schematic" aria-hidden="true">
                            <span className="schematic-node node-a" /><span className="schematic-node node-b" />
                            <span className="schematic-node node-c" /><i className="schematic-line line-a" />
                            <i className="schematic-line line-b" /><i className="schematic-line line-c" />
                            <b>{project.index}</b>
                          </div>
                        )}
                        <p>{project.detail}</p>
                        <div className="project-meta">
                          <span>{project.metric}</span>
                          <div>{project.stack.map((item) => <i key={item}>{item}</i>)}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </section>

      <section className="capabilities-section" id="capabilities" aria-labelledby="capabilities-title">
        <div className="capability-art">
          <img src={codeKinetics} alt="Abstract data flow structure in graphite glass and ember red" />
          <div className="art-label art-label-one">DURABLE / DESIGN</div>
          <div className="art-label art-label-two">THREAD / SAFE</div>
        </div>
        <div className="capability-content">
          <svg className="process-path capability-process-path" viewBox="0 0 460 880" preserveAspectRatio="none" aria-hidden="true">
            <path d="M458 20 H330 V214 H128 V486 H330 V824 H458" />
            <circle cx="330" cy="214" r="5" /><circle cx="128" cy="486" r="5" /><circle cx="330" cy="824" r="5" />
          </svg>
          <SectionLabel>CAPABILITIES</SectionLabel>
          <h2 id="capabilities-title">Built around<br /><em>the hard parts.</em></h2>
          <div className="capability-list">
            {capabilities.map((capability, index) => (
              <motion.article
                className="capability-item"
                key={capability.number}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.46, delay: index * 0.08 }}
              >
                <span className="capability-number">{capability.number}</span>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  <div className="tag-list">{capability.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-section" id="experience" aria-labelledby="experience-title">
        <div className="experience-annotation" aria-hidden="true"><span>RUNTIME</span><b>LOG / 03</b></div>
        <div className="experience-heading">
          <SectionLabel>EXPERIENCE</SectionLabel>
          <h2 id="experience-title">A line of<br />increasing <em>resolution.</em></h2>
        </div>
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <motion.article
              className="experience-item"
              key={experience.range}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span>{experience.range}</span>
              <h3>{experience.role}</h3>
              <p>{experience.focus}</p>
              <ChevronRight size={20} />
            </motion.article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <div className="contact-noise" />
        <div className="contact-eyebrow"><span /> AVAILABLE FOR THOUGHTFUL PROBLEMS</div>
        <h2 id="contact-title">Let&apos;s build<br /><em>the reliable thing.</em></h2>
        <div className="contact-actions">
          <a href="mailto:sumanbisunkhe304@gmail.com" className="email-link">sumanbisunkhe304@gmail.com <ArrowUpRight size={25} /></a>
          <button className="copy-button" onClick={copyEmail}>
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? "COPIED" : "COPY EMAIL"}
          </button>
        </div>
        <div className="contact-footer-row">
          <span>RESPONSE WINDOW / 24–48 HRS</span>
          <div className="social-links">
            <a href="https://github.com/sumanbisunkhe" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href="https://linkedin.com/in/suman-bisunkhe" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="mailto:sumanbisunkhe304@gmail.com" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>&copy; SUMAN BISUNKHE 2026</span>
        <a href="#top">BACK TO TOP <ArrowUpRight size={14} /></a>
       <span>BUILT WITH &lt;3</span>
      </footer>
    </main>
  );
}
