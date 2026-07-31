import "./CareerForm.css";
import applyImage from "../../assets/images/logo/logo2.webp";

function CareerForm() {
  return (
    <section className="career-form-section">
      <div className="container">
        
        {/* Wrapper for Flexbox layout */}
        <div className="career-form-content-wrapper">
          
          {/* LEFT COLUMN - Image */}
          <img 
            src={applyImage} 
            alt="Team collaborating" 
            className="career-form-image"
            // If using local import: src={applyImage}
            loading="lazy" // Good practice for performance
          />

          {/* RIGHT COLUMN - Text and Button */}
          <div className="career-form-text-block">
            <div className="career-form-header">
              <span className="section-tag">Application</span>
              <h2>
                Apply <span>Now</span>
              </h2>
              <p>
                Interested in joining SandebTech? Complete the application
                form below. Our recruitment team will carefully review your
                application and contact shortlisted candidates.
              </p>
            </div>

            <div className="career-form-cta">
              {/* Removed inline styles, using CSS classes now */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd-MUDv26isMiOezy35qkFSfYsCR6kdeFYo24JvSpNSFonKQw/viewform?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary" // Assuming you have a global .btn-primary class based on your previous inline styles
              >
                Open Application Form
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default CareerForm;