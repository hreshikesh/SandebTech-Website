// src/pages/services/ColdStream.jsx
import React from "react";
import {
  Thermometer,
  CheckCircle2,
  ShieldCheck,
  Gauge,
  Cpu,
  Layers,
  Clock,
  ArrowUpRight,
  Mail,
  FileText,
  ExternalLink,
  Zap,
  Target,
  BarChart3,
  Box,
  Workflow,
  Settings,
  Repeat,
  BrainCircuit,
} from "lucide-react";

import coldstreamImage from "../../assets/images/coldstream/coldstreamhero.webp";
import generativeDesign from "../../assets/images/coldstream/generativedesign.webp";
import thermalSim from "../../assets/images/coldstream/thermal.webp";
import heatsinkOpt from "../../assets/images/coldstream/heatSink.webp";

import "./ColdStream.css";
import PageBanner from "../../components/common/PageBanner";

const service = {
  id: "ColdStream",
  label: "ColdStream",
  icon: Thermometer,
  image: coldstreamImage,
  imageAlt:
    "AI-driven generative thermal design of an optimized heat sink by ColdStream",
  eyebrow: "ColdStream · Generative AI · Thermal Design",
  title: "AI-powered generative design for thermal management",
  summary:
    "SandebTech is an authorized partner for ColdStream by Diabatix, the world's first generative AI platform for thermal design. ColdStream automatically generates optimized heat sink and cold plate geometries that outperform traditional designs by up to 2× on thermal resistance — reducing engineering time from weeks to hours. Engineers define boundary conditions and constraints; the AI explores millions of design permutations to deliver manufacturable, high-performance cooling solutions.",
  detail:
    "ColdStream combines generative design with GPU-accelerated CFD simulation to create thermally optimal geometries that no human designer would conceive. The platform ingests your thermal requirements — power maps, airflow conditions, spatial constraints, and manufacturing method — then autonomously generates, simulates, and ranks thousands of candidate designs. The result is a production-ready 3D geometry with verified thermal performance, exported as STEP or STL for immediate prototyping or manufacturing.",
  stats: [
    {
      image: generativeDesign,
      alt: "ColdStream generative AI exploring heat sink topologies",
      label: "Generative Thermal Design",
      caption:
        "AI autonomously explores thousands of topologies to find the optimal geometry for your thermal constraints and manufacturing method.",
    },
    {
      image: thermalSim,
      alt: "Integrated CFD thermal simulation of generated designs",
      label: "Integrated CFD Simulation",
      caption:
        "Every generated design is automatically simulated with high-fidelity CFD, so thermal performance is verified — not estimated.",
    },
    {
      image: heatsinkOpt,
      alt: "Optimized heat sink geometry ready for manufacturing",
      label: "Manufacturable Output",
      caption:
        "Designs respect your manufacturing constraints — extrusion, die-casting, CNC, or additive — and export as STEP/STL files.",
    },
  ],
  performance: [
    {
      icon: Gauge,
      value: "2×",
      label: "Better thermal performance vs. traditional",
    },
    { icon: Cpu, value: "1000+", label: "Design candidates explored per run" },
    { icon: Clock, value: "Hours", label: "Instead of weeks of engineering" },
    {
      icon: Zap,
      value: "100%",
      label: "Automated design-to-simulation pipeline",
    },
  ],
  capabilities: [
    "Heat sink design — pin-fin, plate-fin, and free-form topologies optimized for natural or forced convection",
    "Cold plate design — internal channel geometries for liquid cooling of power electronics and batteries",
    "Generative AI — explores millions of permutations beyond human intuition to find global optima",
    "Integrated CFD — every candidate is simulated automatically; no manual meshing or setup required",
    "Manufacturing-aware — designs respect extrusion, die-casting, CNC milling, or additive manufacturing constraints",
    "Multi-objective optimization — balance thermal resistance, pressure drop, weight, and cost simultaneously",
    "Export-ready — production-quality STEP and STL files for immediate prototyping or tooling",
  ],
  workflow: [
    {
      title: "Define the problem",
      text: "Specify your heat sources, power maps, airflow conditions, spatial envelope, and manufacturing method.",
    },
    {
      title: "AI generates designs",
      text: "ColdStream's generative engine explores thousands of topologies, optimizing geometry for your thermal targets.",
    },
    {
      title: "Simulate & validate",
      text: "Each candidate design is automatically evaluated with integrated CFD simulation to verify thermal performance.",
    },
    {
      title: "Export & manufacture",
      text: "Select the best design, download production-ready STEP/STL files, and move directly to prototyping or production.",
    },
  ],
  applications: [
    {
      title: "Power Electronics",
      items: [
        "IGBT module cooling for inverters and converters",
        "SiC and GaN device thermal management",
        "EV traction inverter cold plates",
        "Power supply and UPS heat sinks",
      ],
    },
    {
      title: "LED & Lighting",
      items: [
        "High-power LED array heat sinks",
        "Automotive headlamp thermal solutions",
        "Stadium and industrial lighting coolers",
        "Compact consumer lighting thermal designs",
      ],
    },
    {
      title: "Data Centers & HPC",
      items: [
        "Server CPU and GPU heat sinks",
        "Liquid-cooled cold plates for HPC nodes",
        "Rack-level thermal management",
        "Edge computing enclosure cooling",
      ],
    },
    {
      title: "Automotive & EV",
      items: [
        "Battery pack cold plates for thermal uniformity",
        "Motor controller and inverter cooling",
        "ADAS sensor thermal management",
        "On-board charger heat dissipation",
      ],
    },
  ],
  standards: {
    intro:
      "ColdStream's platform and outputs are built on validated computational methods and engineering best practices:",
    groups: [
      {
        title: "Simulation & Validation",
        items: [
          "GPU-accelerated CFD solver for conjugate heat transfer",
          "Validated against experimental measurements and wind tunnel data",
          "Mesh-independent results with automated convergence checks",
          "Thermal resistance, pressure drop, and temperature field outputs",
        ],
      },
      {
        title: "Design & Manufacturing",
        items: [
          "Generative AI trained on millions of thermal design evaluations",
          "Manufacturing constraints enforced: draft angles, min. wall thickness, tool access",
          "STEP and STL export compatible with all major CAD/CAM platforms",
          "Supports extrusion, die-casting, CNC machining, and additive manufacturing",
        ],
      },
    ],
  },
  resources: [
    {
      label: "ColdStream Platform",
      url: "https://www.diabatix.com/coldstream",
    },
    {
      label: "Diabatix Technology",
      url: "https://www.diabatix.com/technology",
    },
    {
      label: "Case Studies",
      url: "https://www.diabatix.com/resources",
    },
  ],
  links: [{ label: "contact", url: "/contact" }],
};

export default function ColdStream() {
  const Icon = service.icon;

  return (
    <section className="cs-page">
      <PageBanner title={service.label} subtitle={service.title} />
      <div className="container">
        {/* ---------------------------------------------------------------
            BANNER
           --------------------------------------------------------------- */}
        <div className="cs-banner">
          <div className="cs-banner-media">
            <img src={service.image} alt={service.imageAlt} />
            <span className="cs-banner-tag">
              <Icon size={14} />
              <span>{service.eyebrow}</span>
            </span>
          </div>

          <div className="cs-banner-body">
            <p className="cs-summary">{service.summary}</p>
            <p className="cs-detail">{service.detail}</p>

            <div className="cs-perf">
              {service.performance.map((p) => {
                const PIcon = p.icon;
                return (
                  <div className="cs-perf-item" key={p.label}>
                    <PIcon size={16} />
                    <strong>{p.value}</strong>
                    <span>{p.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            STUDY TYPES (image cards)
           --------------------------------------------------------------- */}
        <div className="cs-section">
          <div className="cs-section-head">
            <span className="cs-section-icon">
              <Layers size={17} />
            </span>
            <h4>Core Capabilities</h4>
            <span className="cs-rule" />
            <span className="cs-section-count">
              {service.stats.length} pillars
            </span>
          </div>

          <div className="cs-stat-grid">
            {service.stats.map((s) => (
              <figure className="cs-stat-card" key={s.label}>
                <div className="cs-stat-media">
                  <img src={s.image} alt={s.alt} loading="lazy" />
                </div>
                <figcaption>
                  <h5>{s.label}</h5>
                  <p>{s.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------
            WHAT COLDSTREAM DELIVERS
           --------------------------------------------------------------- */}
        <div className="cs-section">
          <div className="cs-section-head">
            <span className="cs-section-icon">
              <CheckCircle2 size={17} />
            </span>
            <h4>What ColdStream Delivers</h4>
            <span className="cs-rule" />
          </div>

          <ul className="cs-caps">
            {service.capabilities.map((c) => (
              <li key={c}>
                <CheckCircle2 size={16} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------------------------------------------------------
            WORKFLOW
           --------------------------------------------------------------- */}
        <div className="cs-section">
          <div className="cs-section-head">
            <span className="cs-section-icon">
              <Workflow size={17} />
            </span>
            <h4>How It Works</h4>
            <span className="cs-rule" />
          </div>

          <div className="cs-flow">
            {service.workflow.map((w, i) => (
              <div className="cs-flow-step" key={w.title}>
                <span className="cs-flow-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h5>{w.title}</h5>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------
            APPLICATION AREAS
           --------------------------------------------------------------- */}
        <div className="cs-section">
          <div className="cs-section-head">
            <span className="cs-section-icon">
              <Target size={17} />
            </span>
            <h4>Application Areas</h4>
            <span className="cs-rule" />
            <span className="cs-section-count">
              {service.applications.length} sectors
            </span>
          </div>

          <div className="cs-apps-grid">
            {service.applications.map((app) => (
              <div className="cs-app-block" key={app.title}>
                <span className="cs-app-head">
                  <Box size={14} />
                  {app.title}
                </span>
                <ul>
                  {app.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------
            STANDARDS & VALIDATION
           --------------------------------------------------------------- */}
        <div className="cs-section">
          <div className="cs-section-head">
            <span className="cs-section-icon">
              <ShieldCheck size={17} />
            </span>
            <h4>Technology &amp; Validation</h4>
            <span className="cs-rule" />
          </div>

          <p className="cs-standards-intro">{service.standards.intro}</p>

          <div className="cs-standards-grid">
            {service.standards.groups.map((g) => (
              <div className="cs-standards-block" key={g.title}>
                <span className="cs-standards-head">
                  <ShieldCheck size={14} />
                  {g.title}
                </span>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="cs-resources">
            <span className="cs-resources-label">
              <FileText size={14} />
              Learn more
            </span>
            <div className="cs-resource-links">
              {service.resources.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-resource-link"
                >
                  <span>{r.label}</span>
                  <ExternalLink size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            CTA
           --------------------------------------------------------------- */}
        <div className="cs-cta">
          <div className="cs-cta-text">
            <h4>Ready to revolutionize your thermal design?</h4>
            <p>
              Heat sinks, cold plates, power electronics or LED lighting — talk
              to our team about how ColdStream can deliver better cooling in a
              fraction of the time.
            </p>
          </div>
          <div className="cs-cta-actions">
            {service.links.map((l) => (
              <a key={l.url} href={l.url} className="btn-cs-primary">
                <Mail size={16} />
                <span>Contact Us</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
            <a
              href="https://www.diabatix.com/coldstream"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cs-ghost"
            >
              <span>About ColdStream</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}