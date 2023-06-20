import axios from 'axios';

const API_KEY = '35064784-44c7c8c6af67a6398fd800944';
const BASE_URL = 'https://pixabay.com/api/';

export const pixabayAPI = {
  searchImages: async (query, page, perPage) => {
    if (!query) {
      return [];
    }
    const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
    try {
      const response = await axios.get(url);
      return response.data.hits;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
