import axios from "axios";

export default axios.create({
  baseURL: "https://api-posand.netlify.app/.netlify/functions/api",
});
