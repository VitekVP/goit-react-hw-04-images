const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34932716-1619812f60dbb29308a5d69d6';
const PER_PAGE = 12;

const pixabayApi = (imageName, page) => {
  return fetch(
    `${BASE_URL}?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('нет такого параметра поиска'));
  });
};
export { pixabayApi, PER_PAGE };
