import "./SolutionPage.css";

import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import shipflowImg from "../../assets/images/logo/shipflowlogo.webp";
import caesesImg from "../../assets/images/logo/caeseslogo.webp";
import turboImg from "../../assets/images/solutions/turbomachinery.webp";
import lotusImg from "../../assets/images/solutions/lotus.webp";
import tcaeImg from "../../assets/images/tcae/tcae.webp"
import havc from "../../assets/images/logo/aerosimlogo.webp";
import cloudeCae from "../../assets/images/solutions/cae.webp";
import tcae from "../../assets/images/tcae/tcaelogo.webp";
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
    title: "AeroSim",
    image: havc,
    link: "/solutions/aerosim",
  },
  {
    id: 4,
    title: "Lotus Marine",
    image: lotusImg,
    link: "/solutions/lotus-micro",
  },
  {
    id: 5,
    title: "TCAE",
    image: tcae,
    link: "/solutions/tcae",

  },
   {
    id: 6,
    title: "Cloud CAE",
    image: cloudeCae,
    link: "/solutions/cloud-cae",

  }
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