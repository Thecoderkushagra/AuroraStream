import { Check, X, Trash2 } from "lucide-react";

const mockContent = [
    { id: 1, title: "The Cosmic Journey", creator: "Cosmic Studios", type: "Movie", date: "2024-05-18", status: "Pending Review", thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&q=80" },
    { id: 2, title: "Urban Legends Ep 4", creator: "Mystery Uncovered", type: "Episode", date: "2024-05-17", status: "Flagged", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" },
    { id: 3, title: "Tech in 2050", creator: "Tech Forward", type: "Movie", date: "2024-05-16", status: "Pending Review", thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80" },
];

export default function Moderation() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-primary mb-2">Content Moderation</h1>
                <p className="text-secondary">Review uploaded content for platform compliance.</p>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[var(--color-border)] bg-base">
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Video</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Creator</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Type</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Upload Date</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {mockContent.map((content) => (
                                <tr key={content.id} className="hover:bg-hover transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <div className="w-24 h-16 bg-surface rounded-md overflow-hidden flex-shrink-0 border border-[var(--color-border)]">
                                            <img src={content.thumbnail} alt={content.title} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-medium text-primary">{content.title}</span>
                                    </td>
                                    <td className="p-4 text-secondary">{content.creator}</td>
                                    <td className="p-4">
                                        <span className="text-sm text-secondary bg-surface px-2 py-1 rounded-md border border-[var(--color-border)]">{content.type}</span>
                                    </td>
                                    <td className="p-4 text-secondary">{content.date}</td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                            content.status === "Flagged" ? "bg-error-bg text-error" : "bg-warning-bg text-warning"
                                        }`}>
                                            {content.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="p-2 text-muted hover:text-live transition-colors" title="Approve">
                                            <Check className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-muted hover:text-warning transition-colors" title="Reject">
                                            <X className="w-5 h-5" />
                                        </button>
                                        <button className="p-2 text-muted hover:text-error transition-colors" title="Delete">
                                            <Trash2 className="w-5 h-5" />
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
