import { Users, Video, Eye, Play } from "lucide-react";

const creatorData = {
    name: "Alex Sterling",
    bio: "Filmmaker & Visual Artist. Exploring the intersection of technology and human emotion through sci-fi and documentary filmmaking.",
    followers: "45K",
    videos: "142",
    views: "1.2M",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=300&fit=crop"
};

const uploads = [
    { id: 1, title: "The Cosmic Journey", views: "245K", thumbnail: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=500&q=80" },
    { id: 2, title: "Stranger Realms", views: "890K", thumbnail: "https://images.unsplash.com/photo-1618519764620-7403abdbdf9c?w=500&q=80" },
    { id: 3, title: "Urban Legends", views: "156K", thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" },
    { id: 4, title: "Tech in 2050", views: "12K", thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80" },
    { id: 5, title: "A Day in Tokyo", views: "45K", thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80" },
    { id: 6, title: "Deep Sea Mysteries", views: "198K", thumbnail: "https://images.unsplash.com/photo-1682687982501-1e58f8147228?w=500&q=80" },
];

export default function PublicProfile() {
    return (
        <div className="min-h-screen bg-base pb-12">
            {/* Banner */}
            <div className="h-64 w-full bg-surface relative">
                <img src={creatorData.banner} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-base to-transparent"></div>
            </div>

            {/* Profile Info */}
            <div className="max-w-6xl mx-auto px-6 relative">
                <div className="absolute -top-16 left-6">
                    <img 
                        src={creatorData.avatar} 
                        alt={creatorData.name} 
                        className="w-32 h-32 rounded-full border-4 border-base object-cover bg-surface"
                    />
                </div>
                
                <div className="h-20"></div>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-primary">{creatorData.name}</h1>
                        <p className="text-secondary mt-2 max-w-2xl">{creatorData.bio}</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="btn-primary px-8 py-2">Follow</button>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 py-6 border-y border-[var(--color-border)] mb-10">
                    <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-accent" />
                        <div>
                            <p className="text-2xl font-bold text-primary">{creatorData.followers}</p>
                            <p className="text-sm text-muted">Followers</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Video className="w-6 h-6 text-accent" />
                        <div>
                            <p className="text-2xl font-bold text-primary">{creatorData.videos}</p>
                            <p className="text-sm text-muted">Videos</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Eye className="w-6 h-6 text-accent" />
                        <div>
                            <p className="text-2xl font-bold text-primary">{creatorData.views}</p>
                            <p className="text-sm text-muted">Total Views</p>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-primary mb-6">Recent Uploads</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {uploads.map((video) => (
                            <div key={video.id} className="group cursor-pointer">
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-surface mb-3 border border-[var(--color-border)]">
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Play className="w-12 h-12 text-white" />
                                    </div>
                                </div>
                                <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">{video.title}</h3>
                                <p className="text-sm text-muted">{video.views} views</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
