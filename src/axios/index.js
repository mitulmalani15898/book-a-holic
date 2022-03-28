// Author: Mitul Pravinbhai Malani (B00869519)
import axios from "axios";

import { API_BASE_URL } from "../utils/constants";

export default axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
