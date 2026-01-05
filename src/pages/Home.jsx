import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { blogs } from '../data/blogs';

// Lazy load heavy components
const Carousel = lazy(() => import('../components/carousel/Carousel'));
const HanketsuCarousel = lazy(() => import('../components/carousel/HanketsuCarousel'));
const BlogCardLarge = lazy(() => import('../components/BlogCardLarge'));
const Galaxy = lazy(() => import('../components/Galaxy'));

// Simple loading placeholder
const ComponentLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="animate-pulse text-white/50">Loading...</div>
  </div>
);

function Home() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllBlogs, setShowAllBlogs] = useState(false);

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

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      {/* Navbar */}
      <nav className="absolute top-4 left-4 right-4 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-lg transform-gpu transition-all duration-300 hover:bg-white/15 overflow-hidden">
            <div className="flex items-center justify-between h-16 px-4 md:px-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="relative hover:scale-105 transition-transform duration-200 inline-block"
                >
                  <img 
                    src="/wlogo.webp" 
                    alt="The Jargonaut Logo" 
                    className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                  />
                </button>
              </div>
              
              {/* Desktop Navigation Items */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-8">
                  <button onClick={() => navigate('/about')} className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group">
                    About
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
                  </button>
                  <button onClick={() => navigate('/contact')} className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group">
                    Contact Us
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-all duration-200 z-10"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <div 
              className={`md:hidden transition-all duration-300 ease-in-out ${
                mobileMenuOpen 
                  ? 'max-h-48 opacity-100' 
                  : 'max-h-0 opacity-0 pointer-events-none'
              }`}
            >
              <div className="px-4 pb-4 pt-2 space-y-1 border-t border-white/10">

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/about');
                  }}
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium"
                >
                  About
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/contact');
                  }}
                  className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
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
      
      {/* Featured Blogs Section */}
      <div id="blogs" className="min-h-screen px-8 pt-4 pb-8 text-white/90">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-4 text-center">Featured Blogs</h2>
          <p className="text-lg text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Discover our latest insights on corporate law, fintech regulations, and market dynamics
          </p>
          <Suspense fallback={<ComponentLoader />}>
            <Carousel />
          </Suspense>
          
          {/* All Blogs Grid Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-white mb-8">All Blog Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={<ComponentLoader />}>
                {(showAllBlogs ? blogs : blogs.slice(0, 3)).map((blog) => (
                  <BlogCardLarge key={blog.id} blog={blog} />
                ))}
              </Suspense>
            </div>
            
            {/* View All Blogs Button */}
            {!showAllBlogs && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowAllBlogs(true);
                  }}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-10 rounded-full border border-white/30 transition-all duration-300 hover:scale-105"
                >
                  View All Blogs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
