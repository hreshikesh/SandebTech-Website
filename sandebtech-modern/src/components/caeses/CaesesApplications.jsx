import "./CaesesApplications.css";

import { ArrowUpRight } from "lucide-react";


import { applications } from "../../constants/applications";

import ProtectedAction from "../auth/ProtectedAction";


const openProduct = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};


function CaesesApplications() {
  return (
    <section className="caeses-applications">

      <div className="container">

        <div className="section-title">

          <span>APPLICATIONS</span>

          <h2>CAESES Industry Applications</h2>

          <p>
            Explore some of the major engineering domains where
            CAESES® delivers robust parametric modelling and
            simulation-driven optimization.
          </p>

        </div>

        {applications.map((app) => (

          <div
            key={app.title}
            className="application-box"
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

              <div className="sub-section">

                <h4>{app.subTitle}</h4>

                <div className="sub-grid">

                  {app.subItems.map((item, index) => (

                    <div
                      key={index}
                      className="sub-card"
                    >

                      <img
                        src={item.image}
                        alt=""
                      />



                      <ProtectedAction
                        action={() => openProduct(item.link)}
                      >
                        <button className="sub-link">

                          Learn More

                          <ArrowUpRight size={18} />

                        </button>
                      </ProtectedAction>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default CaesesApplications;