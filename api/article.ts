import { AxiosError } from "axios";
import { baseClient } from ".";
import { ApiResponse } from "./types";
import { InputData } from "@/src/app/browse/types";

export const articleFunctions = {
  createArticle: async (article: Article): Promise<ApiResponse<Article>> => {
    try {
      const { data, status } = await baseClient.post(
        "/article/create",
        article
      );
      return { status, data };
    } catch (error) {
      console.error(`Error creating article:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getAllArticles: async (): Promise<ApiResponse<Article[]>> => {
    try {
      const { data, status } = await baseClient.get("/article/all");
      return { status, data };
    } catch (error) {
      console.error(`Error fetching articles:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getArticle: async (id: string): Promise<ApiResponse<Article>> => {
    try {
      const { data, status } = await baseClient.get(`/article/${id}`);
      return { status, data };
    } catch (error) {
      console.error(`Error fetching article:`, error);
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getRecentArticles: async () => {
    try {
      const { data, status } = await baseClient.get("/article/recent");
      return { status, data };
    } catch (error) {
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
  getFilteredArticles: async (filters: InputData) => {
    try {
      const { data, status } = await baseClient.post("/article/search/filters", {
        tags: filters.tags,
        text: filters.text,
      });
      return { status, data };
    } catch (error) {
      const err = error as AxiosError;
      return { error: err.message, status: 500 };
    }
  },
};
