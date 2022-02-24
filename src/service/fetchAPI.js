const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const fetchAPI = async () => {
  const fetchURL = await fetch(URL);
  const response = await fetchURL.json();
  return response.results;
};

export default fetchAPI;
