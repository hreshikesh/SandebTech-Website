import React, { useState, useMemo } from "react";
import {
  Ship,
  Layers,
  BookOpen,
  ExternalLink,
  Search,
  GraduationCap,
  Rocket,
  Wrench,
  FileText,
  HelpCircle,
  PlayCircle,
  Clock,
  BarChart3,
  ArrowUpRight,
  Filter
} from "lucide-react";
import "./TutorialsPage.css";

/**
 * Tutorials / Learning Resources.
 *
 * Route: /resources/tutorials
 *
 * Every link points at official vendor documentation, verified live:
 *   SHIPFLOW -> https://shipflow.se/pub/site/index.html
 *   CAESES   -> https://docs.caeses.com/docs/what-is-CAESES/
 * Nothing is mirrored or rehosted.
 */

const platforms = [
  {
    id: "shipflow",
    label: "SHIPFLOW",
    icon: Ship,
    vendor: "FLOWTECH International",
    tagline: "Official training documentation for SHIPFLOW CFD software",
    description:
      "SHIPFLOW is a comprehensive CFD software suite for maritime applications, specializing in ship hull design and optimization, resistance and propulsion analysis, seakeeping and maneuvering predictions, and free surface flow simulations.",
    docsUrl: "https://shipflow.se/pub/site/index.html",
    docsLabel: "Open SHIPFLOW Tutorials",
    stats: [
      { value: "30 min", label: "First tutorial", icon: Clock },
      { value: "Beginner", label: "Entry level", icon: BarChart3 },
      { value: "Video", label: "Walkthroughs included", icon: PlayCircle }
    ],
    tracks: [
      {
        id: "sf-start",
        icon: Rocket,
        level: "Start here",
        title: "Getting Started",
        description:
          "Install SHIPFLOW, license the suite, and confirm the example files are reachable before running your first case.",
        url: "https://shipflow.se/pub/site/getting-started/installation/index.html",
        linkLabel: "Installation Guide"
      },
      {
        id: "sf-basic",
        icon: GraduationCap,
        level: "Basic",
        title: "Tutorial 1 — Potential Free Surface Analysis",
        description:
          "Free surface flow analysis with the XPAN module on a KCS container ship and a RoPax vessel. Covers the Design interface, IGES import, solver configuration and wave pattern post-processing.",
        url: "https://shipflow.se/pub/site/tutorials/basic/tutorial-1-xpan.html",
        linkLabel: "Start Tutorial 1",
        topics: [
          "Free surface computations with potential flow",
          "Creating design variants",
          "Automatic generation of offset files",
          "Boundary layer calculations",
          "Grid generation for viscous flow computations"
        ]
      },
      {
        id: "sf-advanced",
        icon: Wrench,
        level: "Advanced",
        title: "Advanced Techniques",
        description:
          "For experienced users: manual grid generation, advanced post-processing with the XCHAP viscous solver, and full optimization workflows.",
        url: "https://shipflow.se/pub/site/index.html",
        linkLabel: "Browse Advanced Topics",
        topics: [
          "Manual grid generation techniques",
          "Advanced post-processing with XCHAP",
          "Optimization workflows"
        ]
      }
    ],
    quickLinks: [
      {
        icon: FileText,
        label: "User Manual",
        url: "https://shipflow.se/pub/site/usermanual/introduction.html"
      },
      {
        icon: BookOpen,
        label: "Glossary",
        url: "https://shipflow.se/pub/site/reference/glossary.html"
      },
      {
        icon: HelpCircle,
        label: "FAQ",
        url: "https://shipflow.se/pub/site/reference/faq.html"
      }
    ]
  },
  {
    id: "caeses",
    label: "CAESES",
    icon: Layers,
    vendor: "FRIENDSHIP SYSTEMS · now part of Maya HTT",
    tagline: "Flexible CAD platform for design studies with simulation tools",
    description:
      "CAESES bridges the gap between traditional CAD and simulation. It provides intelligent geometry models for robust variation of the shape, and CFD automation to conduct design explorations and optimization — with a focus on simulation-ready, variable CAD.",
    docsUrl: "https://docs.caeses.com/docs/what-is-CAESES/",
    docsLabel: "Open CAESES Documentation",
    stats: [
      { value: "Dependency", label: "Based modeling", icon: Layers },
      { value: "Batch", label: "Headless automation", icon: Wrench },
      { value: "Plug-ins", label: "ANSYS · Optimus · optiSLang", icon: Rocket }
    ],
    tracks: [
      {
        id: "cs-what-is",
        icon: Rocket,
        level: "Start here",
        title: "What is CAESES?",
        description:
          "Platform overview covering the CAD capabilities, process automation, and shape optimization that make CAESES an all-in-one design tool for simulation engineers.",
        url: "https://docs.caeses.com/docs/what-is-CAESES/",
        linkLabel: "Read the Overview"
      },
      {
        id: "cs-geometry",
        icon: GraduationCap,
        level: "Fundamentals",
        title: "Parametric Geometry Modeling",
        description:
          "Create objects through the CAD menu, then set their properties. Dependency-based modeling means models can be varied robustly during automated optimization without breaking or failing to regenerate.",
        url: "https://docs.caeses.com/docs/geometry-modeling/basics/",
        linkLabel: "Geometry Basics",
        topics: [
          "Dependency-based modeling vs. history-based CAD",
          "Types, commands, and the object hierarchy",
          "Creating dependencies by drag and drop",
          "Expressions and global commands",
          "Geometry constraints for feasible designs"
        ]
      },
      {
        id: "cs-shipflow",
        icon: Ship,
        level: "Integration",
        title: "SHIPFLOW Connection Tutorial",
        description:
          "Run SHIPFLOW from within CAESES: import an IGES hull, build a surface group, configure xflow and XPAN, then launch and monitor the computation and visualize wave patterns in the 3D view.",
        url: "https://docs.caeses.com/tutorials/maritime/software-connection/shipflow/",
        linkLabel: "Open Connection Tutorial",
        topics: [
          "Surface group assembly from imported IGES",
          "SHIPFLOW configuration — offset, lpp, xaxdir, ysign",
          "Main settings — mono hull, fsflow, coarse mesh",
          "Adding XPAN with iteration and core count",
          "Running and monitoring via the TaskMonitor"
        ]
      },
      {
        id: "cs-optimization",
        icon: Wrench,
        level: "Advanced",
        title: "Optimization & Automation",
        description:
          "Connect external meshing and analysis tools, run design explorations and formal shape optimization, then browse results through the variant management system with charts and PDF reports.",
        url: "https://docs.caeses.com/docs/optimization/overview/",
        linkLabel: "Optimization Guide",
        topics: [
          "Software connection and batch-mode automation",
          "Single- and multi-objective constrained problems",
          "Sampling with response-surface strategies",
          "Variant management, charts and reports"
        ]
      }
    ],
    quickLinks: [
      {
        icon: FileText,
        label: "Software Connection",
        url: "https://docs.caeses.com/docs/software-connection/overview/"
      },
      {
        icon: BookOpen,
        label: "Features",
        url: "https://docs.caeses.com/docs/features/introduction/"
      },
      {
        icon: Wrench,
        label: "Batch Mode",
        url: "https://docs.caeses.com/docs/batch-mode/"
      }
    ]
  }
];

export default function TutorialsPage() {
  const [activeId, setActiveId] = useState(platforms[0].id);
  const [query, setQuery] = useState("");

  const active = platforms.find((p) => p.id === activeId) || platforms[0];
  const ActiveIcon = active.icon;

  const visibleTracks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return active.tracks;
    return active.tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.level.toLowerCase().includes(q) ||
        (t.topics || []).some((topic) => topic.toLowerCase().includes(q))
    );
  }, [active, query]);

  return (
    <section className="tutorials-page">
      <div className="container">
        {/* ---------------------------------------------------------------
            INTRO
           --------------------------------------------------------------- */}
        <div className="tut-intro">
          <span className="tut-eyebrow">
            <GraduationCap size={13} />
            Resources · Tutorials
          </span>
          <h2>Software Tutorials &amp; Documentation</h2>
          <p>
            Official training material for the simulation platforms we support.
            Every link opens the vendor&rsquo;s own documentation, so you always
            work from the current version rather than a stale copy.
          </p>
        </div>

        {/* ---------------------------------------------------------------
            PLATFORM SWITCHER + SEARCH
           --------------------------------------------------------------- */}
        <div className="tut-toolbar">
          <div className="tut-tabs">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`tut-tab ${p.id === activeId ? "active" : ""}`}
                  onClick={() => {
                    setActiveId(p.id);
                    setQuery("");
                  }}
                >
                  <Icon size={16} />
                  <span>{p.label}</span>
                  <span className="tut-tab-count">{p.tracks.length}</span>
                </button>
              );
            })}
          </div>

          <div className="tut-search">
            <Search size={16} className="tut-search-icon" />
            <input
              type="text"
              placeholder={`Search ${active.label} tutorials...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="tut-search-clear"
                onClick={() => setQuery("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ---------------------------------------------------------------
            PLATFORM BANNER
           --------------------------------------------------------------- */}
        <div className="tut-banner" key={active.id}>
          <div className="tut-banner-main">
            <span className="tut-banner-vendor">
              <ActiveIcon size={14} />
              {active.vendor}
            </span>
            <h3>{active.tagline}</h3>
            <p>{active.description}</p>

            <a
              href={active.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tut-banner-cta"
            >
              <span>{active.docsLabel}</span>
              <ArrowUpRight size={17} />
            </a>
          </div>

          <div className="tut-banner-stats">
            {active.stats.map((s) => {
              const Icon = s.icon;
              return (
                <div className="tut-stat" key={s.label}>
                  <Icon size={16} />
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------------------------------------------------------
            LEARNING TRACKS
           --------------------------------------------------------------- */}
        <div className="tut-section-head">
          <span className="tut-section-icon">
            <Filter size={16} />
          </span>
          <h4>Learning Path</h4>
          <span className="tut-rule" />
          <span className="tut-section-count">
            {visibleTracks.length} of {active.tracks.length}
          </span>
        </div>

        {visibleTracks.length > 0 ? (
          <div className="tut-track-grid">
            {visibleTracks.map((track, i) => {
              const Icon = track.icon;
              return (
                <article className="tut-track-card" key={track.id}>
                  <div className="tut-track-head">
                    <span className="tut-track-icon">
                      <Icon size={18} />
                    </span>
                    <div className="tut-track-meta">
                      <span className="tut-level">{track.level}</span>
                      <span className="tut-step">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  <h5>{track.title}</h5>
                  <p>{track.description}</p>

                  {track.topics && (
                    <ul className="tut-topics">
                      {track.topics.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}

                  <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tut-track-link"
                  >
                    <span>{track.linkLabel}</span>
                    <ExternalLink size={14} />
                  </a>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="tut-empty">
            <BookOpen size={42} />
            <h5>No tutorials match &ldquo;{query}&rdquo;</h5>
            <p>Try a different keyword, or browse the full documentation.</p>
            <button
              type="button"
              className="tut-empty-reset"
              onClick={() => setQuery("")}
            >
              Clear Search
            </button>
          </div>
        )}

        {/* ---------------------------------------------------------------
            QUICK REFERENCE
           --------------------------------------------------------------- */}
        <div className="tut-quick">
          <div className="tut-quick-text">
            <h4>{active.label} Quick Reference</h4>
            <p>Manuals, glossaries and reference material from the vendor.</p>
          </div>
          <div className="tut-quick-links">
            {active.quickLinks.map((l) => {
              const Icon = l.icon;
              return (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tut-quick-badge"
                >
                  <Icon size={15} />
                  <span>{l.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
