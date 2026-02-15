// src/components/carousel/Carousel.jsx
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import appwriteService from '../../appwrite/config';
import BlogCardLarge from '../BlogCardLarge';

export default function Carousel() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from Appwrite on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await appwriteService.getPosts();
        if (response && response.documents) {
          setBlogs(response.documents);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get only the first 3 blogs
  const featuredBlogs = blogs.slice(0, 3);

  // Create carousel items from blog cards
  const items = featuredBlogs.map((blog) => (
    <div key={blog.$id} className="px-4 h-[400px]">
      <BlogCardLarge blog={blog} />
    </div>
  ));

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto mt-8 h-64 flex items-center justify-center">
        <div className="animate-pulse text-white/50">Loading featured blogs...</div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

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
