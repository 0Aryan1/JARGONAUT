import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCardLarge = ({ blog }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/blog/${blog.id}`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu h-full flex flex-col">
      {/* Blog Image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      {/* Blog Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date and Author */}
        <div className="flex items-center gap-3 text-sm text-white/60 mb-3">
          {/* <span>{new Date(blog.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span> */}
          {/* <span>•</span> */}
          <span>{blog.author}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {blog.title}
        </h3>
        
        {/* Description */}
        <p className="text-white/80 text-sm mb-4 line-clamp-3 flex-grow">
          {blog.description}
        </p>
        
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
