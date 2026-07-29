import React, { useState } from "react";
import {
  Ship,
  Fan,
  Cpu,
  Wind,
  Flame,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";

// Asset Imports
import maritimeImg from "../../assets/images/services/maritime.webp";
import turboImg from "../../assets/images/services/turbo.webp";
import electronicsImg from "../../assets/images/services/electronics.webp";
import hvacImg from "../../assets/images/havc/havc-cfd.webp";
import fireImg from "../../assets/images/havc/datacenter.webp";

import "./ServiceProduct.css";

const services = [
  {
    id: "maritime",
    label: "Maritime",
    icon: Ship,
    image: maritimeImg,
    imageAlt: "Ship hull and propeller hydrodynamics simulation",
    eyebrow: "SHIPFLOW · CAESES",
    title: "Design and optimization of maritime systems",
    summary:
      "Decrease fuel consumption, reduce operational downtime, and maximize speed. SHIPFLOW from FLOWTECH is the world standard for ship hydrodynamics CFD — grids are generated automatically from the hull shape, and resistance and propulsion data are presented the naval architect's way. Paired with CAESES for fully parametric hull, appendage, and propulsor geometry, the two tools form a complete hull-to-power optimization loop.",
    detail:
      "SHIPFLOW's zonal approach combines the XPAN potential-flow panel method for rapid wave resistance and hull ranking, the XCHAP RANS solver for viscous effects, and SHIPFLOW MOTIONS for ship motions and added resistance in waves. CAESES then drives design variations, respecting geometric, stability, and arrangement constraints while connecting to external solvers.",
    stats: [
      { value: "5%", label: "Typical energy savings" },
      { value: "10,000+", label: "Design variants" },
      { value: "100%", label: "Constraint consideration" }
    ],
    capabilities: [
      "Ship hulls — cruise, bulk carrier, naval, RoPax, SWATH, twin-skeg",
      "Propellers — tip rake, variable pitch, outboard, surface piercing",
      "Resistance, self-propulsion, and delivered power prediction",
      "Seakeeping and added resistance in waves (EEDI weather factor)",
      "Wind-assisted propulsion — Flettner rotors and wing sails",
      "Appendages, energy saving devices, and offshore structures"
    ],
    links: [
      { label: "CAESES Maritime", url: "https://www.caeses.com/applications/maritime/" },
      { label: "SHIPFLOW by FLOWTECH", url: "https://www.flowtech.se/" }
    ]
  },
  {
    id: "turbomachinery",
    label: "Turbomachinery",
    icon: Fan,
    image: turboImg,
    imageAlt: "Compressor wheel and turbine blade geometry",
    eyebrow: "CAESES · TCAE",
    title: "Design and optimization of turbomachinery",
    summary:
      "Generate and optimize complex turbomachinery geometries to achieve higher efficiency and better overall performance. Create fully parametric blade, volute, and casing geometries — or rapidly modify imported geometries using advanced morphing techniques — then run robust design variations with minimal failures while automatically respecting manufacturing and packaging constraints.",
    detail:
      "Geometries export in multiple CFD-ready formats and connect seamlessly to external simulation tools. Integrated DoE, optimization algorithms, data management, and post-processing let teams explore the design space, while advanced analytics and machine learning uncover trends for data-driven design decisions.",
    stats: [
      { value: "1,000+", label: "Blade geometries" },
      { value: "90%", label: "Less manual modeling" },
      { value: "Days", label: "Instead of weeks" }
    ],
    capabilities: [
      "Blades — axial turbine stages, compressor stators, radial compressors",
      "Impellers — pump, shrouded, turbopump inducers, flow domains",
      "Fans — axial, skewed, compact with serrations, toroidal",
      "Volutes — single scroll, twin scroll, compressor, squirrel cage",
      "Turbochargers, pumps, gas and steam turbines, compressors",
      "Blades with internal cooling channels"
    ],
    links: [
      { label: "CAESES Turbomachinery", url: "https://www.caeses.com/applications/turbo" },
      { label: "TCAE by CFD SUPPORT", url: "https://www.cfdsupport.com/tcae/" }
    ]
  },
  {
    id: "electronics-cooling",
    label: "Electronics Cooling",
    icon: Cpu,
    image: electronicsImg,
    imageAlt: "Electronics cooling conjugate heat transfer simulation",
    eyebrow: "TCAE · Conjugate Heat Transfer",
    title: "Thermal simulation for electronics and data centers",
    summary:
      "Conjugate heat transfer (CHT) analysis resolves conduction through solids and convection in the surrounding fluid within a single coupled simulation — the essential tool for predicting junction temperatures, eliminating hotspots, and extending component lifespan in densely packed electronics.",
    detail:
      "Multi-region meshes couple air, coolant, and solid domains across non-conformal interfaces, with boundary layers resolved at solid-fluid walls. Applications span air-cooled enclosures through liquid cold plates with serpentine micro-channels, where validated CHT models have shown as much as 97% of CPU-generated heat transferred directly into the coolant.",
    stats: [
      { value: "CHT", label: "Coupled solid + fluid" },
      { value: "Multi-region", label: "Air · liquid · solid" },
      { value: "Transient", label: "Steady & time-accurate" }
    ],
    capabilities: [
      "PCB, package, and component-level junction temperature prediction",
      "Heat sink, cold plate, and micro-channel design optimization",
      "Air-cooled, liquid-cooled, and hybrid-cooled server racks",
      "Data center airflow, hotspot elimination, and waste heat recovery",
      "Forced and natural convection with radiation coupling",
      "Fan curve integration and enclosure ventilation studies"
    ],
    links: [
      { label: "TCAE by CFD SUPPORT", url: "https://www.cfdsupport.com/tcae/" }
    ]
  },
  {
    id: "hvac",
    label: "HVAC",
    icon: Wind,
    image: hvacImg,
    imageAlt: "HVAC airflow and ventilation simulation in a building",
    eyebrow: "TCAE · Building Airflow",
    title: "HVAC, ventilation and thermal comfort",
    summary:
      "Design and analyze cooling, ventilation, and refrigeration systems with accurate fluid flow and heat transfer simulations. CFD reveals how air actually moves through a space — validating diffuser placement, duct sizing, and supply/return strategy long before anything is installed.",
    detail:
      "Simulation supports both mechanical and natural ventilation schemes, quantifying thermal comfort, air change effectiveness, and contaminant dispersion. Adjoint-based duct optimization further reduces pressure loss and fan energy, while acoustic post-processing addresses HVAC noise as a coupled concern.",
    stats: [
      { value: "Comfort", label: "PMV / PPD assessment" },
      { value: "Energy", label: "Fan power reduction" },
      { value: "IAQ", label: "Contaminant transport" }
    ],
    capabilities: [
      "Supply and return duct placement, sizing, and flow balancing",
      "Diffuser and grille performance with throw and spread analysis",
      "Natural and mixed-mode ventilation for low-energy buildings",
      "Cleanroom layout validation and contamination risk assessment",
      "Thermal comfort mapping and temperature stratification",
      "Duct pressure-loss optimization and HVAC noise prediction"
    ],
    links: [
      { label: "TCAE by CFD SUPPORT", url: "https://www.cfdsupport.com/tcae/" },
      { label: "TCAA Acoustics", url: "https://www.cfdsupport.com/tcaa/" }
    ]
  },
  {
    id: "fire-safety",
    label: "Fire Safety",
    icon: Flame,
    image: fireImg,
    imageAlt: "Smoke movement and fire safety simulation",
    eyebrow: "Fire & Smoke Modelling",
    title: "Fire, smoke movement and life safety engineering",
    summary:
      "Performance-based fire engineering uses CFD to predict smoke spread, visibility, and temperature through a building during a design fire. Results feed directly into tenability criteria and evacuation strategy, supporting approvals where prescriptive code alone cannot demonstrate compliance.",
    detail:
      "Transient simulations resolve buoyancy-driven plumes, ceiling jets, and smoke layer descent, coupled with the mechanical smoke control system. Outputs — visibility distance, gas temperature, and toxic species concentration at occupant height — are compared against regulatory tenability limits over the required safe egress time.",
    stats: [
      { value: "Transient", label: "Time-resolved fire growth" },
      { value: "Tenability", label: "ASET vs. RSET" },
      { value: "Smoke", label: "Visibility & toxicity" }
    ],
    capabilities: [
      "Design fire definition and heat release rate curves",
      "Smoke movement, layer descent, and stratification in atria",
      "Smoke control, extraction, and pressurization system sizing",
      "Sprinkler and detector activation timing",
      "Tunnel and car park ventilation under fire conditions",
      "Egress tenability assessment against regulatory criteria"
    ],
    links: [
      { label: "TCAE by CFD SUPPORT", url: "https://www.cfdsupport.com/tcae/" }
    ]
  }
];

export default function ServiceProduct() {
  const [activeId, setActiveId] = useState(services[0].id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const active = services.find((s) => s.id === activeId) || services[0];
  const ActiveIcon = active.icon;

  const handleSelect = (id) => {
    setActiveId(id);
    setMobileNavOpen(false);
  };

  return (
    <section className="services-page">
      <div className="container">
        <div className="services-split">
          {/* -------------------------------------------------------------
              LEFT — OPTION RAIL
             ------------------------------------------------------------- */}
          <aside className="services-rail">
            <div className="rail-heading">
              <span className="rail-eyebrow">Services</span>
              <p>
                Specialised simulation and design-optimization services across
                five engineering domains.
              </p>
            </div>

            {/* Mobile dropdown trigger */}
            <button
              type="button"
              className="rail-mobile-trigger"
              onClick={() => setMobileNavOpen((v) => !v)}
              aria-expanded={mobileNavOpen}
            >
              <span className="trigger-current">
                <ActiveIcon size={17} />
                <span>{active.label}</span>
              </span>
              <ChevronDown
                size={18}
                className={mobileNavOpen ? "chev open" : "chev"}
              />
            </button>

            <nav className={`rail-nav ${mobileNavOpen ? "is-open" : ""}`}>
              {services.map((s, i) => {
                const Icon = s.icon;
                const isActive = s.id === activeId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`rail-item ${isActive ? "active" : ""}`}
                    onClick={() => handleSelect(s.id)}
                  >
                    <span className="rail-item-index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="rail-item-icon">
                      <Icon size={17} />
                    </span>
                    <span className="rail-item-label">{s.label}</span>
                    <span className="rail-item-marker" />
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* -------------------------------------------------------------
              RIGHT — CONTENT PANEL
             ------------------------------------------------------------- */}
          <div className="services-panel" key={active.id}>
            <div className="panel-media">
              <img src={active.image} alt={active.imageAlt} />
              <span className="panel-media-tag">
                <ActiveIcon size={14} />
                <span>{active.eyebrow}</span>
              </span>
            </div>

            <div className="panel-body">
              <h3>{active.title}</h3>
              <p className="panel-summary">{active.summary}</p>
              <p className="panel-detail">{active.detail}</p>

              <div className="panel-stats">
                {active.stats.map((st) => (
                  <div className="panel-stat" key={st.label}>
                    <strong>{st.value}</strong>
                    <span>{st.label}</span>
                  </div>
                ))}
              </div>

              <div className="panel-caps">
                <span className="caps-label">Capabilities</span>
                <ul className="caps-list">
                  {active.capabilities.map((c) => (
                    <li key={c}>
                      <CheckCircle2 size={15} />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel-links">
                {active.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel-link"
                  >
                    <span>{l.label}</span>
                    <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
