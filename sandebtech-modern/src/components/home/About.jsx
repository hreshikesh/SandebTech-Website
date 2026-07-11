import "./About.css";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import aboutImage from "../../assets/images/about/about1.webp";

const features = [
  "Electrical Engineering Solutions",
  "Industrial Automation Systems",
  "PLC & SCADA Integration",
  "Control Panel Design & Manufacturing",
];

function About() {
  return (
    <section className="about">

      <div className="container about-container">

        <div className="about-image">

          <img
            src={aboutImage}
            alt="About SandebTech"
          />

        </div>

        <div className="about-content">

          <span className="section-tag">
            ABOUT SANDEBTECH
          </span>

          <h2>
            Engineering Solutions Built
            Around Quality & Innovation
          </h2>

          <p>
            SandebTech delivers reliable engineering,
            electrical and industrial automation solutions
            designed to improve efficiency, productivity and
            long-term operational performance across industries.
          </p>

          <div className="about-features">

            {features.map((item) => (
              <div key={item} className="feature">

                <CheckCircle2 size={20} />

                <span>{item}</span>

              </div>
            ))}

          </div>

          <Link
            to="/about"
            className="about-btn"
          >
            Learn More
          </Link>

        </div>

      </div>

    </section>
  );
}

export default About;