import React, { useState, useEffect } from 'react'
import ProfileCard from '../components/ProfileCard';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function About() {
  const navigate = useNavigate();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll behavior for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or at top - show navbar
        setIsNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        setIsNavVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div id="about" className="min-h-screen px-8 py-20 bg-gradient-to-b from-[#0a0b14] via-[#0f1020] to-[#0a0b14]">
      {/* Navbar */}
      <nav className={`fixed left-4 right-4 z-50 transition-all duration-300 ${
        isNavVisible ? 'top-4' : '-top-24'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-lg transform-gpu transition-all duration-300 hover:bg-white/15 overflow-hidden">
            <div className="flex items-center justify-between h-16 px-4 md:px-8">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/');
                }}
                className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
              >
                <span className="text-white text-xl">←</span>
                <img 
                  src="/wlogo.png" 
                  alt="The Jargonaut Logo" 
                  className="h-12 md:h-14 lg:h-16 w-auto object-contain"
                />
              </button>
              
              {/* Desktop Navigation Items */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-8">
                  <button 
                    onClick={() => navigate('/')} 
                    className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group"
                  >
                    Home
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
                    navigate('/');
                  }}
                  className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium"
                >
                  Blogs
                </button>
                
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto pt-24">
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
                name="Dev Agarwal"
                title="Founder"
                handle="aryanagrawal"
                status="Writing Amazing Content"
                contactText="Get in Touch"
                avatarUrl="/dev.jpeg"
                miniAvatarUrl="/dev.jpeg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.location.href = '#contact'}
              />
            </div>

            {/* About/Mission Text - RIGHT SIDE */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Founder's Note</h3>
              <p className="text-white/80 leading-relaxed text-justify">
                We believe that corporate law doesn't have to be boring or intimidating. At The Jargonaut, 
                we break down complex legal concepts using references from movies, TV shows, and pop culture 
                that everyone can relate to.
              </p>
              <p className="text-white/80 leading-relaxed text-justify">
                Whether you're a law student, professional, or just curious about how the corporate world works, 
                we're here to make your journey through legal jargon both informative and entertaining.
              </p>
              <p className="text-white/80 leading-relaxed text-justify">
                From fintech regulations to corporate governance, from market dynamics to legal tech innovations, 
                we cover it all with a unique blend of legal expertise and pop culture references that make 
                learning about law actually fun.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              {/* Profile Card - LEFT SIDE */}
               <div className="flex justify-center">
              <ProfileCard
                name="Aryan Agrawal"
                title="Developer"
                handle="aryanagrawal"
                status="Writing Amazing Content"
                contactText="Get in Touch"
                avatarUrl="/aryan.jpeg"
                miniAvatarUrl="/aryan.jpeg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.location.href = '#contact'}
              />
            </div>

            {/* About/Mission Text - RIGHT SIDE */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Developer Note</h3>
              <p className="text-white/80 leading-relaxed text-justify">
              I am Aryan Agrawal, an experienced developer focused on building clean, reliable, and user-oriented digital solutions. 
              </p>
              <p className="text-white/80 leading-relaxed text-justify">
                Jargonaut is a blogging platform I designed and developed to offer a seamless reading experience, combining intuitive usability with strong performance and scalable architecture. My work reflects a commitment to precision, consistency, and meaningful problem-solving.

              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
  )
}

export default About
