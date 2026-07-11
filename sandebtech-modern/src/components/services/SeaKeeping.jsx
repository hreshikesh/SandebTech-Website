import "./SeaKeeping.css";

import { CheckCircle2 } from "lucide-react";

import seaImage from "../../assets/images/services/seakeeping/seakeeping.webp"


const features = [
    "Ship Motion Prediction",
    "Added Resistance Analysis",
    "Time Series Results",
    "Response Amplitude Operators (RAO)",
];

function SeaKeeping() {
    return (
        <section className="sea-section">

            <div className="container">

                <div className="sea-grid">

                    {/* Image */}

                    <div className="service-image">

                        <div className="image-card">

                            <img
                                src={seaImage}
                                alt="Sea Keeping Analysis"
                            />

                        </div>

                    </div>

                    {/* Content */}

                    <div className="sea-content">

                        <span className="service-badge">
                            CFD SERVICE
                        </span>

                        <h2>
                            Sea Keeping
                        </h2>

                        <p>
                            Sea Keeping analysis predicts ship motions and added
                            resistance in waves using the SHIPFLOW MOTIONS solver.
                            These simulations help evaluate vessel behaviour in
                            different sea conditions, enabling engineers to improve
                            safety, comfort and operational performance.
                        </p>

                        <p>
                            Typical outputs include time-series motion responses,
                            added resistance predictions and Response Amplitude
                            Operators (RAO), providing valuable insight into vessel
                            dynamics before construction or modification.
                        </p>

                        <div className="service-features">

                            {features.map((feature) => (

                                <div
                                    key={feature}
                                    className="feature"
                                >
                                    <CheckCircle2 size={18} />
                                    <span>{feature}</span>
                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* Video */}

                <div className="service-video">

                    <h3>Simulation Demonstration</h3>

                    <div className="video-wrapper">

                        <iframe
                            src="https://www.youtube.com/embed/HfRGDQccr8w?si=PN9-juSa8lnP50JX&amp;start=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            title="Sea Keeping Simulation"
                            allowFullScreen
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SeaKeeping;