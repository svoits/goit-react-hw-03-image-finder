import axios from 'axios';

const API_KEY = '4633630-afb85e0f491493412d489d917';
const perPage = 12;

axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImagesAPI(query, page) {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  return response.data;
}
