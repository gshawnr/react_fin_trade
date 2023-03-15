import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASEURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("fintradeToken")}`,
    "Content-Type": "application/json",
  },
});
