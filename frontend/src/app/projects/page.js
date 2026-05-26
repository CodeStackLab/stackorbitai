"use client";
import Link from "next/link";

export default function ProjectsPage() {
  const projects = [
    {
      id: "ai-crm-core",
      emoji: "📊",
      tag: "AI & Analytics",
      tagClass: "tag-badge",
      title: "AI-Driven CRM Core",
      desc: "Built an enterprise intelligence portal that analyzes sales pipeline activity and provides high-accuracy predictive lead churn metrics.",
      bullets: [
        "Churn prediction models using XGBoost + Python",
        "Interactive VisX custom analytics charts",
        "Real-time pipeline sync with HubSpot & Salesforce",
        "Role-based dashboards for sales & management teams",
      ],
      stack: "Next.js / FastAPI / Postgres",
      duration: "8 weeks",
      result: "40% reduction in lead churn rate",
    },
    {
      id: "programmatic-seo",
      emoji: "✍️",
      tag: "AI Automation",
      tagClass: "tag-badge",
      title: "Programmatic SEO Network",
      desc: "Formulated an autonomous network of niche authority blogs publishing 5,000 highly structured, factual, and fully optimized articles per day.",
      bullets: [
        "Fully customized n8n multi-step AI pipelines",
        "Automatic copyright-free image mapping via Unsplash",
        "Instant Google indexing verification via Search Console API",
        "Supports 20+ simultaneous niche blog publishing queues",
      ],
      stack: "n8n / OpenAI / WordPress API",
      duration: "4 weeks",
      result: "500K+ monthly organic impressions",
    },
    {
      id: "voice-ai-support",
      emoji: "📞",
      tag: "Conversational AI",
      tagClass: "tag-badge",
      title: "Omnichannel Voice AI Platform",
      desc: "Constructed a custom voice assistant that seamlessly books meetings, conducts intake questionnaires, and processes live caller data.",
      bullets: [
        "Ultra-low latency voice responses under 500ms",
        "Auto-schedule meeting bookings via Cal.com integration",
        "Twilio SIP trunking & RetellAI STT/TTS engine",
        "Sentiment analysis and live call summary generation",
      ],
      stack: "Node.js / Twilio / RetellAI",
      duration: "6 weeks",
      result: "70% faster client onboarding",
    },
    {
      id: "cloudscale-scraper",
      emoji: "🔍",
      tag: "Data Engineering",
      tagClass: "tag-badge",
      title: "CloudScale Scraper Network",
      desc: "Created a cloud-native scraper network capturing dynamic prices for over 100,000 retail SKUs every day without any blocks.",
      bullets: [
        "Automatic browser fingerprint spoofing per request",
        "Redis-backed queue coordination architecture",
        "Integrated commercial captcha solving API modules",
        "Structured data export directly to PostgreSQL + S3",
      ],
      stack: "Puppeteer / Redis / Docker",
      duration: "5 weeks",
      result: "100K+ SKUs tracked daily",
    },
    {
      id: "mobile-fintech",
      emoji: "💳",
      tag: "Mobile App",
      tagClass: "tag-badge",
      title: "FinTrack Mobile App",
      desc: "Developed a sleek cross-platform personal finance tracker app with biometric auth, AI spending insights, and investment portfolio sync.",
      bullets: [
        "React Native + Expo with offline-first architecture",
        "Plaid API bank account & transaction sync",
        "AI-powered monthly spending categorization insights",
        "Face ID / Touch ID biometric authentication",
      ],
      stack: "React Native / Expo / Plaid API",
      duration: "10 weeks",
      result: "4.8★ on App Store",
    },
    {
      id: "ecommerce-automation",
      emoji: "🛒",
      tag: "eCommerce AI",
      tagClass: "tag-badge",
      title: "eCommerce AI Operations Hub",
      desc: "Built a full AI operations layer for a mid-size eCommerce brand — automating order routing, returns processing, and customer support.",
      bullets: [
        "AI triage for 2,000+ daily support tickets via GPT-4o",
        "Auto-routing of orders across 3 fulfillment centers",
        "Shopify + WooCommerce webhook integration layer",
        "Weekly AI performance reports sent via Slack digest",
      ],
      stack: "Node.js / Shopify API / OpenAI",
      duration: "7 weeks",
      result: "60% reduction in support workload",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--col-bg)", color: "var(--col-text)" }}>
      {/* Animated background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navbar */}
      <nav id="navbar" style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" className="nav-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none" }} aria-label="StackOrbitAI Home">
          <svg viewBox="0 0 24 24" style={{ width: "32px", height: "32px", marginRight: "10px", filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" }}>
            <defs>
              <linearGradient id="logo-grad-proj" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" fill="none" stroke="url(#logo-grad-proj)" strokeWidth="2" strokeDasharray="32 4" />
            <circle cx="12" cy="12" r="4" fill="url(#logo-grad-proj)" />
            <circle cx="20" cy="7" r="1.5" fill="#22d3ee" />
          </svg>
          <span style={{ fontSize: "1.45rem", fontWeight: "800", letterSpacing: "-0.03em", fontFamily: "var(--font-space)", display: "inline-flex", alignItems: "center" }}>
            <span style={{ color: "#fff" }}>Stack</span>
            <span style={{ background: "linear-gradient(135deg, #60a5fa 10%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Orbit</span>
            <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: "900" }}>AI</span>
            <span style={{ color: "#06b6d4", fontSize: "1.6rem", lineHeight: "1", marginLeft: "2px", animation: "blink 1.5s infinite alternate" }}>•</span>
          </span>
        </Link>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#features">Features</Link></li>
          <li><Link href="/#showcase">Showcase</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/#pricing">Pricing</Link></li>
        </ul>
        <div className="nav-cta">
          <Link href="/" className="btn btn-ghost">← Back Home</Link>
        </div>
      </nav>

      {/* Page Header */}
      <section style={{ padding: "100px 6% 60px", textAlign: "center" }}>
        <div className="section-tag">Portfolio</div>
        <h1 className="section-title" style={{ marginBottom: "20px" }}>Our Realized Projects</h1>
        <p className="section-sub" style={{ margin: "0 auto", maxWidth: "640px" }}>
          Real production-grade systems delivered for global clients — from AI SaaS platforms to automated scraper networks and voice AI bots.
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", marginTop: "48px", flexWrap: "wrap" }}>
          {[
            { label: "Projects Delivered", value: "50+" },
            { label: "Countries Served", value: "12+" },
            { label: "Client Satisfaction", value: "98%" },
            { label: "Lines of Code", value: "2M+" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", fontFamily: "var(--font-space)", background: "linear-gradient(135deg, #60a5fa 0%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--col-muted)", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: "0 6% 120px" }}>
        <div className="showcase-grid">
          {projects.map((p) => (
            <div className="showcase-card reveal" key={p.id} id={p.id}>
              <div className="showcase-card-header">
                <span className={`card-tag ${p.tagClass}`}>{p.tag}</span>
                <span className="showcase-card-emoji">{p.emoji}</span>
              </div>
              <h2 className="showcase-card-title">{p.title}</h2>
              <p className="showcase-card-desc">{p.desc}</p>
              <ul className="showcase-card-bullet-list">
                {p.bullets.map((b) => (
                  <li key={b}><span>⚡</span>{b}</li>
                ))}
              </ul>
              {/* Result highlight */}
              <div style={{ background: "rgba(6, 182, 212, 0.06)", border: "1px solid rgba(6, 182, 212, 0.15)", borderRadius: "12px", padding: "12px 16px", marginBottom: "20px", fontSize: "0.85rem" }}>
                <span style={{ color: "#22d3ee", fontWeight: "700" }}>✅ Result: </span>
                <span style={{ color: "#d1d5db" }}>{p.result}</span>
              </div>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.78rem", color: "var(--col-muted)" }}>
                  🕐 {p.duration} &nbsp;|&nbsp; {p.stack}
                </span>
                <Link href="/#showcase" className="btn-card-cta">View Details →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "80px 6%", textAlign: "center", background: "var(--col-bg2)", borderTop: "1px solid var(--col-border)" }}>
        <h2 className="section-title" style={{ marginBottom: "16px" }}>Ready to Build Your Project?</h2>
        <p style={{ color: "var(--col-muted)", marginBottom: "32px", fontSize: "1rem" }}>
          7-day free trial. Pay only after you are 100% satisfied.
        </p>
        <Link href="/#cta" className="btn btn-primary" style={{ fontSize: "1rem", padding: "14px 32px" }}>
          Start Free Today →
        </Link>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-top">
          <div>
            <p style={{ color: "var(--col-muted)", fontSize: "0.88rem", lineHeight: "1.6", maxWidth: "240px" }}>
              Deploy cutting-edge AI and full-stack software architectures to scale business productivity.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="/#showcase">Showcase Hub</Link></li>
              <li><Link href="/products">Our Products</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4>Case Studies</h4>
            <ul className="footer-links">
              <li><a href="#ai-crm-core">AI CRM Core</a></li>
              <li><a href="#programmatic-seo">Programmatic SEO</a></li>
              <li><a href="#voice-ai-support">Voice AI Platform</a></li>
              <li><a href="#cloudscale-scraper">CloudScale Scraper</a></li>
              <li><a href="#mobile-fintech">FinTrack App</a></li>
              <li><a href="#ecommerce-automation">eCommerce AI Hub</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul className="footer-links">
              <li style={{ color: "var(--col-muted)", fontSize: "0.85rem" }}>📩 Business Inquiry:</li>
              <li><a href="mailto:hello@stackorbitai.com" style={{ color: "#fff", fontWeight: "600" }}>hello@stackorbitai.com</a></li>
              <li style={{ color: "var(--col-muted)", fontSize: "0.85rem", marginTop: "12px" }}>🛠️ Support:</li>
              <li><a href="mailto:support@stackorbitai.com" style={{ color: "#fff", fontWeight: "600" }}>support@stackorbitai.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          © {new Date().getFullYear()} StackOrbitAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
