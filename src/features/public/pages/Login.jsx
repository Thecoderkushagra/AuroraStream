// features/public/pages/Login.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../assets/Logo";

export default function Login() {
    const [focused, setFocused] = useState(null);
    const [hovered, setHovered] = useState(false);

    const inputStyle = (name) => ({
        width: "100%",
        padding: "14px 16px",
        fontSize: "14px",
        fontWeight: 500,
        fontFamily: "'Urbanist', sans-serif",
        background: "var(--color-bg-base)",
        color: "var(--color-text-primary)",
        border: focused === name
            ? "1px solid var(--color-primary)"
            : "1px solid var(--color-border)",
        borderRadius: "var(--radius-lg)",
        outline: "none",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        boxShadow: focused === name
            ? "0 0 0 3px rgba(0, 123, 255, 0.12)"
            : "none",
    });

    return (
        <div style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "20px",
            padding: "40px 36px 36px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.3), 0 0 80px rgba(0,123,255,0.04)",
        }}>
            {/* Logo */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                <Logo />
            </div>

            {/* Heading */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <h2 style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "var(--color-text-primary)",
                    margin: "0 0 8px",
                    letterSpacing: "-0.02em",
                }}>
                    Welcome back
                </h2>
                <p style={{
                    fontSize: "14px",
                    color: "var(--color-text-muted)",
                    margin: 0,
                    fontWeight: 400,
                }}>
                    Sign in to continue streaming
                </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Email */}
                <div>
                    <label style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--color-text-muted)",
                        marginBottom: "6px",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                    }}>
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        style={inputStyle("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                    />
                </div>

                {/* Password */}
                <div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "6px",
                    }}>
                        <label style={{
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "var(--color-text-muted)",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                        }}>
                            Password
                        </label>
                        <a href="#" style={{
                            fontSize: "12px",
                            color: "var(--color-primary)",
                            textDecoration: "none",
                            fontWeight: 500,
                        }}>
                            Forgot?
                        </a>
                    </div>
                    <input
                        type="password"
                        placeholder="••••••••"
                        style={inputStyle("password")}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused(null)}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "15px",
                        fontWeight: 700,
                        fontFamily: "'Urbanist', sans-serif",
                        color: "#fff",
                        background: hovered
                            ? "var(--color-primary-hover)"
                            : "var(--color-primary)",
                        border: "none",
                        borderRadius: "var(--radius-lg)",
                        cursor: "pointer",
                        transition: "background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
                        boxShadow: hovered
                            ? "0 0 24px rgba(0,123,255,0.4)"
                            : "0 2px 12px rgba(0,123,255,0.2)",
                        transform: hovered ? "translateY(-1px)" : "none",
                        marginTop: "8px",
                        letterSpacing: "0.02em",
                    }}
                >
                    Sign In
                </button>
            </form>

            {/* Divider */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                margin: "28px 0",
            }}>
                <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
                <span style={{ fontSize: "12px", color: "var(--color-text-muted)", fontWeight: 500 }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            </div>

            {/* Sign up link */}
            <p style={{
                textAlign: "center",
                fontSize: "14px",
                color: "var(--color-text-muted)",
                margin: 0,
            }}>
                Don't have an account?{" "}
                <Link to="/signup" style={{
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    fontWeight: 600,
                }}>
                    Create one
                </Link>
            </p>
        </div>
    );
}