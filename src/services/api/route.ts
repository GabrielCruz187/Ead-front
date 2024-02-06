import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIURL
});


export default api
