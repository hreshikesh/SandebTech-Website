import "./Products.css";
import { TrendingUp, Lightbulb, Coins } from "lucide-react";

const benefits = [
  {
    id: 1,
    icon: TrendingUp,
    title: "Productivity Gains",
    desc: "Automation of sectors, diffusion of simulation within the company. Acceleration of validation cycles and decision-making."
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "Innovative Solutions",
    desc: "Specialized solutions, with high technical content, flexible and complementary to market standards."
  },
  {
    id: 3,
    icon: Coins,
    title: "Cost Reduction",
    desc: "Reduction in the number of prototypes and physical tests, improvement in product quality."
  }
];

function Products() {
  return (
    <section className="products">
      <div className="container">
        <div className="products-heading">
          <span>OUR VALUE PROPOSITION</span>

          <h2>
            Driving Efficiency &
            <br />
            Engineering Innovation
          </h2>

          <p>
            Delivering measurable performance gains, cost efficiency, and high-precision technical solutions for complex engineering challenges.
          </p>
        </div>

        <div className="products-grid">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div className="product-card" key={item.id}>
                <div className="card-icon-box">
                  <Icon size={28} />
                </div>

                <div className="product-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Products;