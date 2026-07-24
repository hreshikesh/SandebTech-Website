import React from "react";
import "./AboutCompany.css";
import { CheckCircle2, Building2 } from "lucide-react";

import msmeLogo from "../../assets/images/about/msme.webp";
import gemLogo from "../../assets/images/about/gem.webp";


function AboutCompany() {
  return (
    <section className="about-company">
      <div className="container">
        
        {/* Centered Top Header */}
        <div className="company-header">
          <span className="section-badge">GOVERNMENT COMPLIANCE & RECOGNITION</span>
          <h2>Officially Registered & Government Recognized Enterprise</h2>
          <p>
            SandebTech operates in full compliance with government standards, holds active registrations with MSME (Udyam), and is an authorized vendor on the Government e-Marketplace (GeM).
          </p>
        </div>

        {/* Dual Certification Cards */}
        <div className="cert-cards-grid">
          
          {/* MSME Card */}
          <div className="cert-card">
            <div className="cert-card-header">
              <div className="cert-icon-wrapper msme-bg">
                <img src={msmeLogo} alt="MSME Logo" className="cert-logo-img" />
              </div>
              <div className="cert-card-title">
                <h3>MSME (Udyam) Registered</h3>
                <span className="status-pill">Active Registration</span>
              </div>
            </div>
            
            <p className="cert-card-body">
              Registered under the Ministry of Micro, Small & Medium Enterprises (Government of India). Recognized for structured operations, quality service delivery, and industrial compliance.
            </p>

            <ul className="cert-features">
              <li>
                <CheckCircle2 size={16} />
                <span>Udyam Registered Enterprise</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>Eligible for Public Sector Tenders</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>Compliant with Statutory Standards</span>
              </li>
            </ul>
          </div>

          {/* GeM Card */}
          <div className="cert-card">
            <div className="cert-card-header">
              <div className="cert-icon-wrapper gem-bg">
                <img src={gemLogo} alt="GeM Logo" className="cert-logo-img" />
              </div>
              <div className="cert-card-title">
                <h3>GeM Portal Seller</h3>
                <span className="status-pill">Verified Vendor</span>
              </div>
            </div>

            <p className="cert-card-body">
              Verified vendor on the Government e-Marketplace (GeM) portal, enabling seamless procurement for central/state government departments, PSUs, and autonomous bodies.
            </p>

            <ul className="cert-features">
              <li>
                <CheckCircle2 size={16} />
                <span>Direct Public Procurement Authorization</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>Verified Credentials & Commercial Standing</span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>Transparent & Compliant Operations</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Showcase Banner */}
        

      </div>
    </section>
  );
}

export default AboutCompany;