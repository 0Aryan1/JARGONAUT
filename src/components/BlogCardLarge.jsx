import React from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from '../appwrite/config'

const BlogCardLarge = ({ blog }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    // Smooth scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Small delay to allow scroll animation to start
    setTimeout(() => {
      navigate(`/post/${blog.slug}`);
    }, 100);
  };

  // Function to strip HTML tags and get plain text
  const stripHtmlTags = (html) => {
    if (!html) return '';
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu h-full flex flex-col">
      {/* Blog Image */}
      <div className="h-48 overflow-hidden">
        <img src={appwriteService.getFilePreview(blog.featuredImage)} alt={blog.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      {/* Blog Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date and Author */}
        <div className="flex items-center gap-3 text-sm text-white/60 mb-3">
          <span>{new Date(blog.$createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
          <span>•</span>
          <span>{blog.Author || blog.author}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {blog.title}
        </h3>
        
        {/* Description */}
        {/* <p className="text-white/80 text-sm mb-4 line-clamp-3 flex-grow">
          {stripHtmlTags(blog.content)}
        </p> */}
        
        {/* Read More Button */}
        <button
          onClick={handleReadMore}
          className="mt-auto w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-full border border-white/30 transition-all duration-300 hover:shadow-lg"
        >
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCardLarge;
