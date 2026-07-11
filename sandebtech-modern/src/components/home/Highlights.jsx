import "./Highlights.css";
import {
  Cpu,
  Zap,
  ShieldCheck,
  Settings,
} from "lucide-react";

const items = [
  {
    id: 1,
    icon: <Zap size={34} />,
    title: "Electrical Engineering",
    desc: "Reliable electrical engineering solutions for industrial and commercial applications.",
  },
  {
    id: 2,
    icon: <Cpu size={34} />,
    title: "Industrial Automation",
    desc: "Automation systems designed to improve productivity and operational efficiency.",
  },
  {
    id: 3,
    icon: <Settings size={34} />,
    title: "Control Panels",
    desc: "Custom-built control panels designed to meet industry standards.",
  },
  {
    id: 4,
    icon: <ShieldCheck size={34} />,
    title: "Quality & Safety",
    desc: "Committed to delivering reliable, safe and high-quality engineering solutions.",
  },
];

function Highlights() {
  return (
    <section className="highlights">

      <div className="container">

        <div className="section-head">

          <span>OUR EXPERTISE</span>

          <h2>
            Engineering Solutions Built
            <br />
            Around Your Business
          </h2>

          <p>
            Delivering dependable engineering services with
            innovation, precision and long-term reliability.
          </p>

        </div>

        <div className="highlight-grid">

          {items.map((item) => (

            <div
              className="highlight-card"
              key={item.id}
            >

              <div className="highlight-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Highlights;