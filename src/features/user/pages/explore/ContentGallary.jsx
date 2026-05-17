import React from 'react';

const mockData = [
  { id: 1, title: 'Cosmic Journey', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80', duration: '2h 15m', year: 2023, type: 'movie' },
  { id: 2, title: 'Neon Nights', thumbnail: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80', duration: '1h 45m', year: 2024, type: 'movie' },
  { id: 3, title: 'Urban Shadows', thumbnail: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80', duration: '1h 30m', year: 2022, type: 'movie' },
  { id: 4, title: 'The Last Stand', thumbnail: 'https://images.unsplash.com/photo-1506744626753-1fa28f673458?w=800&q=80', duration: '2h 10m', year: 2021, type: 'movie' },
  { id: 5, title: 'Ocean Deep', thumbnail: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&q=80', duration: '1h 55m', year: 2023, type: 'movie' },
  { id: 6, title: 'Desert Dreams', thumbnail: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&q=80', duration: '2h 05m', year: 2022, type: 'movie' },
  { id: 7, title: 'Mountain High', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', duration: '1h 40m', year: 2024, type: 'movie' },
  { id: 8, title: 'City Lights', thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', duration: '2h 20m', year: 2021, type: 'movie' },
  { id: 9, title: 'Forest Echoes', thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80', duration: '1h 50m', year: 2023, type: 'movie' },
  { id: 10, title: 'Space Odyssey', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80', duration: '2h 30m', year: 2022, type: 'movie' },
  { id: 11, title: 'Cyber City', thumbnail: 'https://images.unsplash.com/photo-1515630278258-407f66498911?w=800&q=80', duration: '1h 35m', year: 2024, type: 'movie' },
  { id: 12, title: 'Winter Tales', thumbnail: 'https://images.unsplash.com/photo-1478265409131-1f65c88f965c?w=800&q=80', duration: '2h 00m', year: 2023, type: 'movie' }
];

const ContentGallery = ({ title, type, showHero = false }) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
      
      {showHero && (
        <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[3/1] rounded-2xl overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80" 
            alt="Hero featured" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">The Grand Adventure</h2>
            <p className="text-lg text-secondary mb-6 line-clamp-2 md:line-clamp-3">
              Embark on an epic journey across the cosmos. Discover new worlds, encounter strange phenomena, and unravel the mysteries of the universe in this groundbreaking cinematic experience.
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors">
              Watch Now
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {mockData.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
              <div className="absolute bottom-2 right-2 bg-[var(--color-bg-overlay)] px-2 py-1 rounded text-xs text-primary font-medium">
                {item.duration}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">{item.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted mt-1">
                <span>{item.year}</span>
                <span>•</span>
                <span className="capitalize">{item.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentGallery;
