import "./LotusIntro.css";

import { ExternalLink } from "lucide-react";

import lotusImg from "../../assets/images/lotus/lotus.webp";

function LotusIntro() {
  return (
    <section className="lotus-intro">

      <div className="container">

        <div className="lotus-grid">

          <div className="lotus-image">

            <img
              src={lotusImg}
              alt="Lotus Microsystems"
            />

          </div>

          <div className="lotus-content">

            <span className="section-badge">
              SEMICONDUCTOR TECHNOLOGY
            </span>

            <h2>
              Lotus Microsystems
            </h2>

            <p>
              Lotus Microsystems is a fabless semiconductor manufacturer
              specializing in high-performance integrated power modules.
              Founded in 2020 by Ph.D. graduates from the Technical
              University of Denmark (DTU), the company combines expertise
              in nanofabrication, integrated circuit design and power
              electronics.
            </p>

            <p>
              Its innovative technology is backed by years of research
              conducted at internationally recognized institutions,
              including DTU, Harvard University, Fraunhofer and IMEC,
              delivering advanced thermal management and power
              integration solutions.
            </p>

            <a
              href="https://www.lotus-microsystems.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="lotus-btn"
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

export default LotusIntro;