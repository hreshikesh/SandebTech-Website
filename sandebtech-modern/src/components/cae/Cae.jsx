import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Cpu, ShieldCheck } from "lucide-react";
import PageBanner from "../common/PageBanner";
import PageTransition from "../PageTransition/PageTransition";
import cae from "../../assets/images/solutions/cae.webp";
import "./Cae.css";

export default function CloudCaeSolutions() {
    const navigate = useNavigate();

    return (
        <>
            <PageTransition />

            {/* Page Banner Component */}
            <PageBanner
                title="Cloud CAE Solutions"
                subtitle="High-Performance Multi-Physics Simulation in the Cloud"
            />

            {/* Main Solutions Section */}
            <section className="cae-solutions">
                <div className="container">
                    <div className="cae-row">

                        {/* Left Column: Image Container */}
                        <div className="cae-image">
                            <img
                                src={cae}
                                alt="Cloud CAE Simulation Interface with CFD & FEA multi-physics analysis"
                            />
                        </div>

                        {/* Right Column: Content */}
                        <div className="cae-content">
                            <span className="cae-badge">
                                ⚡ Engineering Infrastructure Redefined
                            </span>

                            <h3>
                                Democratizing High-Performance Simulation for Modern Engineering
                            </h3>

                            <p>
                                Cloud Computer-Aided Engineering (CAE) eliminates traditional
                                local hardware bottlenecks by shifting intensive Finite Element
                                Analysis (FEA) and Computational Fluid Dynamics (CFD) workloads from
                                high-cost local workstations to elastic High-Performance
                                Computing (HPC) cloud infrastructure. By deploying multi-physics
                                solvers on demand across scalable GPU and CPU clusters, engineering
                                teams can execute mesh generation, thermal stress testing, and
                                fluid-structure interactions concurrently—slashing solve times by up
                                to <strong>70%</strong>.
                            </p>

                            <p>
                                Beyond speed, cloud-native CAE offers web-based zero-footprint
                                visualization, end-to-end SOC 2 encryption, and dynamic
                                pay-per-use scaling, enabling agile product development teams to
                                iterate faster, lower enterprise licensing overhead, and reduce
                                physical prototyping cycles before manufacturing.
                            </p>

                            {/* Feature Highlights Grid */}
                            <div className="cae-features">
                                <div className="cae-feature-item">
                                    <Cpu size={20} className="feature-icon" />
                                    <span>Elastic HPC Cluster Scaling</span>
                                </div>
                                <div className="cae-feature-item">
                                    <ShieldCheck size={20} className="feature-icon" />
                                    <span>Enterprise SOC 2 Security</span>
                                </div>
                            </div>

                            {/* Action Button Link */}
                            <div className="cae-action">
                                <button
                                    type="button"
                                    className="case-link"
                                    onClick={() =>
                                        navigate("/contact", {
                                            state: {
                                                subject: "Cloud CAE Workspace Access Request",
                                                message:
                                                    "Hi, I am interested in launching a Cloud CAE Workspace. Please get in touch with me regarding HPC setup and licensing options.",
                                            },
                                        })
                                    }
                                >
                                    <span>Launch Cloud CAE Workspace</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}