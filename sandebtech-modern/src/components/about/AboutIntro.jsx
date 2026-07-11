import "./AboutIntro.css";
import { CheckCircle2 } from "lucide-react";

import companyImage from "../../assets/images/about/about2.webp"

const features = [
  "Engineering Consulting",
  "Industrial Automation",
  "Electrical Engineering",
  "Innovation & Integrity",
];

function AboutIntro() {
  return (
    <section className="about-intro">
      <div className="container">

        <div className="about-grid">

          {/* Left */}

          <div className="about-image">

            <img
              src={companyImage}
              alt="SandebTech"
            />

          </div>

          {/* Right */}

          <div className="about-content">

            <span>ABOUT SANDEBTECH</span>

            <h2>
              Engineering Excellence
              Since 2014
            </h2>

            <p>
              SandebTech is a dynamic and forward-thinking engineering
              consulting firm with a rich history of delivering
              exceptional results. Established in 2014, we have
              consistently demonstrated our commitment to excellence,
              integrity and innovation.
            </p>

            <p>
              Our multidisciplinary team comprises experienced engineers,
              data analysts and project managers who collaborate to
              deliver practical, reliable and innovative engineering
              solutions across diverse industries.
            </p>

            <div className="feature-grid">

              {features.map((item) => (

                <div
                  key={item}
                  className="feature-item"
                >
                  <CheckCircle2 size={20} />

                  <span>{item}</span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutIntro;