import React, { useEffect } from 'react'
import ProfileCard from '../components/ProfileCard';
import Footer from '../components/Footer';
import Navbar from '../components/navbar/Navbar';

function About() {
  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div id="about" className="min-h-screen px-8 py-20 bg-gradient-to-b from-[#0a0b14] via-[#0f1020] to-[#0a0b14]">
      {/* Navbar */}
      <Navbar position="fixed" scrollBehavior={true} />

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
                avatarUrl="/dev.webp"
                miniAvatarUrl="/dev.webp"
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
              {/* LinkedIn Link */}
              <div className="pt-4">
                <a 
                  href="https://www.linkedin.com/in/dev-agarwal-682491322/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
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
                avatarUrl="/aryan.webp"
                miniAvatarUrl="/aryan.webp"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => window.location.href = '#contact'}
              />
            </div>

            {/* About/Mission Text - RIGHT SIDE */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">Developer's Note</h3>
              <p className="text-white/80 leading-relaxed text-justify">
              I am Aryan Agrawal, an experienced developer focused on building clean, reliable, and user-oriented digital solutions. 
              </p>
              <p className="text-white/80 leading-relaxed text-justify">
                Jargonaut is a blogging platform I designed and developed to offer a seamless reading experience, combining intuitive usability with strong performance and scalable architecture. My work reflects a commitment to precision, consistency, and meaningful problem-solving.

              </p>
              {/* LinkedIn Link */}
              <div className="pt-4">
                <a 
                  href="https://www.linkedin.com/in/aryan-aagrawal/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
  )
}

export default About
