import { Search, Filter, ShieldBan, CheckCircle, ExternalLink } from "lucide-react";

const mockCreators = [
    { id: 1, channelName: "Cosmic Studios", videos: "142", views: "1.2M", earnings: "$4,250", status: "Verified" },
    { id: 2, channelName: "Tech Forward", videos: "89", views: "450K", earnings: "$1,800", status: "Active" },
    { id: 3, channelName: "Daily Vlogs Hub", videos: "45", views: "120K", earnings: "$300", status: "Suspended" },
    { id: 4, channelName: "Mystery Uncovered", videos: "24", views: "890K", earnings: "$2,100", status: "Verified" },
    { id: 5, channelName: "Gaming Legends", videos: "312", views: "2.5M", earnings: "$8,900", status: "Active" },
];

export default function ManageCreators() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Manage Creators</h1>
                    <p className="text-secondary">Oversee creator accounts, channels, and statuses.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                        <input 
                            type="text" 
                            placeholder="Search creators..." 
                            className="pl-10 pr-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--color-border)] bg-base">
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Channel Name</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Total Videos</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Total Views</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Earnings</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {mockCreators.map((creator) => (
                                <tr key={creator.id} className="hover:bg-hover transition-colors">
                                    <td className="p-4 font-medium text-primary">{creator.channelName}</td>
                                    <td className="p-4 text-secondary">{creator.videos}</td>
                                    <td className="p-4 text-secondary">{creator.views}</td>
                                    <td className="p-4 font-semibold text-live">{creator.earnings}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                            creator.status === "Verified" ? "bg-premium-bg text-premium border border-[var(--color-premium)]" :
                                            creator.status === "Active" ? "bg-surface text-secondary border border-[var(--color-border)]" :
                                            "bg-error-bg text-error"
                                        }`}>
                                            {creator.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="p-2 text-muted hover:text-accent transition-colors" title="View Channel">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted hover:text-premium transition-colors" title="Verify Channel">
                                            <CheckCircle className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted hover:text-error transition-colors" title="Suspend Creator">
                                            <ShieldBan className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
