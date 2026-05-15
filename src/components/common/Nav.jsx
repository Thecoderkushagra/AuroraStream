import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Nav() {
    return (
        <>
            <style>{`
                .nav-link {
                  color: var(--color-text-muted);
                  text-decoration: none;
                  font-size: 14px;
                  font-weight: 500;
                  transition: color 0.2s;
                }
                .nav-link:hover { color: var(--color-text-primary); }
            `}</style>
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 48px", height: "85px",
                background: "rgba(26,29,32,0.8)", backdropFilter: "blur(16px)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: "none" }}><Logo /></Link>

                {/* Links */}
                <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
                    <a href="/#features" className="nav-link">Features</a>
                    <a href="/#browse" className="nav-link">Browse</a>
                    <Link to="/pricing" className="nav-link">Pricing</Link>
                </div>

                {/* Auth */}
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <Link to="/login" className="nav-link">Sign in</Link>
                    <Link to="/signup" style={{
                        background: "var(--color-primary)", color: "#fff",
                        padding: "8px 20px", borderRadius: "8px", fontSize: "14px",
                        fontWeight: 600, textDecoration: "none",
                        transition: "background 0.2s",
                    }}>Get Started</Link>
                </div>
            </nav>
        </>
    );
}
