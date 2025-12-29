// src/components/carousel/Carousel.jsx
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// import BlogCard from '../BlogCard';
import { blogs } from '../../data/blogs';
import BlogCardLarge from '../BlogCardLarge';

export default function Carousel() {
  // Get only the first 3 blogs
  const featuredBlogs = blogs.slice(0, 3);

  // Create carousel items from blog cards
  const items = featuredBlogs.map((blog) => (
    <div key={blog.id} className="px-4">
      <BlogCardLarge blog={blog} />
    </div>
  ));

  return (
    <div className="w-full max-w-7xl mx-auto mt-8">
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 1 },      // mobile: 1 card (100% width)
          768: { items: 2 },    // tablet: 2 cards (50% width each)
          1024: { items: 3 }    // desktop: 3 cards (33% width each)
        }}
        infinite
        disableButtonsControls={true}
        autoPlay={true}
        autoPlayInterval={3000}
        autoPlayStrategy="default"
        animationDuration={800}
        disableDotsControls={true}
      />
    </div>
  );
}
