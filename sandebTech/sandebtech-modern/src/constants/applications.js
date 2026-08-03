
import powertrain from "../assets/images/caeses/applications/powertrain.webp";
import marine from "../assets/images/caeses/applications/marine.webp";
import turbo from "../assets/images/caeses/applications/turbo.png";

import piston1 from "../assets/images/caeses/applications/piston1.webp";
import piston2 from "../assets/images/caeses/applications/piston2.webp";

import hull from "../assets/images/caeses/applications/hull.webp";
import propeller from "../assets/images/caeses/applications/propeller.webp";

import blade from "../assets/images/caeses/applications/blade.webp";
import volute from "../assets/images/caeses/applications/volute.webp";

export const applications = [
  {
    title: "Powertrain",
    image: powertrain,
    description:
      "CAESES® provides powerful parametric modelling capabilities for the design and optimization of powertrain components including piston bowls, intake ports, exhaust ports, turbochargers and many other engineering applications.",

    subTitle: "Piston Bowl & Ports",

    subItems: [
      {
        image: piston1,
        link: "https://www.caeses.com/applications/powertrain/piston-bowl-design/",
      },
      {
        image: piston2,
        link: "https://www.caeses.com/applications/powertrain/piston-bowl-design/",
      },
    ],
  },

  {
    title: "Marine",
    image: marine,
    description:
      "CAESES® supports complete marine geometry parameterization including ship hulls, appendages and propellers, enabling CFD-ready optimization workflows.",

    subTitle: "Ship Hull & Propeller",

    subItems: [
      {
        image: hull,
        link: "https://www.caeses.com/applications/marine/ship-hull-design/",
      },
      {
        image: propeller,
        link: "https://www.caeses.com/applications/turbomachinery/propeller-design/",
      },
    ],
  },

  {
    title: "Turbomachinery",
    image: turbo,
    description:
      "Design complex blades, impellers and casings using fully parametric models that integrate seamlessly into CFD-driven optimization processes.",

    subTitle: "Blade & Volute",

    subItems: [
      {
        image: blade,
        link: "https://www.caeses.com/applications/turbomachinery/volute-design/",
      },
      {
        image: volute,
        link: "https://www.caeses.com/applications/turbomachinery/blade-design/",
      },
    ],
  },
];