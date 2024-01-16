import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_APIURL;

const api = axios.create({
  baseURL,
});


export default api
