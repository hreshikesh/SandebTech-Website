
import PageTransition from "../components/PageTransition/PageTransition";

import LotusProducts from "../components/lotus/LotusProducts";
import SEO from "../components/seo/SEO";
function LotusMicro() {
  return (
    <>
      <SEO
        title="Lotus Engine Simulation (Lotus Micro) | Powertrain CFD"
        description="Advanced engine simulation software for internal combustion engine design, thermodynamic modeling, and fluid dynamic performance analysis."
        keywords="Lotus Engine Simulation, Lotus Micro, Engine CFD, Powertrain Simulation, Thermodynamic Modeling, SandebTech"
        url="https://sandebtech.com/solutions/lotus-micro"
      />
      <PageTransition />


      <LotusProducts />
    </>
  );
}

export default LotusMicro;