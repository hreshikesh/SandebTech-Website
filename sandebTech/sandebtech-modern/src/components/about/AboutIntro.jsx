import "./AboutIntro.css";
import { CheckCircle2 } from "lucide-react";

import companyImage from "../../assets/images/about/about2.webp"
import Logo2 from "../../assets/images/logo/logo1.webp"



function AboutIntro() {
  return (
    <section className="about-intro">
      <div className="container">

        <div className="about-grid">

          {/* Left */}

          <div className="about-image">

            <img
              src={Logo2}
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

            

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutIntro;