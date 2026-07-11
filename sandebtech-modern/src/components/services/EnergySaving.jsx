import "./EnergySaving.css";

import { CheckCircle2 } from "lucide-react";

import energy from "../../assets/images/services/energy/energy.webp"

const features = [
  "SHIPFLOW Simulation",
  "Model Scale Analysis",
  "Full Scale Analysis",
  "Self-Propelled Conditions",
];

function EnergySaving() {
  return (
    <section className="energy-section">

      <div className="container">

        <div className="energy-grid">

          {/* Content */}

          <div className="energy-content">

            <span className="service-badge">
              CFD SERVICE
            </span>

            <h2>
              Energy Saving Devices Optimization
            </h2>

            <p>
              Energy Saving Devices (ESDs) require highly accurate
              simulations and detailed hydrodynamic analysis.
              Using SHIPFLOW, we evaluate device performance under
              self-propelled conditions at both model and full scale.
            </p>

            <p>
              Our CFD-based approach enables the optimization of ESDs,
              improving propulsion efficiency while reducing energy
              losses and enhancing overall vessel performance.
            </p>

            <div className="service-features">

              {features.map((feature) => (

                <div
                  key={feature}
                  className="feature"
                >
                  <CheckCircle2 size={18} />

                  <span>{feature}</span>

                </div>

              ))}

            </div>

          </div>

          {/* Image */}

          <div className="service-image">

            <div className="image-card">

              <img
                src={energy}
                alt="Energy Saving Devices Optimization"
              />

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default EnergySaving;