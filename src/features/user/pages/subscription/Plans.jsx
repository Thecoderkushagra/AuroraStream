import PricingPlans from "../../../../components/subscription/PricingPlans";

export default function Plans() {
    return (
        <div className="p-6 md:p-10" style={{ color: "var(--color-text-primary)" }}>
            <div className="max-w-6xl mx-auto mb-10">
                <h1 className="text-3xl font-bold mb-2">Manage Subscription</h1>
                <p className="text-lg" style={{ color: "var(--color-text-muted)" }}>
                    Upgrade or review your current plan anytime you want.
                </p>
            </div>
            
            <PricingPlans mode="authenticated" />
        </div>
    );
}
