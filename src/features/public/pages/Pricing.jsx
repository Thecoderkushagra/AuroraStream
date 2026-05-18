import Nav from "../../../components/common/Nav";
import PricingPlans from "../../../components/subscription/PricingPlans";

export default function Pricing() {
    return (
        <div className="min-h-screen pb-24" style={{ background: "var(--color-bg-base)", color: "var(--color-text-primary)" }}>
            <Nav />

            <div className="text-center px-6 pt-[140px] pb-[60px]">
                <h1 className="text-[clamp(36px,5vw,56px)] font-black mb-4 tracking-tight">
                    Choose the Plan That <span className="text-aurora">Fits You.</span>
                </h1>
                <p className="text-lg max-w-[500px] mx-auto mb-10" style={{ color: "var(--color-text-muted)" }}>
                    Choose the perfect plan for you. Upgrade, downgrade, or cancel at any time.
                </p>
            </div>

            <PricingPlans mode="public" />
        </div>
    );
}
