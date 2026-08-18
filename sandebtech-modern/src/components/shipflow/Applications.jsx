import { useState } from "react";
import "./Applications.css";
import { ArrowUpRight, FileText, ExternalLink } from "lucide-react";

import hullImg from "../../assets/images/shipflow/applications/hull.webp";
import bulbImg from "../../assets/images/shipflow/applications/bulb.webp";
import aftbodyImg from "../../assets/images/shipflow/applications/aftbody.webp";

import { caseStudy } from "../../data/caseStudy";
import PdfViewerModal from "../../components/lotus/PdfViewerModal";

const applications = [
  {
    id: 1,
    title: "Hull Optimization with Lackenby",
    image: hullImg,
    description:
      "Hull form designers constantly seek to improve hydrodynamic performance by refining hull geometry. SHIPFLOW enables efficient hull optimization through Cp curve variation based on the Lackenby shift, allowing designers to evaluate resistance characteristics during the early design stage.",
    link: "https://shipflow.se/cases/hull-optimization-with-lackenby",
    type: "external",
  },
  {
    id: 2,
    title: "Bulb Shape Optimization for Wave Resistance",
    image: bulbImg,
    description:
      "The bulbous bow plays a significant role in reducing wave and viscous resistance. SHIPFLOW assists designers in optimizing bulb geometry, volume and location, enabling improved hydrodynamic efficiency and lower resistance for various ship types.",
    link: "https://shipflow.se/cases/bulb-shape-optimization",
    type: "external",
  },
  {
    id: 3,
    title: "Improvement of Aftbody Hull Form",
    image: aftbodyImg,
    description:
      "SHIPFLOW supports aftbody optimization by evaluating wake quality together with resistance performance. This allows naval architects to balance propulsion efficiency and flow characteristics, resulting in improved overall vessel performance.",
    link: "https://shipflow.se/cases/improvement-of-aftbody-hull-form",
    type: "external",
  },
];



function Applications() {
  const [activePdf, setActivePdf] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (item) => {
    if (item.type === "pdf") {
      setActivePdf(item);
      setIsModalOpen(true);
    } else {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleClosePdf = () => {
    setIsModalOpen(false);
    setActivePdf(null);
  };

  return (
    <section className="applications">
      <div className="container">
        {/* --- MAIN APPLICATIONS SECTION --- */}
        <div className="section-title">
          <span>APPLICATIONS</span>
          <h2>Real Engineering Applications</h2>
          <p>
            SHIPFLOW has been successfully applied to numerous hydrodynamic
            optimization projects, helping naval architects improve ship
            performance through advanced CFD simulations.
          </p>
        </div>

        <div className="applications-list">
          {applications.map((app, index) => (
            <div
              key={app.id}
              className={`application-row ${index % 2 !== 0 ? "reverse" : ""} ${
                !app.image ? "no-image" : ""
              }`}
            >
              {app.image && (
                <div className="application-image">
                  <img src={app.image} alt={app.title} />
                </div>
              )}

              <div
                className={`application-content ${
                  !app.image ? "full-width" : ""
                }`}
              >
                <h3>{app.title}</h3>
                <p>{app.description}</p>

                <button
                  className="case-link"
                  onClick={() => handleLinkClick(app)}
                >
                  {app.type === "pdf"
                    ? "View Research Paper"
                    : "View Detailed Case Study"}
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- CASE STUDIES & RESEARCH PAPERS SECTION --- */}
        <div className="case-studies-wrapper">
          <div className="section-title sub-title">
            <span>RESEARCH & VALIDATION</span>
            <h2>Case Studies & Publications</h2>
            <p>
              Explore peer-reviewed papers, full-scale CFD validation studies,
              and hydrodynamic research published using SHIPFLOW®.
            </p>
          </div>

          <div className="case-studies-grid">
            {caseStudy.map((study) => (
              <div key={study.id} className="case-study-card">
                <div className="case-study-header">
                  <span className={`type-badge ${study.type}`}>
                    {study.type === "pdf" ? (
                      <>
                        <FileText size={14} /> PDF Document
                      </>
                    ) : (
                      <>
                        <ExternalLink size={14} /> External Paper
                      </>
                    )}
                  </span>
                </div>

                <div className="case-study-body">
                  <h4>{study.title}</h4>
                  <p>{study.description}</p>
                </div>

                <div className="case-study-footer">
                  <button
                    className="case-study-btn"
                    onClick={() => handleLinkClick(study)}
                  >
                    {study.type === "pdf"
                      ? "Read Full Research Paper"
                      : "View Article Source"}
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      <PdfViewerModal
        isOpen={isModalOpen}
        onClose={handleClosePdf}
        pdfUrl={activePdf?.link}
        title={activePdf?.title}
      />
    </section>
  );
}

export default Applications;