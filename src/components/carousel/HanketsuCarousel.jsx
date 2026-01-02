// src/components/carousel/HanketsuCarousel.jsx
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function HanketsuCarousel({ onCardClick }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure component is mounted before rendering carousel
    setIsLoaded(true);
  }, []);

  // Define Hanketsu episodes
  const episodes = [
    { id: 1, image: '/han1.webp', title: 'Episode 1' },
    { id: 2, image: '/han2.webp', title: 'Episode 2' },
    { id: 3, image: '/han3.webp', title: 'Episode 3' },
    { id: 4, image: '/han4.webp', title: 'Episode 4' },
    { id: 5, image: '/han5.webp', title: 'Episode 5' }
  ];

  // Create carousel items
  const items = episodes.map((episode) => (
    <div key={episode.id} className="px-4 py-4">
      <div
        onClick={() => onCardClick && onCardClick(episode.id)}
        className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
      >
        {/* Image */}
        <img
          src={episode.image}
          alt={`Hanketsu ${episode.title}`}
          className="w-full h-[400px] md:h-[500px] object-cover"
          loading="lazy"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
              Hanketsu {episode.title}
            </h3>
            <p className="text-white/90 text-sm md:text-base">
              Click to read the manga
            </p>
          </div>
        </div>

        {/* Episode Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-semibold text-sm">
          {episode.title}
        </div>
      </div>
    </div>
  ));

  if (!isLoaded) {
    return (
      <div className="w-full max-w-7xl mx-auto h-[500px] flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading carousel...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 1 },      // mobile: 1 card
          640: { items: 2 },    // small tablet: 2 cards
          1024: { items: 3 }    // desktop: 3 cards
        }}
        infinite
        disableButtonsControls={false}
        autoPlay={true}
        autoPlayInterval={2000}
        autoPlayStrategy="default"
        animationDuration={800}
        disableDotsControls={false}
        renderDotsItem={(e) => {
          return (
            <span className={`inline-block w-2 h-2 rounded-full mx-1 transition-all ${e.isActive ? 'bg-white w-8' : 'bg-white/40'}`}></span>
          );
        }}
      />
    </div>
  );
}
