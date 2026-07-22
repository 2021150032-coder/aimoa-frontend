import axios from "axios";

export const api = axios.create({
  baseURL: "https://aimoa-backend-production.up.railway.app",
});