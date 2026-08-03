import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import "./NotFound.css";
import PageTransition from "../components/PageTransition/PageTransition";

function NotFound() {

    return (
        <>
            <PageTransition />
            <section className="not-found">

                <div className="container">

                    <div className="not-found-content">

                        <span className="error-code">
                            404
                        </span>

                        <h1>
                            Page Not Found
                        </h1>

                        <p>
                            Sorry, the page you are looking for doesn't exist
                            or may have been moved.
                        </p>

                        <Link
                            to="/"
                            className="home-btn"
                        >
                            <ArrowLeft size={18} />
                            Back to Home
                        </Link>

                    </div>

                </div>

            </section>
        </>
    );
}

export default NotFound;