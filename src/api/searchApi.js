import axios from "axios";
const API_URL = "https://astrobackend-5sr6.onrender.com/api";

export const globalSearch = async (query) => {
  if (!query) return { clients: [], orders: [], reports: [], remedies: [] };
  const res = await axios.get(`${API_URL}/search?query=${query}`);
  return res.data;
};
