import PageBanner from "../components/common/PageBanner";

import LotusIntro from "../components/lotus/LotusIntro";
import LotusProducts from "../components/lotus/LotusProducts";

function LotusMicro() {
  return (
    <>
      <PageBanner
        title="Lotus Microsystems"
        subtitle="High-Performance Integrated Power Modules"
      />

      <LotusIntro />

      <LotusProducts />
    </>
  );
}

export default LotusMicro;