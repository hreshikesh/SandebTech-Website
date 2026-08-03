import "./PageBanner.css";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function PageBanner({
  title,
  subtitle,
  backgroundImage,
}) {
  return (
    <section
      className="page-banner"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(8,37,64,.82), rgba(15,76,129,.82)), url(${backgroundImage})`,
            }
          : undefined
      }
    >
      <div className="container">

        <div className="page-banner-content">

          <span>{subtitle}</span>

          <h1>{title}</h1>

          <div className="breadcrumb">

            <Link to="/">Home</Link>

            <ChevronRight size={16} />

            <p>{title}</p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default PageBanner;