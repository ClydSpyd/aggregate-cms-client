import { AxiosError } from "axios";
import { baseClient } from ".";
import { ApiResponse } from "./types";
import { normalizeJSONArticle, normalizeRssArticle } from "./utilities";

export const feedFunctions = {
  rss: async (url: string): Promise<ApiResponse<FeedItem[]>> => {
    try {
      const { data, status } = await baseClient.get(`/rss?feed=${url}`);
        return { status, data: data.data.map(normalizeRssArticle) };
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.message);
      return { error: `Error fetching feed: \n${url}`, status: 500 };
    }
  },
  json: async (url: string): Promise<ApiResponse<FeedItem[]>> => {
    try {
      const { data, status } = await baseClient.get(url);
        return { status, data:data.items.map(normalizeJSONArticle) };
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.message);
      return { error: `Error fetching feed: \n${url}`, status: 500 };
    }
  },
};
