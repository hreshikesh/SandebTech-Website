import PageBanner from "../components/common/PageBanner";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ShipflowIntro from "../components/shipflow/ShipflowIntro";
import ProductSuite from "../components/shipflow/ProductSuite";
import Applications from "../components/shipflow/Applications";
import PageTransition from "../components/PageTransition/PageTransition";
import SEO from "../components/seo/SEO";
function ShipflowCFD() {
  return (
    <>
      <SEO
        title="ShipFlow CFD | Marine Hydrodynamics & Hull Optimization"
        description="ShipFlow CFD delivers specialized hydrodynamic analysis, wave resistance calculations, and hull form optimization for naval architects and marine engineers."
        keywords="ShipFlow, ShipFlow CFD, Hydrodynamic Simulation, Naval Architecture CFD, Hull Optimization, Ship Resistance"
        url="https://sandebtech.com/solutions/shipflow-cfd"
      />
      <PageTransition />
      <PageBanner
        title="CFD Software - SHIPFLOW"
        subtitle="Professional CFD Software for Ship Design"
      />

      <ShipflowIntro />

      <ProductSuite />

      <Applications />
    </>
  );
}

export default ShipflowCFD;