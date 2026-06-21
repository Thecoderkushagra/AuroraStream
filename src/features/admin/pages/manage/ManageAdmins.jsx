import { Plus, ShieldBan, Trash2 } from "lucide-react";

const mockAdmins = [
    { id: 1, name: "System Administrator", email: "master@aurora.stream", role: "master_admin", status: "Active", lastLogin: "Just now" },
    { id: 2, name: "Alice Security", email: "alice@aurora.stream", role: "admin", status: "Active", lastLogin: "2 hours ago" },
    { id: 3, name: "Bob Support", email: "bob@aurora.stream", role: "admin", status: "Active", lastLogin: "1 day ago" },
    { id: 4, name: "Charlie Moderation", email: "charlie@aurora.stream", role: "admin", status: "Deactivated", lastLogin: "2 weeks ago" },
];

export default function ManageAdmins() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Manage Admins</h1>
                    <p className="text-secondary">View and manage administrator accounts and privileges.</p>
                </div>
                <button className="btn-primary px-4 py-2 flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Create Admin</span>
                </button>
            </div>

            {/* Admins Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--color-border)] bg-base">
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Name</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Email</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Role</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {mockAdmins.map((admin) => (
                                <tr key={admin.id} className="hover:bg-hover transition-colors">
                                    <td className="p-4">
                                        <p className="font-medium text-primary">{admin.name}</p>
                                        <p className="text-xs text-muted">Last login: {admin.lastLogin}</p>
                                    </td>
                                    <td className="p-4 text-secondary text-sm">{admin.email}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-md border ${
                                            admin.role === "master_admin" ? "border-[var(--color-premium)] text-premium bg-premium-bg" : "border-[var(--color-border)] text-secondary"
                                        }`}>
                                            {admin.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                            admin.status === "Active" ? "bg-live-bg text-live" : "bg-surface text-muted border border-[var(--color-border)]"
                                        }`}>
                                            {admin.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        {admin.role !== "master_admin" && (
                                            <>
                                                <button className="p-2 text-muted hover:text-warning transition-colors" title="Deactivate">
                                                    <ShieldBan className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 text-muted hover:text-error transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </>
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
