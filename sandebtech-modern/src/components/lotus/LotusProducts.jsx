import React, { useState } from "react";
import {
  FileText,
  Eye,
  Layers,
  Zap,
  Thermometer,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Gauge,
  Maximize2,
  Ruler,
  MoveVertical,
  Settings2,
  Sparkles
} from "lucide-react";

// Asset Imports
import ltgImg from "../../assets/images/lotus/products/ltg.webp";
import vstrataImg from "../../assets/images/lotus/vstara.webp";
import lsc0580Img from "../../assets/images/lotus/products/lsc0508.webp";
import lbk0504Img from "../../assets/images/lotus/products/lbk0504.webp";
import lmu20p1Img from "../../assets/images/lotus/products/lmu20p1.webp";
import ltgCustomImg from "../../assets/images/lotus/products/customltg.webp";

import pdf1 from "../../assets/images/lotus/documents/pdf1.pdf";
import pdf2 from "../../assets/images/lotus/documents/application note.pdf";
import pdf3 from "../../assets/images/lotus/documents/whitepaper.pdf";
import pdf4 from "../../assets/images/lotus/documents/technical solution breif.pdf";

// Component Imports
import PdfViewerModal from "./PdfViewerModal";
import "./LotusProducts.css";

/* -------------------------------------------------------------
   DATA — sourced from lotus-microsystems.com official pages
   ------------------------------------------------------------- */

const sectionNav = [
  { id: "vstrata", label: "vStrata™ Power Series", icon: Layers },
  { id: "power-management", label: "Power Management", icon: Zap },
  { id: "thermal-management", label: "Thermal Management", icon: Thermometer }
];

const heroStats = [
  { value: "96%", label: "Peak point-of-load efficiency" },
  { value: "1,000A+", label: "Next-gen accelerator current" },
  { value: "< 1 mm", label: "Ultra-thin package profile" },
  { value: "25°C", label: "Operating temperature reduction" }
];

// vStrata key benefits — https://www.lotus-microsystems.com/vstrata
const vstrataBenefits = [
  {
    icon: Cpu,
    title: "Multi-Domain Co-Design",
    text: "Electrical, thermal, and mechanical constraints are addressed as a single, interdependent architecture. Silicon-based substrates manage heat at the point of load, eliminating hotspots and reducing operating temperatures by up to 25°C in optimized configurations."
  },
  {
    icon: Gauge,
    title: "Compute Scaling and Efficiency",
    text: "Engineered to support the 1,000A+ current demands of next-generation AI accelerators. Reducing last-inch power losses and thermal bottlenecks simultaneously enables up to 96% point-of-load efficiency and up to 30% more sustained GPU throughput."
  },
  {
    icon: Maximize2,
    title: "Low-Profile Vertical Integration",
    text: "The silicon Lotus Power Interposer® enables an ultra-thin architecture below 1 mm, placing power directly beneath the processor and supporting load transients exceeding 10 A/ns without external capacitors."
  },
  {
    icon: CheckCircle2,
    title: "Designed for Compatibility",
    text: "Engineered for integration with established Tier-1 reference designs and compatible with existing power management controllers, reducing adoption friction while enabling next-generation performance."
  }
];

const lsc0580Specs = [
  { label: "Input Voltage", value: "2.0 V – 5.0 V" },
  { label: "Output Voltage", value: "0.5 V – 1.2 V" },
  { label: "Peak Efficiency", value: "96%" },
  { label: "Footprint", value: "9 mm × 9 mm" }
];

// Power Management — https://www.lotus-microsystems.com/power-management
const powerProducts = [
  {
    id: "lbk0504",
    name: "LBK0504",
    image: lbk0504Img,
    status: "In Development",
    description:
      "Product in development: The LBK0504 is a miniaturized step-down converter featuring small size and high efficiency.",
    applications: [
      "Optical transceivers",
      "Point of load conversion in servers and storage",
      "Telecom macro and small cell",
      "Consumer and medical applications"
    ],
    url: "https://www.lotus-microsystems.com/products/lbk0504"
  },
  {
    id: "lmu20p1",
    name: "LMU20P1",
    image: lmu20p1Img,
    status: "Available",
    description:
      "Miniaturized Step-Up Power Supply in Package 100 mA Synchronous Boost Converter.",
    applications: [
      "Hearing aids",
      "IoT sensors",
      "Wearable devices",
      "Single- and double-cell PV powered applications"
    ],
    url: "https://www.lotus-microsystems.com/products/lmu20p1"
  }
];

// Thermal Management — https://www.lotus-microsystems.com/thermal-management
const ltgHighlights = [
  "High thermal conductivity",
  "Low capacitance",
  "High insulation resistance",
  "Low CTE"
];

const thermalSpecs = [
  { model: "LTG0201", length: "0.6 ± 3%", width: "0.3 ± 3%", height: "0.3 ± 3%" },
  { model: "LTG0402", length: "1.0 ± 3%", width: "0.5 ± 3%", height: "0.8 ± 3%" },
  { model: "LTG0603", length: "1.6 ± 3%", width: "0.8 ± 3%", height: "0.8 ± 3%" },
  { model: "LTG0805", length: "2.0 ± 3%", width: "1.2 ± 3%", height: "0.8 ± 3%" },
  { model: "LTG1206", length: "3.2 + 3%", width: "1.6 ± 3%", height: "0.8 ± 3%" }
];

// Customized LTG — https://www.lotus-microsystems.com/customized-ltg
const customLtgOptions = [
  {
    icon: Ruler,
    title: "X-Y Dimensions",
    text: "Tailored X-Y dimensions to match your package size, PCB layout, and thermal interface requirements."
  },
  {
    icon: MoveVertical,
    title: "Component Height",
    text: "Optimized component height, customizable from 100 µm to 3 mm, to accommodate different mechanical stack-ups."
  },
  {
    icon: Settings2,
    title: "Component Footprint",
    text: "Custom footprint and contact geometry designed to match your component package for seamless PCB integration."
  },
  {
    icon: Thermometer,
    title: "Heat Transfer Direction",
    text: "Available with lateral, vertical, or combined lateral-vertical heat transfer configurations."
  }
];

// Thermal PDF Documents Data
const thermalDocuments = [
  {
    id: "ltg-datasheet",
    category: "Datasheet",
    title: "LTG Series Thermal Substrate Datasheet",
    description:
      "Detailed thermal resistance, mechanical profiles, and material properties.",
    fileUrl: pdf1
  },
  {
    id: "ltg-app-note",
    category: "Application Note",
    title: "LTG Thermal Integration & Design Guide",
    description:
      "Guidelines for direct substrate bonding and local hot-spot elimination.",
    fileUrl: pdf2
  },
  {
    id: "ltg-whitepaper",
    category: "White Paper",
    title: "Nanoscale Silicon Substrate Thermal Performance",
    description:
      "In-depth thermal conductivity benchmarks and heat-dissipation case studies.",
    fileUrl: pdf3
  },
  {
    id: "ltg-solution-brief",
    category: "Solution Brief",
    title: "LTG Thermal Architecture for High-Density ICs",
    description:
      "Executive summary on optimizing thermal management in advanced 2.5D packaging.",
    fileUrl: pdf4
  }
];

export default function LotusProducts() {
  // Modal state
  const [activePdf, setActivePdf] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ltgTab, setLtgTab] = useState("standard"); // 'standard' | 'custom'

  const handleOpenPdf = (doc) => {
    setActivePdf(doc);
    setIsModalOpen(true);
  };

  const handleClosePdf = () => {
    setIsModalOpen(false);
    setActivePdf(null);
  };

  const handleDownloadPdf = (doc) => {
    const link = document.createElement("a");
    link.href = doc.fileUrl;
    link.download = `${doc.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="lotus-page">
      {/* =============================================================
          1. HERO
         ============================================================= */}
      <header className="lotus-hero">
        <div className="lotus-hero-orb orb-a" />
        <div className="lotus-hero-orb orb-b" />
        <div className="lotus-hero-grid-overlay" />

        <div className="container">
          <div className="lotus-hero-inner">
            <div className="lotus-hero-copy">
           

              <h1>Redefining Power and Thermal Limits in the AI Era</h1>

              <p className="lotus-hero-lead">
                Data centers built for AI and High-Performance Computing demand a
                fundamental rethinking of power and thermal control. Lotus
                Microsystems converges power delivery and thermal management into
                a unified, purpose-built platform for the next generation of AI
                and advanced computing.
              </p>

              <div className="lotus-hero-actions">
                <button
                  type="button"
                  className="btn-hero-primary"
                  onClick={() => handleScrollTo("vstrata")}
                >
                  <span>Explore Products</span>
                  <ArrowRight size={18} />
                </button>
                <a
                  href="/contact"
                  className="btn-hero-ghost"
                >
                  <span>Contact Sales</span>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            <div className="lotus-hero-visual">
              <img src={vstrataImg} alt="Lotus Microsystems vStrata power platform" />
            </div>
          </div>

          {/* Hero Stat Strip */}
          <div className="lotus-hero-stats">
            {heroStats.map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* =============================================================
          2. INTRODUCTION
         ============================================================= */}
      <section className="lotus-intro">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-heading">
              <span className="eyebrow">Overview</span>
              <h2>Vertical Power Delivery Solutions</h2>
            </div>
            <div className="intro-body">
              <p>
                AI acceleration, hyperscale computing, and advanced data center
                architectures demand unprecedented power density, efficiency, and
                thermal performance. As workloads scale and processors draw
                thousands of amps at low voltages, power delivery has become a
                primary system-level constraint.
              </p>
              <p>
                Lotus Microsystems addresses this challenge with a new class of
                vertical power delivery solutions, purpose-built for high-current
                computing platforms. Fully integrated Power System-in-Package
                (PSiP) solutions enable power to be delivered closer to the load,
                minimizing losses, reducing board complexity, and unlocking higher
                compute density.
              </p>
            </div>
          </div>

          {/* Sticky Section Navigation */}
          <nav className="lotus-section-nav">
            {sectionNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  className="section-nav-pill"
                  onClick={() => handleScrollTo(item.id)}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </section>

      <section className="lotus-products">
        <div className="container">
          {/* =============================================================
              CATEGORY 1: vStrata™ Power Series
             ============================================================= */}
          <div className="product-category-group" id="vstrata">
            <div className="category-header">
              <div className="category-heading-row">
                <span className="category-index">01</span>
                <div>
                  <h3>vStrata™ Power Series</h3>
                  <span className="category-subtitle">
                    An ultra-slim, fully integrated high-current power platform
                    designed for the most demanding data center and AI
                    applications.
                  </span>
                </div>
              </div>
              <a
                href="https://www.lotus-microsystems.com/vstrata"
                target="_blank"
                rel="noopener noreferrer"
                className="category-link"
              >
                <span>Official page</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Platform Banner */}
            <div className="vstrata-banner">
              <div className="vstrata-banner-text">
                <span className="platform-tag">The Vertical Power Platform for AI-Scale Computing</span>
                <p>
                  The vStrata™ Power Series combines advanced power conversion and
                  3D packaging with Lotus Power Interposer® (PIT) technology and
                  LTG™ thermal guide technology to address electrical, thermal,
                  and mechanical challenges within a unified architecture for
                  next-generation AI infrastructure.
                </p>
              </div>
              <div className="vstrata-banner-image">
                <img src={vstrataImg} alt="vStrata Power Series module" />
              </div>
            </div>

            {/* Key Benefits */}
            <div className="benefits-grid">
              {vstrataBenefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div className="benefit-card" key={b.title}>
                    <div className="benefit-icon">
                      <Icon size={20} />
                    </div>
                    <h5>{b.title}</h5>
                    <p>{b.text}</p>
                  </div>
                );
              })}
            </div>

            {/* LSC0580 Spotlight */}
            <div className="product-spotlight">
              <div className="spotlight-image">
                <img src={lsc0580Img} alt="LSC0580 engineering sample" />
              </div>

              <div className="spotlight-content">
                <div className="spotlight-tags">
                  <span className="pill pill-solid">LSC0580</span>
                  <span className="pill pill-amber">Samples Q3 2026</span>
                </div>

                <h4>Power Converter for Vertical Point-of-Load Power Delivery</h4>
                <p>
                  Legacy architectures are struggling to support the soaring
                  current loads demanded by modern AI accelerators. The LSC0580 –
                  the first module built on the vStrata platform – bridges this
                  gap. It delivers a low-profile, co-engineered solution that
                  simultaneously resolves electrical, thermal, and mechanical
                  constraints.
                </p>
                <p className="spotlight-note">
                  Engineering samples of LSC0580 will ship in Q3 2026.
                </p>

                <div className="spec-chip-grid">
                  {lsc0580Specs.map((s) => (
                    <div className="spec-chip" key={s.label}>
                      <span className="spec-chip-label">{s.label}</span>
                      <strong>{s.value}</strong>
                    </div>
                  ))}
                </div>

                <a
                  href="https://www.lotus-microsystems.com/products/lsc0580"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-solid"
                >
                  <span>Learn more about LSC0580</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* =============================================================
              CATEGORY 2: Power Management
             ============================================================= */}
          <div className="product-category-group" id="power-management">
            <div className="category-header">
              <div className="category-heading-row">
                <span className="category-index">02</span>
                <div>
                  <h3>Power Management</h3>
                  <span className="category-subtitle">
                    Miniaturized, high-efficiency converter modules that provide
                    reliable step-up / step-down power regulation in extremely
                    compact packages.
                  </span>
                </div>
              </div>
              <a
                href="https://www.lotus-microsystems.com/power-management"
                target="_blank"
                rel="noopener noreferrer"
                className="category-link"
              >
                <span>Official page</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="power-grid">
              {powerProducts.map((p) => (
                <article className="power-card" key={p.id}>
                  <div className="power-card-media">
                    <img src={p.image} alt={`Lotus Microsystems ${p.name}`} />
                    <span
                      className={`power-status ${
                        p.status === "Available" ? "is-available" : "is-dev"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  <div className="power-card-body">
                    <h4>{p.name}</h4>
                    <p>{p.description}</p>

                    <span className="app-list-label">Target applications</span>
                    <ul className="app-list">
                      {p.applications.map((a) => (
                        <li key={a}>
                          <CheckCircle2 size={15} />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="power-card-footer">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-full"
                    >
                      <span>More information</span>
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* =============================================================
              CATEGORY 3: Thermal Management (LTG Series)
             ============================================================= */}
          <div className="product-category-group" id="thermal-management">
            <div className="category-header">
              <div className="category-heading-row">
                <span className="category-index">03</span>
                <div>
                  <h3>Thermal Management (LTG Series)</h3>
                  <span className="category-subtitle">
                    Thermally conductive yet electrically isolated silicon-based
                    thermal jumpers that guide heat away from hot electronic
                    components.
                  </span>
                </div>
              </div>
              <a
                href="https://www.lotus-microsystems.com/thermal-management"
                target="_blank"
                rel="noopener noreferrer"
                className="category-link"
              >
                <span>Official page</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* LTG Family Intro */}
            <div className="ltg-intro-card">
              <div className="ltg-intro-text">
                <h4>LTG Family — Electrically-Isolated SMT Thermal Jumper</h4>
                <p>
                  LTG devices are designed to guide heat away from hot electronic
                  components, such as between active devices and ground planes,
                  without establishing an electrical connection. They
                  significantly enhance thermal conductivity, particularly where
                  there is limited or no direct access to a ground plane or
                  heatsink — such as a high-side switch in a half-bridge
                  configuration.
                </p>
                <p>
                  Silicon, used as an alternative to traditional ceramic
                  materials, offers a cost-effective solution with high thermal
                  conductivity and excellent thermomechanical properties. LTG is
                  Lotus Microsystems' patented technology.
                </p>
                <div className="ltg-highlights">
                  {ltgHighlights.map((h) => (
                    <span className="ltg-highlight" key={h}>
                      <CheckCircle2 size={15} />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
              <div className="ltg-intro-image">
                <img src={ltgImg} alt="Lotus Microsystems Thermal Guide" />
              </div>
            </div>

            {/* Standard vs Customized LTG Switcher */}
            <div className="ltg-tabs-shell">
              <div className="ltg-tabs">
                <button
                  type="button"
                  className={`ltg-tab ${ltgTab === "standard" ? "active" : ""}`}
                  onClick={() => setLtgTab("standard")}
                >
                  <Layers size={16} />
                  <span>Standard LTG</span>
                </button>
                <button
                  type="button"
                  className={`ltg-tab ${ltgTab === "custom" ? "active" : ""}`}
                  onClick={() => setLtgTab("custom")}
                >
                  <Settings2 size={16} />
                  <span>Customized LTG</span>
                </button>
              </div>

              {ltgTab === "standard" ? (
                <div className="ltg-panel">
                  <div className="thermal-wrapper-grid">
                    {/* Visual Highlight Card */}
                    <div className="thermal-image-card">
                      <img src={ltgImg} alt="LTG Thermal Substrate" />
                      <div className="thermal-caption">
                        <h5>Standard LTG Series</h5>
                        <p>
                          Available in standard EIA sizes 0201, 0402, 0603, 0805,
                          and 1206 for drop-in surface-mount integration.
                        </p>
                      </div>
                    </div>

                    {/* Dimensions Data Table */}
                    <div className="thermal-table-card">
                      <h4>LTG Physical Dimension Matrix</h4>
                      <p>
                        Standard surface-mount dimensions across the LTG family
                        portfolio:
                      </p>

                      <div className="table-container">
                        <table className="lotus-table">
                          <thead>
                            <tr>
                              <th>Part Number</th>
                              <th>Length (mm)</th>
                              <th>Width (mm)</th>
                              <th>Height (mm)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {thermalSpecs.map((row) => (
                              <tr key={row.model}>
                                <td className="model-cell">{row.model}</td>
                                <td>{row.length}</td>
                                <td>{row.width}</td>
                                <td>{row.height}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="ltg-panel">
                  <div className="custom-ltg-grid">
                    <div className="custom-ltg-media">
                      <img src={ltgCustomImg} alt="Customized LTG" />
                    </div>

                    <div className="custom-ltg-content">
                      <h4>Customized to your design</h4>
                      <p>
                        No two thermal challenges are the same. Lotus Microsystems
                        works closely with customers to develop LTGs optimized for
                        their specific application — from footprint and package
                        dimensions to heat transfer direction — designed to
                        improve thermal performance while maintaining complete
                        electrical isolation.
                      </p>

                      <div className="custom-options-grid">
                        {customLtgOptions.map((o) => {
                          const Icon = o.icon;
                          return (
                            <div className="custom-option" key={o.title}>
                              <Icon size={18} />
                              <div>
                                <h6>{o.title}</h6>
                                <p>{o.text}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <a
                        href="https://www.lotus-microsystems.com/customized-ltg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-solid"
                      >
                        <span>Learn more about Customized LTG</span>
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PDF Documentation Section — unchanged behaviour */}
            <div className="thermal-docs-container">
              <div className="docs-header">
                <h4>Thermal Technical Documentation &amp; Datasheets</h4>
                <p>
                  Access complete product specs, application guides, and
                  whitepapers.
                </p>
              </div>

              <div className="docs-grid">
                {thermalDocuments.map((doc) => (
                  <div className="doc-card" key={doc.id}>
                    <div className="doc-card-header">
                      <span className="doc-badge">{doc.category}</span>
                      <FileText className="doc-card-icon" size={22} />
                    </div>

                    <div className="doc-card-body">
                      <h5>{doc.title}</h5>
                      <p>{doc.description}</p>
                    </div>

                    <div className="doc-card-actions">
                      {/* View Button -> Opens Modal */}
                      <button
                        type="button"
                        className="btn-view-doc"
                        onClick={() => handleOpenPdf(doc)}
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =============================================================
              CLOSING CTA
             ============================================================= */}
          <section className="lotus-cta-banner">
            <div className="cta-content">
              <div className="cta-text">
                <h3>Early Access Program</h3>
                <p>
                  Interested in evaluating next-generation vertical power delivery
                  for xPU and AI infrastructure? Gain access to engineering
                  samples, technical updates, and direct collaboration with the
                  Lotus Microsystems engineering team.
                </p>
              </div>
              <div className="cta-actions">
                <a
                  href="https://www.lotus-microsystems.com/vstrata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta-primary"
                >
                  <span>Join Early Access</span>
                  <ArrowUpRight size={17} />
                </a>
                <a
                  href="https://www.lotus-microsystems.com/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cta-ghost"
                >
                  <span>Contact Sales</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </section>

      <PdfViewerModal
        isOpen={isModalOpen}
        onClose={handleClosePdf}
        pdfUrl={activePdf?.fileUrl}
        title={activePdf?.title}
      />
    </div>
  );
}
