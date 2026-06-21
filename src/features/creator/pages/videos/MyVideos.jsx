import { Search, Filter, Edit, Trash2 } from "lucide-react";

const videosData = [
    { id: 1, title: "The Cosmic Journey", type: "Movie", status: "Published", views: "245K", date: "Oct 12, 2025", thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&q=80" },
    { id: 2, title: "Stranger Realms S1", type: "Series", status: "Published", views: "890K", date: "Sep 28, 2025", thumbnail: "https://images.unsplash.com/photo-1618519764620-7403abdbdf9c?w=500&q=80" },
    { id: 3, title: "Urban Legends - Ep 4", type: "Episode", status: "Processing", views: "-", date: "Nov 04, 2025", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" },
    { id: 4, title: "Mastering React Native", type: "Movie", status: "Draft", views: "-", date: "Nov 10, 2025", thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80" },
];

export default function MyVideos() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">My Videos</h1>
                    <p className="text-secondary">Manage all your uploaded movies, series, and episodes.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
                        <input 
                            type="text" 
                            placeholder="Search videos..." 
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
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Video</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Type</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Status</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Views</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider">Date</th>
                                <th className="p-4 text-sm font-semibold text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-border)]">
                            {videosData.map((video) => (
                                <tr key={video.id} className="hover:bg-hover transition-colors">
                                    <td className="p-4 flex items-center gap-4">
                                        <div className="w-24 h-16 bg-surface rounded-md overflow-hidden flex-shrink-0">
                                            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                                        </div>
                                        <span className="font-medium text-primary">{video.title}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm text-secondary bg-surface px-2 py-1 rounded-md border border-[var(--color-border)]">{video.type}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                                            video.status === "Published" ? "bg-live-bg text-live" :
                                            video.status === "Processing" ? "bg-warning-bg text-warning" :
                                            "bg-surface text-muted border border-[var(--color-border)]"
                                        }`}>
                                            {video.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-secondary">{video.views}</td>
                                    <td className="p-4 text-secondary">{video.date}</td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="p-2 text-muted hover:text-accent transition-colors" title="Edit">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-muted hover:text-error transition-colors" title="Delete">
                                            <Trash2 className="w-4 h-4" />
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
