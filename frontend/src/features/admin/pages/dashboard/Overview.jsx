import { Users, Video, ShieldAlert, CreditCard, Activity, UploadCloud, MonitorPlay, FileWarning } from "lucide-react";

export default function Overview() {
    const stats = [
        { label: "Total Users", value: "1.2M", icon: Users, change: "+12%", changeType: "positive" },
        { label: "Active Users", value: "840K", icon: Activity, change: "+5%", changeType: "positive" },
        { label: "Total Creators", value: "4,521", icon: Video, change: "+8%", changeType: "positive" },
        { label: "Total Videos", value: "124K", icon: MonitorPlay, change: "+15%", changeType: "positive" },
        { label: "Daily Uploads", value: "845", icon: UploadCloud, change: "-2%", changeType: "negative" },
        { label: "Monthly Revenue", value: "$452K", icon: CreditCard, change: "+24%", changeType: "positive" },
        { label: "Pending Reports", value: "142", icon: FileWarning, change: "+12", changeType: "negative" },
        { label: "Awaiting Review", value: "58", icon: ShieldAlert, change: "-5", changeType: "positive" },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Platform Overview</h1>
                <p className="text-secondary">High-level metrics and current status of Aurora Stream.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="card p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-muted">{stat.label}</h3>
                            <stat.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                            <span className={`text-xs font-semibold ${stat.changeType === "positive" ? "text-live" : "text-error"}`}>
                                {stat.change} from last period
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Placeholder for charts */}
                <div className="card p-6 min-h-[300px] flex flex-col items-center justify-center border-dashed border-2 border-[var(--color-border-strong)] bg-base">
                    <Activity className="w-12 h-12 text-muted mb-4" />
                    <p className="text-secondary font-medium">User Growth Chart (Mock)</p>
                </div>
                <div className="card p-6 min-h-[300px] flex flex-col items-center justify-center border-dashed border-2 border-[var(--color-border-strong)] bg-base">
                    <CreditCard className="w-12 h-12 text-muted mb-4" />
                    <p className="text-secondary font-medium">Revenue Trend Chart (Mock)</p>
                </div>
            </div>
        </div>
    );
}
