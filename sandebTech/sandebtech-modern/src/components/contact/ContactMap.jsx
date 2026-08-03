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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.3139608390406!2d77.5791447!3d13.030085799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17c3dff56c7d%3A0x99f149d66b06c9c0!2s166%2C%205th%20Cross%20Rd%2C%20KEB%20Layout%2C%20Sanjayanagara%2C%20Bengaluru%2C%20Karnataka%20560094!5e1!3m2!1sen!2sin!4v1785503262234!5m2!1sen!2sin"
            loading="lazy"
            allowFullScreen
          />


        </div>

      </div>

    </section>
  );
}

export default ContactMap;