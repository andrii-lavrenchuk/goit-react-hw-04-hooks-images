const fetchImages = ({ searchQuery = '', currentPage = 1 }) => {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=18963132-a5d8582da162d4c0f5ee62384&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Something went wrong'));
  });
};

export default { fetchImages };
