import { useRef } from "react";
import "./About.css";
import { Link } from "react-router-dom";
import aboutImage from "../../assets/images/logo/logo2.webp";

function About() {
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = imageRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!imageRef.current) return;

    imageRef.current.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section className="about">
      <div className="container about-container">

        <div
          className="about-image-wrapper"
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="image-backdrop"></div>

          <div className="about-image">
            <img
              src={aboutImage}
              alt="About SandebTech"
            />
          </div>
        </div>

        <div className="about-content">
          <span className="section-tag">
            ABOUT SANDEBTECH
          </span>

          <h2>
            Engineering Solutions Built Around Quality & Innovation
          </h2>

          <p>
            Sandebtech is a dynamic and forward-thinking engineering consulting
            firm with a rich history of delivering exceptional results.
            Established in 2014, we have consistently demonstrated our
            commitment to excellence, integrity, and innovation. Our team
            comprises engineers, data analysts, and project managers who work
            collaboratively to provide comprehensive solutions across various
            sectors.
          </p>

          <Link to="/about" className="about-btn">
            Learn More
          </Link>
        </div>

      </div>
    </section>
  );
}

export default About;