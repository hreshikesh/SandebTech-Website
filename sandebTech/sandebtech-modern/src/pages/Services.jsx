import PageBanner from "../components/common/PageBanner";

import ServicesIntro from "../components/services/ServicesIntro";

import PageTransition from "../components/PageTransition/PageTransition";
import ServiceProduct from "../components/services/ServiceProduct";
import SEO from "../components/seo/SEO";

function Services() {
  return (
    <>
      <SEO
        title="Engineering Simulation & CFD Consulting Services | SandebTech"
        description="Explore SandebTech's engineering services including CFD analysis, hydrodynamic optimization, structural CAE, and custom simulation consulting."
        keywords="CFD Consultancy Services, Engineering Simulation Services, Hydrodynamic Optimization, Structural CAE Analysis, SandebTech Services"
        url="https://sandebtech.com/services"
      />
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