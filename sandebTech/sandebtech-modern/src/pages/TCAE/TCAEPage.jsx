import React from "react";
import PageBanner from "../../components/common/PageBanner";
import logo from "../../assets/images/tcae/tcaelogo.webp"
import tcae from "../../assets/images/tcae/tcae.webp"
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../../components/seo/SEO";
import {
    Layers,
    Zap,
    Code2,
    Award,
    Target,
    BookOpen,
    DollarSign,
    Infinity,
    Cloud,
    Sliders,
    FileBarChart,
    GraduationCap,
    ShieldCheck,
    CheckCircle2,
    ExternalLink,
    Cpu,
    Workflow,
    Sparkles,
} from "lucide-react";
import "./TCAEPage.css";

// Why TCAE? Data Matrix
const whyTcaeData = [
    {
        id: 1,
        strength: "Integrated Multi-Physics",
        meansForYou: "One continuous, unified workflow combining CFD, FEA, FSI, and Acoustics without switching tools.",
        icon: Layers,
        tag: "Multi-Physics",
    },
    {
        id: 2,
        strength: "Automated & Optimization Ready",
        meansForYou: "Run thousands of design iterations effortlessly with parameter control and full extendability.",
        icon: Zap,
        tag: "Automation",
    },
    {
        id: 3,
        strength: "Open Source Core & Transparency",
        meansForYou: "Built transparently on proven open-source engines with over 50+ man-years of commercial refinement.",
        icon: Code2,
        tag: "Open Architecture",
    },
    {
        id: 4,
        strength: "Industrially Proven Solutions",
        meansForYou: "Validated across hundreds of complex industrial engineering and turbomachinery projects globally.",
        icon: Award,
        tag: "Industry Standard",
    },
    {
        id: 5,
        strength: "Scientifically Exact & Benchmark-Tested",
        meansForYou: "Simulation treated as an exact science, backed by fully published validation datasets.",
        icon: Target,
        tag: "Validated",
    },
    {
        id: 6,
        strength: "Direct Knowledge Transfer",
        meansForYou: "Direct access to senior CFD developers, direct technical training, and responsive support.",
        icon: BookOpen,
        tag: "Support Network",
    },
    {
        id: 7,
        strength: "High-ROI Commercial Model",
        meansForYou: "Transparent flat-fee pricing with zero per-core fees or hardware licensing locks.",
        icon: DollarSign,
        tag: "ROI Focused",
    },
];

const keyCapabilities = [
    {
        id: "unlimited",
        title: "Unlimited Hardware Scalability",
        badge: "License Model",
        description:
            "One fixed license price covers unlimited users, simultaneous jobs, CPU cores, and hardware installations.",
        icon: Infinity,
        highlights: ["Unlimited Cores", "Unlimited Users", "Zero Per-Core Traps"],
    },
    {
        id: "accuracy",
        title: "Tailored Solver Accuracy",
        badge: "Simulation",
        description:
            "Engineered for high precision in turbomachinery, aerodynamics, and thermal physics. Benchmark data fully transparent.",
        icon: Target,
        highlights: ["Public Benchmarks", "High Precision", "Custom Tailored"],
    },
    {
        id: "open-source",
        title: "Commercial Open Source Engine",
        badge: "Architecture",
        description:
            "Combines OpenFOAM® solver versatility with a modern desktop GUI, automated workflows, and dedicated QA support.",
        icon: Code2,
        highlights: ["Modern GUI", "50+ Man-Years Dev", "Full Code Control"],
    },
    {
        id: "cloud-ready",
        title: "HPC & Cloud Native",
        badge: "Deployment",
        description:
            "Runs natively on Linux & Windows. Supports batch non-interactive scripts and seamless GeoCloud HPC scaling.",
        icon: Cloud,
        highlights: ["Windows & Linux", "GeoCloud HPC", "Batch Automation"],
    },
    {
        id: "automation",
        title: "Smart Meshing Engine",
        badge: "Workflow",
        description:
            "Automated mesh generation with built-in snappyHexMesh and Netgen, or direct imports from external CAD tools.",
        icon: Sliders,
        highlights: ["snappyHexMesh & Netgen", "Auto-mesh", "CAD Imports"],
    },
    {
        id: "postprocessing",
        title: "Automated Executive Reporting",
        badge: "Analytics",
        description:
            "Auto-generates interactive HTML & PDF reports, high-res ParaView field visualization, and direct CSV exports.",
        icon: FileBarChart,
        highlights: ["Auto HTML/PDF Reports", "ParaView Integration", "Raw CSV Data"],
    },
    {
        id: "knowhow",
        title: "Expert Technical Support",
        badge: "Expertise",
        description:
            "Direct technical assistance, case study libraries, and engineering training straight from the developers.",
        icon: GraduationCap,
        highlights: ["Direct Tech Support", "Real Case Studies", "Interactive Training"],
    },
];

function TCAEPage() {
    const navigate = useNavigate();

    const handleInquiryNavigation = () => {
        navigate("/contact", {
            state: {
                subject: "Inquiry Regarding TCAE CFD & FEA Simulation Solutions",
                message:
                    "Hello, I would like to request more information regarding TCAE simulation capabilities for multi-physics CFD and FEA workflows. Please contact me with licensing, technical details, and potential consultation options.",
            },
        });
    };
    return (
        <>
            <SEO
                title="TCAE | Turbomachinery CFD & FEA Simulation Environment"
                description="TCAE provides an automated CFD/FEA simulation environment designed specifically for pumps, turbines, fans, and compressors."
                keywords="TCAE, Turbomachinery Simulation, Pump CFD, Turbine Simulation, Fan CFD, Automated CAE Environment"
                url="https://sandebtech.com/solutions/tcae"
            />
            {/* Banner */}
            <PageBanner
                title="CFD Software - TCAE®"
                subtitle="Next-generation simulation environment integrating CFD, FEA, FSI, and Acoustics into an automated workflow"
            />

            <div className="tcae-page">
                {/* Quick Header / Stats */}
                <section className="tcae-intro-bar">
                    <div className="tcae-container tcae-intro-content">
                        <div className="tcae-brand-badge">
                            <span className="brand-pill">
                                <ShieldCheck size={14} /> Powered by CFD Support
                            </span>
                            <a
                                href="https://www.cfdsupport.com/tcae"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="brand-link"
                            >
                                www.cfdsupport.com <ExternalLink size={12} />
                            </a>
                        </div>

                        <div className="tcae-hero-stats">
                            <div className="stat-item">
                                <span className="stat-num">50+</span>
                                <span className="stat-label">Man-Years Dev</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-num">100s</span>
                                <span className="stat-label">Projects Delivered</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-num">100%</span>
                                <span className="stat-label">Unlimited Cores</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= SECTION 1: WHY TCAE? ================= */}
                <section id="why-tcae" className="tcae-section">
                    <div className="tcae-container">
                        <div className="tcae-section-header text-center">
                            <span className="section-subtitle">
                                <Sparkles size={14} /> Comparative Advantage
                            </span>
                            <h2>Why Choose TCAE?</h2>
                            <p>
                                Bridging HPC-grade computational power with zero-restriction licensing, transparent scientific accuracy, and streamlined execution.
                            </p>
                        </div>

                        {/* Visual Feature Showcase Card - Image 1 */}
                        <div className="tcae-showcase-card">
                            <div className="showcase-content">
                                <span className="showcase-tag">Unified Multi-Physics Workspace</span>
                                <h3>One GUI for CFD, FEA, FSI & Aeroacoustics</h3>
                                <p>
                                    TCAE eliminates complex multi-software setups by combining fluid flow, structural integrity, fluid-structure interaction, and sound emission analyses into one seamless interface.
                                </p>
                                <ul className="showcase-list">
                                    <li><CheckCircle2 size={16} /> Automated mesh coupling between solvers</li>
                                    <li><CheckCircle2 size={16} /> Real-time convergence and field monitoring</li>
                                    <li><CheckCircle2 size={16} /> Parametric multi-case optimization</li>
                                </ul>
                            </div>
                            <div className="showcase-media">
                                <div className="media-frame">
                                    <img
                                        src={logo}
                                        alt="TCAE Multi-Physics Interface - Centrifugal Pump Simulation"
                                        loading="lazy"
                                    />
                                    <div className="media-overlay-badge">
                                        <Workflow size={14} /> Multi-Physics Workbench
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Matrix Grid */}
                        <div className="why-tcae-grid">
                            {whyTcaeData.map((item) => {
                                const IconComp = item.icon;
                                return (
                                    <div key={item.id} className="why-tcae-card">
                                        <div className="why-card-header">
                                            <div className="why-icon-box">
                                                <IconComp size={20} />
                                            </div>
                                            <div>
                                                <span className="why-tag">{item.tag}</span>
                                                <h3 className="why-title">{item.strength}</h3>
                                            </div>
                                        </div>

                                        <div className="why-card-body">
                                            <span className="benefit-label">What It Means for You</span>
                                            <p className="benefit-text">{item.meansForYou}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ================= SECTION 2: KEY CAPABILITIES ================= */}
                <section id="capabilities" className="tcae-section tcae-bg-alt">
                    <div className="tcae-container">
                        <div className="tcae-section-header text-center">
                            <span className="section-subtitle">
                                <Cpu size={14} /> Engine Power
                            </span>
                            <h2>Key Capabilities</h2>
                            <p>
                                Engineered to eliminate technical bottlenecks, hardware throttling, and restrictive licensing traps from engineering simulation.
                            </p>
                        </div>

                        {/* Capabilities Hero Visual - Image 2 */}
                        <div className="capabilities-visual-banner">
                            <div className="banner-image-container">
                                <img
                                    src={tcae}
                                    alt="TCAE GUI Aerodynamic & Convergence Analysis"
                                    loading="lazy"
                                />
                                <div className="banner-glass-caption">
                                    <h4>High-Precision Aerodynamic & Field Post-Processing</h4>
                                    <p>Integrated surface mesh visualization, streamline tracking, residual convergence plots, and pressure mapping in real time.</p>
                                </div>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="capabilities-grid">
                            {keyCapabilities.map((cap) => {
                                const IconComp = cap.icon;
                                return (
                                    <div key={cap.id} className="capability-card">
                                        <div className="cap-top">
                                            <div className="cap-icon-wrapper">
                                                <IconComp size={22} />
                                            </div>
                                            <span className="cap-badge">{cap.badge}</span>
                                        </div>

                                        <h3 className="cap-title">{cap.title}</h3>
                                        <p className="cap-desc">{cap.description}</p>

                                        <div className="cap-highlights">
                                            {cap.highlights.map((point, idx) => (
                                                <div key={idx} className="cap-point">
                                                    <CheckCircle2 size={14} className="point-icon" />
                                                    <span>{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="tcae-cta-section">
                    <div className="tcae-container">
                        <div className="tcae-cta-card">
                            <h2>Ready to Elevate Your Engineering Simulations?</h2>
                            <p>
                                Experience transparent, scientifically validated multi-physics CFD & FEA without hardware limits or license traps.
                            </p>
                            <div className="cta-buttons">
                                <button
                                    onClick={handleInquiryNavigation}
                                    className="tcae-btn primary white-btn"
                                    type="button"
                                >
                                    <span>Get Started with TCAE</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default TCAEPage;