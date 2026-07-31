import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Video,
    ShieldAlert,
    Flag,
    CreditCard,
    Shield,
    LogOut,
    User
} from "lucide-react";

export const currentAdmin = {
    name: "System Administrator",
    role: "master_admin"
};

const navItems = [
    {
        section: "Dashboard",
        links: [
            { path: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
            { path: "/admin/profile", label: "Profile", icon: User }
        ]
    },
    {
        section: "Management",
        links: [
            { path: "/admin/manage/users", label: "Users", icon: Users },
            { path: "/admin/manage/creators", label: "Creators", icon: Video }
        ]
    },
    {
        section: "Moderation",
        links: [
            { path: "/admin/content", label: "Content Moderation", icon: ShieldAlert },
            { path: "/admin/reports", label: "Reports Queue", icon: Flag }
        ]
    },
    {
        section: "Finance",
        links: [
            { path: "/admin/payments", label: "Transactions", icon: CreditCard }
        ]
    }
];

// Add system section only if master_admin
if (currentAdmin.role === "master_admin") {
    navItems.push({
        section: "System",
        links: [
            { path: "/admin/manage/admins", label: "Manage Admins", icon: Shield }
        ]
    });
}

export default function AdminSidebar() {
    return (
        <div className="flex flex-col h-full bg-surface">
            {/* Header */}
            <div className="p-6 border-b border-[var(--color-border)]">
                <h2 className="text-2xl font-bold text-aurora">Admin Panel</h2>
                <div className="mt-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-live"></div>
                    <span className="text-xs text-muted font-medium">{currentAdmin.role.toUpperCase()}</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                {navItems.map((group, idx) => (
                    <div key={idx}>
                        <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                            {group.section}
                        </h3>
                        <div className="space-y-1">
                            {group.links.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    end={link.end}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                                            isActive
                                                ? "bg-primary-muted text-accent"
                                                : "text-secondary hover:bg-hover hover:text-primary"
                                        }`
                                    }
                                >
                                    <link.icon className="w-5 h-5" />
                                    <span className="font-medium">{link.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[var(--color-border)]">
                <NavLink
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-secondary hover:bg-hover hover:text-primary transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </NavLink>
            </div>
        </div>
    );
}
