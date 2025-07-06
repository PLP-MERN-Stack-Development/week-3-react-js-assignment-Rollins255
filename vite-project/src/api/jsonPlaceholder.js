import axios from 'axios';

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE}/posts`, { 
      params: {
        _limit: 10,
        ...params
      }
    });
    return {
      data: response.data,
      total: parseInt(response.headers['x-total-count'] || '100', 10)
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};