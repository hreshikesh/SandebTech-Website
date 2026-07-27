import React, { useState } from "react";
import { FileText, Eye, Download } from "lucide-react";

// Asset Imports
import ltgImg from "../../assets/images/lotus/products/ltg.webp";
import pdf1 from "../../assets/images/lotus/documents/pdf1.pdf";
import pdf2 from "../../assets/images/lotus/documents/application note.pdf";
import pdf3 from "../../assets/images/lotus/documents/whitepaper.pdf";
import pdf4 from "../../assets/images/lotus/documents/technical solution breif.pdf";

// Component Imports
import PdfViewerModal from "./PdfViewerModal";
import "./LotusProducts.css";

// Thermal PDF Documents Data
const thermalDocuments = [
  {
    id: "ltg-datasheet",
    category: "Datasheet",
    title: "LTG Series Thermal Substrate Datasheet",
    description: "Detailed thermal resistance, mechanical profiles, and material properties.",
    fileUrl: pdf1
  },
  {
    id: "ltg-app-note",
    category: "Application Note",
    title: "LTG Thermal Integration & Design Guide",
    description: "Guidelines for direct substrate bonding and local hot-spot elimination.",
    fileUrl: pdf2
  },
  {
    id: "ltg-whitepaper",
    category: "White Paper",
    title: "Nanoscale Silicon Substrate Thermal Performance",
    description: "In-depth thermal conductivity benchmarks and heat-dissipation case studies.",
    fileUrl: pdf3
  },
  {
    id: "ltg-solution-brief",
    category: "Solution Brief",
    title: "LTG Thermal Architecture for High-Density ICs",
    description: "Executive summary on optimizing thermal management in advanced 2.5D packaging.",
    fileUrl: pdf4
  }
];

const thermalSpecs = [
  { model: "LTG0201", length: "0.6 ± 3%", width: "0.3 ± 3%", height: "0.3 ± 3%" },
  { model: "LTG0402", length: "1.0 ± 3%", width: "0.5 ± 3%", height: "0.8 ± 3%" },
  { model: "LTG0603", length: "1.6 ± 3%", width: "0.8 ± 3%", height: "0.8 ± 3%" },
  { model: "LTG0805", length: "2.0 ± 3%", width: "1.2 ± 3%", height: "0.8 ± 3%" },
  { model: "LTG1206", length: "3.2 ± 3%", width: "1.6 ± 3%", height: "0.8 ± 3%" }
];

export default function LotusProducts() {
  // Modal state
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
    <section className="lotus-products">
      <div className="container">
        
        {/* -------------------------------------------------------------
            CATEGORY 3: Thermal Management + Interactive PDF Center
           ------------------------------------------------------------- */}
        <div className="product-category-group">
          <div className="category-header">
            <h3>3. Thermal Management (LTG Series)</h3>
            <span className="category-subtitle">
              Nanoscale silicon thermal substrates engineered to eliminate local hot spots in dense IC packages.
            </span>
          </div>

          <div className="thermal-wrapper-grid">
            {/* Visual Highlight Card */}
            <div className="thermal-image-card">
              <img src={ltgImg} alt="LTG Thermal Substrate" />
              <div className="thermal-caption">
                <h5>LTG Thermal Solution</h5>
                <p>Ultra-thin silicon-based thermal distribution for high-density silicon interposers.</p>
              </div>
            </div>

            {/* Dimensions Data Table */}
            <div className="thermal-table-card">
              <h4>LTG Physical Dimension Matrix</h4>
              <p>Standard surface-mount dimensions across the LTG family portfolio:</p>

              <div className="table-container">
                <table className="lotus-table">
                  <thead>
                    <tr>
                      <th>Part Number</th>
                      <th>Length (mm)</th>
                      <th>Width (mm)</th>
                      <th>Height (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {thermalSpecs.map((row) => (
                      <tr key={row.model}>
                        <td className="model-cell">{row.model}</td>
                        <td>{row.length}</td>
                        <td>{row.width}</td>
                        <td>{row.height}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Upgraded PDF Grid Section */}
          <div className="thermal-docs-container">
            <div className="docs-header">
              <h4>Thermal Technical Documentation & Datasheets</h4>
              <p>Access complete product specs, application guides, and whitepapers.</p>
            </div>

            <div className="docs-grid">
              {thermalDocuments.map((doc) => (
                <div className="doc-card" key={doc.id}>
                  <div className="doc-card-header">
                    <span className="doc-badge">{doc.category}</span>
                    <FileText className="doc-card-icon" size={22} />
                  </div>

                  <div className="doc-card-body">
                    <h5>{doc.title}</h5>
                    <p>{doc.description}</p>
                  </div>

                  <div className="doc-card-actions">
                    {/* View Button -> Opens Modal */}
                    <button
                      type="button"
                      className="btn-view-doc"
                      onClick={() => handleOpenPdf(doc)}
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>

                   
                  </div>
                </div>
              ))}
            </div>
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