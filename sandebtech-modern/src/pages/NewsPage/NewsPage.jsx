import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Filter,
  Newspaper,
  Calendar,
  Layers,
  Cpu,
  Wind,
  Ship,
  Flame,
  Cloud,
  RefreshCw
} from "lucide-react";
import "./NewsPage.css";
import SEO from "../../components/seo/SEO";
import { rawNewsData } from "../../data/rawNewsData";
const categories = [
  { id: "all", name: "All News" },
  { id: "SHIPFLOW", name: "SHIPFLOW", icon: Ship },
  { id: "CAESES", name: "CAESES", icon: Layers },
  { id: "TCAE", name: "TCAE", icon: Cpu },

];

export default function NewsPage() {
  const [newsData, setNewsData] = useState(rawNewsData);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Simulate Fetch/Refresh trigger for dynamic UX feel
  const handleRefreshFeed = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 600);
  };

  // Live Filter Logic
  const filteredNews = useMemo(() => {
    return newsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.product.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [newsData, selectedCategory, searchQuery]);

  // Featured Item Selection
  const featuredItem = useMemo(() => {
    return newsData.find((item) => item.featured) || newsData[0];
  }, [newsData]);

  return (
    <main className="news-page">
      <SEO
        title="Latest Engineering & Company News | SandebTech"
        description="Stay up to date with product releases, industry insights, events, and company announcements from SandebTech."
        keywords="SandebTech News, CFD Industry Insights, Engineering Simulation Updates, Software Releases"
        url="https://sandebtech.com/resources/news"
      />
      <header className="news-hero">
        <div className="hero-glow-orb orb-1"></div>
        <div className="hero-glow-orb orb-2"></div>
        <div className="container">
          <div className="hero-content">

            <h1>Product News & Technical Releases</h1>
            <p>
              Stay up to date with official releases, technical documentation, and product breakthroughs directly from primary engineering portals.
            </p>

            {/* Search Bar */}
            <div className="news-search-box">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search releases, products (e.g. CAESES, TCAE)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container main-content-wrapper">
        {/* -------------------------------------------------------------
            2. FEATURED NEWS HIGHLIGHT BANNER
           ------------------------------------------------------------- */}
        {!loading && selectedCategory === "all" && !searchQuery && featuredItem && (
          <section className="featured-news-section">
            <div className="featured-card">
              <div className="featured-tag-strip">
                <span className="live-pill">
                  <span className="pulse-dot"></span> Featured Announcement
                </span>
                <span className="featured-date">
                  <Calendar size={14} /> {featuredItem.date}
                </span>
              </div>

              <div className="featured-body">
                <h2>{featuredItem.title}</h2>
                <p>{featuredItem.description}</p>

                <div className="featured-footer">
                  <div className="tags-container">
                    {featuredItem.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={featuredItem.newsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-featured-link"
                  >
                    <span>Read on Official Site</span>
                    <ArrowUpRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------
            3. PRODUCT CATEGORY FILTER TABS
           ------------------------------------------------------------- */}
        <section className="filter-tabs-section">
          <div className="filter-header">
            <div className="filter-label">
              <Filter size={18} />
              <span>Filter by Software Suite</span>
            </div>
            <div className="filter-meta-actions">
              <button className="refresh-action-btn" onClick={handleRefreshFeed} title="Refresh Feed">
                <RefreshCw size={14} className={loading ? "spin-icon" : ""} />
                <span>Refresh</span>
              </button>
              <span className="results-count">
                Showing {filteredNews.length} {filteredNews.length === 1 ? "article" : "articles"}
              </span>
            </div>
          </div>

          <div className="filter-tabs-grid">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`tab-btn ${selectedCategory === cat.id ? "active" : ""
                    }`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {Icon && <Icon size={16} />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* -------------------------------------------------------------
            4. RESPONSIVE NEWS GRID / SKELETONS
           ------------------------------------------------------------- */}
        <section className="news-grid-section">
          {loading ? (
            <div className="news-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div className="news-card skeleton-card" key={n}>
                  <div className="sk-line sk-header"></div>
                  <div className="sk-line sk-title"></div>
                  <div className="sk-line sk-desc"></div>
                  <div className="sk-line sk-btn"></div>
                </div>
              ))}
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="news-grid">
              {filteredNews.map((item) => {
                const ItemIcon = item.icon || Newspaper;
                return (
                  <article className="news-card" key={item.id}>
                    <div className="news-card-header">
                      <div className="product-badge">
                        <ItemIcon size={15} />
                        <span>{item.product}</span>
                      </div>
                      <span className="news-date">{item.date}</span>
                    </div>

                    <div className="news-card-body">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>

                    <div className="card-tags">
                      {item.tags.map((t) => (
                        <span key={t} className="card-tag">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div className="news-card-footer">
                      <a
                        href={item.newsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-external-btn"
                      >
                        <span>Visit {item.product} Official News</span>
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="no-results-card">
              <Newspaper size={48} />
              <h3>No news articles found</h3>
              <p>Try entering a different query or resetting your category filter.</p>
              <button
                className="reset-filter-btn"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* -------------------------------------------------------------
            5. DIRECT OFFICIAL PORTAL ACCESS BANNER
           ------------------------------------------------------------- */}
        <section className="quick-links-banner">
          <div className="banner-content">
            <div className="banner-text">
              <h3>Official Product News Portals</h3>
              <p>Access primary external release feeds and technical blogs directly.</p>
            </div>
            <div className="quick-buttons">
              <a href="https://shipflow.se/products-overview/" target="_blank" rel="noopener noreferrer" className="quick-badge">
                <Ship size={15} /><span>SHIPFLOW Portal</span>
              </a>
              <a href="https://www.friendship-systems.com/" target="_blank" rel="noopener noreferrer" className="quick-badge">
                <Layers size={15} /><span>CAESES / Maya HTT</span>
              </a>
              <a href="https://www.cfdsupport.com/news/" target="_blank" rel="noopener noreferrer" className="quick-badge">
                <Cpu size={15} /><span>TCAE Portal</span>
              </a>

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}