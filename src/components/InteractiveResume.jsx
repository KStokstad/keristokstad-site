import React, { useState, useRef } from "react";

const SECTIONS = [
  { id: "onair", label: "Overview", color: "#c00000" },
  { id: "guide", label: "Experience", color: "#0000c0" },
  { id: "skills", label: "Capabilities", color: "#00c000" },
  { id: "field", label: "Leadership & Recognition", color: "#00c0c0" },
  { id: "words", label: "In Their Words", color: "#c0c000" },
  { id: "productions", label: "Current Work", color: "#c000c0" },
  { id: "volunteer", label: "Professional Service", color: "#c0c0c0" },
];

// SMPTE-ish color bars, used as the signature divider
const BARS = ["#c0c0c0", "#c0c000", "#00c0c0", "#00c000", "#c000c0", "#c00000", "#0000c0"];

function ColorBars({ height = 6 }) {
  return (
    <div style={{ display: "flex", height, width: "100%" }} aria-hidden="true">
      {BARS.map((c, i) => (
        <div key={i} style={{ flex: 1, background: c }} />
      ))}
    </div>
  );
}

function Stat({ value, label, color }) {
  return (
    <div style={{ border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", background: "#fff", overflow: "hidden" }}>
      <div style={{ height: 3, background: color }} />
      <div style={{ padding: "20px 16px" }}>
        <div style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 700, letterSpacing: "-0.01em", color: "#16181d" }}>{value}</div>
        <div style={{ fontSize: 13, color: "#5c5a54", marginTop: 6, lineHeight: 1.4 }}>{label}</div>
      </div>
    </div>
  );
}

function Pill({ children, color }) {
  return (
    <span style={{ display: "inline-block", padding: "8px 16px", margin: "0 8px 10px 0", background: "#fff", border: "1px solid #e6e3da", borderBottom: `3px solid ${color}`, borderRadius: 10, boxShadow: "0 1px 2px rgba(22,24,29,0.05)", fontSize: 14, color: "#2b2a26" }}>
      {children}
    </span>
  );
}

function PillGroup({ title, color, items }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontSize: 12, letterSpacing: "0.14em", fontWeight: 700, color: "#5c5a54", textTransform: "uppercase", marginBottom: 10 }}>{title}</div>
      <div>{items.map((it, i) => <Pill key={i} color={color}>{it}</Pill>)}</div>
    </div>
  );
}

const CAP_GROUPS = [
  {
    title: "Governance & Leadership",
    color: "#00c000",
    summary: "Board partnership, restructuring, strategic planning, and interim leadership",
    preview: ["Board Governance", "Turnarounds", "Strategic Planning"],
    items: [
      "Board Governance and Development",
      "Organizational Turnarounds and Restructuring",
      "Strategic Planning",
      "Franchise and PEG Funding Strategy",
      "Interim and Fractional Leadership",
      "Staffing and Team Development",
    ],
  },
  {
    title: "Media Operations",
    color: "#00c0c0",
    summary: "Facility builds, broadcast operations, producer programs, and training",
    preview: ["Facility Builds", "Broadcast Operations", "Producer Programs"],
    items: [
      "Studio Design, Builds and Relocations",
      "Government Meeting Coverage",
      "Broadcast and Streaming Operations",
      "Producer and Volunteer Programs",
      "Media Literacy and Production Training",
    ],
  },
  {
    title: "Communications & Public Trust",
    color: "#c0c000",
    summary: "Strategic communications, public information, engagement, and advocacy",
    preview: ["Strategic Communications", "Public Information", "Engagement"],
    items: [
      "Strategic Communications",
      "Public Information",
      "Stakeholder and Community Engagement",
      "Partnership Development",
      "Advocacy and Policy Communications",
      "Organizational Change Communications",
    ],
  },
  {
    title: "Digital Products, Systems & AI",
    color: "#c000c0",
    summary: "Interactive tools, data systems, automation, and web platforms",
    preview: ["Interactive Tools", "Data Systems", "Automation"],
    items: [
      "Digital Product Strategy and Development",
      "Interactive Tools and Assessments",
      "AI-Assisted Research and Workflows",
      "Information Architecture and Data Systems",
      "Workflow Automation and Product Delivery",
      "Web Platforms and Digital Publishing",
    ],
  },
];

function CapabilityGroups() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ marginTop: 12 }}>
      {CAP_GROUPS.map((g, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ background: "#fff", border: "1px solid #e6e3da", borderLeft: `3px solid ${g.color}`, borderRadius: 12, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", marginBottom: 12, overflow: "hidden" }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: "16px 20px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}
            >
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#16181d" }}>{g.title}</span>
                <span style={{ display: "block", fontSize: 13, color: "#5c5a54", marginTop: 3, lineHeight: 1.5 }}>{g.summary}</span>
                {!isOpen && (
                  <span style={{ display: "block", fontSize: 12, color: "#8a877e", marginTop: 8 }}>{g.preview.join("  ·  ")}</span>
                )}
              </span>
              <span style={{ flexShrink: 0, fontSize: 12, fontWeight: 700, color: "#5c5a54", whiteSpace: "nowrap", marginTop: 2 }}>
                {isOpen ? "Close" : `View all ${g.items.length}`}
              </span>
            </button>
            {isOpen && (
              <div style={{ padding: "0 20px 18px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "9px 24px" }}>
                {g.items.map((it, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "baseline", gap: 9, fontSize: 13.5, color: "#2b2a26", lineHeight: 1.45 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: g.color, flexShrink: 0, position: "relative", top: -1 }} />
                    {it}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}




const DISPLAY = "'Source Serif 4', Georgia, 'Times New Roman', serif";
const BODY = "'Public Sans', 'Helvetica Neue', Arial, sans-serif";

const SECTORS = [
  { label: "Community Media", color: "#c0c000" },
  { label: "Municipal Government", color: "#00c0c0" },
  { label: "Civic & Environmental Organizations", color: "#00c000" },
  { label: "Publishing & Digital Products", color: "#c000c0" },
];

// true = proven work exists, backed by content on this page
const RANGE = [
  { cap: "Executive leadership", cells: [true, true, false, false] },
  { cap: "Operations & organizational systems", cells: [true, true, true, false] },
  { cap: "Governance & board partnership", cells: [true, false, true, false] },
  { cap: "Facility builds & relocations", cells: [true, false, true, false] },
  { cap: "Start-ups, restructures & turnarounds", cells: [true, true, false, false] },
  { cap: "Communications & stakeholder engagement", cells: [true, true, true, true] },
  { cap: "Digital platforms & products", cells: [true, true, false, true] },
];

function RangeMatrix() {
  return (
    <div style={{ background: "#fff", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", padding: "22px 24px 18px", marginBottom: 28, overflowX: "auto" }}>
      <div style={{ fontSize: 12, letterSpacing: "0.14em", fontWeight: 700, color: "#5c5a54", textTransform: "uppercase", marginBottom: 14 }}>Range at a Glance</div>
      <div className="ks-mobile-only">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", paddingBottom: 12, marginBottom: 4, borderBottom: "1px solid #eceade" }}>
          {SECTORS.map((sec, i) => (
            <span key={i} style={{ fontSize: 11.5, color: "#5c5a54", display: "inline-flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: sec.color, display: "inline-block" }} />
              {sec.label}
            </span>
          ))}
        </div>
        {RANGE.map((row, i) => (
          <div key={i} style={{ padding: "10px 0", borderBottom: i < RANGE.length - 1 ? "1px solid #f2f0e8" : "none" }}>
            <div style={{ fontSize: 13.5, color: "#2b2a26", fontWeight: 600, marginBottom: 7 }}>{row.cap}</div>
            <div style={{ display: "flex", gap: 14 }}>
              {row.cells.map((on, j) => (
                <span key={j} aria-label={SECTORS[j].label + (on ? ": proven" : ": not a focus")} style={{ width: 14, height: 14, borderRadius: "50%", display: "inline-block", background: on ? SECTORS[j].color : "transparent", border: on ? "none" : "1.5px solid #e6e3da", boxShadow: on ? "0 1px 2px rgba(22,24,29,0.15)" : "none" }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="ks-desktop-only" style={{ minWidth: 520 }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(180px, 1.4fr) repeat(4, 1fr)", alignItems: "center", gap: "0 8px", paddingBottom: 10, borderBottom: "1px solid #eceade" }}>
          <div />
          {SECTORS.map((sec, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#5c5a54", lineHeight: 1.35 }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: sec.color, marginBottom: 4 }} />
              <div>{sec.label}</div>
            </div>
          ))}
        </div>
        {RANGE.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(180px, 1.4fr) repeat(4, 1fr)", alignItems: "center", gap: "0 8px", padding: "9px 0", borderBottom: i < RANGE.length - 1 ? "1px solid #f2f0e8" : "none" }}>
            <div style={{ fontSize: 13.5, color: "#2b2a26", fontWeight: 600 }}>{row.cap}</div>
            {row.cells.map((on, j) => (
              <div key={j} style={{ textAlign: "center" }}>
                <span
                  aria-label={on ? "Proven" : "Not a focus"}
                  style={{
                    display: "inline-block", width: 14, height: 14, borderRadius: "50%",
                    background: on ? SECTORS[j].color : "transparent",
                    border: on ? "none" : "1.5px solid #e6e3da",
                    boxShadow: on ? "0 1px 2px rgba(22,24,29,0.15)" : "none",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11.5, color: "#8a877e", marginTop: 12 }}>
        Filled dots indicate substantial experience in that setting. Empty dots indicate it has not been a primary focus.
      </div>
    </div>
  );
}


const FACETS = [
  {
    id: "turnaround", label: "Turnaround", color: "#00c000", tint: "#e0f7e0", lead: 2,
    question: "How could Keri help with an organizational turnaround?",
    receipts: [
      { org: "City of Santa Monica", when: "2015 to 2017", result: "Restructured the city media operation across cable, digital, and radio; the channels earned ACM's Overall Excellence in Government Programming." },
      { org: "Midpen Media Center", when: "2017 to 2022", result: "Restructured a public media nonprofit: governance, revenue diversification, and partnerships. The organization runs without her." },
    ],
  },
  {
    id: "build", label: "Facility project", color: "#0000c0", tint: "#e0e0f7", lead: 1,
    question: "What experience does Keri have leading facility builds and relocations?",
    receipts: [
      { org: "Puget Sound Access", when: "2001 to 2007", result: "An empty warehouse on a modest budget became an operating television station with studios, offices, and editing suites." },
      { org: "Pasadena Media", when: "2012 to 2015", result: "Relocated the operation into a new all-digital studio facility, opened 2014, with 16 staff and a $1.2 million budget." },
      { org: "CEC Environmental Hub", when: "2023 to 2024", result: "Directed final build stages and setup: $400K procurement budget, four vendor disciplines coordinated, relocation delivered." },
    ],
  },
  {
    id: "startup", label: "Start-up", color: "#c0c000", tint: "#f7f7e0", lead: 0,
    question: "Has Keri launched organizations from the ground up?",
    receipts: [
      { org: "Klamath Falls Community TV", when: "1999 to 2001", result: "Launched a new community station in Oregon." },
      { org: "Puget Sound Access", when: "2001 to 2007", result: "Built a Seattle-area start-up into an established media center over six years." },
      { org: "PortMedia", when: "2007 to 2009", result: "Start-up leadership for a new community media organization in Massachusetts." },
    ],
  },
  {
    id: "governance", label: "Board issue", color: "#c000c0", tint: "#f7e0f7", lead: 2,
    question: "How does Keri work with boards experiencing governance problems?",
    receipts: [
      { org: "Alliance for Community Media", when: "2012 to 2014", result: "Chaired the national board during the period when ACM hired its first president; ten years of board service overall." },
      { org: "Every executive role", when: "2012 to 2022", result: "Partnered with boards on governance practices, strategic planning, and leadership evaluation at Pasadena and Midpen." },
      { org: "Bad Boards", when: "Published", result: "Wrote Bad Boards, on nonprofit board patterns, and built its companion AI-powered governance diagnostic." },
    ],
  },
];

const HIGHLIGHTS = [
  { n: "3", label: "Major builds & relocations", color: "#0000c0", chips: ["Santa Barbara Channels / TV Santa Barbara", "Pasadena Media", "CEC Environmental Hub"] },
  { n: "3", label: "Start-ups launched", color: "#c0c000", chips: ["Klamath Falls, OR", "South King County, WA", "Newburyport, MA"] },
  { n: "3", label: "Organizational restructures", color: "#00c000", chips: ["City of Santa Monica", "Pasadena Media", "Midpen Media Center"] },
];

function CareerHighlights({ lead }) {
  const cards = lead == null ? HIGHLIGHTS : [HIGHLIGHTS[lead], ...HIGHLIGHTS.filter((_, i) => i !== lead)];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 28 }}>
      {cards.map((h, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", borderTop: `4px solid ${h.color}`, padding: "18px 18px 14px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 34, fontWeight: 700, color: "#16181d", lineHeight: 1 }}>{h.n}</span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#2b2a26", lineHeight: 1.3 }}>{h.label}</span>
          </div>
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {h.chips.map((c, j) => (
              <span key={j} style={{ fontSize: 11.5, color: "#5c5a54", background: "#f4f3ec", border: "1px solid #eceade", borderRadius: 999, padding: "4px 10px" }}>{c}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


const MILESTONES = [
  { yr: 2011, l1: "Buske Leadership", l2: "Award", meta: "2011 · Santa Barbara", color: "#c00000" },
  { yr: 2013.5, l1: "ACM National", l2: "Board Chair", meta: "2012–2014", color: "#0000c0" },
  { yr: 2014.6, l1: "Women Achievers", l2: "Honoree", meta: "2014 · Business Life", color: "#c000c0" },
  { yr: 2015.4, l1: "Hosted ACM", l2: "National Conference", meta: "2015 · Pasadena", color: "#00c000" },
  { yr: 2017, l1: "ACM Overall Excellence", l2: "in Gov Programming", meta: "2017 · Santa Monica", color: "#00c0c0" },
];

const AWARD_SPANS = [
  { from: 2001, to: 2007, label: "3 Best of the Northwest Awards", color: "#c0c000" },
  { from: 2012, to: 2015, label: "5 ACM Hometown Media Awards + 2 Telly Awards", color: "#c000c0" },
  { from: 2015, to: 2017, label: "4 STAR Awards for Government Programming", color: "#00c0c0" },
];

function RecognitionTimeline() {
  const min = 1999, max = 2027.5;
  const L = 40, R = 668, SPINE = 122;
  const x = (yr) => L + ((yr - min) / (max - min)) * (R - L);
  const slots = [60, 188, 316, 452, 596];
  return (
    <div style={{ background: "#fff", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", padding: "22px 16px 10px", marginBottom: 24, overflowX: "auto" }}>
      <div className="ks-mobile-only" style={{ padding: "12px 10px 4px" }}>
        <div style={{ borderLeft: "2px solid #e6e3da", paddingLeft: 18, marginLeft: 6 }}>
          {[...MILESTONES].reverse().map((m, i) => (
            <div key={i} style={{ position: "relative", paddingBottom: i < MILESTONES.length - 1 ? 18 : 6 }}>
              <span style={{ position: "absolute", left: -25, top: 3, width: 12, height: 12, borderRadius: "50%", background: m.color, border: "2px solid #fff", boxShadow: "0 0 0 1px #e6e3da" }} />
              <div style={{ fontSize: 14, fontWeight: 700, color: "#16181d", lineHeight: 1.35 }}>{m.l1} {m.l2}</div>
              <div style={{ fontSize: 12, color: "#8a877e", marginTop: 1 }}>{m.meta}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #eceade" }}>
          {AWARD_SPANS.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}>
              <span style={{ width: 26, height: 5, borderRadius: 3, background: a.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: "#5c5a54" }}>{a.from} to {a.to} · {a.label}</span>
            </div>
          ))}
        </div>
      </div>
      <svg className="ks-desktop-only" viewBox="0 0 700 232" style={{ width: "100%", minWidth: 620, display: "block" }} role="img" aria-label="Chronological chart of awards and distinctions from 2001 to the present">
        {/* labels in fixed slots with leader lines down to dots */}
        {MILESTONES.map((m, i) => {
          const sx = slots[i];
          const dx = x(m.yr);
          return (
            <g key={i}>
              <text x={sx} y={34} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#16181d">{m.l1}</text>
              <text x={sx} y={48} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#16181d">{m.l2}</text>
              <text x={sx} y={63} textAnchor="middle" fontSize="10" fill="#8a877e">{m.meta}</text>
              <path d={"M " + sx + " 70 L " + sx + " 84 L " + dx + " " + (SPINE - 16) + " L " + dx + " " + (SPINE - 7)} stroke="#d8d5cc" strokeWidth="1" fill="none" />
              <circle cx={dx} cy={SPINE} r="6" fill={m.color} stroke="#fff" strokeWidth="2" />
            </g>
          );
        })}
        {/* spine with arrowhead */}
        <line x1={L} y1={SPINE} x2={R} y2={SPINE} stroke="#c9c6bb" strokeWidth="2" />
        <polygon points={R + "," + (SPINE - 5) + " " + (R + 12) + "," + SPINE + " " + R + "," + (SPINE + 5)} fill="#c9c6bb" />
        {MILESTONES.map((m, i) => (
          <circle key={"d" + i} cx={x(m.yr)} cy={SPINE} r="6" fill={m.color} stroke="#fff" strokeWidth="2" />
        ))}
        {/* award span ribbons under the spine */}
        {AWARD_SPANS.map((a, i) => {
          const y = SPINE + 32 + i * 24;
          return (
            <g key={i}>
              <line x1={x(a.from)} y1={SPINE + 10} x2={x(a.from)} y2={y} stroke="#eceade" strokeWidth="1" />
              <line x1={x(a.to)} y1={SPINE + 10} x2={x(a.to)} y2={y} stroke="#eceade" strokeWidth="1" />
              <line x1={x(a.from)} y1={y} x2={x(a.to)} y2={y} stroke={a.color} strokeWidth="5" strokeLinecap="round" opacity="0.85" />
              <text x={x(a.to) + 10} y={y + 4} fontSize="11" fill="#5c5a54">{a.label}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ fontSize: 11.5, color: "#8a877e", padding: "6px 10px 4px" }}>
        Award bars show recognition earned during the associated leadership period.
      </div>
    </div>
  );
}


const QUOTES = [
  {
    q: "She was adept at handling the political issues, networked quickly, and was able to stretch our budget to acquire what she needed… She rose to the challenge and is someone I would hire again without hesitation.",
    who: "Thomas Leonhardt", role: "Municipal client", rel: "Hired Keri to start a public access television service",
  },
  {
    q: "Keri started with an empty warehouse on an “acoustically challenging” site and a modest budget, & presented the city with an operating Television Station complete with offices, studios, educational facilities and editing suites.",
    who: "Robert Miller", role: "Architect, Robert S. Miller & Associates", rel: "Client on the Puget Sound Access facility build",
  },
  {
    q: "I am especially impressed by Keri's vision of the future and her drive to innovate in that direction… She's one that is building the future of community video.",
    who: "Kurt Buecheler", role: "Partner, Techquity.AI", rel: "Worked with Keri as a client at Midpen",
  },
  {
    q: "Keri is great at building organizations that build local community, and she has a deep understanding of the needs of various communities.",
    who: "Daniell Krawczyk", role: "Broadcast accessibility consultant", rel: "Worked alongside Keri for 15 years, both coasts",
  },
];

function Testimonials() {
  const TCOLORS = ["#c0c000", "#00c0c0", "#c000c0", "#00c000"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
      {QUOTES.map((t, i) => (
        <div key={i} style={{ background: "#fff", border: "1px solid #e6e3da", borderTop: `3px solid ${TCOLORS[i % TCOLORS.length]}`, borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", padding: "22px 24px", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: DISPLAY, fontSize: 30, lineHeight: 0.5, color: TCOLORS[i % TCOLORS.length], marginBottom: 10 }}>“</div>
          <p style={{ fontFamily: DISPLAY, fontSize: 15.5, lineHeight: 1.65, margin: "0 0 16px", color: "#2b2a26", flex: 1 }}>{t.q}</p>
          <div style={{ borderTop: "1px solid #f0eee6", paddingTop: 12 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#16181d" }}>{t.who}</div>
            <div style={{ fontSize: 12, color: "#5c5a54", marginTop: 2 }}>{t.role}</div>
            <div style={{ fontSize: 11.5, color: "#8a877e", marginTop: 2 }}>{t.rel}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


const PROJECTS = [
  {
    name: "GetKoselig",
    tag: "a private family storytelling platform",
    desc: "Founder and product builder of a platform where relatives collaboratively preserve written memories, photographs, audio, and video. The first version is built, with core organizer and contributor workflows and an example collection in place. Current work focuses on restoring and validating the production deployment, completing end-to-end testing, adding payment capability, and preparing for beta testing with real families. Planned revenue paths include paid family collections and archiving, Koselig Keepsakes (printed books with QR-linked audio and video), and partnership distribution.",
    url: "https://www.getkoselig.com",
    urlLabel: "getkoselig.com",
    skills: ["Product strategy", "Platform development", "Collaborative workflows", "Media and archive systems", "Payments and launch"],
  },
  {
    name: "Bad Boards",
    tag: "a book and diagnostic toolkit on nonprofit board patterns",
    desc: "A practical book on how nonprofit boards go wrong, developed end to end from manuscript through print design and publication. The companion paid diagnostic assesses a board against eight recurring board patterns and delivers a personalized AI-generated field report after checkout.",
    url: "https://badboards.org",
    urlLabel: "badboards.org",
    skills: ["Governance expertise", "Book production", "Product design", "AI integration", "Payments and delivery"],
  },
  {
    name: "Community Media Voices",
    tag: "a civic archive of the people who built community media",
    desc: "A research and archival project documenting the people, organizations, and relationships behind the community media field. I have researched and written more than 185 biographical entries, designed the underlying data architecture, and built the public archive, with story collection as the next phase.",
    url: "https://communitymediavoices.org",
    urlLabel: "communitymediavoices.org",
    skills: ["Archival research", "Editorial writing", "Information architecture", "Data systems", "Site development"],
  },
  {
    name: "Orrery",
    tag: "an embeddable relationship map for archives and civic-history projects",
    desc: "A product developed from the relationship-mapping work behind Community Media Voices. The embeddable component helps museums, archives, and civic-history projects show how their people and institutions connect, with offerings designed from self-service through done-for-you setup.",
    url: "https://orrerymap.com/",
    urlLabel: "orrerymap.com",
    skills: ["Product strategy", "Data visualization", "Packaging and pricing", "Institutional product design"],
  },
  {
    name: "Civic Congruence",
    tag: "a civic pattern diagnostic",
    desc: "A diagnostic that surfaces patterns in civic engagement, with a free result and a paid deep-dive report. I designed the survey, scoring logic, and funnel, then built the workflow that turns a completed checkout into a personalized AI-generated report delivered by email.",
    url: "https://civiccongruence.org",
    urlLabel: "civiccongruence.org",
    skills: ["Survey design", "Scoring logic", "Funnel design", "AI report generation", "Payments and automation"],
  },
  {
    name: "Honor Flight",
    tag: "a 2026 novel",
    desc: "My debut novel, a family saga about a granddaughter and her Korean War-era Navy veteran grandfather. I wrote, edited, and independently produced the book, including interior typesetting, print specifications, cover development, and the author website.",
    url: "https://www.keristokstadwrites.com",
    urlLabel: "keristokstadwrites.com",
    skills: ["Fiction writing", "Editing and production", "Publishing operations", "Author platform"],
  },
];

function ProjectList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {PROJECTS.map((pr, i) => (
        <details key={i} className="ks-proj" style={{ background: "#fff", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", overflow: "hidden" }}>
          <summary style={{ listStyle: "none", cursor: "pointer", padding: "16px 20px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ display: "block", fontSize: 15.5, color: "#16181d", lineHeight: 1.35 }}>{pr.name}</strong>
              <span style={{ display: "block", fontSize: 13.5, color: "#5c5a54", lineHeight: 1.45, marginTop: 3 }}>{pr.tag}</span>
            </span>
            <span className="ks-chev" aria-hidden="true" style={{ fontSize: 17, fontWeight: 400, color: "#a8a598", lineHeight: 1, display: "inline-block", marginTop: 2 }}></span>
          </summary>
          <div style={{ padding: "0 20px 18px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 14.5, lineHeight: 1.7 }}>{pr.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              {pr.skills.map((sk, j) => (
                <span key={j} style={{ fontSize: 11.5, color: "#5c5a54", background: "#f4f3ec", border: "1px solid #eceade", borderRadius: 999, padding: "4px 10px" }}>{sk}</span>
              ))}
            </div>
            {pr.url && (
              <a href={pr.url} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 12, fontSize: 13, fontWeight: 600, color: "#16181d" }}>
                {pr.urlLabel} →
              </a>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

function SectionHeading({ color, children }) {
  return (
    <div style={{ margin: "48px 0 16px" }}>
      <h2 style={{ fontFamily: DISPLAY, fontSize: 27, fontWeight: 600, margin: 0, color: "#16181d", letterSpacing: "-0.01em" }}>
        {children}
      </h2>
      <div style={{ marginTop: 10, width: 40, height: 3, background: color, borderRadius: 2 }} />
    </div>
  );
}

const SITE_HEADER = 72

export default function KeriInteractive() {
  const [active, setActive] = useState("onair");
  const [menuOpen, setMenuOpen] = useState(false);
  const [facet, setFacet] = useState(null);
  const activeFacet = FACETS.find((f) => f.id === facet) || null;
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cMsg, setCMsg] = useState("");
  const [cWantResume, setCWantResume] = useState(false);
  const [cRole, setCRole] = useState("General");
  const [cCompany, setCCompany] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [contactError, setContactError] = useState("");

  const submitContact = async () => {
    setContactError("");
    if (cCompany) return;
    if (!cName.trim() || !cEmail.trim()) {
      setContactError("Please fill in your name and email.");
      return;
    }
    if (!cWantResume && !cMsg.trim()) {
      setContactError("Please add a short message.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/xeenpyje", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: cName,
          email: cEmail,
          message: cMsg,
          resumeRequest: cWantResume ? "Yes" : "No",
          targetRole: cWantResume ? cRole : "",
          source: "KS Interactive",
        }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setContactError("The message did not go through. Email ks@keristokstad.com directly.");
      }
    } catch (e) {
      setContactError("The message did not go through. Email ks@keristokstad.com directly.");
    } finally {
      setSending(false);
    }
  };
  const refs = useRef({});

  const jump = (id) => {
    setActive(id);
    setMenuOpen(false);
    if (id === "onair") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = refs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SITE_HEADER - 24;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const body = { fontFamily: BODY, color: "#2b2a26", background: "linear-gradient(180deg, #faf9f5 0%, #f3f2ec 100%)", minHeight: "100vh" };

  return (
    <div style={body}>
      {/* Top strip */}
      <ColorBars height={8} />

      {/* Mobile menu */}
      <button
        className="ks-burger"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
        style={{ position: "fixed", top: SITE_HEADER + 18, right: 16, zIndex: 70, width: 44, height: 44, borderRadius: 12, border: "1px solid #e6e3da", background: "#fff", boxShadow: "0 2px 8px rgba(22,24,29,0.12)", cursor: "pointer", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5, padding: 0 }}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ display: "block", width: 18, height: 2, background: "#16181d", borderRadius: 1 }} />
        ))}
      </button>
      {menuOpen && (
        <div className="ks-burger-panel" style={{ position: "fixed", top: SITE_HEADER + 70, right: 16, zIndex: 70, width: 240, background: "#fff", border: "1px solid #e6e3da", borderRadius: 16, boxShadow: "0 12px 40px rgba(22,24,29,0.22)", padding: 8 }}>
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => jump(sec.id)}
              className="ks-nav"
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left", padding: "11px 14px", border: "none", cursor: "pointer", borderRadius: 10, background: "transparent", fontSize: 15, color: "#16181d", fontWeight: active === sec.id ? 800 : 500 }}
            >
              <span aria-hidden="true" className={active === sec.id ? "ks-navdot ks-navdot-on" : "ks-navdot"} style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: sec.color }} />
              {sec.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 24px 120px" }}>
        {/* Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: DISPLAY, fontSize: 46, fontWeight: 700, margin: 0, letterSpacing: "-0.015em", color: "#16181d" }}>
              Keri Stokstad
            </h1>
            <p style={{ fontSize: 17, margin: "8px 0 0", color: "#5c5a54" }}>
              Nonprofit Executive · Strategic Operations and Governance Consultant · Writer
            </p>
            <p style={{ fontSize: 14, margin: "10px 0 0", color: "#8a877e" }}>
              Des Moines, IA · Available nationally ·{" "}
              <a href="https://keristokstad.com" target="_blank" rel="noreferrer" style={{ color: "#8a877e" }}>keristokstad.com</a> ·{" "}
              <a href="https://www.linkedin.com/in/keristokstad/" style={{ color: "#8a877e" }}>LinkedIn</a>
            </p>
          </div>
        </header>

        <div style={{ display: "flex", gap: 40, marginTop: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Section nav */}
          <nav className="ks-sidenav" style={{ minWidth: 210, position: "sticky", top: SITE_HEADER + 24, alignSelf: "flex-start" }}>
            <div style={{ background: "#fff", border: "1px solid #e6e3da", borderRadius: 16, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", padding: 8 }}>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => jump(s.id)}
                  className="ks-nav"
                  style={{
                    display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
                    padding: "11px 14px", border: "none", cursor: "pointer", borderRadius: 10,
                    background: active === s.id ? "linear-gradient(135deg, #f7f6f0, #efeee6)" : "transparent",
                    boxShadow: active === s.id ? "inset 0 0 0 1px #e6e3da" : "none",
                    fontSize: 15, color: "#16181d", fontWeight: active === s.id ? 800 : 500,
                  }}
                >
                  <span aria-hidden="true" className={active === s.id ? "ks-navdot ks-navdot-on" : "ks-navdot"} style={{
                    width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                    background: s.color,
                  }} />
                  {s.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => jump("contact")}
              className="ks-btn"
              style={{
                display: "block", width: "100%", marginTop: 14, padding: "14px 16px",
                border: "none", borderRadius: 12, cursor: "pointer",
                background: "linear-gradient(135deg, #1c1f26 0%, #2e323c 100%)",
                color: "#fff", fontWeight: 800, letterSpacing: "0.04em", fontSize: 14,
                borderBottom: "3px solid #c00000", boxShadow: "0 2px 8px rgba(22,24,29,0.18)",
              }}
            >
              Get in touch
            </button>
          </nav>

          {/* Main content */}
          <main style={{ flex: 1, minWidth: 300 }}>
            {/* On Air */}
            <section ref={(el) => (refs.current.onair = el)}>
              <div style={{ background: "linear-gradient(135deg, #ffffff 0%, #fbfaf6 100%)", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", borderLeft: "6px solid #c00000", padding: "28px 30px", fontFamily: DISPLAY, fontSize: 19, lineHeight: 1.75 }}>
                I help organizations move important work forward through substantial change. For
                more than two decades, I have led community media organizations through start-up,
                restructuring, major facility projects, new systems, and board transitions across
                five states. My work now extends into civic and environmental organizations. I
                bring a practical approach to operations, governance, strategy, communications,
                staff, budgets, resistance, and trust. Done well, change leaves an organization
                stronger, clearer, and ready for what comes next.
              </div>
              <div style={{ marginTop: 20, background: "#fff", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", padding: "22px 26px" }}>
                <div style={{ fontSize: 15.5, fontWeight: 700, color: "#16181d", marginBottom: 4 }}>Facing a specific organizational challenge?</div>
                <div style={{ fontSize: 13.5, color: "#5c5a54", marginBottom: 14 }}>Choose a challenge to see related experience.</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {FACETS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => { setFacet(f.id); jump("guide"); }}
                      className="ks-nav"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 16px",
                        borderRadius: 999, cursor: "pointer", fontSize: 13.5, fontWeight: 500,
                        border: "1px solid #e6e3da", background: "#fff", color: "#2b2a26",
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: f.color, display: "inline-block", flexShrink: 0 }} />
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Program Guide */}
            <section ref={(el) => (refs.current.guide = el)}>
              <SectionHeading color="#0000c0">Experience</SectionHeading>
              <CareerHighlights lead={activeFacet ? activeFacet.lead : null} />
              <div style={{ borderLeft: "2px solid #e6e3da", paddingLeft: 22 }}>
                {[
                  { when: "2022 to present", what: "Independent Consultant / Product Builder", note: "Advise nonprofit and civic organizations on strategy, governance, organizational structure, communications, and implementation. Alongside consulting work, design, build, and launch independent products and platforms, including governance tools, digital resources, publishing projects, and AI-assisted applications. Current work spans product development, web platforms, organizational problem-solving, and turning complex ideas into clear, usable systems and resources." },
                  { when: "2023 to 2024 · selected engagement", what: "Project Manager, CEC Environmental Hub, Santa Barbara, CA", note: "Directed the final build-out and operational launch of the Community Environmental Council's downtown hub. Managed a $400K procurement budget, coordinated construction, architecture, IT, and AV teams, led the relocation from temporary offices, and developed activation plans, operating policies, and opening events. Established the partnership with TV Santa Barbara that brought a TVSB satellite space into the building.", nested: true },
                  { when: "2017 to 2022", what: "Chief Executive Officer, Midpen Media Center, Palo Alto, CA", note: "Led the organizational restructure of a nonprofit community media organization. Partnered with the board on governance and strategic planning, diversified revenue through donors and grants, built partnerships with universities, school districts, and arts organizations, and advocated for community media access at the local, state, and national levels. Hosted the ACM Western Regional Conference." },
                  { when: "2015 to 2017", what: "Public Information Officer / Cable Television Manager, City of Santa Monica, CA", note: "Restructured the city's media operation spanning cable channels, digital platforms, and a radio station. Reorganized staffing, directed programming strategy, managed capital improvements and operating budgets, and advised city leadership on legislative and industry issues. The channels earned ACM's Overall Excellence in Government Programming." },
                  { when: "2012 to 2015", what: "Executive Director / CEO, Pasadena Media, Pasadena, CA", note: "Led an organizational restructure alongside a major facility relocation and studio build. Opened a new all-digital facility in 2014 while leading 16 staff and managing a $1.2 million budget. Diversified revenue through grants, sponsorships, and partnerships, and hosted the ACM national conference in 2015." },
                ].map((r, i) => (
                  <div key={i} style={{ marginBottom: 22, marginLeft: r.nested ? 24 : 0, paddingLeft: r.nested ? 16 : 0, borderLeft: r.nested ? "3px solid #0000c0" : "none" }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.14em", color: "#8a877e", fontWeight: 700, textTransform: "uppercase" }}>{r.when}</div>
                    <div style={{ fontSize: 17, fontWeight: 700, color: "#16181d", margin: "3px 0" }}>{r.what}</div>
                    <div style={{ fontSize: 15, lineHeight: 1.6 }}>{r.note}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 8, background: "#fff", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", padding: "22px 26px" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.14em", fontWeight: 700, color: "#5c5a54", textTransform: "uppercase", marginBottom: 8 }}>Earlier Career & Leadership · 1991 to 2011</div>
                <p style={{ margin: "0 0 12px", lineHeight: 1.75, fontSize: 15 }}>
                  Began as a part-time production specialist at PATV in Iowa City after first
                  joining the station as a volunteer. Helped relocate the station in 1995, then
                  became the City of Iowa City's first community programmer for its government
                  access station.
                </p>
                <p style={{ margin: "0 0 12px", lineHeight: 1.75, fontSize: 15 }}>
                  From 1999 to 2011, launched Klamath Falls Community TV in Oregon, built Puget
                  Sound Access in South King County, Washington, from an empty warehouse into an
                  established media center, launched PortMedia in Newburyport, Massachusetts, and
                  led Santa Barbara Channels, now TV Santa Barbara, through a facility relocation
                  and new station build.
                </p>
                <p style={{ margin: 0, lineHeight: 1.75, fontSize: 15, color: "#5c5a54" }}>
                  The field found me before the job titles did. I walked into PATV as a University
                  of Iowa student looking for production tools and never really left.
                </p>
              </div>

              <p style={{ marginTop: 18, fontSize: 14.5, lineHeight: 1.7, color: "#5c5a54" }}>
                <strong style={{ color: "#2b2a26" }}>Education:</strong> BA, Visual Communication, University of Iowa · Graduate coursework in Nonprofit Leadership, Seattle University · Leadership Institute, Santa Clara University
              </p>
            </section>



            {/* Capabilities */}
            <section ref={(el) => (refs.current.skills = el)}>
              <SectionHeading color="#00c000">Capabilities</SectionHeading>
              <RangeMatrix />
              <CapabilityGroups />
              <div style={{ background: "#fff", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", padding: "20px 22px", lineHeight: 1.7, fontSize: 15 }}>
                <strong>How I work:</strong> plain talk, clear scope, and changes sized to the
                problem. I give teams real ownership of the work, choose tools for fit rather than
                fashion, and leave organizations with practical systems they can run without me.
              </div>
            </section>

            {/* Field Leadership & Recognition */}
            <section ref={(el) => (refs.current.field = el)}>
              <SectionHeading color="#00c0c0">Leadership &amp; Recognition</SectionHeading>
              <p style={{ lineHeight: 1.7, margin: "0 0 26px" }}>
                Community media is my professional home. I spent 14 years in leadership with its
                national association, from regional board service to chairing ACM's national Board
                of Directors while the association hired its first president. That work built a
                national network of station leaders, city officials, vendors, and peers, along with
                deep advocacy experience from council chambers to state and federal policy. When an
                organization needs a peer example, a candidate, a franchise precedent, or a partner,
                I usually know where to look.
              </p>

              <div style={{ fontSize: 12, letterSpacing: "0.14em", fontWeight: 700, color: "#5c5a54", textTransform: "uppercase", marginBottom: 12 }}>Field Leadership and Milestones</div>
              <RecognitionTimeline />

              <div style={{ fontSize: 12, letterSpacing: "0.14em", fontWeight: 700, color: "#5c5a54", textTransform: "uppercase", marginBottom: 12, marginTop: 28 }}>Selected Recognition</div>
              <div style={{ background: "#fff", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", padding: "10px 26px" }}>
                {[
                  { name: "Sue Buske National Leadership Award", org: "Alliance for Community Media · 2011" },
                  { name: "Overall Excellence in Government Programming", org: "Alliance for Community Media · 2017 · City of Santa Monica" },
                  { name: "5 National Hometown Media Awards", org: "Alliance for Community Media · Pasadena Media" },
                  { name: "4 SCAN-NATOA STAR Awards for Government Programming", org: "States of California and Nevada Chapter of NATOA · City of Santa Monica" },
                  { name: "2 Telly Awards for Excellence in Film & Video Programming", org: "Telly Awards · Pasadena Media" },
                  { name: "3 Best of the Northwest Media Awards", org: "ACM Northwest Region" },
                  { name: "San Gabriel Valley Women Achiever", org: "Business Life Magazine · 2014" },
                ].map((a, i) => (
                  <div key={i} style={{ padding: "13px 0", borderBottom: i < 6 ? "1px solid #f2f0e8" : "none" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#16181d" }}>{a.name}</div>
                    <div style={{ fontSize: 13, color: "#8a877e", marginTop: 2 }}>{a.org}</div>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: 12, fontSize: 12.5, color: "#8a877e", lineHeight: 1.6 }}>
                Also not listed: the many awards earned by producers and station members during
                these leadership periods.
              </p>
            </section>

            {/* In Their Words */}
            <section ref={(el) => (refs.current.words = el)}>
              <SectionHeading color="#c0c000">In Their Words</SectionHeading>
              <Testimonials />
              <p style={{ marginTop: 14, fontSize: 12.5, color: "#8a877e", lineHeight: 1.6 }}>
                From LinkedIn recommendations, lightly trimmed for length. Additional
                recommendations, including from direct reports across two decades, are available on{" "}
                <a href="https://www.linkedin.com/in/keristokstad/" target="_blank" rel="noreferrer" style={{ color: "#8a877e" }}>LinkedIn</a>.
              </p>
            </section>

            {/* Current Work */}
            <section ref={(el) => (refs.current.productions = el)}>
              <SectionHeading color="#c000c0">Current Work</SectionHeading>
              <p style={{ margin: "0 0 16px", lineHeight: 1.7 }}>
                My current work spans consulting, product development, publishing, and independent
                digital projects. I research, write, design, and build much of this work myself,
                often taking an idea from early concept through launch.
              </p>
              <p style={{ margin: "0 0 16px", lineHeight: 1.7 }}>
                My debut novel,{" "}
                <a href="https://www.keristokstadwrites.com/honor-flight" target="_blank" rel="noreferrer" style={{ color: "#16181d" }}><em>Honor Flight</em></a>, and{" "}
                <a href="https://www.badboards.org/" target="_blank" rel="noreferrer" style={{ color: "#16181d" }}><em>Bad Boards</em></a>, my book on
                nonprofit board patterns, are both now published. I also develop digital tools and
                resources around governance, grief and life transitions, family storytelling, and
                other areas where I see a problem worth solving. Fiction and publishing projects live
                at{" "}
                <a href="https://www.keristokstadwrites.com/" target="_blank" rel="noreferrer" style={{ color: "#16181d" }}>keristokstadwrites.com</a>.
              </p>
              <ProjectList />
            </section>

            {/* Professional Service */}
            <section ref={(el) => (refs.current.volunteer = el)}>
              <SectionHeading color="#c0c0c0">Professional Service</SectionHeading>
              <div style={{ borderLeft: "2px solid #e6e3da", paddingLeft: 22 }}>
                {[
                  { when: "Nov 2012 to Nov 2014", what: "Chair, Board of Directors, Alliance for Community Media", note: "Chaired the national board while ACM hired its first president." },
                  { when: "2006 to 2016", what: "Board Member, Alliance for Community Media", note: "Ten years of service across the Northwest Region, Western Region, and national boards of directors." },
                  { when: "Ongoing", what: "Committee Work and Panel Moderation, Alliance for Community Media", note: "Continued service includes committee work and field-panel moderation. Previous conference leadership includes hosting the 2015 ACM National Conference and the ACM Western Regional Conference." },
                ].map((r, i) => (
                  <div key={i} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.14em", color: "#8a877e", fontWeight: 700, textTransform: "uppercase" }}>{r.when}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#16181d", margin: "3px 0" }}>{r.what}</div>
                    <div style={{ fontSize: 14.5, lineHeight: 1.6 }}>{r.note}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact */}
            <section ref={(el) => (refs.current.contact = el)}>
              <SectionHeading color="#c00000">Contact</SectionHeading>
              <div style={{ background: "linear-gradient(135deg, #ffffff 0%, #fbfaf6 100%)", border: "1px solid #e6e3da", borderRadius: 14, boxShadow: "0 1px 3px rgba(22,24,29,0.05), 0 8px 24px rgba(22,24,29,0.04)", padding: "28px 30px" }}>
                <p style={{ margin: "0 0 20px", lineHeight: 1.7, fontSize: 16 }}>
                  If your organization is navigating change and needs steady hands, write to me
                  here. I read every message and reply directly.
                </p>
                {sent ? (
                  <div style={{ padding: "16px 18px", background: "#f0efe9", borderRadius: 12, fontSize: 15, lineHeight: 1.6 }}>
                    {cWantResume
                      ? "Message sent. I will send my resume to the address you provided."
                      : "Message sent. I will get back to you at the address you provided."}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 560 }}>
                    <input
                      value={cName} onChange={(e) => setCName(e.target.value)} placeholder="Name"
                      className="ks-input" style={{ border: "1px solid #e6e3da", borderRadius: 10, padding: "13px 15px", fontSize: 15, outline: "none", background: "#fff" }}
                    />
                    <input
                      value={cEmail} onChange={(e) => setCEmail(e.target.value)} placeholder="Email" type="email"
                      className="ks-input" style={{ border: "1px solid #e6e3da", borderRadius: 10, padding: "13px 15px", fontSize: 15, outline: "none", background: "#fff" }}
                    />
                    <textarea
                      value={cMsg} onChange={(e) => setCMsg(e.target.value)} placeholder="What are you facing?" rows={5}
                      className="ks-input" style={{ border: "1px solid #e6e3da", borderRadius: 10, padding: "13px 15px", fontSize: 15, outline: "none", background: "#fff", fontFamily: "inherit", resize: "vertical" }}
                    />
                    <input
                      value={cCompany} onChange={(e) => setCCompany(e.target.value)} tabIndex={-1} autoComplete="off"
                      aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                    />
                    <div style={{ borderTop: "1px solid #eeece4", paddingTop: 14 }}>
                      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 14.5, lineHeight: 1.5 }}>
                        <input
                          type="checkbox" checked={cWantResume} onChange={(e) => setCWantResume(e.target.checked)}
                          style={{ marginTop: 3, width: 16, height: 16, accentColor: "#c00000", cursor: "pointer", flexShrink: 0 }}
                        />
                        <span>Please send me a copy of your resume</span>
                      </label>
                      {cWantResume && (
                        <div style={{ marginTop: 12, paddingLeft: 26 }}>
                          <div style={{ fontSize: 13, color: "#5c5a54", marginBottom: 6 }}>Role or engagement type</div>
                          <select
                            value={cRole} onChange={(e) => setCRole(e.target.value)}
                            className="ks-input" style={{ border: "1px solid #e6e3da", borderRadius: 10, padding: "11px 13px", fontSize: 14.5, outline: "none", background: "#fff", fontFamily: "inherit", maxWidth: 340, width: "100%" }}
                          >
                            {["General", "Executive Director", "Chief Executive Officer", "Chief Operating Officer", "Interim or Fractional Executive", "Communications or Public Information", "Board or Advisory Role", "Consulting Engagement"].map((r) => (
                              <option key={r} value={r}>{r}</option>
                            ))}
                          </select>
                          <div style={{ fontSize: 12.5, color: "#8a877e", marginTop: 8, lineHeight: 1.5 }}>
                            I send resumes personally rather than posting them for download.
                          </div>
                        </div>
                      )}
                    </div>
                    {contactError && <div style={{ color: "#c00000", fontSize: 14 }}>{contactError}</div>}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
                      <button
                        onClick={submitContact} disabled={sending}
                        className="ks-btn" style={{ border: "none", background: "linear-gradient(135deg, #1c1f26 0%, #2e323c 100%)", color: "#fff", fontWeight: 800, letterSpacing: "0.04em", padding: "14px 28px", fontSize: 14, cursor: "pointer", borderRadius: 12, borderBottom: "3px solid #c00000", boxShadow: "0 2px 8px rgba(22,24,29,0.18)" }}
                      >
                        {sending ? "Sending…" : "Send message"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Public+Sans:wght@400;500;600;700;800&display=swap');
        .ks-btn { transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease; }
        .ks-btn:hover { transform: translateY(-1px); filter: brightness(1.05); box-shadow: 0 6px 18px rgba(22,24,29,0.22); }
        .ks-btn:focus-visible, .ks-input:focus-visible { outline: 2px solid #16181d; outline-offset: 2px; }
        .ks-input { transition: border-color 0.15s ease, box-shadow 0.15s ease; }
        .ks-nav { transition: background 0.15s ease; }
        .ks-burger { display: none; }
        .ks-mobile-only { display: none; }
        @media (max-width: 760px) {
          .ks-mobile-only { display: block; }
          .ks-desktop-only { display: none !important; }
        }
        @media (max-width: 760px) {
          .ks-burger { display: flex; }
          .ks-sidenav { display: none; }
        }
        .ks-proj summary::-webkit-details-marker { display: none; }
        .ks-chev::after { content: "+"; }
        .ks-proj[open] .ks-chev::after { content: "−"; }
        .ks-proj summary:hover { background: #fbfaf5; }
        .ks-proj summary:focus-visible { outline: 2px solid #16181d; outline-offset: -2px; }
        .ks-nav:hover { background: #f4f3ec; }
        .ks-nav:focus-visible { outline: 2px solid #16181d; outline-offset: 2px; }
        .ks-navdot { opacity: 0.6; transition: opacity 0.15s ease; }
        .ks-nav:hover .ks-navdot, .ks-nav:focus-visible .ks-navdot { opacity: 0.8; }
        .ks-navdot-on, .ks-nav:hover .ks-navdot-on, .ks-nav:focus-visible .ks-navdot-on { opacity: 1; }
        .ks-input:focus { border-color: #16181d; box-shadow: 0 0 0 3px rgba(22,24,29,0.08); }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>
    </div>
  );
}
