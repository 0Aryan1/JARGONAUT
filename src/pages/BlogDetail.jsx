import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogs } from '../data/blogs';
import Footer from '../components/Footer';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0a0b14] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl text-white mb-4">Blog Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b14]">
      {/* Navigation Bar */}
      <nav className="fixed top-4 left-4 right-4 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
            <div className="flex items-center justify-between h-16 px-8">
              <button 
                onClick={() => navigate('/')}
                className="text-white font-bold text-xl hover:scale-105 transition-transform duration-200"
              >
                ← LOGO
              </button>
              
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-8">
                  <button onClick={() => navigate('/')} className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105">
                    Home
                  </button>
                  <a href="/#blogs" className="nav-link relative px-6 py-2 text-white/90 hover:text-white transition-all duration-200 hover:scale-105">
                    Blogs
                  </a>
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
              className="text-white/60 hover:text-white mb-6 flex items-center gap-2 transition-colors"
            >
              ← Back to Home
            </button>
            
            <div className="flex items-center gap-3 text-sm text-white/60 mb-4">
              <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>•</span>
              <span>{blog.author}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              {blog.description}
            </p>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Blog Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
            style={{
              color: '#e5e7eb',
            }}
          />

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <button
              onClick={() => navigate('/')}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-full border border-white/30 transition-all duration-300 hover:scale-105"
            >
              ← Back to All Blogs
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BlogDetail;
