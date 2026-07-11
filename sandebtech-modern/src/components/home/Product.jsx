import "./Products.css";
import { ArrowRight } from "lucide-react";

import panel from "../../assets/images/products/panel.webp";
import automation from "../../assets/images/products/automation.webp";
import electrical from "../../assets/images/products/electrical.webp";
import industry from "../../assets/images/products/industry.webp";

const products = [
  {
    id: 1,
    image: panel,
    title: "Control Panels",
    desc: "Custom PCC, MCC and PLC panels engineered for industrial applications."
  },
  {
    id: 2,
    image: automation,
    title: "Automation Systems",
    desc: "Complete PLC, SCADA and process automation solutions."
  },
  {
    id: 3,
    image: electrical,
    title: "Electrical Equipment",
    desc: "Reliable electrical products and engineered power distribution solutions."
  },
  {
    id: 4,
    image: industry,
    title: "Industrial Solutions",
    desc: "End-to-end engineering solutions for modern manufacturing industries."
  }
];

function Products() {
  return (
    <section className="products">

      <div className="container">

        <div className="products-heading">

          <span>OUR PRODUCTS</span>

          <h2>
            Innovative Products
            <br />
            Built For Industry
          </h2>

          <p>
            Delivering dependable products that improve
            efficiency, productivity and operational safety.
          </p>

        </div>

        <div className="products-grid">

          {products.map((item) => (

            <div
              className="product-card"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="product-content">

                <h3>{item.title}</h3>

                <p>{item.desc}</p>

                <button>

                  Explore

                  <ArrowRight size={18} />

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Products;