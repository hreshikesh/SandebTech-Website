import PageBanner from "../components/common/PageBanner";
import PageTransition from "../components/PageTransition/PageTransition";
import ContactInfo from "../components/contact/ContactInfo";
import ContactMap from "../components/contact/ContactMap";
import SEO from "../components/seo/SEO";
function Contact() {
  return (
    <>
      <SEO
        title="Contact SandebTech | CFD & CAE Software & Consulting"
        description="Get in touch with the SandebTech team for quotes, product demos, technical support, or engineering consultation."
        keywords="Contact SandebTech, CFD Consultation, CAE Software Support, Engineering Simulation Demo"
        url="https://sandebtech.com/contact"
      />
      <PageTransition />
      <PageBanner
        title="Contact Us"
        subtitle="Let's Discuss Your Engineering Requirements"
      />

      <ContactInfo />

      <ContactMap />
    </>
  );
}

export default Contact;