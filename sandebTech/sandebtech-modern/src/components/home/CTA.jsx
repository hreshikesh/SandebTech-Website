import "./CTA.css";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="cta">

      <div className="container">

        <div className="cta-box">

          <div className="cta-content">

            <span>LET'S WORK TOGETHER</span>

            <h2>
              Looking For Reliable
              Engineering Solutions?
            </h2>

            <p>
              Contact SandebTech today to discuss your
              engineering, automation and electrical
              project requirements.
            </p>

          </div>

          <Link
            to="/contact"
            className="cta-btn"
          >
            Contact Us
            <ArrowRight size={20} />
          </Link>

        </div>

      </div>

    </section>
  );
}

export default CTA;