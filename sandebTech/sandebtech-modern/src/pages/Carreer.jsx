import CareerDomains from "../components/careers/CareerDomains";
import CareerForm from "../components/careers/CareerForm";
import SEO from "../components/seo/SEO";
function Careers() {
  return (
    <>
      <SEO
        title="Careers at SandebTech | Join Our Simulation Engineering Team"
        description="Build your career in CFD, CAE, and numerical simulation engineering at SandebTech. Explore open positions and innovate with us."
        keywords="SandebTech Careers, CFD Engineering Jobs, CAE Simulation Careers, Engineering Jobs, Join SandebTech"
        url="https://sandebtech.com/career"
      />
      <CareerDomains />
      <CareerForm />
    </>
  );
}

export default Careers;