import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '4633630-afb85e0f491493412d489d917';
const perPage = 12;

export async function getImagesAPI(query, page, signal) {
  const response = await axios.get(BASE_URL, {
    signal,
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: perPage,
      page: page,
    },
  });

  return response.data;
}
