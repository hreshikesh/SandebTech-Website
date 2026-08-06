// PdfViewerModal.jsx  (updated Download button section only)
import React, { useEffect, useState } from "react";
import { X, Download, FileText, Loader2, AlertCircle } from "lucide-react";
import "./PdfViewerModal.css";
import DownloadFormModal from "../downloadFormModal/DownloadFormModal";

export default function PdfViewerModal({
  isOpen,
  onClose,
  pdfUrl,
  title,
  user = null, // pass logged-in user to pre-fill form
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showDownloadForm, setShowDownloadForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, pdfUrl]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !showDownloadForm) onClose?.();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = original;
      };
    }
  }, [isOpen, onClose, showDownloadForm]);

  if (!isOpen || !pdfUrl) return null;

  return (
    <>
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
          {/* Header */}
          <header className="pdf-modal-header">
            <div className="pdf-modal-title">
              <FileText size={20} className="pdf-icon" aria-hidden="true" />
              <h3 id="pdf-modal-title" title={title || "Document Preview"}>
                {title || "Document Preview"}
              </h3>
            </div>

            <div className="pdf-modal-actions">
              {/* ✅ Now opens form instead of direct download */}
              <button
                type="button"
                className="pdf-download-btn"
                onClick={() => setShowDownloadForm(true)}
                aria-label="Download PDF"
              >
                <Download size={16} aria-hidden="true" />
                <span>Download PDF</span>
              </button>

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

          {/* Body */}
          <div className="pdf-modal-body">
            {isLoading && !hasError && (
              <div className="pdf-modal-status">
                <Loader2 size={32} className="pdf-spinner" aria-hidden="true" />
                <p>Loading document...</p>
              </div>
            )}

            {hasError ? (
              <div className="pdf-modal-status pdf-error-state">
                <AlertCircle size={36} className="pdf-error-icon" />
                <p>Unable to display PDF preview directly.</p>
                <button
                  type="button"
                  className="pdf-download-btn"
                  onClick={() => setShowDownloadForm(true)}
                >
                  <Download size={16} />
                  <span>Download Document</span>
                </button>
              </div>
            ) : (
              <iframe
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
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

      {/* ✅ Download gate form — renders on top */}
      <DownloadFormModal
        isOpen={showDownloadForm}
        onClose={() => setShowDownloadForm(false)}
        pdfUrl={pdfUrl}
        title={title}
        user={user}
      />
    </>
  );
}