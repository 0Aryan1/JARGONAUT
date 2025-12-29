// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const BlogCard = ({ blog }) => {
//   const navigate = useNavigate();

//   const handleReadMore = () => {
//     navigate(`/blog/${blog.id}`);
//   };

//   return (
//     <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu h-full flex flex-col">
//       {/* Blog Image */}
//       <div className="h-36 overflow-hidden">
//         <img 
//           src={blog.image} 
//           alt={blog.title}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//         />
//       </div>
      
//       {/* Blog Content */}
//       <div className="p-4 flex flex-col flex-grow">
//         {/* Date and Author */}
//         <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
//           <span>{new Date(blog.date).toLocaleDateString('en-US', { 
//             year: 'numeric', 
//             month: 'short', 
//             day: 'numeric' 
//           })}</span>
//           <span>•</span>
//           <span>{blog.author}</span>
//         </div>
        
//         {/* Title */}
//         <h3 className="text-base font-bold text-white mb-2 line-clamp-2 flex-grow">
//           {blog.title}
//         </h3>
        
//         {/* Description */}
//         <p className="text-white/80 text-xs mb-3 line-clamp-2">
//           {blog.description}
//         </p>
        
//         {/* Read More Button */}
//         <button
//           onClick={handleReadMore}
//           className="mt-auto w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-full border border-white/30 transition-all duration-300 hover:shadow-lg text-sm"
//         >
//           Read More →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;
