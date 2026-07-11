import "./WhyChoose.css";
import {
  Award,
  ShieldCheck,
  Clock3,
  Users,
} from "lucide-react";

const reasons = [
  {
    id: 1,
    icon: <Award size={36} />,
    title: "Quality Engineering",
    desc: "Every solution is designed and delivered with precision, reliability and adherence to industry standards.",
  },
  {
    id: 2,
    icon: <ShieldCheck size={36} />,
    title: "Safety First",
    desc: "Safety and compliance remain our highest priorities throughout every stage of every project.",
  },
  {
    id: 3,
    icon: <Clock3 size={36} />,
    title: "On-Time Delivery",
    desc: "Efficient project planning ensures timely execution without compromising quality.",
  },
  {
    id: 4,
    icon: <Users size={36} />,
    title: "Customer Focused",
    desc: "We work closely with every client to deliver practical engineering solutions tailored to their needs.",
  },
];

function WhyChoose() {
  return (
    <section className="why">

      <div className="container">

        <div className="why-header">

          <span>WHY CHOOSE US</span>

          <h2>
            Trusted Engineering Partner
            <br />
            For Modern Industries
          </h2>

        </div>

        <div className="why-grid">

          {reasons.map((item) => (

            <div
              className="why-card"
              key={item.id}
            >

              <div className="why-icon">
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

export default WhyChoose;