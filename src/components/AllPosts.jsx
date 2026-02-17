import React, { useState, useEffect, lazy, Suspense } from 'react';
import appwriteService from '../appwrite/config';

const BlogCardLarge = lazy(() => import('./BlogCardLarge'));

const ComponentLoader = () => (
  <div className="w-full h-full flex items-center justify-center py-8">
    <div className="animate-pulse text-white/50">Loading blogs...</div>
  </div>
);

function AllPosts({ showOnlyFirst3 = false }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await appwriteService.getPosts();

        console.log("Full response:", response);
        console.log("Documents:", response?.documents);

        if (response?.documents) {
          setBlogs(response.documents);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log("showOnlyFirst3:", showOnlyFirst3);
  console.log("blogs length:", blogs.length);

  const displayedBlogs = showAllBlogs
    ? blogs
    : blogs.slice(0, 3);

  return (
    <div className="mt-20" id="blogs">
      <h3 className="text-3xl font-bold text-white mb-8">
        All Blog Posts
      </h3>

      {loading ? (
        <ComponentLoader />
      ) : (
        <>
          {/* Blog Grid */}
          {displayedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Suspense fallback={<ComponentLoader />}>
                {displayedBlogs.map((blog) => (
                  <BlogCardLarge key={blog.$id} blog={blog} />
                ))}
              </Suspense>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">
                No blogs available.
              </p>
            </div>
          )}

          {/* FORCE View All Button */}
          {blogs.length > 3 && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowAllBlogs(!showAllBlogs);

                  if (showAllBlogs) {
                    document
                      .getElementById('blogs')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-10 rounded-full border border-white/30 transition-all duration-300 hover:scale-105"
              >
                {showAllBlogs
                  ? 'Show Less'
                  : `View All ${blogs.length} Blogs`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllPosts;
