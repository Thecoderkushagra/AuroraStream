// features/public/reset/ForgotPassword.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../components/common/Logo";

export default function ForgotPassword() {
    const [focused, setFocused] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1200);
    };

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
        opacity: isSubmitted ? 0.6 : 1,
        pointerEvents: isSubmitted ? "none" : "auto",
    });

    return (
        <div style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "20px",
            padding: "40px 36px 36px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.3), 0 0 80px rgba(0,123,255,0.04)",
            width: "100%",
            maxWidth: "420px",
            margin: "0 auto",
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
                    Reset Password
                </h2>
                <p style={{
                    fontSize: "14px",
                    color: "var(--color-text-muted)",
                    margin: 0,
                    fontWeight: 400,
                    lineHeight: "1.5",
                }}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                        required
                        placeholder="you@example.com"
                        style={inputStyle("email")}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        disabled={isSubmitted || isSubmitting}
                    />
                </div>

                {/* Status Message (shows after submit) */}
                {isSubmitted && (
                    <div style={{
                        padding: "12px 16px",
                        background: "var(--color-live-bg)",
                        border: "1px solid var(--color-live)",
                        borderRadius: "var(--radius-md)",
                        color: "var(--color-live)",
                        fontSize: "13px",
                        fontWeight: 500,
                        textAlign: "center",
                    }}>
                        If an account exists, a reset link has been sent to your email.
                    </div>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitted || isSubmitting}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "15px",
                        fontWeight: 700,
                        fontFamily: "'Urbanist', sans-serif",
                        color: "#fff",
                        background: hovered && !isSubmitted && !isSubmitting
                            ? "var(--color-primary-hover)"
                            : (isSubmitted ? "var(--color-live)" : "var(--color-primary)"),
                        border: "none",
                        borderRadius: "var(--radius-lg)",
                        cursor: (isSubmitted || isSubmitting) ? "default" : "pointer",
                        transition: "background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
                        boxShadow: hovered && !isSubmitted && !isSubmitting
                            ? "0 0 24px rgba(0,123,255,0.4)"
                            : (isSubmitted ? "0 2px 12px rgba(34,197,94,0.2)" : "0 2px 12px rgba(0,123,255,0.2)"),
                        transform: hovered && !isSubmitted && !isSubmitting ? "translateY(-1px)" : "none",
                        marginTop: "8px",
                        letterSpacing: "0.02em",
                        opacity: isSubmitting ? 0.8 : 1,
                    }}
                >
                    {isSubmitting ? "Sending..." : isSubmitted ? "Link Sent" : "Send Reset Link"}
                </button>
            </form>

            {/* Back to Login link */}
            <div style={{
                marginTop: "28px",
                textAlign: "center",
            }}>
                <p style={{
                    fontSize: "14px",
                    color: "var(--color-text-muted)",
                    margin: 0,
                }}>
                    Remember your password?{" "}
                    <Link to="/login" style={{
                        color: "var(--color-primary)",
                        textDecoration: "none",
                        fontWeight: 600,
                        transition: "color 0.2s",
                    }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
