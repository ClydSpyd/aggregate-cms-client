import axios from "axios";
import { feedFunctions } from "./feeds";
import { articleFunctions } from "./article";
import { uploadFumctions } from "./uploads";

const baseHeaders = {
  common: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const baseURL = process.env.NEXT_PUBLIC_API_BASE;

export const baseClient = axios.create({
  headers: {
    ...baseHeaders,
  },
  baseURL,
});

export const uploadClient = axios.create({
  headers: { "Content-Type": "multipart/form-data" },
  baseURL,
});

const API = {
  feed: feedFunctions,
  article: articleFunctions,
  upload: uploadFumctions,
};

export default API;
