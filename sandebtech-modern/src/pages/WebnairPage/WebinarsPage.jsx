import React, { useState, useMemo } from "react";
import {
  Search,
  Video,
  Calendar,
  Clock,
  User,
  Sparkles,
  ArrowUpRight,
  Filter,
  PlayCircle,
  RefreshCw,
  Layers,
  Cpu,
  Wind,
  Ship,
  Flame,
  Cloud,
  ExternalLink
} from "lucide-react";
import "./WebinarsPage.css";

// Official Webinar Data Source
// Researched July 2026. Every entry below points to a real vendor and a
// URL that was verified (fetched or found in live search results) at the
// time of writing. Where a vendor didn't have a scheduled future session,
// the most recent verifiable webinar/event is used and marked On-Demand.
const rawWebinarsData = [
  {
    id: "webinar-1",
    product: "IESVE",
    category: "IESVE",
    icon: Wind,
    title: "IESVE Learning Academy: HVAC Systems & CFD Airflow Simulation",
    description:
      "A multi-day live series from IES covering geometry setup, daylight & solar, heating/cooling load calculations, CFD airflow simulation, HVAC system modeling with ApacheHVAC, and whole-building energy simulation.",
    date: "September 15–24, 2026",
    time: "11:00 AM PDT",
    duration: "Multi-day series",
    speaker: "IES Applications Team",
    status: "Upcoming",
    registrationUrl: "https://www.iesve.com/discoveries/view/67479/na-learning-academy-2026",
    featured: true,
    tags: ["HVAC Simulation", "IESVE", "Building Performance"]
  },
  {
    id: "webinar-2",
    product: "SHIPFLOW",
    category: "SHIPFLOW",
    icon: Ship,
    title: "SHIPFLOW Public & Custom Training — Ship Hydrodynamics CFD",
    description:
      "FLOWTECH International runs recurring public and custom training on SHIPFLOW's RANS, potential-flow, and SHIPFLOW MOTIONS solvers, covering resistance, self-propulsion, and seakeeping workflows for naval architects.",
    date: "Ongoing schedule",
    time: "Varies by region",
    duration: "Varies",
    speaker: "FLOWTECH SHIPFLOW Applications Team",
    status: "On-Demand",
    registrationUrl: "https://shipflow.se/shipflow-training/",
    featured: false,
    tags: ["Marine CFD", "FLOWTECH", "Hydrodynamics"]
  },
  {
    id: "webinar-3",
    product: "CAESES",
    category: "CAESES",
    icon: Layers,
    title: "CAESES North America User Conference 2026 (Recording)",
    description:
      "A free two-day virtual conference from FRIENDSHIP SYSTEMS covering CAESES customer case studies across marine, aerospace, biomedical, energy, and automotive design, plus hands-on workshops on morphing and automation. Note: FRIENDSHIP SYSTEMS was acquired by Maya HTT in July 2026.",
    date: "March 31 – April 1, 2026",
    time: "EDT",
    duration: "2 Days",
    speaker: "FRIENDSHIP SYSTEMS (now part of Maya HTT)",
    status: "On-Demand",
    registrationUrl: "https://www.caeses.com/north-america-user-conference-2026/",
    featured: false,
    tags: ["Parametric CAD", "Maya HTT", "Shape Optimization"]
  },
  {
    id: "webinar-4",
    product: "TCAE",
    category: "TCAE",
    icon: Cpu,
    title: "Webinar 96 — New TCAE 26.03 Introduction",
    description:
      "CFD SUPPORT introduces the TCAE 26.03 release: improvements to multiphase simulation, numerical robustness, parallel scalability, and mesh-interface workflows for turbomachinery and rotating equipment.",
    date: "April 9, 2026",
    time: "2:00 PM CEST",
    duration: "60 Mins",
    speaker: "CFD SUPPORT Team",
    status: "On-Demand",
    registrationUrl: "https://www.cfdsupport.com/webinars/",
    featured: false,
    tags: ["CFD SUPPORT", "Turbomachinery", "TCAE"]
  },
  {
    id: "webinar-5",
    product: "Celsius",
    category: "Celsius",
    icon: Flame,
    title: "Cadence On-Demand: Thermal Solutions for Electronics & Packaging",
    description:
      "Cadence's on-demand webinar library includes sessions on the Celsius Thermal Solver and Celsius Studio Platform, covering electrothermal co-simulation from chips and packages to full PCB and enclosure-level analysis.",
    date: "Rolling schedule",
    time: "Various",
    duration: "On-Demand",
    speaker: "Cadence Systems Analysis Team",
    status: "On-Demand",
    registrationUrl: "https://www.cadence.com/en_US/home/resources/on-demand-webinars.html",
    featured: false,
    tags: ["Thermal Management", "Cadence Celsius", "Electronics Packaging"]
  },
  {
    id: "webinar-6",
    product: "SimScale",
    category: "SimScale",
    icon: Cloud,
    title: "SimScale Summer 2026 Product Updates",
    description:
      "A guided tour of SimScale's newest cloud simulation capabilities: Engineering AI for faster simulation lead times, mesh-free GPU-accelerated CFD via the PAMICS SPH solver, motion coupling in the electromagnetics solver, and a new time-harmonic AC solver.",
    date: "June 2026",
    time: "—",
    duration: "On-Demand",
    speaker: "SimScale Product Team",
    status: "On-Demand",
    registrationUrl: "https://www.simscale.com/blog/webinar-highlights-simscale-summer-2026-product-updates/",
    featured: false,
    tags: ["Cloud CFD", "Engineering AI", "SimScale"]
  }
];

const categories = [
  { id: "all", name: "All Webinars" },
  { id: "SHIPFLOW", name: "SHIPFLOW", icon: Ship },
  { id: "CAESES", name: "CAESES", icon: Layers },
  { id: "IESVE", name: "IESVE (HVAC)", icon: Wind },
  { id: "Celsius", name: "Celsius", icon: Flame },
  { id: "TCAE", name: "TCAE", icon: Cpu },
  { id: "SimScale", name: "SimScale", icon: Cloud }
];

export default function WebinarsPage() {
  const [webinarsData, setWebinarsData] = useState(rawWebinarsData);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'Upcoming' | 'On-Demand'

  // Simulated refresh action
  const handleRefreshFeed = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  // Filter Logic
  const filteredWebinars = useMemo(() => {
    return webinarsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.speaker.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [webinarsData, selectedCategory, statusFilter, searchQuery]);

  // Featured Item Selection
  const featuredItem = useMemo(() => {
    return webinarsData.find((item) => item.featured) || webinarsData[0];
  }, [webinarsData]);

  return (
    <main className="webinars-page">
      {/* -------------------------------------------------------------
          1. HERO HEADER WITH GLOW ORBS
         ------------------------------------------------------------- */}
      <header className="webinars-hero">
        <div className="hero-glow-orb orb-1"></div>
        <div className="hero-glow-orb orb-2"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
         
              <span>Live & On-Demand Training Hub</span>
            </div>
            <h1>Engineering Webinars & Masterclasses</h1>
            <p>
              Deep-dive technical sessions hosted by leading simulation vendors. Learn advanced workflows, solve complex modeling challenges, and watch past recordings.
            </p>

            {/* Search Box */}
            <div className="webinars-search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search topics, speakers, products (e.g. IESVE, SimScale)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container main-content-wrapper">
        {/* -------------------------------------------------------------
            2. FEATURED WEBINAR BANNER
           ------------------------------------------------------------- */}
        {!loading && selectedCategory === "all" && statusFilter === "all" && !searchQuery && featuredItem && (
          <section className="featured-webinar-section">
            <div className="featured-webinar-card">
              <div className="featured-tag-strip">
                <span className="live-pill">
                  <span className="pulse-dot"></span> Featured Upcoming Session
                </span>
                <span className="featured-date-time">
                  <Calendar size={14} /> {featuredItem.date} &bull; <Clock size={14} /> {featuredItem.time}
                </span>
              </div>

              <div className="featured-webinar-body">
                <h2>{featuredItem.title}</h2>
                <p>{featuredItem.description}</p>

                <div className="speaker-row">
                  <User size={16} />
                  <span>Hosted by: <strong>{featuredItem.speaker}</strong></span>
                </div>

                <div className="featured-webinar-footer">
                  <div className="tags-container">
                    {featuredItem.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={featuredItem.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-featured-register"
                  >
                    <span>Secure Your Spot</span>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            3. FILTER TABS & STATUS SWITCHER
           ------------------------------------------------------------- */}
        <section className="filter-tabs-section">
          <div className="filter-header">
            <div className="filter-label">
              <Filter size={18} />
              <span>Filter by Software Suite</span>
            </div>
            <div className="filter-meta-actions">
              {/* Status Toggle Switch */}
              <div className="status-toggle-group">
                <button
                  className={`status-chip ${statusFilter === "all" ? "active" : ""}`}
                  onClick={() => setStatusFilter("all")}
                >
                  All
                </button>
                <button
                  className={`status-chip ${statusFilter === "Upcoming" ? "active" : ""}`}
                  onClick={() => setStatusFilter("Upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`status-chip ${statusFilter === "On-Demand" ? "active" : ""}`}
                  onClick={() => setStatusFilter("On-Demand")}
                >
                  On-Demand
                </button>
              </div>

              <button className="refresh-action-btn" onClick={handleRefreshFeed} title="Refresh Feed">
                <RefreshCw size={14} className={loading ? "spin-icon" : ""} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="filter-tabs-grid">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`tab-btn ${
                    selectedCategory === cat.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {Icon && <Icon size={16} />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* -------------------------------------------------------------
            4. WEBINAR CARDS GRID & SKELETON STATES
           ------------------------------------------------------------- */}
        <section className="webinar-grid-section">
          {loading ? (
            <div className="webinar-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div className="webinar-card skeleton-card" key={n}>
                  <div className="sk-line sk-header"></div>
                  <div className="sk-line sk-title"></div>
                  <div className="sk-line sk-desc"></div>
                  <div className="sk-line sk-btn"></div>
                </div>
              ))}
            </div>
          ) : filteredWebinars.length > 0 ? (
            <div className="webinar-grid">
              {filteredWebinars.map((item) => {
                const ItemIcon = item.icon || Video;
                const isUpcoming = item.status === "Upcoming";
                return (
                  <article className="webinar-card" key={item.id}>
                    <div className="webinar-card-header">
                      <div className="product-badge">
                        <ItemIcon size={15} />
                        <span>{item.product}</span>
                      </div>
                      <span className={`status-badge ${isUpcoming ? "upcoming" : "ondemand"}`}>
                        {isUpcoming ? <Video size={12} /> : <PlayCircle size={12} />}
                        <span>{item.status}</span>
                      </span>
                    </div>

                    <div className="webinar-card-body">
                      <div className="webinar-datetime">
                        <Calendar size={13} /> {item.date} &bull; <Clock size={13} /> {item.duration}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      
                      <div className="speaker-mini">
                        <User size={13} />
                        <span>{item.speaker}</span>
                      </div>
                    </div>

                    <div className="card-tags">
                      {item.tags.map((t) => (
                        <span key={t} className="card-tag">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="webinar-card-footer">
                      <a
                        href={item.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`webinar-action-btn ${isUpcoming ? "register" : "watch"}`}
                      >
                        <span>{isUpcoming ? "Register for Live Session" : "Watch Recorded Session"}</span>
                        {isUpcoming ? <ArrowUpRight size={15} /> : <PlayCircle size={15} />}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="no-results-card">
              <Video size={48} />
              <h3>No webinars found</h3>
              <p>Try searching for a different keyword or adjusting your filters.</p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSelectedCategory("all");
                  setStatusFilter("all");
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* -------------------------------------------------------------
            5. QUICK PORTAL ACCESS BANNER
           ------------------------------------------------------------- */}
        <section className="quick-links-banner">
          <div className="banner-content">
            <div className="banner-text">
              <h3>Official Webinar Archives</h3>
              <p>Explore comprehensive recorded libraries across all software suites directly.</p>
            </div>
            <div className="quick-buttons">
              <a href="https://shipflow.se/shipflow-training/" target="_blank" rel="noopener noreferrer" className="quick-badge">
                <Ship size={15} /><span>SHIPFLOW Training</span>
              </a>
              <a href="https://www.friendship-systems.com/" target="_blank" rel="noopener noreferrer" className="quick-badge">
                <Layers size={15} /><span>CAESES / Maya HTT</span>
              </a>
              <a href="https://www.cfdsupport.com/webinars/" target="_blank" rel="noopener noreferrer" className="quick-badge">
                <Cpu size={15} /><span>TCAE Webinars</span>
              </a>
              <a href="https://www.simscale.com/webinars-workshops/" target="_blank" rel="noopener noreferrer" className="quick-badge">
                <Cloud size={15} /><span>SimScale Webinars</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}