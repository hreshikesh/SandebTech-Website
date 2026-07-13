import PageBanner from "../components/common/PageBanner";
import PageTransition from "../components/PageTransition/PageTransition";
import ContactInfo from "../components/contact/ContactInfo";
import ContactMap from "../components/contact/ContactMap";

function Contact() {
  return (
    <>
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