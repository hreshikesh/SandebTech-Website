package com.sandebTech.chatbot.service;

import org.springframework.stereotype.Service;

@Service
public class DomainService {

    public String detect(String question) {

        String q = question.toLowerCase();

        // Careers
        if (q.contains("career") || q.contains("job") || q.contains("hiring"))
            return "careers";

        // HVAC
        if (q.contains("hvac") || q.contains("ventilation") || q.contains("airflow")
                || q.contains("thermal comfort") || q.contains("cooling") || q.contains("building services"))
            return "hvac";

        // Maritime / Ship
        if (q.contains("maritime") || q.contains("ship") || q.contains("hull")
                || q.contains("vessel") || q.contains("marine") || q.contains("naval")
                || q.contains("propulsion") || q.contains("seakeeping") || q.contains("resistance")
                || q.contains("drag") || q.contains("wave") || q.contains("offshore"))
            return "maritime";

        // Lotus Marine
        if (q.contains("lotus"))
            return "lotus";

        // CAESES
        if (q.contains("caeses") || q.contains("parametric") || q.contains("geometry optimization")
                || q.contains("cad optimization"))
            return "caeses";

        // SHIPFLOW
        if (q.contains("shipflow"))
            return "shipflow";

        // Turbomachinery
        if (q.contains("turbomachinery") || q.contains("compressor") || q.contains("turbine")
                || q.contains("pump") || q.contains("fan") || q.contains("impeller")
                || q.contains("rotating equipment"))
            return "turbomachinery";

        // Fire Safety
        if (q.contains("fire") || q.contains("smoke") || q.contains("evacuation")
                || q.contains("pyrosim") || q.contains("fds") || q.contains("fire dynamics")
                || q.contains("smoke control") || q.contains("life safety"))
            return "firesafety";

        // Electronics Thermal
        if (q.contains("electronic") || q.contains("pcb") || q.contains("heat sink")
                || q.contains("data center") || q.contains("battery") || q.contains("electronics cooling")
                || q.contains("thermal management"))
            return "electronics";

        // Wind Engineering / AeroSim
        if (q.contains("wind") || q.contains("aerosim") || q.contains("wind tunnel")
                || q.contains("pedestrian comfort") || q.contains("facade pressure")
                || q.contains("wind engineering") || q.contains("les") || q.contains("lbm")
                || q.contains("lattice boltzmann") || q.contains("wind simulation")
                || q.contains("wind load") || q.contains("wind flow") || q.contains("urban wind")
                || q.contains("lawson") || q.contains("nen 8100") || q.contains("wind comfort")
                || q.contains("atmospheric boundary layer") || q.contains("vortex shedding")
                || q.contains("pollutant dispersion") || q.contains("gas dispersion"))
            return "wind";

        // CFD General
        if (q.contains("cfd") || q.contains("computational fluid") || q.contains("flow simulation")
                || q.contains("fluid dynamics") || q.contains("simulation"))
            return "cfd";

        // Tutorials & Documentation
        if (q.contains("tutorial") || q.contains("documentation") || q.contains("guide")
                || q.contains("manual") || q.contains("how to"))
            return "tutorials";

        // Training
        if (q.contains("training") || q.contains("course") || q.contains("workshop")
                || q.contains("pyrosim training") || q.contains("learn"))
            return "training";

        // News
        if (q.contains("news") || q.contains("update") || q.contains("announcement")
                || q.contains("latest"))
            return "news";

        // Company / General
        if (q.contains("about") || q.contains("company") || q.contains("sandebtech")
                || q.contains("who are you") || q.contains("location") || q.contains("bangalore")
                || q.contains("contact") || q.contains("email") || q.contains("phone")
                || q.contains("pricing") || q.contains("quote") || q.contains("meeting")
                || q.contains("appointment") || q.contains("schedule"))
            return "company";

        return "all";
    }
}