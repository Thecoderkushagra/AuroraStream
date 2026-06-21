import { Outlet } from "react-router-dom";

export default function ApplicationLayout({ Sidebar }) {
    return (
        <div className="flex h-screen w-full bg-base text-primary overflow-hidden">
            {/* Left sidebar (<aside>) */}
            <aside 
                className="w-64 flex-shrink-0 h-full bg-surface overflow-y-auto"
                style={{ borderRight: "1px solid var(--color-border)" }}
            >
                <Sidebar />
            </aside>

            {/* Main content area (<main>) */}
            <main className="flex-1 h-full overflow-y-auto relative">
                <Outlet />
            </main>
        </div>
    );
}
