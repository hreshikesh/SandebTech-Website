// Fire Safety Stat Images (Using fireImg or specific thumbnails)
import fireStat1 from "../assets/images/services/pyrosim.webp";
import fireStat2 from "../assets/images/services/pathfinder.webp";
import fireStat3 from "../assets/images//services/ventus.webp";
import maritimeImg from "../assets/images/services/maritime.webp";
import turboImg from "../assets/images/services/turbo.webp";
import electronicsImg from "../assets/images/services/thermal.webp";
import hvacImg from "../assets/images/havc/datacenter.webp";
import fireImg from "../assets/images/havc/fire.webp";
import maritimeBrochure from "../assets/images/lotus/documents/SHIPFLOW CFD Service .pdf";
import aeroSimImage from "../assets/images/services/aerosim.webp";
import pedestrin from "../assets/images/services/pedestrin.webp";
import facade from "../assets/images/services/facade.webp";
import load from "../assets/images/services/load.webp";
import {
  Ship,
  Fan,
  Cpu,
  Wind,
  Flame,
  CheckCircle2,
  ArrowUpRight,
  ChevronDown,
  FileText,
  Eye,
  Download,
  ShieldCheck,
  Award,
  Layers
} from "lucide-react";
export const services = [
  {
    id: "maritime",
    label: "Maritime",
    icon: Ship,
    image: maritimeImg,
    imageAlt: "Ship hull and propeller hydrodynamics simulation",
    eyebrow: "SHIPFLOW · CAESES",
    title: "Design and optimization of maritime systems",
    summary:
      "We offer expert CFD consulting to optimize  service  for your vessel designs and solve complex hydrodynamic challenges.Decrease fuel consumption, reduce operational downtime, and maximize speed. SHIPFLOW from FLOWTECH is the world standard for ship hydrodynamics CFD — grids are generated automatically from the hull shape, and resistance and propulsion data are presented the naval architect's way. Paired with CAESES for fully parametric hull, appendage, and propulsor geometry, the two tools form a complete hull-to-power optimization loop.",
    detail:
      "SHIPFLOW's zonal approach combines the XPAN potential-flow panel method for rapid wave resistance and hull ranking, the XCHAP RANS solver for viscous effects, and SHIPFLOW MOTIONS for ship motions and added resistance in waves. CAESES then drives design variations, respecting geometric, stability, and arrangement constraints while connecting to external solvers.",
    stats: [
      { value: "5%", label: "Typical energy savings" },
      { value: "10,000+", label: "Design variants" },
      { value: "100%", label: "Constraint consideration" }
    ],
    capabilities: [
      "Ship hulls — cruise, bulk carrier, naval, RoPax, SWATH, twin-skeg",
      "Propellers — tip rake, variable pitch, outboard, surface piercing",
      "Resistance, self-propulsion, and delivered power prediction",
      "Seakeeping and added resistance in waves (EEDI weather factor)",
      "Wind-assisted propulsion — Flettner rotors and wing sails",
      "Appendages, energy saving devices, and offshore structures"
    ],
    documents: [
      {
        id: "maritime-brochure",
        category: "Document",
        title: "SHIPFLOW Ship Hydrodynamics CFD Overview",
        description:
          "Solver modules, automatic grid generation, and the resistance-to-delivered-power workflow.",
        fileUrl: maritimeBrochure
      }
    ],
    links: [
      { label: "CAESES Maritime", url: "https://www.caeses.com/applications/maritime/" },
      { label: "SHIPFLOW by FLOWTECH", url: "https://www.flowtech.se/" }
    ]
  },
  {
    id: "turbomachinery",
    label: "Turbomachinery",
    icon: Fan,
    image: turboImg,
    imageAlt: "Compressor wheel and turbine blade geometry",
    eyebrow: "CAESES · TCAE",
    title: "Design and optimization of turbomachinery",
    summary:
      "Generate and optimize complex turbomachinery geometries to achieve higher efficiency and better overall performance. Create fully parametric blade, volute, and casing geometries — or rapidly modify imported geometries using advanced morphing techniques — then run robust design variations with minimal failures while automatically respecting manufacturing and packaging constraints.",
    detail:
      "Geometries export in multiple CFD-ready formats and connect seamlessly to external simulation tools. Integrated DoE, optimization algorithms, data management, and post-processing let teams explore the design space, while advanced analytics and machine learning uncover trends for data-driven design decisions.",
    stats: [
      { value: "1,000+", label: "Blade geometries" },
      { value: "90%", label: "Less manual modeling" },
      { value: "Days", label: "Instead of weeks" }
    ],
    capabilities: [
      "Blades — axial turbine stages, compressor stators, radial compressors",
      "Impellers — pump, shrouded, turbopump inducers, flow domains",
      "Fans — axial, skewed, compact with serrations, toroidal",
      "Volutes — single scroll, twin scroll, compressor, squirrel cage",
      "Turbochargers, pumps, gas and steam turbines, compressors",
      "Blades with internal cooling channels"
    ],
    links: [
      { label: "CAESES Turbomachinery", url: "https://www.caeses.com/applications/turbo" },
      { label: "TCAE by CFD SUPPORT", url: "https://www.cfdsupport.com/tcae/" }
    ]
  },
  {
    id: "electronics-cooling",
    label: "Electronics Cooling",
    icon: Cpu,
    image: electronicsImg,
    imageAlt: "Electronics cooling conjugate heat transfer simulation",
    eyebrow: "Thermal Design · In Partnership with Shiretechnik",
    title: "Thermal design services for electronic systems",
    summary:
      "Sandebtech extends sales and marketing support to Shiretechnik Solutions Private Limited for thermal design services covering electronic systems from concept to full product realization — and every step in between, throughout the design and development phase. Our design solutions adhere to industry standards and maximize your product's performance, delivering high reliability while meeting your defined design goals.",
    detail:
      "Our engineers are highly skilled in all leading industry simulation tools and bring deep experience across a wide range of applications, enabling us to solve even the most complex thermal challenges. We work closely with clients to identify the right engineering approach for their real-world requirements and constraints, ensuring every solution is grounded in sound engineering practice.",
    stats: [
      { value: "IC → System", label: "Full-stack thermal design" },
      { value: "Concept → Product", label: "End-to-end support" },
      { value: "Standards-Led", label: "Commercial & defence" }
    ],
    capsLabel: "Capabilities — Every Level of the Electronic System",
    capabilityGroups: [
      {
        title: "IC / Package Level",
        text: "Chip- and package-level thermal characterization and simulation to manage junction temperatures and ensure device reliability."
      },
      {
        title: "PCB Level",
        text: "Board-level thermal design and analysis, including layout optimization and component placement, to manage heat dissipation across the PCB."
      },
      {
        title: "Enclosure Level",
        text: "System- and enclosure-level thermal solutions, from airflow and cooling design to full mechanical integration, ensuring reliable performance in the final product."
      }
    ],
    standards: {
      intro:
        "Thermal design work is carried out in line with the standards that govern electronics product development across industries:",
      groups: [
        {
          title: "Consumer Electronics",
          items: [
            "IPC-2221 — PCB design",
            "IPC-9592 — power conversion thermal requirements",
            "JEDEC JESD51 — thermal measurement",
            "IEC 60068 — environmental testing"
          ]
        },
        {
          title: "Defence & Aerospace",
          items: [
            "MIL-STD-810 — environmental engineering",
            "MIL-STD-461 — electromagnetic compatibility",
            "MIL-STD-883 — microelectronics reliability",
            "DO-160 — airborne equipment"
          ]
        }
      ],
      note:
        "This standards-driven approach ensures our thermal solutions meet the reliability, safety, and performance benchmarks required for both commercial and mission-critical applications."
    },
    benefits: {
      title: "Benefits with Shiretechnik",
      items: [
        "Improved product performance",
        "Optimum cooling design solution",
        "Short time-to-market",
        "High reliability design",
        "Cost effective solution"
      ]
    },
    closing: {
      title: "Expert in Electronic Cooling Innovation",
      text: "Our expert team continually finds new ways to meet your cooling requirements while keeping every solution cost-effective. Analysts, customer specialists, and the R&D team constantly challenge the status quo, innovating solutions that deliver even greater value."
    },
    links: [
      { label: "Discuss Your Thermal Requirements", url: "/contact" },

    ]
  },
  {
    id: "hvac",
    label: "HVAC",
    icon: Wind,
    image: hvacImg,
    imageAlt: "HVAC airflow and ventilation simulation in a building",
    eyebrow: "HVAC & Data Center CFD",
    title: "HVAC and Data Center CFD design services",
    summary:
      "Sandeb Tech delivers HVAC CFD design and data center thermal management through in-house simulation engineers, backed by international standards (ASHRAE, CIBSE, NBC, NFPA, IBC). From routine maintenance to full system design and CFD-based performance validation — reliable, energy-efficient HVAC solutions for homes, businesses and industry.",
    detail:
      "Data center work applies CFD to server room thermal management, helping clients avoid hotspots, reduce cooling energy costs, and validate cooling capacity before equipment is installed — benchmarked against ASHRAE TC9.9 thermal guidelines.",
    stats: [
      { value: "PMV / PPD", label: "Thermal comfort & ADPI" },
      { value: "TC9.9", label: "Rack inlet compliance" },
      { value: "N / N+1", label: "CRAC redundancy analysis" }
    ],
    capsLabel: "HVAC CFD Design Services",
    capabilities: [
      "Thermal comfort & indoor air quality — airflow, temperature, humidity, pollutant dispersion",
      "Fire and smoke modeling for ventilation and suppression system design",
      "HVAC equipment design — fans, heat exchangers, ducting, pumps, compressors",
      "Carpark & tunnel ventilation, including CO control and jet-fan systems",
      "Industrial systems — process airflow balanced with occupant comfort (PMV/PPD, ADPI)"
    ],
    capabilityGroups: [
      {
        title: "Data Center CFD Design",
        text: "Hot-aisle / cold-aisle containment airflow optimisation, rack-level inlet temperature and hotspot prediction, CRAC/CRAH sizing, placement and redundancy (N, N+1), raised-floor plenum distribution, bypass and recirculation reduction, and cooling capacity validation for high-density rack and colocation environments."
      }
    ],
    standards: {
      intro: "ASHRAE compliance underpins the design and validation methodology:",
      groups: [
        {
          title: "Comfort & Air Quality",
          items: [
            "ASHRAE 55 — thermal environmental conditions (PMV/PPD, operative temperature)",
            "ASHRAE 62.1 — ventilation for acceptable indoor air quality",
            "ASHRAE 62.1-2007 — car park and enclosed-space CO/contaminant control"
          ]
        },
        {
          title: "Energy & Equipment",
          items: [
            "ASHRAE 90.1 — energy standard for buildings, HVAC equipment efficiency",
            "ASHRAE Fundamentals & Systems Handbooks — design load, duct and equipment sizing",
            "ASHRAE TC9.9 — data center thermal guidelines"
          ]
        }
      ]
    },
    benefits: {
      title: "Why Choose Sandeb Tech",
      items: [
        "Reliability — responsive engineering support and 24/7 emergency HVAC service",
        "Expertise — a decade of CFD, HVAC and fire/life-safety simulation experience",
        "Sustainability — energy-efficient designs that cut operating cost and impact",
        "Customer focus — comfort and safety from design through commissioning"
      ]
    },
    links: [
      { label: "Learn More", url: "/services/hvac" },
      { label: "Contact", url: "/contact" }
    ]
  },
  {
    id: "fire-safety",
    label: "Fire Safety",
    icon: Flame,
    image: fireImg,
    imageAlt: "Smoke movement and fire safety simulation",
    eyebrow: "PyroSim · Pathfinder . Ventus",
    title: "Fire and evacuation studies",
    summary:
      "SandebTech provides consultancy and training using PyroSim ,Ventus and Pathfinder, combining fire and smoke simulation with agent-based egress modeling to quantify life-safety risk and demonstrate code compliance. These simulation results feed directly into tenability criteria and evacuation strategies, supporting regulatory approvals where prescriptive code alone cannot.",
    detail:
      "Transient simulations resolve buoyancy-driven plumes, ceiling jets, and smoke layer descent, coupled with the mechanical smoke control system. Outputs — visibility distance, gas temperature, and toxic species concentration at occupant height — are compared against regulatory tenability limits over the required safe egress time.",
    stats: [
      { image: fireStat1, alt: "PyroSim Smoke Simulation", label: "PyroSim" },
      { image: fireStat2, alt: "Pathfinder Evacuation Simulation", label: "Pathfinder" },
      { image: fireStat3, alt: "Safety Margin Comparison", label: "Ventus" }
    ],
    capabilities: [
      "PyroSim — smoke, heat and toxicity prediction; Available Safe Egress Time (ASET)",
      "Pathfinder — occupant movement, bottleneck analysis; Required Safe Egress Time (RSET)",
      "ASET vs RSET safety-margin comparison and design mitigation recommendations",
      "High-rises, malls, tunnels, car parks, data centers, hospitals, stadiums",
      "Design fire definition, heat release rate curves and smoke layer descent",
      "Smoke control, extraction, and pressurization system sizing"
    ],
    standards: {
      intro: "Studies are aligned with the governing life-safety codes and guidance:",
      groups: [
        {
          title: "NFPA Standards",
          items: [
            "NFPA 101 — Life Safety Code",
            "NFPA 5000 — Building Construction and Safety Code",
            "NFPA 92 — Smoke Control Systems",
            "NFPA 130 — Fixed Guideway Transit and Passenger Rail"
          ]
        },
        {
          title: "Further Guidance",
          items: [
            "NFPA 502 — Road Tunnels, Bridges and Limited Access Highways",
            "NFPA 72 — National Fire Alarm and Signaling Code",
            "NFPA 88A — Parking Structures",
            "SFPE guidelines — performance-based fire protection design"
          ]
        }
      ]
    },
    links: [
      { label: "contact", url: "/contact" }
    ]
  },
 
];
