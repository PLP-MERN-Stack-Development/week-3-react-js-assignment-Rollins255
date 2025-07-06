import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ApiDataView = () => {
  const { theme } = useTheme();
  const { data, loading, error, search, loadMore, hasMore } = useApi();
  const [searchTerm, setSearchTerm] = useState('');
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMore, hasMore, loading]);

  const handleSearch = (e) => {
    e.preventDefault();
    search(searchTerm);
  };

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500">
          Error loading data: {error}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">API Posts</h2>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className={`flex-1 px-4 py-2 border rounded ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </form>

      {/* Loading State */}
      {loading && page === 1 && (
        <div className="text-center py-8">Loading posts...</div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {data.map(post => (
          <div 
            key={post.id}
            className={`p-4 border rounded ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <h3 className="font-bold text-lg mb-2">{post.title}</h3>
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
              {post.body}
            </p>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {loading && page > 1 && (
        <div className="text-center py-4">Loading more posts...</div>
      )}

      {!loading && data.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No posts found
        </div>
      )}

      <div ref={loaderRef} className="h-10"></div>

      {/* Load More Button (fallback) */}
      {!loading && hasMore && (
        <div className="text-center mt-6">
          <Button onClick={loadMore} variant="secondary">
            Load More
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ApiDataView;