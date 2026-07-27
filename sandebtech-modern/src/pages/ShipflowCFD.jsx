import PageBanner from "../components/common/PageBanner";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ShipflowIntro from "../components/shipflow/ShipflowIntro";
import ProductSuite from "../components/shipflow/ProductSuite";
import Applications from "../components/shipflow/Applications";
import PageTransition from "../components/PageTransition/PageTransition";

function ShipflowCFD() {
  return (
    <>
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