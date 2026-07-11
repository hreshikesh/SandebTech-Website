import "./CoreTeam.css";
import { coreTeam } from "../../data/team";

function CoreTeam() {
  return (
    <section className="core-team">

      <div className="container">

        <div className="section-heading">

          <span>OUR PEOPLE</span>

          <h2>Meet Our Core Team</h2>

          <p>
            Behind every successful project is a dedicated team committed
            to delivering quality engineering solutions.
          </p>

        </div>

        <div className="team-grid">

          {coreTeam.map((member) => (

            <div
              key={member.id}
              className="team-card"
            >

              <div className="team-image">

                <img
                  src={member.image}
                  alt={member.name}
                />

              </div>

              <h3>{member.name}</h3>
              {member.designation && <p className="team-designation">{member.designation}</p>}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default CoreTeam;