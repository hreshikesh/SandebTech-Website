import Solutions from "../components/solutions/SolutionPage";
import PageBanner from "../components/common/PageBanner";

const Solution = () => {
    return (
        <>
            <PageBanner
                title="Engineering Solutions"
                subtitle="Advanced CFD Software • Marine Engineering • Design Optimization"
            />
            <Solutions />
        </>
    )
}
export default Solution;