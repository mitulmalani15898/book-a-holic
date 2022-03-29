/**
 * @author Mitul Pravinbhai Malani (B00869519)
 * Base url for static assets which are accessed from server
 * and Base url for APIs based on current environment; i.e. development, production
 */
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://bookaholic-backend.herokuapp.com/"
    : "http://localhost:8080/";
    
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://bookaholic-backend.herokuapp.com/api"
    : "http://localhost:8080/api";
