import PageBanner from "../components/common/PageBanner";
import AboutIntro from "../components/about/AboutIntro";
import CoreTeam from "../components/about/CoreTeam";
import MentorSection from "../components/about/MentorSection";
import PageTransition from "../components/PageTransition/PageTransition";
import AboutCompany from "../components/about/AboutCompany";


function About() {
    return (
        <>
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