import PageBanner from "../components/common/PageBanner";
import AboutIntro from "../components/about/AboutIntro";
import CoreTeam from "../components/about/CoreTeam";
import MentorSection from "../components/about/MentorSection";
import PageTransition from "../components/PageTransition/PageTransition";
import AboutCompany from "../components/about/AboutCompany";

import SEO from "../components/seo/SEO";
function About() {
    return (
        <>
            <SEO
                title="About SandebTech | Engineering Simulation Specialists"
                description="Learn about SandebTech, our core mission, expert engineering team, and leadership in providing state-of-the-art CFD and CAE simulation solutions."
                keywords="About SandebTech, Engineering Simulation Team, CFD Experts, CAE Software Provider, Marine Engineering Consultants"
                url="https://sandebtech.com/about"
            />
            <PageTransition />
            <PageBanner
                title="About SandebTech"
                subtitle="Engineering Excellence Since 2014"
            />

            <AboutIntro />

            <AboutCompany />
            <CoreTeam />

            <MentorSection />

        </>
    );
}

export default About;