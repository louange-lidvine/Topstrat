import axios from "axios";
import { getCookie } from "cookies-next";
const token = getCookie("token");
export const baseURL = "https://tsapi.live/";
export const ApiURL = axios.create({
  baseURL: "https://tsapi.live/",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Connection: "keep-alive",
  },
});