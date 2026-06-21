// layout/AuthLayout.jsx
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--color-bg-base)",
            fontFamily: "'Urbanist', sans-serif",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Ambient aurora glow */}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
                <div style={{
                    position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
                    width: "700px", height: "400px",
                    background: "radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, rgba(0,123,255,0.1) 40%, transparent 70%)",
                    animation: "authOrbFloat 8s ease-in-out infinite",
                }} />
                <div style={{
                    position: "absolute", bottom: "-15%", left: "-10%",
                    width: "500px", height: "500px",
                    background: "radial-gradient(ellipse, rgba(0,123,255,0.05) 0%, transparent 65%)",
                    animation: "authOrbFloat 11s ease-in-out infinite reverse",
                }} />
                <div style={{
                    position: "absolute", bottom: "-10%", right: "-5%",
                    width: "400px", height: "400px",
                    background: "radial-gradient(ellipse, rgba(0,212,255,0.04) 0%, transparent 65%)",
                    animation: "authOrbFloat 9s ease-in-out infinite 2s",
                }} />
            </div>

            <style>{`
                @keyframes authOrbFloat {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50%       { transform: translateY(-20px) scale(1.03); }
                }
            `}</style>

            {/* Card */}
            <div style={{
                position: "relative",
                zIndex: 1,
                width: "100%",
                maxWidth: "420px",
                margin: "0 16px",
            }}>
                <Outlet />
            </div>
        </div>
    );
}