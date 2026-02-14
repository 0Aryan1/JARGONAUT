import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogs } from '../data/blogs';
import Footer from '../components/Footer';
import Navbar from '../components/navbar/Navbar';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const blog = blogs.find(b => b.id === parseInt(id));

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

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
      <Navbar position="fixed" scrollBehavior={true} />

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
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full max-h-[500px] object-contain"
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
