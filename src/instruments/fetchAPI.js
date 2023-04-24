import axios from 'axios';

const key = '34322240-24f2606f1746f3f062e0e7b7b';
const BASE_URL = 'https://pixabay.com/api/';
let PAGE = 1;

export const fetchImages = async input => {
  PAGE = 1;
  const requestParams = `?key=${key}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&page=${PAGE}&per_page=12`;
  PAGE += 1;
  const response = await axios.get(`${BASE_URL}${requestParams}`);
  return response.data.hits.map(({ id, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }));
};

export const fetchMoreImages = async searchValue => {
  const requestParams = `?key=${key}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${PAGE}&per_page=12`;
  PAGE += 1;
  const response = await axios.get(`${BASE_URL}${requestParams}`);
  return response.data.hits.map(({ id, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }));
};
