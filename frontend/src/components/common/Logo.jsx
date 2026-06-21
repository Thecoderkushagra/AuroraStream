export default function Logo() {
    return (
        <div style={{ display: "flex", flexDirection: "column", userSelect: "none", lineHeight: 1 }}>
            <span style={{ fontSize: "29px", fontWeight: 800, letterSpacing: "3px", color: "var(--color-text-primary)" }}>
                A<span style={{ background: "linear-gradient(90deg,#00d4ff,#007bff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>uror</span>a
            </span>
            <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "3px", color: "var(--color-text-muted)", marginTop: "-2px" }}>
                <span style={{ color: "var(--color-primary)" }}>STREA</span>M|
            </span>
        </div>
    );
}
