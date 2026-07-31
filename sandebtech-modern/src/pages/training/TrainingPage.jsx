import React, { useState } from "react";
import {
    Flame,
    Clock,
    Users,
    Award,
    MapPin,
    CheckCircle2,
    FileText,
    Eye,
    Download,
    ArrowUpRight,
    GraduationCap,
    Box,
    Thermometer,
    Wind,
    BarChart3,
    ClipboardCheck,
    UserCheck,
    Mail
} from "lucide-react";
import { modules } from "../../data/modules";
import { audience } from "../../data/modules";
// // Assets
import pyrosimImg from "../../assets/images/services/pyrosim.webp";
import trainingTemplatePdf from "../../assets/images/lotus/documents/PyroSim_Training.pdf";

// Components
import PdfViewerModal from "../../components/lotus/PdfViewerModal";
import "./TrainingPage.css";



const highlights = [
    { icon: Clock, value: "1 Day", label: "6 focused hours" },
    { icon: Users, value: "Max 12", label: "Capped class size" },
    { icon: MapPin, value: "In-person", label: "or fully virtual" },
    { icon: Award, value: "Certificate", label: "On completion" }
];

const outcomes = [
    "Confidence navigating the PyroSim interface and project workflow from start to finish",
    "The ability to build accurate 3D models — compartments, obstructions, vents, and mesh",
    "Practical skills for defining materials, fuel reactions, and heat release rates",
    "Know-how to configure detectors, sprinklers, and smoke control systems",
    "Techniques for visualizing and interpreting simulation results in Smokeview",
    "Real experience validating results against code criteria and design objectives"
];




const documents = [
    {
        id: "pyrosim-template",
        category: "Course Outline",
        title: "PyroSim Standard Training Template",
        description:
            "Full one-day agenda, module breakdown, prerequisites, and the deliverables every participant receives.",
        fileUrl: trainingTemplatePdf
    }
];

export default function TrainingPage() {
    const [activePdf, setActivePdf] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenPdf = (doc) => {
        setActivePdf(doc);
        setIsModalOpen(true);
    };

    const handleClosePdf = () => {
        setIsModalOpen(false);
        setActivePdf(null);
    };

    const handleDownloadPdf = (doc) => {
        const link = document.createElement("a");
        link.href = doc.fileUrl;
        link.download = `${doc.title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section className="training-page">
            <div className="container">
                {/* ---------------------------------------------------------------
            INTRO
           --------------------------------------------------------------- */}
                <div className="trn-intro">
                    <span className="trn-eyebrow">
                        <GraduationCap size={13} />
                        Resources · Training
                    </span>
                    <h2>PyroSim Software Training</h2>
                    <p className="trn-lede">
                        Fire &amp; smoke modeling with industry-leading simulation software.
                    </p>
                </div>

                {/* ---------------------------------------------------------------
            COURSE BANNER
           --------------------------------------------------------------- */}
                <div className="trn-banner">
                    
                    <div className="trn-banner-body">
                        <h3>Give your team the skills to design safer buildings</h3>
                        <p>
                            We offer standard and tailormade training on PyroSim software to
                            help teams use it in a more effective way. Our program is a
                            hands-on, one-day course built for fire protection engineers, life
                            safety consultants, and building compliance professionals who need
                            to translate real-world fire scenarios into accurate, defensible
                            simulations.
                        </p>
                        <p className="trn-banner-note">
                            PyroSim is the leading graphical interface for the Fire Dynamics
                            Simulator (FDS), the NIST-developed engine trusted by fire
                            engineers worldwide for computational fluid dynamics fire modeling.
                            Participants move beyond theory and get straight into the software —
                            building compartment geometry, defining fire sources and materials,
                            configuring HVAC and sprinkler systems, and running full
                            simulations from setup to results.
                        </p>

                        <div className="trn-highlights">
                            {highlights.map((h) => {
                                const Icon = h.icon;
                                return (
                                    <div className="trn-highlight" key={h.label}>
                                        <Icon size={16} />
                                        <strong>{h.value}</strong>
                                        <span>{h.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ---------------------------------------------------------------
            OUTCOMES
           --------------------------------------------------------------- */}
                <div className="trn-section">
                    <div className="trn-section-head">
                        <span className="trn-section-icon">
                            <CheckCircle2 size={17} />
                        </span>
                        <h4>What You&rsquo;ll Walk Away With</h4>
                        <span className="trn-rule" />
                    </div>

                    <ul className="trn-outcomes">
                        {outcomes.map((o) => (
                            <li key={o}>
                                <CheckCircle2 size={16} />
                                <span>{o}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ---------------------------------------------------------------
            CURRICULUM
           --------------------------------------------------------------- */}
                <div className="trn-section">
                    <div className="trn-section-head">
                        <span className="trn-section-icon">
                            <Box size={17} />
                        </span>
                        <h4>Course Modules</h4>
                        <span className="trn-rule" />
                        <span className="trn-section-count">{modules.length} modules</span>
                    </div>

                    <div className="trn-module-grid">
                        {modules.map((m, i) => {
                            const Icon = m.icon;
                            return (
                                <article className="trn-module" key={m.id}>
                                    <div className="trn-module-head">
                                        <span className="trn-module-icon">
                                            <Icon size={18} />
                                        </span>
                                        <span className="trn-module-num">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <h5>{m.title}</h5>
                                    <p>{m.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>

                {/* ---------------------------------------------------------------
            AUDIENCE
           --------------------------------------------------------------- */}
                <div className="trn-section">
                    <div className="trn-section-head">
                        <span className="trn-section-icon">
                            <UserCheck size={17} />
                        </span>
                        <h4>Who This Course Is For</h4>
                        <span className="trn-rule" />
                    </div>

                    <div className="trn-audience-grid">
                        {audience.map((a) => (
                            <div className="trn-audience" key={a.title}>
                                <h5>{a.title}</h5>
                                <p>{a.text}</p>
                            </div>
                        ))}
                    </div>

                    <p className="trn-prereq">
                        <CheckCircle2 size={15} />
                        <span>
                            Basic fire dynamics knowledge is recommended, but{" "}
                            <strong>no prior PyroSim experience is required.</strong>
                        </span>
                    </p>
                </div>

                {/* ---------------------------------------------------------------
            COURSE DETAILS + DOCUMENT
           --------------------------------------------------------------- */}
                <div className="trn-detail-split">
                    <div className="trn-details">
                        <div className="trn-section-head">
                            <span className="trn-section-icon">
                                <ClipboardCheck size={17} />
                            </span>
                            <h4>Course Details</h4>
                        </div>

                        <p>
                            A single, focused day (6 hours) covering everything from geometry
                            and fire definition to a full hands-on case study. Delivered
                            in-person or virtually, with class sizes capped at 12 to keep it
                            interactive.
                        </p>

                        <span className="trn-includes-label">Every participant receives</span>
                        <ul className="trn-includes">
                            <li>
                                <FileText size={15} />
                                Course workbook
                            </li>
                            <li>
                                <Box size={15} />
                                Sample project files
                            </li>
                            <li>
                                <Award size={15} />
                                Certificate of completion
                            </li>
                        </ul>
                    </div>

                    {/* Training template — view / download */}
                    <div className="trn-docs">
                        <span className="trn-includes-label">Standard Training Template</span>

                        {documents.map((doc) => (
                            <div className="trn-doc-card" key={doc.id}>
                                <div className="trn-doc-head">
                                    <span className="trn-doc-badge">{doc.category}</span>
                                    <FileText className="trn-doc-icon" size={20} />
                                </div>

                                <h5>{doc.title}</h5>
                                <p>{doc.description}</p>

                                <div className="trn-doc-actions">
                                    <button
                                        type="button"
                                        className="btn-trn-view"
                                        onClick={() => handleOpenPdf(doc)}
                                    >
                                        <Eye size={15} />
                                        <span>View</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-trn-download"
                                        onClick={() => handleDownloadPdf(doc)}
                                    >
                                        <Download size={15} />
                                        <span>Download</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ---------------------------------------------------------------
            CTA
           --------------------------------------------------------------- */}
                <div className="trn-cta">
                    <div className="trn-cta-text">
                        <h4>Book a session for your team</h4>
                        <p>
                            Standard and tailormade PyroSim training, delivered in-person or
                            virtually. Talk to us about dates and scope.
                        </p>
                    </div>
                    <div className="trn-cta-actions">
                        <a href="/contact" className="btn-trn-primary">
                            <Mail size={16} />
                            <span>Enquire About Training</span>
                            <ArrowUpRight size={16} />
                        </a>
                        <a
                            href="https://www.thunderheadeng.com/pyrosim"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-trn-ghost"
                        >
                            <span>About PyroSim</span>
                        </a>
                    </div>
                </div>
            </div>

            <PdfViewerModal
                isOpen={isModalOpen}
                onClose={handleClosePdf}
                pdfUrl={activePdf?.fileUrl}
                title={activePdf?.title}
            />
        </section>
    );
}
