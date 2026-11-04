import React, { useState, useEffect, lazy, Suspense } from 'react';
import appwriteService from '../appwrite/config';

const BlogCardLarge = lazy(() => import('./BlogCardLarge'));

const PAGE_SIZE = 12;

const ComponentLoader = () => (
  <div className="w-full h-full flex items-center justify-center py-8">
    <div className="animate-pulse text-white/50">Loading blogs...</div>
  </div>
);

const scrollToBlogs = () =>
  document.getElementById('blogs')?.scrollIntoView({ behavior: 'smooth' });

function AllPosts({ blogs = [], total = 0, loading = false }) {
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [page, setPage] = useState(1);
  const [pageBlogs, setPageBlogs] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Fetch the current page from Appwrite only while "View All" is open
  useEffect(() => {
    if (!showAllBlogs) return;

    let cancelled = false;
    setPageLoading(true);
    appwriteService
      .getPosts({ limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE })
      .then((response) => {
        if (!cancelled) setPageBlogs(response?.documents || []);
      })
      .finally(() => {
        if (!cancelled) setPageLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [showAllBlogs, page]);

  const displayedBlogs = showAllBlogs ? pageBlogs : blogs.slice(3, 6);

  const goToPage = (newPage) => {
    setPage(newPage);
    scrollToBlogs();
  };

  const pageButtonClass = (active) =>
    `min-w-10 h-10 px-3 rounded-full border transition-all duration-300 ${
      active
        ? 'bg-white text-[#0a0b14] border-white font-semibold'
        : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
    } disabled:opacity-40 disabled:cursor-not-allowed`;

  return (
    <div className="mt-20" id="blogs">
      <h3 className="text-3xl font-bold text-white mb-8">
        All Blog Posts
      </h3>

      {loading || pageLoading ? (
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
        </>
      )}

      {/* Pagination */}
      {showAllBlogs && totalPages > 1 && (
        <nav aria-label="Blog pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(page - 1)}
            disabled={page === 1 || pageLoading}
            className={pageButtonClass(false)}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => goToPage(n)}
              disabled={pageLoading}
              aria-current={n === page ? 'page' : undefined}
              className={pageButtonClass(n === page)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages || pageLoading}
            className={pageButtonClass(false)}
          >
            Next
          </button>
        </nav>
      )}

      {/* View All / Show Less */}
      {!loading && total > 3 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => {
              if (showAllBlogs) scrollToBlogs();
              setShowAllBlogs(!showAllBlogs);
              setPage(1);
            }}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-3 px-10 rounded-full border border-white/30 transition-all duration-300 hover:scale-105"
          >
            {showAllBlogs
              ? 'Show Less'
              : `View All ${total} Blogs`}
          </button>
        </div>
      )}
    </div>
  );
}

export default AllPosts;
