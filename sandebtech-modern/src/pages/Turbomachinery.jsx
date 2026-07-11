import PageBanner from "../components/common/PageBanner";
import "./Turbomachinery.css";

function Turbomachinery() {
  return (
    <>
      <PageBanner
        title="Turbomachinery"
        subtitle="Engineering Solutions for Turbomachinery Applications"
      />

      <section className="turbo-pending">

        <div className="container">

          <div className="pending-card">

            <span className="pending-badge">
              Coming Soon
            </span>

            <h2>
              Turbomachinery Solutions
            </h2>

            <p>
              Detailed information about our turbomachinery
              engineering solutions, software capabilities,
              applications and optimization services will be
              available soon.
            </p>

            <div className="pending-list">

              <div className="pending-item">
                CFD Based Analysis
              </div>

              <div className="pending-item">
                Design Optimization
              </div>

              <div className="pending-item">
                Performance Evaluation
              </div>

              <div className="pending-item">
                Simulation Solutions
              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Turbomachinery;