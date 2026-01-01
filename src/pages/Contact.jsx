import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Contact() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b14] via-[#0f1020] to-[#0a0b14]">
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
                        className="relative hover:scale-105 transition-transform duration-200 inline-flex items-center gap-2"
                      >
                        <span className="text-white text-xl">←</span>
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
                        <button onClick={() => navigate('/')} className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105 group">
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
                          navigate('/about');
                        }}
                        className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium"
                      >
                        About
                      </button>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/');
                        }}
                        className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium"
                      >
                        Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

      {/* Contact Content */}
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Have questions or want to collaborate? We'd love to hear from you!
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white/80 mb-2 text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/80 mb-2 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-white/80 mb-2 text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white/80 mb-2 text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows="6"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
                placeholder="Tell us more..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-4 px-8 rounded-full border border-white/30 transition-all duration-300 hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <p className="text-white/60 mb-4">Or reach out directly:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="mailto:contact@thejargonaut.com"
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Dev.24269@cnlu.ac.in
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
