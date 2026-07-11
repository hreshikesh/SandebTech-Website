import PageBanner from "../components/common/PageBanner";
import AboutIntro from "../components/about/AboutIntro";
import CoreTeam from "../components/about/CoreTeam";
import MentorSection from "../components/about/MentorSection";


function About() {
    return (
        <>
            <PageBanner
                title="About SandebTech"
                subtitle="Engineering Excellence Since 2014"
            />

            <AboutIntro />

            <CoreTeam />

            <MentorSection />

        </>
    );
}

export default About;