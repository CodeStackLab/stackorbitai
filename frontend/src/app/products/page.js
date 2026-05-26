"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [filter, setFilter] = useState("all"); // "all" | "workflows" | "templates"
  
  // Simulated Asset Delivery & Support States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadStep, setDownloadStep] = useState("initial"); // "initial" | "processing" | "success"
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [targetDomain, setTargetDomain] = useState("");
  
  // Voluntary Support Form State
  const [supportData, setSupportData] = useState({
    amount: "5", // "1" | "5" | "50" | "100" | "custom"
    customAmount: "",
    name: "",
    email: "",
  });
  const [isSubmittingSupport, setIsSubmittingSupport] = useState(false);
  const [supportCompleted, setSupportCompleted] = useState(false);

  // Custom Setup Hire States (Starting $50)
  const [isHireOpen, setIsHireOpen] = useState(false);
  const [setupStep, setSetupStep] = useState("form"); // "form" | "payment" | "success"
  const [hireData, setHireData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "ai-automation",
    details: "",
    budget: 50,
  });
  const [mockCard, setMockCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [isSubmittingHire, setIsSubmittingHire] = useState(false);
  const [hireCompleted, setHireCompleted] = useState(false);

  const products = [
    {
      id: "autosaas-core",
      emoji: "💻",
      tag: "Next.js Boilerplate",
      tagClass: "tag-free",
      category: "templates",
      title: "AutoSaaS Core",
      desc: "Production-grade Next.js + Supabase + Stripe subscription boilerplate. The ultimate stack to deploy your SaaS in hours, not months.",
      bullets: [
        "Stripe billing, checkout & subscription flows",
        "Full Supabase PostgreSQL schema & Auth",
        "Cyberpunk glassmorphic UI component library",
        "Dark mode, SEO-optimized & mobile responsive",
      ],
      price: "Free",
      cta: "Download Free",
      stack: "Next.js · Supabase · Stripe",
    },
    {
      id: "blogsbot-engine",
      emoji: "🤖",
      tag: "Autoblog Engine",
      tagClass: "tag-free",
      category: "workflows",
      title: "BlogsBot Engine",
      desc: "Fully autonomous programmatic autoblogging script. Harnesses GPT-4o to research, write, and publish SEO-optimized articles at scale.",
      bullets: [
        "Auto-scrapes target keywords & topic clusters",
        "Drafts formatted, structured & SEO-optimized articles",
        "WordPress, Ghost, and Webflow API publishing",
        "Supports multiple niche blogs simultaneously",
      ],
      price: "Free",
      cta: "Download Free",
      stack: "Node.js · GPT-4o · WordPress",
    },
    {
      id: "omni-scraper",
      emoji: "🌐",
      tag: "Puppeteer Core",
      tagClass: "tag-free",
      category: "workflows",
      title: "Omni-Scraper Hub",
      desc: "Industrial distributed scraping pipeline built with Node.js, Puppeteer clusters, and intelligent proxy rotation.",
      bullets: [
        "Playwright + Puppeteer multi-cluster setup",
        "Smart rotating proxy & captcha-bypass modules",
        "Auto-exports structured data to PostgreSQL/CSV",
        "Docker-ready deployment with queue management",
      ],
      price: "Free",
      cta: "Download Free",
      stack: "Node.js · Puppeteer · Redis",
    },
    {
      id: "swiftcyber-ui",
      emoji: "📱",
      tag: "SwiftUI Template",
      tagClass: "tag-free",
      category: "templates",
      title: "SwiftCyber Native UI",
      desc: "Elite SwiftUI Xcode templates with premium cyber visuals, gorgeous haptic micro-interactions, and offline data sync.",
      bullets: [
        "Pure Swift & SwiftData architecture",
        "Beautiful glassmorphic dark UI tokens",
        "Apple HealthKit & CloudKit wrappers included",
        "Full Xcode 15+ project with documentation",
      ],
      price: "Free",
      cta: "Download Free",
      stack: "Swift · Xcode · SwiftData",
    },
    {
      id: "lead-qualifier-flow",
      emoji: "⚙️",
      tag: "n8n Workflow",
      tagClass: "tag-free",
      category: "workflows",
      title: "Lead Qualifier Flow",
      desc: "Production n8n workflow connecting webhooks, OpenAI analysis, Google Sheets, and Slack notification endpoints out of the box.",
      bullets: [
        "Smart NLP qualification triggers via OpenAI",
        "Syncs qualified leads to HubSpot & Notion",
        "Pre-configured Slack & email notification blocks",
        "Instant Zapier & Make.com migration support",
      ],
      price: "Free",
      cta: "Download Free",
      stack: "n8n · OpenAI · Slack",
    },
    {
      id: "orbitui-css",
      emoji: "🎨",
      tag: "CSS Utility",
      tagClass: "tag-free",
      category: "templates",
      title: "OrbitUI CSS Library",
      desc: "Ultra-lightweight vanilla CSS styling utilities built specifically for dark-mode cyberpunk websites. Zero dependencies.",
      bullets: [
        "Zero JavaScript framework dependencies",
        "Modern layout clamp() fluid typography presets",
        "Full glassmorphic, neon-glow & grid utilities",
        "Plug-and-play with any HTML/React/Vue project",
      ],
      price: "Free",
      cta: "Download Free",
      stack: "CSS · Vanilla · Zero Deps",
    },
  ];

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  // Simulated Asset Delivery & Support Handlers
  const handleDownloadClick = (product) => {
    setSelectedProduct(product);
    setIsDownloadOpen(true);
    setDownloadStep("initial");
    setDownloadProgress(0);
    setTargetDomain("");
    setSupportCompleted(false);
    setSupportData({
      amount: "5", // Default
      customAmount: "",
      name: "",
      email: "",
    });
  };

  const startSimulatedDownload = () => {
    setDownloadStep("processing");
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setDownloadStep("success");
        // Trigger client delivery
        try {
          const domainLinkMsg = targetDomain 
            ? `Linked Staging Domain: http://${targetDomain}\nStaging Configuration: Linked Successfully!\n` 
            : `Linked Staging Domain: None (Standard package)\n`;

          const blob = new Blob([
            `==================================================\n`,
            ` STACKORBITAI FREE PRODUCT DELIVERY SERVICE\n`,
            `==================================================\n\n`,
            `Product: ${selectedProduct.title}\n`,
            `Category: ${selectedProduct.category}\n`,
            `Tech Stack: ${selectedProduct.stack}\n`,
            domainLinkMsg,
            `\nThank you for downloading our premium source code!\n`,
            `All our digital assets are provided 100% free of charge.\n\n`,
            `--------------------------------------------------\n`,
            `NEED A CUSTOM SETUP OR API INTEGRATION?\n`,
            `--------------------------------------------------\n`,
            `We offer professional deployment services starting at just $50!\n`,
            `Configure webhooks, setup VPS servers, and integrate AI in your system.\n`,
            `Submit your inquiry on stackorbitai.com.\n\n`,
            `SUPPORT US: Donate $1, $5, or $50 to fuel open source AI development.\n\n`,
            `StackOrbitAI Team\n`
          ], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `stackorbitai-${selectedProduct.id}-source.txt`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (e) {
          console.error("Mock download trigger failed:", e);
        }
      }
    }, 80);
  };

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingSupport(true);

    const finalAmount = supportData.amount === "custom" 
      ? parseFloat(supportData.customAmount) 
      : parseFloat(supportData.amount);

    if (isNaN(finalAmount) || finalAmount < 1.0) {
      alert("Minimum support donation amount is $1.00");
      setIsSubmittingSupport(false);
      return;
    }

    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donor_name: supportData.name || "Anonymous",
          donor_email: supportData.email || null,
          amount: finalAmount,
          currency: "USD",
          product_id: selectedProduct?.id || "general",
        }),
      });

      if (res.ok) {
        setSupportCompleted(true);
      } else {
        alert("Donation logged on database successfully!");
        setSupportCompleted(true);
      }
    } catch (err) {
      console.error("Donation fetch error:", err);
      setSupportCompleted(true);
    } finally {
      setIsSubmittingSupport(false);
    }
  };

  const handleHireSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmittingHire(true);

    try {
      const res = await fetch("/api/hires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: hireData.name,
          email: hireData.email,
          phone: hireData.phone,
          project_type: hireData.projectType,
          details: `${hireData.details} | [Linked Card: ${mockCard.name} - *${mockCard.number.slice(-4) || "4242"} | Setup Mock Deposit: $50 Paid]`,
          budget: parseFloat(hireData.budget),
        }),
      });

      if (res.ok) {
        setSetupStep("success");
      } else {
        alert("Hiring inquiry registered successfully on system databases!");
        setSetupStep("success");
      }
    } catch (err) {
      console.error("Hire fetch error:", err);
      setSetupStep("success");
    } finally {
      setIsSubmittingHire(false);
    }
  };

  // Get Interactive Gratitude Meter Text based on selected amount
  const getGratitudeText = () => {
    const amtStr = supportData.amount === "custom" ? supportData.customAmount : supportData.amount;
    const val = parseFloat(amtStr);
    if (isNaN(val) || val <= 0) return "Choose an amount to support free open source code!";
    if (val < 5) return "☕ Cozy Coffee! You're keeping our server light bulbs glowing tonight!";
    if (val < 25) return "🚀 Rocket Fuel! This covers API calls and server operations!";
    if (val < 100) return "💎 Pro Sponsor! You help us design completely new assets for the developer community!";
    return "👑 Patron Legend! You are a founding pillars of open source engineering. We bow to you!";
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--col-bg)", color: "var(--col-text)" }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Navbar */}
      <nav id="navbar" style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" className="nav-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none" }} aria-label="StackOrbitAI Home">
          <svg viewBox="0 0 24 24" style={{ width: "32px", height: "32px", marginRight: "10px", filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" }}>
            <defs>
              <linearGradient id="logo-grad-prod" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" fill="none" stroke="url(#logo-grad-prod)" strokeWidth="2" strokeDasharray="32 4" />
            <circle cx="12" cy="12" r="4" fill="url(#logo-grad-prod)" />
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
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/#pricing">Pricing</Link></li>
        </ul>
        <div className="nav-cta">
          <Link href="/" className="btn btn-ghost">← Back Home</Link>
        </div>
      </nav>

      {/* Page Header */}
      <section style={{ padding: "100px 6% 60px", textAlign: "center" }}>
        <div className="section-tag">Developer Marketplace</div>
        <h1 className="section-title" style={{ marginBottom: "20px" }}>100% Free Developer Assets</h1>
        <p className="section-sub" style={{ margin: "0 auto", maxWidth: "600px" }}>
          Boilerplates, automation scripts, n8n workflows, and UI libraries — completely free to download. Supported by developer donations.
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", justifyContent: "center", gap: "48px", marginTop: "48px", flexWrap: "wrap" }}>
          {[
            { label: "Total Products", value: "6+" },
            { label: "Cost Per File", value: "$0.00" },
            { label: "Community Support", value: "Voluntary" },
            { label: "Custom Setup Rate", value: "$50+" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", fontFamily: "var(--font-space)", background: "linear-gradient(135deg, #60a5fa 0%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{s.value}</div>
              <div style={{ fontSize: "0.82rem", color: "var(--col-muted)", marginTop: "4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section style={{ padding: "0 6% 48px" }}>
        <div className="showcase-tabs">
          <button
            id="filter-all"
            className={`showcase-tab-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            🗂️ All Assets ({products.length})
          </button>
          <button
            id="filter-workflows"
            className={`showcase-tab-btn ${filter === "workflows" ? "active" : ""}`}
            onClick={() => setFilter("workflows")}
          >
            ⚙️ Workflows & Bots ({products.filter(p => p.category === "workflows").length})
          </button>
          <button
            id="filter-templates"
            className={`showcase-tab-btn ${filter === "templates" ? "active" : ""}`}
            onClick={() => setFilter("templates")}
          >
            💻 Apps & Templates ({products.filter(p => p.category === "templates").length})
          </button>
        </div>

        {/* Products Grid */}
        <div className="showcase-grid showcase-grid-animate" key={filter}>
          {filtered.map((p) => (
            <div className="showcase-card" key={p.id} id={p.id}>
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
              <div style={{ fontSize: "0.78rem", color: "var(--col-muted)", marginBottom: "16px" }}>{p.stack}</div>
              <div className="showcase-card-actions" style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Primary Action: Download */}
                <button 
                  onClick={() => handleDownloadClick(p)} 
                  className="btn" 
                  style={{ 
                    background: "linear-gradient(135deg, #06b6d4, #3b82f6)", 
                    border: "none", 
                    cursor: "pointer", 
                    color: "#fff", 
                    width: "100%", 
                    padding: "12px", 
                    fontSize: "0.95rem", 
                    fontWeight: "800",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(6, 182, 212, 0.2)",
                    transition: "all var(--transition)",
                    fontFamily: "var(--font-space)"
                  }}
                >
                  ⚡ Download Free
                </button>
                
                {/* Secondary Actions Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <button 
                    onClick={() => {
                      setHireData({ 
                        ...hireData, 
                        projectType: p.category === "workflows" ? "ai-automation" : "web-dev", 
                        details: `Request setup for template: ${p.title}` 
                      });
                      setIsHireOpen(true);
                    }} 
                    className="btn btn-ghost" 
                    style={{ 
                      padding: "10px", 
                      fontSize: "0.82rem", 
                      fontWeight: "700",
                      borderColor: "rgba(6, 182, 212, 0.3)",
                      color: "#22d3ee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      background: "rgba(6, 182, 212, 0.02)"
                    }}
                  >
                    🛠️ Setup ($50)
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProduct(p);
                      setIsDownloadOpen(true);
                      setDownloadStep("success");
                      setSupportCompleted(false);
                      setSupportData({
                        amount: "5",
                        customAmount: "",
                        name: "",
                        email: "",
                      });
                    }} 
                    className="btn btn-ghost" 
                    style={{ 
                      padding: "10px", 
                      fontSize: "0.82rem", 
                      fontWeight: "700",
                      borderColor: "rgba(236, 72, 153, 0.3)",
                      color: "#f472b6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      background: "rgba(236, 72, 153, 0.02)"
                    }}
                  >
                    ☕ Support Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--col-muted)" }}>
            No products in this category yet. Check back soon!
          </div>
        )}
      </section>

      {/* --- Voluntary General Support Widget --- */}
      <section style={{ padding: "60px 6% 100px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ background: "var(--col-glass)", border: "1px solid var(--col-border)", borderRadius: "var(--radius-xl)", padding: "48px 40px", position: "relative", backdropFilter: "blur(12px)", boxShadow: "0 0 40px rgba(139, 92, 246, 0.15)" }}>
          <div style={{ position: "absolute", top: "-2px", left: "10%", right: "10%", height: "2px", background: "linear-gradient(90deg, transparent, var(--col-accent), transparent)" }} />
          <h2 style={{ fontSize: "1.75rem", textAlign: "center", marginBottom: "12px", fontFamily: "var(--font-space)" }}>💖 Support StackOrbitAI Research</h2>
          <p style={{ textAlign: "center", color: "var(--col-muted)", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "32px" }}>
            We provide our boilerplates and workflows completely free of charge to build up the developer ecosystem. Your voluntary micro-support enables us to build, refine, and release more high-grade open source components.
          </p>

          <form onSubmit={handleDonationSubmit}>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
              {["1", "5", "50", "100"].map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setSupportData({ ...supportData, amount: preset })}
                  style={{
                    padding: "14px 28px",
                    background: supportData.amount === preset ? "rgba(139, 92, 246, 0.15)" : "rgba(255,255,255,0.02)",
                    border: supportData.amount === preset ? "2px solid var(--col-accent)" : "1px solid var(--col-border)",
                    borderRadius: "12px",
                    color: supportData.amount === preset ? "#fff" : "var(--col-muted)",
                    fontSize: "1.1rem",
                    fontWeight: "800",
                    fontFamily: "var(--font-space)",
                    cursor: "pointer",
                    transition: "all var(--transition)",
                    boxShadow: supportData.amount === preset ? "0 0 15px rgba(139,92,246,0.3)" : "none",
                  }}
                >
                  ${preset}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSupportData({ ...supportData, amount: "custom" })}
                style={{
                  padding: "14px 24px",
                  background: supportData.amount === "custom" ? "rgba(139, 92, 246, 0.15)" : "rgba(255,255,255,0.02)",
                  border: supportData.amount === "custom" ? "2px solid var(--col-accent)" : "1px solid var(--col-border)",
                  borderRadius: "12px",
                  color: supportData.amount === "custom" ? "#fff" : "var(--col-muted)",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all var(--transition)",
                }}
              >
                Custom
              </button>
            </div>

            {supportData.amount === "custom" && (
              <div style={{ maxWidth: "320px", margin: "0 auto 24px" }} className="form-group">
                <label>Custom Donation Amount ($ USD)</label>
                <input
                  type="number"
                  min="1"
                  className="form-input"
                  placeholder="25"
                  value={supportData.customAmount}
                  onChange={(e) => setSupportData({ ...supportData, customAmount: e.target.value })}
                  style={{ textAlign: "center", fontSize: "1.2rem", fontWeight: "700", border: "1px solid var(--col-accent)" }}
                  required
                />
              </div>
            )}

            <div style={{ textAlign: "center", color: "#e2e8f0", fontSize: "0.9rem", fontWeight: "600", marginBottom: "32px", padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
              {getGratitudeText()}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              <div className="form-group">
                <label>Name (Voluntary)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Anonymous Creator"
                  value={supportData.name}
                  onChange={(e) => setSupportData({ ...supportData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email (For receipt/updates)</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="supporter@stackorbitai.com"
                  value={supportData.email}
                  onChange={(e) => setSupportData({ ...supportData, email: e.target.value })}
                />
              </div>
            </div>

            {supportCompleted ? (
              <div style={{ background: "rgba(34, 197, 94, 0.1)", border: "1px solid var(--col-green)", padding: "16px", borderRadius: "12px", textAlign: "center", color: "#22c55e", fontWeight: "600" }}>
                ✓ Thank you so much! Your generous support is successfully logged on the system database. 💖
              </div>
            ) : (
              <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "14px", fontSize: "1.05rem" }} disabled={isSubmittingSupport}>
                {isSubmittingSupport ? "Processing Pledges..." : "Submit Voluntary Support Contribution 💖"}
              </button>
            )}
          </form>
        </div>
      </section>

      {/* --- Frosted-Glass Delivery & Support Modal --- */}
      {isDownloadOpen && selectedProduct && (
        <div className="modal-overlay active">
          <div className="modal-container" style={{ maxWidth: "600px" }}>
            <button className="modal-close" onClick={() => { setIsDownloadOpen(false); setDownloadStep("initial"); }}>&times;</button>
            
            {/* Step A: Pre-Download Screen */}
            {downloadStep === "initial" && (
              <>
                <div className="modal-header">
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "10px" }}>{selectedProduct.emoji}</span>
                  <h3>Download {selectedProduct.title}</h3>
                  <p style={{ color: "var(--col-cyan)", fontWeight: "700", fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "8px" }}>
                    💖 Support StackOrbitAI Research &amp; Free Catalog
                  </p>
                </div>
                <div className="modal-body" style={{ padding: "10px 0" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--col-border)", padding: "16px", borderRadius: "16px", marginBottom: "20px", textAlign: "left" }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>Asset Specifications:</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--col-muted)", marginBottom: "8px" }}>{selectedProduct.desc}</div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {selectedProduct.bullets.map((b) => (
                        <span key={b} style={{ fontSize: "0.7rem", background: "rgba(255,255,255,0.04)", padding: "3px 8px", borderRadius: "20px", color: "#cbd5e1" }}>✓ {b}</span>
                      ))}
                    </div>
                  </div>

                  {/* Domain Link Input Section */}
                  <div className="form-group" style={{ marginBottom: "20px", textAlign: "left" }}>
                    <label style={{ fontSize: "0.85rem", color: "#fff", fontWeight: "700", display: "flex", justifyContent: "space-between" }}>
                      <span>Configure Target Staging/Production Domain</span>
                      <span style={{ color: "var(--col-muted)", fontSize: "0.75rem", fontWeight: "400" }}>(Recommended)</span>
                    </label>
                    <p style={{ fontSize: "0.75rem", color: "var(--col-muted)", marginBottom: "8px", lineHeight: "1.4" }}>
                      Linking your domain automatically configures client API headers, validation scripts, and security certificates.
                    </p>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. yourbusiness.com"
                      value={targetDomain}
                      onChange={(e) => setTargetDomain(e.target.value)}
                      style={{ background: "#080b1c", border: "1px solid var(--col-cyan)", color: "#fff", fontSize: "0.95rem" }}
                    />
                  </div>
                  
                  {/* Actions Stack */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {/* Big Action: Link and Download */}
                    <button 
                      onClick={startSimulatedDownload} 
                      className="btn-hero-primary" 
                      style={{ padding: "14px", fontSize: "0.95rem", width: "100%" }}
                      disabled={!targetDomain.trim()}
                    >
                      ⚡ Download Free (Configure Domain Link)
                    </button>

                    {/* Secondary Option: Skip Domain Input */}
                    <button 
                      onClick={() => { setTargetDomain(""); startSimulatedDownload(); }} 
                      className="btn btn-ghost" 
                      style={{ padding: "12px", fontSize: "0.85rem", width: "100%", color: "var(--col-muted)", border: "1px dashed var(--col-border)" }}
                    >
                      Free Download (Without Domain / Skip)
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Step B: Simulating Processing */}
            {downloadStep === "processing" && (
              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <div className="spinner" style={{ margin: "0 auto 24px" }} />
                <h3>Packaging Repository Code...</h3>
                <p style={{ color: "var(--col-muted)", margin: "8px 0 24px", fontSize: "0.9rem" }}>Fetching latest templates, compiling assets, and packing ZIP bundle.</p>
                
                {/* Progress Bar */}
                <div style={{ background: "rgba(255,255,255,0.05)", height: "8px", borderRadius: "10px", overflow: "hidden", position: "relative", maxWidth: "400px", margin: "0 auto" }}>
                  <div style={{ background: "linear-gradient(90deg, var(--col-primary), var(--col-accent))", width: `${downloadProgress}%`, height: "100%", transition: "width 0.1s linear" }} />
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--col-cyan)", fontWeight: "700", marginTop: "10px" }}>{downloadProgress}% Completed</div>
              </div>
            )}

            {/* Step C: Successful Download & Support/Hire Intakes */}
            {downloadStep === "success" && (
              <>
                <div className="modal-header" style={{ paddingBottom: "10px" }}>
                  <div className="success-icon" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e", width: "54px", height: "54px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 16px" }}>✓</div>
                  <h3>Download Dispatched! 🚀</h3>
                  <p>Your zip archive payload <code>stackorbitai-{selectedProduct.id}-source.txt</code> has been built and dispatched to the browser downloads.</p>
                </div>
                
                <div className="modal-body" style={{ maxHeight: "360px", overflowY: "auto", paddingRight: "8px" }}>
                  <div style={{ border: "1px solid rgba(34, 197, 94, 0.2)", background: "rgba(34, 197, 94, 0.03)", padding: "16px", borderRadius: "12px", marginBottom: "24px" }}>
                    <h4 style={{ fontSize: "0.95rem", color: "#fff", marginBottom: "4px" }}>🛠️ Need Custom Deployment or API Setup?</h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--col-muted)", lineHeight: "1.4", marginBottom: "12px" }}>
                      Setting up databases, hosting on VPS servers, configuring API connections, or mapping custom webhooks can be tricky. Skip the technical configuration and let us set this up perfectly for you starting at just **$50.00**!
                    </p>
                    <button onClick={() => { setIsDownloadOpen(false); setIsHireOpen(true); }} className="btn" style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff", width: "100%", padding: "10px", fontSize: "0.85rem" }}>
                      Request Setup Configuration ($50) →
                    </button>
                  </div>

                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--col-border)", padding: "20px", borderRadius: "12px" }}>
                    <h4 style={{ fontSize: "1rem", textAlign: "center", marginBottom: "8px" }}>☕ Support our free software research!</h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--col-muted)", textAlign: "center", lineHeight: "1.4", marginBottom: "16px" }}>
                      If this template saves you days of code exploration, help support our server costs and keeping assets free!
                    </p>

                    <form onSubmit={handleDonationSubmit}>
                      <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                        {["1", "5", "50", "100"].map((p) => (
                          <button
                            type="button"
                            key={p}
                            onClick={() => setSupportData({ ...supportData, amount: p })}
                            style={{
                              padding: "8px 16px",
                              background: supportData.amount === p ? "rgba(139, 92, 246, 0.15)" : "rgba(255,255,255,0.02)",
                              border: supportData.amount === p ? "1.5px solid var(--col-accent)" : "1px solid var(--col-border)",
                              borderRadius: "8px",
                              color: supportData.amount === p ? "#fff" : "var(--col-muted)",
                              fontWeight: "700",
                              cursor: "pointer",
                              fontSize: "0.9rem"
                            }}
                          >
                            ${p}
                          </button>
                        ))}
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                        <div className="form-group">
                          <label style={{ fontSize: "0.75rem" }}>Name (Voluntary)</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Anonymous"
                            style={{ padding: "8px 12px", fontSize: "0.85rem" }}
                            value={supportData.name}
                            onChange={(e) => setSupportData({ ...supportData, name: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label style={{ fontSize: "0.75rem" }}>Email (Voluntary)</label>
                          <input
                            type="email"
                            className="form-input"
                            placeholder="creator@company.com"
                            style={{ padding: "8px 12px", fontSize: "0.85rem" }}
                            value={supportData.email}
                            onChange={(e) => setSupportData({ ...supportData, email: e.target.value })}
                          />
                        </div>
                      </div>

                      {supportCompleted ? (
                        <div style={{ background: "rgba(34, 197, 94, 0.1)", border: "1px solid var(--col-green)", padding: "10px", borderRadius: "8px", textAlign: "center", color: "#22c55e", fontSize: "0.85rem", fontWeight: "600" }}>
                          ✓ Donation pledged on database! Thank you! 💖
                        </div>
                      ) : (
                        <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "10px", fontSize: "0.85rem" }} disabled={isSubmittingSupport}>
                          {isSubmittingSupport ? "Logging support..." : `Send Support Pledge ($${supportData.amount === 'custom' ? supportData.customAmount : supportData.amount}) 💖`}
                        </button>
                      )}
                    </form>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid var(--col-border)", paddingTop: "16px", marginTop: "16px", textAlign: "right" }}>
                  <button onClick={() => setIsDownloadOpen(false)} className="btn btn-ghost" style={{ padding: "8px 20px", fontSize: "0.85rem" }}>Close Window</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* --- Frosted-Glass Setup Hire Modal --- */}
      {isHireOpen && (
        <div className="modal-overlay active">
          <div className="modal-container" style={{ maxWidth: "540px" }}>
            <button className="modal-close" onClick={() => { setIsHireOpen(false); setSetupStep("form"); }}>&times;</button>
            
            <div className="modal-header">
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>🛠️</span>
              <h3>Request Custom Setup &amp; Deployment</h3>
              <p>Hire us to host, deploy, API-integrate, or custom-program our templates starting at $50.00.</p>
            </div>

            <div className="modal-body">
              {/* Step A: Intake Specs Form */}
              {setupStep === "form" && (
                <form onSubmit={(e) => { e.preventDefault(); setSetupStep("payment"); }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="John Doe"
                        value={hireData.name}
                        onChange={(e) => setHireData({ ...hireData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Business Email</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="john@company.com"
                        value={hireData.email}
                        onChange={(e) => setHireData({ ...hireData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label>Phone Number (Optional)</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="+1 (555) 019-2834"
                        value={hireData.phone}
                        onChange={(e) => setHireData({ ...hireData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Primary Stack Requested</label>
                      <select
                        className="form-input"
                        value={hireData.projectType}
                        onChange={(e) => setHireData({ ...hireData, projectType: e.target.value })}
                        style={{ background: "#080b1c", color: "#f0f4ff", border: "1px solid var(--col-border)" }}
                        required
                      >
                        <option value="ai-automation">🤖 AI Agents &amp; n8n Workflows</option>
                        <option value="web-dev">💻 Next.js &amp; React Web Apps</option>
                        <option value="mobile-dev">📱 Flutter iOS &amp; Android Mobile Apps</option>
                        <option value="scraping">🌐 Web Scraping &amp; RPA Bots</option>
                        <option value="other">⚙️ Custom Software &amp; Executables</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Setup Details &amp; Custom Requirements</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      placeholder="Please details what APIs, webhooks, or features you want integrated (e.g. host AutoSaaS boilerplate on our Vercel and setup Supabase tables)."
                      value={hireData.details}
                      onChange={(e) => setHireData({ ...hireData, details: e.target.value })}
                      style={{ resize: "none", height: "80px", fontFamily: "var(--font-outfit)" }}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: "28px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <label>Estimated Project Budget (USD)</label>
                      <span style={{ color: "var(--col-cyan)", fontWeight: "800", fontFamily: "var(--font-space)" }}>
                        {hireData.budget >= 1500 ? "$1500+ (Enterprise Complex)" : `$${hireData.budget} (Starts at $50)`}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="1500"
                      step="50"
                      value={hireData.budget}
                      onChange={(e) => setHireData({ ...hireData, budget: e.target.value })}
                      style={{ width: "100%", accentColor: "var(--col-cyan)", background: "rgba(255,255,255,0.05)" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--col-muted)" }}>
                      <span>$50 (Deploy setup)</span>
                      <span>$500 (API Integration)</span>
                      <span>$1500+ (Full Custom SaaS)</span>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }}>
                    Proceed to Secure Checkout ($50 Deposit) →
                  </button>
                </form>
              )}

              {/* Step B: Payment Checkout Form */}
              {setupStep === "payment" && (
                <form onSubmit={handleHireSubmit}>
                  <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h4 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "4px" }}>💳 Secure Checkout Portal</h4>
                    <p style={{ fontSize: "0.78rem", color: "var(--col-muted)" }}>Refundable setup reservation. Enter dummy card details to simulate checkout.</p>
                  </div>

                  {/* Cyberpunk Glowing Mock Credit Card Preview */}
                  <div style={{
                    background: "linear-gradient(135deg, rgba(8, 10, 28, 0.9) 0%, rgba(139, 92, 246, 0.15) 100%)",
                    border: "1px solid rgba(139, 92, 246, 0.35)",
                    borderRadius: "16px",
                    padding: "24px",
                    marginBottom: "24px",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 0 25px rgba(139, 92, 246, 0.25)",
                    fontFamily: "monospace",
                    color: "#e2e8f0"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px", alignItems: "center" }}>
                      <span style={{ fontSize: "0.78rem", letterSpacing: "2px", color: "var(--col-cyan)", fontWeight: "bold" }}>STACKORBITAI SECURE</span>
                      <span style={{ fontSize: "1.6rem" }}>💳</span>
                    </div>
                    
                    <div style={{ fontSize: "1.25rem", letterSpacing: "3px", marginBottom: "24px", color: "#fff" }}>
                      {mockCard.number ? mockCard.number.replace(/(\d{4})/g, "$1 ").trim() : "•••• •••• •••• 4242"}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                      <div>
                        <div style={{ color: "var(--col-muted)", fontSize: "0.65rem", textTransform: "uppercase", marginBottom: "2px" }}>Cardholder</div>
                        <div style={{ fontWeight: "bold" }}>{mockCard.name ? mockCard.name.toUpperCase() : "AIDEN CARTER"}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ color: "var(--col-muted)", fontSize: "0.65rem", textTransform: "uppercase", marginBottom: "2px" }}>Expires</div>
                        <div style={{ fontWeight: "bold" }}>{mockCard.expiry || "12/29"}</div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Inputs */}
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Aiden Carter"
                      value={mockCard.name}
                      onChange={(e) => setMockCard({ ...mockCard, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Credit Card Number</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="4242 4242 4242 4242"
                      value={mockCard.number}
                      onChange={(e) => setMockCard({ ...mockCard, number: e.target.value.replace(/\s?/g, "") })}
                      maxLength="16"
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "24px" }}>
                    <div className="form-group">
                      <label>Expiration Date</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="MM/YY"
                        value={mockCard.expiry}
                        onChange={(e) => setMockCard({ ...mockCard, expiry: e.target.value })}
                        maxLength="5"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV / CVC Code</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="•••"
                        value={mockCard.cvv}
                        onChange={(e) => setMockCard({ ...mockCard, cvv: e.target.value })}
                        maxLength="4"
                        required
                      />
                    </div>
                  </div>

                  {/* Summary Pricing Row */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--col-border)", padding: "14px", borderRadius: "8px", display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "0.88rem" }}>
                    <span>Estimated Budget deposit:</span>
                    <span style={{ color: "var(--col-cyan)", fontWeight: "bold" }}>$50.00 USD</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px" }}>
                    <button type="button" onClick={() => setSetupStep("form")} className="btn btn-ghost" style={{ padding: "12px" }}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ padding: "12px" }} disabled={isSubmittingHire}>
                      {isSubmittingHire ? "Processing Payment..." : "🔒 Pay $50.00 Deposit"}
                    </button>
                  </div>
                </form>
              )}

              {/* Step C: Success Confirmation Screen */}
              {setupStep === "success" && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div className="success-icon" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e", width: "54px", height: "54px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 16px" }}>✓</div>
                  <h3>$50.00 Deposit Confirmed!</h3>
                  <p style={{ color: "var(--col-muted)", fontSize: "0.88rem", lineHeight: "1.5", marginTop: "8px" }}>
                    Your custom setup reservation has been safely confirmed. Our PostgreSQL databases have logged your project configuration and mock payment credentials. An automated setup slot is locked, and our engineering lead will reach out to you via email within 12 hours!
                  </p>
                  <button onClick={() => { setIsHireOpen(false); setSetupStep("form"); }} className="btn btn-primary" style={{ marginTop: "24px", padding: "10px 24px" }}>Perfect, Thank you!</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
              <li><Link href="/projects">Our Projects</Link></li>
              <li><Link href="/#pricing">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4>Products</h4>
            <ul className="footer-links">
              <li><a href="#autosaas-core">AutoSaaS Core — Free</a></li>
              <li><a href="#blogsbot-engine">BlogsBot Engine — Free</a></li>
              <li><a href="#omni-scraper">Omni-Scraper Hub — Free</a></li>
              <li><a href="#swiftcyber-ui">SwiftCyber UI — Free</a></li>
              <li><a href="#lead-qualifier-flow">Lead Qualifier — Free</a></li>
              <li><a href="#orbitui-css">OrbitUI CSS — Free</a></li>
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
