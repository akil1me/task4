import axios from "axios";
import { API_URL } from "./api-url";

export const axiosInstans = axios.create({
  baseURL: API_URL,
});
