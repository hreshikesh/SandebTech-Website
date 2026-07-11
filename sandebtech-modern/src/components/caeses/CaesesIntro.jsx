import "./CaesesIntro.css";

import { ExternalLink } from "lucide-react";

import introImg from "../../assets/images/caeses/caeses.webp";

function CaesesIntro() {
  return (
    <section className="caeses-intro">

      <div className="container">

        <div className="caeses-grid">

          <div className="caeses-image">

            <img
              src={introImg}
              alt="CAESES Software"
            />

          </div>

          <div className="caeses-content">

            <span className="section-badge">
              SOFTWARE PLATFORM
            </span>

            <h2>CAESES®</h2>

            <p>
              CAESES® is a comprehensive software solution developed by
              FRIENDSHIP SYSTEMS for geometry-based design exploration
              and optimization. It bridges the gap between traditional
              CAD and simulation by providing intelligent, CFD-ready
              geometry models for automated design studies.
            </p>

            <p>
              CAESES enables engineers to create robust parametric
              geometry that integrates seamlessly into
              simulation-driven optimization workflows. SandebTech,
              together with our sister partner Shiretechnik Solutions,
              provides technical promotion and support for CAESES.
            </p>

            <a
              href="https://www.caeses.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="caeses-btn"
            >
              Visit Official Website

              <ExternalLink size={18} />

            </a>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CaesesIntro;