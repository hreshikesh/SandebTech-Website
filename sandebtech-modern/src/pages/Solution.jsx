import Solutions from "../components/solutions/SolutionPage";
import PageBanner from "../components/common/PageBanner";
import PageTransition from "../components/PageTransition/PageTransition";

const Solution = () => {
    return (
        <>
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