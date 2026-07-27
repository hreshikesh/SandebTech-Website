import "./Applications.css";

import { ArrowUpRight } from "lucide-react";

import hullImg from "../../assets/images/shipflow/applications/hull.webp";
import bulbImg from "../../assets/images/shipflow/applications/bulb.webp";
import aftbodyImg from "../../assets/images/shipflow/applications/aftbody.webp";



const openProduct = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};


const applications = [
  {
    id: 1,
    title: "Hull Optimization with Lackenby",
    image: hullImg,
    description:
      "Hull form designers constantly seek to improve hydrodynamic performance by refining hull geometry. SHIPFLOW enables efficient hull optimization through Cp curve variation based on the Lackenby shift, allowing designers to evaluate resistance characteristics during the early design stage.",
    link: "https://shipflow.se/cases/hull-optimization-with-lackenby",
  },
  {
    id: 2,
    title: "Bulb Shape Optimization for Wave Resistance",
    image: bulbImg,
    description:
      "The bulbous bow plays a significant role in reducing wave and viscous resistance. SHIPFLOW assists designers in optimizing bulb geometry, volume and location, enabling improved hydrodynamic efficiency and lower resistance for various ship types.",
    link: "https://shipflow.se/cases/bulb-shape-optimization",
  },
  {
    id: 3,
    title: "Improvement of Aftbody Hull Form",
    image: aftbodyImg,
    description:
      "SHIPFLOW supports aftbody optimization by evaluating wake quality together with resistance performance. This allows naval architects to balance propulsion efficiency and flow characteristics, resulting in improved overall vessel performance.",
    link: "https://shipflow.se/cases/improvement-of-aftbody-hull-form",
  },
];

function Applications() {
  return (
    <section className="applications">

      <div className="container">

        <div className="section-title">

          <span>APPLICATIONS</span>

          <h2>Real Engineering Applications</h2>

          <p>
            SHIPFLOW has been successfully applied to numerous
            hydrodynamic optimization projects, helping naval
            architects improve ship performance through advanced CFD
            simulations.
          </p>

        </div>

        {applications.map((app, index) => (

          <div
            key={app.id}
            className={`application-row ${
              index % 2 !== 0 ? "reverse" : ""
            }`}
          >

            <div className="application-image">

              <img
                src={app.image}
                alt={app.title}
              />

            </div>

            <div className="application-content">

              <h3>{app.title}</h3>

              <p>{app.description}</p>

        
                <button className="case-link" onClick={() => openProduct(app.link)}>

                  View Detailed Case Study

                   <ArrowUpRight size={18} />

                </button>
 

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Applications;