import PageBanner from "../components/common/PageBanner";

import ContactInfo from "../components/contact/ContactInfo";
import ContactMap from "../components/contact/ContactMap";

function Contact() {
  return (
    <>
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