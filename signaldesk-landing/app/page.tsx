"use client";

import { FormEvent, useState } from "react";

type SimilarIncident = {
  id: string;
  title: string;
  category: string;
  priority: string;
  similarity: number;
  resolution?: string;
};

type Guide = {
  id: string;
  title: string;
  category: string;
  risk: string;
  similarity: number;
  checks: string[];
  suggested_action: string;
  recommended_team: string;
};

type Analysis = {
  title: string;
  description: string;
  category: string;
  category_reason: string;
  priority: string;
  priority_reason: string;
  similar_incidents: SimilarIncident[];
  troubleshooting_guides: Guide[];
  recommended_team: string;
  suggested_action: string;
  requires_human_approval: boolean;
};

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "arrow": return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "spark": return <svg {...common}><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/><path d="m19 16 .9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9L19 16Z"/></svg>;
    case "shield": return <svg {...common}><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "search": return <svg {...common}><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg>;
    case "layers": return <svg {...common}><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "check": return <svg {...common}><path d="m5 12 4 4L19 6"/></svg>;
    case "activity": return <svg {...common}><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>;
    case "lock": return <svg {...common}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>;
    default: return <svg {...common}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

function Brand() {
  return <a className="brand" href="#top" aria-label="SignalDesk AI home"><span className="brand-mark"><Icon name="activity" size={21} /></span><span>signaldesk<span className="brand-ai">.ai</span></span></a>;
}

export default function Home() {
  const [title, setTitle] = useState("Login returns a 500 error");
  const [description, setDescription] = useState("Users cannot log in after the latest application deployment.");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function analyzeIncident(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const response = await fetch(`${API_URL}/incidents/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (!response.ok) {
        const detail = Array.isArray(data.detail) ? data.detail.map((item: { msg: string }) => item.msg).join(", ") : data.detail;
        throw new Error(detail || "The API could not analyze this incident.");
      }
      setAnalysis(data as Analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="top">
      <div className="announcement"><span className="announcement-dot" /> Built for clearer incident decisions <span className="announcement-divider">·</span> Human-reviewed by design <a href="#how-it-works">Explore the workflow <Icon name="arrow" size={14} /></a></div>
      <nav className="nav shell">
        <Brand />
        <div className="nav-links"><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#architecture">Architecture</a></div>
        <a className="nav-cta" href="#try-it">Try the demo <Icon name="arrow" size={16} /></a>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> INTELLIGENT ISSUE TRIAGE</div>
          <h1>Turn incidents into<br /><span className="gradient-text">clear next steps.</span></h1>
          <p className="hero-description">Less time guessing. More time resolving. SignalDesk AI helps teams understand technical issues, find relevant past incidents, and surface practical troubleshooting guidance.</p>
          <div className="hero-actions"><a className="button button-primary" href="#try-it">Analyze an incident <Icon name="arrow" size={17} /></a><a className="button button-secondary" href="#how-it-works"><span className="play-icon">▶</span> See how it works</a></div>
          <div className="trust-row"><div className="avatar-stack"><span>SD</span><span>AI</span><span>✓</span></div><p><strong>Human-in-the-loop</strong><br /><span>Recommendations, not risky auto-actions.</span></p></div>
        </div>

        <div className="hero-visual" aria-label="Illustration of an incident analysis dashboard">
          <div className="visual-glow" />
          <div className="dashboard-window">
            <div className="window-top"><div className="window-dots"><i /><i /><i /></div><span className="window-label">SIGNALDESK / INCIDENT OVERVIEW</span><span className="live-pill"><span /> LIVE PREVIEW</span></div>
            <div className="dashboard-body">
              <div className="incident-heading"><div><span className="mini-label">INCIDENT · #INC-1048</span><h3>Login service unavailable</h3><p>Users unable to authenticate after deployment</p></div><span className="priority-pill">● High priority</span></div>
              <div className="metrics-grid"><div className="metric-card"><span>CLASSIFICATION</span><div className="metric-value"><span className="metric-icon purple"><Icon name="layers" size={16} /></span>Application</div><small>Rule-based triage</small></div><div className="metric-card"><span>SIMILAR CASES</span><div className="metric-value"><span className="metric-icon blue"><Icon name="search" size={16} /></span>03 <em>found</em></div><small>Text similarity retrieval</small></div></div>
              <div className="timeline-card"><div className="card-title"><span>Suggested investigation</span><span className="status-chip">3 steps</span></div><div className="timeline-item"><span className="timeline-check"><Icon name="check" size={13} /></span><div><strong>Review application logs</strong><small>Look for errors around deployment time</small></div><span className="step-number">01</span></div><div className="timeline-item"><span className="timeline-check"><Icon name="check" size={13} /></span><div><strong>Verify authentication service</strong><small>Check dependency and service health</small></div><span className="step-number">02</span></div><div className="timeline-item"><span className="timeline-pending" /><div><strong>Escalate for review</strong><small>Human approval before any action</small></div><span className="step-number">03</span></div></div>
              <div className="approval-banner"><span className="approval-icon"><Icon name="shield" size={17} /></span><div><strong>Human approval required</strong><small>No automatic production changes</small></div><span className="approval-check"><Icon name="check" size={15} /></span></div>
            </div>
          </div>
          <div className="float-card float-top"><span className="float-icon"><Icon name="spark" size={17} /></span><div><strong>Context, not guesswork</strong><small>Evidence-led suggestions</small></div></div>
          <div className="float-card float-bottom"><span className="float-score">92%</span><div><strong>Relevant match</strong><small>Example similarity score</small></div></div>
        </div>
      </section>

      <section className="signal-strip"><div className="shell strip-inner"><span>BUILT AROUND FOUR PRACTICAL CAPABILITIES</span><div><Icon name="activity" size={17} /> Incident triage</div><div><Icon name="search" size={17} /> Similar-case retrieval</div><div><Icon name="layers" size={17} /> Knowledge guidance</div><div><Icon name="shield" size={17} /> Human oversight</div></div></section>

      <section className="section shell" id="features"><div className="section-heading"><div className="eyebrow"><span className="eyebrow-line" /> WHY SIGNALDESK</div><h2>From noisy reports to<br /><span className="muted-heading">a more useful first response.</span></h2><p>Bring context to the first few minutes of incident handling, without pretending every issue has an instant or certain answer.</p></div>
        <div className="feature-grid"><article className="feature-card"><div className="feature-icon icon-lilac"><Icon name="activity" size={22} /></div><span className="feature-index">01 / TRIAGE</span><h3>Understand the issue</h3><p>Classify an incident into a useful category and estimate its priority, with an explanation people can inspect.</p><a href="#try-it">Explore triage <Icon name="arrow" size={15} /></a></article><article className="feature-card"><div className="feature-icon icon-blue"><Icon name="search" size={22} /></div><span className="feature-index">02 / RETRIEVAL</span><h3>Learn from past cases</h3><p>Surface similar incidents from a sample history so teams can reuse context and avoid starting from zero.</p><a href="#try-it">Find similar cases <Icon name="arrow" size={15} /></a></article><article className="feature-card"><div className="feature-icon icon-mint"><Icon name="layers" size={22} /></div><span className="feature-index">03 / KNOWLEDGE</span><h3>Guide the next step</h3><p>Bring relevant troubleshooting checks and suggested ownership into one focused view.</p><a href="#how-it-works">See the workflow <Icon name="arrow" size={15} /></a></article><article className="feature-card"><div className="feature-icon icon-amber"><Icon name="shield" size={22} /></div><span className="feature-index">04 / OVERSIGHT</span><h3>Keep humans in control</h3><p>Recommendations stay reviewable. The prototype does not execute fixes or change production systems.</p><a href="#architecture">Review the approach <Icon name="arrow" size={15} /></a></article></div>
      </section>

      <section className="demo-section" id="try-it"><div className="shell demo-layout"><div className="demo-copy"><div className="eyebrow"><span className="eyebrow-line" /> INTERACTIVE PROTOTYPE</div><h2>Give an incident<br /><span className="gradient-text">a clearer path forward.</span></h2><p>Submit a sample issue to call your existing FastAPI analysis endpoint. The result includes classification, similar incidents, and troubleshooting guidance when those features are available in your backend.</p><div className="demo-note"><Icon name="lock" size={18} /><span><strong>Safe by design</strong><br />This demo sends the text you enter to your configured local API. Avoid entering secrets or real sensitive incident data.</span></div><div className="demo-steps"><div><span>1</span> Describe the issue</div><div><span>2</span> Retrieve context</div><div><span>3</span> Review suggestions</div></div></div>
        <div className="demo-panel"><div className="demo-panel-head"><div><span className="panel-kicker">TRY SIGNALDESK</span><h3>Analyze an incident</h3></div><span className="api-status"><i /> API demo</span></div><form onSubmit={analyzeIncident} className="incident-form"><label htmlFor="incident-title">Incident title</label><input id="incident-title" minLength={3} maxLength={120} required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Login returns a 500 error"/><label htmlFor="incident-description">What happened?</label><textarea id="incident-description" minLength={10} maxLength={2000} required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the symptoms and impact..."/><button className="button button-primary submit-button" type="submit" disabled={loading}>{loading ? "Analyzing incident…" : "Analyze incident"}<Icon name="arrow" size={17} /></button></form>
          {error && <div className="error-box" role="alert"><strong>Could not analyze this incident</strong><p>{error}</p><small>Check that FastAPI is running and NEXT_PUBLIC_API_URL points to it.</small></div>}
          {analysis && <div className="analysis-results" aria-live="polite"><div className="results-heading"><span className="success-dot" /> Analysis received</div><div className="result-chips"><span><small>Category</small><strong>{analysis.category}</strong></span><span><small>Priority</small><strong className={`priority-${analysis.priority.toLowerCase()}`}>{analysis.priority}</strong></span></div><p className="result-reason">{analysis.category_reason} {analysis.priority_reason}</p><h4>Similar incidents ({analysis.similar_incidents?.length ?? 0})</h4>{analysis.similar_incidents?.length ? analysis.similar_incidents.slice(0, 3).map((item) => <div className="mini-result" key={item.id}><span>{item.id}</span><strong>{item.title}</strong><small>{item.similarity}% match</small></div>) : <p className="empty-result">No similar incidents returned.</p>}<h4>Troubleshooting guidance</h4>{analysis.troubleshooting_guides?.length ? analysis.troubleshooting_guides.slice(0, 2).map((guide) => <div className="guide-result" key={guide.id}><strong>{guide.title}</strong><small>{guide.recommended_team} · {guide.risk} risk</small>{guide.checks?.slice(0, 2).map((check) => <p key={check}>• {check}</p>)}</div>) : <p className="empty-result">No troubleshooting guides returned.</p>}<div className="human-review"><Icon name="shield" size={17} /><span>{analysis.requires_human_approval ? "Human review required before any action." : "Review the recommendation before acting."}</span></div></div>}
          <p className="demo-footnote">Prototype · Results depend on the current local backend and sample data.</p>
        </div>
      </div></section>

      <section className="section shell" id="how-it-works"><div className="section-heading centered"><div className="eyebrow"><span className="eyebrow-line" /> THE WORKFLOW</div><h2>A structured path from<br /><span className="muted-heading">report to recommendation.</span></h2><p>Designed around the intelligent assistant flow described in the project curriculum.</p></div><div className="workflow-grid"><article className="workflow-step"><span className="workflow-number">01</span><div className="workflow-icon"><Icon name="activity" size={23} /></div><h3>Capture</h3><p>A user submits an incident title and a clear description of the symptoms.</p><span className="workflow-tag">Input validation</span></article><div className="workflow-connector"><Icon name="arrow" size={18} /></div><article className="workflow-step"><span className="workflow-number">02</span><div className="workflow-icon"><Icon name="layers" size={23} /></div><h3>Classify & retrieve</h3><p>Rules estimate category and priority while text retrieval finds related records.</p><span className="workflow-tag">Current prototype</span></article><div className="workflow-connector"><Icon name="arrow" size={18} /></div><article className="workflow-step"><span className="workflow-number">03</span><div className="workflow-icon"><Icon name="spark" size={23} /></div><h3>Recommend</h3><p>Relevant knowledge guides surface checks and a potential support team.</p><span className="workflow-tag">Knowledge-based</span></article><div className="workflow-connector"><Icon name="arrow" size={18} /></div><article className="workflow-step"><span className="workflow-number">04</span><div className="workflow-icon"><Icon name="shield" size={23} /></div><h3>Human review</h3><p>A person validates the context and decides what should happen next.</p><span className="workflow-tag">Approval-first</span></article></div></section>

      <section className="architecture-section" id="architecture"><div className="shell architecture-layout"><div className="architecture-copy"><div className="eyebrow"><span className="eyebrow-line" /> ENGINEERING BLUEPRINT</div><h2>Built in layers.<br /><span className="muted-heading">Designed to evolve.</span></h2><p>The curriculum describes a full-stack intelligent assistant. SignalDesk starts with a working local prototype and keeps future infrastructure clearly separated from what is implemented today.</p><a className="text-link" href="https://nextjs.org/docs" target="_blank" rel="noreferrer">Explore Next.js documentation <Icon name="arrow" size={15} /></a></div><div className="architecture-card"><div className="architecture-card-head"><span>REFERENCE ARCHITECTURE</span><span className="blueprint-badge">Prototype + roadmap</span></div><div className="arch-layer current"><div className="arch-layer-icon"><Icon name="layers" size={19} /></div><div className="arch-layer-copy"><strong>Web client</strong><span>Next.js · React · TypeScript</span></div><span className="layer-status implemented">Landing page</span></div><div className="arch-down">↓</div><div className="arch-layer current"><div className="arch-layer-icon"><Icon name="activity" size={19} /></div><div className="arch-layer-copy"><strong>API & triage</strong><span>FastAPI · Pydantic · scikit-learn</span></div><span className="layer-status prototype">Prototype</span></div><div className="arch-down">↓</div><div className="arch-layer current"><div className="arch-layer-icon"><Icon name="search" size={19} /></div><div className="arch-layer-copy"><strong>Knowledge retrieval</strong><span>TF-IDF · cosine similarity · JSON</span></div><span className="layer-status prototype">Local data</span></div><div className="arch-down">↓</div><div className="arch-layer planned"><div className="arch-layer-icon"><Icon name="lock" size={19} /></div><div className="arch-layer-copy"><strong>Security & scale</strong><span>Firebase Auth · Redis · Node.js</span></div><span className="layer-status planned-tag">Planned</span></div><div className="arch-layer planned"><div className="arch-layer-icon"><Icon name="spark" size={19} /></div><div className="arch-layer-copy"><strong>Agentic & cloud layer</strong><span>LangChain · MongoDB Vector Search / Pinecone · Docker · GCP</span></div><span className="layer-status planned-tag">Planned</span></div><p className="architecture-footnote">Roadmap items are curriculum-aligned design targets, not claims of current implementation.</p></div></div></section>

      <section className="closing-cta shell"><div className="closing-icon"><Icon name="spark" size={25} /></div><div><h2>Make the next incident easier to understand.</h2><p>Start with a clear report. Find relevant context. Keep decisions reviewable.</p></div><a className="button button-primary" href="#try-it">Try the prototype <Icon name="arrow" size={17} /></a></section>
      <footer className="footer"><div className="shell footer-inner"><Brand /><p>Incident clarity, with people in control.</p><span>SignalDesk AI · Prototype project</span></div><div className="shell footer-bottom"><span>© 2026 SignalDesk AI</span><span>Rule-based triage · Retrieval-based guidance · Human review</span></div></footer>
    </main>
  );
}
