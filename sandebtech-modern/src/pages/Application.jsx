import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Ship,
  Wind,
  Cpu,
  Flame,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import "./Application.css";

// Assets
import heroBg from "../assets/images/hero/Hero.webp";
import shipflowImg from "../assets/images/shipflow/shipflow.webp";
import caesesImg from "../assets/images/caeses/applications/propeller.webp";
import turboImg from "../assets/images/caeses/applications/turbo.png";
import lotusImg from "../assets/images/lotus/products/lbk0504.webp";
import lotusImg2 from "../assets/images/lotus/products/lmu20p1.webp";
import hvacImg from "../assets/images/solutions/havc.webp";
import hvacImg2 from "../assets/images/solutions/havc2.webp";
const applicationData = {
  marine: {
    id: "marine",
    label: "Marine & Ship Design",
    icon: Ship,
    tag: "Naval Architecture & Hydrodynamics",
    title: "Hydrodynamic Optimization & CFD Marine Analysis",
    description:
      "Advanced hydrodynamic simulation tools and shape optimization software for naval architects and marine engineering firms to reduce vessel resistance and meet EEXI/CII standards.",
    bullets: [
      "High-accuracy numerical flow solver integration",
      "Fully parametric CAD model generation via CAESES",
      "EEXI & CII decarbonization compliance analysis",
    ],
    cards: [
      {
        id: "shipflow-cfd",
        title: "SHIPFLOW CFD Analysis",
        subtitle: "Hydrodynamic Engine",
        description:
          "Specialized CFD tool calculating potential flow, viscous resistance, trim, sinkage, and self-propulsion.",
        image: shipflowImg,
        link: "/solutions/shipflow-cfd",
        tags: ["Potential Flow", "Viscous RANS", "Propulsor Interaction"],
      },
      {
        id: "caeses-hull",
        title: "CAESES Hull Form Optimization",
        subtitle: "Parametric CAD",
        description:
          "Automate hull shape variation coupled with CFD solvers to discover fuel-saving vessel geometries.",
        image: caesesImg,
        link: "/solutions/caeses",
        tags: ["Parametric CAD", "Automated Optimization", "Wave Resistance"],
      },
    ],
  },
  turbomachinery: {
    id: "turbomachinery",
    label: "Turbomachineries",
    icon: Wind,
    tag: "Blade & Impeller Engineering",
    title: "Advanced Turbomachinery Design & Optimization",
    description:
      "Comprehensive design and flow analysis tools for pumps, compressors, turbines, and fans to eliminate cavitation and elevate isotropic efficiency.",
    bullets: [
      "Cavitation risk & secondary flow modeling",
      "Automated blade profiling & 3D impeller design",
      "Transient flow interactions & tip leakage control",
    ],
    cards: [
      {
        id: "turbomachinery-design",
        title: "Pump & Compressor CFD",
        subtitle: "3D Efficiency Analysis",
        description:
          "Analyze secondary flows, blade loading, and tip leakage to maximize overall aerodynamic efficiency.",
        image: turboImg,
        link: "/solutions/caeses",
        tags: ["Cavitation Analysis", "Blade Profiling", "Isentropic Efficiency"],
      },
      {
        id: "caeses-turbomachinery",
        title: "Parametric Impeller Design",
        subtitle: "Blade Optimization",
        description:
          "Create robust, parametric 3D models of impellers, diffusers, and volutes engineered for automated CFD runs.",
        image: caesesImg,
        link: "/solutions/caeses",
        tags: ["Volute Design", "Automated Meshing", "Blade Geometry"],
      },
    ],
  },
  electronics: {
    id: "electronics",
    label: "Electronics Cooling",
    icon: Cpu,
    tag: "Thermal Management & Microfluidics",
    title: "High-Heat Flux Electronics & Semiconductor Cooling",
    description:
      "Next-generation thermal management solutions designed for high-density power electronics, data centers, and advanced microchips using silicon-based microchannel heat sinks.",
    bullets: [
      "Direct-on-chip liquid silicon cooling",
      "Conjugate heat transfer (CHT) simulations",
      "Junction temperature safety & hotspot resolution",
    ],
    cards: [
      {
        id: "lotus-micro",
        title: "Lotus Microsystems Silicon Cooling",
        subtitle: "Silicon Interposers",
        description:
          "Direct-on-chip liquid cooling technology delivering ultra-low thermal resistance for high-power semiconductors.",
        image: lotusImg,
        link: "/solutions/lotus-marine",
        tags: ["Direct Liquid Cooling", "Microchannels", "Power Density"],
      },
      {
        id: "thermal-cfd",
        title: "Convective & Conductive Thermal CFD",
        subtitle: "System-Level Heat Transfer",
        description:
          "Simulate conjugate heat transfer (CHT) to resolve thermal hotspots and optimize heat sink fin geometries.",
        image: lotusImg2,
        link: "/solutions/lotus-marine",
        tags: ["CHT Simulation", "Junction Temp", "Heat Sinks"],
      },
    ],
  },
  hvac: {
    id: "hvac",
    label: "HVAC & Fire Safety",
    icon: Flame,
    tag: "Building Physics & Safety Simulation",
    title: "Environmental Control, Smoke Extraction & Safety CFD",
    description:
      "Precision CFD analysis for enclosed spaces, industrial facilities, and commercial buildings to ensure occupant thermal comfort and life-safety compliance.",
    bullets: [
      "Smoke extraction & tenability validation",
      "PMV/PPD thermal comfort index simulation",
      "NFPA life-safety & cleanroom compliance",
    ],
    cards: [
      {
        id: "fire-smoke-cfd",
        title: "Fire & Smoke Dispersion CFD",
        subtitle: "Life Safety Ventilation",
        description:
          "Model thermal radiation, smoke visibility limits, and toxic gas propagation to validate emergency smoke control systems.",
        image: hvacImg2,
        link: "/solutions/hvac",
        tags: ["Smoke Extraction", "Tenability Analysis", "NFPA Compliance"],
      },
      {
        id: "ventilation-comfort",
        title: "HVAC & Thermal Comfort",
        subtitle: "IAQ & Flow Distribution",
        description:
          "Simulate air velocity profiles, age-of-air, PMV/PPD indices, and cleanroom contaminant dispersal.",
        image: hvacImg,
        link: "/solutions/hvac",
        tags: ["Air Age", "PMV / PPD Index", "Duct Distribution"],
      },
    ],
  },
};

function Applications() {
  const [activeTab, setActiveTab] = useState("marine");
  const currentCategory = applicationData[activeTab];

  return (
    <div className="applications-page">
      {/* ================= HERO SECTION (Compact) ================= */}
      <section className="app-hero">
        <div
          className="app-hero-bg"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="app-hero-overlay"></div>
        </div>

        <div className="container app-hero-content">
          <span className="hero-tag">
            <ShieldCheck size={13} /> SandebTech Engineering Applications
          </span>
          <h1>Engineered Solutions Powered by Computational Precision</h1>
          <p>
            Industry-grade CFD analysis, parametric design automation, and
            specialized thermal management across high-tech industrial sectors.
          </p>
        </div>
      </section>

      {/* ================= MAIN CONTENT & TABS ================= */}
      <section className="app-section">
        <div className="container">
          {/* Tab Navigation Controls (Horizontal Pill Bar) */}
          <div className="app-tabs-wrapper">
            <div className="app-tabs" role="tablist">
              {Object.keys(applicationData).map((key) => {
                const item = applicationData[key];
                const IconComponent = item.icon;
                const isActive = activeTab === key;

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`app-tab-btn ${isActive ? "active" : ""}`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <IconComponent size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Category Header Banner */}
          <div className="app-detail-header">
            <div className="app-detail-content">
              <span className="section-tag">{currentCategory.tag}</span>
              <h2>{currentCategory.title}</h2>
              <p>{currentCategory.description}</p>
            </div>

            <div className="app-detail-bullets">
              {currentCategory.bullets.map((bullet, idx) => (
                <div key={idx} className="bullet-item">
                  <CheckCircle2 size={15} className="bullet-icon" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compact Solutions Cards Grid */}
          <div className="app-cards-grid">
            {currentCategory.cards.map((card) => (
              <div key={card.id} className="app-card">
                <div className="app-card-img-wrapper">
                  <img src={card.image} alt={card.title} loading="lazy" />
                  <span className="app-card-subtitle">{card.subtitle}</span>
                </div>

                <div className="app-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>

                  <div className="app-card-tags">
                    {card.tags.map((tag, idx) => (
                      <span key={idx} className="card-mini-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link to={card.link} className="app-card-btn">
                    <span>Explore Solution</span>
                    <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Applications;