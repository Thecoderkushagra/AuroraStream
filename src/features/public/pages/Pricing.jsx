import { Link } from "react-router-dom";
import Nav from "../../../assets/Nav";
import "../../../index.css";
import { useState } from "react";

export default function Pricing() {
    const [annual, setAnnual] = useState(false);

    const plans = [
        {
            name: "Basic",
            desc: "For casual viewers.",
            monthlyPrice: "$8.99",
            annualPrice: "$89.99",
            features: [
                "1080p Resolution",
                "1 Screen at a time",
                "Ad-supported",
            ],
            color: "var(--color-text-secondary)",
            border: "var(--color-border)",
            glow: "none",
        },
        {
            name: "Standard",
            desc: "Great for most users.",
            monthlyPrice: "$13.99",
            annualPrice: "$139.99",
            features: [
                "4K Resolution",
                "2 Screens at a time",
                "Ad-free streaming",
                "Offline downloads",
            ],
            color: "var(--color-primary)",
            border: "var(--color-primary)",
            glow: "0 0 40px rgba(0, 123, 255, 0.15)",
            recommended: true,
        },
        {
            name: "Premium",
            desc: "The ultimate experience.",
            monthlyPrice: "$19.99",
            annualPrice: "$199.99",
            features: [
                "4K HDR & Dolby Vision",
                "4 Screens at a time",
                "Ad-free streaming",
                "Offline downloads",
                "Exclusive early access",
            ],
            color: "#8b5cf6",
            border: "#8b5cf6",
            glow: "0 0 40px rgba(139, 92, 246, 0.15)",
        }
    ];

    return (
        <div style={{ minHeight: "100vh", background: "var(--color-bg-base)", color: "var(--color-text-primary)", fontFamily: "'Urbanist', sans-serif" }}>
            {/* Navbar */}
            <Nav />

            {/* Header */}
            <div style={{ textAlign: "center", padding: "140px 24px 60px" }}>
                <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, marginBottom: "16px", letterSpacing: "-0.03em" }}>
                    Plans that fit your <span style={{ background: "linear-gradient(90deg, #00d4ff, #007bff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>needs.</span>
                </h1>
                <p style={{ fontSize: "18px", color: "var(--color-text-muted)", maxWidth: "500px", margin: "0 auto 40px" }}>
                    Choose the perfect plan for you. Upgrade, downgrade, or cancel at any time.
                </p>

                {/* Toggle */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: !annual ? "var(--color-text-primary)" : "var(--color-text-muted)", transition: "color 0.3s" }}>Monthly</span>
                    <button 
                        onClick={() => setAnnual(!annual)}
                        style={{
                            width: "56px", height: "32px", borderRadius: "100px",
                            background: "var(--color-bg-surface)",
                            border: "1px solid var(--color-border-strong)",
                            position: "relative", cursor: "pointer", transition: "all 0.3s ease",
                            padding: 0
                        }}
                    >
                        <div style={{
                            position: "absolute", top: "3px", left: annual ? "27px" : "3px",
                            width: "24px", height: "24px", borderRadius: "50%",
                            background: "var(--color-primary)",
                            transition: "all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"
                        }} />
                    </button>
                    <span style={{ fontSize: "14px", fontWeight: 600, color: annual ? "var(--color-text-primary)" : "var(--color-text-muted)", transition: "color 0.3s" }}>
                        Annually <span style={{ color: "#22c55e", background: "rgba(34, 197, 94, 0.12)", padding: "2px 8px", borderRadius: "100px", fontSize: "11px", marginLeft: "6px", fontWeight: 700 }}>Save 20%</span>
                    </span>
                </div>
            </div>

            {/* Pricing Cards */}
            <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", alignItems: "stretch" }}>
                {plans.map((plan, i) => (
                    <div key={plan.name} style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "var(--color-bg-surface)",
                        border: "1px solid " + plan.border,
                        borderRadius: "24px",
                        padding: "40px 32px",
                        position: "relative",
                        boxShadow: plan.glow,
                        zIndex: plan.recommended ? 2 : 1,
                        transition: "transform 0.3s ease"
                    }}>
                        {plan.recommended && (
                            <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "var(--color-primary)", color: "#fff", fontSize: "12px", fontWeight: 700, padding: "6px 16px", borderRadius: "100px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                                Most Popular
                            </div>
                        )}
                        <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 8px" }}>{plan.name}</h3>
                        <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: "0 0 24px" }}>{plan.desc}</p>
                        
                        <div style={{ marginBottom: "32px", display: "flex", alignItems: "baseline", gap: "4px" }}>
                            <span style={{ fontSize: "42px", fontWeight: 800, transition: "color 0.3s" }}>{annual ? plan.annualPrice : plan.monthlyPrice}</span>
                            <span style={{ fontSize: "14px", color: "var(--color-text-muted)", fontWeight: 500 }}>/{annual ? "year" : "mo"}</span>
                        </div>

                        <Link to="/signup" style={{
                            display: "block",
                            textAlign: "center",
                            width: "100%",
                            padding: "14px",
                            borderRadius: "12px",
                            background: plan.recommended ? "var(--color-primary)" : "transparent",
                            color: plan.recommended ? "#fff" : "var(--color-text-primary)",
                            border: plan.recommended ? "none" : "1px solid var(--color-border-strong)",
                            fontSize: "15px",
                            fontWeight: 700,
                            textDecoration: "none",
                            marginBottom: "32px",
                            transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s"
                        }}>
                            Get Started
                        </Link>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {plan.features.map(f => (
                                <div key={f} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: plan.color }}>
                                        <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" />
                                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span style={{ fontSize: "14px", color: "var(--color-text-secondary)", fontWeight: 500 }}>{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
