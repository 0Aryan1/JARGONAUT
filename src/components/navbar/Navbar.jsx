import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';

function Navbar({ position = 'absolute', scrollBehavior = false }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const authStatus = useSelector((state) => state.auth.status);

  // Scroll behavior for navbar (only if scrollBehavior is true)
  useEffect(() => {
    if (!scrollBehavior) return;

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
  }, [lastScrollY, scrollBehavior]);

  const positionClass = scrollBehavior 
    ? `fixed left-4 right-4 z-50 transition-all duration-300 ${isNavVisible ? 'top-4' : '-top-24'}`
    : `${position} top-4 left-4 right-4 z-50`;

  return (
    <nav className={positionClass}>
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
                <button 
                  onClick={() => navigate('/about')} 
                  className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group"
                >
                  About
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
                </button>
                <button 
                  onClick={() => navigate('/contact')} 
                  className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group"
                >
                  Contact Us
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
                </button>
                
                {/* Conditional rendering based on auth status */}
                {authStatus ? (
                  <>
                    <button 
                      onClick={() => navigate('/add-post')} 
                      className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group"
                    >
                      Add Post
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
                    </button>
                    <LogoutBtn />
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => navigate('/login')} 
                      className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group"
                    >
                      Login
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full transition-all duration-200"></div>
                    </button>
                    <button 
                      onClick={() => navigate('/signup')} 
                      className="nav-link relative px-6 py-2 bg-white/20 text-white hover:bg-white/30 transition-all duration-200 hover:scale-105 rounded-full"
                    >
                      Sign Up
                    </button>
                  </>
                )}
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
                ? 'max-h-96 opacity-100' 
                : 'max-h-0 opacity-0 pointer-events-none'
            }`}
          >
            <div className="px-4 pb-4 pt-2 space-y-1 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/about');
                }}
                className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium"
              >
                About
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/contact');
                }}
                className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium"
              >
                Contact Us
              </button>
              
              {/* Conditional mobile menu items */}
              {authStatus ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/add-post');
                    }}
                    className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium"
                  >
                    Add Post
                  </button>
                  <div className="px-4 py-3">
                    <LogoutBtn />
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/signup');
                    }}
                    className="block w-full text-left px-4 py-3 bg-white/20 text-white hover:bg-white/30 rounded-xl transition-all duration-200 text-sm font-medium"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
