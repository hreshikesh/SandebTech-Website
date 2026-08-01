import Solutions from "../components/solutions/SolutionPage";
import PageBanner from "../components/common/PageBanner";
import PageTransition from "../components/PageTransition/PageTransition";
import SEO from "../components/seo/SEO";
const Solution = () => {
    return (
        <>
            <SEO
                title="CFD & CAE Software Solutions | SandebTech"
                description="Browse SandebTech's suite of specialized software solutions including ShipFlow, CAESES, TCAE, Lotus Engine Simulation, and Cloud CAE."
                keywords="Engineering Simulation Solutions, ShipFlow CFD, CAESES Optimization, TCAE Turbomachinery, Cloud CAE, SandebTech"
                url="https://sandebtech.com/solutions"
            />
            <PageTransition />
            <PageBanner
                title="Engineering Solutions"
                subtitle="Advanced CFD Software • Marine Engineering • Design Optimization"
            />
            <Solutions />
        </>
    )
}
export default Solution;