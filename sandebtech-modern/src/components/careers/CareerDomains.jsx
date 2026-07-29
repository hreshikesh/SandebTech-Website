import "./CareerDomains.css";
import {
  Ship,
  Cog,
  Flame,
  Cpu,
  ArrowRight,
} from "lucide-react";

const careers = [
  {
    icon: Ship,
    title: "Maritime Engineering",
    description:
      "Work on advanced CFD simulations, hydrodynamic optimization, naval architecture, and ship performance analysis for global marine projects.",
    skills: [
      "CFD",
      "Hydrodynamics",
      "Hull Optimization",
      "Naval Architecture",
    ],
  },
  {
    icon: Cog,
    title: "Turbomachinery",
    description:
      "Design and optimize pumps, compressors, turbines, fans, and rotating machinery using advanced engineering simulation tools.",
    skills: [
      "Pumps",
      "Compressors",
      "Turbines",
      "Rotating Equipment",
    ],
  },
  {
    icon: Flame,
    title: "HVAC & Fire Safety",
    description:
      "Develop HVAC airflow solutions, smoke management studies, thermal simulations, and fire safety engineering systems.",
    skills: [
      "HVAC",
      "Fire Safety",
      "Thermal Analysis",
      "Smoke Simulation",
    ],
  },
  {
    icon: Cpu,
    title: "Electronic Cooling",
    description:
      "Engineer advanced thermal management solutions for electronics, batteries, and high-performance systems.",
    skills: [
      "Battery Cooling",
      "Electronics Cooling",
      "Heat Transfer",
      "Thermal Management",
    ],
  },
];

function CareerDomains() {
  return (
    <section className="career-domains">
      <div className="container">
        <div className="career-header">
          <span className="section-tag">
            Join Our Team
          </span>

          <h2>
            Careers at <span>SandebTech</span>
          </h2>

          <p>
            Join a multidisciplinary engineering team delivering
            innovative CFD, marine, thermal, and industrial
            engineering solutions for clients across the globe.
          </p>
        </div>

        <div className="career-grid">
          {careers.map((career, index) => {
            const Icon = career.icon;

            return (
              <div className="career-card" key={index}>
                <div className="career-icon">
                  <Icon size={34} />
                </div>

                <h3>{career.title}</h3>

                <p>{career.description}</p>

                <div className="career-skills">
                  {career.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <div className="career-footer">
                  <span>Apply Below</span>

                  <ArrowRight size={18} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CareerDomains;