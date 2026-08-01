
import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";
import About from "../components/home/About";
import Products from "../components/home/Product";
import WhyChoose from "../components/home/WhyChoose";
import CTA from "../components/home/CTA";
import PageTransition from "../components/PageTransition/PageTransition";
import SEO from "../components/seo/SEO";
function Home() {
  return (
    <>
      <SEO
        title="SandebTech | Advanced CFD, CAE & Engineering Simulation Solutions"
        description="SandebTech provides cutting-edge CFD, CAE, and engineering simulation software and services for marine, turbomachinery, and industrial applications."
        keywords="CFD Solutions, CAE Software, Engineering Simulation, SandebTech, ShipFlow, CAESES, TCAE, Marine CFD"
        url="https://sandebtech.com/"
      />
      <PageTransition />
      <Hero />
      <Highlights />
      <About />
      <Products />
      <WhyChoose />
      <CTA />
    </>
  );
}

export default Home;