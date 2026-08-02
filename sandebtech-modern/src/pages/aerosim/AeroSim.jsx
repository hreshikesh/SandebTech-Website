import React from "react";
import {
  Wind,
  CheckCircle2,
  ShieldCheck,
  Gauge,
  Cpu,
  Layers,
  Clock,
  ArrowUpRight,
  Mail,
  FileText,
  ExternalLink
} from "lucide-react";


import aeroSimImage from "../../assets/images/services/aerosim.webp";
import pedestrin from "../../assets/images/services/pedestrin.webp";
import facade from "../../assets/images/services/facade.webp";
import load from "../../assets/images/services/load.webp";

import "./AeroSim.css";
import PageBanner from "../../components/common/PageBanner";


const service = {
  id: "Aero Sim",
  label: "AeroSim",
  icon: Wind,
  image: aeroSimImage,
  imageAlt: "Urban wind flow and pressure simulation around tall buildings",
  eyebrow: "AeroSim · LES/LBM · GPU",
  title: "Wind engineering and computational wind studies",
  summary:
    "SandebTech authorized is patner for AeroSim, a digital wind tunnel built on high-fidelity LES/LBM CFD and accelerated on GPU. Structural loads, facade pressure, and pedestrian comfort are resolved in hours rather than weeks, giving case-specific answers where generic code tables fall short on complex geometry or terrain. Results are validated against wind tunnel measurements and backed by a peer-reviewed solver.",
  detail:
    "Large-eddy simulations reproduce the atmospheric boundary layer with realistic inflow profiles and turbulence for every wind direction. Outputs — external pressure coefficients across the envelope, pedestrian-level velocity fields at 1.5 m, and pressure time series integrated into static and dynamic structural loads — are compared against international comfort and design criteria. A full 16-direction directional study completes in under three days on four GPUs.",
  stats: [
    {
      image: pedestrin,
      alt: "Pedestrian-level wind comfort mapping",
      label: "Pedestrian Comfort",
      caption: "Velocity and gusts mapped at 1.5 m, rated by Lawson / NEN 8100."
    },
    {
      image: facade,
      alt: "Facade external pressure coefficient mapping",
      label: "Facade Pressure",
      caption: "External Cp across the full envelope, zoned for cladding design."
    },
    {
      image: load,
      alt: "Structural wind loads and dynamic response",
      label: "Structural Loads",
      caption: "Pressure time series integrated into static and dynamic forces."
    }
  ],
  performance: [
    { icon: Gauge, value: "10×", label: "Faster than traditional FVM" },
    { icon: Cpu, value: "200M+", label: "Nodes on a single 24 GB GPU" },
    { icon: Clock, value: "< 1 h", label: "Automated setup and meshing" },
    { icon: Layers, value: "16 dir", label: "Full study in under 3 days" }
  ],
  capabilities: [
    "Pedestrian comfort & safety — wind velocity at 1.5 m, rated by Lawson / NEN 8100 criteria",
    "Facade pressure (Cp) — full envelope mapping, split for structure, canopies and cladding",
    "Static forces & dynamic analysis — per-floor accelerations, vortex shedding and occupant comfort",
    "Topographic factor — wind speed-up over hills, slopes, valleys and complex terrain",
    "Basic wind speed (V0) — site-specific values derived from meteorological data",
    "Gas & pollutant dispersion — where a release travels, accumulates and dilutes",
    "Towers, podiums, plazas, terraces, bridges and urban developments"
  ],
  workflow: [
    {
      title: "Model the site",
      text: "Build the development together with neighbouring buildings, ground level and surrounding terrain."
    },
    {
      title: "Run LES",
      text: "Simulate the wind directions and speeds drawn from the local wind climate, with a realistic atmospheric boundary layer."
    },
    {
      title: "Extract and map",
      text: "Pull pressure coefficients, pedestrian-level velocity fields, or pressure time series depending on the study."
    },
    {
      title: "Rate and recommend",
      text: "Compare against comfort and design criteria, flag critical zones, and recommend mitigation."
    }
  ],
  standards: {
    intro:
      "Studies are aligned with international wind-engineering criteria and a validated solver:",
    groups: [
      {
        title: "Comfort & Design Criteria",
        items: [
          "Lawson criteria — pedestrian wind comfort and safety classification",
          "NEN 8100 — wind comfort and danger in the built environment",
          "Eurocode terrain categories — atmospheric boundary layer profiles built in",
          "Occupant comfort criteria — wind-induced acceleration limits for tall buildings"
        ]
      },
      {
        title: "Validation & Method",
        items: [
          "High-fidelity LES using the Lattice Boltzmann Method, GPU-accelerated",
          "Validated against physical wind tunnel measurements",
          "Peer-reviewed solver — Nassu, JWEIA 274 (2026) 106465",
          "CAARC benchmark verified against OpenFOAM reference results"
        ]
      }
    ]
  },
  resources: [
    {
      label: "Peer-Reviewed Paper (DOI)",
      url: "https://doi.org/10.1016/j.jweia.2026.106465"
    },
    { label: "Validation Guide", url: "https://docs.aerosim.io/validation/" },
    { label: "AeroSim Software", url: "https://aerosim.io/software/" }
  ],
  links: [{ label: "contact", url: "/contact" }]
};

export default function AeroSim() {
  const Icon = service.icon;

  return (
    <section className="wind-page">
            <PageBanner title={service.label} subtitle={service.title} />
      <div className="container">



        {/* ---------------------------------------------------------------
            BANNER
           --------------------------------------------------------------- */}
        <div className="wnd-banner">
          <div className="wnd-banner-media">
            <img src={service.image} alt={service.imageAlt} />
            <span className="wnd-banner-tag">
              <Icon size={14} />
              <span>{service.eyebrow}</span>
            </span>
          </div>

          <div className="wnd-banner-body">
            <p className="wnd-summary">{service.summary}</p>
            <p className="wnd-detail">{service.detail}</p>

            <div className="wnd-perf">
              {service.performance.map((p) => {
                const PIcon = p.icon;
                return (
                  <div className="wnd-perf-item" key={p.label}>
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
        <div className="wnd-section">
          <div className="wnd-section-head">
            <span className="wnd-section-icon">
              <Layers size={17} />
            </span>
            <h4>Study Types</h4>
            <span className="wnd-rule" />
            <span className="wnd-section-count">
              {service.stats.length} outputs
            </span>
          </div>

          <div className="wnd-stat-grid">
            {service.stats.map((s) => (
              <figure className="wnd-stat-card" key={s.label}>
                <div className="wnd-stat-media">
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
            CAPABILITIES
           --------------------------------------------------------------- */}
        <div className="wnd-section">
          <div className="wnd-section-head">
            <span className="wnd-section-icon">
              <CheckCircle2 size={17} />
            </span>
            <h4>Capabilities</h4>
            <span className="wnd-rule" />
          </div>

          <ul className="wnd-caps">
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
        <div className="wnd-section">
          <div className="wnd-section-head">
            <span className="wnd-section-icon">
              <Gauge size={17} />
            </span>
            <h4>How a Study Runs</h4>
            <span className="wnd-rule" />
          </div>

          <div className="wnd-flow">
            {service.workflow.map((w, i) => (
              <div className="wnd-flow-step" key={w.title}>
                <span className="wnd-flow-num">{String(i + 1).padStart(2, "0")}</span>
                <h5>{w.title}</h5>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------
            STANDARDS
           --------------------------------------------------------------- */}
        <div className="wnd-section">
          <div className="wnd-section-head">
            <span className="wnd-section-icon">
              <ShieldCheck size={17} />
            </span>
            <h4>Standards &amp; Validation</h4>
            <span className="wnd-rule" />
          </div>

          <p className="wnd-standards-intro">{service.standards.intro}</p>

          <div className="wnd-standards-grid">
            {service.standards.groups.map((g) => (
              <div className="wnd-standards-block" key={g.title}>
                <span className="wnd-standards-head">
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

          <div className="wnd-resources">
            <span className="wnd-resources-label">
              <FileText size={14} />
              Reference material
            </span>
            <div className="wnd-resource-links">
              {service.resources.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wnd-resource-link"
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
        <div className="wnd-cta">
          <div className="wnd-cta-text">
            <h4>Have a project affected by wind?</h4>
            <p>
              Towers, facades, plazas or complex terrain — talk to our team about
              scope, timelines and a formal quotation.
            </p>
          </div>
          <div className="wnd-cta-actions">
            {service.links.map((l) => (
              <a key={l.url} href={l.url} className="btn-wnd-primary">
                <Mail size={16} />
                <span>Contact Us</span>
                <ArrowUpRight size={16} />
              </a>
            ))}
            <a
              href="https://aerosim.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wnd-ghost"
            >
              <span>About AeroSim</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
