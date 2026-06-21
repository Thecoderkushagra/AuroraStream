import { BarChart3, Users, Clock, DollarSign, Play } from "lucide-react";

export default function Overview() {
    const stats = [
        { label: "Total Videos", value: "142", icon: Play, change: "+12%", changeType: "positive" },
        { label: "Total Views", value: "1.2M", icon: BarChart3, change: "+24%", changeType: "positive" },
        { label: "Total Watch Time", value: "84K hrs", icon: Clock, change: "+8%", changeType: "positive" },
        { label: "Total Earnings", value: "$4,250", icon: DollarSign, change: "-2%", changeType: "negative" },
        { label: "Subscribers", value: "45K", icon: Users, change: "+15%", changeType: "positive" }
    ];

    const topVideos = [
        { id: 1, title: "The Cosmic Journey", views: "245K", date: "Oct 12, 2025" },
        { id: 2, title: "Deep Sea Mysteries", views: "198K", date: "Sep 28, 2025" },
        { id: 3, title: "Urban Legends Explained", views: "156K", date: "Nov 04, 2025" },
    ];

    const recentUploads = [
        { id: 4, title: "Tech in 2050", status: "Published", views: "12K", date: "2 days ago" },
        { id: 5, title: "A Day in Tokyo", status: "Processing", views: "-", date: "5 hours ago" },
        { id: 6, title: "Mastering React", status: "Draft", views: "-", date: "1 week ago" },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Dashboard Overview</h1>
                <p className="text-secondary">Welcome back! Here's how your content is performing.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat, idx) => (
                    <div key={idx} className="card p-6 flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-medium text-muted">{stat.label}</h3>
                            <stat.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                            <span className={`text-xs font-semibold ${stat.changeType === "positive" ? "text-live" : "text-error"}`}>
                                {stat.change} from last month
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Performing */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold text-primary mb-6">Top Performing Content</h2>
                    <div className="space-y-4">
                        {topVideos.map((video) => (
                            <div key={video.id} className="flex items-center justify-between p-4 bg-base rounded-lg border border-[var(--color-border)]">
                                <div>
                                    <h4 className="font-medium text-primary">{video.title}</h4>
                                    <p className="text-sm text-muted">{video.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-accent">{video.views}</p>
                                    <p className="text-xs text-muted">Views</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Uploads */}
                <div className="card p-6">
                    <h2 className="text-xl font-bold text-primary mb-6">Recent Uploads</h2>
                    <div className="space-y-4">
                        {recentUploads.map((video) => (
                            <div key={video.id} className="flex items-center justify-between p-4 bg-base rounded-lg border border-[var(--color-border)]">
                                <div>
                                    <h4 className="font-medium text-primary">{video.title}</h4>
                                    <p className="text-sm text-muted">{video.date}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mb-1 ${
                                        video.status === "Published" ? "bg-live-bg text-live" :
                                        video.status === "Processing" ? "bg-warning-bg text-warning" :
                                        "bg-surface text-muted border border-[var(--color-border)]"
                                    }`}>
                                        {video.status}
                                    </span>
                                    {video.views !== "-" && <p className="text-xs text-muted">{video.views} views</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
