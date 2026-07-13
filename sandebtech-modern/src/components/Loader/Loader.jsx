import "./Loader.css";

import logo from "../../assets/images/logo/logo.webp";

function Loader() {
  return (
    <div className="loader-screen">

      <div className="loader-content">

        <img
          src={logo}
          alt="SandebTech"
          className="loader-logo"
        />

        <div className="loader-spinner"></div>

        <p>Loading...</p>

      </div>

    </div>
  );
}

export default Loader;