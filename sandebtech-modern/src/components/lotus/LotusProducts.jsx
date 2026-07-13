import "./LotusProducts.css";

import { Check, ArrowUpRight } from "lucide-react";

import ltgImg from "../../assets/images/lotus/products/ltg.webp";
import lmuImg from "../../assets/images/lotus/products/lmu20p1.webp";
import lbkImg from "../../assets/images/lotus/products/lbk0504.webp";

import ProtectedAction from "../auth/ProtectedAction";


const openProduct = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};


const products = [
  {
    title: "LTG Family",
    image: ltgImg,
    features: [
      "Advanced Thermal Management",
      "Integrated Power Modules",
      "High Power Density",
      "Optimized System Efficiency",
    ],
    link: "https://www.lotus-microsystems.com/thermal-management",
  },

  {
    title: "LMU20P1",
    image: lmuImg,
    features: [
      "Integrated Power Module",
      "Compact Package Design",
      "High Conversion Efficiency",
      "Reliable Thermal Performance",
    ],
    link: "https://www.lotus-microsystems.com/products/lmu20p1",
  },

  {
    title: "LBK0504",
    image: lbkImg,
    features: [
      "Compact Buck Converter",
      "Stable Output Performance",
      "Low Power Loss",
      "Designed for Embedded Applications",
    ],
    link: "https://www.lotus-microsystems.com/products/lbk0504",
  },
];

function LotusProducts() {
  return (
    <section className="lotus-products">

      <div className="container">

        <div className="section-title">

          <span>PRODUCT PORTFOLIO</span>

          <h2>
            Integrated Power Solutions
          </h2>

          <p>
            Explore Lotus Microsystems' innovative product portfolio
            engineered to deliver compact, efficient and reliable
            power management solutions.
          </p>

        </div>

        <div className="lotus-product-grid">

          {products.map((product) => (

            <div
              key={product.title}
              className="lotus-card"
            >

              <div className="lotus-card-image">

                <img
                  src={product.image}
                  alt={product.title}
                />

              </div>

              <div className="lotus-card-content">

                <h3>{product.title}</h3>

                <ul>

                  {product.features.map((feature) => (

                    <li key={feature}>

                      <Check size={18} />

                      {feature}

                    </li>

                  ))}

                </ul>


                <ProtectedAction
                  action={() => openProduct(product.link)}
                >
                  <button className="lotus-link">

                    Visit Product

                    <ArrowUpRight size={18} />

                  </button>
                </ProtectedAction>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default LotusProducts;