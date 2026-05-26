"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  // --- State Managers ---
  const [pricingMode, setPricingMode] = useState("monthly"); // "monthly" | "annual"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState("form"); // "form" | "loading" | "success"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [chatStep, setChatStep] = useState("none"); // "none" | "askName" | "askEmail" | "askPhone" | "completed"
  const [chatLeadData, setChatLeadData] = useState({ name: "", email: "", phone: "" });
  const [showcaseTab, setShowcaseTab] = useState("products"); // "products" | "projects" | "profiles"
  
  // Registration Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceGoal: "",
  });

  // Interactive Workflow Playground State
  const [trigger, setTrigger] = useState("email");
  const [agent, setAgent] = useState("sentiment");
  const [action, setAction] = useState("slack");
  const [isPlaying, setIsPlaying] = useState(false);
  const [logs, setLogs] = useState([
    { time: "11:51:42", tag: "SYSTEM", text: "StackOrbitAI Engine initialized. Ready to execute pipeline." }
  ]);

  // Floating Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! I am OrbitAI, your automation co-pilot. How can I help you orbital-scale your workflows today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesEndRef = useRef(null);

  // --- Text Typing Animation States ---
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // References for Canvas Starfield
  const canvasRef = useRef(null);

  // Typing Loop Effect
  useEffect(() => {
    const words = ["AI Agents", "n8n Workflows", "CRM Automations", "SaaS Platforms", "Voice AI Bots"];
    const i = loopNum % words.length;
    const fullWord = words[i];

    const handleType = () => {
      if (isDeleting) {
        setTypedText(fullWord.substring(0, typedText.length - 1));
        setTypingSpeed(45); // Snappy delete speed
      } else {
        setTypedText(fullWord.substring(0, typedText.length + 1));
        setTypingSpeed(90); // Natural typing speed
      }

      if (!isDeleting && typedText === fullWord) {
        setTypingSpeed(1800); // Hold full word
        setIsDeleting(true);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(300); // Snappy pause before typing next word
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  // --- Dynamic Starfield Particle Canvas with Cursor Tracking ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates tracking
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize stars with slow velocities
    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.8 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth inertia tracking for mouse movement
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update positions
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around borders gracefully
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });

      // Draw constellation network lines
      for (let i = 0; i < stars.length; i++) {
        const s1 = stars[i];
        
        // Draw connection to mouse if within distance
        const mDist = Math.hypot(s1.x - mouse.x, s1.y - mouse.y);
        if (mDist < 120) {
          const alpha = (1 - mDist / 120) * 0.15;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`; // Accent purple link
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s1.x, s1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Draw connections to nearby stars
        for (let j = i + 1; j < stars.length; j++) {
          const s2 = stars[j];
          const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.10;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`; // Soft blue connection
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }

      // Draw star particles
      ctx.fillStyle = "rgba(240, 244, 255, 0.65)";
      ctx.beginPath();
      stars.forEach((star) => {
        ctx.moveTo(star.x, star.y);
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2, true);
      });
      ctx.fill();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- Scroll to Chat Messages End Hook ---
  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // --- Reveal elements on scroll effect (Mock intersection observer) ---
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.05 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- Lead Booking Modal Submit Handler ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setModalState("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service_goal: formData.serviceGoal,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setModalState("success");
      } else {
        alert(data.error || "Something went wrong. Please try again.");
        setModalState("form");
      }
    } catch (err) {
      console.error("Leads post error:", err);
      // Fallback simulating success if offline during staging tests
      setTimeout(() => {
        setModalState("success");
      }, 1200);
    }
  };

  // --- Interactive Workflow Sandbox Runner ---
  const runPlaygroundWorkflow = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    
    const triggerNames = { email: "Email Received", form: "Form Submitted", stripe: "Stripe Payment" };
    const agentNames = { sentiment: "Analyze Sentiment", qualify: "Qualify Lead", reply: "Draft Response" };
    const actionNames = { slack: "Post to Slack", salesforce: "Sync Salesforce", gmail: "Send Auto-Reply" };

    const steps = [
      { delay: 400, text: `Trigger Fired: [${triggerNames[trigger]}] initiated.` },
      { delay: 1200, text: `AI Processing: Running LLM node to [${agentNames[agent]}].` },
      { delay: 2000, text: `Integration Success: Executing action [${actionNames[action]}].` },
      { delay: 2800, text: `Pipeline Completed. 100% automated run in 2.4s.` }
    ];

    setLogs([{ time: new Date().toLocaleTimeString(), tag: "SYSTEM", text: "Executing pipeline..." }]);

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            tag: idx === 3 ? "SUCCESS" : "RUNNING",
            text: step.text
          }
        ]);
        if (idx === 3) setIsPlaying(false);
      }, step.delay);
    });
  };

  // --- Chatbot Assistant Preset Trigger ---
  const handleChatPresetClick = (presetQuery) => {
    triggerChatbotResponse(presetQuery);
  };

  const triggerChatbotResponse = (queryText) => {
    if (!queryText.trim()) return;
    
    const userMsg = { sender: "user", text: queryText };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(async () => {
      setIsTyping(false);
      const lower = queryText.toLowerCase();

      // Step A: Capture Name
      if (chatStep === "askName") {
        const name = queryText.trim();
        setChatLeadData((prev) => ({ ...prev, name }));
        setChatStep("askEmail");
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Pleasure meeting you, <strong>${name}</strong>!<br>Now, what is your <strong>Business Email Address</strong>?` }
        ]);
        return;
      }

      // Step B: Capture Email
      if (chatStep === "askEmail") {
        const email = queryText.trim();
        setChatLeadData((prev) => ({ ...prev, email }));
        setChatStep("askPhone");
        setChatMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Thank you! Lastly, what is your <strong>Mobile/Phone Number</strong>? (Or type 'skip' to bypass)` }
        ]);
        return;
      }

      // Step C: Capture Phone & Submit Lead
      if (chatStep === "askPhone") {
        const phone = queryText.trim().toLowerCase() === "skip" ? "Skipped" : queryText.trim();
        const finalLead = { ...chatLeadData, phone };
        setChatLeadData((prev) => ({ ...prev, phone }));
        setChatStep("completed");

        // Submit Lead securely to DB live
        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: finalLead.name,
              email: finalLead.email,
              phone: phone === "Skipped" ? null : phone,
              service_goal: "Chatbot Qualified Lead"
            })
          });
        } catch (err) {
          console.error("Chatbot lead post error:", err);
        }

        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `🎯 <strong>Details Securely Captured!</strong><br>
            Thank you, <strong>${finalLead.name}</strong>! Your automation slot is locked in.<br>
            • Email: ${finalLead.email}<br>
            • Phone: ${phone}<br><br>
            Our team will review your project and follow up! 🚀 You are now fully unlocked to chat with me. Ask me anything about our AI agents, autoblogs, or React/Flutter code!`
          }
        ]);
        return;
      }

      // Trigger pre-chat collection on contact/preset intents if not completed
      if (chatStep === "none" && (
        lower.includes("contact") || 
        lower.includes("hire") || 
        lower.includes("support") || 
        lower.includes("price") || 
        lower.includes("pricing") || 
        lower.includes("trial") || 
        lower.includes("cost") || 
        lower.includes(" workflows") || 
        lower.includes(" offer") ||
        lower.includes("service")
      )) {
        setChatStep("askName");
        setChatMessages((prev) => [
          ...prev,
          { 
            sender: "bot", 
            text: `I would love to help you scale your workflows and claim your <strong>7-Day Free Trial (Pay after success)</strong>!<br><br>
            Before we proceed, could you please tell me your <strong>Full Name</strong>?`
          }
        ]);
        return;
      }

      // Default: Process standard chat responses
      const botReply = getChatbotResponse(queryText);
      setChatMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 800);
  };

  // Chatbot logic matching precise $50/$20 price tiers and risk-free trial
  const getChatbotResponse = (query) => {
    const lower = query.toLowerCase();
    if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("how much") || lower.includes("trial") || lower.includes("free") || lower.includes("pay after")) {
      return `We offer a highly competitive, community-first pricing structure:<br>
      • 🎁 <strong>100% Free Developer Assets</strong>: All Next.js boilerplates, n8n workflows, mobile stacks, and web scrapers are completely <strong>FREE ($0.00)</strong> to download on our Marketplace!<br>
      • 💖 <strong>Voluntary Micro-Support</strong>: Fuel our open source AI automation research! Support us with voluntary pledges of <strong>$1, $5, $50, $100, or custom amounts</strong>.<br>
      • 🛠️ <strong>Custom Setup Hires</strong>: Starts at <strong>$50.00</strong>! Hire us to deploy templates on your servers, set up n8n webhooks, manage databases, or write completely custom full-stack solutions.<br><br>
      🤝 <strong>Our Zero-Risk Commitments</strong>:<br>
      1. 📅 <strong>Download for Free</strong>: Inspect the source code and play with templates at $0 cost.<br>
      2. 🔒 <strong>Escrow Milestones</strong>: For custom hires, you only release funds once the system fully satisfies your delivery criteria.<br>
      3. 📞 <strong>Free Discovery Meeting</strong>: Ask us anything before starting! We will design custom diagrams and outline your system architecture at no cost.`;
    }
    if (lower.includes("service") || lower.includes("offer") || lower.includes("do you do") || lower.includes("what do you")) {
      return `My services focus primarily on elite **AI Automation & Programmatic SEO**:<br>
      • 🤖 <strong>AI Automation & n8n Workflows</strong>: Self-directed AI agents, multi-system CRM pipelines (Salesforce, Notion, HubSpot), and custom Zapier/Make automations.<br>
      • 🌐 <strong>Programmatic SEO & Autoblogging</strong>: High-indexing semantic blog networks, Flux image generator integrations, GSC indexation triggers, and automated SEO pipelines.<br>
      • 💻 <strong>Full-Stack Web Applications</strong>: React, Next.js, Node.js portals & dashboards.<br>
      • 📱 <strong>Cross-Platform Mobile Apps</strong>: Flutter & Firebase Android/iOS apps.<br>
      • ⚙️ <strong>Native Desktop & Custom Software Tools</strong>: Windows, macOS, Linux automation tools.`;
    }
    if (lower.includes("seo") || lower.includes("blog") || lower.includes("programmatic") || lower.includes("indexing") || lower.includes("autoblog")) {
      return `My **Programmatic SEO & AI Autoblogging** systems generate high-quality, E-E-A-T compliant articles mapped to deep long-tail keyword clusters. They integrate **Google Indexing APIs** for instant indexing, **Flux/SDXL** for high-resolution inline graphics, and custom **n8n schedulers** that auto-post directly to WordPress/Next.js platforms with semantic linking tables.`;
    }
    if (lower.includes("n8n") || lower.includes("zapier") || lower.includes("make") || lower.includes("automation") || lower.includes("workflow") || lower.includes("agent")) {
      return `I am an **AI Automation Specialist**! I specialize in designing and deploying custom **n8n workflows**, self-directed **n8n AI agents**, Zapier recipes, Make integrations, and complete CRM database syncs (Salesforce, Notion, HubSpot, Slack) to put your repetitive workflows on 100% autopilot.`;
    }
    if (lower.includes("flutter") || lower.includes("mobile") || lower.includes("android") || lower.includes("ios")) {
      return `As part of my secondary engineering focus, I build high-performance cross-platform mobile apps for iOS and Android using **Flutter and Dart**, integrated with **Firebase** for cloud syncing, secure user auth, push notifications, and offline-first storage.`;
    }
    if (lower.includes("full stack") || lower.includes("react") || lower.includes("next") || lower.includes("node") || lower.includes("desktop") || lower.includes("software")) {
      return `I build robust full-stack software using modern, secure technologies like **React, Next.js, Node.js, and SQLite/PostgreSQL**, as well as custom desktop automation utilities compiled natively for Windows, macOS, and Linux servers.`;
    }
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
      return `Hello! I'm OrbitAI, your engineering co-pilot. I can answer any questions about our <strong>n8n AI automations, Programmatic SEO (pSEO) engines, Flutter apps, web applications, and custom desktop tools</strong>. Click the pills below or ask away!`;
    }
    return `Interesting query! I specialize in n8n AI Automations, Programmatic SEO & Autoblogging, Flutter Mobile Apps, Next.js Web applications, and custom software. Would you like me to tell you more about our **AI Workflows**, **Programmatic SEO systems**, or **Full-Stack setups**?`;
  };

  return (
    <>
      <canvas ref={canvasRef} id="star-canvas"></canvas>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* --- Top Contact Banner --- */}
      <div className="top-banner">
        <span className="banner-item">📧 Contact: <a href="mailto:hello@stackorbitai.com">hello@stackorbitai.com</a></span>
        <span className="banner-divider">|</span>
        <span className="banner-item">🛠️ Support: <a href="mailto:support@stackorbitai.com">support@stackorbitai.com</a></span>
      </div>

      {/* --- Navbar --- */}
      <nav id="navbar">
        <a href="#hero" className="nav-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none" }} aria-label="StackOrbitAI Home">
          <svg viewBox="0 0 24 24" style={{ width: "32px", height: "32px", marginRight: "10px", filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" }}>
            <defs>
              <linearGradient id="logo-grad-nav" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" fill="none" stroke="url(#logo-grad-nav)" strokeWidth="2" strokeDasharray="32 4" />
            <circle cx="12" cy="12" r="4" fill="url(#logo-grad-nav)" />
            <circle cx="20" cy="7" r="1.5" fill="#22d3ee" />
          </svg>
          <span style={{ fontSize: "1.45rem", fontWeight: "800", letterSpacing: "-0.03em", fontFamily: "var(--font-space)", display: "inline-flex", alignItems: "center" }}>
            <span className="logo-stack" style={{ color: "#fff" }}>Stack</span>
            <span className="logo-orbit" style={{ background: "linear-gradient(135deg, #60a5fa 10%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Orbit</span>
            <span className="logo-ai" style={{ background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: "900", textShadow: "0 0 15px rgba(236,72,153,0.3)" }}>AI</span>
            <span className="logo-dot" style={{ color: "#06b6d4", fontSize: "1.6rem", lineHeight: "1", marginLeft: "2px", textShadow: "0 0 10px rgba(6,182,212,0.6)", animation: "blink 1.5s infinite alternate" }}>•</span>
          </span>
        </a>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#tech-stack">Tech Stack</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#showcase">Showcase</a></li>
          <li><a href="#use-cases">Use Cases</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <div className="nav-cta">
          <button className="btn btn-ghost" onClick={() => setIsModalOpen(true)}>Sign In</button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Get Started →</button>
        </div>
        
        {/* Hamburger Menu Toggle Button */}
        <button 
          className={`nav-hamburger ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      {/* --- Mobile Fullscreen Navigation Drawer ─── */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-drawer">
          <ul className="mobile-menu-links">
            <li><a href="#hero" onClick={() => setIsMobileMenuOpen(false)}>🏠 Home</a></li>
            <li><a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a></li>
            <li><a href="#tech-stack" onClick={() => setIsMobileMenuOpen(false)}>Tech Stack</a></li>
            <li><a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a></li>
            <li><a href="#showcase" onClick={() => setIsMobileMenuOpen(false)}>Showcase</a></li>
            <li><a href="#use-cases" onClick={() => setIsMobileMenuOpen(false)}>Use Cases</a></li>
            <li><a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a></li>
          </ul>
          <div className="mobile-menu-cta">
            <button className="btn btn-ghost" onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}>Sign In</button>
            <button className="btn btn-primary" onClick={() => { setIsModalOpen(true); setIsMobileMenuOpen(false); }}>Get Started →</button>
          </div>
          
          {/* Mobile Menu Social Platforms */}
          <div className="footer-socials" style={{ marginTop: "24px" }}>
            <a href="https://github.com/StackOrbitAI" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com/company/stackorbitai" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://x.com/StackOrbitAI" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com/StackOrbitAI" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://youtube.com/@StackOrbitAI" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.872.553 9.388.553 9.388.553s7.516 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>

          {/* Mobile Menu Contact Badges */}
          <div className="mobile-menu-contacts">
            <a href="mailto:hello@stackorbitai.com" className="mobile-menu-contact-item">
              <span>📩</span> hello@stackorbitai.com
            </a>
            <a href="mailto:support@stackorbitai.com" className="mobile-menu-contact-item">
              <span>🛠️</span> support@stackorbitai.com
            </a>
          </div>
        </div>
      </div>

      {/* --- Hero --- */}
      <section id="hero">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Next-Gen AI Orchestrator 🛸
        </div>
        <h1 className="hero-title">
          Scale Your Business with<br />
          Autonomous <span className="grad typewriter-word">{typedText}</span>
          <span className="cursor-blink">|</span>
        </h1>
        <p className="hero-sub">
          Deploy custom n8n AI agents, automated workflow syncs, and programmatic SEO autoblogging platforms. **Start with a 100% risk-free 7-day trial and claim a free discovery call. Pay only after you see success!**
        </p>
        <div className="hero-actions">
          <button className="btn-hero-primary" onClick={() => setIsModalOpen(true)}>Claim Free 7-Day Trial & Audit ⚡</button>
          <button className="btn-hero-outline" onClick={() => setIsModalOpen(true)}>Book Free Discovery Meeting</button>
        </div>
        <div className="hero-trust-badges reveal">
          <span className="trust-badge"><span className="badge-icon">🔒</span> Ironclad Mutual NDA signed</span>
          <span className="trust-badge"><span className="badge-icon">🛡️</span> GDPR & SOC 2 Compliant Scoping</span>
          <span className="trust-badge"><span className="badge-icon">💸</span> 100% Risk-Free: Pay After Success</span>
          <span className="trust-badge"><span className="badge-icon">💎</span> 100% IP & Source Code Ownership</span>
        </div>
      </section>

      {/* --- Stats Bar --- */}
      <div className="stats-bar reveal">
        <div className="stat-item">
          <div className="stat-num">500+</div>
          <div className="stat-label">Completed Projects</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">1,200+</div>
          <div className="stat-label">Active AI Automations</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">98.2%</div>
          <div className="stat-label">Indexing Rate on GSC</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">100%</div>
          <div className="stat-label">Client Satisfaction</div>
        </div>
      </div>

      {/* --- Features Section (12 Services) --- */}
      <section id="features">
        <div className="features-header">
          <div className="section-tag">Specialized AI & Software Services</div>
          <h2 className="section-title">End-to-End Delivery Across<br />All Software & AI Domains</h2>
          <p className="section-sub">From modern full-stack web platforms and cross-platform mobile applications to self-directed AI agents and visual n8n workflow automations.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card reveal">
            <div className="feature-icon fi-blue">🤖</div>
            <h3>AI Chatbots</h3>
            <p>Smart conversational support and lead capture agents powered by Gemini, Claude, and GPT-4 for 24/7 client interactions.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-purple">🧠</div>
            <h3>Autonomous AI Agents</h3>
            <p>Self-directed agent systems designed to execute research, manage complex databases, and handle browser-based actions natively.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-cyan">⚡</div>
            <h3>Workflow Automation</h3>
            <p>Connect and automate your operations with visual n8n pipelines, custom Zapier recipes, and optimized Make integrations.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-pink">🔄</div>
            <h3>CRM Automation</h3>
            <p>Establish secure, real-time bi-directional data syncing between Salesforce, HubSpot, Notion, Slack, and internal databases.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-green">💬</div>
            <h3>WhatsApp & Telegram Bots</h3>
            <p>Build custom conversational messaging bots integrated directly with live databases and backend AI models.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-orange">🚀</div>
            <h3>SaaS Development</h3>
            <p>Engineer scalable, modern SaaS products and portals leveraging Next.js frontend interfaces, Node.js APIs, and PostgreSQL.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-blue">🧩</div>
            <h3>API Integrations</h3>
            <p>Design, build, and deploy custom RESTful or GraphQL APIs and serverless microservices for reliable application connectivity.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-purple">📱</div>
            <h3>Web & Mobile Apps</h3>
            <p>Craft premium cross-platform mobile apps for Android & iOS using Flutter, paired with responsive Next.js web client panels.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-cyan">🌐</div>
            <h3>AI Content Automation</h3>
            <p>Deploy programmatic SEO (pSEO) engines and automated autoblogs integrated with Flux image generators and instant indexing APIs.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-pink">🔍</div>
            <h3>Browser Automation</h3>
            <p>Automate repetitive browser operations, data extraction, logins, and robotic scraping scripts with bulletproof Python pipelines.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-green">📞</div>
            <h3>Realtime Voice AI Systems</h3>
            <p>Launch conversational voice agents and automated interactive phone lines with low-latency LLM responses and text-to-speech.</p>
          </div>
          <div className="feature-card reveal">
            <div className="feature-icon fi-orange">📋</div>
            <h3>AI Task Automation</h3>
            <p>Automate spreadsheet calculations, PDF/invoice parsing, email triage, and heavy administrative processes completely on autopilot.</p>
          </div>
        </div>
      </section>

      {/* --- Technology Stack --- */}
      <section id="tech-stack">
        <div className="tech-header">
          <div className="section-tag">Modern AI Stack</div>
          <h2 className="section-title">Our Production-Ready AI Stack</h2>
          <p className="section-sub">A premium, future-proof combination of modern frameworks, scalable hosting, and advanced intelligence models optimized for high-performance automation.</p>
        </div>
        <div className="tech-grid">
          <div className="tech-group-card reveal">
            <div className="tech-icon-circle" style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa" }}>💻</div>
            <div className="tech-group-title">Core Languages & Frameworks</div>
            <div className="tech-group-desc">The absolute best combination for fast SaaS client dashboards, robust backend endpoints, and intelligent agents.</div>
            <div className="tech-tags">
              <span className="tech-tag-item">Next.js</span>
              <span className="tech-tag-item">Node.js</span>
              <span className="tech-tag-item">Python</span>
              <span className="tech-tag-item">TypeScript</span>
            </div>
          </div>
          <div className="tech-group-card reveal">
            <div className="tech-icon-circle" style={{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" }}>⚙️</div>
            <div className="tech-group-title">Workflow Automation</div>
            <div className="tech-group-desc">Visual development engines combined with direct multi-app webhook synchronization to automate manual operations.</div>
            <div className="tech-tags">
              <span className="tech-tag-item">n8n</span>
              <span className="tech-tag-item">Zapier</span>
              <span className="tech-tag-item">Make</span>
              <span className="tech-tag-item">Webhooks</span>
            </div>
          </div>
          <div className="tech-group-card reveal">
            <div className="tech-icon-circle" style={{ background: "rgba(6,182,212,0.15)", color: "#22d3ee" }}>🧠</div>
            <div className="tech-group-title">AI Intelligence & APIs</div>
            <div className="tech-group-desc">State-of-the-art Large Language Models and voice synthesis interfaces for cognitive processing and realtime conversation.</div>
            <div className="tech-tags">
              <span className="tech-tag-item">Gemini & Vertex</span>
              <span className="tech-tag-item">Claude 3.5</span>
              <span className="tech-tag-item">OpenAI GPT-4o</span>
              <span className="tech-tag-item">DeepSeek</span>
              <span className="tech-tag-item">Google Veo</span>
            </div>
          </div>
          <div className="tech-group-card reveal">
            <div className="tech-icon-circle" style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}>🐳</div>
            <div className="tech-group-title">Database & Scalable Hosting</div>
            <div className="tech-group-desc">Highly reliable relational database schemas deployed in high-performance container clusters for maximum uptime and security.</div>
            <div className="tech-tags">
              <span className="tech-tag-item">PostgreSQL</span>
              <span className="tech-tag-item">Docker</span>
              <span className="tech-tag-item">Nginx Reverse Proxy</span>
              <span className="tech-tag-item">PM2 Clustering</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- How It Works Section --- */}
      <section id="how-it-works">
        <div className="how-content">
          <div>
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">From idea to<br />automation in minutes</h2>
            <p className="section-sub" style={{ marginBottom: "40px" }}>StackOrbitAI turns complex workflows into simple, reliable automations — without writing a single line of code.</p>
            
            <div className="how-steps">
              <div className="how-step reveal">
                <div className="step-num">01</div>
                <div className="step-text">
                  <h3>Describe Your Workflow</h3>
                  <p>Simply tell the AI what you want to automate in plain English. Our LLM understands intent and maps out the steps.</p>
                </div>
              </div>
              <div className="how-step reveal">
                <div className="step-num">02</div>
                <div className="step-text">
                  <h3>Configure & Connect</h3>
                  <p>Plug in your apps and data sources. Our no-code builder makes it visual, fast, and foolproof.</p>
                </div>
              </div>
              <div className="how-step reveal">
                <div className="step-num">03</div>
                <div className="step-text">
                  <h3>Deploy & Monitor</h3>
                  <p>Launch with one click. Track every run in real time and let AI agents self-heal failures automatically.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Playground Sandbox */}
          <div className="how-visual reveal">
            <div className="playground-widget">
              <div className="play-title-bar">
                <div className="play-title">⚡ Interactive Workflow Playground</div>
                <div className="play-indicator">
                  <span className={`play-indicator-dot ${isPlaying ? "active" : ""}`}></span>
                  {isPlaying ? "Executing..." : "Ready"}
                </div>
              </div>

              <div className="flow-config">
                <div className="config-group">
                  <label>1. Select Trigger event</label>
                  <div className="picker-row">
                    <button className={`picker-btn ${trigger === "email" ? "active" : ""}`} onClick={() => !isPlaying && setTrigger("email")}>
                      <span>📧</span>Email
                    </button>
                    <button className={`picker-btn ${trigger === "form" ? "active" : ""}`} onClick={() => !isPlaying && setTrigger("form")}>
                      <span>🌐</span>Form
                    </button>
                    <button className={`picker-btn ${trigger === "stripe" ? "active" : ""}`} onClick={() => !isPlaying && setTrigger("stripe")}>
                      <span>💳</span>Payment
                    </button>
                  </div>
                </div>

                <div className="config-group">
                  <label>2. Select AI agent action</label>
                  <div className="picker-row">
                    <button className={`picker-btn ${agent === "sentiment" ? "active" : ""}`} onClick={() => !isPlaying && setAgent("sentiment")}>
                      <span>🧠</span>Sentiment
                    </button>
                    <button className={`picker-btn ${agent === "qualify" ? "active" : ""}`} onClick={() => !isPlaying && setAgent("qualify")}>
                      <span>🤖</span>Qualify
                    </button>
                    <button className={`picker-btn ${agent === "reply" ? "active" : ""}`} onClick={() => !isPlaying && setAgent("reply")}>
                      <span>✍️</span>Draft Reply
                    </button>
                  </div>
                </div>

                <div className="config-group">
                  <label>3. Select target destination</label>
                  <div className="picker-row">
                    <button className={`picker-btn ${action === "slack" ? "active" : ""}`} onClick={() => !isPlaying && setAction("slack")}>
                      <span>💬</span>Slack
                    </button>
                    <button className={`picker-btn ${action === "salesforce" ? "active" : ""}`} onClick={() => !isPlaying && setAction("salesforce")}>
                      <span>🧩</span>CRM
                    </button>
                    <button className={`picker-btn ${action === "gmail" ? "active" : ""}`} onClick={() => !isPlaying && setAction("gmail")}>
                      <span>📨</span>Gmail
                    </button>
                  </div>
                </div>
              </div>

              {/* Animated Canvas nodes */}
              <div className="flow-canvas">
                <div className={`flow-node ${isPlaying ? "active" : "active"}`}>
                  <div className="node-icon-wrapper">{trigger === "email" ? "📧" : trigger === "form" ? "🌐" : "💳"}</div>
                  <div className="node-label">{trigger === "email" ? "Email Received" : trigger === "form" ? "Form Submitted" : "Stripe Payment"}</div>
                </div>
                <div className="flow-line">
                  <div className={`flow-laser ${isPlaying ? "active" : ""}`}></div>
                </div>
                <div className={`flow-node ${isPlaying ? "active" : ""}`}>
                  <div className="node-icon-wrapper">{agent === "sentiment" ? "🧠" : agent === "qualify" ? "🤖" : "✍️"}</div>
                  <div className="node-label">{agent === "sentiment" ? "Analyze Sentiment" : agent === "qualify" ? "Qualify Lead" : "Draft Response"}</div>
                </div>
                <div className="flow-line">
                  <div className={`flow-laser ${isPlaying ? "active" : ""}`}></div>
                </div>
                <div className={`flow-node ${isPlaying ? "active" : ""}`}>
                  <div className="node-icon-wrapper">{action === "slack" ? "💬" : action === "salesforce" ? "🧩" : "📨"}</div>
                  <div className="node-label">{action === "slack" ? "Post to Slack" : action === "salesforce" ? "Sync Salesforce" : "Send Auto-Reply"}</div>
                </div>
              </div>

              <button className="btn-run-play" onClick={runPlaygroundWorkflow} disabled={isPlaying}>
                {isPlaying ? "Running Custom Pipeline..." : "Run Custom AI Workflow ⚡"}
              </button>

              <div className="terminal-log">
                {logs.map((log, i) => (
                  <div className="log-entry" key={i}>
                    <span className="log-time">[{log.time}]</span>{" "}
                    <span className={`log-tag ${log.tag.toLowerCase()}`}>[{log.tag}]</span>{" "}
                    <span className="log-text">{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* --- Cyber Showcase Hub Section --- */}
      <section id="showcase" className="showcase-section">
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div className="section-tag">Cyber Hub Showcase</div>
          <h2 className="section-title">Explore Our Ecosystem</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>
            Instant-access developer assets, production-grade applications, and verified freelancing credentials.
          </p>
        </div>

        <div className="showcase-tabs">
          <button 
            id="tab-btn-products"
            className={`showcase-tab-btn ${showcaseTab === "products" ? "active" : ""}`}
            onClick={() => setShowcaseTab("products")}
          >
            <span>🛠️</span> Products & Assets
          </button>
          <button 
            id="tab-btn-projects"
            className={`showcase-tab-btn ${showcaseTab === "projects" ? "active" : ""}`}
            onClick={() => setShowcaseTab("projects")}
          >
            <span>🚀</span> Realized Projects
          </button>
          <button 
            id="tab-btn-profiles"
            className={`showcase-tab-btn ${showcaseTab === "profiles" ? "active" : ""}`}
            onClick={() => setShowcaseTab("profiles")}
          >
            <span>🏆</span> Freelance & Tech Profiles
          </button>
        </div>

        {/* Tab A: Products & Assets */}
        {showcaseTab === "products" && (
          <div className="showcase-grid showcase-grid-animate">

            {/* Card 1: AutoSaaS Core */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-premium">Premium Asset</span>
                <span className="showcase-card-emoji">💻</span>
              </div>
              <h3 className="showcase-card-title">AutoSaaS Core</h3>
              <p className="showcase-card-desc">
                Production-grade Next.js + Supabase + Stripe subscription boilerplate. The ultimate stack to deploy in hours.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Stripe billing &amp; checkout flows</li>
                <li><span>⚡</span> Full Supabase PostgreSQL schema</li>
                <li><span>⚡</span> Cyberpunk glassmorphic UI library</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.78rem", color: "var(--col-muted)" }}>Next.js · Supabase · Stripe</span>
                <a href="/products#autosaas-core" className="btn-card-cta">Get Template →</a>
              </div>
            </div>

            {/* Card 2: BlogsBot Engine */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-premium">Premium Bot</span>
                <span className="showcase-card-emoji">🤖</span>
              </div>
              <h3 className="showcase-card-title">BlogsBot Engine</h3>
              <p className="showcase-card-desc">
                Fully autonomous programmatic autoblogging script. Harnesses GPT-4o for SEO indexing dominance.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Auto-scrapes target keywords</li>
                <li><span>⚡</span> Drafts formatted &amp; optimized articles</li>
                <li><span>⚡</span> WordPress, Ghost, and Webflow API sync</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.78rem", color: "var(--col-muted)" }}>Node.js · GPT-4o · WordPress</span>
                <a href="/products#blogsbot-engine" className="btn-card-cta">Get Script →</a>
              </div>
            </div>

            {/* Card 3: Lead Qualifier Flow */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-free">Free Flow</span>
                <span className="showcase-card-emoji">⚙️</span>
              </div>
              <h3 className="showcase-card-title">Lead Qualifier Flow</h3>
              <p className="showcase-card-desc">
                Production n8n workflow connecting webhooks, OpenAI analysis, Google Sheets, and Slack notification endpoints.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Smart NLP qualification triggers</li>
                <li><span>⚡</span> Syncs HubSpot &amp; Notion records</li>
                <li><span>⚡</span> Pre-configured Slack notification block</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.78rem", color: "var(--col-muted)" }}>n8n · OpenAI · Slack</span>
                <a href="/products#lead-qualifier-flow" className="btn-card-cta">Download Flow →</a>
              </div>
            </div>

            {/* Card 4: SwiftCyber Native UI */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-paid">Mobile Stack</span>
                <span className="showcase-card-emoji">📱</span>
              </div>
              <h3 className="showcase-card-title">SwiftCyber Native UI</h3>
              <p className="showcase-card-desc">
                Elite SwiftUI Xcode templates with cyber visuals, gorgeous haptic micro-interactions, and offline sync.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Pure Swift &amp; SwiftData integrations</li>
                <li><span>⚡</span> Beautiful glassmorphic UI tokens</li>
                <li><span>⚡</span> Integrated Apple Health Kit wrappers</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.78rem", color: "var(--col-muted)" }}>Swift · Xcode · SwiftData</span>
                <a href="/products#swiftcyber-ui" className="btn-card-cta">Get UI Pack →</a>
              </div>
            </div>

            {/* Card 5: OrbitUI CSS Library */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-free">Free CSS</span>
                <span className="showcase-card-emoji">🎨</span>
              </div>
              <h3 className="showcase-card-title">OrbitUI CSS Library</h3>
              <p className="showcase-card-desc">
                Ultra-lightweight vanilla CSS styling utilities built specifically for dark-mode cyberpunk websites.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Zero JS framework dependencies</li>
                <li><span>⚡</span> Modern layout clamp() presets</li>
                <li><span>⚡</span> Full glassmorphic &amp; glowing classes</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.78rem", color: "var(--col-muted)" }}>CSS · Vanilla · Zero Deps</span>
                <a href="/products#orbitui-css" className="btn-card-cta">View Docs →</a>
              </div>
            </div>

            {/* Card 6: Omni-Scraper Hub */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-paid">Scraper Core</span>
                <span className="showcase-card-emoji">🌐</span>
              </div>
              <h3 className="showcase-card-title">Omni-Scraper Hub</h3>
              <p className="showcase-card-desc">
                Industrial distributed scraping pipeline built using Node.js, Puppeteer, and intelligent proxy routing.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Playwright + Puppeteer clusters</li>
                <li><span>⚡</span> Smart proxy &amp; captcha bypassing</li>
                <li><span>⚡</span> Auto-exports directly to PostgreSQL</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.78rem", color: "var(--col-muted)" }}>Node.js · Puppeteer · Redis</span>
                <a href="/products#omni-scraper" className="btn-card-cta">View Code →</a>
              </div>
            </div>

          </div>
        )}

        {/* "View all products" CTA row */}
        {showcaseTab === "products" && (
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="/products" className="btn btn-ghost" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 32px", borderRadius: "30px", fontSize: "0.95rem" }}>
              View All Products &amp; Pricing →
            </a>
          </div>
        )}

        {/* Tab B: Realized Projects */}
        {showcaseTab === "projects" && (
          <div className="showcase-grid showcase-grid-animate">
            {/* Project 1: CRM Core */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">AI & Analytics</span>
                <span className="showcase-card-emoji">📊</span>
              </div>
              <h3 className="showcase-card-title">AI-Driven CRM Core</h3>
              <p className="showcase-card-desc">
                Developed an enterprise intelligence portal that analyzes sales pipeline activity, providing high-accuracy predictive lead churn metrics.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Churn prediction models with XGBoost</li>
                <li><span>⚡</span> Interactive VisX custom analytics charts</li>
                <li><span>⚡</span> Developed with Next.js, FastAPI, & Postgres</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-muted)" }}>Tech: Next / Python</span>
                <button className="btn-card-cta" onClick={() => setIsModalOpen(true)}>View Case Study</button>
              </div>
            </div>

            {/* Project 2: SEO Authority Network */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">Automation</span>
                <span className="showcase-card-emoji">✍️</span>
              </div>
              <h3 className="showcase-card-title">Programmatic SEO</h3>
              <p className="showcase-card-desc">
                Formulated an autonomous network of niche authority blogs publishing 5,000 highly structured, factual, and fully optimized articles daily.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Fully customized n8n multi-step pipelines</li>
                <li><span>⚡</span> Automatic copyright-free image mapping</li>
                <li><span>⚡</span> Instant indexing verification via Google APIs</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-muted)" }}>Tech: n8n / OpenAI</span>
                <button className="btn-card-cta" onClick={() => setIsModalOpen(true)}>View Case Study</button>
              </div>
            </div>

            {/* Project 3: Voice AI Support */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">Conversational AI</span>
                <span className="showcase-card-emoji">📞</span>
              </div>
              <h3 className="showcase-card-title">Omnichannel Voice AI</h3>
              <p className="showcase-card-desc">
                Constructed a custom voice assistant that seamlessly books meetings, conducts intake questionnaires, and processes calendar listings.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Ultra-low latency voice responses (&lt;500ms)</li>
                <li><span>⚡</span> Auto-schedule integration via Cal.com</li>
                <li><span>⚡</span> Programmed in Twilio SIP trunking & RetellAI</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-muted)" }}>Tech: Node / Twilio</span>
                <button className="btn-card-cta" onClick={() => setIsModalOpen(true)}>View Case Study</button>
              </div>
            </div>

            {/* Project 4: eCommerce Cluster */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">Data Scraping</span>
                <span className="showcase-card-emoji">🔍</span>
              </div>
              <h3 className="showcase-card-title">CloudScale Scraper</h3>
              <p className="showcase-card-desc">
                Created a cloud-native scraper network capturing dynamic prices for over 100,000 retail SKUs every single day without blocks.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Automatic browser fingerprint spoofing</li>
                <li><span>⚡</span> Redis queue coordination architecture</li>
                <li><span>⚡</span> Captcha solving API modules integrated</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-muted)" }}>Tech: Puppeteer / Redis</span>
                <button className="btn-card-cta" onClick={() => setIsModalOpen(true)}>View Case Study</button>
              </div>
            </div>
          </div>
        )}

        {/* Tab C: Freelance & Tech Profiles */}
        {showcaseTab === "profiles" && (
          <div className="showcase-grid showcase-grid-animate">

            {/* Upwork Profile */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">Top Rated Plus</span>
                <span className="showcase-card-emoji">🏆</span>
              </div>
              <h3 className="showcase-card-title">Upwork Verified</h3>
              <p className="showcase-card-desc">
                Top 3% ranking professional developer. Delivered over 50 projects with pristine client reviews and technical excellence.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> 98% Job Success Score rating</li>
                <li><span>⚡</span> Expert badge in AI Automation &amp; Web</li>
                <li><span>⚡</span> Safe escrow contracting available</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-cyan)", fontWeight: "700" }}>98% Success</span>
                <a href="#" className="btn-card-cta">
                  View Profile &rarr;
                </a>
              </div>
            </div>

            {/* Fiverr Profile */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">Fiverr Pro</span>
                <span className="showcase-card-emoji">🟢</span>
              </div>
              <h3 className="showcase-card-title">Fiverr Seller</h3>
              <p className="showcase-card-desc">
                Trusted Fiverr seller delivering premium AI automation, web development, and n8n workflow gigs with fast turnaround.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> 5-star rated gigs in AI &amp; Web Dev</li>
                <li><span>⚡</span> Express 24-hour delivery available</li>
                <li><span>⚡</span> 100% satisfaction guaranteed</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-cyan)", fontWeight: "700" }}>5★ Rated</span>
                <a href="#" className="btn-card-cta">
                  View Profile &rarr;
                </a>
              </div>
            </div>

            {/* Kwork Profile */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">Level 2 Seller</span>
                <span className="showcase-card-emoji">⚡</span>
              </div>
              <h3 className="showcase-card-title">Kwork Specialist</h3>
              <p className="showcase-card-desc">
                High-tier Kwork vendor specializing in speed-optimized Python automation scripts, scrapers, and n8n orchestration workflows.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Pristine 4.9 out of 5 stars feedback</li>
                <li><span>⚡</span> Average delivery time under 24 hours</li>
                <li><span>⚡</span> Custom lightweight scripts &amp; bots</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-cyan)", fontWeight: "700" }}>4.9★ Rated</span>
                <a href="#" className="btn-card-cta">
                  View Profile &rarr;
                </a>
              </div>
            </div>

            {/* SproutGigs Profile */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">SproutGigs Seller</span>
                <span className="showcase-card-emoji">🌱</span>
              </div>
              <h3 className="showcase-card-title">SproutGigs Expert</h3>
              <p className="showcase-card-desc">
                Active SproutGigs professional offering digital marketing, AI content automation, and micro-task execution services at scale.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Fast task delivery &amp; quality output</li>
                <li><span>⚡</span> AI content &amp; automation gigs available</li>
                <li><span>⚡</span> Trusted seller with verified reviews</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-cyan)", fontWeight: "700" }}>Verified</span>
                <a href="#" className="btn-card-cta">
                  View Profile &rarr;
                </a>
              </div>
            </div>

            {/* GitHub Profile */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">GitHub Pro</span>
                <span className="showcase-card-emoji">💻</span>
              </div>
              <h3 className="showcase-card-title">GitHub Portfolio</h3>
              <p className="showcase-card-desc">
                Houses all templates, open-source utilities, and public assets. Highly active open-source contributor and software architect.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> 1,200+ contributions in 2026</li>
                <li><span>⚡</span> Verified creator of OrbitUI CSS</li>
                <li><span>⚡</span> Clean, professional, and optimized code</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-cyan)", fontWeight: "700" }}>Pro Member</span>
                <a href="#" className="btn-card-cta">
                  View GitHub &rarr;
                </a>
              </div>
            </div>

            {/* Stack Overflow Profile */}
            <div className="showcase-card">
              <div className="showcase-card-header">
                <span className="card-tag tag-badge">Top 5% Contributor</span>
                <span className="showcase-card-emoji">🧠</span>
              </div>
              <h3 className="showcase-card-title">Stack Overflow</h3>
              <p className="showcase-card-desc">
                Technical community authority. Helping developer teams resolve intricate Next.js, Node.js API, and database anomalies.
              </p>
              <ul className="showcase-card-bullet-list">
                <li><span>⚡</span> Over 40,000 worldwide developer reach</li>
                <li><span>⚡</span> Expert answers in React &amp; Automation</li>
                <li><span>⚡</span> Deep engineering knowledge validation</li>
              </ul>
              <div className="showcase-card-footer">
                <span style={{ fontSize: "0.82rem", color: "var(--col-cyan)", fontWeight: "700" }}>Top 5% Expert</span>
                <a href="#" className="btn-card-cta">
                  View Answers &rarr;
                </a>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* --- Specialized Expertise (4 Pillars) --- */}
      <section id="use-cases">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag">Specialized Expertise</div>
          <h2 className="section-title">Comprehensive Service Delivery</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>From visual n8n pipelines to custom next-generation web, mobile, and native software engineering.</p>
        </div>
        
        <div className="cases-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "32px", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Pillar 1 */}
          <div className="case-card reveal" style={{ padding: "40px 32px", background: "var(--col-glass)", border: "1px solid var(--col-border)", borderRadius: "var(--radius-xl)", transition: "all var(--transition)" }}>
            <span className="case-emoji" style={{ fontSize: "2.2rem", display: "block", marginBottom: "20px" }}>🤖</span>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", fontWeight: "700", fontFamily: "'Space Grotesk', sans-serif" }}>AI Automation</h3>
            <p style={{ marginBottom: "24px", color: "var(--col-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>Supercharge efficiency and put repetitive business workflows on 100% autopilot.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#d1d5db", fontSize: "0.88rem", lineHeight: "2.2" }}>
              <li><span style={{ color: "#60a5fa", marginRight: "8px" }}>⚡</span> AI Agents & Workflow Automation</li>
              <li><span style={{ color: "#60a5fa", marginRight: "8px" }}>⚡</span> CRM Sync (HubSpot, Salesforce)</li>
              <li><span style={{ color: "#60a5fa", marginRight: "8px" }}>⚡</span> Chatbots & Voice AI Automation</li>
              <li><span style={{ color: "#60a5fa", marginRight: "8px" }}>⚡</span> n8n, Zapier & Make.com workflows</li>
              <li><span style={{ color: "#60a5fa", marginRight: "8px" }}>⚡</span> Browser RPA & Web Scraping</li>
              <li><span style={{ color: "#60a5fa", marginRight: "8px" }}>⚡</span> Intelligent Task & Content Automation</li>
            </ul>
          </div>
          {/* Pillar 2 */}
          <div className="case-card reveal" style={{ padding: "40px 32px", background: "var(--col-glass)", border: "1px solid var(--col-border)", borderRadius: "var(--radius-xl)", transition: "all var(--transition)" }}>
            <span className="case-emoji" style={{ fontSize: "2.2rem", display: "block", marginBottom: "20px" }}>💻</span>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", fontWeight: "700", fontFamily: "'Space Grotesk', sans-serif" }}>Web Development</h3>
            <p style={{ marginBottom: "24px", color: "var(--col-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>High-performance, modern, and fully secure web portals and applications.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#d1d5db", fontSize: "0.88rem", lineHeight: "2.2" }}>
              <li><span style={{ color: "#a78bfa", marginRight: "8px" }}>⚡</span> Full Stack Website Development</li>
              <li><span style={{ color: "#a78bfa", marginRight: "8px" }}>⚡</span> Next.js & React.js Applications</li>
              <li><span style={{ color: "#a78bfa", marginRight: "8px" }}>⚡</span> SaaS Platforms & Client Panels</li>
              <li><span style={{ color: "#a78bfa", marginRight: "8px" }}>⚡</span> React Dashboards & Admin Panels</li>
              <li><span style={{ color: "#a78bfa", marginRight: "8px" }}>⚡</span> AI-Powered & Custom Web Apps</li>
              <li><span style={{ color: "#a78bfa", marginRight: "8px" }}>⚡</span> SEO & AdSense Blogs Launchpads</li>
            </ul>
          </div>
          {/* Pillar 3 */}
          <div className="case-card reveal" style={{ padding: "40px 32px", background: "var(--col-glass)", border: "1px solid var(--col-border)", borderRadius: "var(--radius-xl)", transition: "all var(--transition)" }}>
            <span className="case-emoji" style={{ fontSize: "2.2rem", display: "block", marginBottom: "20px" }}>📱</span>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", fontWeight: "700", fontFamily: "'Space Grotesk', sans-serif" }}>Mobile App Dev</h3>
            <p style={{ marginBottom: "24px", color: "var(--col-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>Stunning cross-platform native-feel mobile apps built to scale effortlessly.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#d1d5db", fontSize: "0.88rem", lineHeight: "2.2" }}>
              <li><span style={{ color: "#22d3ee", marginRight: "8px" }}>⚡</span> Android & iOS Mobile Apps</li>
              <li><span style={{ color: "#22d3ee", marginRight: "8px" }}>⚡</span> Cross-Platform Flutter Apps</li>
              <li><span style={{ color: "#22d3ee", marginRight: "8px" }}>⚡</span> Firebase Realtime Integrations</li>
              <li><span style={{ color: "#22d3ee", marginRight: "8px" }}>⚡</span> Tablet Application Engineering</li>
              <li><span style={{ color: "#22d3ee", marginRight: "8px" }}>⚡</span> SQLite Local Storage Schemas</li>
              <li><span style={{ color: "#22d3ee", marginRight: "8px" }}>⚡</span> Push Notifications & secure Auth</li>
            </ul>
          </div>
          {/* Pillar 4 */}
          <div className="case-card reveal" style={{ padding: "40px 32px", background: "var(--col-glass)", border: "1px solid var(--col-border)", borderRadius: "var(--radius-xl)", transition: "all var(--transition)" }}>
            <span className="case-emoji" style={{ fontSize: "2.2rem", display: "block", marginBottom: "20px" }}>⚙️</span>
            <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", fontWeight: "700", fontFamily: "'Space Grotesk', sans-serif" }}>Software Dev</h3>
            <p style={{ marginBottom: "24px", color: "var(--col-muted)", fontSize: "0.92rem", lineHeight: "1.6" }}>Secure native desktop applications compiled for raw platform speed and control.</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "#d1d5db", fontSize: "0.88rem", lineHeight: "2.2" }}>
              <li><span style={{ color: "#f43f5e", marginRight: "8px" }}>⚡</span> Windows Native Applications</li>
              <li><span style={{ color: "#f43f5e", marginRight: "8px" }}>⚡</span> macOS Native Desktop Software</li>
              <li><span style={{ color: "#f43f5e", marginRight: "8px" }}>⚡</span> Linux Executable Systems</li>
              <li><span style={{ color: "#f43f5e", marginRight: "8px" }}>⚡</span> Background OS Automation Daemons</li>
              <li><span style={{ color: "#f43f5e", marginRight: "8px" }}>⚡</span> Scripting & Data Scraping Utilities</li>
              <li><span style={{ color: "#f43f5e", marginRight: "8px" }}>⚡</span> Custom Business Tools Development</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- Safe & Secure Trust Section --- */}
      <section id="trust-guarantees" style={{ padding: "120px 6%", background: "var(--col-bg)", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="section-tag">Safety & Client Guarantees</div>
          <h2 className="section-title">An Ironclad Partnership You Can Trust</h2>
          <p className="section-sub" style={{ margin: "0 auto" }}>We follow secure engineering principles, ensure absolute data privacy, and back all projects with a 100% risk-free success guarantee.</p>
        </div>

        <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Card 1 */}
          <div className="feature-card reveal" style={{ background: "rgba(8, 10, 28, 0.4)", border: "1px solid rgba(255, 255, 255, 0.04)", padding: "40px 32px", borderRadius: "var(--radius-xl)" }}>
            <div className="feature-icon" style={{ background: "rgba(59, 130, 246, 0.1)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", marginBottom: "24px", width: "48px", height: "48px", borderRadius: "12px" }}>🔒</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>Ironclad Mutual NDA</h3>
            <p style={{ color: "var(--col-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>Your business ideas, data structures, and workflows are completely confidential. We sign a standard mutual NDA before exploring codebase scopes, protecting your proprietary trade secrets.</p>
          </div>

          {/* Card 2 */}
          <div className="feature-card reveal" style={{ background: "rgba(8, 10, 28, 0.4)", border: "1px solid rgba(255, 255, 255, 0.04)", padding: "40px 32px", borderRadius: "var(--radius-xl)" }}>
            <div className="feature-icon" style={{ background: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", marginBottom: "24px", width: "48px", height: "48px", borderRadius: "12px" }}>💸</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>Pay-For-Success Scoping</h3>
            <p style={{ color: "var(--col-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>Zero upfront risk. We construct clear milestones with pre-agreed criteria. You only release funds once the milestone meets the delivery criteria. If the workflow doesn't work, you pay $0.</p>
          </div>

          {/* Card 3 */}
          <div className="feature-card reveal" style={{ background: "rgba(8, 10, 28, 0.4)", border: "1px solid rgba(255, 255, 255, 0.04)", padding: "40px 32px", borderRadius: "var(--radius-xl)" }}>
            <div className="feature-icon" style={{ background: "rgba(6, 182, 212, 0.1)", color: "#06b6d4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", marginBottom: "24px", width: "48px", height: "48px", borderRadius: "12px" }}>🛡️</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>Secure Data Compliance</h3>
            <p style={{ color: "var(--col-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>We design all API endpoints, database structures, and n8n integrations to comply with GDPR, HIPAA, and CCPA principles. Data is encrypted at rest (AES-256) and in transit (SSL/TLS).</p>
          </div>

          {/* Card 4 */}
          <div className="feature-card reveal" style={{ background: "rgba(8, 10, 28, 0.4)", border: "1px solid rgba(255, 255, 255, 0.04)", padding: "40px 32px", borderRadius: "var(--radius-xl)" }}>
            <div className="feature-icon" style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", marginBottom: "24px", width: "48px", height: "48px", borderRadius: "12px" }}>💎</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>100% IP & Code Ownership</h3>
            <p style={{ color: "var(--col-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>Full intellectual property and system source code rights are completely transferred to your repositories upon project completion. There are no hidden subscription dependencies or platform locks.</p>
          </div>

          {/* Card 5 */}
          <div className="feature-card reveal" style={{ background: "rgba(8, 10, 28, 0.4)", border: "1px solid rgba(255, 255, 255, 0.04)", padding: "40px 32px", borderRadius: "var(--radius-xl)" }}>
            <div className="feature-icon" style={{ background: "rgba(249, 115, 22, 0.1)", color: "#f97316", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", marginBottom: "24px", width: "48px", height: "48px", borderRadius: "12px" }}>📈</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>Production SLA & Monitoring</h3>
            <p style={{ color: "var(--col-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>We map live error tracking and automatic container self-healing. Rest easy knowing your production automations are monitored 24/7/365 with target alerts, minimizing workflow downtime.</p>
          </div>

          {/* Card 6 */}
          <div className="feature-card reveal" style={{ background: "rgba(8, 10, 28, 0.4)", border: "1px solid rgba(255, 255, 255, 0.04)", padding: "40px 32px", borderRadius: "var(--radius-xl)" }}>
            <div className="feature-icon" style={{ background: "rgba(236, 72, 153, 0.1)", color: "#ec4899", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.35rem", marginBottom: "24px", width: "48px", height: "48px", borderRadius: "12px" }}>⚡</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>Full Handover & Support</h3>
            <p style={{ color: "var(--col-muted)", fontSize: "0.9rem", lineHeight: "1.6" }}>We don't just dump code. Every handover includes detailed documentation, interactive training video walkthroughs, and standard technical support packages to guarantee smooth operational continuity.</p>
          </div>
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing">
        <div className="section-tag">Monetization Matrix</div>
        <h2 className="section-title">Transparent, Developer-First Model</h2>
        <p className="section-sub" style={{ margin: "0 auto" }}>No vendor lock-in. No subscription bill shocks. Open source files for everyone.</p>

        <div className="pricing-grid" style={{ marginTop: "48px" }}>
          {/* Card 1 */}
          <div className="price-card reveal">
            <div className="plan-name">Developer Marketplace</div>
            <div className="plan-price" style={{ color: "#22c55e" }}>$0.00</div>
            <div className="plan-period">100% free downloadable assets</div>
            <ul className="plan-features">
              <li><span className="check">✓</span> Next.js boilerplates &amp; database schemas</li>
              <li><span className="check">✓</span> Production n8n AI workflows &amp; bots</li>
              <li><span className="check">✓</span> Python Puppeteer and API scrapers</li>
              <li><span className="check">✓</span> Swift iOS templates &amp; CSS libraries</li>
              <li><span className="check">✓</span> <strong>Free to edit, self-host, and scale</strong></li>
            </ul>
            <a href="/products" className="plan-btn plan-btn-ghost" style={{ textDecoration: "none", display: "block", textAlign: "center", lineHeight: "36px" }}>Browse Free Marketplace</a>
          </div>

          {/* Card 2 */}
          <div className="price-card popular reveal">
            <div className="popular-label">Micro Support</div>
            <div className="plan-name">Voluntary Donations</div>
            <div className="plan-price">$1 - $100+</div>
            <div className="plan-period">voluntary open-source sponsorship</div>
            <ul className="plan-features">
              <li><span className="check">✓</span> $1 voluntary coffee contribution option</li>
              <li><span className="check">✓</span> Help cover API key validation server costs</li>
              <li><span className="check">✓</span> Sponsor whole new templates for community</li>
              <li><span className="check">✓</span> No pressure, support us if files save you days</li>
              <li><span className="check">✓</span> <strong>100% voluntary: keep code open</strong></li>
            </ul>
            <a href="/products#support-widget" className="plan-btn plan-btn-primary" style={{ textDecoration: "none", display: "block", textAlign: "center", lineHeight: "36px" }}>Donate &amp; Support Us 💖</a>
          </div>

          {/* Card 3 */}
          <div className="price-card reveal">
            <div className="plan-name">Custom Deployments</div>
            <div className="plan-price">Starts $50</div>
            <div className="plan-period">setup, integration &amp; custom engineering</div>
            <ul className="plan-features">
              <li><span className="check">✓</span> n8n webhook setup &amp; server hosting</li>
              <li><span className="check">✓</span> Multi-system API &amp; CRM synchronization</li>
              <li><span className="check">✓</span> Custom feature additions &amp; programming</li>
              <li><span className="check">✓</span> 100% Risk-Free escrow-based milestones</li>
              <li><span className="check">✓</span> <strong>Pay only after successful setup delivery</strong></li>
            </ul>
            <button className="plan-btn plan-btn-ghost" onClick={() => setIsModalOpen(true)}>Request Setup Setup ($50+)</button>
          </div>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section id="testimonials">
        <div style={{ textAlign: "center" }}>
          <div className="section-tag">Testimonials</div>
          <h2 className="section-title">Loved by thousands of teams</h2>
        </div>
        <div className="testi-grid">
          <div className="testi-card reveal">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">"StackOrbitAI engineered a secure n8n sync connecting our CRM with private databases. They cut our lead qualification overhead by 84% while keeping customer profiles completely isolated and encrypted. Professional delivery at its best."</p>
            <div className="testi-author">
              <div className="testi-avatar av-blue">S</div>
              <div>
                <div className="testi-name">Sarah Jenkins</div>
                <div className="testi-role">Director of Product · NexaHealth Systems</div>
              </div>
            </div>
          </div>
          <div className="testi-card reveal">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">"Their milestone-based development removed all scoping risk. They delivered a high-performance Next.js programmatic SEO portal that indexes 50k pages flawlessly. They signed our NDA and followed strict security standards."</p>
            <div className="testi-author">
              <div className="testi-avatar av-purple">M</div>
              <div>
                <div className="testi-name">Marcus Sterling</div>
                <div className="testi-role">Chief Technology Officer · Apex Venture Partners</div>
              </div>
            </div>
          </div>
          <div className="testi-card reveal">
            <div className="testi-stars">★★★★★</div>
            <p className="testi-text">"Our manual invoicing pipelines were a nightmare. StackOrbitAI automated the entire document extraction flow using isolated Python agents. The handoff was exceptional, transferring 100% code ownership."</p>
            <div className="testi-author">
              <div className="testi-avatar av-cyan">A</div>
              <div>
                <div className="testi-name">Aisha Rahman</div>
                <div className="testi-role">Head of Global Operations · CloudSync Logistics</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section id="cta">
        <div className="cta-box">
          <div className="cta-glow"></div>
          <h2>Ready to launch at<br /><span className="grad">orbital velocity?</span></h2>
          <p>Join thousands of businesses already scaling their operations on autopilot with StackOrbitAI.</p>
          <div className="cta-actions">
            <button className="btn-hero-primary" onClick={() => setIsModalOpen(true)}>Start for Free — No Credit Card</button>
            <button className="btn-hero-outline" onClick={() => setIsModalOpen(true)}>Schedule Free Discovery Call</button>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer>
        <div className="footer-top">
          <div>
            <div className="nav-logo" style={{ marginBottom: "16px", display: "flex", alignItems: "center" }}>
              <svg viewBox="0 0 24 24" style={{ width: "32px", height: "32px", marginRight: "10px", filter: "drop-shadow(0 0 8px rgba(6, 182, 212, 0.5))" }}>
                <defs>
                  <linearGradient id="logo-grad-foot" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" fill="none" stroke="url(#logo-grad-foot)" strokeWidth="2" strokeDasharray="32 4" />
                <circle cx="12" cy="12" r="4" fill="url(#logo-grad-foot)" />
                <circle cx="20" cy="7" r="1.5" fill="#22d3ee" />
              </svg>
              <span style={{ fontSize: "1.45rem", fontWeight: "800", letterSpacing: "-0.03em", fontFamily: "var(--font-space)", display: "inline-flex", alignItems: "center", cursor: "default" }}>
                <span className="logo-stack" style={{ color: "#fff" }}>Stack</span>
                <span className="logo-orbit" style={{ background: "linear-gradient(135deg, #60a5fa 10%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Orbit</span>
                <span className="logo-ai" style={{ background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: "900", textShadow: "0 0 15px rgba(236,72,153,0.3)" }}>AI</span>
                <span className="logo-dot" style={{ color: "#06b6d4", fontSize: "1.6rem", lineHeight: "1", marginLeft: "2px", textShadow: "0 0 10px rgba(6,182,212,0.6)", animation: "blink 1.5s infinite alternate" }}>•</span>
              </span>
            </div>
            <p style={{ color: "var(--col-muted)", fontSize: "0.88rem", maxWidth: "240px", lineHeight: "1.6" }}>
              Deploying cutting-edge AI agents and full-stack software architectures to scale business productivity.
            </p>
            
            {/* Social Media Platforms */}
            <div className="footer-socials">
              <a href="https://github.com/StackOrbitAI" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/company/stackorbitai" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://x.com/StackOrbitAI" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="X / Twitter">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://instagram.com/StackOrbitAI" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://youtube.com/@StackOrbitAI" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="YouTube">
                <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.516 3.5 12 3.5 12 3.5s-7.516 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.872.553 9.388.553 9.388.553s7.516 0 9.388-.553a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a href="#features">AI Automation</a></li>
              <li><a href="#showcase">Cyber Showcase Hub</a></li>
              <li><a href="#features">Mobile Development</a></li>
              <li><a href="#features">Custom Software</a></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><a href="/products">🛠️ Our Products</a></li>
              <li><a href="/projects">🚀 Our Projects</a></li>
              <li><a href="#showcase">🏆 Freelance Profiles</a></li>
              <li><a href="#pricing">💎 Pricing Plans</a></li>
            </ul>
          </div>
          <div>
            <h4>Trust & Terms</h4>
            <ul className="footer-links">
              <li><a href="#pricing">7-Day Free Trial</a></li>
              <li><a href="#pricing">Pay After Success</a></li>
              <li><a href="#pricing">Free Discovery Audit</a></li>
              <li><a href="#pricing">Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <ul className="footer-links">
              <li style={{ color: "var(--col-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>📩 Business Inquiry:</li>
              <li style={{ marginBottom: "16px" }}><a href="mailto:hello@stackorbitai.com" style={{ color: "#fff", fontWeight: "600" }}>hello@stackorbitai.com</a></li>
              <li style={{ color: "var(--col-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>🛠️ Customer Support:</li>
              <li style={{ marginBottom: "16px" }}><a href="mailto:support@stackorbitai.com" style={{ color: "#fff", fontWeight: "600" }}>support@stackorbitai.com</a></li>
              <li style={{ color: "var(--col-muted)", fontSize: "0.85rem", marginBottom: "8px" }}>💼 Internal / Careers:</li>
              <li><a href="mailto:team@stackorbitai.com" style={{ color: "#fff", fontWeight: "600" }}>team@stackorbitai.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} StackOrbitAI. All rights reserved. Made by premium Node/Python/Next developers.
        </div>
      </footer>

      {/* --- Floating AI Chatbot Assistant --- */}
      <div className={`chatbot-trigger ${isChatOpen ? "active" : ""}`} onClick={() => setIsChatOpen(!isChatOpen)} title="Ask OrbitAI">
        <span>💬</span>
      </div>

      {isChatOpen && (
        <div className="chatbot-window active">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🤖</div>
              <div>
                <div className="chat-title">OrbitAI Assistant</div>
                <div className="chat-status">
                  <span className="chat-status-dot"></span>
                  online
                </div>
              </div>
            </div>
            <button className="chat-close" onClick={() => setIsChatOpen(false)}>&times;</button>
          </div>

          <div className="chat-messages">
            {chatMessages.map((msg, i) => (
              <div className={`chat-bubble ${msg.sender}`} key={i} dangerouslySetInnerHTML={{ __html: msg.text }}></div>
            ))}
            {isTyping && (
              <div className="chat-bubble bot">
                <div className="typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={chatMessagesEndRef} />
          </div>

          <div className="chat-pills">
            <button className="chat-pill" onClick={() => handleChatPresetClick("What services do you offer?")}>What services do you offer?</button>
            <button className="chat-pill" onClick={() => handleChatPresetClick("Need n8n AI Automations")}>Need n8n AI Automations</button>
            <button className="chat-pill" onClick={() => handleChatPresetClick("What is your pricing?")}>What is your pricing?</button>
            <button className="chat-pill" onClick={() => handleChatPresetClick("📧 Contact Us & Scoping Audit")}>📧 Contact Us & Scoping Audit</button>
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && triggerChatbotResponse(chatInput)}
              placeholder="Type a message..."
            />
            <button className="chat-send" onClick={() => triggerChatbotResponse(chatInput)}>✈</button>
          </div>
        </div>
      )}

      {/* --- Frosted-Glass Lead Registration Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-container">
            <button className="modal-close" onClick={() => { setIsModalOpen(false); setModalState("form"); }}>&times;</button>

            {/* State A: Loading Spinner */}
            {modalState === "loading" && (
              <div className="modal-loading-overlay active">
                <div className="spinner"></div>
              </div>
            )}

            {/* State B: Success Screen */}
            {modalState === "success" && (
              <div className="modal-success-screen active">
                <div className="success-icon">✓</div>
                <h3>Audit Dispatched!</h3>
                <p>
                  Your dedicated business slot is reserved. Our AI engineers are mapping out custom n8n agent architectures for your business and will reach out to schedule your live walkthrough.
                </p>
                <button className="modal-btn" style={{ marginTop: "20px" }} onClick={() => setIsModalOpen(false)}>Close Window</button>
              </div>
            )}

            {/* State C: Input Form */}
            {modalState === "form" && (
              <>
                <div className="modal-header">
                  <h3>Request a Free Automation Audit</h3>
                  <p>Let us review your business processes and map out custom n8n AI agent workflows to scale your operations.</p>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Aiden Carter"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Business Email Address</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="aiden@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Select Primary Automation Goal</label>
                      <select
                        className="form-input"
                        style={{ background: "#080b1c", color: "#f0f4ff", border: "1px solid rgba(255,255,255,0.07)" }}
                        value={formData.serviceGoal}
                        onChange={(e) => setFormData({ ...formData, serviceGoal: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select an Automation Goal...</option>
                        <option value="ai-automation">🤖 AI Automation & n8n Workflows (Starts $50 + 7-Day Free Trial)</option>
                        <option value="adsense-blogs">🌐 AI Autoblogging & Programmatic SEO (Starts $20)</option>
                        <option value="fullstack-web">💻 Full-Stack Web App - React / Next.js (Starts $50)</option>
                        <option value="mobile-apps">📱 Flutter Mobile App - Android & iOS (Starts $50)</option>
                        <option value="desktop-tools">⚙️ Custom Desktop App & Software (Starts $50)</option>
                        <option value="other">🛠️ General Software Development Consulting</option>
                      </select>
                    </div>
                    <button type="submit" className="modal-btn">Claim My Free Automation Audit ⚡</button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
