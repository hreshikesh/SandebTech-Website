import "./ProductSuite.css";

import { ExternalLink } from "lucide-react";



const openProduct = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const products = [
  {
    title: "SHIPFLOW Basic",
    description:
      "Entry-level CFD solution for rapid resistance prediction and flow analysis during the early stages of ship design.",
    link: "https://shipflow.se/shipflow-basic/",
  },
  {
    title: "SHIPFLOW RANS",
    description:
      "Advanced Reynolds-Averaged Navier–Stokes (RANS) solver for accurate viscous flow, wake prediction and propulsion analysis.",
    link: "https://shipflow.se/shipflow-rans/",
  },
  {
    title: "SHIPFLOW Motions",
    description:
      "Predict ship motions and added resistance in waves using the integrated SHIPFLOW MOTIONS solver.",
    link: "https://shipflow.se/shipflow-motions/",
  },
  {
    title: "SHIPFLOW Design Advanced",
    description:
      "Comprehensive design environment for hull optimization, CFD analysis and performance improvement.",
    link: "https://shipflow.se/products/shipflow-design-advanced/",
  },
];

function ProductSuite() {
  return (
    <section className="product-suite">

      <div className="container">

        <div className="section-title">

          <span>PRODUCT SUITE</span>

          <h2>
            CFD Software for Ship Design
          </h2>

          <p>
            SHIPFLOW offers a comprehensive suite of CFD tools that
            support naval architects and marine engineers throughout
            the complete ship design and optimization process.
          </p>

        </div>

        <div className="product-grid">

          {products.map((product) => (

            <div
              key={product.title}
              className="product-card"
            >

              <h3>{product.title}</h3>

              <p>{product.description}</p>

            
                
              
                <button className="product-link" onClick={() => openProduct(product.link)}>

                  Visit Official Page

                  <ExternalLink size={18} />

                </button>
       
            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default ProductSuite;