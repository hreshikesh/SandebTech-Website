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
          <div style="text-align: center; padding: 40px 20px;">
            <h2>Apply for a Position at SandebTech</h2>
            <p>Click below to open our application form and upload your documents.</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSd-MUDv26isMiOezy35qkFSfYsCR6kdeFYo24JvSpNSFonKQw/viewform?usp=sharing"
              target="_blank"
              style="background-color: #0b57d0; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">
              Open Application Form
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CareerForm;