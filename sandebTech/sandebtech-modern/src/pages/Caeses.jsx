import PageBanner from "../components/common/PageBanner";

import CaesesIntro from "../components/caeses/CaesesIntro";
import CaesesVideo from "../components/caeses/CaesesVideo";
import CaesesApplications from "../components/caeses/CaesesApplications";
import PageTransition from "../components/PageTransition/PageTransition";
import SEO from "../components/seo/SEO";
function Caeses() {
  return (
    <>
      <SEO
        title="CAESES | Parametric CAD & Shape Optimization for CFD"
        description="CAESES empowers engineers with flexible parametric CAD modeling and automated shape optimization tailored for advanced fluid dynamics (CFD)."
        keywords="CAESES Software, Parametric CAD, Shape Optimization, CFD CAD Preparation, Automated Optimization, SandebTech"
        url="https://sandebtech.com/solutions/caeses"
      />
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