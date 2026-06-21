// features/public/pages/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../../../components/common/Logo";
import authService from "../../../services/authService";
import { ROLES } from "../../../utils/constants";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function Login() {
    const navigate = useNavigate();
    const [focused, setFocused] = useState(null);
    const [hovered, setHovered] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const data = await authService.login({
                username,
                password
            });
            
            // Store tokens in cookies
            if (data.jwt) {
                Cookies.set('jwt', data.jwt, { secure: true, sameSite: 'Strict' });
            }
            if (data.refresh) {
                Cookies.set('refresh', data.refresh, { secure: true, sameSite: 'Strict' });
            }

            toast.success("Login successful!");
            navigate("/user");
        } catch (error) {
            const errorMsg = error.response?.data?.Error || "Invalid credentials.";
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = (name) => ({
        width: "100%",
        padding: "14px 16px",
        fontSize: name === "password" ? "18px" : "14px",
        fontWeight: 500,
        fontFamily: name === "password" ? "sans-serif" : "'Urbanist', sans-serif",
        letterSpacing: name === "password" ? "4px" : "normal",
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
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Username */}
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
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        style={inputStyle("username")}
                        onFocus={() => setFocused("username")}
                        onBlur={() => setFocused(null)}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
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
                    </div>
                    <input
                        type="password"
                        placeholder="••••••••"
                        style={inputStyle("password")}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused(null)}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Link to="/forgotpasswd" style={{
                        fontSize: "12px",
                        color: "var(--color-primary)",
                        textDecoration: "none",
                        fontWeight: 500,
                    }}>
                        Forgot Password?
                    </Link>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isLoading}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "15px",
                        fontWeight: 700,
                        fontFamily: "'Urbanist', sans-serif",
                        color: "#fff",
                        background: hovered && !isLoading
                            ? "var(--color-primary-hover)"
                            : "var(--color-primary)",
                        border: "none",
                        borderRadius: "var(--radius-lg)",
                        cursor: isLoading ? "not-allowed" : "pointer",
                        transition: "background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
                        boxShadow: hovered && !isLoading
                            ? "0 0 24px rgba(0,123,255,0.4)"
                            : "0 2px 12px rgba(0,123,255,0.2)",
                        transform: hovered && !isLoading ? "translateY(-1px)" : "none",
                        marginTop: "8px",
                        letterSpacing: "0.02em",
                        opacity: isLoading ? 0.7 : 1,
                    }}
                >
                    {isLoading ? "Signing In..." : "Sign In"}
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