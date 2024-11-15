import { AxiosError } from "axios";
import { uploadClient } from ".";
import { ApiResponse } from "./types";

export const uploadFumctions = {
  image: async (file: File): Promise<ApiResponse<{ url: string }>> => {
    try {
      if (!file) throw new Error("No file provided");
      const formData = new FormData();
      formData.append("image", file);
      const { data, status } = await uploadClient.post(
        `/upload/image`,
        formData
      );
      return { data, status };
    } catch (error) {
      const err = error as AxiosError;
      console.error(err.message);
      return { error: `Error uploading image`, status: 500 };
    }
  },
};
