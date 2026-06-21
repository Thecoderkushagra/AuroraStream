import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Nav from "../../../components/common/Nav";

/* ── Fake content tiles ─────────────────────────────────── */
const TILES = [
    { id: 1, title: "Neon Requiem", genre: "Sci-Fi", dur: "2h 14m", color: "#1a3a5c" },
    { id: 2, title: "Last Orbit", genre: "Thriller", dur: "1h 58m", color: "#1c2e1a" },
    { id: 3, title: "Hollow Season", genre: "Drama", dur: "S1 · 8ep", color: "#2e1a2e" },
    { id: 4, title: "Deep Signal", genre: "Mystery", dur: "1h 44m", color: "#1a2a3a" },
    { id: 5, title: "Vanta City", genre: "Action", dur: "2h 02m", color: "#2e1a1a" },
    { id: 6, title: "Aurora Protocol", genre: "Sci-Fi", dur: "S2 · 10ep", color: "#0d2233" },
    { id: 7, title: "Glass Meridian", genre: "Thriller", dur: "1h 51m", color: "#1a1a2e" },
    { id: 8, title: "Ember State", genre: "Romance", dur: "S1 · 6ep", color: "#2e1f12" },
];

const FEATURES = [
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 9.5v9l9-4.5-9-4.5z" fill="currentColor" />
            </svg>
        ),
        title: "1080p Full HD",
        desc: "Stream in crystal-clear 1080p FHD with Dolby Atmos surround sound.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="3" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <rect x="14" y="10" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 22h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: "All Your Devices",
        desc: "Watch seamlessly on TV, laptop, tablet, or phone — pick up where you left off.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3L17.5 10.5L26 11.5L20 17.5L21.5 26L14 22L6.5 26L8 17.5L2 11.5L10.5 10.5L14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
        ),
        title: "No Ads",
        desc: "Pure uninterrupted viewing on Standard and Premium plans. No mid-roll ads, no banners, no distractions.",
    },
    {
        icon: (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M4 14C4 8.477 8.477 4 14 4s10 4.477 10 10-4.477 10-10 10S4 19.523 4 14z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M14 9v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Download & Go",
        desc: "Take your watchlist offline. Perfect for flights, commutes, or anywhere.",
    },
];

/* ── Animated aurora orbs ────────────────────────────────── */
function AuroraOrbs() {
    return (
        <div aria-hidden="true" style={{
            position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0
        }}>
            <div style={{
                position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
                width: "900px", height: "500px",
                background: "radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, rgba(0,123,255,0.12) 40%, transparent 70%)",
                animation: "orbFloat 8s ease-in-out infinite",
            }} />
            <div style={{
                position: "absolute", top: "20%", left: "-15%",
                width: "600px", height: "600px",
                background: "radial-gradient(ellipse, rgba(0,123,255,0.06) 0%, transparent 65%)",
                animation: "orbFloat 11s ease-in-out infinite reverse",
            }} />
            <div style={{
                position: "absolute", top: "10%", right: "-10%",
                width: "500px", height: "500px",
                background: "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 65%)",
                animation: "orbFloat 9s ease-in-out infinite 2s",
            }} />
        </div>
    );
}

/* ── Content tile ────────────────────────────────────────── */
function Tile({ tile, delay }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                minWidth: "160px", height: "230px", borderRadius: "10px",
                background: tile.color,
                border: hovered ? "1px solid rgba(0,212,255,0.5)" : "1px solid rgba(255,255,255,0.06)",
                position: "relative", overflow: "hidden", cursor: "pointer", flexShrink: 0,
                transition: "transform 0.3s ease, border-color 0.3s ease",
                transform: hovered ? "scale(1.04) translateY(-4px)" : "scale(1)",
                animationDelay: delay,
            }}
        >
            {/* shimmer lines */}
            <div style={{
                position: "absolute", inset: 0,
                background: "repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(255,255,255,0.015) 18px, rgba(255,255,255,0.015) 19px)",
            }} />
            {/* bottom info */}
            <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
            }}>
                <div style={{ fontSize: "10px", color: "var(--color-accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "3px" }}>
                    {tile.genre}
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
                    {tile.title}
                </div>
                <div style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "3px" }}>{tile.dur}</div>
            </div>
            {/* play button on hover */}
            {hovered && (
                <div style={{
                    position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)",
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "rgba(0,123,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center",
                    animation: "fadeIn 0.2s ease",
                }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                        <path d="M5 3.5l8 4.5-8 4.5V3.5z" />
                    </svg>
                </div>
            )}
        </div>
    );
}

/* ── Main Landing ────────────────────────────────────────── */
export default function Landing() {
    const scrollRef = useRef(null);

    // auto-scroll the tile strip
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        let frame;
        let pos = 0;
        const tick = () => {
            pos += 0.4;
            if (pos >= el.scrollWidth / 2) pos = 0;
            el.scrollLeft = pos;
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        const pause = () => cancelAnimationFrame(frame);
        const resume = () => { frame = requestAnimationFrame(tick); };
        el.addEventListener("mouseenter", pause);
        el.addEventListener("mouseleave", resume);
        return () => {
            cancelAnimationFrame(frame);
            el.removeEventListener("mouseenter", pause);
            el.removeEventListener("mouseleave", resume);
        };
    }, []);

    return (
        <>
            <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmerLine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        .anim-hero-tag  { animation: fadeInUp 0.6s ease both; animation-delay: 0.1s; }
        .anim-hero-h1   { animation: fadeInUp 0.7s ease both; animation-delay: 0.25s; }
        .anim-hero-sub  { animation: fadeInUp 0.7s ease both; animation-delay: 0.4s; }
        .anim-hero-cta  { animation: fadeInUp 0.7s ease both; animation-delay: 0.55s; }
        .anim-hero-note { animation: fadeInUp 0.7s ease both; animation-delay: 0.7s; }

        .tiles-strip { display: flex; gap: 14px; overflow-x: auto; scrollbar-width: none; padding: 8px 0; }
        .tiles-strip::-webkit-scrollbar { display: none; }

        .feature-card {
          background: var(--color-bg-surface);
          border: 1px solid var(--color-border);
          border-radius: 14px;
          padding: 28px 24px;
          transition: border-color 0.3s, transform 0.3s;
          animation: fadeInUp 0.6s ease both;
        }
        .feature-card:hover {
          border-color: rgba(0,123,255,0.45);
          transform: translateY(-4px);
        }

        .cta-primary {
          background: var(--color-primary);
          color: #fff;
          padding: 14px 36px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 16px;
          text-decoration: none;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          display: inline-block;
        }
        .cta-primary:hover {
          background: var(--color-primary-hover);
          box-shadow: 0 0 28px rgba(0,123,255,0.45);
          transform: translateY(-1px);
        }
        .cta-ghost {
          color: var(--color-text-secondary);
          padding: 14px 32px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          text-decoration: none;
          border: 1px solid var(--color-border-strong);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          display: inline-block;
        }
        .cta-ghost:hover {
          border-color: var(--color-primary);
          color: var(--color-text-primary);
          background: var(--color-primary-muted);
        }

        .stat-num {
          font-size: 36px; font-weight: 800; color: var(--color-text-primary);
          background: linear-gradient(90deg, #00d4ff, #007bff);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .divider-line {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: 0;
        }

        .section-label {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-accent);
          font-weight: 600;
          margin-bottom: 12px;
        }
      `}</style>

            <div style={{ minHeight: "100vh", background: "var(--color-bg-base)", color: "var(--color-text-primary)", fontFamily: "'Urbanist', sans-serif", overflowX: "hidden" }}>

                {/* ── NAV ── */}
                <Nav />

                {/* ── HERO ── */}
                <section style={{ position: "relative", paddingTop: "140px", paddingBottom: "80px", textAlign: "center", overflow: "hidden" }}>
                    <AuroraOrbs />



                    <div style={{ position: "relative", zIndex: 1, maxWidth: "780px", margin: "0 auto", padding: "0 24px" }}>

                        {/* Tag */}
                        <div className="anim-hero-tag" style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(0,123,255,0.1)", border: "1px solid rgba(0,123,255,0.25)",
                            borderRadius: "9999px", padding: "6px 16px", marginBottom: "28px",
                        }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--color-live)", display: "inline-block", animation: "aurora-pulse 2s ease-in-out infinite" }} />
                            <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-accent)", letterSpacing: "0.06em" }}>Now Streaming · FHD Available</span>
                        </div>

                        {/* H1 */}
                        <h1 className="anim-hero-h1" style={{
                            fontSize: "clamp(46px, 8vw, 80px)", fontWeight: 900, lineHeight: 1.05,
                            letterSpacing: "-0.03em", marginBottom: "24px",
                        }}>
                            Cinema lives{" "}
                            <span style={{
                                background: "linear-gradient(90deg, #00d4ff 0%, #007bff 60%)",
                                WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                                display: "inline-block",
                            }}>
                                inside your screen.
                            </span>
                        </h1>

                        {/* Sub */}
                        <p className="anim-hero-sub" style={{
                            fontSize: "18px", color: "var(--color-text-muted)", lineHeight: 1.7,
                            maxWidth: "520px", margin: "0 auto 40px", fontWeight: 400,
                        }}>
                            Thousands of movies, series & originals — Now stream in FHD, across all your devices.
                        </p>

                        {/* CTA */}
                        <div className="anim-hero-cta" style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                            <Link to="/signup" className="cta-primary">Start Watching Free</Link>
                            <Link to="/browse" className="cta-ghost">
                                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M4 2l9 6-9 6V2z" /></svg>
                                    Watch Trailer
                                </span>
                            </Link>
                        </div>

                        {/* Fine print */}
                        <p className="anim-hero-note" style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "20px" }}>
                            No credit card required · Start with UPI now
                        </p>
                    </div>

                    {/* Stats bar */}
                    <div style={{
                        position: "relative", zIndex: 1,
                        display: "flex", justifyContent: "center", gap: "64px",
                        marginTop: "72px", padding: "32px 0",
                        borderTop: "1px solid var(--color-border)",
                        borderBottom: "1px solid var(--color-border)",
                        flexWrap: "wrap",
                        animation: "fadeInUp 0.8s ease both 0.85s",
                        opacity: 0,
                    }}>
                        {[["10K+", "Titles"], ["4K", "Ultra HD"], ["150+", "Countries"], ["5★", "Avg. Rating"]].map(([num, label]) => (
                            <div key={label} style={{ textAlign: "center" }}>
                                <div className="stat-num">{num}</div>
                                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginTop: "2px", fontWeight: 500 }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── BROWSE STRIP ── */}
                <section id="browse" style={{ padding: "64px 0 48px" }}>
                    <div style={{ padding: "0 48px", marginBottom: "20px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                        <div>
                            <p className="section-label">Trending Now</p>
                            <h2 style={{ fontSize: "24px", fontWeight: 800, margin: 0 }}>What everyone's watching</h2>
                        </div>
                        <Link to="/browse" style={{ fontSize: "13px", color: "var(--color-text-accent)", textDecoration: "none", fontWeight: 600 }}>Browse all →</Link>
                    </div>

                    {/* Fade edges */}
                    <div style={{ position: "relative" }}>
                        <div style={{
                            position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
                            background: "linear-gradient(90deg, var(--color-bg-base), transparent)",
                            pointerEvents: "none",
                        }} />
                        <div style={{
                            position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", zIndex: 2,
                            background: "linear-gradient(270deg, var(--color-bg-base), transparent)",
                            pointerEvents: "none",
                        }} />
                        <div ref={scrollRef} className="tiles-strip" style={{ padding: "8px 48px" }}>
                            {/* Duplicate for seamless loop */}
                            {[...TILES, ...TILES].map((tile, i) => (
                                <Tile key={`${tile.id}-${i}`} tile={tile} delay={`${(i % 8) * 0.05}s`} />
                            ))}
                        </div>
                    </div>
                </section>

                <hr className="divider-line" />

                {/* ── FEATURES ── */}
                <section id="features" style={{ padding: "80px 48px" }}>
                    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                        <div style={{ textAlign: "center", marginBottom: "56px" }}>
                            <p className="section-label">Why Aurora Stream</p>
                            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, margin: 0 }}>Built for the way you watch</h2>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                            {FEATURES.map((f, i) => (
                                <div key={f.title} className="feature-card" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div style={{ color: "var(--color-accent)", marginBottom: "16px" }}>{f.icon}</div>
                                    <h3 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 8px" }}>{f.title}</h3>
                                    <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.65 }}>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <hr className="divider-line" />

                {/* ── FINAL CTA BANNER ── */}
                <section style={{ padding: "96px 48px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                    {/* Glow */}
                    <div aria-hidden="true" style={{
                        position: "absolute", bottom: "-60px", left: "50%", transform: "translateX(-50%)",
                        width: "700px", height: "300px",
                        background: "radial-gradient(ellipse, rgba(0,123,255,0.1), transparent 70%)",
                        pointerEvents: "none",
                    }} />
                    <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
                        <p className="section-label">Start Today</p>
                        <h2 style={{ fontSize: "clamp(28px, 5vw, 50px)", fontWeight: 900, lineHeight: 1.1, marginBottom: "20px" }}>
                            Your next favourite film is{" "}
                            <span style={{
                                background: "linear-gradient(90deg, #00d4ff, #007bff)",
                                WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}>waiting.</span>
                        </h2>
                        <p style={{ fontSize: "16px", color: "var(--color-text-muted)", marginBottom: "36px", lineHeight: 1.6 }}>
                            Join with millions of viewers on Aurora Stream.
                        </p>
                        <Link to="/signup" className="cta-primary" style={{ fontSize: "17px", padding: "16px 48px" }}>
                            Create Free Account
                        </Link>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer style={{
                    borderTop: "1px solid var(--color-border)",
                    padding: "32px 48px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    flexWrap: "wrap", gap: "16px",
                }}>
                    <div style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                        © 2025 Aurora Stream. All rights reserved.
                    </div>
                    <div style={{ display: "flex", gap: "28px" }}>
                        {["Privacy", "Terms", "Help", "Careers"].map(l => (
                            <a key={l} href="#" className="nav-link" style={{ fontSize: "13px" }}>{l}</a>
                        ))}
                    </div>
                </footer>

            </div>
        </>
    );
}