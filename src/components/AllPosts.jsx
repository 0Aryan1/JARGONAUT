import React, { useState, useEffect, lazy, Suspense } from 'react';
import appwriteService from '../appwrite/config';

// Lazy load BlogCardLarge
const BlogCardLarge = lazy(() => import('./BlogCardLarge'));

// Simple loading placeholder
const ComponentLoader = () => (
  <div className="w-full h-full flex items-center justify-center py-8">
    <div className="animate-pulse text-white/50">Loading blogs...</div>
  </div>
);

function AllPosts({ showOnlyFirst3 = false }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch blogs from Appwrite on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await appwriteService.getPosts();
        if (response && response.documents) {
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

  // If showOnlyFirst3 is true, always show only 3 blogs
  // Get unique categories from blogs
  // const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Determine which blogs to display
  const displayedBlogs = showOnlyFirst3 
    ? filteredBlogs.slice(0, 3) 
    : (showAllBlogs ? filteredBlogs : filteredBlogs.slice(0, 3));

  // If there are no blogs and showOnlyFirst3 is true, return null (don't render anything)
  if (showOnlyFirst3 && !loading && blogs.length === 0) {
    return null;
  }

  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-white mb-8">All Blog Posts</h3>
      
      {/* Loading State */}
      {loading ? (
        <ComponentLoader />
      ) : (
        <>
          {/* Search and Filter Section */}
          <div className="mb-8 space-y-4">
        {/* Search Bar */}
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Search blogs by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div> */}

        {/* Category Filter Buttons */}
        {/* <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-white text-[#0a0b14]'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div> */}

        {/* Results Count */}
        {/* {(searchQuery || selectedCategory !== 'All') && (
          <p className="text-white/60 text-sm">
            Found {filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''}
          </p>
        )} */}
      </div>

      {/* Blogs Grid */}
      {displayedBlogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense fallback={<ComponentLoader />}>
            {displayedBlogs.map((blog) => (
              <BlogCardLarge key={blog.id} blog={blog} />
            ))}
          </Suspense>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No blogs found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-4 text-white/80 hover:text-white underline"
          >
            Clear filters
          </button>
        </div>
      )}
      
      {/* View All / Show Less Button */}
      {!showOnlyFirst3 && filteredBlogs.length > 3 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowAllBlogs(!showAllBlogs);
              if (showAllBlogs) {
                // Scroll to blogs section when collapsing
                document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-10 rounded-full border border-white/30 transition-all duration-300 hover:scale-105"
          >
            {showAllBlogs ? 'Show Less' : `View All ${filteredBlogs.length} Blogs`}
          </button>
        </div>
      )}
        </>
      )}
    </div>
  );
}

export default AllPosts;
