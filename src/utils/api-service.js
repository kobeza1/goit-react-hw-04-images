import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30145773-0177bd10e0844ac367565a7b9';

export const fetchImages = (page, query) => {
  return axios.get(`${BASE_URL}`, {
    params: {
      q: query,
      key: API_KEY,
      per_page: 12,
      image_type: 'photo',
      safesearch: true,
      page,
    },
  });
};
