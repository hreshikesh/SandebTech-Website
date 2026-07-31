import PageBanner from "../components/common/PageBanner";

import ServicesIntro from "../components/services/ServicesIntro";

import PageTransition from "../components/PageTransition/PageTransition";
import ServiceProduct from "../components/services/ServiceProduct";


function Services() {
  return (
    <>
      <PageTransition />
      <PageBanner
        title="CFD Based Services"
        subtitle="Design • Training • Projects"
      />

      <ServiceProduct />

    </>
  );
}

export default Services;