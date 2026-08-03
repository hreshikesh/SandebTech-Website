import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Wind,
  Server,
  Flame,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Activity,
  Cpu,
  Layers,
  FileCheck,
  Zap,
  Users,
  Thermometer,
  Gauge,
} from "lucide-react";

import "./Hvac.css";
import SEO from "../../components/seo/SEO";
import hvacImg from "../../assets/images/havc/havc-cfd.webp";
import datacenterImg from "../../assets/images/havc/datacenter.webp";

const ashraeStandards = [
  {
    code: "ASHRAE Standard 55",
    title: "Thermal Environmental Conditions",
    desc: "Operative temperature, humidity, and PMV/PPD thermal comfort indices for human occupancy.",
  },
  {
    code: "ASHRAE Standard 62.1",
    title: "Indoor Air Quality (IAQ)",
    desc: "Ventilation rate procedure, air distribution effectiveness, and contaminant control.",
  },
  {
    code: "ASHRAE Standard 90.1",
    title: "Energy Standard for Buildings",
    desc: "Energy efficiency standards for HVAC equipment sizing, duct design, and fan power limitation.",
  },
  {
    code: "ASHRAE Fundamentals & Systems",
    title: "Design Load & Sizing",
    desc: "Advanced methodology for heating/cooling loads, ductwork, and equipment selection.",
  },
  {
    code: "ASHRAE Standard 62.1-2007",
    title: "Enclosed Space & Car Park Ventilation",
    desc: "Carbon monoxide (CO) dilution criteria, jet-fan placement, and emergency ventilation rates.",
  },
];

const animationVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function Hvac() {
  const [activeTab, setActiveTab] = useState("hvac");

  // Custom pre-filled contact parameters
  const contactQuery = new URLSearchParams({
    subject: "Inquiry: HVAC & Data Center CFD Simulation Services",
    service: "HVAC & Fire Safety CFD",
    message:
      "Hello SandebTech Team,\n\nI am interested in your HVAC CFD Design, Data Center Thermal Management, or Fire & Evacuation Simulation services. Please get in touch to discuss our project requirements.",
  }).toString();

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    <div className="hvac-page">
      <SEO
        title="HVAC & Data Center CFD Design Services | SandebTech"
        description="Optimize thermal management, airflow distribution, and energy efficiency in data centers and industrial facilities with HVAC CFD analysis."
        keywords="HVAC CFD, Data Center CFD, Thermal Management, Airflow Simulation, Cleanroom CFD, SandebTech"
        url="https://sandebtech.com/services/hvac"
      />
      {/* Background Decorators */}
      <div className="hvac-blueprint-bg"></div>
      <div className="hvac-blob hvac-blob-blue"></div>
      <div className="hvac-blob hvac-blob-orange"></div>

      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="hvac-hero">
        <div className="container hvac-hero-wrapper">
          <motion.div
            className="hvac-hero-content"
            initial="hidden"
            animate="visible"
            variants={animationVariants}
          >
            <span className="hvac-badge">
              <span className="badge-pulse"></span>
              PRECISION SIMULATION & SAFETY ENGINEERING
            </span>

            <h1>
              HVAC & Data Center <br />
              <span className="gradient-text">CFD Design Services</span>
            </h1>

            <p className="hvac-hero-desc">
              SandebTech delivers high-fidelity HVAC CFD design, data center thermal management, and
              life-safety evacuation studies powered by in-house simulation experts and aligned with
              international standards.
            </p>

            {/* Standards Compliance Pills */}
            <div className="standards-pill-group">
              <span className="std-pill">
                <FileCheck size={14} /> ASHRAE
              </span>
              <span className="std-pill">
                <FileCheck size={14} /> CIBSE
              </span>
              <span className="std-pill">
                <FileCheck size={14} /> NBC
              </span>
              <span className="std-pill">
                <FileCheck size={14} /> NFPA
              </span>
              <span className="std-pill">
                <FileCheck size={14} /> IBC
              </span>
            </div>

            <div className="hvac-hero-actions">
              <Link to={`/contact?${contactQuery}`} className="btn-primary-shimmer">
                <span>Request CFD Consultation</span>
                <ArrowRight size={18} />
              </Link>
              <a href="#services-grid" className="btn-secondary-outline">
                Explore Capabilities
              </a>
            </div>
          </motion.div>

          {/* Right Floating Stat Hero Graphic */}
          <motion.div
            className="hvac-hero-card-stack"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-stat-card glass-card top-card">
              <div className="stat-icon-box blue">
                <Wind size={24} />
              </div>
              <div>
                <h4>Indoor Air Quality & Comfort</h4>
                <p>PMV / PPD & ADPI Validated</p>
              </div>
            </div>

            <div className="hero-stat-card glass-card middle-card">
              <div className="stat-icon-box orange">
                <Server size={24} />
              </div>
              <div>
                <h4>Data Center Cooling</h4>
                <p>Hot/Cold Aisle & N+1 Redundancy</p>
              </div>
            </div>

            <div className="hero-stat-card glass-card bottom-card">
              <div className="stat-icon-box red">
                <Flame size={24} />
              </div>
              <div>
                <h4>Fire & Evacuation Studies</h4>
                <p>PyroSim (FDS) & Pathfinder (ASET vs RSET)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. SECTION TABS / QUICK NAVIGATOR                         */}
      {/* ========================================================= */}
      <section className="hvac-nav-section" id="services-grid">
        <div className="container">
          <div className="hvac-tab-bar">
            <button
              className={`hvac-tab-btn ${activeTab === "hvac" ? "active" : ""}`}
              onClick={() => handleTabChange("hvac")}
            >
              <Wind size={20} />
              <span>HVAC CFD Design</span>
            </button>

            <button
              className={`hvac-tab-btn ${activeTab === "datacenter" ? "active" : ""}`}
              onClick={() => handleTabChange("datacenter")}
            >
              <Server size={20} />
              <span>Data Center CFD</span>
            </button>

            <button
              className={`hvac-tab-btn ${activeTab === "fire" ? "active" : ""}`}
              onClick={() => handleTabChange("fire")}
            >
              <Flame size={20} />
              <span>Fire & Evacuation</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. HVAC CFD DESIGN SERVICES (WITH IMAGE 1)                */}
      {/* ========================================================= */}
      <section className={`hvac-section ${activeTab === "hvac" ? "show-block" : ""}`}>
        <div className="container">
          <div className="hvac-split-grid">
            {/* Left Content */}
            <motion.div
              key={`hvac-info-${activeTab}`}
              className="hvac-info-col"
              initial="hidden"
              animate="visible"
              variants={animationVariants}
            >
              <div className="section-label">
                <Wind size={16} /> HVAC CFD DESIGN SERVICES
              </div>
              <h2>Reliable, Energy-Efficient Airflow & Thermal Solutions</h2>
              <p className="section-intro">
                From routine maintenance to full system design and CFD-based performance validation,
                SandebTech delivers optimized HVAC solutions for residential, commercial, and heavy
                industrial facilities.
              </p>

              <div className="feature-checklist">
                <div className="check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <h4>Thermal Comfort & Indoor Air Quality (IAQ)</h4>
                    <p>
                      Precise analysis of airflow patterns, temperature gradients, relative humidity,
                      and pollutant dispersion.
                    </p>
                  </div>
                </div>

                <div className="check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <h4>Fire & Smoke Modeling</h4>
                    <p>
                      Advanced smoke propagation modeling for ventilation sizing and suppression
                      system design.
                    </p>
                  </div>
                </div>

                <div className="check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <h4>Equipment Design & Optimization</h4>
                    <p>
                      Performance validation for industrial fans, heat exchangers, duct networks,
                      pumps, and compressors.
                    </p>
                  </div>
                </div>

                <div className="check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <h4>Carpark & Tunnel Ventilation</h4>
                    <p>
                      Enclosed space ventilation design, carbon monoxide (CO) control, and impulse
                      jet-fan positioning.
                    </p>
                  </div>
                </div>

                <div className="check-item">
                  <CheckCircle2 size={20} className="check-icon" />
                  <div>
                    <h4>Industrial Process Airflow</h4>
                    <p>
                      Balancing heavy industrial process air needs with human occupant comfort
                      (PMV/PPD, ADPI parameters).
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Image 1 Wrapper */}
            <motion.div
              key={`hvac-img-${activeTab}`}
              className="hvac-image-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="image-frame">
                <div className="frame-glow"></div>
                <img
                  src={hvacImg}
                  alt="HVAC CFD Thermal & Airflow Simulation"
                  className="section-featured-img"
                />

                {/* Overlay Badge */}
                <div className="glass-overlay-badge bottom-right">
                  <Gauge size={22} className="text-blue" />
                  <div>
                    <strong>PMV & PPD Compliant</strong>
                    <span>ASHRAE Standard 55</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ASHRAE Standards Matrix sub-block */}
          <div className="ashrae-matrix-wrapper">
            <h3>
              <ShieldCheck size={24} className="text-blue" /> ASHRAE Compliance Standards
            </h3>
            <div className="ashrae-grid">
              {ashraeStandards.map((item, idx) => (
                <div key={idx} className="ashrae-card">
                  <span className="ashrae-code">{item.code}</span>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DATA CENTER CFD DESIGN (WITH IMAGE 2 & RACK METRICS)  */}
      {/* ========================================================= */}
      <section
        className={`hvac-section datacenter-bg ${activeTab === "datacenter" ? "show-block" : ""}`}
      >
        <div className="container">
          <div className="hvac-split-grid reverse-layout">
            {/* Left Image 2 Wrapper */}
            <motion.div
              key={`dc-img-${activeTab}`}
              className="hvac-image-col"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="image-frame">
                <div className="frame-glow orange-glow"></div>
                <img
                  src={datacenterImg}
                  alt="Data Center CFD Hotspot & Thermal Management"
                  className="section-featured-img"
                />

                {/* Secondary Image Visual Mock Card */}
                <div className="secondary-visual-card">
                  <div className="visual-header">
                    <Thermometer size={16} />
                    <span>Rack Inlet Temp Simulation</span>
                  </div>
                  <div className="temp-bar-preview">
                    <span className="temp-zone cold">Cold Aisle: 18°C</span>
                    <span className="temp-zone hot">Hot Aisle: 36°C</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              key={`dc-info-${activeTab}`}
              className="hvac-info-col"
              initial="hidden"
              animate="visible"
              variants={animationVariants}
            >
              <div className="section-label orange-label">
                <Server size={16} /> DATA CENTER THERMAL MANAGEMENT
              </div>
              <h2>Prevent Hotspots & Optimize Cooling Energy</h2>
              <p className="section-intro">
                We apply advanced computational fluid dynamics to server rooms and high-density data
                centers. Our models prevent thermal recirculation, lower PUE, and validate cooling
                capacity prior to hardware deployment.
              </p>

              <div className="dc-points-grid">
                <div className="dc-card">
                  <div className="dc-icon">
                    <Layers size={20} />
                  </div>
                  <h4>Hot-Aisle / Cold-Aisle Containment</h4>
                  <p>Design and optimization of physical containment barriers to eliminate thermal mixing.</p>
                </div>

                <div className="dc-card">
                  <div className="dc-icon">
                    <Thermometer size={20} />
                  </div>
                  <h4>Rack-Level Hotspot Prediction</h4>
                  <p>Precise mapping of server inlet temperatures to protect mission-critical IT hardware.</p>
                </div>

                <div className="dc-card">
                  <div className="dc-icon">
                    <Cpu size={20} />
                  </div>
                  <h4>CRAC/CRAH Sizing & Redundancy</h4>
                  <p>Evaluation of air handler placement, air throw, and failure mode scenarios (N, N+1).</p>
                </div>

                <div className="dc-card">
                  <div className="dc-icon">
                    <Zap size={20} />
                  </div>
                  <h4>Plenum & Underfloor Distribution</h4>
                  <p>Raised-floor pressure distribution studies for equal airflow across perforated tiles.</p>
                </div>

                <div className="dc-card">
                  <div className="dc-icon">
                    <Activity size={20} />
                  </div>
                  <h4>Recirculation & Bypass Reduction</h4>
                  <p>Identification of short-circuiting cold air paths to maximize chillers operational efficiency.</p>
                </div>

                <div className="dc-card">
                  <div className="dc-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <h4>ASHRAE TC9.9 Compliance</h4>
                  <p>Benchmarking thermal operational envelopes against recommended & allowable guidelines.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FIRE & EVACUATION STUDY (PYROSIM + PATHFINDER)       */}
      {/* ========================================================= */}
      <section className={`hvac-section ${activeTab === "fire" ? "show-block" : ""}`}>
        <div className="container">
          <div className="fire-header text-center">
            <span className="section-label red-label">
              <Flame size={16} /> LIFE SAFETY & CODE COMPLIANCE
            </span>
            <h2>Fire & Evacuation Studies Using PyroSim & Pathfinder</h2>
            <p className="section-intro center-intro">
              By combining Fire Dynamics Simulator (NIST FDS / PyroSim) with agent-based occupant egress
              modeling (Pathfinder), SandebTech quantifies life-safety margins to ensure regulatory
              compliance.
            </p>
          </div>

          {/* PyroSim vs Pathfinder Split Comparison */}
          <div className="fire-tools-grid">
            {/* PyroSim Card */}
            <div className="tool-card pyro-card">
              <div className="tool-header">
                <Flame size={32} className="tool-icon red" />
                <div>
                  <h3>PyroSim (NIST FDS)</h3>
                  <span>Fire & Smoke Dispersion Modeling</span>
                </div>
              </div>
              <ul className="tool-list">
                <li>
                  <CheckCircle2 size={16} /> Thermal radiation & heat release rate (HRR) prediction
                </li>
                <li>
                  <CheckCircle2 size={16} /> Toxic gas & smoke visibility mapping
                </li>
                <li>
                  <CheckCircle2 size={16} /> Smoke control & tenability criteria evaluation
                </li>
                <li>
                  <CheckCircle2 size={16} /> <strong>Calculates ASET:</strong> Available Safe Egress Time
                </li>
              </ul>
            </div>

            {/* Pathfinder Card */}
            <div className="tool-card path-card">
              <div className="tool-header">
                <Users size={32} className="tool-icon blue" />
                <div>
                  <h3>Pathfinder</h3>
                  <span>Agent-Based Egress Simulation</span>
                </div>
              </div>
              <ul className="tool-list">
                <li>
                  <CheckCircle2 size={16} /> Individual occupant movement & walking speed variations
                </li>
                <li>
                  <CheckCircle2 size={16} /> Exit door & stairwell bottleneck analysis
                </li>
                <li>
                  <CheckCircle2 size={16} /> Emergency evacuation time optimization
                </li>
                <li>
                  <CheckCircle2 size={16} /> <strong>Calculates RSET:</strong> Required Safe Egress Time
                </li>
              </ul>
            </div>
          </div>

          {/* ASET vs RSET Safety Concept Banner */}
          <div className="aset-rset-banner">
            <div className="aset-info">
              <h4>Safety Margin Verification: ASET &gt; RSET</h4>
              <p>
                Life safety code compliance is demonstrated when the Available Safe Egress Time (ASET)
                significantly exceeds the Required Safe Egress Time (RSET), ensuring occupants evacuate
                safely before conditions become untenable.
              </p>
            </div>
            <div className="code-pill-list">
              <span>NFPA 101</span>
              <span>NFPA 5000</span>
              <span>NFPA 92</span>
              <span>NFPA 130</span>
              <span>NFPA 502</span>
              <span>NFPA 72</span>
              <span>NFPA 88A</span>
              <span>SFPE Guidelines</span>
            </div>
          </div>

          {/* Sector Applications Bar */}
          <div className="applications-bar">
            <h4>Target Facilities:</h4>
            <div className="app-tags">
              <span>High-Rise Buildings</span>
              <span>Shopping Malls</span>
              <span>Road & Rail Tunnels</span>
              <span>Underground Car Parks</span>
              <span>Data Centers</span>
              <span>Hospitals</span>
              <span>Sports Stadiums</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. CUSTOM TAILORED CONTACT / CTA SECTION                  */}
      {/* ========================================================= */}
      <section className="hvac-cta-section">
        <div className="container">
          <div className="hvac-cta-card">
            <div className="cta-content">
              <span className="cta-badge">READY TO OPTIMIZE YOUR SYSTEM?</span>
              <h2>Validate Your HVAC & Data Center Performance Before Installation</h2>
              <p>
                Partner with SandebTech's simulation engineers to eliminate design risks, comply with
                NFPA/ASHRAE standards, and optimize energy efficiency.
              </p>
            </div>

            <div className="cta-action-box">
              <Link to={`/contact?${contactQuery}`} className="cta-btn-primary">
                <span>Contact Engineering Team</span>
                <ArrowRight size={20} />
              </Link>
              <span className="cta-subtext">Direct project review & CFD feasibility assessment</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hvac;