const key = "cdda9bdc98c0d5aac29b0d986d84703a26cedaef638657cb3ee6667dd94c0758";
const baseUrl = "https://api.unsplash.com";
const defaultHeaders = {
  Authorization: `Client-ID ${key}`
};

const fetchAndParse = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) throw response;

  return response.json();
};

const getImages = (query, page = 1, per_page = 25) => {
  const url = `${baseUrl}/search/photos?page=${page}&query=${query}&per_page=${per_page}&orientation=landscape`;
  return fetchAndParse(url, {
    method: "GET",
    headers: defaultHeaders
  });
};

export default { getImages };
