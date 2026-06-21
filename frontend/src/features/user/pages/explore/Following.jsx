import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Video } from 'lucide-react';

const followingData = [
  {
    id: 1,
    name: "Alex Sterling",
    bio: "Filmmaker & Visual Artist. Exploring the intersection of technology and human emotion through sci-fi and documentary filmmaking.",
    followers: "45K",
    videos: "142",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    bio: "Tech reviews and futuristic concepts. Exploring the next wave of computing and AI.",
    followers: "120K",
    videos: "305",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Marcus Cole",
    bio: "Daily vlogs and lifestyle. Join me as I travel the world and experience new cultures.",
    followers: "89K",
    videos: "512",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Elena Rostova",
    bio: "Cinematic travel documentaries. Highlighting the hidden gems of our beautiful planet.",
    followers: "210K",
    videos: "84",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=200&fit=crop"
  }
];

const Following = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-base min-h-screen p-8 text-primary">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Following</h1>
        <p className="text-secondary mb-8">Creators you follow and support.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {followingData.map((creator) => (
            <div 
              key={creator.id} 
              onClick={() => navigate(`/user/creator/${creator.id}`)}
              className="bg-surface border border-[var(--color-border)] rounded-xl overflow-hidden cursor-pointer hover:border-[var(--color-border-strong)] transition-all group shadow-sm hover:shadow-md"
            >
              {/* Banner */}
              <div className="h-24 w-full relative">
                <img src={creator.banner} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
              </div>

              {/* Profile Info */}
              <div className="px-5 pb-5 relative">
                <div className="absolute -top-10 left-5">
                  <img 
                    src={creator.avatar} 
                    alt={creator.name} 
                    className="w-20 h-20 rounded-full border-4 border-[var(--color-bg-surface)] object-cover bg-surface"
                  />
                </div>
                
                {/* Spacer for absolute avatar */}
                <div className="h-12 w-full"></div>

                <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{creator.name}</h3>
                <p className="text-sm text-secondary mt-1 mb-4 line-clamp-2">{creator.bio}</p>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-muted">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="font-medium text-primary">{creator.followers}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted">
                    <Video className="w-4 h-4 text-accent" />
                    <span className="font-medium text-primary">{creator.videos}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Following;
