import "./HullOptimization.css";

import { CheckCircle2 } from "lucide-react";

import hull1 from "../../assets/images/services/hull/hull1.webp"

const features = [
    "CFD-Based Hull Analysis",
    "Wave Resistance Reduction",
    "Viscous Resistance Optimization",
    "Propulsive Efficiency Enhancement",
];

function HullOptimization() {
    return (
        <section className="service-section">

            <div className="container">

                <div className="service-grid">

                    {/* Image */}

                    <div className="service-image">

                        <div className="image-card">

                            <img
                                src={hull1}
                                alt="Hull Form Optimization"
                            />

                        </div>

                    </div>

                    {/* Content */}

                    <div className="service-content">

                        <span className="service-badge">
                            CFD SERVICE
                        </span>

                        <h2>
                            Hull Form Optimization
                        </h2>

                        <p>
                            SandebTech, together with our engineering partners,
                            delivers advanced CFD-based hull form optimization
                            supported by extensive expertise in Naval Architecture,
                            Hydrodynamics and Computational Fluid Dynamics.
                        </p>

                        <p>
                            Our optimization process focuses on minimizing
                            wave-making and viscous resistance while maximizing
                            propulsive efficiency, helping improve overall vessel
                            performance, fuel economy and operational efficiency.
                        </p>

                        <div className="service-features">

                            {features.map((feature) => (

                                <div
                                    key={feature}
                                    className="feature"
                                >

                                    <CheckCircle2 size={18} />

                                    <span>{feature}</span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default HullOptimization;