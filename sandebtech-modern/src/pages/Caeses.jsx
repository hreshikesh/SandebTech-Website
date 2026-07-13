import PageBanner from "../components/common/PageBanner";

import CaesesIntro from "../components/caeses/CaesesIntro";
import CaesesVideo from "../components/caeses/CaesesVideo";
import CaesesApplications from "../components/caeses/CaesesApplications";
import PageTransition from "../components/PageTransition/PageTransition";

function Caeses() {
  return (
    <>
      <PageTransition />
      <PageBanner
        title="CAESES®"
        subtitle="Simulation Driven Design & Optimization Software"
      />

      <CaesesIntro />

      <CaesesVideo />

      <CaesesApplications />
    </>
  );
}

export default Caeses;