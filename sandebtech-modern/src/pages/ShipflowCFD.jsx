import PageBanner from "../components/common/PageBanner";

import ShipflowIntro from "../components/shipflow/ShipflowIntro";
import ProductSuite from "../components/shipflow/ProductSuite";
import Applications from "../components/shipflow/Applications";

function ShipflowCFD() {
  return (
    <>
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