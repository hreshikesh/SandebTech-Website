import React, { useEffect, useState } from "react";
import { X, Download, FileText, Loader2, AlertCircle } from "lucide-react";
import "./PdfViewerModal.css";

export default function PdfViewerModal({ isOpen, onClose, pdfUrl, title }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Reset internal states whenever modal opens or URL changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, pdfUrl]);

  // Handle ESC key press and body scroll locking safely
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      const originalOverflow = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !pdfUrl) return null;

  return (
    <div
      className="pdf-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
    >
      <div
        className="pdf-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <header className="pdf-modal-header">
          <div className="pdf-modal-title">
            <FileText size={20} className="pdf-icon" aria-hidden="true" />
            <h3 id="pdf-modal-title" title={title || "Document Preview"}>
              {title || "Document Preview"}
            </h3>
          </div>

          <div className="pdf-modal-actions">
            {/* Download Button */}
            <a
              href={pdfUrl}
              download
              className="pdf-download-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download PDF"
            >
              <Download size={16} aria-hidden="true" />
              <span>Download PDF</span>
            </a>

            {/* Close Button */}
            <button
              type="button"
              className="pdf-close-btn"
              onClick={onClose}
              aria-label="Close document modal"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Modal Body - PDF Viewer */}
        <div className="pdf-modal-body">
          {isLoading && !hasError && (
            <div className="pdf-modal-status">
              <Loader2 size={32} className="pdf-spinner" aria-hidden="true" />
              <p>Loading document...</p>
            </div>
          )}

          {hasError ? (
            <div className="pdf-modal-status pdf-error-state">
              <AlertCircle size={36} className="pdf-error-icon" aria-hidden="true" />
              <p>Unable to display PDF preview directly.</p>
              <a href={pdfUrl} download className="pdf-download-btn">
                <Download size={16} />
                <span>Download Document</span>
              </a>
            </div>
          ) : (
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0`}
              title={title || "PDF Document Viewer"}
              width="100%"
              height="100%"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              className={`pdf-iframe ${isLoading ? "is-loading" : "is-loaded"}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}