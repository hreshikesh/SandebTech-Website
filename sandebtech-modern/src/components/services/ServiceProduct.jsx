import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Ship,
  Fan,
  Cpu,
  Wind,
  Flame,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  FileText,
  Eye,
  Download,
  ShieldCheck,
  Award,
  Layers
} from "lucide-react";

import PdfViewerModal from "../lotus/PdfViewerModal";
import "./ServiceProduct.css";

import { services } from "../../data/services";

export default function ServiceProduct() {
  const location = useLocation();

  const [activeId, setActiveId] = useState(services[0].id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [activePdf, setActivePdf] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const active = services.find((s) => s.id === activeId) || services[0];
  const ActiveIcon = active.icon;

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (!hash) return;

    const match = services.find((s) => s.id === hash);
    if (match) {
      setActiveId(match.id);

      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [location.hash]);

  const handleSelect = (id) => {
    setActiveId(id);
    setMobileNavOpen(false);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  return (
    <section className="services-page">
      <div className="container">
        <div className="services-split">
          <aside className="services-rail">
            <div className="rail-heading">
              <span className="rail-eyebrow">Services</span>
              <p>
                Specialised simulation and design-optimization services across
                five engineering domains.
              </p>
            </div>

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
                  <section id={s.id} key={s.id} className="rail-item-section">
                    <button
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
                  </section>
                );
              })}
            </nav>
          </aside>

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
                {active.stats.map((st, idx) => (
                  <div
                    className={`panel-stat ${st.image ? "panel-stat-image-card" : ""}`}
                    key={st.label || idx}
                  >
                    {st.image ? (
                      <div className="stat-image-wrapper">
                        <img src={st.image} alt={st.alt || st.label} />
                        <span>{st.label}</span>
                      </div>
                    ) : (
                      <>
                        <strong>{st.value}</strong>
                        <span>{st.label}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {active.capabilities && (
                <div className="panel-caps">
                  <span className="caps-label">
                    {active.capsLabel || "Capabilities"}
                  </span>
                  <ul className="caps-list">
                    {active.capabilities.map((c) => (
                      <li key={c}>
                        <CheckCircle2 size={15} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {active.capabilityGroups && (
                <div className="panel-caps">
                  {!active.capabilities && (
                    <span className="caps-label">
                      {active.capsLabel || "Capabilities"}
                    </span>
                  )}
                  <div className="cap-group-grid">
                    {active.capabilityGroups.map((g) => (
                      <div className="cap-group" key={g.title}>
                        <span className="cap-group-head">
                          <Layers size={14} />
                          {g.title}
                        </span>
                        <p>{g.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {active.standards && (
                <div className="panel-standards">
                  <span className="caps-label">Standards &amp; Compliance</span>
                  {active.standards.intro && (
                    <p className="standards-intro">{active.standards.intro}</p>
                  )}
                  <div className="standards-grid">
                    {active.standards.groups.map((g) => (
                      <div className="standards-block" key={g.title}>
                        <span className="standards-head">
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
                  {active.standards.note && (
                    <p className="standards-note">{active.standards.note}</p>
                  )}
                </div>
              )}

              {active.benefits && (
                <div className="panel-benefits">
                  <span className="caps-label">{active.benefits.title}</span>
                  <div className="benefit-chip-row">
                    {active.benefits.items.map((b) => (
                      <span className="benefit-chip" key={b}>
                        <Award size={14} />
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {active.closing && (
                <div className="panel-closing">
                  <h4>{active.closing.title}</h4>
                  <p>{active.closing.text}</p>
                </div>
              )}

              {active.documents && (
                <div className="panel-docs">
                  <span className="caps-label">Technical Documents</span>
                  <div className="svc-docs-grid">
                    {active.documents.map((doc) => (
                      <div className="svc-doc-card" key={doc.id}>
                        <div className="svc-doc-head">
                          <span className="svc-doc-badge">{doc.category}</span>
                          <FileText className="svc-doc-icon" size={20} />
                        </div>

                        <div className="svc-doc-body">
                          <h5>{doc.title}</h5>
                          <p>{doc.description}</p>
                        </div>

                        <div className="svc-doc-actions">
                          <button
                            type="button"
                            className="btn-doc-view"
                            onClick={() => handleOpenPdf(doc)}
                          >
                            <Eye size={15} />
                            <span>View</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

      <PdfViewerModal
        isOpen={isModalOpen}
        onClose={handleClosePdf}
        pdfUrl={activePdf?.fileUrl}
        title={activePdf?.title}
      />
    </section>
  );
}