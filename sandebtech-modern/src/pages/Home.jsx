
import Hero from "../components/home/Hero";
import Highlights from "../components/home/Highlights";
import About from "../components/home/About";
import Products from "../components/home/Product";
import WhyChoose from "../components/home/WhyChoose";
import CTA from "../components/home/CTA";
import PageTransition from "../components/PageTransition/PageTransition";

function Home() {
  return (
    <>
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