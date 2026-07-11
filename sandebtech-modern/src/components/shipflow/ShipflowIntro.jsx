import "./ShipflowIntro.css";

import intro1 from "../../assets/images/shipflow/intro1.webp";
import intro2 from "../../assets/images/shipflow/intro2.webp";
import intro3 from "../../assets/images/shipflow/intro3.webp";

function ShipflowIntro() {
  return (
    <section className="shipflow-intro">

      <div className="container">

        <div className="shipflow-grid">

          {/* Left */}

          <div className="shipflow-content">

            <span className="section-badge">
              CFD SOFTWARE
            </span>

            <h2>
              SHIPFLOW from FLOWTECH International AB, Sweden
            </h2>

            <p>
              SHIPFLOW is an advanced Computational Fluid Dynamics
              (CFD) software suite developed by FLOWTECH
              International AB, Sweden. It is the result of
              long-term research carried out in close cooperation
              with SSPA and the Department of Naval Architecture at
              Chalmers University of Technology.
            </p>

            <p>
              The software provides highly accurate hydrodynamic
              simulations for ship design, optimization and
              performance prediction, enabling naval architects and
              marine engineers to make informed design decisions
              throughout the development process.
            </p>

          </div>

          {/* Right */}

          <div className="shipflow-gallery">

            <img
              src={intro1}
              alt="SHIPFLOW Software"
              className="gallery-large"
            />

            <div className="gallery-small">

              <img
                src={intro2}
                alt="SHIPFLOW Simulation"
              />

              <img
                src={intro3}
                alt="SHIPFLOW CFD"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ShipflowIntro;