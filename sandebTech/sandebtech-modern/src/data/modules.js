import {
    Flame,
    Clock,
    Users,
    Award,
    MapPin,
    CheckCircle2,
    FileText,
    Eye,
    Download,
    ArrowUpRight,
    GraduationCap,
    Box,
    Thermometer,
    Wind,
    BarChart3,
    ClipboardCheck,
    UserCheck,
    Mail
} from "lucide-react";
export const modules = [
    {
        id: "m1",
        icon: GraduationCap,
        title: "Interface & Project Workflow",
        text: "Orientation in the PyroSim environment — navigating the interface and setting up a project so the workflow runs cleanly from first click to final result."
    },
    {
        id: "m2",
        icon: Box,
        title: "3D Geometry & Meshing",
        text: "Building accurate compartment models: obstructions, vents, and mesh definition that balances resolution against solve time."
    },
    {
        id: "m3",
        icon: Thermometer,
        title: "Materials & Fire Definition",
        text: "Defining materials, fuel reactions, and heat release rates so the design fire reflects the scenario you actually need to defend."
    },
    {
        id: "m4",
        icon: Wind,
        title: "Detection, Sprinklers & Smoke Control",
        text: "Configuring detectors, sprinkler systems, and HVAC-driven smoke control within the model."
    },
    {
        id: "m5",
        icon: BarChart3,
        title: "Results & Smokeview",
        text: "Visualizing and interpreting simulation output in Smokeview — turning field data into findings a reviewer can follow."
    },
    {
        id: "m6",
        icon: ClipboardCheck,
        title: "Hands-On Case Study",
        text: "A full worked case from setup through to results, validating outcomes against code criteria and design objectives."
    }
];

export const audience = [
    {
        title: "Fire Protection Engineers",
        text: "Sharpening modeling skills to produce accurate, defensible fire simulations."
    },
    {
        title: "Code Compliance Reviewers",
        text: "Evaluating performance-based designs submitted for approval."
    },
    {
        title: "HVAC & Smoke-Control Designers",
        text: "Expanding the toolkit to cover fire-mode ventilation and smoke management."
    }
];
