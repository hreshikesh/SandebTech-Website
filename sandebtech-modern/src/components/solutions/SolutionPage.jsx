import "./SolutionPage.css";

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import shipflowImg from "../../assets/images/solutions/shipflow.webp";
import caesesImg from "../../assets/images/solutions/caeses.webp";
import turboImg from "../../assets/images/solutions/turbomachinery.webp";
import lotusImg from "../../assets/images/solutions/lotus.webp";

const solutionsData = [
  {
    id: 1,
    title: "Shipflow CFD Service",
    image: shipflowImg,
    link: "/solutions/shipflow-cfd",
  },
  {
    id: 2,
    title: "CAESES",
    image: caesesImg,
    link: "/solutions/caeses",
  },
  {
    id: 3,
    title: "Turbomachinery",
    image: turboImg,
    link: "/solutions/turbomachinery",
  },
  {
    id: 4,
    title: "Lotus Marine",
    image: lotusImg,
    link: "/solutions/lotus-marine",
  },
];

function Solutions() {
  return (
    <section className="solutions-section">

      <div className="container">

        <div className="solutions-header">

          <span>WHAT WE OFFER</span>

          <h2>Advanced Engineering Solutions</h2>

          <p>
            Explore our specialized engineering solutions designed
            to improve hydrodynamic performance, automate design
            workflows and deliver accurate CFD simulations for
            marine and industrial applications.
          </p>

        </div>

        <div className="solutions-grid">

          {solutionsData.map((solution) => (

            <div
              className="solution-medium-card"
              key={solution.id}
            >

              <div className="sol-card-image">

                <img
                  src={solution.image}
                  alt={solution.title}
                />

              </div>

              <div className="sol-card-content">

                <h3>{solution.title}</h3>

                <Link
                  to={solution.link}
                  className="sol-details-link"
                >
                  Learn More

                  <ArrowUpRight size={16} />

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Solutions;