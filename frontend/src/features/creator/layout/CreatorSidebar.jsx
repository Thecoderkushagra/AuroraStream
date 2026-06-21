import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Video,
    Film,
    MonitorPlay,
    PlaySquare,
    User,
    Settings,
    LogOut
} from "lucide-react";

const navItems = [
    {
        section: "Dashboard",
        links: [
            { path: "/creator", label: "Overview", icon: LayoutDashboard, end: true }
        ]
    },
    {
        section: "Videos",
        links: [
            { path: "/creator/videos", label: "My Videos", icon: Video },
            { path: "/creator/upload-movie", label: "Upload Movie", icon: Film },
            { path: "/creator/create-series", label: "Create Series", icon: MonitorPlay },
            { path: "/creator/upload-episode", label: "Upload Episode", icon: PlaySquare }
        ]
    },
    {
        section: "Profile",
        links: [
            { path: "/creator/profile", label: "Public Profile", icon: User },
            { path: "/creator/settings", label: "Settings", icon: Settings }
        ]
    }
];

export default function CreatorSidebar() {
    return (
        <div className="flex flex-col h-full bg-surface">
            {/* Header */}
            <div className="p-6 border-b border-[var(--color-border)]">
                <h2 className="text-2xl font-bold text-aurora">Creator Studio</h2>
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
                    <span className="font-medium">Exit Studio</span>
                </NavLink>
            </div>
        </div>
    );
}
