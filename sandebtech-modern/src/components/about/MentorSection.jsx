import "./MentorSection.css";
import { mentors } from "../../data/team";

function MentorSection() {
  return (
    <section className="mentor-section">
      <div className="container">

        <div className="section-heading">

          <span>GUIDANCE</span>

          <h2>Mentor & Advisors</h2>

          <p>
            Our growth is supported by experienced mentors who provide
            valuable guidance, technical insight and strategic direction.
          </p>

        </div>

        <div className="mentor-grid">

          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="mentor-card"
            >
              <div className="mentor-image">

                <img
                  src={mentor.image}
                  alt={mentor.name}
                />

              </div>

              <h3>{mentor.name}</h3>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default MentorSection;