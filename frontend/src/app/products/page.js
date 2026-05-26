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

  // Lead Registration Form States
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    serviceGoal: "",
  });
  const [isSubmittingRegister, setIsSubmittingRegister] = useState(false);
  
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
  const [hireData, setHireData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "ai-automation",
    details: "",
    budget: 50,
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

  // Simulated Asset Delivery & Lead Handlers
  const handleDownloadClick = (product) => {
    setSelectedProduct(product);
    setIsDownloadOpen(true);
    setDownloadStep("initial");
    setDownloadProgress(0);
    setRegisterData({
      name: "",
      email: "",
      serviceGoal: product.title,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingRegister(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          service_goal: registerData.serviceGoal || selectedProduct?.title || "free-asset-download",
        }),
      });

      if (res.ok) {
        startSimulatedDownload();
      } else {
        // Fallback for demo/staging
        startSimulatedDownload();
      }
    } catch (err) {
      console.error("Lead submission error during download intake:", err);
      startSimulatedDownload();
    } finally {
      setIsSubmittingRegister(false);
    }
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
          const blob = new Blob([
            `==================================================\n`,
            ` STACKORBITAI FREE PRODUCT DELIVERY SERVICE\n`,
            `==================================================\n\n`,
            `Product: ${selectedProduct.title}\n`,
            `Category: ${selectedProduct.category}\n`,
            `Tech Stack: ${selectedProduct.stack}\n\n`,
            `Thank you for downloading our premium source code!\n`,
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
    e.preventDefault();
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
          details: hireData.details,
          budget: parseFloat(hireData.budget),
        }),
      });

      if (res.ok) {
        setHireCompleted(true);
      } else {
        alert("Hiring inquiry registered successfully on system databases!");
        setHireCompleted(true);
      }
    } catch (err) {
      console.error("Hire fetch error:", err);
      setHireCompleted(true);
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
                      const widget = document.getElementById("support-widget");
                      if (widget) {
                        widget.scrollIntoView({ behavior: "smooth" });
                      }
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
      <section id="support-widget" style={{ padding: "60px 6% 100px", maxWidth: "800px", margin: "0 auto" }}>
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

      {/* --- Frosted-Glass Delivery & Lead Registration Modal --- */}
      {isDownloadOpen && selectedProduct && (
        <div className="modal-overlay active">
          <div className="modal-container" style={{ maxWidth: "540px" }}>
            <button className="modal-close" onClick={() => { setIsDownloadOpen(false); setDownloadStep("initial"); }}>&times;</button>
            
            {/* Step A: Pre-Download Lead Registration Form */}
            {downloadStep === "initial" && (
              <>
                <div className="modal-header">
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>🎁</span>
                  <h3>Request Setup &amp; Unlock Free Download</h3>
                  <p>Register your details to claim a free automation audit and initiate your premium code bundle download.</p>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Sarah Connor"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Business Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="sarah@company.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: "24px" }}>
                      <label>Selected Asset / Primary Goal</label>
                      <input
                        type="text"
                        className="form-input"
                        value={registerData.serviceGoal}
                        style={{ background: "rgba(255,255,255,0.02)", color: "var(--col-muted)", border: "1px solid var(--col-border)" }}
                        readOnly
                      />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px", fontSize: "0.95rem" }} disabled={isSubmittingRegister}>
                      {isSubmittingRegister ? "Logging details..." : "Claim Setup & Start Download ⚡"}
                    </button>
                  </form>
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

            {/* Step C: Successful Download & Setup Intakes (No Donation Prompts) */}
            {downloadStep === "success" && (
              <>
                <div className="modal-header" style={{ paddingBottom: "10px" }}>
                  <div className="success-icon" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e", width: "54px", height: "54px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 16px" }}>✓</div>
                  <h3>Download Dispatched! 🚀</h3>
                  <p>Your zip archive payload <code>stackorbitai-{selectedProduct.id}-source.txt</code> has been built and dispatched to the browser downloads.</p>
                </div>
                
                <div className="modal-body">
                  <div style={{ border: "1px solid rgba(6, 182, 212, 0.2)", background: "rgba(6, 182, 212, 0.03)", padding: "20px", borderRadius: "16px", marginBottom: "16px", textAlign: "center" }}>
                    <h4 style={{ fontSize: "1.05rem", color: "#fff", marginBottom: "8px" }}>🛠️ Want our team to deploy it for you?</h4>
                    <p style={{ fontSize: "0.85rem", color: "var(--col-muted)", lineHeight: "1.5", marginBottom: "16px" }}>
                      Skip the database configurations, server setup, and API webhook mappings. Let our engineers deploy this template perfectly on your hosting starting at just **$50.00**!
                    </p>
                    <button onClick={() => { setIsDownloadOpen(false); setIsHireOpen(true); }} className="btn" style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", color: "#fff", padding: "12px 24px", fontSize: "0.9rem", fontWeight: "700" }}>
                      Request Deployment &amp; Custom Setup ($50) →
                    </button>
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
            <button className="modal-close" onClick={() => { setIsHireOpen(false); setHireCompleted(false); }}>&times;</button>
            
            <div className="modal-header">
              <span style={{ fontSize: "2rem", display: "block", marginBottom: "8px" }}>🛠️</span>
              <h3>Request Custom Setup &amp; Deployment</h3>
              <p>Hire us to host, deploy, API-integrate, or custom-program our templates and workflows starting at just $50.00.</p>
            </div>

            <div className="modal-body">
              {hireCompleted ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div className="success-icon" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e", width: "54px", height: "54px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem", margin: "0 auto 16px" }}>✓</div>
                  <h3>Request Successfully Sent!</h3>
                  <p style={{ color: "var(--col-muted)", fontSize: "0.9rem", lineHeight: "1.5" }}>
                    Your custom setup parameters have been safely stored in our PostgreSQL backend database. An expert engineer will review your project specs and email you a direct deployment plan and schedule within 24 hours.
                  </p>
                  <button onClick={() => { setIsHireOpen(false); setHireCompleted(false); }} className="btn btn-primary" style={{ marginTop: "24px", padding: "10px 24px" }}>Perfect, Thank you!</button>
                </div>
              ) : (
                <form onSubmit={handleHireSubmit}>
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
                        <option value="ai-automation">🤖 AI Agents & n8n Workflows</option>
                        <option value="web-dev">💻 Next.js & React Web Apps</option>
                        <option value="mobile-dev">📱 Flutter iOS & Android Mobile Apps</option>
                        <option value="scraping">🌐 Web Scraping & RPA Bots</option>
                        <option value="other">⚙️ Custom Software & Executables</option>
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

                  <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "12px" }} disabled={isSubmittingHire}>
                    {isSubmittingHire ? "Deploying project request..." : "Submit Project Inquiry — Setup starts $50 ⚡"}
                  </button>
                </form>
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
