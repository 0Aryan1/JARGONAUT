import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/carousel/Carousel';
import BlogCardLarge from '../components/BlogCardLarge';
import Footer from '../components/Footer';
import Galaxy from '../components/Galaxy';
import ProfileCard from '../components/ProfileCard';
import { blogs } from '../data/blogs';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      {/* Navbar */}
      <nav className="absolute top-4 left-4 right-4 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg transform-gpu transition-all duration-300 hover:bg-white/15">
            <div className="flex items-center justify-between h-16 px-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <button 
                  onClick={() => navigate('/')}
                  className="text-white font-bold text-xl relative hover:scale-105 transition-transform duration-200 inline-block"
                >
                  LOGO
                  <div className="absolute inset-0 bg-white/20 blur-sm -z-10 rounded-lg transform scale-110"></div>
                </button>
              </div>
              
              {/* Navigation Items */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-8">
                  <a href="#blogs" className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group">
                    Blogs
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
                  </a>
                  <a href="#about" className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group">
                    About
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
                  </a>
                  <a href="#contact" className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group">
                    Contact Us
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        {/* Galaxy Background */}
        <div className="absolute inset-0 w-full h-full z-10">
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
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0b14] z-20 pointer-events-none" />
        
        {/* Hero Title */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="max-w-7xl mx-auto h-full">
            <div className="h-full flex flex-col justify-center px-8">
              <h1 className="hero-title text-7xl md:text-8xl lg:text-9xl text-white font-normal tracking-wide">
                THE<br />JARGONAUT
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-xl mt-6 tracking-wider uppercase">
                Get ready to embark on a voyage of corporate law in the spaceship of pop-culture
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Blogs Section */}
      <div id="blogs" className="min-h-screen px-8 py-20 text-white/90">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-4 text-center">Featured Blogs</h2>
          <p className="text-lg text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Discover our latest insights on corporate law, fintech regulations, and market dynamics
          </p>
          <Carousel />
          
          {/* All Blogs Grid Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-white mb-8">All Blog Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.slice(3).map((blog) => (
                <BlogCardLarge key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div id="about" className="px-8 py-20 bg-gradient-to-b from-[#0a0b14] via-[#0f1020] to-[#0a0b14]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">About The Jargonaut</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Your guide to navigating corporate law through the lens of pop culture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            {/* Profile Card - LEFT SIDE */}
            <div className="flex justify-center">
              <ProfileCard
                name="Aryan Agrawal"
                title="Legal Tech Blogger"
                handle="aryanagrawal"
                status="Writing Amazing Content"
                contactText="Get in Touch"
                avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                miniAvatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.location.href = '#contact'}
              />
            </div>

            {/* About/Mission Text - RIGHT SIDE */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Our Mission</h3>
              <p className="text-white/80 leading-relaxed">
                We believe that corporate law doesn't have to be boring or intimidating. At The Jargonaut, 
                we break down complex legal concepts using references from movies, TV shows, and pop culture 
                that everyone can relate to.
              </p>
              <p className="text-white/80 leading-relaxed">
                Whether you're a law student, professional, or just curious about how the corporate world works, 
                we're here to make your journey through legal jargon both informative and entertaining.
              </p>
              <p className="text-white/80 leading-relaxed">
                From fintech regulations to corporate governance, from market dynamics to legal tech innovations, 
                we cover it all with a unique blend of legal expertise and pop culture references that make 
                learning about law actually fun.
              </p>
            </div>
          </div>

          {/* What We Cover */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">What We Cover</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 transform-gpu">
                <div className="text-4xl mb-4">⚖️</div>
                <h4 className="text-xl font-bold text-white mb-3">Corporate Law</h4>
                <p className="text-white/70">
                  From mergers and acquisitions to corporate governance, we break down the legal framework 
                  that shapes modern business.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 transform-gpu">
                <div className="text-4xl mb-4">💳</div>
                <h4 className="text-xl font-bold text-white mb-3">Fintech Regulations</h4>
                <p className="text-white/70">
                  Explore the evolving world of financial technology regulations, cryptocurrency laws, 
                  and digital payment frameworks.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 transform-gpu">
                <div className="text-4xl mb-4">📈</div>
                <h4 className="text-xl font-bold text-white mb-3">Market Dynamics</h4>
                <p className="text-white/70">
                  Understand market regulations, trading laws, and the legal aspects of investment 
                  strategies explained through relatable scenarios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
