import React from "react";
import { Link } from "react-router-dom";
import { Newspaper, Tv, ArrowRight, Sparkles, BookOpen, Video } from "lucide-react";
import "./Resources.css";

export default function Resources() {
  return (
    <div className="resources-page">
      {/* ================= HERO BANNER ================= */}
      <section className="resources-hero">
        <div className="resources-hero-overlay"></div>
        <div className="resources-container hero-content">
          <span className="hero-badge">
            <Sparkles size={14} /> Knowledge & Insights Hub
          </span>
          <h1>Explore Resources & Stay Informed</h1>
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
                <h2>News & Articles</h2>
                <p>
                  Stay current with our latest product updates, press releases, 
                  engineering breakthroughs, and tech insights.
                </p>

                <ul className="card-features">
                  <li>
                    <BookOpen size={16} /> Technical blogs & release notes
                  </li>
                  <li>
                    <BookOpen size={16} /> Industry press & company news
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
                <span className="card-tag">On-Demand & Live</span>
              </div>

              <div className="card-body">
                <h2>Webinars & Workshops</h2>
                <p>
                  Watch interactive sessions, deep-dive technical masterclasses, 
                  and live Q&A panels hosted by domain experts.
                </p>

                <ul className="card-features">
                  <li>
                    <Video size={16} /> Hands-on software tutorials
                  </li>
                  <li>
                    <Video size={16} /> Live expert Q&A recordings
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

          </div>
        </div>
      </section>
    </div>
  );
}