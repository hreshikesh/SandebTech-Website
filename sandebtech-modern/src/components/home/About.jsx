import "./About.css";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/images/about/about1.webp";

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
            Engineering Solutions Built Around Quality & Innovation
          </h2>

          <p>
            Sandebtech is a dynamic and forward-thinking engineering consulting firm 
            with a rich history of delivering exceptional results. Established in 2014, 
            we have consistently demonstrated our commitment to excellence, integrity, 
            and innovation. Our team comprises a diverse range of experts, including 
            engineers, data analysts, and project managers, who work collaboratively 
            to provide comprehensive thought-out solutions across various sectors.
          </p>

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