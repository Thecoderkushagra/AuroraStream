import { Link } from "react-router-dom";

export default function PricingPlans({ mode }) {
    const currentPlan = "Standard"; // Mock data

    const plans = [
        {
            name: "Basic",
            monthlyPrice: "$8.99",
            features: [
                "720p HD",
                "Watch on 1 device",
                "Limited downloads",
            ],
            color: "var(--color-text-secondary)",
            border: "var(--color-border)",
            glow: "none",
            tier: 1,
        },
        {
            name: "Standard",
            monthlyPrice: "$13.99",
            features: [
                "1080p Full HD",
                "Watch on 2 devices",
                "Unlimited downloads",
            ],
            color: "var(--color-primary)",
            border: "var(--color-primary)",
            glow: "none",
            tier: 2,
        },
        {
            name: "Premium",
            monthlyPrice: "$19.99",
            features: [
                "4K Ultra HD",
                "Watch on 4 devices",
                "Dolby Atmos",
                "Early access content",
            ],
            color: "var(--color-premium)",
            border: "var(--color-premium)",
            glow: "0 0 40px rgba(139, 92, 246, 0.15)",
            recommended: true,
            tier: 3,
        }
    ];

    const currentPlanTier = plans.find(p => p.name === currentPlan)?.tier || 0;

    return (
        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan) => {
                let buttonText = "Get Started";
                let buttonDisabled = false;

                if (mode === "authenticated") {
                    if (plan.tier === currentPlanTier) {
                        buttonText = "Current Plan";
                        buttonDisabled = true;
                    } else if (plan.tier > currentPlanTier) {
                        buttonText = "Upgrade";
                    } else {
                        buttonText = "Downgrade";
                    }
                }

                return (
                    <div 
                        key={plan.name} 
                        className={`flex flex-col rounded-2xl relative transition-transform duration-300 p-8 ${plan.recommended ? 'lg:scale-105 z-10' : 'z-0'}`}
                        style={{
                            background: "var(--color-bg-surface)",
                            border: `1px solid ${plan.border}`,
                            boxShadow: plan.glow,
                        }}
                    >
                        {plan.recommended && (
                            <div 
                                className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider text-white" 
                                style={{ background: plan.color }}
                            >
                                Most Popular
                            </div>
                        )}
                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                        
                        <div className="mb-8 flex items-baseline gap-1">
                            <span className="text-4xl font-extrabold">{plan.monthlyPrice}</span>
                            <span className="text-sm font-medium" style={{ color: "var(--color-text-muted)" }}>/mo</span>
                        </div>

                        {mode === "public" ? (
                            <Link 
                                to="/signup" 
                                className="block text-center w-full p-3.5 rounded-xl text-[15px] font-bold no-underline mb-8 transition-all duration-200" 
                                style={{
                                    background: plan.recommended ? plan.color : "transparent",
                                    color: plan.recommended ? "#fff" : "var(--color-text-primary)",
                                    border: plan.recommended ? "none" : "1px solid var(--color-border-strong)",
                                }}
                            >
                                {buttonText}
                            </Link>
                        ) : (
                            <button 
                                disabled={buttonDisabled} 
                                className="block text-center w-full p-3.5 rounded-xl text-[15px] font-bold mb-8 transition-all duration-200" 
                                style={{
                                    background: buttonDisabled ? "var(--color-bg-hover)" : (plan.recommended ? plan.color : "transparent"),
                                    color: buttonDisabled ? "var(--color-text-muted)" : (plan.recommended ? "#fff" : "var(--color-text-primary)"),
                                    border: buttonDisabled ? "1px solid var(--color-border)" : (plan.recommended ? "none" : "1px solid var(--color-border-strong)"),
                                    cursor: buttonDisabled ? "not-allowed" : "pointer"
                                }}
                            >
                                {buttonText}
                            </button>
                        )}

                        <div className="flex flex-col gap-4 mt-auto">
                            {plan.features.map(f => (
                                <div key={f} className="flex items-center gap-3">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0" style={{ color: plan.color }}>
                                        <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.2" />
                                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
