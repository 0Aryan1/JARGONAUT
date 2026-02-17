import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/navbar/Navbar';
import AllPosts from '../components/AllPosts';
import appwriteService from '../appwrite/config';

// Lazy load heavy components
const Carousel = lazy(() => import('../components/carousel/Carousel'));
const HanketsuCarousel = lazy(() => import('../components/carousel/HanketsuCarousel'));
const Galaxy = lazy(() => import('../components/Galaxy'));

// Simple loading placeholder
const ComponentLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-pulse text-white/50">Loading...</div>
  </div>
);

function Home() {
  const navigate = useNavigate();
  const [hasBlogsData, setHasBlogsData] = useState(true);

  // Check if blogs exist
  useEffect(() => {
    const checkBlogs = async () => {
      try {
        const response = await appwriteService.getPosts();
        setHasBlogsData(response && response.documents && response.documents.length > 0);
      } catch (error) {
        console.error('Error checking blogs:', error);
        setHasBlogsData(false);
      }
    };
    
    checkBlogs();
  }, []);

  const handleCardClick = (episodeId) => {
    if (episodeId && typeof episodeId === 'number') {
      // Smooth scroll to top before navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Small delay to allow scroll animation to start
      setTimeout(() => {
        navigate(`/hanketsu?episode=${episodeId}`);
      }, 100);
    }
  };

  const location = useLocation();

useEffect(() => {
  if (location.state?.scrollTo === "blogs") {
    const section = document.getElementById("blogs");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Galaxy Background */}
        <div className="absolute inset-0 w-full h-full z-10">
          <Suspense fallback={<div className="w-full h-full bg-[#0a0b14]" />}>
            <Galaxy 
              mouseRepulsion={true}
              mouseInteraction={true}
              density={1.5}
              glowIntensity={0.5}
              saturation={0.2}
              hueShift={200}
              transparent={false}
              repulsionStrength={3}
              twinkleIntensity={0.5}
            />
          </Suspense>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b14] z-20 pointer-events-none" />
        
        {/* Hero Title */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="max-w-7xl mx-auto h-full">
            <div className="h-full flex flex-col justify-center px-4 md:px-8">
              <h1 className="hero-title text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-white tracking-wide break-words">
                THE<br />
                <span className="font-bold">JARGONAUT</span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-xl mt-4 md:mt-6 tracking-wide md:tracking-wider uppercase">
                Get ready to embark on a voyage of corporate law in the spaceship of pop-culture
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hanketsu section */}
      <div className="py-10 md:py-16 lg:py-20">
        <div className="w-full px-4 md:px-8 lg:px-12 mb-8 md:mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Video */}
            <div className="w-full">
              <video 
                className="w-full h-auto rounded-lg shadow-2xl"
                autoPlay 
                loop 
                muted
                playsInline
                loading="lazy"
                poster="/hanbg.webp"
              >
                <source src="/hanketsu.mp4" type="video/mp4" />
              </video>
            </div>
            
            {/* Right side - Content */}
            <div className="space-y-6 text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Hanketsu</h1>
              <p className="text-base md:text-lg text-white/80 leading-relaxed text-justify">
                They said that the hallowed pronouncements of apex courts, those monumental edifices of judicial reasoning, were destined to remain entombed within impenetrable legal compendiums, accessible only to the chosen few who could decipher their arcane syntax. But they were wrong.
We proudly present to you: HANKETSU (判決), where The Jargonaut unleashes its most formidable technique yet: the alchemical fusion of jurisprudential excellence and sequential art! Behold as constitutional showdowns explode across panels with the intensity they always possessed but never displayed! Watch as the ratio decidendi crystallizes before your very eyes, each obiter dictum rendered with devastating clarity! Let us sail through the visual odysseys, through the most consequential judicial battles ever waged. The petitioner's contentions! The respondent's riposte! The Court's inexorable march toward precedent-setting glory! Every factual matrix, every doctrinal collision, every interpretative coup de grâce, transformed into an unforgettable saga that sears itself into your memory.
<br /><br />
Because landmark judgments aren't just legal doctrine... they're legends waiting to be told.
<br /><br />
This is HANKETSU. This is justice, unleashed
              </p>
            </div>
          </div>
        </div>
        <div className="px-4 md:px-8 lg:px-12 mb-12">
          <Suspense fallback={
            <div className="w-full max-w-7xl mx-auto h-[500px] flex items-center justify-center">
              <div className="animate-pulse text-white/50">Loading Hanketsu Episodes...</div>
            </div>
          }>
            <HanketsuCarousel  onCardClick={handleCardClick} />
          </Suspense>
        </div>
      </div>
      
      {/* Featured Blogs Section - Only show if there are blogs */}
      {hasBlogsData && (
        <div id="blogs" className="min-h-screen px-8 pt-4 pb-8 text-white/90">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-4 text-center">Featured Blogs</h2>
            <p className="text-lg text-white/70 text-center mb-12 max-w-2xl mx-auto">
              Discover our latest insights on corporate law, fintech regulations, and market dynamics
            </p>
            <Suspense fallback={<ComponentLoader />}>
              <Carousel />
            </Suspense>
            
            {/* All Blogs Section - Using AllPosts Component */}
            <AllPosts showOnlyFirst3={true} />
          </div>
        </div>
      )}
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
