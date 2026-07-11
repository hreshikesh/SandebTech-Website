import PageBanner from "../components/common/PageBanner";

import CaesesIntro from "../components/caeses/CaesesIntro";
import CaesesVideo from "../components/caeses/CaesesVideo";
import CaesesApplications from "../components/caeses/CaesesApplications";

function Caeses() {
  return (
    <>
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