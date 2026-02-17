import React, { useEffect,useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/navbar/Navbar';
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const BlogDetail = () => {
   const [post, setPost] = useState(null);
   const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  

  // Smooth scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

   useEffect(() => {
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            }).finally(() => setLoading(false));
        } else navigate("/");
    }, [slug, navigate]);

   const deletePost = () => {
        appwriteService.deletePost(post.slug).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0b14] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl text-white">Loading...</h2>
        </div>
      </div>
    );
  }

  if (!post) {
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
    <div className="min-h-screen bg-[#faf8f5] w-full overflow-x-hidden">

      {/* Navigation Bar */}
      <Navbar position="fixed" scrollBehavior={true} useDarkMode={true} />

      {/* Blog Content */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto w-full">

          {/* Blog Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="text-[#4a4a4a] hover:text-[#000000] mb-6 flex items-center gap-2 transition-colors"
            >
              ← Back to Home
            </button>
            
            <div className="flex items-center gap-3 text-sm text-[#4a4a4a] mb-4">
              <span>{new Date(post.$createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>•</span>
              <span>{post.Author || post.author}</span>
            </div>

            {isAuthor && (
              <div className="mb-4 flex gap-3">
                <Link to={`/edit-post/${post.slug}`}>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all duration-300">
                    Edit
                  </button>
                </Link>
                <button 
                  onClick={deletePost}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#000000] mb-6 leading-tight break-words">
              {post.title}
            </h1>
            
            {/* <p className="text-xl text-[#1a1a1a] mb-8 leading-relaxed">
              {blog.description}
            </p> */}
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img 
              src={appwriteService.getFilePreview(post.featuredImage)} 
              alt={post.title}
              className="w-full max-h-[500px] object-contain"
            />
          </div>

          {/* Blog Content */}
          <div 
            className="prose prose-stone prose-lg max-w-none"
            style={{
              color: '#1a1a1a',
            }}
          >
             {parse(post.content)}
          </div>

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
