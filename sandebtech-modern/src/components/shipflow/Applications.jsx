import { useState } from "react";
import "./Applications.css";
import { ArrowUpRight } from "lucide-react";

import hullImg from "../../assets/images/shipflow/applications/hull.webp";
import bulbImg from "../../assets/images/shipflow/applications/bulb.webp";
import aftbodyImg from "../../assets/images/shipflow/applications/aftbody.webp";

import pdf from "../../assets/images/pdf/Ocean Engineering .pdf";
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
  {
    id: 4,
    title:
      "Validation of full-scale delivered power CFD simulations",
    image: null,
    description:
      "In this paper, computational fluid dynamics (CFD) simulation of steady ship motions at different drift angles, yaw rates, rudder angles, and their combinations are carried out for KRISO Very Large Crude Carrier 2 (KVLCC2) tanker ship. The simulations are conducted with the commercial steady state Reynolds averaged Navier-Stokes (RANS) flow solver SHIPFLOW®. The hydrodynamic forces in horizontal plane and the moment around the vertical axis acting on the ship are determined in deep- and shallow water. Resulting forces and moment are compared to experimental data found in literature. Influence of the water depth is shown with the forces and moment, with the velocity and the turbulent kinetic energy behind the ship and with the pressure distribution on the hull.",
    link: pdf,
    type: "pdf",
  },
];

function Applications() {
  const [activePdf, setActivePdf] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (app) => {
    if (app.type === "pdf") {
      setActivePdf(app);
      setIsModalOpen(true);
    } else {
      window.open(app.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleClosePdf = () => {
    setIsModalOpen(false);
    setActivePdf(null);
  };

  return (
    <section className="applications">
      <div className="container">
        <div className="section-title">
          <span>APPLICATIONS</span>
          <h2>Real Engineering Applications</h2>
          <p>
            SHIPFLOW has been successfully applied to numerous hydrodynamic
            optimization projects, helping naval architects improve ship
            performance through advanced CFD simulations.
          </p>
        </div>

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
              className={`application-content ${!app.image ? "full-width" : ""}`}
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

      {/* PDF Modal — same pattern as LotusProducts */}
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