import axios from "axios";

//const API_KEY = Constants.expoConfig?.extra?.NASA_API_KEY;
const API_KEY = "";

export const api = axios.create({
  baseURL: "https://api.nasa.gov/neo/rest/v1",
  timeout: 10000,
  params: {
    api_key: API_KEY,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 429) {
      console.warn("Rate limit atingido da NASA API.");
    }

    if (!error.response) {
      console.warn("Erro de rede.");
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  console.log("Request:", config.url);
  return config;
});