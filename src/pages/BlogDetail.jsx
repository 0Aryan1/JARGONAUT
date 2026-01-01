import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogs } from '../data/blogs';
import Footer from '../components/Footer';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const blog = blogs.find(b => b.id === parseInt(id));

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

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

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl text-[#2c2c2c] mb-4">Blog Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white px-6 py-3 rounded-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Navigation Bar */}
      <nav className={`fixed left-4 right-4 z-50 transition-all duration-300 ${
        isNavVisible ? 'top-4' : '-top-24'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-full border border-[#e5e1da] shadow-lg">
            <div className="flex items-center justify-between h-16 px-8">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
              >
                <span className="text-[#2c2c2c] text-xl">←</span>
                <img 
                  src="/wlogo.webp" 
                  alt="The Jargonaut Logo" 
                  className="h-14 md:h-20 lg:h-24 w-auto object-contain"
                />
              </button>
              
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-8">
                  <button onClick={() => navigate('/')} className="nav-link relative px-6 py-2 text-[#4a4a4a] hover:text-[#2c2c2c] transition-all duration-200 hover:scale-105">
                    Blog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Blog Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="text-[#4a4a4a] hover:text-[#000000] mb-6 flex items-center gap-2 transition-colors"
            >
              ← Back to Home
            </button>
            
            <div className="flex items-center gap-3 text-sm text-[#4a4a4a] mb-4">
              {/* <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>•</span> */}
              <span>{blog.author}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#000000] mb-6 leading-tight break-words">
              {blog.title}
            </h1>
            
            <p className="text-xl text-[#1a1a1a] mb-8 leading-relaxed">
              {blog.description}
            </p>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-80  sm:h-auto md:h-[28rem] lg:h-[36rem] xl:h-[42rem] object-cover"
            />
          </div>

          {/* Blog Content */}
          <div 
            className="prose prose-stone prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            style={{
              color: '#1a1a1a',
            }}
          />

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-[#e5e1da]">
            <button
              onClick={() => navigate('/')}
              className="bg-[#2c2c2c] hover:bg-[#1a1a1a] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105"
            >
              ← Back to All Blogs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
