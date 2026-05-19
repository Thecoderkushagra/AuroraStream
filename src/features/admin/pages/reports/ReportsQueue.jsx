import { Search, Filter, CheckCircle2, ShieldBan, XCircle } from "lucide-react";

const mockReports = [
    { id: "REP-1042", type: "Video", reason: "Inappropriate Content", reporter: "user_john", status: "Pending" },
    { id: "REP-1043", type: "Comment", reason: "Spam / Harassment", reporter: "sara_smith", status: "Under Review" },
    { id: "REP-1044", type: "User", reason: "Impersonation", reporter: "real_creator", status: "Pending" },
    { id: "REP-1045", type: "Video", reason: "Copyright Violation", reporter: "studio_rights", status: "Resolved" },
    { id: "REP-1046", type: "Comment", reason: "Hate Speech", reporter: "anon_user", status: "Dismissed" },
];

export default function ReportsQueue() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Reports Queue</h1>
                    <p className="text-secondary">Handle user-submitted reports for content and behavior.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                        <input 
                            type="text" 
                            placeholder="Search reports..." 
                            className="pl-10 pr-4 py-2 bg-base border border-[var(--color-border)] rounded-md text-primary focus:outline-none focus:border-[var(--color-border-focus)] w-full md:w-64"
                        />
                    </div>
                    <button className="btn-ghost px-4 py-2 flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--color-border)] bg-base">
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Report ID</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Type</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Reason</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Reported By</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {mockReports.map((report) => (
                                <tr key={report.id} className="hover:bg-hover transition-colors">
                                    <td className="p-4 font-mono text-sm text-primary">{report.id}</td>
                                    <td className="p-4">
                                        <span className="text-sm text-secondary bg-surface px-2 py-1 rounded-md border border-[var(--color-border)]">{report.type}</span>
                                    </td>
                                    <td className="p-4 font-medium text-error">{report.reason}</td>
                                    <td className="p-4 text-secondary">@{report.reporter}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                            report.status === "Pending" ? "bg-warning-bg text-warning" :
                                            report.status === "Under Review" ? "bg-primary-muted text-accent" :
                                            report.status === "Resolved" ? "bg-live-bg text-live" :
                                            "bg-surface text-muted border border-[var(--color-border)]"
                                        }`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="p-2 text-muted hover:text-accent transition-colors" title="Review Report">
                                            <Search className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted hover:text-live transition-colors" title="Resolve & Take Action">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted hover:text-secondary transition-colors" title="Dismiss">
                                            <XCircle className="w-4 h-4" />
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
