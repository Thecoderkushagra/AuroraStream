import { Search, Filter, MoreVertical, ShieldBan, CheckCircle, Eye } from "lucide-react";

const mockUsers = [
    { id: 1, username: "alex_sterling", email: "alex@example.com", plan: "Premium", status: "Active", date: "2024-01-15" },
    { id: 2, username: "movie_fanatic", email: "fanatic@example.com", plan: "Basic", status: "Suspended", date: "2024-02-10" },
    { id: 3, username: "sarah_j", email: "sarah@example.com", plan: "Standard", status: "Active", date: "2024-03-22" },
    { id: 4, username: "troll_account123", email: "troll@example.com", plan: "Basic", status: "Banned", date: "2024-04-05" },
    { id: 5, username: "david_m", email: "david@example.com", plan: "Premium", status: "Active", date: "2024-05-18" },
];

export default function ManageUsers() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Manage Users</h1>
                    <p className="text-secondary">View and moderate platform users.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                        <input 
                            type="text" 
                            placeholder="Search users..." 
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
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Username</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Email</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Plan</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Join Date</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {mockUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-hover transition-colors">
                                    <td className="p-4 font-medium text-primary">@{user.username}</td>
                                    <td className="p-4 text-secondary">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md border ${
                                            user.plan === "Premium" ? "border-[var(--color-premium)] text-premium bg-premium-bg" : "border-[var(--color-border)] text-secondary"
                                        }`}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                            user.status === "Active" ? "bg-live-bg text-live" :
                                            user.status === "Suspended" ? "bg-warning-bg text-warning" :
                                            "bg-error-bg text-error"
                                        }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-secondary">{user.date}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="p-2 text-muted hover:text-accent transition-colors" title="View Profile">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted hover:text-warning transition-colors" title="Suspend User">
                                            <ShieldBan className="w-4 h-4" />
                                        </button>
                                        {user.status !== "Active" && (
                                            <button className="p-2 text-muted hover:text-live transition-colors" title="Reactivate User">
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        )}
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
