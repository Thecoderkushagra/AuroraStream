// features/public/pages/Signup.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../components/common/Logo";
import Otp from "../../../components/common/Otp";

export default function Signup() {
    const [focused, setFocused] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [agreed, setAgreed] = useState(false);
    
    // Form and OTP states
    const [showOtp, setShowOtp] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (agreed && nameInput && emailInput && passwordInput) {
            setUserEmail(emailInput);
            setShowOtp(true);
        }
    };

    if (showOtp) {
        return <Otp email={userEmail} />;
    }

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
                    Create your account
                </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Username / Name */}
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
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        required
                        style={inputStyle("username")}
                        onFocus={() => setFocused("username")}
                        onBlur={() => setFocused(null)}
                    />
                </div>

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
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                        style={inputStyle("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                    />
                </div>

                {/* Password */}
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
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        required
                        style={inputStyle("password")}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused(null)}
                    />
                </div>

                {/* Terms agreement checkbox */}
                <label style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    cursor: "pointer",
                    marginTop: "4px",
                }}>
                    <input
                        type="checkbox"
                        required
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        style={{
                            width: "16px",
                            height: "16px",
                            marginTop: "2px",
                            accentColor: "var(--color-primary)",
                            cursor: "pointer",
                            flexShrink: 0,
                        }}
                    />
                    <span style={{
                        fontSize: "12px",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.5,
                    }}>
                        By signing up, you agree to our{" "}
                        <Link to="/terms" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Terms</Link>
                        {" "}and{" "}
                        <Link to="/privacy" style={{ color: "var(--color-primary)", textDecoration: "none" }}>Privacy Policy</Link>.
                    </span>
                </label>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!agreed}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "15px",
                        fontWeight: 700,
                        fontFamily: "'Urbanist', sans-serif",
                        color: "#fff",
                        background: !agreed
                            ? "rgba(0, 123, 255, 0.35)"
                            : hovered
                                ? "var(--color-primary-hover)"
                                : "var(--color-primary)",
                        border: "none",
                        borderRadius: "var(--radius-lg)",
                        cursor: agreed ? "pointer" : "not-allowed",
                        transition: "background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease, opacity 0.2s ease",
                        boxShadow: !agreed
                            ? "none"
                            : hovered
                                ? "0 0 24px rgba(0,123,255,0.4)"
                                : "0 2px 12px rgba(0,123,255,0.2)",
                        transform: agreed && hovered ? "translateY(-1px)" : "none",
                        marginTop: "4px",
                        letterSpacing: "0.02em",
                        opacity: agreed ? 1 : 0.6,
                    }}
                >
                    Create Account
                </button>
            </form>

            {/* Divider */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                margin: "24px 0",
            }}>
                <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
                <span style={{ fontSize: "12px", color: "var(--color-text-muted)", fontWeight: 500 }}>or</span>
                <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            </div>

            {/* Login link */}
            <p style={{
                textAlign: "center",
                fontSize: "14px",
                color: "var(--color-text-muted)",
                margin: 0,
            }}>
                Already have an account?{" "}
                <Link to="/login" style={{
                    color: "var(--color-primary)",
                    textDecoration: "none",
                    fontWeight: 600,
                }}>
                    Sign in
                </Link>
            </p>
        </div>
    );
}