import "./CareerForm.css";

function CareerForm() {
  return (
    <section className="career-form-section">
      <div className="container">

        <div className="career-form-header">

          <span className="section-tag">
            Application
          </span>

          <h2>
            Apply <span>Now</span>
          </h2>

          <p>
            Interested in joining SandebTech? Complete the application
            form below. Our recruitment team will carefully review your
            application and contact shortlisted candidates.
          </p>

        </div>

        <div className="career-form-wrapper">

          <iframe
            title="SandebTech Career Form"
            src="https://forms.gle/SYr2T54ou71KHBKw6"
            loading="lazy"
            allowFullScreen
          />

        </div>

      </div>
    </section>
  );
}

export default CareerForm;