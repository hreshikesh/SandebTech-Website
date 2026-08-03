import { FaLinkedinIn } from "react-icons/fa6";
import "./MentorSection.css";
import { mentors } from "../../data/team";

function MentorSection() {
  return (
    <section className="mentor-section">
      <div className="container">

        <div className="section-heading">
          <span>GUIDANCE</span>
          <h2>Mentor &amp; Advisors</h2>
          <p>
            Our growth is supported by experienced mentors who provide
            valuable guidance, technical insight and strategic direction.
          </p>
        </div>

        <div className="mentor-grid">

          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">

              <div className="mentor-image">
                <img src={mentor.image} alt={mentor.name} />

                {/* LinkedIn overlay — slides up on hover, always visible on touch */}
                {mentor.linkedin && (
                  <a
                    href={mentor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mentor-social"
                    aria-label={`${mentor.name} on LinkedIn`}
                  >
                    <FaLinkedinIn />
                  </a>
                )}
              </div>

              <div className="mentor-info">
                <h3>{mentor.name}</h3>
                {mentor.designation && (
                  <p className="mentor-designation">{mentor.designation}</p>
                )}
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default MentorSection;
