// Author: Mitul Pravinbhai Malani (B00869519)
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://bookaholic-backend.herokuapp.com/"
    : "http://localhost:8080/";
    
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://bookaholic-backend.herokuapp.com/api"
    : "http://localhost:8080/api";
