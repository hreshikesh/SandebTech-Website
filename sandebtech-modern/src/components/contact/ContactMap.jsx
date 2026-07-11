import "./ContactMap.css";

function ContactMap() {
  return (
    <section className="contact-map">

      <div className="container">

        <div className="section-title">

          <span>OUR LOCATION</span>

          <h2>Visit Our Office</h2>

          <p>
            We welcome opportunities to discuss engineering challenges,
            industrial automation solutions, and collaborative projects.
            Reach out or visit our office during working hours.
          </p>

        </div>

        <div className="map-wrapper">

          <iframe
            title="SandebTech Location"
            src="https://www.google.com/maps?q=Mangalore,Karnataka&output=embed"
            loading="lazy"
            allowFullScreen
          />

        </div>

      </div>

    </section>
  );
}

export default ContactMap;