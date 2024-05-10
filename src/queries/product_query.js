import axios from "axios";
import { API_URL } from "./../utils/api";

export const ProductsPost = async (body) => {
  return await axios.post(`${API_URL}/products`, body).then((res) => res);
};
