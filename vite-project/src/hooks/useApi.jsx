import { useState, useEffect } from 'react';
import { fetchPosts } from '../api/jsonPlaceholder';

const useApi = (initialParams = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const result = await fetchPosts({
          ...params,
          _page: page
        });
        setData(page === 1 ? result.data : [...data, ...result.data]);
        setTotal(result.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [params, page]);

  const loadMore = () => {
    if (data.length < total) {
      setPage(prev => prev + 1);
    }
  };

  const search = (term) => {
    setPage(1);
    setParams({
      q: term
    });
  };

  return { 
    data, 
    loading, 
    error, 
    search, 
    loadMore, 
    hasMore: data.length < total 
  };
};

export default useApi;