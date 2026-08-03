import React from "react";
import { Link } from "react-router-dom";
import {
  Newspaper,
  Tv,
  ArrowRight,
  Sparkles,
  BookOpen,
  Video,
  GraduationCap
} from "lucide-react";
import "./Resources.css";
import SEO from "../../components/seo/SEO";
export default function Resources() {
  return (
    <div className="resources-page">
      <SEO
        title="Engineering Simulation Resources, Tutorials & Training | SandebTech"
        description="Access SandebTech's knowledge hub for simulation insights, industry news, live webinars, technical tutorials, and professional training."
        keywords="CFD Resources, CAE Tutorials, Engineering Webinars, Simulation Training, SandebTech Knowledge Base"
        url="https://sandebtech.com/resources"
      />
      <section className="resources-hero">
        <div className="resources-hero-overlay"></div>
        <div className="resources-container hero-content">
          <span className="hero-badge">
            <Sparkles size={14} /> Knowledge &amp; Insights Hub
          </span>
          <h1>Explore Resources &amp; Stay Informed</h1>
          <p>
            Dive into our technical write-ups, industry announcements, and
            expert-led webinar masterclasses engineered to keep you ahead.
          </p>
        </div>
      </section>

      {/* ================= MAIN RESOURCE CARDS ================= */}
      <section className="resources-section">
        <div className="resources-container">
          <div className="resources-grid">

            {/* CARD 1: NEWS */}
            <div className="resource-card">
              <div className="card-header">
                <div className="icon-wrapper news-icon">
                  <Newspaper size={28} />
                </div>
                <span className="card-tag">Latest Updates</span>
              </div>

              <div className="card-body">
                <h2>News &amp; Articles</h2>
                <p>
                  Stay current with our latest product updates, press releases,
                  engineering breakthroughs, and tech insights.
                </p>

                <ul className="card-features">
                  <li>
                    <BookOpen size={16} /> Technical blogs &amp; release notes
                  </li>
                  <li>
                    <BookOpen size={16} /> Industry press &amp; company news
                  </li>
                </ul>
              </div>

              <div className="card-footer">
                <Link to="/resources/news" className="resource-btn news-btn">
                  <span>Explore News</span>
                  <ArrowRight size={18} className="btn-arrow" />
                </Link>
              </div>
            </div>

            {/* CARD 2: WEBINARS */}
            <div className="resource-card">
              <div className="card-header">
                <div className="icon-wrapper webinar-icon">
                  <Tv size={28} />
                </div>
                <span className="card-tag">On-Demand &amp; Live</span>
              </div>

              <div className="card-body">
                <h2>Webinars &amp; Workshops</h2>
                <p>
                  Watch interactive sessions, deep-dive technical masterclasses,
                  and live Q&amp;A panels hosted by domain experts.
                </p>

                <ul className="card-features">
                  <li>
                    <Video size={16} /> Hands-on software tutorials
                  </li>
                  <li>
                    <Video size={16} /> Live expert Q&amp;A recordings
                  </li>
                </ul>
              </div>

              <div className="card-footer">
                <Link to="/resources/webinar" className="resource-btn webinar-btn">
                  <span>Watch Webinars</span>
                  <ArrowRight size={18} className="btn-arrow" />
                </Link>
              </div>
            </div>

            {/* CARD 3: TUTORIALS & TRAINING */}
            <div className="resource-card">
              <div className="card-header">
                <div className="icon-wrapper tutorial-icon">
                  <GraduationCap size={28} />
                </div>
                <span className="card-tag">Official Docs</span>
              </div>

              <div className="card-body">
                <h2>Tutorials </h2>
                <p>
                  Step-by-step learning paths and official vendor documentation
                  for the simulation platforms we support.
                </p>

                <ul className="card-features">
                  <li>
                    <BookOpen size={16} /> SHIPFLOW CFD tutorials &amp; manuals
                  </li>
                  <li>
                    <BookOpen size={16} /> CAESES modelling &amp; optimization
                  </li>
                </ul>
              </div>

              <div className="card-footer">
                <Link
                  to="/resources/tutorials"
                  className="resource-btn tutorial-btn"
                >
                  <span>Start Learning</span>
                  <ArrowRight size={18} className="btn-arrow" />
                </Link>
              </div>
            </div>

            <div className="resource-card">
              <div className="card-header">
                <div className="icon-wrapper tutorial-icon">
                  <GraduationCap size={28} />
                </div>

              </div>

              <div className="card-body">
                <h2>Training </h2>


                <ul className="card-features">
                  <li>
                    <BookOpen size={16} /> Training By Experts
                  </li>
                  <li>
                    <BookOpen size={16} /> Focus on Learning
                  </li>
                </ul>
              </div>

              <div className="card-footer">
                <Link
                  to="/resources/training"
                  className="resource-btn tutorial-btn"
                >
                  <span>Start Learning</span>
                  <ArrowRight size={18} className="btn-arrow" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
