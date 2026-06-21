import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import Logo from "./Logo";

export default function Otp({ email, username }) {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timer, setTimer] = useState(60);
    const [isVerifying, setIsVerifying] = useState(false);
    const [hovered, setHovered] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1); // allow only 1 char
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setIsVerifying(true);
        const otpCode = otp.join("");
        try {
            const data = await authService.verifyOtp({ username, otp: otpCode });
            toast.success(data?.Response || "Verified successfully");
            navigate("/login");
        } catch (error) {
            toast.error(error?.response?.data?.Error || "Verification failed");
            setOtp(new Array(6).fill(""));
            inputRefs.current[0]?.focus();
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        if (timer === 0) {
            try {
                const data = await authService.resendOtp(username);
                toast.success(data?.Response || "OTP resent successfully");
                setTimer(60);
                setOtp(new Array(6).fill(""));
                inputRefs.current[0]?.focus();
            } catch (error) {
                toast.error(error?.response?.data?.Error || "Failed to resend OTP");
            }
        }
    };

    return (
        <div style={{
            background: "var(--color-bg-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "20px",
            padding: "40px 36px 36px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.3), 0 0 80px rgba(0,123,255,0.04)",
        }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
                <Logo />
            </div>

            <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <h2 style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "var(--color-text-primary)",
                    margin: "0 0 8px",
                    letterSpacing: "-0.02em",
                }}>
                    Verification Code
                </h2>
                <p style={{
                    fontSize: "14px",
                    color: "var(--color-text-muted)",
                    margin: 0,
                    lineHeight: "1.5",
                }}>
                    Enter the code sent to <br />
                    <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{email}</span>
                </p>
            </div>

            <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            style={{
                                width: "45px",
                                height: "55px",
                                fontSize: "24px",
                                fontWeight: 700,
                                textAlign: "center",
                                background: "var(--color-bg-base)",
                                color: "var(--color-text-primary)",
                                border: "1px solid var(--color-border)",
                                borderRadius: "var(--radius-md)",
                                outline: "none",
                                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = "var(--color-primary)";
                                e.target.style.boxShadow = "0 0 0 3px rgba(0, 123, 255, 0.12)";
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = "var(--color-border)";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={isVerifying || otp.includes("")}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        width: "100%",
                        padding: "14px",
                        fontSize: "15px",
                        fontWeight: 700,
                        fontFamily: "'Urbanist', sans-serif",
                        color: "#fff",
                        background: (isVerifying || otp.includes(""))
                            ? "rgba(0, 123, 255, 0.35)"
                            : hovered
                                ? "var(--color-primary-hover)"
                                : "var(--color-primary)",
                        border: "none",
                        borderRadius: "var(--radius-lg)",
                        cursor: (isVerifying || otp.includes("")) ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: hovered && !isVerifying && !otp.includes("")
                            ? "0 0 24px rgba(0,123,255,0.4)"
                            : "0 2px 12px rgba(0,123,255,0.2)",
                    }}
                >
                    {isVerifying ? "Verifying..." : "Verify"}
                </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "24px" }}>
                <p style={{ fontSize: "14px", color: "var(--color-text-muted)", margin: 0 }}>
                    Didn't receive the code?{" "}
                    <button
                        onClick={handleResend}
                        disabled={timer > 0}
                        style={{
                            background: "none",
                            border: "none",
                            color: timer > 0 ? "var(--color-text-muted)" : "var(--color-primary)",
                            fontWeight: 600,
                            cursor: timer > 0 ? "default" : "pointer",
                            padding: 0,
                            fontFamily: "inherit",
                            fontSize: "inherit",
                        }}
                    >
                        {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                    </button>
                </p>
            </div>
        </div>
    );
}
