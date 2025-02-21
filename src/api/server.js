import axios from "axios";

const serverInstance = axios.create({
  baseURL: "http://89.250.75.189:8100/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default serverInstance;
