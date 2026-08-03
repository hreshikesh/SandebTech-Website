import "./CaesesVideo.css";

function CaesesVideo() {
  return (
    <section className="caeses-video">

      <div className="container">

        <div className="video-heading">

          <span>OVERVIEW</span>

          <h2>What is CAESES?</h2>

          <p>
            Watch the official introduction to understand how CAESES
            enables geometry modelling, CFD automation and
            simulation-driven optimization.
          </p>

        </div>

        <div className="video-wrapper">

          <iframe
            src="https://www.youtube.com/embed/O1wSnnim6gs?si=tKEPmmUZ40IXOZQx"
            title="What is CAESES"
            allowFullScreen
          />

        </div>

      </div>

    </section>
  );
}

export default CaesesVideo;