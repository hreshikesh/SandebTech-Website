import PageBanner from "../components/common/PageBanner";

import ServicesIntro from "../components/services/ServicesIntro";

import HullOptimization from "../components/services/HullOptimization";

import EnergySaving from "../components/services/EnergySaving";

import SeaKeeping from "../components/services/SeaKeeping";
import PageTransition from "../components/PageTransition/PageTransition";

function Services() {
  return (
    <>
      <PageTransition />
      <PageBanner
        title="CFD Based Services"
        subtitle="Ship Design • Special Training • Joint Projects"
      />

      <ServicesIntro />

      <HullOptimization />

      <EnergySaving />

      <SeaKeeping />
    </>
  );
}

export default Services;